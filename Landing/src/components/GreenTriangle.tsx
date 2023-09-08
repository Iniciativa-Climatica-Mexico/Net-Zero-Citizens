/**
 * Represents a green triangle svg decoration component.
 *
 * @component
 * @example
 * ```tsx
 * <GreenTriangleSVG />
 * ```
 */

'use client'
import { useIsMobile } from '@/hooks'
import GreenTriangle from '@public/svg/greenTriangle.svg'

export default function GreenTriangleSVG() {
  const isMobile = useIsMobile()

  return (
    <GreenTriangle
      className="w-[120vmax] lg:w-[110%]"
      viewBox={`0 0 ${isMobile ? 700 : 1166} 556`}
    />
  )
}
