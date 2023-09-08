'use client'

import Image from 'next/image'

export default function StoreButton() {
  const getMobileOS = () => {
    const ua = navigator.userAgent
    if (/android/i.test(ua)) {
      return 'Android'
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ) {
      return 'iOS'
    }
    return 'Other'
  }

  const OS = getMobileOS()

  return (
    <div>
      {OS == 'iOS' && (
        <a href="https://apple.com">
          <Image
            src="/images/appstore.svg"
            className="w-36"
            alt=""
            width={0}
            height={0}
          />
        </a>
      )}
      {OS == 'Android' && (
        <a href="https://play.google.com">
          <Image
            src="/images/playstore.svg"
            className="w-36"
            alt=""
            width={0}
            height={0}
          />
        </a>
      )}
      {OS == 'Other' && (
        <div className="flex gap-10">
          <a href="https://apple.com">
            <Image
              src="/images/appstore.svg"
              className="w-36"
              alt=""
              width={0}
              height={0}
            />
          </a>
          <a href="https://play.google.com">
            <Image
              src="/images/playstore.svg"
              className="w-36"
              alt=""
              width={0}
              height={0}
            />
          </a>
        </div>
      )}
    </div>
  )
}
