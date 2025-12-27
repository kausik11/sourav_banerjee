import React from 'react'

const SectionHeader = ({ eyebrow, title, subtitle, align = 'left' }) => {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left'

  return (
    <div className={`mb-10 flex flex-col ${alignment}`}>
      <p className="text-xl  font-semibold uppercase tracking-[0.1em] text-[var(--brand-accent)] underline underline-offset-8 decoration-2 decoration-[var(--line)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-medium text-2xl text-slate-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-1 max-w-xl text-sm text-[var(--brand-blue)] md:text-base">
        {subtitle}
      </p>
    </div>
  )
}

export default SectionHeader
