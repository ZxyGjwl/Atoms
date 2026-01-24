/**
 * 个人项目 - 作品集网站
 */
export function PersonalPortfolioPreview() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-12 py-8">
        <span className="text-lg font-bold">Alex.Design</span>
        <nav className="flex gap-8 text-sm">
          <a href="#" className="text-white">Work</a>
          <a href="#" className="text-gray-500 hover:text-white">About</a>
          <a href="#" className="text-gray-500 hover:text-white">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <div className="px-12 py-16">
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Digital Designer<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">& Creative Developer</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-8">
          I craft beautiful digital experiences that merge aesthetics with functionality. Currently available for freelance projects.
        </p>
        <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
          View My Work →
        </button>
      </div>

      {/* Projects Grid */}
      <div className="px-12 py-8">
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: 'Fintech App', cat: 'UI/UX Design', color: 'from-blue-600 to-cyan-500' },
            { title: 'E-commerce Redesign', cat: 'Web Design', color: 'from-purple-600 to-pink-500' },
            { title: 'Brand Identity', cat: 'Branding', color: 'from-amber-500 to-orange-600' },
            { title: 'Mobile App', cat: 'Product Design', color: 'from-green-500 to-emerald-500' },
          ].map((project, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs uppercase tracking-widest text-white/70">{project.cat}</span>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="px-12 py-16 border-t border-white/10">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6">Skills & Tools</h2>
        <div className="flex flex-wrap gap-3">
          {['Figma', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'After Effects', 'Blender'].map(skill => (
            <span key={skill} className="px-4 py-2 bg-white/10 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalPortfolioPreview;
