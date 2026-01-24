import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Settings,
  Users,
  ArrowUp,
  CheckCircle,
  Play,
  Code,
  FolderTree,
  Monitor,
  FileCode,
  Folder,
  ChevronDown,
  Loader2,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Agent, Project, ProjectFile, CodeGenProgress } from '../services/api';
import {
  streamMessage,
  createProject,
  getProject,
  generateCodeStream,
  generatePreview
} from '../services/api';

// 消息类型
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status?: 'pending' | 'streaming' | 'done';
  agent?: Agent;
}

// 文件树节点
interface FileNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  expanded?: boolean;
  children?: FileNode[];
  content?: string;
}

export function DevWorkspace() {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId: urlProjectId } = useParams();
  const { user } = useAuth();
  const initialPrompt = location.state?.prompt || '';
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<'viewer' | 'editor' | 'files'>('viewer');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const isGeneratingRef = useRef(false);  // 用于同步检查，防止重复调用
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([]);

  // 当前 AI 代理
  const [currentAgent, setCurrentAgent] = useState<Agent>({
    name: 'Alex',
    role: '工程师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Alex&backgroundColor=ddd6fe&size=150',
  });

  // 标记是否已初始化
  const [initialized, setInitialized] = useState(false);

  // 初始化项目
  useEffect(() => {
    if (initialized) return;
    
    async function initProject() {
      if (urlProjectId) {
        // 加载现有项目
        const result = await getProject(urlProjectId);
        if (result.success && result.data) {
          setProject(result.data.project);
          setFiles(result.data.files);
          // 恢复对话历史
          if (result.data.conversations) {
            const msgs: Message[] = result.data.conversations.map((c: any, idx: number) => ({
              id: idx.toString(),
              type: c.role === 'user' ? 'user' : 'ai',
              content: c.content,
              timestamp: new Date(c.created_at),
              status: 'done',
              agent: c.agent_name ? { name: c.agent_name, role: '工程师', avatar: '' } : undefined,
            }));
            setMessages(msgs);
            setConversationHistory(result.data.conversations.map((c: any) => ({
              role: c.role,
              content: c.content,
            })));
          }
          setInitialized(true);
        }
      } else if (initialPrompt) {
        // 创建新项目并发送初始消息
        setInitialized(true); // 先标记，防止重复调用
        // 从 prompt 提取项目名称（取前20个字符，去掉常见前缀词）
        const projectName = initialPrompt
          .replace(/^(创建|开发|做|写|生成|帮我|请|一个|个)/g, '')
          .trim()
          .slice(0, 20) || '新项目';
        const result = await createProject(projectName, '', initialPrompt);
        if (result.success && result.data?.project) {
          setProject(result.data.project);
          // 发送初始消息 - 直接在这里处理，不调用 handleSendInitialMessage
          const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: initialPrompt,
            timestamp: new Date(),
          };
          setMessages([userMessage]);
          
          // 开始 AI 响应
          startAIResponse(initialPrompt, result.data.project.id, result.data.project.uuid);
        }
      } else {
        // 没有初始 prompt，进入空白状态等待用户输入
        setInitialized(true);
      }
    }
    initProject();
  }, [urlProjectId, initialPrompt, initialized]);

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 角色映射 - 使用与首页相同的头像
  const agentMap: Record<string, Agent> = {
    emma: { 
      id: 'emma', 
      name: 'Emma', 
      role: '产品经理', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Emma&backgroundColor=fce7f3&size=150', 
      color: 'from-pink-500 to-purple-500' 
    },
    iris: { 
      id: 'iris', 
      name: 'Iris', 
      role: '架构师', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Iris&backgroundColor=b6e3ff&size=150', 
      color: 'from-blue-500 to-cyan-500' 
    },
    alex: { 
      id: 'alex', 
      name: 'Alex', 
      role: '工程师', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Alex&backgroundColor=ddd6fe&size=150', 
      color: 'from-violet-500 to-purple-500' 
    },
  };

  // 处理代码生成标记 - 使用流式 API 显示实时进度（增量输出）
  const handleCodeGenerationTrigger = async (userMessage: string, currentProjectId?: string, passedProjectUuid?: string) => {
    // 使用 ref 同步检查，防止重复调用
    if (isGeneratingRef.current) return;
    
    if (!currentProjectId && !project) return;
    
    // 优先使用传入的 projectUuid，否则使用 state 中的
    const projectUuidToUse = passedProjectUuid || project?.uuid;
    
    if (!projectUuidToUse) return;
    
    // 立即标记为正在生成
    isGeneratingRef.current = true;
    setIsGenerating(true);
    
    // 用于生成唯一消息 ID
    let messageCounter = Date.now();
    
    try {
      // 使用流式 API 生成代码，每个状态增量添加新消息
      const result = await generateCodeStream(
        userMessage,
        projectUuidToUse || '',
        files,
        (progress: CodeGenProgress) => {
          if (progress.type === 'status' || progress.type === 'file') {
            const agent = progress.agent ? agentMap[progress.agent] : agentMap.alex;
            const newMessage: Message = {
              id: (++messageCounter).toString(),
              type: 'ai',
              content: progress.progress 
                ? `${progress.message} (${progress.progress}%)`
                : progress.message,
              timestamp: new Date(),
              status: 'done',
              agent,
            };
            setMessages(prev => [...prev, newMessage]);
          } else if (progress.type === 'error') {
            // 处理错误消息
            const errorMessage: Message = {
              id: (++messageCounter).toString(),
              type: 'ai',
              content: `❌ ${progress.message || '代码生成失败，请重试'}`,
              timestamp: new Date(),
              status: 'done',
              agent: agentMap.alex,
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsGenerating(false);
            isGeneratingRef.current = false;
          }
        }
      );
      
      if (result && result.files) {
        const newFiles: ProjectFile[] = result.files.map((f, idx) => ({
          id: idx,
          path: f.path,
          content: f.content,
          type: f.type,
        }));
        setFiles(newFiles);
        
        // 自动选择第一个文件
        if (newFiles.length > 0) {
          setSelectedFile(newFiles[0]);
        }
        
        // 直接生成预览并切换到查看器
        if (projectUuidToUse) {
          const previewResult = await generatePreview(projectUuidToUse);
          if (previewResult.success && previewResult.data?.previewUrl) {
            // previewUrl 现在可能是 Blob URL 或相对路径
            setPreviewUrl(previewResult.data.previewUrl);
            setActiveTab('viewer');
            
            // 添加完成消息
            const completeMessage: Message = {
              id: (++messageCounter).toString(),
              type: 'ai',
              content: `开发完成！共生成 ${result.files.length} 个文件，请在右侧查看应用预览`,
              timestamp: new Date(),
              status: 'done',
              agent: agentMap.alex,
            };
            setMessages(prev => [...prev, completeMessage]);
          } else {
            const completeMessage: Message = {
              id: (++messageCounter).toString(),
              type: 'ai',
              content: `代码生成完成！共 ${result.files.length} 个文件，请在编辑器中查看`,
              timestamp: new Date(),
              status: 'done',
              agent: agentMap.alex,
            };
            setMessages(prev => [...prev, completeMessage]);
            setActiveTab('editor');
          }
        }
      } else {
        // 如果没有结果，说明生成失败（错误消息应该已经在 onProgress 中处理）
        if (!messages.some(m => m.content.includes('失败') || m.content.includes('错误'))) {
          const errorMessage: Message = {
            id: (++messageCounter).toString(),
            type: 'ai',
            content: '代码生成失败，请重试。请检查 API Key 配置或查看控制台错误信息。',
            timestamp: new Date(),
            status: 'done',
            agent: agentMap.alex,
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      }
    } catch (error) {
      console.error('Code generation error:', error);
      const errorMessage: Message = {
        id: (++messageCounter).toString(),
        type: 'ai',
        content: '生成出错，请重试',
        timestamp: new Date(),
        status: 'done',
        agent: agentMap.alex,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      isGeneratingRef.current = false;
      setIsGenerating(false);
    }
  };

  // 开始 AI 响应 - 带有明确的 projectId 和 projectUuid 参数
  const startAIResponse = async (message: string, projectId?: string, projectUuid?: string) => {
    setIsProcessing(true);
    
    // 更新对话历史
    const newHistory = [{ role: 'user', content: message }];
    setConversationHistory(newHistory);

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      status: 'streaming',
      agent: currentAgent,
    };

    setMessages(prev => [...prev, aiMessage]);

    try {
      let fullContent = '';
      let shouldGenerateCode = false;

      await streamMessage(
        message,
        projectId,
        'alex',
        [], // 初始消息没有历史
        (chunk) => {
          if (chunk.type === 'agent' && chunk.agent) {
            setCurrentAgent(chunk.agent);
          } else if (chunk.type === 'content' && chunk.content) {
            fullContent += chunk.content;
            // 检测并移除 [GENERATE_CODE] 标记
            const displayContent = fullContent.replace(/\[GENERATE_CODE\]/g, '').trim();
            setMessages(prev => prev.map(m => 
              m.id === aiMessageId 
                ? { ...m, content: displayContent, agent: currentAgent }
                : m
            ));
          } else if (chunk.type === 'done') {
            // 检查是否包含代码生成标记
            shouldGenerateCode = fullContent.includes('[GENERATE_CODE]');
            const displayContent = fullContent.replace(/\[GENERATE_CODE\]/g, '').trim();
            
            setMessages(prev => prev.map(m => 
              m.id === aiMessageId 
                ? { ...m, content: displayContent, status: 'done' }
                : m
            ));
            // 更新对话历史
            setConversationHistory(prev => [...prev, { role: 'assistant', content: displayContent }]);
            
            // 如果需要生成代码，触发代码生成
            if (shouldGenerateCode) {
              setTimeout(() => handleCodeGenerationTrigger(message, projectId, projectUuid || project?.uuid), 500);
            }
          } else if (chunk.type === 'error') {
            setMessages(prev => prev.map(m => 
              m.id === aiMessageId 
                ? { ...m, content: `错误: ${chunk.error}`, status: 'done' }
                : m
            ));
          }
        }
      );
    } catch (error) {
      console.error('AI response error:', error);
      setMessages(prev => prev.map(m => 
        m.id === aiMessageId 
          ? { ...m, content: '抱歉，AI 响应出现错误，请重试。', status: 'done' }
          : m
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  // 处理 AI 响应 - 用于后续对话
  const processAIResponse = async (message: string, history: { role: string; content: string }[]) => {
    setIsProcessing(true);

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      status: 'streaming',
      agent: currentAgent,
    };

    setMessages(prev => [...prev, aiMessage]);

    try {
      let fullContent = '';
      let shouldGenerateCode = false;

      await streamMessage(
        message,
        project?.id,
        'alex',
        history.slice(-10), // 最多发送最近10条消息作为上下文
        (chunk) => {
          if (chunk.type === 'agent' && chunk.agent) {
            setCurrentAgent(chunk.agent);
          } else if (chunk.type === 'content' && chunk.content) {
            fullContent += chunk.content;
            // 检测并移除 [GENERATE_CODE] 标记
            const displayContent = fullContent.replace(/\[GENERATE_CODE\]/g, '').trim();
            setMessages(prev => prev.map(m => 
              m.id === aiMessageId 
                ? { ...m, content: displayContent, agent: currentAgent }
                : m
            ));
          } else if (chunk.type === 'done') {
            // 检查是否包含代码生成标记
            shouldGenerateCode = fullContent.includes('[GENERATE_CODE]');
            const displayContent = fullContent.replace(/\[GENERATE_CODE\]/g, '').trim();
            
            setMessages(prev => prev.map(m => 
              m.id === aiMessageId 
                ? { ...m, content: displayContent, status: 'done' }
                : m
            ));
            // 更新对话历史
            setConversationHistory(prev => [...prev, { role: 'assistant', content: displayContent }]);
            
            // 如果需要生成代码，触发代码生成
            if (shouldGenerateCode) {
              setTimeout(() => handleCodeGenerationTrigger(message, project?.id, project?.uuid), 500);
            }
          } else if (chunk.type === 'error') {
            setMessages(prev => prev.map(m => 
              m.id === aiMessageId 
                ? { ...m, content: `错误: ${chunk.error}`, status: 'done' }
                : m
            ));
          }
        }
      );
    } catch (error) {
      console.error('AI response error:', error);
      setMessages(prev => prev.map(m => 
        m.id === aiMessageId 
          ? { ...m, content: '抱歉，AI 响应出现错误，请重试。', status: 'done' }
          : m
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  // 发送消息
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const message = inputValue.trim();
    setInputValue('');

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // 如果还没有项目，先创建项目
    if (!project) {
      const projectName = message
        .replace(/^(创建|开发|做|写|生成|帮我|请|一个|个)/g, '')
        .trim()
        .slice(0, 20) || '新项目';
      const result = await createProject(projectName, '', message);
      if (result.success && result.data?.project) {
        setProject(result.data.project);
        // 开始 AI 响应
        startAIResponse(message, result.data.project.id, result.data.project.uuid);
      }
      return;
    }
    
    const newHistory = [...conversationHistory, { role: 'user', content: message }];
    setConversationHistory(newHistory);
    
    await processAIResponse(message, newHistory);
  };

  // 生成代码（使用流式生成）
  const handleGenerateCode = async () => {
    if (!project || isGeneratingRef.current) return;
    
    // 使用最后一条用户消息作为代码生成的提示
    const lastUserMessage = messages.filter(m => m.type === 'user').pop();
    const prompt = lastUserMessage?.content || project.prompt;
    
    if (!prompt) {
      console.warn('没有可用的提示信息');
      return;
    }
    
    // 调用流式生成函数
    await handleCodeGenerationTrigger(prompt, project.id, project.uuid);
  };

  // 生成预览
  const handleGeneratePreview = async () => {
    if (!project) return;
    
    try {
      const result = await generatePreview(project.uuid);
      if (result.success && result.data?.previewUrl) {
        setPreviewUrl(result.data.previewUrl);
        setActiveTab('viewer');
      }
    } catch (error) {
      console.error('Preview generation error:', error);
    }
  };

  // 复制代码
  const handleCopyCode = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 构建文件树
  const buildFileTree = (files: ProjectFile[]): FileNode[] => {
    const root: FileNode[] = [];
    
    files.forEach(file => {
      const parts = file.path.split('/');
      let current = root;
      
      parts.forEach((part: string, idx: number) => {
        const isFile = idx === parts.length - 1;
        let node = current.find(n => n.name === part);
        
        if (!node) {
          node = {
            name: part,
            type: isFile ? 'file' : 'folder',
            path: parts.slice(0, idx + 1).join('/'),
            expanded: true,
            children: isFile ? undefined : [],
            content: isFile ? file.content : undefined,
          };
          current.push(node);
        }
        
        if (!isFile && node.children) {
          current = node.children;
        }
      });
    });
    
    return root;
  };

  const fileTree = buildFileTree(files);

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node, index) => (
      <div key={`${node.path}-${index}`}>
        <div 
          className={`flex items-center gap-2 py-1.5 px-2 hover:bg-zinc-800 rounded cursor-pointer text-sm ${
            selectedFile?.path === node.path ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
          } transition-colors`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'file') {
              const file = files.find(f => f.path === node.path);
              if (file) {
                setSelectedFile(file);
                setActiveTab('editor');
              }
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              <ChevronDown className="w-3 h-3" />
              <Folder className="w-4 h-4 text-purple-400" />
            </>
          ) : (
            <>
              <span className="w-3" />
              <FileCode className="w-4 h-4 text-zinc-600" />
            </>
          )}
          <span>{node.name}</span>
        </div>
        {node.type === 'folder' && node.children && (
          <div>{renderFileTree(node.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  const suggestedActions = [
    { label: '生成代码', icon: '💻', onClick: handleGenerateCode },
    { label: '预览项目', icon: '👁️', onClick: handleGeneratePreview },
    { label: '添加功能', icon: '➕', onClick: () => setInputValue('添加一个新功能：') },
  ];

  const tabs = [
    { id: 'viewer', label: '应用查看器', icon: Monitor },
    { id: 'editor', label: '编辑器', icon: Code },
    { id: 'files', label: '文件', icon: FolderTree },
  ];

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden">
      {/* Left Sidebar - Chat */}
      <motion.div
        animate={{ width: sidebarCollapsed ? 60 : 400 }}
        transition={{ duration: 0.3 }}
        className="h-full bg-zinc-900 border-r border-zinc-800 flex flex-col relative"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/')}
                className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-zinc-400" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white truncate max-w-[180px]">
                  {project?.name || (initialPrompt ? initialPrompt.slice(0, 20) + '...' : '新项目')}
                </span>
              </div>
              {user && (
                <span className="px-2.5 py-1 text-xs font-medium text-purple-400 bg-purple-500/20 rounded-full border border-purple-500/30">
                  {user.credits} 积分
                </span>
              )}
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-zinc-400" />
            )}
          </button>
        </div>

        {/* Chat Messages */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Date */}
            <div className="text-center">
              <span className="text-xs text-zinc-500">
                {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Messages */}
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                {message.type === 'user' ? (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-sm text-sm">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* AI Agent Info */}
                    <div className="flex items-center gap-2">
                      {message.agent?.avatar?.startsWith('http') ? (
                        <img 
                          src={message.agent.avatar} 
                          alt={message.agent.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${message.agent?.color || 'from-purple-500 to-pink-500'} flex items-center justify-center text-white text-sm font-medium`}>
                          {message.agent?.avatar || message.agent?.name?.[0] || 'A'}
                        </div>
                      )}
                      <span className="text-sm font-medium text-white">{message.agent?.name || 'Alex'}</span>
                      <span className="text-xs text-zinc-400">{message.agent?.role || '工程师'}</span>
                      {message.status === 'streaming' && (
                        <Loader2 className="w-3 h-3 animate-spin text-purple-400" />
                      )}
                    </div>

                    {/* Status */}
                    {message.status === 'done' && (
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        <span>已完成</span>
                      </div>
                    )}

                    {/* AI Message Content */}
                    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-zinc-300 whitespace-pre-wrap">
                      {message.content || (message.status === 'streaming' ? '正在思考...' : '')}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Processing Indicator */}
            {isProcessing && messages[messages.length - 1]?.type !== 'ai' && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-zinc-700 border-t-purple-500 rounded-full"
                />
                <span>正在处理...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Suggested Actions */}
        {!sidebarCollapsed && messages.length > 0 && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {suggestedActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  disabled={isGenerating}
                  className="px-3 py-1.5 text-xs text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>{action.icon}</span>
                  {action.label}
                  {action.label === '生成代码' && isGenerating && (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-zinc-800">
            <form onSubmit={handleSendMessage}>
              <div className="flex items-center gap-2 p-2 bg-zinc-800 border border-zinc-700 rounded-xl focus-within:border-purple-500/50 transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="描述你想要构建的内容..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none px-2"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isProcessing}
                  className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-zinc-700 disabled:to-zinc-700 rounded-lg transition-colors"
                >
                  <ArrowUp className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
            <div className="flex items-center gap-3 mt-3 text-zinc-500">
              <button className="hover:text-zinc-300 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="hover:text-zinc-300 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button className="hover:text-zinc-300 transition-colors">
                <Users className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col bg-zinc-900">
        {/* Tabs Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {previewUrl && (
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-zinc-400" />
              </a>
            )}
            <button 
              onClick={handleGeneratePreview}
              disabled={files.length === 0}
              className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition-colors disabled:opacity-50"
            >
              发布
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'viewer' && (
              <motion.div
                key="viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-6"
              >
                {/* App Preview */}
                <div className="h-full bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
                  {previewUrl ? (
                    <iframe
                      src={previewUrl}
                      className="w-full h-full"
                      title="Project Preview"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-2xl flex items-center justify-center">
                          <Play className="w-8 h-8 text-zinc-600" />
                        </div>
                        <p className="text-zinc-400 text-sm">应用预览区域</p>
                        <p className="text-zinc-600 text-xs mt-1">生成代码后点击"发布"查看预览</p>
                        {files.length > 0 && (
                          <button
                            onClick={handleGeneratePreview}
                            className="mt-4 px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                          >
                            生成预览
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'editor' && (
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex"
              >
                {/* File Tree */}
                <div className="w-60 border-r border-zinc-800 p-2 overflow-y-auto bg-zinc-950">
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider px-2 py-2">
                    文件
                  </div>
                  {files.length > 0 ? (
                    renderFileTree(fileTree)
                  ) : (
                    <div className="px-2 py-4 text-xs text-zinc-500 text-center">
                      暂无文件，请先生成代码
                    </div>
                  )}
                </div>
                
                {/* Code Editor */}
                <div className="flex-1 overflow-auto bg-zinc-950">
                  {selectedFile ? (
                    <>
                      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
                        <div className="flex items-center gap-2">
                          <FileCode className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm text-zinc-400">{selectedFile.path}</span>
                        </div>
                        <button
                          onClick={handleCopyCode}
                          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-400" />
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-sm font-mono text-zinc-300 overflow-auto">
                        <code>{selectedFile.content}</code>
                      </pre>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-zinc-500">
                      选择一个文件查看代码
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'files' && (
              <motion.div
                key="files"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-6"
              >
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
                  <div className="text-sm font-medium text-zinc-300 mb-4">
                    项目文件 ({files.length})
                  </div>
                  {files.length > 0 ? (
                    <div className="space-y-1">
                      {renderFileTree(fileTree)}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-zinc-500">
                      <p>暂无文件</p>
                      <p className="text-xs mt-1">与 AI 对话后点击"生成代码"</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default DevWorkspace;
