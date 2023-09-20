import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import GoogleButton from '../components/GoogleButton'
//import BrandLogo from "../components/Logo";

const Login = () => {
  // Retrieve the session and router so that we can navigate
  // the user back home if they are already authenticated
  const { status } = useSession()
  const router = useRouter()

  // If the user is authenticated, redirect them to the home
  // page
  if (status === 'authenticated') {
    router.replace('/')
  }

  return (
    <div className="grid h-screen grid-cols-8 overflow-hidden">
      <div
        className="col-span-5 overflow-hidden"
        style={{
          backgroundImage:
            // eslint-disable-next-line quotes
            "url('https://placeimg.com/1000/1000/nature/grayscale')",
          backgroundSize: 'cover',
        }}
      ></div>

      <div className="col-span-3 px-12 py-12">
        <BrandLogo className="mx-auto w-96" />
        <p className="mt-2 text-center">
          Gain immediate access to thousands of news articles from around the
          world.
        </p>
        <h2 className="mb-8 mt-12 text-2xl font-bold">Sign In</h2>
        <div className="mb-8">
          <GoogleButton />
        </div>
        <Link
          href="/"
          className="block text-center text-sm text-gray-500 underline"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default Login
