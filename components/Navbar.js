"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CompassMark from "./CompassMark";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { isLoggedIn, user, logout, ready } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-20">
      <nav className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <CompassMark size={30} />
          <span className="font-display font-semibold text-lg tracking-tight text-ink">
            WhereAmI
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {!ready ? null : isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-ink-soft hover:text-ink px-3 py-2 rounded-md transition-colors"
              >
                Dashboard
              </Link>
              <span className="hidden sm:inline text-sm text-ink-soft/70 font-mono-coord">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-3.5 py-2 rounded-md border border-line hover:border-ink transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-ink-soft hover:text-ink px-3 py-2 rounded-md transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium px-3.5 py-2 rounded-md bg-ink text-paper hover:bg-ink-soft transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
