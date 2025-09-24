import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center justify-center flex-row flex-nowrap overflow-visible relative w-min whitespace-pre rounded-[24px] backdrop-blur-[12px] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer",
  {
    variants: {
      variant: {
        default: "text-white",
        outline: "border border-white/20 bg-white/10 text-white",
        glass: "bg-white/10 backdrop-blur-[12px] text-white border border-white/20",
      },
      size: {
        default: "px-4 py-1 text-base font-medium",
        sm: "px-3 py-0.5 text-sm font-medium", 
        lg: "px-6 py-1.5 text-lg font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  style?: React.CSSProperties
}

function Tag({ className, variant, size, style, ...props }: TagProps) {
  return (
    <div
      className={cn(tagVariants({ variant, size, className }))}
      style={{
        backgroundColor: '#fff3',
        fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif',
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: '170%',
        ...style
      }}
      {...props}
    />
  )
}

export { Tag, tagVariants }
