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
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pipBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        
        {/* Glow circle */}
        <circle cx="50" cy="50" r="48" fill="url(#pipGlow)" />
        
        {/* Main blob body */}
        <path
          d="M50 10 
             C70 10, 85 25, 85 45
             C85 55, 90 60, 88 70
             C85 85, 70 92, 50 92
             C30 92, 15 85, 12 70
             C10 60, 15 55, 15 45
             C15 25, 30 10, 50 10Z"
          fill="url(#pipBody)"
        />
        
        {/* Eyes */}
        <ellipse cx="35" cy="45" rx="6" ry="8" fill="#0a0a0a" />
        <ellipse cx="65" cy="45" rx="6" ry="8" fill="#0a0a0a" />
        
        {/* Eye highlights */}
        <circle cx="37" cy="42" r="2.5" fill="white" opacity="0.8" />
        <circle cx="67" cy="42" r="2.5" fill="white" opacity="0.8" />
        
        {/* Smile */}
        <path
          d="M38 65 Q50 75, 62 65"
          stroke="#0a0a0a"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Cheeks */}
        <circle cx="25" cy="58" r="5" fill="#10b981" opacity="0.3" />
        <circle cx="75" cy="58" r="5" fill="#10b981" opacity="0.3" />
      </svg>
    </motion.div>
  )
}
