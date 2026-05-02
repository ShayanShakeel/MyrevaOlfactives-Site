import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,26,26,0.1) 0%, transparent 70%)' }} />

      {/* Giant 404 */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <span className="font-display text-[20rem] font-light text-silver-900/10 leading-none">404</span>
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-gold-500">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
        </div>

        <p className="font-accent text-[10px] tracking-[0.5em] text-gold-500 uppercase mb-4">Page Not Found</p>
        <h1 className="font-display text-5xl md:text-6xl text-silver-100 leading-tight mb-6">
          Lost in the <em>Mist</em>
        </h1>
        <p className="font-body text-silver-500 text-base leading-relaxed mb-10 font-light">
          The page you're looking for doesn't exist — but our collection does.
          Let's get you back to something that smells good.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/catalogue" className="btn-secondary">Browse Collection</Link>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-silver-800" />
          <span className="text-silver-800 text-xs">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-silver-800" />
        </div>
      </div>
    </div>
  )
}
