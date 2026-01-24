import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Server, 
  Zap, 
  Bot, 
  Search,
  Sparkles,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface FeaturesProps {
  onTryNowClick?: (featureId: string) => void;
}

const features = [
  {
    id: 'visual-editor',
    title: 'Visual Editor',
    description: 'Bring your exact design to life. A visual editor to adjust layouts and components quickly.',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
    image: '/assets/features/main.BZ6khW5S.png',
  },
  {
    id: 'backend',
    title: 'Out-of-the-box Backend',
    description: 'Atoms Backend powers your apps with a full-stack backend including user login, database, integrations, and scalable hosting.',
    icon: Server,
    color: 'from-purple-500 to-pink-500',
    image: '/assets/features/light-1.CvUVb2yP.png',
  },
  {
    id: 'race-mode',
    title: 'Race Mode',
    description: 'Run your prompt across multiple models to instantly get the best version.',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    image: '/assets/features/light-2.BlLyKeGJ.png',
  },
  {
    id: 'ai-integrations',
    title: 'Instant AI Integrations',
    description: 'Add powerful AI to your products with models like Gemini and GPT - no API keys and no setup.',
    icon: Bot,
    color: 'from-green-500 to-emerald-500',
    image: '/assets/features/light-3.CE5TJImj.png',
  },
  {
    id: 'seo-agent',
    title: 'SEO Agent',
    description: 'Automatically make your site search-engine-friendly, so Google can crawl, index, and rank pages that bring you real customers.',
    icon: Search,
    comingSoon: true,
    color: 'from-indigo-500 to-purple-500',
    image: '/assets/features/light-4.DV2LWUhr.png',
  },
  {
    id: 'deep-research',
    title: 'Deep Research and Theme',
    description: 'Advanced research capabilities to understand your market and generate insights.',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500',
    image: '/assets/features/5.BB-8mlrJ.png',
  },
];

// 轮播媒体资源 - 1个视频 + 4张图片
const carouselMedia = [
  { type: 'video', src: '/assets/features/unlogin-home-research-1.mp4' },
  { type: 'image', src: '/assets/features/2.D3If1sdD.png' },
  { type: 'image', src: '/assets/features/3.C32qyH0B.png' },
  { type: 'image', src: '/assets/features/4.Bb7n8OM3.png' },
  { type: 'image', src: '/assets/features/5.GkCTOqVq.png' },
];

const highlights = [
  {
    title: '几分钟上线，而非数周',
    description: '告诉 Atoms 您的想法，几分钟内即可看到可用应用。通过与 AI 对话获得完整的功能页面、流程和特性。',
  },
  {
    title: '真实应用，不只是演示',
    description: '构建可发布、增长和扩展的工作产品。所需功能一应俱全，包括用户登录、数据存储、Stripe 支付。',
  },
  {
    title: '自动化运营',
    description: '在一个地方运行您的工作流。进行市场研究、构建和部署应用、改进 SEO、添加 AI 集成，并跟踪结果。',
  },
  {
    title: '获得付费客户和收入',
    description: '将想法转化为人们愿意付费的产品。凭借全栈业务能力，Atoms 负责发布、托管和日常运营。',
  },
  {
    title: '完全掌控',
    description: '随时导出代码并同步到 GitHub。随着业务增长，保持对项目的完全控制。',
  },
];

export function Features({ onTryNowClick }: FeaturesProps) {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoPlayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 自动轮播
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveHighlight((prev) => (prev + 1) % carouselMedia.length);
      }, 5000); // 每5秒切换
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  // 点击切换时暂停自动播放3秒后恢复
  const handleMediaChange = (index: number) => {
    setActiveHighlight(index);
    setIsAutoPlaying(false);
    
    // 3秒后恢复自动播放
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const handlePrev = () => {
    handleMediaChange((activeHighlight - 1 + carouselMedia.length) % carouselMedia.length);
  };

  const handleNext = () => {
    handleMediaChange((activeHighlight + 1) % carouselMedia.length);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            研究、设计、编程、<span className="text-gradient">增长</span>，一站式完成
          </h2>
        </motion.div>

        {/* Highlights Section */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 mb-24">
          {/* Left - Highlight List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                onClick={() => setActiveHighlight(index)}
                whileHover={{ x: 5 }}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  activeHighlight === index
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                    : 'hover:bg-zinc-800/50'
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${
                  activeHighlight === index ? 'text-white' : 'text-zinc-400'
                }`}>
                  {highlight.title}
                </h3>
                <AnimatePresence mode="wait">
                  {activeHighlight === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-zinc-400"
                    >
                      {highlight.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            
            <button
              onClick={() => onTryNowClick?.('highlights')}
              className="mt-4 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              免费试用
            </button>
          </motion.div>

          {/* Right - Media Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-full min-h-[600px]"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20" />
            
            {/* Main Carousel Container - Full Size */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
              <AnimatePresence mode="wait">
                {carouselMedia.map((media, index) => (
                  activeHighlight === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      {media.type === 'video' ? (
                        <div className="relative w-full h-full">
                          <video
                            ref={videoRef}
                            src={media.src}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                          {/* Video overlay indicator */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                            <Play className="w-3 h-3 text-white" />
                            <span className="text-xs text-white">视频演示</span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={media.src}
                          alt={`Feature preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            您所需的一切 构建、发布与变现 <span className="text-gradient">收入</span>集中展示
          </h2>
        </motion.div>

        {/* Left-Right Layout: Cards + Image Preview */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          {/* Left - Feature Cards (Vertical List) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onClick={() => setActiveFeature(feature.id)}
                className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                  activeFeature === feature.id
                    ? 'bg-zinc-800/60 border-zinc-600 ring-1 ring-purple-500/40'
                    : 'bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-800/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} p-0.5`}>
                    <div className="w-full h-full rounded-lg bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white truncate">{feature.title}</h3>
                      {/* Coming Soon Badge */}
                      {feature.comingSoon && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 text-[10px] text-purple-300 bg-purple-500/20 rounded-full">
                          即将推出
                        </span>
                      )}
                    </div>
                    
                    {/* Description - Show on active */}
                    <AnimatePresence mode="wait">
                      {activeFeature === feature.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-zinc-400 mt-1 line-clamp-2"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Active Indicator */}
                  {activeFeature === feature.id && (
                    <motion.div
                      layoutId="activeFeatureIndicator"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              </motion.div>
            ))}

            {/* CTA Button */}
            <button
              onClick={() => onTryNowClick?.('features')}
              className="w-full mt-4 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              立即免费试用
            </button>
          </motion.div>

          {/* Right - Image Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${features.find(f => f.id === activeFeature)?.color || 'from-purple-600 to-pink-600'} rounded-3xl blur-3xl opacity-15 transition-all duration-500`} />
            
            {/* Image Preview Container */}
            <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900/80 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {features.map((feature) => (
                  activeFeature === feature.id && (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 1.02, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
                      
                      {/* Feature Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-30 backdrop-blur-md border border-white/10 mb-3`}>
                          <feature.icon className="w-4 h-4 text-white" />
                          <span className="text-sm font-medium text-white">{feature.title}</span>
                        </div>
                        <p className="text-sm text-zinc-300 max-w-md">{feature.description}</p>
                        
                        {/* CTA */}
                        <button
                          onClick={() => onTryNowClick?.(feature.id)}
                          className="mt-3 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {feature.comingSoon ? '了解更多' : '立即试用'} →
                        </button>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {/* Navigation Dots - Vertical */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeFeature === feature.id
                        ? 'h-6 bg-white'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Features;
