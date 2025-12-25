import React, { useState } from 'react'
import SectionHeader from '../components/SectionHeader'

const galleryItems = [
  {
    id: 'waiting-lounge',
    title: 'Warm Waiting Lounge',
    tag: 'Clinic',
    note: 'Comfort-focused seating and soft lighting.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'care-team',
    title: 'Care Team Huddle',
    tag: 'People',
    note: 'Collaborative rounds for every patient.',
    image:
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wellness-room',
    title: 'Wellness Room',
    tag: 'Wellness',
    note: 'Calm colors and kid-friendly ambience.',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'vaccination-day',
    title: 'Vaccination Day',
    tag: 'Care',
    note: 'Gentle check-ins and quick recovery tips.',
    image:
      'https://images.unsplash.com/photo-1580281658626-3619a41ab8a3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'parent-workshop',
    title: 'Parent Workshop',
    tag: 'Events',
    note: 'Guidance sessions on newborn care.',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'play-zone',
    title: 'Play & Learn Zone',
    tag: 'Kids',
    note: 'Interactive corner to keep kids engaged.',
    image:
      'https://images.unsplash.com/photo-1503455637927-730bce8583c0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'nutrition-guidance',
    title: 'Nutrition Guidance',
    tag: 'Nutrition',
    note: 'Balanced meal planning for growth.',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'clinic-exterior',
    title: 'Clinic Exterior',
    tag: 'Clinic',
    note: 'Easy-to-find location with parking.',
    image:
      'https://images.unsplash.com/photo-1508450859948-4e1ad1d26bc8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'story-corner',
    title: 'Story Corner',
    tag: 'Kids',
    note: 'Quiet nook for calming activities.',
    image:
      'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=1200&q=80',
  },
]

const filterChips = [
  'All',
  'Clinic',
  'Care',
  'Kids',
  'Events',
  'Wellness',
  'Nutrition',
]

const PAGE_SIZE = 6

const GalleryPage = () => {
  const [activeItem, setActiveItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(galleryItems.length / PAGE_SIZE)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageItems = galleryItems.slice(pageStart, pageStart + PAGE_SIZE)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <SectionHeader
        eyebrow="Gallery"
        title="Moments that reflect calm, care, and community"
        subtitle="A visual tour of the clinic spaces, care routines, and parent sessions that define Dr. Sourav Banerjee's pediatric experience."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        {filterChips.map((chip) => (
          <span
            key={chip}
            className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
              chip === 'All'
                ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white shadow-soft'
                : 'border-[var(--brand-accent)] text-[var(--brand-accent)]'
            }`}
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
        {pageItems.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(24,80,160,0.22)]"
          >
            <button
              type="button"
              onClick={() => setActiveItem(item)}
              className="relative h-52 w-full overflow-hidden text-left"
              aria-label={`Open ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,24,40,0.6)] via-[rgba(16,24,40,0.1)] to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-blue)]">
                {item.tag}
              </span>
            </button>
            <div className="p-5">
              <h3 className="font-display text-lg text-[var(--brand-black)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.note}</p>
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveItem(item)}
                  className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]"
                >
                  View
                </button>
                <span className="h-px w-10 bg-[var(--brand-accent)]" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <span>
          Showing {pageStart + 1}-{Math.min(pageStart + PAGE_SIZE, galleryItems.length)} of{' '}
          {galleryItems.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-[var(--brand-accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] transition hover:bg-[var(--brand-accent)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1
            const isActive = page === currentPage
            return (
              <button
                key={`page-${page}`}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                  isActive
                    ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white shadow-soft'
                    : 'border-[var(--brand-accent)] text-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            )
          })}
          <button
            type="button"
            className="rounded-full border border-[var(--brand-accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] transition hover:bg-[var(--brand-accent)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {activeItem && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,17,30,0.75)] px-4 py-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} image preview`}
          onClick={() => setActiveItem(null)}
        >
          <div
            className="modal-panel relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_rgba(15,23,42,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close image preview"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[var(--brand-blue)] text-white shadow-soft"
            >
              <span className="text-lg leading-none">✕</span>
            </button>
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="h-[70vh] w-full object-cover"
            />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                {activeItem.tag}
              </p>
              <h3 className="mt-3 font-display text-2xl text-[var(--brand-black)]">
                {activeItem.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {activeItem.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default GalleryPage
