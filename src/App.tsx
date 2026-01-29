import { AnimatedBackground } from './components/AnimatedBackground'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { UseCases } from './components/UseCases'
import { HowItWorks } from './components/HowItWorks'
import { FooterCTA } from './components/FooterCTA'
import { Footer } from './components/Footer'

function App() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <UseCases />
        <HowItWorks />
        <FooterCTA />
        <Footer />
      </div>
    </main>
  )
}

export default App
