import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Users, Trophy, Copy, Check, Maximize2, X } from 'lucide-react';
import { 
  // SaaS Apps
  InvestmentPreview, 
  SaaSCRMPreview, 
  SaaSAnalyticsPreview,
  // E-commerce
  FitnessPreview, 
  EcommerceGroceryPreview, 
  EcommerceLuxuryPreview,
  // Internal Tools
  InternalHRPreview, 
  InternalInventoryPreview, 
  InternalProjectPreview,
  // Personal Projects
  MangaPreview, 
  PersonalBlogPreview, 
  PersonalPortfolioPreview 
} from '../ui/previews';

interface HeroProps {
  onCloneTemplate?: (prompt: string) => void;
}

const categories = [
  { id: 'saas', label: 'SaaS 应用' },
  { id: 'ecommerce', label: '电子商务' },
  { id: 'internal', label: '内部工具' },
  { id: 'personal', label: '个人项目' },
];

const templates = [
  // ========== SaaS 应用 (3个) ==========
  {
    id: 'saas-1',
    title: 'FinTrack Pro Dashboard',
    category: 'saas',
    preview: InvestmentPreview,
    prompt: `创建一个专业的金融科技投资仪表板，风格要求：

【整体风格】
- 深色主题 (#0B1120 为主背景)
- 科技感、数据驱动的专业设计
- 青色(#06b6d4)和紫色渐变作为强调色

【页面结构】
1. 顶部导航栏：渐变Logo + 导航菜单 + 用户头像
2. 统计卡片区（4列网格）：总资产、盈亏、持仓、风险评分
3. 主内容区：左侧投资组合曲线图 + 右侧资产监视列表

【设计细节】
- 毛玻璃效果卡片 (backdrop-blur)
- 圆角设计 (rounded-2xl)
- 渐变装饰元素`,
  },
  {
    id: 'saas-2',
    title: 'SalesFlow CRM',
    category: 'saas',
    preview: SaaSCRMPreview,
    prompt: `创建一个专业的客户关系管理(CRM)系统，风格要求：

【整体风格】
- 浅灰背景 (#F8FAFC)，清爽专业
- 蓝色(#2563EB)作为主色调
- 商务风格，信息层次分明

【页面结构】
1. 顶部导航：Logo + 导航菜单 + 新建按钮
2. 统计卡片：收入、活跃交易、转化率、平均交易额
3. 销售漏斗：多阶段可视化展示
4. 活动列表：最近动态时间线

【设计细节】
- 白色卡片 + 柔和边框
- 圆角设计 (rounded-xl)
- 状态颜色区分`,
  },
  {
    id: 'saas-3',
    title: 'Metrix Analytics',
    category: 'saas',
    preview: SaaSAnalyticsPreview,
    prompt: `创建一个数据分析平台仪表板，风格要求：

【整体风格】
- 深蓝暗色主题 (#0F172A)
- 紫色/洋红色渐变作为强调色
- 数据可视化优先

【页面结构】
1. 顶部导航：Logo + 功能菜单 + 用户信息
2. 核心指标：用户数、会话数、跳出率、平均时长
3. 流量图表：柱状图展示流量趋势
4. 流量来源：进度条可视化
5. 热门页面：表格形式展示

【设计细节】
- 渐变柱状图
- 进度条指示器
- 暗色系表格设计`,
  },

  // ========== 电子商务 (3个) ==========
  {
    id: 'ecommerce-1',
    title: 'NOVA Fashion',
    category: 'ecommerce',
    preview: FitnessPreview,
    prompt: `创建一个现代时尚电商网站，风格要求：

【整体风格】
- 纯白背景，明亮现代
- 玫瑰粉(rose)和橙色渐变作为品牌色
- 产品聚焦，购物体验优先

【页面结构】
1. 导航栏：Logo + 分类菜单 + 购物车
2. Hero横幅：新品推广 + CTA按钮
3. 产品网格：4列产品卡片展示
4. 服务特性：配送/退货/支付/客服

【设计细节】
- 彩色产品背景
- 圆角卡片设计
- 悬停动画效果`,
  },
  {
    id: 'ecommerce-2',
    title: 'FreshMart 生鲜',
    category: 'ecommerce',
    preview: EcommerceGroceryPreview,
    prompt: `创建一个生鲜电商网站，风格要求：

【整体风格】
- 清新绿色基调 (#F0FDF4)
- 自然、健康、活力的视觉感受
- 便捷的购物体验

【页面结构】
1. 顶部：Logo + 搜索框 + 配送地址 + 购物车
2. Hero横幅：促销信息 + 30分钟配送
3. 分类图标：蔬菜/水果/乳制品/肉类/烘焙/饮品
4. 热门产品：5列产品网格

【设计细节】
- emoji图标分类
- 彩色分类背景
- 快速添加购物车按钮`,
  },
  {
    id: 'ecommerce-3',
    title: 'LUXE 奢侈品',
    category: 'ecommerce',
    preview: EcommerceLuxuryPreview,
    prompt: `创建一个奢侈品电商网站，风格要求：

【整体风格】
- 纯黑背景 (#0A0A0A)
- 金色(amber)作为点缀色
- 衬线字体，高端奢华感

【页面结构】
1. 极简导航：分类 + Logo居中 + 账户/购物袋
2. Hero区域：全屏展示 + 品牌故事
3. 精选商品：大图产品展示
4. 品牌历史：优雅的品牌故事区

【设计细节】
- 超大字母间距
- 微妙的动画过渡
- 高端图片排版`,
  },

  // ========== 内部工具 (3个) ==========
  {
    id: 'internal-1',
    title: 'HR Portal 人事系统',
    category: 'internal',
    preview: InternalHRPreview,
    prompt: `创建一个企业人事管理系统，风格要求：

【整体风格】
- 侧边栏导航布局
- 靛蓝色(indigo)主色调
- 专业、清晰、高效

【页面结构】
1. 左侧侧边栏：Logo + 功能菜单（仪表板/员工/考勤/薪资/休假/招聘/设置）
2. 顶部：标题 + 添加员工按钮
3. 统计卡片：总人数/出勤/休假/招聘
4. 员工表格：最近入职员工列表

【设计细节】
- 状态标签（在职/休假）
- 头像占位
- 清晰的表格设计`,
  },
  {
    id: 'internal-2',
    title: 'StockMaster 库存管理',
    category: 'internal',
    preview: InternalInventoryPreview,
    prompt: `创建一个库存管理系统，风格要求：

【整体风格】
- 深蓝灰主题 (#1E293B)
- 琥珀色/橙色作为强调色
- 数据密集型界面

【页面结构】
1. 顶部导航：Logo + 功能菜单 + 添加产品
2. 统计卡片：产品总数/低库存/缺货/总价值
3. 库存表格：SKU/名称/分类/库存/价格/状态
4. 搜索和筛选功能

【设计细节】
- 状态颜色指示（绿色在库/黄色低库存/红色缺货）
- 渐变图标背景
- 悬停行高亮`,
  },
  {
    id: 'internal-3',
    title: 'TaskFlow 项目管理',
    category: 'internal',
    preview: InternalProjectPreview,
    prompt: `创建一个项目管理看板系统，风格要求：

【整体风格】
- 白色清爽背景
- 紫色(violet)作为主色调
- 看板式任务管理

【页面结构】
1. 顶部导航：Logo + 新建任务 + 用户头像
2. 左侧边栏：项目列表 + 团队成员
3. 看板主区域：四列（待办/进行中/审核/完成）
4. 任务卡片：任务名 + 负责人 + 截止日期

【设计细节】
- 拖拽式卡片
- 列状态颜色指示
- 团队头像堆叠`,
  },

  // ========== 个人项目 (3个) ==========
  {
    id: 'personal-1',
    title: 'Creative Studio 设计机构',
    category: 'personal',
    preview: MangaPreview,
    prompt: `创建一个高端创意设计机构官网，风格要求：

【整体风格】
- 亮色奶油背景 (#FAF8F5)
- 极简主义、艺术感、大胆排版
- 衬线字体营造高级感

【页面结构】
1. 顶部导航：Logo + 菜单 + CTA按钮
2. Hero区域：超大标题 + 斜体强调
3. 作品集网格：不规则布局展示
4. 底部统计：4列数字展示

【设计细节】
- 柔和背景色卡片
- 圆角设计 (rounded-3xl)
- 悬停交互效果`,
  },
  {
    id: 'personal-2',
    title: 'The Journal 博客',
    category: 'personal',
    preview: PersonalBlogPreview,
    prompt: `创建一个个人博客网站，风格要求：

【整体风格】
- 暖色奶油背景 (#FFFBF5)
- 衬线字体，阅读舒适
- 极简优雅的排版

【页面结构】
1. 顶部导航：博客名 + 导航链接
2. 特色文章：大图 + 标题 + 作者信息
3. 最近文章：3列文章卡片
4. 订阅区域：邮件订阅表单

【设计细节】
- 柔和的彩色背景
- 阅读时间显示
- 优雅的排版层次`,
  },
  {
    id: 'personal-3',
    title: 'Alex.Design 作品集',
    category: 'personal',
    preview: PersonalPortfolioPreview,
    prompt: `创建一个设计师作品集网站，风格要求：

【整体风格】
- 纯黑背景 (#0D0D0D)
- 渐变色彩作为项目展示
- 现代科技感

【页面结构】
1. 极简导航：个人品牌名 + 菜单
2. Hero区域：大标题介绍 + 渐变文字
3. 项目网格：2列大图项目展示
4. 技能标签：技术栈展示

【设计细节】
- 渐变项目卡片
- 悬停动画效果
- 技能胶囊标签`,
  },
];

