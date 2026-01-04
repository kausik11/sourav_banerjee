import React from 'react'

const SectionHeader = ({ eyebrow, title, subtitle, align = 'left' }) => {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left'

  return (
    <div className={`mb-10 flex flex-col ${alignment}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] underline underline-offset-8 decoration-2 decoration-[var(--line)] md:text-base">
        {eyebrow}
      </p>
      <h2 className="mt-6 font-display text-3xl text-[var(--brand-blue)] drop-shadow md:text-5xl">
        {title}
      </h2>
      <p className="mt-1 max-w-xl text-sm text-[var(--brand-black)] md:text-base">
        {subtitle}
      </p>
    </div>
  )
}

export default SectionHeader
