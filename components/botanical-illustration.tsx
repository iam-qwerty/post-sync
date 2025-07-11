"use client"

interface BotanicalIllustrationProps {
  variant?: "leaf1" | "leaf2" | "leaf3"
  className?: string
}

export function BotanicalIllustration({ variant = "leaf1", className = "" }: BotanicalIllustrationProps) {
  const illustrations = {
    leaf1: (
      <div className={`relative w-full h-full rounded-2xl warm-gradient overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-24 bg-green-600 rounded-full transform rotate-12 opacity-80"
            style={{ clipPath: "ellipse(40% 60% at 50% 50%)" }}
          ></div>
        </div>
      </div>
    ),
    leaf2: (
      <div className={`relative w-full h-full rounded-2xl warm-gradient overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-6 bg-green-600 rounded-full transform -rotate-12 opacity-80"
            style={{ clipPath: "ellipse(60% 40% at 50% 50%)" }}
          ></div>
        </div>
      </div>
    ),
    leaf3: (
      <div className={`relative w-full h-full rounded-2xl warm-gradient overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-20 bg-green-600 rounded-full transform rotate-45 opacity-80"
            style={{ clipPath: "ellipse(35% 65% at 50% 50%)" }}
          ></div>
        </div>
      </div>
    ),
  }

  return illustrations[variant]
}
