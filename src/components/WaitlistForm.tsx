import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Loader2, Check } from 'lucide-react'

interface WaitlistFormProps {
  showWaitlistCount?: boolean
  compact?: boolean
}

export function WaitlistForm({ showWaitlistCount = true, compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistCount] = useState(0) // Would be fetched from API in production

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || status === 'success') return
    
    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
      setStatus('error')
      return
    }
    
    setStatus('loading')
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`text-center ${compact ? 'p-4' : 'p-6'} rounded-2xl bg-emerald-500/10 border border-emerald-500/30`}
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-emerald-500" />
            </div>
            <p className="text-foreground font-semibold text-lg mb-1">You're on the list!</p>
            <p className="text-muted-foreground text-sm">Check your email for confirmation.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={`flex ${compact ? 'flex-col' : 'flex-col sm:flex-row'} gap-3`}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                required
                disabled={status === 'loading'}
                className="
                  flex-1 px-5 py-3.5 rounded-xl
                  bg-card/80 backdrop-blur-sm border border-border
                  text-foreground placeholder:text-muted-foreground
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                  transition-all duration-200
                  outline-none input-glow
                  disabled:opacity-50
                "
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="
                  btn-shine
                  px-8 py-3.5 rounded-xl
                  bg-emerald-500 text-white font-semibold
                  hover:bg-emerald-400
                  active:scale-[0.98]
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
                  transition-all duration-200
                  shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
                  flex items-center justify-center gap-2
                  whitespace-nowrap
                "
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 spinner" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Get Early Access</span>
                  </>
                )}
              </button>
            </div>
            
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
              >
                Please enter a valid email address.
              </motion.p>
            )}
            
            {showWaitlistCount && waitlistCount > 0 && (
              <p className="text-muted-foreground text-sm text-center">
                Join <span className="text-emerald-400 font-medium">{waitlistCount.toLocaleString()}</span> others on the waitlist
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
