import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#3E5D8C] font-medium text-primary-foreground hover:bg-[#173871]',
        destructive:
          'bg-destructive font-medium text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border font-medium border-input bg-background hover:bg-[#F7FAFC] hover:text-accent-foreground border-[#C1C9D2] text-[#4F566B]',
        secondary:
          'bg-[#00A865] font-medium text-secondary-foreground hover:bg-[#00814A] text-white',
        ghost: 'hover:bg-accent font-medium hover:text-accent-foreground',
        link: 'text-primary font-medium underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 min-w-[4.8rem] max-w-[14rem] px-[25px]',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
