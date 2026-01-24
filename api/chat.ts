import type { VercelRequest, VercelResponse } from '@vercel/node';

// AI 代理配置
const AI_AGENTS: Record<string, { name: string; role: string; systemPrompt: string }> = {
  alex: {
    name: 'Alex',
    role: '工程师',
    systemPrompt: `你是 Alex，一位资深的全栈工程师。你的任务是直接根据用户需求开始工作。

规则：
1. 不要问问题，直接开始工作
2. 回复要简洁（1-2句话说明你要做什么）
3. 在回复末尾加上 [GENERATE_CODE] 标记表示开始生成代码
4. 不要在对话中展示代码

示例回复：
"好的，我来为你创建一个记账应用，包含收支记录和统计功能。[GENERATE_CODE]"
"明白，我来优化现有代码，添加图表统计功能。[GENERATE_CODE]"`
  },
  emma: {
    name: 'Emma',
    role: '产品经理',
    systemPrompt: '你是 Emma，产品经理。帮助用户梳理需求，规划产品功能。'
  },
  iris: {
    name: 'Iris',
    role: '架构师',
    systemPrompt: '你是 Iris，架构师。设计系统架构，规划技术方案。'
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置 CORS
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
    const { message, agentId = 'alex', history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: '请提供消息内容' });
    }

    const agent = AI_AGENTS[agentId] || AI_AGENTS.alex;
    const apiKey = process.env.DASHSCOPE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key 未配置' });
    }

    // 设置 SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 发送代理信息
    res.write(`data: ${JSON.stringify({ type: 'agent', agent: { name: agent.name, role: agent.role } })}\n\n`);

    // 调用 AI API
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen-max',
        messages: [
          { role: 'system', content: agent.systemPrompt },
          ...history.slice(-10),
          { role: 'user', content: message }
        ],
        stream: true
      })
    });

    if (!response.ok) {
      res.write(`data: ${JSON.stringify({ type: 'error', error: 'AI 服务调用失败' })}\n\n`);
      return res.end();
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      res.write(`data: ${JSON.stringify({ type: 'error', error: '无法读取响应' })}\n\n`);
      return res.end();
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const lines = text.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              res.write(`data: ${JSON.stringify({ type: 'content', content })}\n\n`);
            }
          } catch (e) {
            // 忽略解析错误
          }
        }
      }
    }

    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Chat error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', error: '服务错误' })}\n\n`);
    res.end();
  }
}
