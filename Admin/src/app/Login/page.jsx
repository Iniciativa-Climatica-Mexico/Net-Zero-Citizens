'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import SignInButton from '../components/SignInButton'

import GoogleButton from '../components/GoogleButton'
//import BrandLogo from "../components/Logo";

const Login = () => {
  // Retrieve the session and router so that we can navigate
  // the user back home if they are already authenticated
  //  const { status } = useSession();
  //  const router = useRouter();

  // // If the user is authenticated,F redirect them to the home
  // // page
  //  if (status === "authenticated") {
  //    router.replace("/");
  //  }

  return (
  /* <div className="grid h-screen grid-cols-8 overflow-hidden">
      <div
        className="col-span-5 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://placeimg.com/1000/1000/nature/grayscale')",
          backgroundSize: "cover",
        }}
      ></div>*/

    <div className="col-span-3 px-12 py-12">
      <SignInButton />
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
    // </div>
  )
}

export default Login
