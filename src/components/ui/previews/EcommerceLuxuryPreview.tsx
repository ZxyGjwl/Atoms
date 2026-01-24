/**
 * 奢侈品电商 - 黑金高端风格
 */
export function EcommerceLuxuryPreview() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-serif">
      {/* Header */}
      <header className="flex items-center justify-between px-12 py-6 border-b border-white/10">
        <nav className="flex gap-8 text-sm tracking-widest">
          <a href="#" className="text-white/60 hover:text-white">WOMEN</a>
          <a href="#" className="text-white/60 hover:text-white">MEN</a>
          <a href="#" className="text-white/60 hover:text-white">JEWELRY</a>
        </nav>
        <div className="text-2xl tracking-[0.3em] font-light">LUXE</div>
        <div className="flex gap-6 text-sm tracking-widest">
          <a href="#" className="text-white/60 hover:text-white">SEARCH</a>
          <a href="#" className="text-white/60 hover:text-white">ACCOUNT</a>
          <a href="#" className="text-white/60 hover:text-white">BAG (2)</a>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-transparent" />
        <div className="text-center z-10">
          <p className="text-xs tracking-[0.4em] text-amber-400 mb-4">THE NEW COLLECTION</p>
          <h1 className="text-6xl font-light tracking-wide mb-6">Timeless Elegance</h1>
          <p className="text-white/60 mb-8 max-w-md mx-auto">Discover our exclusive collection of handcrafted luxury pieces.</p>
          <button className="px-12 py-4 border border-white/30 text-sm tracking-widest hover:bg-white hover:text-black transition-colors">
            EXPLORE
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-12 py-16">
        <h2 className="text-center text-xs tracking-[0.4em] text-white/40 mb-12">FEATURED PIECES</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { name: 'Diamond Necklace', price: '$12,500', cat: 'Fine Jewelry' },
            { name: 'Leather Handbag', price: '$4,800', cat: 'Accessories' },
            { name: 'Gold Watch', price: '$28,000', cat: 'Timepieces' },
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-gradient-to-br from-zinc-800 to-zinc-900 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  {i === 0 ? '💎' : i === 1 ? '👜' : '⌚'}
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-full py-3 bg-white text-black text-xs tracking-widest">ADD TO BAG</button>
                </div>
              </div>
              <p className="text-xs text-amber-400/80 tracking-widest mb-1">{item.cat}</p>
              <h3 className="text-lg font-light tracking-wide mb-1">{item.name}</h3>
              <p className="text-white/60">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story */}
      <div className="px-12 py-16 border-t border-white/10 text-center">
        <p className="text-xs tracking-[0.4em] text-amber-400 mb-4">SINCE 1892</p>
        <p className="text-xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed">
          Crafting exceptional pieces that transcend generations. Each creation embodies our commitment to unparalleled craftsmanship.
        </p>
      </div>
    </div>
  );
}

export default EcommerceLuxuryPreview;
