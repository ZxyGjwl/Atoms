// AI 消息类型（预留接口）
export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// AI 配置类型（预留接口）
export interface ChatConfig {
  apiKey?: string;
  model?: string;
  onMessage?: (msg: AIMessage) => void;
}

// 模板类型
export interface Template {
  id: string;
  title: string;
  image: string;
  category: string;
}

// AI 团队成员类型
export interface AITeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  color: string;
}

// 特性类型
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

// 用户评价类型
export interface Testimonial {
  id: string;
  name: string;
  content: string;
  highlightWord?: string;
}

// FAQ 类型
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// 导航链接类型
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
