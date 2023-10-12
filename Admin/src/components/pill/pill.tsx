import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const pillVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors',
  {
    variants: {
      status: {
        approved: 'bg-[#547C8B] text-white hover:bg-[#658997]',
        pending_approval: 'bg-[#FFA000] text-white hover:bg-[#FF8F00]',
        rejected: 'bg-[#D32F2F] text-white hover:bg-[#C1272D]',
      },
      size: {
        default: 'h-[2rem] min-w-[6rem] max-w-max',
      },
    },

    defaultVariants: {
      status: 'approved',
      size: 'default',
    },
  }
)

const statusToSpanish = {
  approved: 'Aprobado',
  pending_approval: 'Pendiente',
  rejected: 'Rechazado',
}

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  status: keyof typeof statusToSpanish
}

/**
 * Componente que muestra un pill con un color de fondo y texto
 *
 * @param status - Color del pill
 * @param props - Props adicionales
 * @returns Un componente de React
 */
const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ status, ...props }, ref) => {
    const pillClasses = pillVariants({ status })

    return (
      <div ref={ref} className={cn(pillClasses, props.className)} {...props}>
        {statusToSpanish[status]}
      </div>
    )
  }
)

Pill.displayName = 'Pill'
export { Pill }
