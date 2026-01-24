/**
 * 模板2: 创意设计机构
 * 风格: 亮色奶油、艺术感、大胆排版、极简主义
 */
export function MangaPreview() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-serif">
      {/* Header */}
      <header className="flex items-center justify-between px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-xs font-sans font-bold">S</span>
          </div>
          <span className="text-lg tracking-widest font-light">STUDIO</span>
        </div>
        <nav className="flex gap-12 text-sm tracking-wide">
          <a href="#" className="text-gray-900 border-b border-black pb-1">Work</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Services</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
        </nav>
        <button className="px-5 py-2 text-sm border border-black rounded-full hover:bg-black hover:text-white transition-colors">
          Let's Talk
        </button>
      </header>

      {/* Hero */}
      <main className="px-12 py-8">
        <div className="mb-16">
          <h1 className="text-7xl font-light leading-tight mb-6">
            We craft
            <span className="block italic">digital experiences</span>
            <span className="block">that inspire.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-md font-sans">
            Award-winning design studio creating brands, websites, and digital products for forward-thinking companies.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Project 1 - Large */}
          <div className="row-span-2 group cursor-pointer">
            <div className="relative h-full rounded-3xl overflow-hidden bg-[#E8E4DF]">
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 text-xs bg-white/80 rounded-full font-sans">Brand Identity</span>
                  <span className="text-sm text-gray-600 font-sans">2024</span>
                </div>
                <div>
                  <h3 className="text-3xl font-light mb-2">Lumière Fashion</h3>
                  <p className="text-gray-600 font-sans text-sm">Complete rebrand for luxury fashion house</p>
                </div>
              </div>
              <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-sans text-sm">
                →
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group cursor-pointer">
            <div className="relative h-48 rounded-3xl overflow-hidden bg-[#1A1A1A] text-white">
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 text-xs bg-white/20 rounded-full font-sans">Web Design</span>
                  <span className="text-sm text-gray-400 font-sans">2024</span>
                </div>
                <div>
                  <h3 className="text-xl font-light">Noir Architecture</h3>
                  <p className="text-gray-400 font-sans text-sm">Portfolio website</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="group cursor-pointer">
            <div className="relative h-48 rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 text-xs bg-white/80 rounded-full font-sans">Product Design</span>
                  <span className="text-sm text-gray-600 font-sans">2023</span>
                </div>
                <div>
                  <h3 className="text-xl font-light">Solis Wellness</h3>
                  <p className="text-gray-600 font-sans text-sm">Mobile app design</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          {[
            { number: '150+', label: 'Projects Completed' },
            { number: '12', label: 'Design Awards' },
            { number: '8+', label: 'Years Experience' },
            { number: '40+', label: 'Happy Clients' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-light mb-1">{stat.number}</p>
              <p className="text-sm text-gray-500 font-sans">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MangaPreview;
