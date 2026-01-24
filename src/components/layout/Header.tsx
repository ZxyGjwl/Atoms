import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const navLinks = [
  { label: '价格方案', href: '#pricing' },
  {
    label: '资源中心',
    href: '#',
    children: [
      { label: 'Blog', href: '#blog' },
      { label: '使用案例', href: '#usecases' },
      { label: '视频教程', href: '#videos' },
      { label: '帮助中心', href: '#help' },
    ],
  },
];

export function Header({ onLoginClick, onSignUpClick, isAuthenticated, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-white">Atoms</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 py-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl"
                    >
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <a
                  href="/workspace"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  工作台
                </a>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-all"
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  登录
                </button>
                <button
                  onClick={onSignUpClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  注册
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    className="block text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <div className="mt-2 ml-4 space-y-2">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block text-sm text-zinc-500 hover:text-white transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <button
                  onClick={onLoginClick}
                  className="w-full py-2 text-zinc-400 hover:text-white transition-colors"
                >
                  登录
                </button>
                <button
                  onClick={onSignUpClick}
                  className="w-full py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"
                >
                  注册
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
