import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const LoginButton = ({ size, signInOnly }) => {
  // Get the user session so you can see if they are authenticated
  // or not.
  const { status } = useSession();

  const padding = size === "large" ? "py-2 px-4" : "py-1 px-2";

  if (status === "authenticated") {
    return !signInOnly ? (
      <button
        className={`${padding} rounded bg-red-600 text-sm font-bold text-white`}
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    ) : null;
  }

  return (
    <Link
      className={`${padding} my-1 rounded bg-red-600 text-sm font-bold text-white`}
      href="/login"
    >
      Sign In
    </Link>
  );
};

export default LoginButton;