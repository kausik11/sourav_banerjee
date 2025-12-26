import React from 'react'

const SectionHeader = ({ eyebrow, title, subtitle, align = 'left' }) => {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left'

  return (
    <div className={`mb-10 flex flex-col ${alignment}`}>
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl text-slate-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
        {subtitle}
      </p>
    </div>
  )
}

export default SectionHeader
