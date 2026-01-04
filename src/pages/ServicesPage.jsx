import React from 'react'
import { animated, useTrail } from '@react-spring/web'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'


const ServicesPage = () => {
  const { services } = useSite()

  const serviceTrail = useTrail(services.length, {
    from: { opacity: 0, transform: 'translate3d(0,12px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 150,
  })

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Services"
          title="Complete pediatric services"
          subtitle="Newborn to adolescent care, all within a nurturing, child-first environment."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceTrail.map((style, index) => {
            const service = services[index]
            return (
              <animated.div
                key={service.title}
                style={style}
                className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-soft"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-40 w-full rounded-xl object-cover"
                />
                <h3 className="mt-4 font-display text-xl text-[var(--brand-blue)] leading-snug break-words">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm md:text-base text-[var(--muted)] leading-relaxed line-clamp-2 md:line-clamp-3">
                  {service.description}
                </p>
              </animated.div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ServicesPage
