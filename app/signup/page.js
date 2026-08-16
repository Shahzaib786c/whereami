"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CompassMark from "@/components/CompassMark";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(values) {
    setSubmitting(true);
    const result = signup(values);
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
              Create your account
            </h1>
            <p className="text-sm text-ink-soft mt-2">
              Stored on this browser — log back in with the same details.
            </p>
          </div>

          <div className="bg-white border border-line rounded-lg p-6 sm:p-7">
            <AuthForm mode="signup" onSubmit={handleSubmit} submitting={submitting} />
          </div>

          <p className="text-sm text-ink-soft text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-ink font-medium underline underline-offset-2">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
