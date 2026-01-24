/**
 * 模板3: 现代电商网站
 * 风格: 明亮现代、产品聚焦、购物体验
 */
export function FitnessPreview() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">NOVA</span>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="#" className="text-gray-900 font-medium">New Arrivals</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Women</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Men</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Accessories</a>
            <a href="#" className="text-rose-500 font-medium">Sale</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">🔍</button>
          <button className="p-2 hover:bg-gray-100 rounded-full">❤️</button>
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            🛒
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative mx-8 my-6 rounded-3xl overflow-hidden bg-gradient-to-r from-rose-50 to-orange-50">
        <div className="flex">
          <div className="flex-1 p-12">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-rose-500 text-white rounded-full">New Collection</span>
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Summer Essentials<br />
              <span className="text-rose-500">2024</span>
            </h1>
            <p className="text-gray-600 mb-6 max-w-sm">
              Discover our curated collection of sustainable fashion pieces designed for the modern lifestyle.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800">
                Shop Now
              </button>
              <button className="px-8 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute right-12 bottom-0 w-64 h-80 bg-gradient-to-t from-rose-200 to-rose-100 rounded-t-full" />
            <div className="absolute right-32 bottom-8 w-20 h-20 bg-orange-200 rounded-full opacity-60" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900">View All →</a>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {[
            { name: 'Minimal Linen Dress', price: '$189', oldPrice: '$249', tag: 'Best Seller', color: 'bg-rose-50' },
            { name: 'Cotton Blend Blazer', price: '$245', oldPrice: null, tag: 'New', color: 'bg-amber-50' },
            { name: 'Silk Midi Skirt', price: '$165', oldPrice: '$220', tag: 'Sale', color: 'bg-sky-50' },
            { name: 'Cashmere Cardigan', price: '$320', oldPrice: null, tag: null, color: 'bg-violet-50' },
          ].map((product, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={`relative aspect-[3/4] rounded-2xl ${product.color} mb-4 overflow-hidden`}>
                {product.tag && (
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full ${
                    product.tag === 'Sale' ? 'bg-rose-500 text-white' : 
                    product.tag === 'New' ? 'bg-gray-900 text-white' : 
                    'bg-white text-gray-900'
                  }`}>
                    {product.tag}
                  </span>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  ❤️
                </button>
                <button className="absolute bottom-4 left-4 right-4 py-2 bg-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  Quick Add
                </button>
              </div>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="font-bold">{product.price}</span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="mx-8 my-8 p-6 rounded-2xl bg-gray-50 grid grid-cols-4 gap-6">
        {[
          { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
          { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
          { icon: '🔒', title: 'Secure Payment', desc: '100% secure checkout' },
          { icon: '💬', title: '24/7 Support', desc: 'Dedicated support team' },
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-2xl">{feature.icon}</span>
            <div>
              <p className="font-medium text-sm">{feature.title}</p>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FitnessPreview;
