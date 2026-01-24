/**
 * 生鲜电商 - 绿色清新风格
 */
export function EcommerceGroceryPreview() {
  return (
    <div className="min-h-screen bg-[#F0FDF4] text-gray-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-lg">🥬</span>
          </div>
          <span className="text-xl font-bold text-green-700">FreshMart</span>
        </div>
        <div className="flex-1 max-w-xl mx-8">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <span className="text-gray-400 mr-2">🔍</span>
            <input type="text" placeholder="Search for groceries..." className="bg-transparent flex-1 text-sm focus:outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">📍 Deliver to: Home</span>
          <button className="relative p-2">
            🛒
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="mx-8 my-6 p-8 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-lg">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-white/20 rounded-full">Free Delivery</span>
          <h1 className="text-4xl font-bold mb-3">Fresh Groceries Delivered in 30 mins</h1>
          <p className="text-green-100 mb-4">Farm-fresh vegetables, fruits, and daily essentials at your doorstep.</p>
          <button className="px-6 py-3 bg-white text-green-600 rounded-full font-medium">Shop Now →</button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-8 mb-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { name: 'Vegetables', icon: '🥕', bg: 'bg-orange-50' },
            { name: 'Fruits', icon: '🍎', bg: 'bg-red-50' },
            { name: 'Dairy', icon: '🥛', bg: 'bg-blue-50' },
            { name: 'Meat', icon: '🥩', bg: 'bg-pink-50' },
            { name: 'Bakery', icon: '🍞', bg: 'bg-amber-50' },
            { name: 'Beverages', icon: '🧃', bg: 'bg-purple-50' },
          ].map((cat, i) => (
            <div key={i} className={`flex-shrink-0 w-24 p-4 rounded-2xl ${cat.bg} text-center cursor-pointer hover:scale-105 transition-transform`}>
              <span className="text-3xl mb-2 block">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-8">
        <h2 className="text-xl font-bold mb-4">Popular Products</h2>
        <div className="grid grid-cols-5 gap-4">
          {[
            { name: 'Organic Bananas', price: '$2.99', unit: '1 bunch', bg: 'bg-yellow-50', emoji: '🍌' },
            { name: 'Fresh Spinach', price: '$3.49', unit: '250g', bg: 'bg-green-50', emoji: '🥬' },
            { name: 'Farm Eggs', price: '$5.99', unit: '12 pcs', bg: 'bg-amber-50', emoji: '🥚' },
            { name: 'Greek Yogurt', price: '$4.29', unit: '500g', bg: 'bg-blue-50', emoji: '🥛' },
            { name: 'Avocado', price: '$1.99', unit: 'each', bg: 'bg-lime-50', emoji: '🥑' },
          ].map((product, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className={`h-24 ${product.bg} rounded-xl flex items-center justify-center text-4xl mb-3`}>
                {product.emoji}
              </div>
              <h3 className="font-medium text-sm mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.unit}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">{product.price}</span>
                <button className="w-7 h-7 bg-green-500 text-white rounded-full text-sm">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EcommerceGroceryPreview;
