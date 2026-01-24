/**
 * SaaS CRM Dashboard - 客户关系管理
 */
export function SaaSCRMPreview() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CRM</span>
          </div>
          <span className="text-lg font-semibold">SalesFlow</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="text-blue-600 font-medium">Dashboard</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Contacts</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Deals</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Tasks</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Reports</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">+ New Deal</button>
          <div className="w-9 h-9 rounded-full bg-gray-200" />
        </div>
      </header>

      {/* Main */}
      <main className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Revenue', value: '$284,392', change: '+12%', color: 'text-green-600' },
            { label: 'Active Deals', value: '47', change: '+8', color: 'text-blue-600' },
            { label: 'Conversion Rate', value: '24.8%', change: '+2.3%', color: 'text-green-600' },
            { label: 'Avg Deal Size', value: '$6,048', change: '-5%', color: 'text-red-500' },
          ].map((stat, i) => (
            <div key={i} className="p-5 bg-white rounded-xl border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className={`text-sm ${stat.color}`}>{stat.change} vs last month</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Sales Pipeline */}
          <div className="col-span-2 p-5 bg-white rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Sales Pipeline</h2>
            <div className="flex gap-4">
              {[
                { stage: 'Lead', count: 24, value: '$48K', color: 'bg-gray-100' },
                { stage: 'Qualified', count: 18, value: '$72K', color: 'bg-blue-50' },
                { stage: 'Proposal', count: 12, value: '$96K', color: 'bg-indigo-50' },
                { stage: 'Negotiation', count: 6, value: '$54K', color: 'bg-purple-50' },
                { stage: 'Won', count: 8, value: '$64K', color: 'bg-green-50' },
              ].map((stage, i) => (
                <div key={i} className={`flex-1 p-4 rounded-lg ${stage.color}`}>
                  <p className="text-sm text-gray-600 mb-2">{stage.stage}</p>
                  <p className="text-xl font-bold">{stage.count}</p>
                  <p className="text-sm text-gray-500">{stage.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-5 bg-white rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'New lead added', name: 'Tech Corp', time: '2m ago' },
                { action: 'Deal won', name: 'StartupXYZ', time: '1h ago' },
                { action: 'Meeting scheduled', name: 'Global Inc', time: '3h ago' },
                { action: 'Proposal sent', name: 'MediaPro', time: '5h ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.name} • {item.time}</p>
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

export default SaaSCRMPreview;
