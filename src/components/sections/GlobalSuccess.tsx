import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as echarts from 'echarts';
import 'echarts-gl';

// 25个国家的用户案例数据
const successCases = [
  // 亚洲
  { id: 1, name: 'Li Wei', country: '中国', flag: '🇨🇳', position: { lng: 121.4, lat: 31.2 }, quote: '作为上海的创业者，我用 Atoms 构建了一个智能客服系统，大大提升了客户满意度和运营效率。', gradient: 'from-red-400 via-pink-300 to-rose-300' },
  { id: 2, name: 'Yuki', country: '日本', flag: '🇯🇵', position: { lng: 139.6, lat: 35.6 }, quote: '作为东京的产品经理，我使用 Atoms 在一周内构建了客户反馈平台，帮助团队更快迭代产品。', gradient: 'from-rose-400 via-orange-300 to-amber-200' },
  { id: 3, name: 'Min-jun', country: '韩国', flag: '🇰🇷', position: { lng: 126.9, lat: 37.5 }, quote: '在首尔运营电商平台，Atoms 帮我快速搭建了库存管理系统，效率提升了3倍。', gradient: 'from-blue-400 via-sky-300 to-cyan-300' },
  { id: 4, name: 'Priya', country: '印度', flag: '🇮🇳', position: { lng: 77.2, lat: 28.6 }, quote: '作为班加罗尔的开发者，Atoms 让我能专注于业务逻辑而非基础设施搭建。', gradient: 'from-orange-400 via-amber-300 to-yellow-300' },
  { id: 5, name: 'Ahmad', country: '印度尼西亚', flag: '🇮🇩', position: { lng: 106.8, lat: -6.2 }, quote: '在雅加达创业，我用 Atoms 构建了本地化的支付解决方案，服务超过10万用户。', gradient: 'from-red-400 via-rose-300 to-pink-300' },
  { id: 6, name: 'Nguyen', country: '越南', flag: '🇻🇳', position: { lng: 105.8, lat: 21.0 }, quote: '在河内经营教育科技公司，Atoms 帮我快速上线在线学习平台。', gradient: 'from-yellow-400 via-amber-300 to-orange-300' },
  { id: 7, name: 'Tanaka', country: '新加坡', flag: '🇸🇬', position: { lng: 103.8, lat: 1.3 }, quote: '作为新加坡金融科技创始人，Atoms 让我们的合规系统开发时间缩短了80%。', gradient: 'from-red-400 via-pink-300 to-purple-300' },
  { id: 8, name: 'Omar', country: '阿联酋', flag: '🇦🇪', position: { lng: 55.3, lat: 25.2 }, quote: '在迪拜运营房地产平台，Atoms 帮我构建了智能房源匹配系统。', gradient: 'from-amber-400 via-yellow-300 to-lime-300' },
  
  // 欧洲
  { id: 9, name: 'Sarah', country: '德国', flag: '🇩🇪', position: { lng: 13.4, lat: 52.5 }, quote: '作为柏林的自由设计师，我用 Atoms 为客户构建电商网站，从设计到上线只用了3天。', gradient: 'from-amber-400 via-yellow-300 to-lime-300' },
  { id: 10, name: 'Pierre', country: '法国', flag: '🇫🇷', position: { lng: 2.3, lat: 48.8 }, quote: '在巴黎经营精品咖啡店，Atoms 帮我构建了会员积分和预约系统。', gradient: 'from-blue-400 via-indigo-300 to-violet-300' },
  { id: 11, name: 'James', country: '英国', flag: '🇬🇧', position: { lng: -0.1, lat: 51.5 }, quote: '作为伦敦的产品顾问，我用 Atoms 为客户快速验证商业想法，节省大量开发成本。', gradient: 'from-red-400 via-rose-300 to-pink-300' },
  { id: 12, name: 'Marco', country: '意大利', flag: '🇮🇹', position: { lng: 12.5, lat: 41.9 }, quote: '在罗马运营旅游平台，Atoms 让我能快速响应市场需求，推出新功能。', gradient: 'from-green-400 via-emerald-300 to-teal-300' },
  { id: 13, name: 'Anna', country: '波兰', flag: '🇵🇱', position: { lng: 21.0, lat: 52.2 }, quote: '作为华沙的技术创业者，Atoms 帮我从想法到产品只用了一周时间。', gradient: 'from-red-400 via-pink-300 to-rose-300' },
  { id: 14, name: 'Erik', country: '瑞典', flag: '🇸🇪', position: { lng: 18.0, lat: 59.3 }, quote: '在斯德哥尔摩开发可持续发展应用，Atoms 让环保科技触手可及。', gradient: 'from-blue-400 via-sky-300 to-cyan-300' },
  { id: 15, name: 'Sofia', country: '西班牙', flag: '🇪🇸', position: { lng: -3.7, lat: 40.4 }, quote: '在马德里经营健身工作室，用 Atoms 构建了完整的会员管理系统。', gradient: 'from-orange-400 via-amber-300 to-yellow-300' },
  
  // 美洲
  { id: 16, name: 'Michael', country: '美国', flag: '🇺🇸', position: { lng: -122.4, lat: 37.7 }, quote: '作为硅谷连续创业者，Atoms 是我验证新想法的首选工具。', gradient: 'from-blue-400 via-indigo-300 to-purple-300' },
  { id: 17, name: 'Carlos', country: '巴西', flag: '🇧🇷', position: { lng: -46.6, lat: -23.5 }, quote: '在圣保罗经营初创公司，Atoms 让我能在几天内构建和测试 MVP。', gradient: 'from-green-400 via-teal-300 to-cyan-300' },
  { id: 18, name: 'Maria', country: '墨西哥', flag: '🇲🇽', position: { lng: -99.1, lat: 19.4 }, quote: '在墨西哥城运营餐饮连锁，Atoms 帮我构建了供应链管理系统。', gradient: 'from-green-400 via-emerald-300 to-lime-300' },
  { id: 19, name: 'Lucas', country: '阿根廷', flag: '🇦🇷', position: { lng: -58.4, lat: -34.6 }, quote: '作为布宜诺斯艾利斯的设计师，Atoms 让我能独立完成全栈项目。', gradient: 'from-sky-400 via-blue-300 to-indigo-300' },
  { id: 20, name: 'Emma', country: '加拿大', flag: '🇨🇦', position: { lng: -79.3, lat: 43.6 }, quote: '在多伦多创办教育科技公司，Atoms 加速了我们的产品迭代周期。', gradient: 'from-red-400 via-rose-300 to-pink-300' },
  
  // 非洲和大洋洲
  { id: 21, name: 'Hicham', country: '利比里亚', flag: '🇱🇷', position: { lng: -9.4, lat: 6.4 }, quote: '我在利比里亚消费品公司从事 IT 工作，构建了请假管理系统简化人力资源流程。', gradient: 'from-purple-400 via-pink-300 to-blue-300' },
  { id: 22, name: 'Amara', country: '尼日利亚', flag: '🇳🇬', position: { lng: 3.4, lat: 6.5 }, quote: '在拉各斯经营金融科技公司，Atoms 帮我快速构建移动支付解决方案。', gradient: 'from-green-400 via-emerald-300 to-teal-300' },
  { id: 23, name: 'Thabo', country: '南非', flag: '🇿🇦', position: { lng: 28.0, lat: -26.2 }, quote: '在约翰内斯堡运营物流平台，Atoms 让我的配送调度系统快速上线。', gradient: 'from-yellow-400 via-amber-300 to-orange-300' },
  { id: 24, name: 'Alex', country: '澳大利亚', flag: '🇦🇺', position: { lng: 151.2, lat: -33.8 }, quote: '在悉尼运营健身工作室，构建了会员管理和课程预约系统，完全自动化日常运营。', gradient: 'from-blue-400 via-indigo-300 to-purple-300' },
  { id: 25, name: 'Aroha', country: '新西兰', flag: '🇳🇿', position: { lng: 174.7, lat: -41.2 }, quote: '在惠灵顿创办旅游科技公司，Atoms 帮我快速构建预订和评价系统。', gradient: 'from-teal-400 via-cyan-300 to-sky-300' },
];

