/**
 * 个人项目 - 博客网站
 */
export function PersonalBlogPreview() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] text-gray-900 font-serif">
      {/* Header */}
      <header className="flex items-center justify-between px-12 py-8">
        <span className="text-2xl font-light tracking-wide">The Journal</span>
        <nav className="flex gap-8 text-sm">
          <a href="#" className="text-gray-900">Home</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Articles</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-500 hover:text-gray-900">Newsletter</a>
        </nav>
      </header>

      {/* Hero Article */}
      <div className="px-12 py-8">
        <div className="grid grid-cols-2 gap-12">
          <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl" />
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-amber-600 mb-4">Featured</span>
            <h1 className="text-4xl font-light leading-tight mb-4">The Art of Slow Living in a Fast-Paced World</h1>
            <p className="text-gray-500 mb-6 leading-relaxed">Discovering the beauty of intentional living and finding peace in the everyday moments that often go unnoticed.</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-medium">Emma Williams</p>
                <p className="text-xs text-gray-400">Jan 15, 2024 · 8 min read</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="px-12 py-8">
        <h2 className="text-lg mb-6">Recent Stories</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { title: 'Finding Creativity in Constraints', cat: 'Creativity', date: 'Jan 12', bg: 'bg-blue-50' },
            { title: 'Morning Rituals That Transform Your Day', cat: 'Lifestyle', date: 'Jan 10', bg: 'bg-green-50' },
            { title: 'The Power of Digital Minimalism', cat: 'Technology', date: 'Jan 8', bg: 'bg-purple-50' },
          ].map((article, i) => (
            <article key={i} className="cursor-pointer group">
              <div className={`aspect-[3/2] ${article.bg} rounded-xl mb-4 group-hover:opacity-90 transition-opacity`} />
              <span className="text-xs uppercase tracking-widest text-gray-400">{article.cat}</span>
              <h3 className="text-lg mt-1 mb-2 group-hover:text-amber-600 transition-colors">{article.title}</h3>
              <p className="text-xs text-gray-400">{article.date} · 5 min read</p>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="mx-12 my-8 p-8 bg-amber-50 rounded-2xl text-center">
        <h3 className="text-xl mb-2">Subscribe to the newsletter</h3>
        <p className="text-sm text-gray-500 mb-4">Get weekly inspiration delivered to your inbox.</p>
        <div className="flex max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-l-lg border border-gray-200 text-sm" />
          <button className="px-6 py-2 bg-gray-900 text-white text-sm rounded-r-lg">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default PersonalBlogPreview;
