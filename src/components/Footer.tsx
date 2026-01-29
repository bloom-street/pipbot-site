import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-foreground font-semibold">PipBot</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a 
            href="https://x.com/thomascain_" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Twitter/X
          </a>
        </div>
      </div>
    </footer>
  )
}
