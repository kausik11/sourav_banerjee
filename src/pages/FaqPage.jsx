import React, { useState } from 'react'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'


const faqImages = [
  'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503455637927-730bce8583c0?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
]

const FaqPage = () => {
  const { faqs } = useSite()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="FAQs"
          title="Common child health concerns"
          subtitle="Answers to the most noted parent questions, with clear guidance from Dr. Jhon."
        />
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full rounded-2xl border border-[var(--line)] bg-white p-6 text-left shadow-soft transition hover:border-[var(--brand-accent)]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={faqImages[index % faqImages.length]}
                      alt=""
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-lg">{item.question}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                        Tap to {isOpen ? 'close' : 'open'}
                      </p>
                    </div>
                    <span className="text-2xl text-[var(--brand-accent)]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <p className="mt-4 text-sm text-[var(--muted)]">
                      {item.answer}
                    </p>
                  )}
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[#fdf7f1] p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
              Pediatric Focus
            </p>
            <h3 className="mt-3 font-display text-2xl">
              Calm answers for real-life worries
            </h3>
            <p className="mt-3 text-sm text-[var(--muted)]">
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
