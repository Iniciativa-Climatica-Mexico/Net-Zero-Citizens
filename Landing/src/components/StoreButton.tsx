import Image from 'next/image'
import { headers } from 'next/headers'

export default function StoreButton() {
  const headersList = headers()
  const userAgent = String(headersList.get('user-agent'))
  const isAndroid = /Android/i.test(userAgent)
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
  return (
    <div>
      {isIOS == true && (
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
      {isAndroid == true && (
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
      {!isAndroid && !isIOS && (
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
