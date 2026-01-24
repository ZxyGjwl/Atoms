/**
 * 内部工具 - 项目管理系统
 */
export function InternalProjectPreview() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white">
            ✓
          </div>
          <span className="text-lg font-semibold">TaskFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg">+ New Task</button>
          <div className="w-9 h-9 rounded-full bg-violet-100" />
        </div>
      </header>

      {/* Main */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 border-r border-gray-200 p-4 min-h-screen">
          <div className="mb-6">
            <p className="text-xs text-gray-400 uppercase mb-2">Projects</p>
            {[
              { name: 'Website Redesign', color: 'bg-violet-500' },
              { name: 'Mobile App', color: 'bg-blue-500' },
              { name: 'Marketing Campaign', color: 'bg-green-500' },
            ].map((proj, i) => (
              <a key={i} href="#" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${i === 0 ? 'bg-violet-50 text-violet-700' : 'hover:bg-gray-50'}`}>
                <span className={`w-2 h-2 rounded-full ${proj.color}`} />
                {proj.name}
              </a>
            ))}
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase mb-2">Team</p>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">+3</div>
            </div>
          </div>
        </aside>

        {/* Kanban Board */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex gap-4">
            {[
              { title: 'To Do', count: 4, color: 'bg-gray-400', tasks: ['Design homepage', 'Create wireframes', 'User research', 'Setup project'] },
              { title: 'In Progress', count: 3, color: 'bg-blue-500', tasks: ['Develop header', 'API integration', 'Write copy'] },
              { title: 'Review', count: 2, color: 'bg-amber-500', tasks: ['Test checkout', 'Review designs'] },
              { title: 'Done', count: 5, color: 'bg-green-500', tasks: ['Project setup', 'Define scope', 'Team meeting', 'Research', 'Sitemap'] },
            ].map((col, i) => (
              <div key={i} className="flex-1 min-w-[220px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${col.color}`} />
                  <span className="text-sm font-medium">{col.title}</span>
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">{col.count}</span>
                </div>
                <div className="space-y-2">
                  {col.tasks.map((task, j) => (
                    <div key={j} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <p className="text-sm mb-2">{task}</p>
                      <div className="flex items-center justify-between">
                        <div className="w-6 h-6 rounded-full bg-gray-200" />
                        <span className="text-xs text-gray-400">Due: Jan {15 + j}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default InternalProjectPreview;
