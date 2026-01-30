import { motion } from 'framer-motion'

export function PipAvatar({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} pip-avatar`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer glow */}
        <defs>
          <radialGradient id="pipGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow circle */}
        <circle cx="50" cy="50" r="48" fill="url(#pipGlow)" />

        {/* Speech bubble body */}
        <path
          d="M50 12
             C72 12, 88 26, 88 44
             C88 62, 72 76, 50 76
             C44 76, 38 75, 33 73
             L20 82
             L24 70
             C16 64, 12 55, 12 44
             C12 26, 28 12, 50 12Z"
          fill="white"
        />

        {/* Three dots */}
        <motion.circle
          cx="32"
          cy="44"
          r="5"
          fill="#6366f1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="50"
          cy="44"
          r="5"
          fill="#6366f1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.circle
          cx="68"
          cy="44"
          r="5"
          fill="#6366f1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </svg>
    </motion.div>
  )
}
