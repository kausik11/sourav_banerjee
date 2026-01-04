import React, { useId, useRef, useState } from 'react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { sampleDoctorCenters } from '../data/doctorCenters'

const DoctorCentersSection = ({
  centers = sampleDoctorCenters,
  heading = 'Get in Touch',
  subtitle = "We're here to answer your questions and provide the care you need",
  doctorPhone,
  doctorEmail,
  className = '',
}) => {
  const safeCenters = Array.isArray(centers) ? centers : []
  const [activeCenterId, setActiveCenterId] = useState(() => safeCenters[0]?.id)
  const tabRefs = useRef([])
  const rawInstanceId = useId()
  const instanceId = rawInstanceId.replaceAll(':', '')
  const mapPanelId = `doctor-centers-map-${instanceId}`

  const resolvedActiveCenterId = safeCenters.some(
    (center) => center.id === activeCenterId,
  )
    ? activeCenterId
    : safeCenters[0]?.id

  const activeCenter =
    safeCenters.find((center) => center.id === resolvedActiveCenterId) ?? null

  const contactPhone = doctorPhone ?? activeCenter?.phone ?? ''
  const contactEmail = doctorEmail ?? activeCenter?.email ?? ''

  const focusAndSelectIndex = (index) => {
    const next = safeCenters[index]
    if (!next) return
    setActiveCenterId(next.id)
    tabRefs.current[index]?.focus?.()
  }

  const onTabKeyDown = (event, index) => {
    if (safeCenters.length <= 1) return

    const isNext = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const isPrev = event.key === 'ArrowLeft' || event.key === 'ArrowUp'
    const isHome = event.key === 'Home'
    const isEnd = event.key === 'End'

    if (!isNext && !isPrev && !isHome && !isEnd) return

    event.preventDefault()
    if (isHome) return focusAndSelectIndex(0)
    if (isEnd) return focusAndSelectIndex(safeCenters.length - 1)
    if (isNext) return focusAndSelectIndex((index + 1) % safeCenters.length)
    if (isPrev)
      return focusAndSelectIndex((index - 1 + safeCenters.length) % safeCenters.length)
  }

  const contactRows = [
    {
      label: 'Call Us',
      value: contactPhone,
      icon: FiPhone,
      href: contactPhone ? `tel:${contactPhone.replaceAll(' ', '')}` : undefined,
    },
    {
      label: 'Email',
      value: contactEmail,
      icon: FiMail,
      href: contactEmail ? `mailto:${contactEmail}` : undefined,
    },
  ]

  return (
    <section className={`mx-auto w-full max-w-6xl px-4 py-16 md:px-8 ${className}`}>
      <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start">
        <div>
          <h2 className="font-display text-3xl text-[#0f172a] md:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--muted)] md:text-base">
            {subtitle}
          </p>

          <div className="mt-8 grid gap-4">
            {contactRows.map((row) => {
              const Icon = row.icon
              return (
                <div key={row.label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dbeafe] text-[#1850a0]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a]">
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="mt-1 inline-flex text-sm text-[var(--muted)] underline-offset-4 hover:text-[#1850a0] hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-[var(--muted)]">{row.value}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
              Clinic Centers
            </p>
            <div
              role="tablist"
              aria-label="Doctor clinic centers"
              className="mt-4 grid gap-3"
            >
              {safeCenters.map((center, index) => {
                const isActive = center.id === resolvedActiveCenterId
                const location = `${center.city}, ${center.state}`

                return (
                  <button
                    key={center.id}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={mapPanelId}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveCenterId(center.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={[
                      'group relative w-full rounded-2xl border p-4 text-left transition',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1850a0]/40',
                      isActive
                        ? 'border-[#1850a0]/40 bg-[#eff6ff] shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
                        : 'border-[var(--line)] bg-white/70 hover:bg-white',
                    ].join(' ')}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute left-0 top-4 h-[calc(100%-2rem)] w-1 rounded-r-full transition',
                        isActive ? 'bg-[#1850a0]' : 'bg-transparent',
                      ].join(' ')}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-display text-base text-[#0f172a]">
                          {center.centerName}
                        </p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {center.address}
                        </p>
                        <p className="mt-0.5 text-sm text-[var(--muted)]">
                          {location}
                        </p>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 text-[#1850a0] transition group-hover:bg-white">
                        <FiMapPin aria-hidden="true" className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--muted)]">
                      <span className="inline-flex items-center gap-2">
                        <FiPhone aria-hidden="true" className="h-4 w-4" />
                        {center.phone}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <FiMail aria-hidden="true" className="h-4 w-4" />
                        {center.email}
                      </span>
                    </div>
                  </button>
                )
              })}

              {safeCenters.length === 0 ? (
                <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4 text-sm text-[var(--muted)]">
                  No clinic centers available.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          id={mapPanelId}
          role="tabpanel"
          aria-label="Selected clinic location map"
          className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/90 shadow-soft md:self-center"
        >
          {activeCenter ? (
            <iframe
              key={activeCenter.id}
              title={`Map showing ${activeCenter.centerName}`}
              aria-label={`Live map showing ${activeCenter.centerName}`}
              src={activeCenter.googleMapEmbedUrl}
              className="h-[360px] w-full border-0 md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-[360px] w-full items-center justify-center p-6 text-sm text-[var(--muted)] md:h-[420px]">
              Select a clinic center to view the map.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DoctorCentersSection
