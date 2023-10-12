import Image from 'next/image'
import ICMLogoWhite from '@public/images/ICM-logo-white.png'

/**
 * Represents a navbar component.
 *
 * @component
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */

export default function Navbar() {
  return <nav className="bg-[#1e293b] w-full flex items-center justify-center py-3">
    <Image src={ICMLogoWhite} alt="logo" className="w-12" />
  </nav>
}
