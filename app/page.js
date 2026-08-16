import Link from "next/link";
import Navbar from "@/components/Navbar";
import CompassMark from "@/components/CompassMark";

const STEPS = [
  {
    n: "01",
    title: "Create an account",
    body: "Sign up with a name, username, and password. Your credentials stay on this browser only.",
  },
  {
    n: "02",
    title: "Log in",
    body: "Log back in any time with the same username and password to reach your dashboard.",
  },
  {
    n: "03",
    title: "Find your location",
    body: "On the dashboard, press \"Find my location\" and allow the browser's location prompt.",
  },
  {
    n: "04",
    title: "Read the map",
    body: "See a pin drop on your spot, your exact coordinates, and your city and province.",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-14">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3 text-brass">
              <CompassMark size={56} />
              <span className="font-mono-coord text-xs uppercase tracking-widest">
                Lat / Long · City · Province
              </span>
            </div>
            <h1 className="font-display font-semibold text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-2xl">
              Where am I, exactly?
            </h1>
            <p className="text-lg text-ink-soft max-w-xl leading-relaxed">
              WhereAmI turns your browser into a field instrument. One button
              press finds your coordinates, drops a pin on a live map, and
              tells you what city and province you&apos;re standing in.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/signup"
                className="bg-ink text-paper font-medium rounded-md px-6 py-3 hover:bg-ink-soft transition-colors"
              >
                Create an account
              </Link>
              <Link
                href="/login"
                className="border border-line font-medium rounded-md px-6 py-3 hover:border-ink transition-colors"
              >
                I already have one
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-line bg-white/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <p className="text-xs uppercase tracking-widest text-brass font-medium mb-2">
              How to use it
            </p>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-10">
              Four steps to your spot on the map
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
              {STEPS.map((step) => (
                <div key={step.n} className="flex gap-4">
                  <span className="font-mono-coord text-sm text-brass pt-1 shrink-0">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fine print */}
        <section className="border-t border-line">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <p className="text-sm text-ink-soft max-w-lg">
              Your location is only requested when you press the button, and
              it&apos;s never sent anywhere except to draw the map and look up
              your city. The dashboard is only reachable once you&apos;re
              logged in.
            </p>
          </div>
        </section>
      </main>
      <footer className="border-t border-line py-6">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-xs text-ink-soft/70 font-mono-coord">
          WhereAmI · built with Next.js, Leaflet & OpenStreetMap
        </div>
      </footer>
    </>
  );
}
