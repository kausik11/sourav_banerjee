import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'


const stripHtml = (value) =>
  value ? value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''

const FaqPage = () => {
  const { faqs } = useSite()
  console.log("faqs",faqs);
  const [openKey, setOpenKey] = useState(null)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 4

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return faqs
    }

    const tokens = normalizedQuery.split(/\s+/).filter(Boolean)
    return faqs.filter((item) => {
      const tags = Array.isArray(item.tags) ? item.tags.join(' ') : ''
      const metadata = Array.isArray(item.metadata) ? item.metadata.join(' ') : ''
      const haystack = `${item.title} ${item.question} ${item.answer} ${tags} ${metadata}`.toLowerCase()
      return tokens.every((token) => haystack.includes(token))
    })
  }, [faqs, query])

  const totalPages = Math.max(1, Math.ceil(filteredFaqs.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pagedFaqs = filteredFaqs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 text-slate-900 md:px-8">
        <SectionHeader
          eyebrow="FAQs"
          title="Common child health concerns"
          subtitle="Answers to the most noted parent questions, with clear guidance from Dr. Jhon."
        />
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-semibold uppercase tracking-[0.1em] text-[var(--brand-accent)]">
              Search FAQs
            </p>
            <p className="mt-1 text-base font-medium text-[var(--brand-blue)]">
              Try words like fever, sleep, nutrition, vaccines, or growth.
            </p>
          </div>
          <div className="w-full md:w-[320px]">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
                setOpenKey(null)
              }}
              className="w-full rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm outline-none transition focus:border-[var(--brand-accent)]"
              placeholder="Search questions or answers"
              type="search"
              aria-label="Search FAQs"
            />
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {pagedFaqs.map((item) => {
              const isOpen = openKey === item.question
              return (
                <div
                  key={item.question}
                  className="w-full rounded-2xl border border-[var(--line)] bg-white p-6 text-left shadow-soft transition hover:border-[var(--brand-accent)] hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : item.question)}
                    className="flex w-full min-w-0 items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                    aria-expanded={isOpen}
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title || item.question}
                        className="h-12 w-12 rounded-xl object-cover ring-2 ring-white"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-xl bg-[var(--line)]" />
                    )}
                    <div className="min-w-0 flex-1">
                      {item.title ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)]">
                          {item.title}
                        </p>
                      ) : null}
                      <h3 className="mt-1 break-words whitespace-normal font-display text-lg text-slate-900">
                        {stripHtml(item.question)}
                      </h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--brand-blue)]">
                        Tap to {isOpen ? 'close' : 'open'}
                      </p>
                    </div>
                    <span
                      className={`text-2xl text-[var(--brand-accent)] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-4 space-y-3 text-sm text-slate-600">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                            Answer
                          </p>
                          <p className="mt-1 break-words">
                            {stripHtml(item.answer)}
                          </p>
                        </div>
                        {Array.isArray(item.tags) && item.tags.length > 0 ? (
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                              Tags
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={`${item.question}-tag-${tag}`}
                                  className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null}
                        {/* {Array.isArray(item.metadata) && item.metadata.length > 0 ? (
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                              Metadata
                            </p>
                            <p className="mt-1 text-xs text-[var(--muted)]">
                              {item.metadata.join(' • ')}
                            </p>
                          </div>
                        ) : null} */}
                        {/* {item.link ? (
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                              Link
                            </p>
                            <p className="mt-1 text-xs text-[var(--muted)] break-all">
                              {item.link}
                            </p>
                          </div>
                        ) : null} */}
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] transition hover:brightness-110"
                          >
                            Learn more
                          </a>
                        ) : (
                          <span />
                        )}
                        <Link
                          to="/locations#send-message"
                          className="inline-flex items-center justify-center rounded-full bg-[var(--brand-accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                        >
                          Book an appointment
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {filteredFaqs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white p-6 text-center text-sm text-slate-500">
                No matches found. Try fewer words or different terms.
              </div>
            )}
            {filteredFaqs.length > pageSize && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 text-sm shadow-soft">
                <p className="text-slate-500">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPage((prev) => Math.max(prev - 1, 1))
                      setOpenKey(null)
                    }}
                    disabled={currentPage === 1}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-[var(--brand-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={`page-${index + 1}`}
                      type="button"
                      onClick={() => {
                        setPage(index + 1)
                        setOpenKey(null)
                      }}
                      className={`h-9 w-9 rounded-full border text-xs font-semibold transition ${
                        currentPage === index + 1
                          ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white'
                          : 'border-[var(--line)] text-slate-600 hover:border-[var(--brand-accent)]'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setPage((prev) => Math.min(prev + 1, totalPages))
                      setOpenKey(null)
                    }}
                    disabled={currentPage === totalPages}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-[var(--brand-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-gradient-to-br from-[#fff4ea] via-[#fffaf4] to-[#f7f2ec] p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--brand-accent)]">
              Pediatric Focus
            </p>
            <h3 className="mt-3 font-display text-2xl text-slate-900">
              Calm answers for real-life worries
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              These FAQs cover fever management, vaccination schedules, nutrition,
              and growth milestones. For urgent concerns, contact the clinic
              immediately.
            </p>
            <img
              className="mt-6 h-60 w-full rounded-xl object-cover"
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
              alt="Doctor with child"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default FaqPage
