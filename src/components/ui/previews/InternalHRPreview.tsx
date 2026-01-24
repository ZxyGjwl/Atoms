/**
 * 内部工具 - HR人事管理系统
 */
export function InternalHRPreview() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-56 bg-indigo-900 text-white p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">👥</div>
          <span className="font-semibold">HR Portal</span>
        </div>
        <nav className="space-y-1">
          {[
            { name: 'Dashboard', icon: '📊', active: true },
            { name: 'Employees', icon: '👤', active: false },
            { name: 'Attendance', icon: '📅', active: false },
            { name: 'Payroll', icon: '💰', active: false },
            { name: 'Leave', icon: '🏖️', active: false },
            { name: 'Recruitment', icon: '📝', active: false },
            { name: 'Settings', icon: '⚙️', active: false },
          ].map((item, i) => (
            <a key={i} href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${item.active ? 'bg-white/20' : 'hover:bg-white/10'}`}>
              <span>{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-56 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg">+ Add Employee</button>
            <div className="w-10 h-10 rounded-full bg-indigo-100" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Employees', value: '248', change: '+12 this month', color: 'bg-blue-500' },
            { label: 'Present Today', value: '212', change: '85.5%', color: 'bg-green-500' },
            { label: 'On Leave', value: '18', change: '7.3%', color: 'bg-yellow-500' },
            { label: 'Open Positions', value: '6', change: '3 urgent', color: 'bg-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-gray-200">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                {i === 0 ? '👥' : i === 1 ? '✓' : i === 2 ? '🏖️' : '💼'}
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Recent Employees */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold mb-4">Recent Employees</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3">Name</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Position</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Smith', dept: 'Engineering', pos: 'Senior Developer', status: 'Active', date: 'Jan 15, 2024' },
                { name: 'Sarah Johnson', dept: 'Design', pos: 'UI Designer', status: 'Active', date: 'Jan 10, 2024' },
                { name: 'Mike Chen', dept: 'Marketing', pos: 'Manager', status: 'On Leave', date: 'Dec 20, 2023' },
              ].map((emp, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    {emp.name}
                  </td>
                  <td className="py-3 text-gray-600">{emp.dept}</td>
                  <td className="py-3 text-gray-600">{emp.pos}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{emp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InternalHRPreview;
