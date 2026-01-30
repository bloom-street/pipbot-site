import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Calendar, Heart, Utensils, Briefcase, 
  MessageSquare, FileText, Home, Bell,
  BookOpen, TrendingUp, FileSearch, Palette,
  Video, Share2, Code, GitBranch,
  Globe, Terminal, Database, Bug
} from 'lucide-react'

const categories = [
  {
    id: 'productivity',
    label: 'Daily Life',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
    items: [
      { icon: Calendar, text: 'Get morning briefings with weather, calendar, priorities, and motivational quotes' },
      { icon: Heart, text: 'Track health data and get smart reminders for better habits' },
      { icon: Utensils, text: 'Plan weekly meals with shopping lists sorted by store section' },
      { icon: Briefcase, text: 'Manage follow-ups, reminders, and travel plans through simple messages' },
    ],
  },
  {
    id: 'work',
    label: 'Work & Business',
    icon: Briefcase,
    color: 'from-blue-500 to-teal-500',
    items: [
      { icon: MessageSquare, text: 'Research meeting participants and generate briefing docs before calls' },
      { icon: FileText, text: 'Summarize overlooked messages and email backlogs' },
      { icon: FileText, text: 'Create invoices, track expenses, and organize work logs' },
      { icon: Terminal, text: 'Fix deployments by reviewing logs and pushing updates—even from your phone' },
    ],
  },
  {
    id: 'home',
    label: 'Smart Home',
    icon: Home,
    color: 'from-orange-500 to-amber-500',
    items: [
      { icon: Home, text: 'Control lights, thermostats, and devices with natural language' },
      { icon: Bell, text: 'Monitor events and get alerts (weather, earthquakes, website downtime)' },
      { icon: Terminal, text: 'Build personal automations without subscription services' },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-500',
    items: [
      { icon: MessageSquare, text: 'Monitor group chats for links and organize insights into knowledge bases' },
      { icon: TrendingUp, text: 'Track trends on forums and get curated content delivered' },
      { icon: FileSearch, text: 'Compile research from multiple sources into detailed reports' },
    ],
  },
  {
    id: 'creative',
    label: 'Creative',
    icon: Palette,
    color: 'from-rose-500 to-red-500',
    items: [
      { icon: Palette, text: 'Generate diagrams, UI mockups, and visualizations from descriptions' },
      { icon: Video, text: 'Edit videos, process music files, create thumbnails and assets' },
      { icon: Share2, text: 'Draft social posts, blog content, and scripts from prompts' },
    ],
  },
  {
    id: 'dev',
    label: 'Development',
    icon: Code,
    color: 'from-indigo-500 to-violet-500',
    items: [
      { icon: GitBranch, text: 'Manage repos: create issues, refactor code, publish packages via chat' },
      { icon: Globe, text: 'Build and deploy websites from descriptions' },
      { icon: Bug, text: 'Run overnight bug detection and have fixes ready by morning' },
      { icon: Database, text: 'Create CLI tools, APIs, and databases conversationally' },
    ],
  },
]

export function UseCases() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('productivity')

  const activeCat = categories.find(c => c.id === activeCategory) || categories[0]

  return (
    <section ref={ref} className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What You Can Do With Pip
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From daily tasks to complex projects, Pip handles it all
          </p>
        </motion.div>

        {/* Category Tabs - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl
                font-medium text-sm
                transition-all duration-300
                ${activeCategory === cat.id 
                  ? 'bg-card border border-blue-500/50 text-foreground shadow-lg shadow-blue-500/10' 
                  : 'bg-transparent border border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50'
                }
              `}
            >
              <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-blue-500' : ''}`} />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Category Tabs - Mobile Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:hidden mb-8"
        >
          <div className="scroll-container -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  scroll-item flex items-center gap-2 px-4 py-2.5 rounded-xl
                  font-medium text-sm whitespace-nowrap
                  transition-all duration-300
                  ${activeCategory === cat.id 
                    ? 'bg-card border border-blue-500/50 text-foreground' 
                    : 'bg-card/50 border border-border text-muted-foreground'
                  }
                `}
              >
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-blue-500' : ''}`} />
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {activeCat.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="
                  flex items-start gap-4 p-5 rounded-xl
                  bg-card/40 backdrop-blur-sm border border-border
                  use-case-card
                "
              >
                <div className={`
                  w-10 h-10 rounded-lg flex-shrink-0
                  bg-gradient-to-br ${activeCat.color}
                  flex items-center justify-center
                `}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-foreground leading-relaxed pt-1">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
