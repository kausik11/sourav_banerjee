import React from 'react'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'


const TipsPage = () => {
  const { tips } = useSite()

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Tips & Advice"
          title="Everyday guidance for parents"
          subtitle="Simple, pediatric-approved routines that support healthier sleep, nutrition, and emotional balance."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-36 w-full rounded-xl object-cover"
              />
              <h3 className="mt-4 font-display text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="parallax relative py-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#1b2a2e]/70" />
        <div className="relative mx-auto w-full max-w-4xl px-4 text-center text-white md:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Parenting Support
          </p>
          <h2 className="font-display text-4xl md:text-5xl">
            Thoughtful routines build confident kids.
          </h2>
          <p className="mt-4 text-sm text-white/80 md:text-base">
            Every household is unique. We help craft a plan that fits your
            family and grows with your child.
          </p>
        </div>
      </section>
    </>
  )
}

export default TipsPage
