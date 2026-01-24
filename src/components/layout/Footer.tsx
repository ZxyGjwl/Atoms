import { useState } from 'react';
import { Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';

interface FooterProps {
  onStartClick?: (message?: string) => void;
}

const footerLinks = {
  product: [
    { label: 'Pricing', href: '#pricing' },
    { label: '更新日志', href: '#changelog' },
    { label: '帮助中心', href: '#help' },
  ],
  resources: [
    { label: 'Blog', href: '#blog' },
    { label: '使用案例', href: '#usecases' },
    { label: '视频教程', href: '#videos' },
    { label: 'GitHub', href: 'https://github.com' },
  ],
  about: [
    { label: 'MetaGPT', href: '#' },
    { label: 'OpenManus', href: '#' },
    { label: 'Foundation Agents', href: '#' },
    { label: '隐私政策', href: '#privacy' },
    { label: '服务条款', href: '#terms' },
  ],
  community: [
    { label: '联盟计划', href: '#' },
    { label: '探索者计划', href: '#' },
    { label: 'X / Twitter', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Discord', href: 'https://discord.com' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://x.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export function Footer({ onStartClick }: FooterProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 如果用户输入了内容，使用用户输入；否则使用预制文本
    const message = inputValue.trim() || '告知Atoms团队您的需求';
    onStartClick?.(message);
  };

  return (
    <footer className="bg-black border-t border-zinc-900">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            将想法转化为<br />
            <span className="text-gradient">畅销产品</span>
          </h2>
          
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-900 border border-zinc-800 focus-within:border-purple-500/50 transition-colors">
              {/* Input */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="告知Atoms团队您的需求"
                className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none px-4 py-3 text-base"
              />
              
              {/* Submit Button */}
              <button
                type="submit"
                className="flex-shrink-0 px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
              >
                开始
              </button>
            </div>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">产品</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">资源</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">关于</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">社区</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-900">
          {/* Social Links */}
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-sm text-zinc-500 mb-4 md:mb-0">
            将想法转化为畅销产品
          </p>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <select className="bg-transparent text-sm text-zinc-500 border border-zinc-800 rounded px-2 py-1 focus:outline-none focus:border-zinc-600">
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-white">Atoms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
