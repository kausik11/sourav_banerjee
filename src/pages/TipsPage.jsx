import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'
import paralaxDoctor from "../assets/paralax_doctor.jpeg"

const TipsPage = () => {
  const { tips, feedbacks } = useSite()
  const [activeReview, setActiveReview] = useState(0)
  const hasFeedbacks = feedbacks.length > 0
  const activeFeedback = hasFeedbacks
    ? feedbacks[activeReview]
    : {
        text: 'No feedback available yet.',
        name: 'Team',
        platform: '',
        rating: '',
      }

  useEffect(() => {
    if (!feedbacks.length) return undefined
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % feedbacks.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [feedbacks.length])

  return (
    <>
      <section
        className="parallax relative min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[rgba(15,52,104,0.78)]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 text-center text-white md:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Newsletter
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">
            Subscribe for weekly pediatric tips.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 md:text-base">
            Quick, parent-friendly updates on wellness, nutrition, and
            developmental milestones.
          </p>
          <form className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none sm:max-w-sm"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--brand-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition hover:bg-[#2c969c]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section
        className="parallax doctor-note relative min-h-screen min-w-screen"
        style={{
          backgroundImage: `url(${paralaxDoctor})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,31,61,0.92)] via-[rgba(15,52,104,0.78)] to-[rgba(15,52,104,0.1)]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 md:px-8">
          <div className="max-w-xl text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">
              Doctor's Note
            </p>
            <h2 className="mt-4 font-display text-3xl drop-shadow md:text-5xl">
              "Listening closely is the first step to healing."
            </h2>
            <p className="mt-4 text-sm text-white/85 md:text-base">
              "Every child deserves calm, thoughtful care. My goal is to guide
              families with clarity, empathy, and science-backed advice so each
              visit feels reassuring."
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Dr. Sourav Banerjee
            </p>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen bg-[var(--brand-deep)] py-20 text-white">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Feedback
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-5xl">
            What parents are saying
          </h2>
          <div className="mt-10 w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-soft backdrop-blur">
            <p className="text-lg md:text-xl">"{activeFeedback.text}"</p>
            {hasFeedbacks ? (
              <>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  {activeFeedback.name}
                  {activeFeedback.platform
                    ? ` - ${activeFeedback.platform}`
                    : ''}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Rating {activeFeedback.rating}
                </p>
              </>
            ) : (
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Be the first to share a review.
              </p>
            )}
          </div>
          {feedbacks.length > 1 && (
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveReview((prev) =>
                    prev === 0 ? feedbacks.length - 1 : prev - 1,
                  )
                }
                className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                aria-label="Previous review"
              >
                Prev
              </button>
              <div className="flex items-center gap-2">
                {feedbacks.map((_, index) => (
                  <button
                    key={`review-dot-${index}`}
                    type="button"
                    onClick={() => setActiveReview(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      activeReview === index
                        ? 'bg-[var(--brand-accent)]'
                        : 'bg-white/40'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setActiveReview((prev) => (prev + 1) % feedbacks.length)
                }
                className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                aria-label="Next review"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Tips & Advice"
          title="Everyday guidance for parents"
          subtitle="Simple, pediatric-approved routines that support healthier sleep, nutrition, and emotional balance."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((item) => (
            <Link
              key={item.id || item.title}
              to={item.id ? `/tips/${item.id}` : '/tips'}
              className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft transition hover:border-[var(--brand-accent)]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-36 w-full rounded-xl object-cover"
              />
              <h3 className="mt-4 font-display text-lg text-[var(--brand-blue)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.text}</p>
              <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)]">
                Read tip
              </span>
            </Link>
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
