/**
 * 内部工具 - 库存管理系统
 */
export function InternalInventoryPreview() {
  return (
    <div className="min-h-screen bg-[#1E293B] text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            📦
          </div>
          <span className="text-lg font-semibold">StockMaster</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="text-white">Dashboard</a>
          <a href="#" className="text-slate-400">Products</a>
          <a href="#" className="text-slate-400">Orders</a>
          <a href="#" className="text-slate-400">Suppliers</a>
          <a href="#" className="text-slate-400">Reports</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-amber-500 text-black rounded-lg text-sm font-medium">+ Add Product</button>
        </div>
      </header>

      {/* Main */}
      <main className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Products', value: '1,248', icon: '📦', color: 'from-blue-500 to-cyan-500' },
            { label: 'Low Stock', value: '23', icon: '⚠️', color: 'from-amber-500 to-orange-500' },
            { label: 'Out of Stock', value: '5', icon: '❌', color: 'from-red-500 to-pink-500' },
            { label: 'Total Value', value: '$284K', icon: '💰', color: 'from-green-500 to-emerald-500' },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-800 border border-slate-700">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Inventory Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Inventory</h2>
            <div className="flex gap-2">
              <input type="text" placeholder="Search products..." className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm" />
              <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm">
                <option>All Categories</option>
              </select>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-slate-400 border-b border-slate-700">
                <th className="pb-3">SKU</th>
                <th className="pb-3">Product Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sku: 'SKU-001', name: 'Wireless Mouse', cat: 'Electronics', stock: 145, price: '$29.99', status: 'In Stock' },
                { sku: 'SKU-002', name: 'USB-C Cable', cat: 'Accessories', stock: 8, price: '$12.99', status: 'Low Stock' },
                { sku: 'SKU-003', name: 'Laptop Stand', cat: 'Furniture', stock: 0, price: '$89.99', status: 'Out of Stock' },
                { sku: 'SKU-004', name: 'Mechanical Keyboard', cat: 'Electronics', stock: 67, price: '$149.99', status: 'In Stock' },
              ].map((item, i) => (
                <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 text-slate-400">{item.sku}</td>
                  <td className="py-3">{item.name}</td>
                  <td className="py-3 text-slate-400">{item.cat}</td>
                  <td className="py-3">{item.stock}</td>
                  <td className="py-3">{item.price}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'In Stock' ? 'bg-green-500/20 text-green-400' :
                      item.status === 'Low Stock' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default InternalInventoryPreview;
