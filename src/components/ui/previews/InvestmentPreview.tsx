/**
 * 模板1: 金融科技仪表板
 * 风格: 深色专业、数据驱动、科技感
 */
export function InvestmentPreview() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
            FT
          </div>
          <span className="text-lg font-semibold tracking-tight">FinTrack Pro</span>
        </div>
        <nav className="flex gap-8 text-sm">
          <a href="#" className="text-white font-medium">Dashboard</a>
          <a href="#" className="text-slate-400 hover:text-white">Markets</a>
          <a href="#" className="text-slate-400 hover:text-white">Portfolio</a>
          <a href="#" className="text-slate-400 hover:text-white">Analytics</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium">
            +12.5% Today
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Balance', value: '$2,847,392', change: '+$124,392', up: true, icon: '💰' },
            { label: 'Daily P&L', value: '+$18,492', change: '+2.3%', up: true, icon: '📈' },
            { label: 'Active Positions', value: '47', change: '+5', up: true, icon: '📊' },
            { label: 'Risk Score', value: '67/100', change: 'Moderate', up: null, icon: '⚡' },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                {stat.up !== null && (
                  <span className={`text-xs px-2 py-1 rounded-full ${stat.up ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="col-span-2 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">Portfolio Performance</h2>
                <p className="text-sm text-slate-400">Last 30 days</p>
              </div>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '3M', '1Y'].map(period => (
                  <button key={period} className={`px-3 py-1.5 text-xs rounded-lg ${period === '1M' ? 'bg-cyan-500 text-white' : 'bg-slate-700/50 text-slate-400'}`}>
                    {period}
                  </button>
                ))}
              </div>
            </div>
            {/* Chart Area */}
            <div className="relative h-52">
              <svg className="w-full h-full" viewBox="0 0 400 150">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 120 Q50 100, 80 90 T160 70 T240 50 T320 60 T400 30 L400 150 L0 150 Z" fill="url(#chartGradient)" />
                <path d="M0 120 Q50 100, 80 90 T160 70 T240 50 T320 60 T400 30" fill="none" stroke="#06b6d4" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Watchlist */}
          <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
            <h2 className="text-lg font-semibold mb-4">Watchlist</h2>
            <div className="space-y-3">
              {[
                { symbol: 'BTC', name: 'Bitcoin', price: '$67,234', change: '+5.2%', up: true },
                { symbol: 'ETH', name: 'Ethereum', price: '$3,892', change: '+3.1%', up: true },
                { symbol: 'AAPL', name: 'Apple Inc', price: '$189.45', change: '-0.8%', up: false },
                { symbol: 'NVDA', name: 'NVIDIA', price: '$875.32', change: '+8.4%', up: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold">
                      {item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.symbol}</p>
                      <p className="text-xs text-slate-400">{item.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{item.price}</p>
                    <p className={`text-xs ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>{item.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InvestmentPreview;
