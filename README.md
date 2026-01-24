# Atoms.dev Clone - 前端项目

使用 React + TypeScript + Tailwind CSS + Framer Motion 复刻的 atoms.dev 网站前端。

## 技术栈

- **框架**: React 18 + TypeScript + Vite
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion
- **图标**: Lucide React

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
src/
├── components/
│   ├── layout/          # 布局组件
│   │   ├── Header.tsx   # 导航栏
│   │   └── Footer.tsx   # 页脚
│   ├── sections/        # 页面区块
│   │   ├── Hero.tsx     # 首页Hero区域
│   │   ├── Comparison.tsx # Old Way vs Atoms Way
│   │   ├── AITeam.tsx   # AI团队展示
│   │   ├── Features.tsx # 特性展示
│   │   ├── Testimonials.tsx # 用户评价
│   │   ├── Pricing.tsx  # 价格方案
│   │   └── FAQ.tsx      # 常见问题
│   └── ui/              # 可复用UI组件
│       ├── Button.tsx   # 按钮组件
│       ├── GlowCard.tsx # 发光卡片
│       ├── ChatInput.tsx # AI对话输入（预留）
│       ├── ScrollReveal.tsx # 滚动动画
│       └── AnimatedBackground.tsx # 动画背景
├── hooks/
│   └── useCountUp.ts    # 数字递增Hook
├── types/
│   └── index.ts         # TypeScript类型定义
├── App.tsx              # 主应用组件
└── index.css            # 全局样式
```

## 预留接口

### 按钮回调

所有按钮都预留了 `onClick` 回调接口：

```typescript
// App.tsx
const handleLoginClick = () => {
  // 预留：登录逻辑
};

const handleSignUpClick = () => {
  // 预留：注册逻辑
};

const handleStartClick = () => {
  // 预留：开始/跳转逻辑
};
```

### AI 对话接口

`ChatInput` 组件预留了 `onSubmit` 接口，用于后续接入千问 API：

```typescript
import { ChatInput } from './components/ui';

<ChatInput 
  onSubmit={(message) => {
    // 预留：发送消息到千问API
    console.log('用户输入:', message);
  }}
  placeholder="描述你想要构建的内容..."
/>
```

### 类型定义

```typescript
// src/types/index.ts

// AI 消息类型
interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// AI 配置类型
interface ChatConfig {
  apiKey?: string;
  model?: string;
  onMessage?: (msg: AIMessage) => void;
}
```

## 动画效果

- **滚动淡入**: 使用 Framer Motion 的 `whileInView`
- **无限水平滚动**: CSS animation + hover 暂停
- **卡片悬停效果**: `whileHover` scale transform
- **数字递增**: 自定义 `useCountUp` Hook
- **渐变背景动画**: CSS gradient animation
- **发光效果**: CSS box-shadow + blur

## 响应式设计

- 移动端优先设计
- 断点: sm (640px), md (768px), lg (1024px), xl (1280px)
- 支持 `prefers-reduced-motion` 用户偏好

## 后续开发

1. **接入千问 API**: 使用百炼 API 实现 AI 对话功能
2. **添加路由**: 使用 React Router 实现多页面
3. **状态管理**: 根据需要添加 Zustand 或其他状态库
4. **后端集成**: 添加用户认证、数据存储等功能

## License

MIT
