// 纯前端 API 服务 - 使用本地存储 + Vercel Serverless Functions
import * as storage from './storage';

// API 基础配置
// 本地开发使用 localhost:3001，生产环境使用相对路径
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');

// ============ 用户认证（本地模式） ============

export type User = storage.User;

export interface AuthResponse {
  user: User;
  token: string;
}

// 获取存储的 token
export function getToken(): string | null {
  return localStorage.getItem('atoms_token');
}

export function setToken(token: string): void {
  localStorage.setItem('atoms_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('atoms_token');
}

// 注册（本地模式）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function register(email: string, _password: string, name?: string): Promise<{ success: boolean; data?: AuthResponse; error?: { message: string } }> {
  try {
    const user = storage.createUser(email, name || email.split('@')[0]);
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
    setToken(token);
    return { success: true, data: { user, token } };
  } catch (error) {
    return { success: false, error: { message: '注册失败' } };
  }
}

// 登录（本地模式）
export async function login(email: string, _password: string): Promise<{ success: boolean; data?: AuthResponse; error?: { message: string } }> {
  try {
    const user = storage.loginUser(email);
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
    setToken(token);
    return { success: true, data: { user, token } };
  } catch (error) {
    return { success: false, error: { message: '登录失败' } };
  }
}

// 获取当前用户
export async function getCurrentUser(): Promise<{ success: boolean; data?: { user: User }; error?: { message: string } }> {
  const user = storage.getUser();
  if (user) {
    return { success: true, data: { user } };
  }
  return { success: false, error: { message: '未登录' } };
}

// 登出
export function logout(): void {
  clearToken();
  storage.clearUser();
}

// ============ AI 对话 ============

export interface Agent {
  id?: string;
  name: string;
  role: string;
  avatar?: string;
  color?: string;
}

interface StreamChunk {
  type: 'agent' | 'content' | 'done' | 'error';
  agent?: Agent;
  content?: string;
  error?: string;
}

// 流式 AI 消息
export async function streamMessage(
  message: string,
  projectId?: number | string,
  agentId: string = 'alex',
  history: { role: string; content: string }[] = [],
  onChunk: (chunk: StreamChunk) => void = () => {}
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, agentId, history }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      onChunk({ type: 'error', error: '无法读取响应' });
      return;
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            onChunk(data);
          } catch (e) {
            // 忽略解析错误
          }
        }
      }
    }

    // 保存对话到本地
    if (projectId) {
      storage.addConversation(String(projectId), 'user', message);
    }
  } catch (error) {
    onChunk({ type: 'error', error: '网络错误' });
  }
}

// 获取对话历史
export async function getChatHistory(projectId: string | number) {
  const project = storage.getProject(String(projectId));
  return {
    success: true,
    data: { conversations: project?.conversations || [] }
  };
}

// 获取代理列表
export async function getAgents() {
  return {
    success: true,
    data: {
      agents: [
        { id: 'alex', name: 'Alex', role: '工程师', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Alex' },
        { id: 'emma', name: 'Emma', role: '产品经理', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Emma' },
        { id: 'iris', name: 'Iris', role: '架构师', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Iris' },
      ]
    }
  };
}

// ============ 项目管理 ============

export type Project = storage.Project;
export type ProjectFile = storage.ProjectFile;

export async function createProject(name?: string, description?: string, prompt?: string) {
  const project = storage.createProject(name || '新项目', description || '', prompt || '');
  return { 
    success: true, 
    data: { 
      project: {
        ...project,
        uuid: project.id,
      }
    } 
  };
}

export async function getProjects() {
  const projects = storage.getProjects();
  return { success: true, data: { projects } };
}

export async function getProject(uuid: string) {
  const project = storage.getProject(uuid);
  if (!project) {
    return { success: false, error: { message: '项目不存在' } };
  }
  return {
    success: true,
    data: {
      project: { ...project, uuid: project.id },
      files: project.files,
      conversations: project.conversations,
    }
  };
}

export async function updateProject(uuid: string, data: { name?: string; description?: string; status?: string }) {
  const project = storage.updateProject(uuid, data);
  if (!project) {
    return { success: false, error: { message: '更新失败' } };
  }
  return { success: true, data: { project } };
}

export async function deleteProject(uuid: string) {
  const success = storage.deleteProject(uuid);
  return { success, data: success ? { message: '删除成功' } : undefined };
}

// ============ 代码生成 ============

export interface GeneratedCode {
  files: Array<{ path: string; content: string; type: string }>;
  summary: string;
  raw?: boolean;
}

export interface CodeGenProgress {
  type: 'status' | 'file' | 'complete' | 'error';
  message: string;
  agent?: 'emma' | 'iris' | 'alex';
  action?: string;
  path?: string;
  progress?: number;
  data?: GeneratedCode;
}

// 流式代码生成
export async function generateCodeStream(
  prompt: string,
  projectUuid: string,
  existingFiles: Array<{ path: string; content: string }> = [],
  onProgress: (progress: CodeGenProgress) => void
): Promise<GeneratedCode | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        existingFiles: existingFiles.map(f => ({ path: f.path, content: f.content })),
      }),
    });

    // 检查响应状态
    if (!response.ok) {
      const errorText = await response.text();
      console.error('代码生成 API 调用失败:', response.status, errorText);
      onProgress({
        type: 'error',
        message: `API 调用失败 (${response.status}): ${errorText.substring(0, 200)}`
      });
      return null;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      onProgress({
        type: 'error',
        message: '无法读取服务器响应'
      });
      return null;
    }

    let result: GeneratedCode | null = null;
    let buffer = '';
    const processedMessages = new Set<string>();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (!jsonStr || processedMessages.has(jsonStr)) continue;

          try {
            const data = JSON.parse(jsonStr) as CodeGenProgress;
            processedMessages.add(jsonStr);
            onProgress(data);
            if (data.type === 'complete' && data.data) {
              result = data.data;
              // 保存文件到本地存储
              if (projectUuid && result.files) {
                storage.updateProjectFiles(projectUuid, result.files);
              }
            } else if (data.type === 'error') {
              // 错误已通过 onProgress 传递，这里可以记录日志
              console.error('代码生成错误:', data.message);
            }
          } catch (e) {
            console.error('解析 SSE 数据失败:', e, jsonStr);
          }
        }
      }
    }

    return result;
  } catch (error: any) {
    console.error('Code generation error:', error);
    // 确保错误消息传递给前端
    onProgress({
      type: 'error',
      message: error.message || '代码生成失败，请检查网络连接和 API 配置'
    });
    return null;
  }
}

