"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import LocationFinder from "@/components/LocationFinder";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, isLoggedIn, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isLoggedIn) {
      router.replace("/login");
    }
  }, [ready, isLoggedIn, router]);

  if (!ready || !isLoggedIn) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-sm text-ink-soft">Checking your session…</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <p className="text-xs uppercase tracking-widest text-brass font-medium mb-2">
            Dashboard
          </p>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl mb-1">
            Welcome, {user?.name}
          </h1>
          <p className="text-sm text-ink-soft mb-10">
            Press the button below to find your current location.
          </p>

          <LocationFinder />
        </div>
      </main>
    </>
  );
}
