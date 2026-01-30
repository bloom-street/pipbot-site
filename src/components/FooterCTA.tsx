import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WaitlistForm } from './WaitlistForm'

export function FooterCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to meet <span className="gradient-text">Pip</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join the waitlist and be the first to experience your new desktop companion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <WaitlistForm showWaitlistCount={false} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-sm mt-6"
        >
          We'll let you know when Pip is ready for you.
        </motion.p>
      </div>
    </section>
  )
}
