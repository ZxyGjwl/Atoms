import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { 
  LandingHero,
  Hero, 
  Comparison, 
  AITeam, 
  Features, 
  GlobalSuccess,
  Testimonials, 
  FAQ, 
  Pricing 
} from '../components/sections';
import { AnimatedBackground } from '../components/ui';
import { AuthModal } from '../components/ui/AuthModal';
import { useAuth } from '../context/AuthContext';

export function HomePage() {
  const navigate = useNavigate();
  const heroSectionRef = useRef<HTMLElement>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated, logout } = useAuth();

  // 登录点击处理
  const handleLoginClick = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  // 注册点击处理
  const handleSignUpClick = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  // 预留接口 - 开始按钮点击处理（Footer）
  const handleStartClick = (message?: string) => {
    console.log('Start clicked - 预留接口', message ? `with message: ${message}` : '');
    // 跳转到开发界面
    navigate('/workspace', { state: { prompt: message || '' } });
  };

  // 预留接口 - 免费试用点击处理
  const handleTryFreeClick = () => {
    console.log('Try free clicked - 预留接口');
    navigate('/workspace', { state: { prompt: '开始免费试用' } });
  };

  // 预留接口 - 功能点击处理
  const handleTryNowClick = (featureId: string) => {
    console.log(`Try now clicked for feature: ${featureId} - 预留接口`);
    navigate('/workspace', { state: { prompt: `试用功能: ${featureId}` } });
  };

  // 预留接口 - 选择计划处理
  const handleSelectPlan = (planId: string) => {
    console.log(`Plan selected: ${planId} - 预留接口`);
  };

  // 预留接口 - 克隆模板处理
  const handleCloneTemplate = (prompt: string) => {
    console.log('Template cloned with prompt:', prompt);
    navigate('/workspace', { state: { prompt } });
  };

  // 首屏输入处理 - 跳转到开发界面
  const handleLandingStart = (prompt: string) => {
    console.log('Landing start with prompt:', prompt);
    navigate('/workspace', { state: { prompt } });
  };

  // 滚动到模板区域
  const handleScrollDown = () => {
    if (heroSectionRef.current) {
      heroSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // AI 团队合作按钮 - 进入开发界面初始状态
  const handleAITeamCollaborate = () => {
    navigate('/workspace');
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
      
      {/* Header Navigation */}
      <Header 
        onLoginClick={handleLoginClick} 
        onSignUpClick={handleSignUpClick}
        isAuthenticated={isAuthenticated}
        onLogout={logout}
      />

      {/* Main Content */}
      <main>
        {/* Landing Hero - First Screen */}
        <LandingHero 
          onStartClick={handleLandingStart}
          onScrollDown={handleScrollDown}
        />

        {/* Hero Section - Template Selection */}
        <section ref={heroSectionRef}>
          <Hero 
            onCloneTemplate={handleCloneTemplate}
          />
        </section>

        {/* Comparison Section */}
        <Comparison onTryFreeClick={handleTryFreeClick} />

        {/* AI Team Section */}
        <AITeam onCollaborateClick={handleAITeamCollaborate} />

        {/* Features Section */}
        <Features onTryNowClick={handleTryNowClick} />

        {/* Global Success Section */}
        <GlobalSuccess />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Pricing Section */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onStartClick={handleStartClick} />
    </div>
  );
}

export default HomePage;