const stats = [
  { icon: Github, value: '100K+', label: 'GitHub Star' },
  { icon: Users, value: '1,000,000+', label: 'Builders' },
  { icon: Trophy, value: '#1', label: 'on ProductHunt' },
];

export function Hero({ onCloneTemplate }: HeroProps) {
  const [activeCategory, setActiveCategory] = useState('saas');
  const [expandedTemplate, setExpandedTemplate] = useState<typeof templates[0] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 根据当前选中的分类筛选模板
  const filteredTemplates = templates.filter(t => t.category === activeCategory);

  const handleCopyPrompt = async (template: typeof templates[0]) => {
    try {
      await navigator.clipboard.writeText(template.prompt);
      setCopiedId(template.id);
      setTimeout(() => setCopiedId(null), 2000);
      onCloneTemplate?.(template.prompt);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            从模板开始
          </h1>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-white text-black'
                  : 'bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Template Cards - Mini Website Previews */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-6 mb-16 overflow-x-auto pb-4 hide-scrollbar"
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative flex-shrink-0 w-80"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity -z-10" />

                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/80 border-b border-zinc-700">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="h-5 bg-zinc-700/50 rounded-full px-3 flex items-center">
                      <span className="text-[10px] text-zinc-500 truncate">
                        atoms.dev/preview/{template.title.toLowerCase().replace(/\s+/g, '-')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini Website Preview */}
                <div 
                  className="relative h-48 overflow-hidden bg-zinc-950 cursor-pointer"
                  onClick={() => setExpandedTemplate(template)}
                >
                  {/* Scaled down website */}
                  <div className="absolute inset-0 transform scale-[0.35] origin-top-left w-[286%] h-[286%] pointer-events-none">
                    <template.preview />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-900 to-transparent" />
                </div>

                {/* Info & Actions */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs text-purple-400 block mb-1">Remix the Session</span>
                      <h3 className="text-base font-semibold text-white">{template.title}</h3>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setExpandedTemplate(template)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                      预览
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCopyPrompt(template)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition-colors"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          克隆
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center max-w-6xl mx-auto"
        >
          <p className="text-base md:text-lg text-zinc-500 mb-8">基于领先的开源创新技术</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 lg:gap-24">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-zinc-500" />
                <div className="text-left">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm md:text-base text-zinc-500 mt-1">
                    {stat.label === 'GitHub Star' ? 'GitHub Stars' : 
                     stat.label === 'Builders' ? '开发者' : 
                     stat.label === 'on ProductHunt' ? 'ProductHunt 排名第一' : stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Expanded Template Modal */}
      <AnimatePresence>
        {expandedTemplate && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedTemplate(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex flex-col bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 flex-shrink-0">
                <div>
                  <h3 className="text-lg font-semibold text-white">{expandedTemplate.title}</h3>
                  <p className="text-sm text-zinc-400">{categories.find(c => c.id === expandedTemplate.category)?.label}</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Clone Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCopyPrompt(expandedTemplate)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all"
                  >
                    {copiedId === expandedTemplate.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        已复制提示词
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        克隆会话
                      </>
                    )}
                  </motion.button>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setExpandedTemplate(null)}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="flex-1 overflow-auto bg-zinc-950">
                <div className="min-h-full">
                  <expandedTemplate.preview />
                </div>
              </div>

              {/* Prompt Preview Footer */}
              <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur flex-shrink-0">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 mb-2">提示词预览 (点击克隆会话复制)</p>
                    <p className="text-sm text-zinc-300 line-clamp-2">{expandedTemplate.prompt}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopyPrompt(expandedTemplate)}
                    className="flex-shrink-0 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    {copiedId === expandedTemplate.id ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Hero;
