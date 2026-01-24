import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';

interface ComparisonProps {
  onTryFreeClick?: () => void;
}

// 传统方式需要的工具/技能
const oldWayItems = [
  'Figma', 'Photoshop', 'Webflow', 'React', 'Node.js', 'MongoDB',
  'Stripe', 'AWS', 'Google Analytics', 'Mailchimp', 'Vercel', 'GitHub',
];

// Atoms 一站式解决
const atomsFeatures = [
  { label: 'AI 设计', desc: '智能生成UI' },
  { label: '全栈开发', desc: '前后端一体' },
  { label: '一键部署', desc: '自动化运维' },
];

export function Comparison({ onTryFreeClick }: ComparisonProps) {
  const oldHours = useCountUp({ end: 240, suffix: '+', duration: 2000 });
  const oldTools = useCountUp({ end: 15, suffix: '+', duration: 2000 });
  const newHours = useCountUp({ end: 8, duration: 2000 });
  const newTools = useCountUp({ end: 1, duration: 2000 });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            在线业务，从未如此简单
          </h2>
          <p className="text-lg text-zinc-400">
            从最初的想法到收入增长，Atoms 为您处理一切。
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Old Way Card */}
          <motion.div
            ref={oldHours.ref}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 lg:p-10 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-sm"
          >
            {/* Invisible ref for oldTools - must be visible in DOM for IntersectionObserver */}
            <div ref={oldTools.ref} className="absolute w-0 h-0 opacity-0 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                <span className="text-lg">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold text-zinc-300">传统方式</h3>
            </div>

            {/* Stats */}
            <div className="flex items-baseline gap-6 mb-8">
              <div>
                <span className="text-6xl lg:text-7xl font-black text-white" style={{ fontFamily: 'system-ui' }}>
                  {oldHours.value}
                </span>
                <span className="text-lg text-zinc-500 ml-2">小时</span>
              </div>
              <div>
                <span className="text-5xl lg:text-6xl font-black text-white" style={{ fontFamily: 'system-ui' }}>
                  {oldTools.value}
                </span>
                <span className="text-lg text-zinc-500 ml-2">工具</span>
              </div>
            </div>

            {/* Tool Tags */}
            <div className="flex flex-wrap gap-2">
              {oldWayItems.map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="px-3 py-1.5 text-sm text-zinc-400 bg-zinc-800/60 rounded-full border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                >
                  {item}
                </motion.span>
              ))}
            </div>

            {/* Decorative dots */}
            <div className="absolute top-6 right-6 flex gap-1.5 opacity-30">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
            </div>
          </motion.div>

          {/* Atoms Way Card */}
          <motion.div
            ref={newHours.ref}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-purple-950/60 via-zinc-900/80 to-pink-950/40 border border-purple-500/20 backdrop-blur-sm overflow-hidden"
          >
            {/* Invisible ref for newTools - must be visible in DOM for IntersectionObserver */}
            <div ref={newTools.ref} className="absolute w-0 h-0 opacity-0 pointer-events-none" />
            
            {/* Glow Effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/15 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Atoms 方式</h3>
                <span className="px-2 py-0.5 text-xs font-medium text-purple-300 bg-purple-500/20 rounded-full border border-purple-500/30">
                  推荐
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-baseline gap-6 mb-8">
                <div>
                  <span 
                    className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                    style={{ fontFamily: 'system-ui' }}
                  >
                    {newHours.value}
                  </span>
                  <span className="text-lg text-zinc-400 ml-2">小时</span>
                </div>
                <div>
                  <span 
                    className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                    style={{ fontFamily: 'system-ui' }}
                  >
                    {newTools.value}
                  </span>
                  <span className="text-lg text-zinc-400 ml-2">工具</span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {atomsFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 hover:border-purple-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-sm font-medium text-white mb-0.5">{feature.label}</p>
                    <p className="text-xs text-zinc-500">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onTryFreeClick}
                className="w-full py-4 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 group"
              >
                免费开始
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Decorative gradient line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </motion.div>
        </div>

        {/* Bottom comparison highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-zinc-900/50 border border-zinc-800/50">
            <span className="text-zinc-500">节省</span>
            <span className="text-2xl font-bold text-white">96%</span>
            <span className="text-zinc-500">的时间</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500">减少</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">93%</span>
            <span className="text-zinc-500">的工具</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Comparison;
