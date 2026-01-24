/**
 * SaaS Analytics Dashboard - 数据分析平台
 */
export function SaaSAnalyticsPreview() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <span className="text-white font-bold">📊</span>
          </div>
          <span className="text-lg font-semibold">Metrix</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="text-white font-medium">Overview</a>
          <a href="#" className="text-slate-400">Funnels</a>
          <a href="#" className="text-slate-400">Events</a>
          <a href="#" className="text-slate-400">Users</a>
          <a href="#" className="text-slate-400">Settings</a>
        </nav>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-xs bg-violet-500/20 text-violet-400 rounded-full">Pro Plan</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400" />
        </div>
      </header>

      {/* Main */}
      <main className="p-6">
        {/* Top Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Users', value: '284.3K', change: '+12.5%', icon: '👥' },
            { label: 'Sessions', value: '1.2M', change: '+8.3%', icon: '📈' },
            { label: 'Bounce Rate', value: '32.4%', change: '-4.2%', icon: '↩️' },
            { label: 'Avg Duration', value: '4m 32s', change: '+18%', icon: '⏱️' },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{stat.icon}</span>
                <span className="text-xs text-emerald-400">{stat.change}</span>
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Traffic Overview</h2>
              <div className="flex gap-2">
                {['7D', '30D', '90D'].map(p => (
                  <button key={p} className={`px-3 py-1 text-xs rounded ${p === '30D' ? 'bg-violet-500' : 'bg-slate-700'}`}>{p}</button>
                ))}
              </div>
            </div>
            <div className="h-48 flex items-end gap-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-violet-600 to-fuchsia-500 rounded-t opacity-80"
                  style={{ height: `${20 + Math.random() * 80}%` }}
                />
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <h2 className="font-semibold mb-4">Traffic Sources</h2>
            <div className="space-y-3">
              {[
                { source: 'Organic Search', value: '45%', color: 'bg-violet-500' },
                { source: 'Direct', value: '28%', color: 'bg-fuchsia-500' },
                { source: 'Referral', value: '15%', color: 'bg-blue-500' },
                { source: 'Social', value: '12%', color: 'bg-emerald-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{item.source}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <h2 className="font-semibold mb-4">Top Pages</h2>
          <div className="grid grid-cols-4 gap-4 text-sm text-slate-400 mb-2 px-2">
            <span>Page</span><span>Views</span><span>Unique</span><span>Bounce Rate</span>
          </div>
          {[
            { page: '/home', views: '45.2K', unique: '38.1K', bounce: '28%' },
            { page: '/pricing', views: '23.8K', unique: '21.2K', bounce: '35%' },
            { page: '/features', views: '18.4K', unique: '15.6K', bounce: '42%' },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 text-sm p-2 hover:bg-slate-700/30 rounded">
              <span className="text-white">{row.page}</span>
              <span>{row.views}</span>
              <span>{row.unique}</span>
              <span>{row.bounce}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SaaSAnalyticsPreview;
