import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'

const TipsDetailPage = () => {
  const { id } = useParams()
  const { tips } = useSite()
  const tip = tips.find((item) => item.id === id)

  const nextTips = useMemo(() => {
    if (!tips.length) return []
    const currentIndex = tips.findIndex((item) => item.id === id)
    if (currentIndex === -1) return tips.slice(0, 3)
    const ordered = [
      ...tips.slice(currentIndex + 1),
      ...tips.slice(0, currentIndex),
    ]
    return ordered.slice(0, 3)
  }, [tips, id])

  if (!tip) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Tips & Advice"
          title="Tip not found"
          subtitle="The tip you are looking for does not exist."
        />
        <Link
          to="/tips"
          className="inline-flex items-center text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]"
        >
          Back to tips
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-16 md:px-8">
        <Link
          to="/tips"
          className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]"
        >
          Back to tips
        </Link>
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-flex items-center rounded-full border border-white/80 bg-[var(--brand-accent)] px-3 py-1 text-xs uppercase tracking-[0.1em] text-white shadow-sm">
              Tips and Advice
            </p>
            <h1 className="mt-4 font-display text-3xl text-[var(--brand-blue)] md:text-4xl">
              {tip.title}
            </h1>
            {tip.textHtml ? (
              <div
                className="mt-6 text-sm text-[var(--muted)] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: tip.textHtml }}
              />
            ) : (
              <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
                {tip.text}
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft">
            {tip.image ? (
              <img
                src={tip.image}
                alt={tip.title}
                className="h-56 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-56 items-center justify-center rounded-xl bg-[#f6f3ef] text-sm text-[var(--muted)]">
                No image available
              </div>
            )}
            <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
              Small routines build big confidence. Try one new habit this week.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f1ea] py-16">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
          <SectionHeader
            eyebrow="Next tips"
            title="Next available tips and advice"
            subtitle="Keep exploring quick, practical guidance for families."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nextTips.map((item) => (
              <Link
                key={item.id || item.title}
                to={item.id ? `/tips/${item.id}` : '/tips'}
                className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft transition hover:border-[var(--brand-accent)]"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-36 w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-36 w-full items-center justify-center rounded-xl bg-[#f6f3ef] text-xs text-[var(--muted)]">
                    No image
                  </div>
                )}
                <h3 className="mt-4 font-display text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.text}</p>
                <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)]">
                  Read tip
                </span>
              </Link>
            ))}
            {!nextTips.length && (
              <div className="rounded-2xl border border-[var(--line)] bg-white p-6 text-sm text-[var(--muted)] shadow-soft">
                No additional tips available yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default TipsDetailPage
