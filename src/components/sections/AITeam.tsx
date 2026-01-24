import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Building2, 
  ClipboardList, 
  Users, 
  TrendingUp, 
  Code, 
  BarChart3,
  X,
  ArrowRight
} from 'lucide-react';

const teamMembers = [
  {
    id: 'iris',
    name: 'Iris',
    role: '深度研究员',
    roleEn: 'Deep Researcher',
    description: '通过深度研究发现真实需求和利基市场，然后将信号转化为聚焦的机会。',
    detailDescription: '你发现机会、理解市场，做出基于研究的决策。',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Iris&backgroundColor=b6e3ff&size=150',
  },
  {
    id: 'bob',
    name: 'Bob',
    role: '架构师',
    roleEn: 'Architect',
    description: '设计系统蓝图，选择合适的结构，使你的应用可扩展且可靠。',
    detailDescription: '你做出架构决策，确保系统的可扩展性和稳定性。',
    icon: Building2,
    color: 'from-purple-500 to-blue-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Bob&backgroundColor=c7d2fe&size=150',
  },
  {
    id: 'emma',
    name: 'Emma',
    role: '产品经理',
    roleEn: 'Product Manager',
    description: '将你的想法转化为清晰的规格和范围，使构建保持简单和可用。',
    detailDescription: '你定义产品愿景，我来确保每个细节都被考虑到。',
    icon: ClipboardList,
    color: 'from-pink-500 to-purple-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Emma&backgroundColor=fce7f3&size=150',
  },
  {
    id: 'mike',
    name: 'Mike',
    role: '团队领导',
    roleEn: 'Team Leader',
    description: '端到端运行计划，协调代理，并请求你的批准，让你快速推进的同时保持知情。',
    detailDescription: '你做决策，我协调整个团队确保项目按时交付。',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Mike&backgroundColor=fed7aa&size=150',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    role: 'SEO 专家',
    roleEn: 'SEO Specialist',
    description: '快速启动 SEO 页面并自动化优化，以更低的成本快速带来自然流量。',
    detailDescription: '你确定增长目标，我负责优化搜索排名和流量。',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Sarah&backgroundColor=d1fae5&size=150',
  },
  {
    id: 'alex',
    name: 'Alex',
    role: '工程师',
    roleEn: 'Engineer',
    description: '通过连接前端、后端、集成和部署，构建一个可投入生产的全栈应用。',
    detailDescription: '你做技术决策，我负责编写高质量的代码。',
    icon: Code,
    color: 'from-violet-500 to-purple-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Alex&backgroundColor=ddd6fe&size=150',
  },
  {
    id: 'david',
    name: 'David',
    role: '数据分析师',
    roleEn: 'Data Analyst',
    description: '通过分析海量数据发现增长机会，并呈现清晰洞察，帮助您做出更明智、数据驱动的决策。',
    detailDescription: '你做出更明智、以数据为依据的决策。',
    icon: BarChart3,
    color: 'from-teal-500 to-cyan-500',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=David&backgroundColor=ccfbf1&size=150',
  },
];

// Duplicate for infinite scroll
const duplicatedMembers = [...teamMembers, ...teamMembers];

interface AITeamProps {
  onCollaborateClick?: () => void;
}

export function AITeam({ onCollaborateClick }: AITeamProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [expandedMember, setExpandedMember] = useState<typeof teamMembers[0] | null>(null);

  const handleCollaborateClick = () => {
    setExpandedMember(null);
    onCollaborateClick?.();
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            您的 <span className="text-gradient">AI 团队</span>，更快构建，赢得客户
          </h2>
          <p className="text-lg text-zinc-400 max-w-5xl mx-auto whitespace-nowrap">
            完整的 AI 团队帮助您以更低成本更快上线。您做决策，AI 代理处理研究、规划、构建、测试和增长。
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Cards */}
        <div 
          className="flex gap-6 animate-scroll-left"
          style={{
            animationPlayState: isHovering ? 'paused' : 'running',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {duplicatedMembers.map((member, index) => (
            <motion.div
              key={`${member.id}-${index}`}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => setExpandedMember(member)}
              className="relative flex-shrink-0 w-72 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all group cursor-pointer overflow-hidden"
            >
              {/* Avatar/Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} p-0.5 mb-4`}>
                <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center overflow-hidden relative">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 items-center justify-center text-white text-xl font-semibold">
                    {member.name.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
              <p className={`text-sm font-medium bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-3`}>
                {member.role}
              </p>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                {member.description}
              </p>

              {/* Expand indicator */}
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-zinc-400 text-lg">+</span>
              </div>

              {/* Glow Effect on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {expandedMember && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedMember(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="relative rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
                {/* Gradient Header */}
                <div className={`h-32 bg-gradient-to-br ${expandedMember.color} relative`}>
                  {/* Close Button */}
                  <button
                    onClick={() => setExpandedMember(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Avatar */}
                  <div className="absolute -bottom-8 left-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${expandedMember.color} p-0.5 shadow-xl`}>
                      <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center overflow-hidden relative">
                        <img 
                          src={expandedMember.avatar} 
                          alt={expandedMember.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="hidden absolute inset-0 items-center justify-center text-white text-2xl font-semibold">
                          {expandedMember.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-12 px-6 pb-6">
                  {/* Name & Role */}
                  <h3 className="text-2xl font-bold text-white mb-1">{expandedMember.role}</h3>
                  <p className="text-sm text-zinc-500 mb-4">{expandedMember.roleEn}</p>

                  {/* Description */}
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    {expandedMember.description}
                  </p>

                  {/* Detail Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {expandedMember.detailDescription}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={handleCollaborateClick}
                    className={`w-full py-3 rounded-xl bg-gradient-to-r ${expandedMember.color} text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                  >
                    与所有专家合作
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default AITeam;
