import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const pillVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors relative overflow-hidden',
  {
    variants: {
      status: {
        approved: 'bg-[#547C8B] text-white opacity-80',
        pending_approval: 'bg-[#FFE6C2] text-[#D32F2F]',
        rejected: 'bg-[#D32F2F] text-white',
        optional: 'border border-[#547C8B] text-[#547C8B] bg-transparent',
        mandatory: 'bg-[#547C8B] text-white',
        multiple_choice: 'bg-[#589A74] text-white px-6',
        open: 'bg-[#589A74] text-white',
        scale: 'bg-[#589A74] text-white',
      },
      size: {
        default: 'h-[2rem] min-w-[6rem] max-w-max',
        small: 'h-[1.5rem] min-w-[4rem] max-w-max',
      },
    },

    defaultVariants: {
      size: 'default',
    },
  }
)

const statusToSpanish = {
  approved: 'Aprobado',
  pending_approval: 'Pendiente',
  rejected: 'Rechazado',
  optional: 'Opcional',
  mandatory: 'Obligatorio',
  multiple_choice: 'Opción múltiple',
  open: 'Abierta',
  scale: 'Escala',
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
    const text = statusToSpanish[status]

    return (
      <div ref={ref} className={cn(pillClasses, props.className)} {...props}>
        {text}
      </div>
    )
  }
)

Pill.displayName = 'Pill'
export { Pill }
