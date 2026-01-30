import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, Mic, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Monitor,
    title: 'Screen-Aware',
    description: 'Pip sees your active app and reads on-screen text. Share context instantly without copy-pasting.',
  },
  {
    icon: Mic,
    title: 'Voice-First',
    description: 'Talk naturally. Local speech recognition keeps conversations fast and private.',
  },
  {
    icon: Sparkles,
    title: 'Always There',
    description: 'A floating companion that stays with you across apps. Collapse when you need focus, expand when you need help.',
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How Pip Helps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your desktop companion that understands context and gets things done
          </p>
        </motion.div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="
                group relative p-8 rounded-2xl 
                bg-card/60 backdrop-blur-sm border border-border
                card-hover
              "
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="
                  w-14 h-14 rounded-xl 
                  bg-blue-500/10 border border-blue-500/20
                  flex items-center justify-center mb-6
                  group-hover:bg-blue-500/20 group-hover:border-blue-500/30
                  transition-all duration-300
                ">
                  <feature.icon className="w-7 h-7 text-blue-500" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