// 根据经纬度计算地球视角，使国家点位于正中心
const getViewControl = (lng: number, lat: number) => ({
  alpha: lat,        // 垂直角度 = 纬度
  beta: -lng + 180,  // 水平角度 = 经度的反向偏移
});

export function GlobalSuccess() {
  const [activeCase, setActiveCase] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const globeChartRef = useRef<echarts.ECharts | null>(null);
  const mapChartRef = useRef<echarts.ECharts | null>(null);

  // 初始化 ECharts 地球
  useEffect(() => {
    if (!chartRef.current) return;

    const initGlobe = async () => {
      try {
        // 加载世界地图数据
        const response = await fetch('https://unpkg.com/@surbowl/world-geo-json-zh@2.1.4/world.zh.json');
        const geojson = await response.json();
        
        // 注册地图
        echarts.registerMap('world', geojson);

        // 创建隐藏的 canvas 用于地图纹理
        const canvas = document.createElement('canvas');
        mapChartRef.current = echarts.init(canvas, null, {
          width: 2048,
          height: 1024,
        });

        // 设置地图选项（作为地球纹理）- 更亮的内部
        mapChartRef.current.setOption({
          backgroundColor: 'rgba(15, 20, 40, 1)',
          geo: {
            type: 'map',
            map: 'world',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boundingCoords: [
              [-180, 90],
              [180, -90],
            ],
            itemStyle: {
              borderWidth: 0.8,
              borderColor: 'rgba(147, 51, 234, 0.7)', // 更亮的紫色边框
              areaColor: 'rgba(60, 60, 100, 1)', // 更亮的大陆
            },
            emphasis: {
              itemStyle: {
                areaColor: 'rgba(147, 51, 234, 0.7)', // 紫色高亮
                borderColor: 'rgba(236, 72, 153, 1)', // 粉色边框
              },
            },
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'circle',
              symbolSize: 8,
              itemStyle: {
                color: 'rgba(147, 51, 234, 1)',
                shadowBlur: 10,
                shadowColor: 'rgba(147, 51, 234, 0.8)',
              },
              data: successCases.map(c => ({
                value: [c.position.lng, c.position.lat],
                name: c.country,
              })),
            },
          ],
        });

        // 初始化 3D 地球
        globeChartRef.current = echarts.init(chartRef.current);
        
        const currentCase = successCases[activeCase];
        const initialView = getViewControl(currentCase.position.lng, currentCase.position.lat);
        
        globeChartRef.current.setOption({
          globe: {
            baseTexture: mapChartRef.current,
            shading: 'realistic',
            environment: 'auto',
            realisticMaterial: {
              roughness: 0.6,
              metalness: 0.1,
            },
            light: {
              ambient: {
                intensity: 0.8, // 更亮的环境光
              },
              main: {
                intensity: 1.5, // 更亮的主光
                shadow: true,
                shadowQuality: 'high',
              },
            },
            postEffect: {
              enable: true,
              bloom: {
                enable: true,
                bloomIntensity: 0.05, // 减弱泛光
              },
              SSAO: {
                enable: true,
                radius: 2,
                intensity: 0.8,
              },
            },
            viewControl: {
              autoRotate: true,
              autoRotateSpeed: 3,
              autoRotateAfterStill: 2,
              distance: 180, // 拉近距离，让地球看起来更大
              alpha: initialView.alpha,
              beta: initialView.beta,
              minDistance: 150,
              maxDistance: 280,
              damping: 0.9,
            },
            atmosphere: {
              show: true,
              offset: 3, // 减小大气层偏移
              color: 'rgba(147, 51, 234, 0.08)', // 更暗的大气层
              glowColor: 'rgba(147, 51, 234, 0.15)', // 更暗的光晕
            },
          },
          series: [
            {
              type: 'scatter3D',
              coordinateSystem: 'globe',
              symbol: 'circle',
              symbolSize: 12,
              itemStyle: {
                color: 'rgba(147, 51, 234, 1)',
                opacity: 1,
                shadowBlur: 20,
                shadowColor: 'rgba(147, 51, 234, 0.8)',
              },
              label: {
                show: false,
              },
              data: successCases.map((c, index) => ({
                value: [c.position.lng, c.position.lat, 0],
                name: c.country,
                itemStyle: {
                  color: index === activeCase ? 'rgba(236, 72, 153, 1)' : 'rgba(147, 51, 234, 1)',
                },
                symbolSize: index === activeCase ? 16 : 10,
              })),
            },
          ],
        });

        // 响应窗口大小变化
        const handleResize = () => {
          globeChartRef.current?.resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('Failed to load globe data:', error);
      }
    };

    initGlobe();

    return () => {
      globeChartRef.current?.dispose();
      mapChartRef.current?.dispose();
    };
  }, []);

  // 更新地球视角和选中状态
  useEffect(() => {
    if (!globeChartRef.current) return;

    const currentCase = successCases[activeCase];
    const targetView = getViewControl(currentCase.position.lng, currentCase.position.lat);
    
    globeChartRef.current.setOption({
      globe: {
        viewControl: {
          autoRotate: !isHovering,
          alpha: targetView.alpha,
          beta: targetView.beta,
        },
      },
      series: [
        {
          type: 'scatter3D',
          data: successCases.map((c, index) => ({
            value: [c.position.lng, c.position.lat, 0],
            name: c.country,
            itemStyle: {
              color: index === activeCase ? 'rgba(236, 72, 153, 1)' : 'rgba(147, 51, 234, 1)',
            },
            symbolSize: index === activeCase ? 16 : 10,
          })),
        },
      ],
    });
  }, [activeCase, isHovering]);

  // 切换案例
  const handleCaseChange = (index: number) => {
    setActiveCase(index);
  };

  const handlePrev = () => {
    handleCaseChange((activeCase - 1 + successCases.length) % successCases.length);
  };

  const handleNext = () => {
    handleCaseChange((activeCase + 1) % successCases.length);
  };

  const currentCase = successCases[activeCase];

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-950">
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
            遍及 <span className="text-gradient">世界</span> 的成功故事
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-center">
          {/* Left - 3D Globe (更大) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-full aspect-square max-w-[600px]">
              {/* Globe Glow Background - 更暗 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
              
              {/* ECharts Globe Container */}
              <div 
                ref={chartRef} 
                className="w-full h-full"
                style={{ minHeight: '600px' }}
              />
            </div>
          </motion.div>

          {/* Right - Success Case Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Navigation Arrows */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 hidden lg:block">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 hidden lg:block">
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-between mb-4 lg:hidden">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Case Card - 更紧凑 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden"
              >
                {/* Gradient Header - 更小 */}
                <div className={`h-24 bg-gradient-to-br ${currentCase.gradient} relative`}>
                  {/* Decorative shapes */}
                  <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/20 blur-xl" />
                  <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full bg-white/10 blur-lg" />
                </div>

                {/* Content - 更紧凑 */}
                <div className="p-5">
                  {/* User Info */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xl border-2 border-zinc-700">
                      {currentCase.flag}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{currentCase.name}</h3>
                      <p className="text-xs text-zinc-400">{currentCase.country}</p>
                    </div>
                  </div>

                  {/* Quote - 更小的字体 */}
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {currentCase.quote}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GlobalSuccess;
