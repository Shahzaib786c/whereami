"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CompassMark from "@/components/CompassMark";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(values) {
    setSubmitting(true);
    const result = login(values);
    setSubmitting(false);
    if (result.ok) {
      router.push("/dashboard");
    }
    return result;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <CompassMark size={44} />
            <h1 className="font-display font-semibold text-2xl mt-4">
              Welcome back
            </h1>
            <p className="text-sm text-ink-soft mt-2">
              Log in with your username and password to open the map.
            </p>
          </div>

          <div className="bg-white border border-line rounded-lg p-6 sm:p-7">
            <AuthForm mode="login" onSubmit={handleSubmit} submitting={submitting} />
          </div>

          <p className="text-sm text-ink-soft text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-ink font-medium underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
