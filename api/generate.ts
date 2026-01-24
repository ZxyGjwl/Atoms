import type { VercelRequest, VercelResponse } from '@vercel/node';

const CODE_GENERATION_PROMPT = `你是 Dribbble 和 Awwwards 获奖设计师兼资深 React 架构师。你的作品以精美的视觉设计和完美的用户体验著称。

【设计理念】
你创建的每个应用都像是一件艺术品：
- 视觉层次分明，引导用户注意力
- 微交互细腻，让操作充满愉悦感
- 空间感十足，呼吸感强
- 色彩和谐，深色主题下依然生动

【代码正确性 - 必须遵守】
✓ 变量先声明后使用
✓ 数组方法完整：items.filter(item => item.id !== id)
✓ 事件处理正确：onClick={() => fn(item.id)}
✓ 受控表单：value + onChange
✓ key 用唯一 ID
✓ emoji 必须包裹：{'📊'}
✗ 禁止 TypeScript 类型
✗ 禁止外部图标库

【项目结构 - 5-7 个文件】
src/
├── App.jsx                    # 主应用 + 状态管理
├── components/
│   ├── Header.jsx             # 顶部导航
│   ├── [核心功能].jsx          # 主要功能组件
│   ├── [辅助功能].jsx          # 辅助组件
│   ├── Modal.jsx              # 模态框（如需要）
│   └── EmptyState.jsx         # 空状态展示
└── hooks/
    └── useLocalStorage.jsx    # 数据持久化

【视觉设计规范 - 深色玻璃拟态风格】

🎨 背景层次（从深到浅）：
- 页面背景：bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950
- 主容器：bg-gray-900/40 backdrop-blur-2xl
- 卡片悬浮：bg-gray-800/50 backdrop-blur-xl
- 高亮区域：bg-gradient-to-r from-purple-500/10 to-pink-500/10

🌈 渐变色彩（品牌色）：
- 主渐变：from-violet-500 via-purple-500 to-fuchsia-500
- 辅助渐变：from-cyan-400 to-blue-500
- 成功渐变：from-emerald-400 to-teal-500
- 警告渐变：from-amber-400 to-orange-500
- 文字渐变：bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent

📝 文字层次：
- 大标题：text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent
- 标题：text-2xl font-semibold text-white
- 正文：text-base text-gray-200
- 次要：text-sm text-gray-400
- 标签：text-xs text-gray-500

🔘 按钮样式：
主按钮：
className="relative group px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"

次要按钮：
className="px-5 py-2.5 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/50 hover:border-gray-600 rounded-xl text-gray-200 font-medium transition-all duration-300"

危险按钮：
className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-400 font-medium transition-all duration-300"

📦 卡片样式：
className="relative bg-gray-900/40 backdrop-blur-2xl rounded-3xl border border-gray-800/50 shadow-2xl shadow-black/20 p-6 hover:border-purple-500/20 transition-all duration-500"

📝 输入框：
className="w-full px-4 py-3 bg-gray-800/40 border border-gray-700/50 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:bg-gray-800/60 outline-none transition-all duration-300"

📋 列表项：
className="group relative flex items-center gap-4 p-4 bg-gray-800/20 hover:bg-gray-800/40 rounded-2xl border border-transparent hover:border-gray-700/50 transition-all duration-300 cursor-pointer"

🏷️ 标签/徽章：
className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-300"

【空状态设计】
必须包含精美的空状态组件：
function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-4xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-center max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}

【Toast 通知】
function Toast({ message, type = 'success', onClose }) {
  const styles = {
    success: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
    error: 'from-red-500/20 to-orange-500/20 border-red-500/30 text-red-300',
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300'
  };
  return (
    <div className={\`fixed bottom-6 right-6 px-5 py-3 bg-gradient-to-r \${styles[type]} backdrop-blur-xl border rounded-xl shadow-2xl animate-slide-up\`}>
      {message}
    </div>
  );
}

【模态框】
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div 
        className="relative w-full max-w-md bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-gray-800/50 shadow-2xl p-6 animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

【动画效果】
在 App.jsx 顶部添加：
const styles = \`
  @keyframes slide-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  .animate-slide-up { animation: slide-up 0.3s ease-out; }
  .animate-scale-up { animation: scale-up 0.2s ease-out; }
  .animate-fade-in { animation: fade-in 0.3s ease-out; }
\`;

【useLocalStorage Hook】
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
}

【示例数据】
应用启动时应有 2-3 条示例数据，让用户立即看到效果。
例如待办事项：
const initialData = [
  { id: 1, title: '完成项目设计稿', completed: true, priority: 'high' },
  { id: 2, title: 'review 团队代码', completed: false, priority: 'medium' },
  { id: 3, title: '准备周会演示', completed: false, priority: 'low' }
];

【输出格式 - 纯 JSON】
{
  "files": [
    { "path": "src/App.jsx", "content": "完整代码", "type": "jsx" },
    { "path": "src/components/Header.jsx", "content": "完整代码", "type": "jsx" },
    { "path": "src/components/XXX.jsx", "content": "完整代码", "type": "jsx" },
    { "path": "src/hooks/useLocalStorage.jsx", "content": "完整代码", "type": "jsx" }
  ],
  "summary": "描述"
}

⚠️ 直接输出 JSON，不要任何解释或 markdown 标记！`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, existingFiles = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: '请提供需求描述' });
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API Key 未配置' });
    }

    // 设置 SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const isOptimization = existingFiles.length > 0;

    // 发送开始状态
    res.write(`data: ${JSON.stringify({ 
      type: 'status', 
      agent: 'emma',
      message: isOptimization ? '正在分析现有代码，理解修改需求...' : '正在深度分析需求，规划功能模块...'
    })}\n\n`);

    // 构建提示
    let userPrompt = '';
    if (isOptimization) {
      userPrompt = `【优化任务】用户要求对现有项目进行修改和增强：

用户需求：${prompt}

现有项目文件：
${existingFiles.map((f: { path: string; content: string }) => `
━━━━━━ ${f.path} ━━━━━━
${f.content}
`).join('\n')}

请基于现有代码进行修改和优化，保持代码风格一致，输出所有文件的完整代码。`;
    } else {
      userPrompt = `【新建项目】请根据以下需求创建一个功能完善、界面精美的前端应用：

用户需求：${prompt}

要求：
1. 生成 5-7 个结构清晰的组件文件
2. 实现完整的 CRUD 功能（如适用）
3. 使用 localStorage 持久化数据
4. 提供优雅的空状态、加载状态、错误处理
5. 界面要现代化、专业、有设计感
6. 包含 2-3 条示例数据

请生成可直接运行的完整代码。`;
    }

    // 发送规划状态
    await new Promise(r => setTimeout(r, 500));
    res.write(`data: ${JSON.stringify({ 
      type: 'status', 
      agent: 'iris',
      message: isOptimization ? '正在设计优化方案，规划代码改动...' : '正在设计系统架构，规划组件结构...'
    })}\n\n`);

    // 调用 AI
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen-max',
        messages: [
          { role: 'system', content: CODE_GENERATION_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.6,
        max_tokens: 8192
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API 调用失败:', response.status, errorText);
      res.write(`data: ${JSON.stringify({ type: 'error', message: `AI 服务调用失败 (${response.status})，请检查 API Key` })}\n\n`);
      return res.end();
    }

    const result = await response.json();
    
    // 检查 API 返回的错误
    if (result.error) {
      console.error('AI API 返回错误:', result.error);
      res.write(`data: ${JSON.stringify({ type: 'error', message: `AI 服务错误: ${result.error.message || JSON.stringify(result.error)}` })}\n\n`);
      return res.end();
    }
    
    const content = result.choices?.[0]?.message?.content || '';
    
    if (!content) {
      console.error('AI 响应为空:', JSON.stringify(result, null, 2));
      res.write(`data: ${JSON.stringify({ type: 'error', message: 'AI 返回内容为空，请重试' })}\n\n`);
      return res.end();
    }

    // 改进的 JSON 解析逻辑
    let jsonStr = '';
    
    // 方法1: 尝试提取 markdown 代码块中的 JSON
    const codeBlockMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1];
    } else {
      // 方法2: 提取第一个完整的 JSON 对象
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
    }
    
    if (!jsonStr) {
      console.error('AI 响应内容:', content.substring(0, 500));
      res.write(`data: ${JSON.stringify({ type: 'error', message: '无法从 AI 响应中提取 JSON，请重试' })}\n\n`);
      return res.end();
    }
    
    let generatedCode;
    try {
      generatedCode = JSON.parse(jsonStr);
    } catch (parseError: any) {
      console.error('JSON 解析错误:', parseError.message);
      console.error('尝试解析的内容:', jsonStr.substring(0, 500));
      res.write(`data: ${JSON.stringify({ type: 'error', message: `JSON 解析失败: ${parseError.message}` })}\n\n`);
      return res.end();
    }
    
    // 验证生成的数据结构
    if (!generatedCode.files || !Array.isArray(generatedCode.files)) {
      console.error('生成的数据结构不正确:', generatedCode);
      res.write(`data: ${JSON.stringify({ type: 'error', message: 'AI 返回的数据格式不正确，缺少 files 数组' })}\n\n`);
      return res.end();
    }

    // 逐个报告文件
    if (generatedCode.files && Array.isArray(generatedCode.files)) {
      const existingPaths = existingFiles.map((f: { path: string }) => f.path);
      
      for (let i = 0; i < generatedCode.files.length; i++) {
        const file = generatedCode.files[i];
        const isModified = existingPaths.includes(file.path);
        const action = isModified ? '优化' : '创建';
        
        res.write(`data: ${JSON.stringify({ 
          type: 'file', 
          agent: 'alex',
          action,
          path: file.path,
          message: `正在${action} ${file.path}`,
          progress: Math.round(((i + 1) / generatedCode.files.length) * 100)
        })}\n\n`);

        await new Promise(r => setTimeout(r, 300));
      }
    }

    // 发送完成
    res.write(`data: ${JSON.stringify({ 
      type: 'complete', 
      message: '代码生成完成！',
      data: generatedCode
    })}\n\n`);

    res.end();
  } catch (error) {
    console.error('Generate error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', message: '服务错误，请重试' })}\n\n`);
    res.end();
  }
}
