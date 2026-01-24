import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

interface LandingHeroProps {
  onStartClick?: (prompt: string) => void;
  onScrollDown?: () => void;
}

// 示例提示词循环
const examplePrompts = [
  '为我的咖啡店打造一个漂亮的品牌网站...',
  '创建一个投资组合监控仪表板...',
  '设计一个时尚电商购物平台...',
  '构建一个创意设计机构官网...',
  '开发一个健身追踪应用...',
];

export function LandingHero({ onStartClick, onScrollDown }: LandingHeroProps) {
  const [inputValue, setInputValue] = useState('');
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // 打字机效果
  useEffect(() => {
    const currentPrompt = examplePrompts[currentPromptIndex];
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isTyping) {
      // 打字阶段
      const typeChar = () => {
        if (currentIndex < currentPrompt.length) {
          setDisplayedPrompt(currentPrompt.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeChar, 50); // 打字速度
        } else {
          // 打字完成，等待后开始删除
          setTimeout(() => {
            setIsTyping(false);
          }, 2000); // 显示完整文本2秒
        }
      };
      typeChar();
    } else {
      // 删除阶段
      const deleteChar = () => {
        if (currentIndex > 0) {
          setDisplayedPrompt(currentPrompt.slice(0, currentIndex - 1));
          currentIndex--;
          timeoutId = setTimeout(deleteChar, 30); // 删除速度
        } else {
          // 删除完成，切换到下一个提示词
          setCurrentPromptIndex((prev) => (prev + 1) % examplePrompts.length);
          setIsTyping(true);
        }
      };
      deleteChar();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentPromptIndex, isTyping]);

  // 光标闪烁效果
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onStartClick?.(inputValue);
      setInputValue('');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-pink-950/20 to-transparent pointer-events-none" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            把想法变成可销售的{' '}
            <span className="text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              产品
            </span>
          </h1>
        </motion.div>

        {/* Sub-Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            AI 员工用于验证想法、构建产品并获取客户。几分钟内完成。无需编码。
          </p>
        </motion.div>

        {/* Input Field with CTA */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="relative max-w-3xl mx-auto mb-20"
        >
          <div className="relative flex items-center gap-4 p-3 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 focus-within:border-purple-500/50 transition-all shadow-2xl shadow-purple-500/10">
            {/* AI Icon */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ml-2">
              <Sparkles className="w-7 h-7 text-white" />
            </div>

            {/* Input with Animated Placeholder */}
            <div className="flex-1 relative min-h-[60px] flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent text-white text-xl focus:outline-none py-2"
                style={{ caretColor: 'white' }}
              />
              {/* Animated Placeholder - shows when input is empty */}
              {!inputValue && (
                <div className="absolute inset-0 text-left text-xl text-zinc-500 py-2 pointer-events-none">
                  <span>{displayedPrompt}</span>
                  <span className={`inline-block w-0.5 h-6 bg-purple-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!inputValue.trim()}
              className="flex-shrink-0 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              开始
              <span className="text-xl">→</span>
            </motion.button>
          </div>
        </motion.form>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={onScrollDown}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 text-zinc-500 hover:text-white transition-colors"
            aria-label="向下滚动"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingHero;
