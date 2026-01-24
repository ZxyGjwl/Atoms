import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingProps {
  onSelectPlan?: (planId: string) => void;
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: '适合体验 Atoms',
    features: [
      '基础 AI 生成',
      '3 个项目',
      '社区支持',
      '基础模板',
    ],
    cta: '开始使用',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: '适合专业开发者',
    features: [
      '无限 AI 生成',
      '无限项目',
      '优先支持',
      '所有模板',
      '自定义域名',
      '团队协作',
      '高级分析',
    ],
    cta: '开始 Pro 试用',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: '适合大型团队',
    features: [
      'Pro 版所有功能',
      '专属支持',
      '自定义集成',
      'SLA 保障',
      '本地部署',
      '高级安全',
    ],
    cta: '联系销售',
    popular: false,
  },
];

export function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section className="py-24 relative" id="pricing">
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
            价格方案
          </h2>
          <p className="text-lg text-zinc-400">
            免费开始，灵活扩展。
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? 'bg-gradient-to-b from-purple-950/50 to-zinc-900/50 border-purple-500/30'
                  : 'bg-zinc-900/30 border-zinc-800'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                    最受欢迎
                  </span>
                </div>
              )}

              {/* Glow Effect */}
              {plan.popular && (
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20" />
              )}

              <div className="relative">
                {/* Plan Name */}
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                
                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-400">{plan.period}</span>
                </div>
                
                {/* Description */}
                <p className="text-sm text-zinc-400 mb-6">{plan.description}</p>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan?.(plan.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-all mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
