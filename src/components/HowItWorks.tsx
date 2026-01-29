import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, MessageCircle, Zap } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Download Pip',
    description: 'Small desktop app, installs in seconds',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Start talking',
    description: 'Voice or text, Pip understands both',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Watch it work',
    description: 'Pip handles tasks while you focus on what matters',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Getting started with Pip is simple
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
              className="relative text-center"
            >
              {/* Connector line - desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
              )}

              {/* Step Number */}
              <div className="step-number text-6xl sm:text-7xl font-bold mb-4 opacity-30">
                {step.number}
              </div>

              {/* Icon */}
              <div className="
                w-16 h-16 rounded-2xl mx-auto mb-5
                bg-emerald-500/10 border border-emerald-500/20
                flex items-center justify-center
              ">
                <step.icon className="w-8 h-8 text-emerald-500" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