// 非流式代码生成（兼容）
export async function generateCode(prompt: string, projectUuid?: string, existingFiles: Array<{ path: string; content: string }> = []) {
  return new Promise<{ success: boolean; data?: GeneratedCode; error?: { message: string } }>((resolve) => {
    generateCodeStream(prompt, projectUuid || '', existingFiles, (progress) => {
      if (progress.type === 'complete' && progress.data) {
        resolve({ success: true, data: progress.data });
      } else if (progress.type === 'error') {
        resolve({ success: false, error: { message: progress.message } });
      }
    }).catch(() => {
      resolve({ success: false, error: { message: '生成失败' } });
    });
  });
}

// 获取项目文件
export async function getProjectFiles(projectUuid: string) {
  const project = storage.getProject(projectUuid);
  if (!project) {
    return { success: false, error: { message: '项目不存在' } };
  }
  return {
    success: true,
    data: {
      files: project.files
    }
  };
}

// 生成预览
export async function generatePreview(projectUuid: string) {
  const project = storage.getProject(projectUuid);
  if (!project || project.files.length === 0) {
    return { success: false, error: { message: '没有文件可预览' } };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        files: project.files.map(f => ({ path: f.path, content: f.content })),
      }),
    });

    if (!response.ok) {
      throw new Error('预览生成失败');
    }

    const html = await response.text();
    // 创建 Blob URL
    const blob = new Blob([html], { type: 'text/html' });
    const previewUrl = URL.createObjectURL(blob);

    return {
      success: true,
      data: { previewUrl }
    };
  } catch (error) {
    return { success: false, error: { message: '预览生成失败' } };
  }
}

// 更新单个文件
export async function updateFile(projectUuid: string, fileId: number, content: string) {
  const project = storage.getProject(projectUuid);
  if (!project) {
    return { success: false, error: { message: '项目不存在' } };
  }

  const files = project.files.map(f => 
    f.id === fileId ? { ...f, content } : f
  );
  
  storage.updateProject(projectUuid, { files });
  return { success: true, data: { file: files.find(f => f.id === fileId) } };
}

// 创建新文件
export async function createFile(projectUuid: string, filePath: string, content: string, fileType: string) {
  const project = storage.getProject(projectUuid);
  if (!project) {
    return { success: false, error: { message: '项目不存在' } };
  }

  const newFile: storage.ProjectFile = {
    id: Date.now(),
    path: filePath,
    content,
    type: fileType,
  };

  const files = [...project.files, newFile];
  storage.updateProject(projectUuid, { files });
  
  return { success: true, data: { file: newFile } };
}

// 删除文件
export async function deleteFile(projectUuid: string, fileId: number) {
  const project = storage.getProject(projectUuid);
  if (!project) {
    return { success: false, error: { message: '项目不存在' } };
  }

  const files = project.files.filter(f => f.id !== fileId);
  storage.updateProject(projectUuid, { files });
  
  return { success: true, data: { message: '删除成功' } };
}
