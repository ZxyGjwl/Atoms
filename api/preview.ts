import type { VercelRequest, VercelResponse } from '@vercel/node';

// 处理代码，移除 TypeScript 类型
function processCode(code: string): string {
  let result = code;
  
  // 移除 import 语句
  result = result.split('\n').filter(line => {
    const trimmed = line.trim();
    return !trimmed.startsWith('import ');
  }).join('\n');
  
  // 移除 export 关键字
  result = result.replace(/^export\s+default\s+/gm, '');
  result = result.replace(/^export\s+/gm, '');
  
  // 移除 TypeScript 类型定义
  result = result.split('\n').filter(line => {
    const trimmed = line.trim();
    return !trimmed.startsWith('interface ') && !trimmed.startsWith('type ');
  }).join('\n');
  
  // 移除 Hook 泛型
  result = result.replace(/useState<[^>]+>/g, 'useState');
  result = result.replace(/useRef<[^>]+>/g, 'useRef');
  result = result.replace(/useCallback<[^>]+>/g, 'useCallback');
  result = result.replace(/useMemo<[^>]+>/g, 'useMemo');
  
  // 移除 React.FC 类型
  result = result.replace(/:\s*React\.FC\s*=>/g, ' =>');
  result = result.replace(/:\s*FC\s*=>/g, ' =>');
  
  return result;
}

// 生成预览 HTML
function generatePreviewHtml(files: { path: string; content: string }[]): string {
  const componentFiles = files.filter(f => 
    (f.path.includes('.jsx') || f.path.includes('.tsx')) && 
    !f.path.includes('App.')
  );
  const appFile = files.find(f => f.path.includes('App.tsx') || f.path.includes('App.jsx'));
  const cssFile = files.find(f => f.path.includes('.css'));

  let allComponentsCode = '';
  for (const file of componentFiles) {
    allComponentsCode += processCode(file.content) + '\n\n';
  }
  
  const appCode = processCode(appFile?.content || '');
  const cssCode = cssFile?.content || '';
  const processedCode = allComponentsCode + appCode;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>应用预览</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { font-family: 'Inter', sans-serif; }
    ${cssCode}
  </style>
</head>
<body class="bg-gray-900 min-h-screen">
  <div id="root"></div>
  
  <script type="text/babel" data-presets="react">
    const { useState, useEffect, useRef, useCallback, useMemo, Component } = React;
    
    // 错误边界
    class ErrorBoundary extends Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }
      
      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }
      
      render() {
        if (this.state.hasError) {
          return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
              <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-8 max-w-lg">
                <div className="text-6xl mb-4 text-center">{'⚠️'}</div>
                <h1 className="text-2xl font-bold text-white mb-4 text-center">渲染错误</h1>
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <p className="text-red-300 text-sm font-mono break-all">
                    {this.state.error?.message || '未知错误'}
                  </p>
                </div>
              </div>
            </div>
          );
        }
        return this.props.children;
      }
    }
    
    // 占位组件
    const Placeholder = () => (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">{'🔧'}</div>
          <h1 className="text-2xl font-bold text-white mb-2">预览加载中</h1>
        </div>
      </div>
    );
    
    ${processedCode}
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    const MainComponent = typeof App !== 'undefined' ? App 
      : typeof TodoApp !== 'undefined' ? TodoApp 
      : typeof Main !== 'undefined' ? Main 
      : Placeholder;
    
    root.render(
      <ErrorBoundary>
        <MainComponent />
      </ErrorBoundary>
    );
  </script>
</body>
</html>`;
}

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
    const { files } = req.body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: '没有文件可预览' });
    }

    const html = generatePreviewHtml(files);
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Preview error:', error);
    res.status(500).json({ error: '预览生成失败' });
  }
}
