import { useState, useEffect } from 'react'
import { Monitor, Mic, Sparkles } from 'lucide-react'

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`
        group relative p-8 rounded-2xl bg-card border border-border
        transition-all duration-500 ease-out
        hover:border-emerald-500/30 hover:bg-card/80
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 text-emerald-500 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Signup Form Component
function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || status === 'success') return
    
    setStatus('loading')
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      
      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="animate-fade-in p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-emerald-500" />
        </div>
        <p className="text-foreground font-medium text-lg">You're on the list!</p>
        <p className="text-muted-foreground mt-1">We'll email you when PipBot is ready for Mac.</p>
      </div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`
        space-y-4 transition-all duration-600
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            flex-1 px-5 py-3.5 rounded-xl
            bg-card border border-border
            text-foreground placeholder:text-muted-foreground
            focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
            transition-all duration-200
            outline-none
          "
        />
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            flex-1 px-5 py-3.5 rounded-xl
            bg-card border border-border
            text-foreground placeholder:text-muted-foreground
            focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
            transition-all duration-200
            outline-none
          "
        />
      </div>
      
      <button
        type="submit"
        disabled={status === 'loading'}
        className="
          w-full sm:w-auto px-8 py-3.5 rounded-xl
          bg-emerald-500 text-white font-medium
          hover:bg-emerald-600
          active:scale-[0.98]
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200
          shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
        "
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing up...
          </span>
        ) : (
          'Get Early Access'
        )}
      </button>
      
      {status === 'error' && (
        <p className="text-red-400 text-sm animate-fade-in">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

// Main Page Component
function App() {
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    setHeroVisible(true)
  }, [])

  const features = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: 'Screen-Aware',
      description: 'Pip sees what app you\'re using and reads on-screen text. No more copy-pasting context — just ask about what\'s in front of you.',
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice-First',
      description: 'Talk to Pip like a colleague. Voice input runs locally on your Mac — fast, private, and natural.',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Always There',
      description: 'A floating companion that stays on top of your work. Collapse when you\'re focused, expand when you need help.',
    },
  ]

  return (
    <main className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-card border border-border mb-8
              transition-all duration-600
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Coming soon to Mac</span>
          </div>
          
          {/* Headline */}
          <h1 
            className={`
              text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground
              leading-tight tracking-tight mb-6
              transition-all duration-600 delay-100
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            Meet Pip — Your AI companion that lives on your desktop
          </h1>
          
          {/* Subheadline */}
          <p 
            className={`
              text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10
              leading-relaxed
              transition-all duration-600 delay-200
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
          >
            PipBot is a desktop AI companion that floats on your screen, understands what you&apos;re looking at, and responds to your voice. No browser tabs. No context switching. Just ask.
          </p>
          
          {/* Signup Form */}
          <div className="max-w-lg mx-auto">
            <SignupForm />
          </div>
          
          {/* Trust indicator */}
          <p 
            className={`
              text-sm text-muted-foreground mt-6
              transition-all duration-600 delay-500
              ${heroVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={600 + index * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-foreground font-semibold">PipBot</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Bloom Street
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
