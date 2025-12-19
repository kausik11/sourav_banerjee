import React from 'react'

const SectionHeader = ({ eyebrow, title, subtitle, align = 'left' }) => {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left'

  return (
    <div className={`mb-10 flex flex-col ${alignment}`}>
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl mt-3">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm md:text-base text-[var(--muted)]">
        {subtitle}
      </p>
    </div>
  )
}

export default SectionHeader
