import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { animated, useSpring, useTrail } from '@react-spring/web'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'

const HomePage = () => {
  const { services, testimonials, accolades, feedbacks } = useSite()
  const impactRef = useRef(null)
  const [impactCounts, setImpactCounts] = useState({
    patients: 0,
    experience: 0,
    awards: 0,
    satisfaction: 0,
  })
  const [hasAnimated, setHasAnimated] = useState(false)

  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,20px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
  })

  const serviceTrail = useTrail(services.length, {
    from: { opacity: 0, transform: 'translate3d(0,12px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 200,
  })

  useEffect(() => {
    if (!impactRef.current || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated) return
          setHasAnimated(true)
          const start = performance.now()
          const duration = 1400
          const targets = {
            patients: 5000,
            experience: 13,
            awards: 5,
            satisfaction: 98,
          }

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setImpactCounts({
              patients: Math.floor(targets.patients * eased),
              experience: Math.floor(targets.experience * eased),
              awards: Math.floor(targets.awards * eased),
              satisfaction: Math.floor(targets.satisfaction * eased),
            })
            if (progress < 1) {
              requestAnimationFrame(tick)
            }
          }

          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(impactRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <>
      <section id="hero-video" className="relative isolate overflow-hidden">
        <div  className="absolute inset-0 h-screen">
          <video
            className="h-full w-full object-cover video-shadow"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80"
          >
            <source src="../public/video.mp4" type="video/mp4" />
          </video>
        <div className="absolute inset-0 bg-gradient-to-br 
            from-[rgba(64,177,182,1)] 
            via-[rgba(87,199,133,0.14)] 
            to-[rgba(24,80,160,1)]" />

          {/* <div className="absolute inset-0 video-overlay" /> */}
        </div>

        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col justify-center px-4 pb-16 pt-28 md:px-8">
          <animated.div style={heroSpring} className="max-w-2xl">

            
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xm font-semibold text-[#40B1B6] mb-2">
              <span className="h-3 w-3 rounded-full bg-[#1d4ed8]" />
              Child Health and Wellness
            </span>

            
            <h1 className="font-display text-4xl text-[#0f438d] md:text-6xl">
              Gentle care for growing minds and joyful childhoods.
            </h1>
            <p className="mt-4 text-base text-white/80 md:text-lg">
              Dr. Jhon combines evidence-based pediatrics with compassionate
              listening. From newborn care to teen wellness, every visit feels
              calm, clear, and reassuring.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/locations"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand-accent)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-[#c76d5f]"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:border-white"
              >
                Explore Services
              </Link>
            </div>
          </animated.div>

          <div className="mt-10 flex flex-wrap gap-6 text-white/90">
            {[
              { label: '15+ Years of Practice', value: '15+' },
              { label: '12k Happy Families', value: '12k' },
              { label: '98% Parent Satisfaction', value: '98%' },
            ].map((stat) => (
              <div key={stat.label} className="min-w-[150px]">
                <p className="font-display text-3xl">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="float-card max-w-sm absolute bottom-6 right-6 hidden max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-lg md:block">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              OPD Address
            </p>
            <p className="mt-2 font-display text-xl">
              23 Harmony Lane, Lakeview Heights
            </p>
            <p className="mt-2 text-sm text-white/80">
              Mon - Sat: 9:00 AM to 7:00 PM
            </p>
            <p className="mt-4 text-sm">Call: +91 98765 43210</p>
          </div>
        </div>
      </section>
      <section className="particle-section relative overflow-hidden">
        {/* <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" /> */}
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1d4ed8] shadow-soft">
              <span className="h-2 w-2 rounded-full bg-[#1d4ed8]" />
              Pediatric Health Expert
            </span>
            <h2 className="mt-6 font-display text-4xl text-[#0f172a] md:text-5xl">
              Dr. Jhon
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#1e3a8a]">
              Pediatrics & Child Wellness
            </p>
            <p className="mt-4 text-base text-[#334155]">
              Providing calm, personalized pediatric care with a focus on growth
              milestones, nutrition, and preventive health. Every visit is designed
              to keep parents informed and children comfortable.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#c7ddff] bg-white px-4 py-2 text-xs font-semibold text-[#1d4ed8]">
                Top Rated
              </span>
              <span className="rounded-full border border-[#c7ddff] bg-white px-4 py-2 text-xs font-semibold text-[#15803d]">
                Board Certified
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/locations"
                className="inline-flex items-center justify-center rounded-xl bg-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#1e40af]"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-[#1d4ed8] px-6 py-3 text-sm font-semibold text-[#1d4ed8] transition hover:bg-[#dbeafe]"
              >
                                Learn More ?
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="float-card relative max-w-sm rounded-3xl bg-white p-6 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=600&q=80"
                alt="Doctor portrait"
                className="float-image w-full rounded-2xl object-cover"
              />
              <div className="absolute -bottom-4 right-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1d4ed8] shadow-soft">
                Dr. Jhon
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Approach"
          title="A pediatric journey built around trust"
          subtitle="Holistic care plans, growth tracking, and preventive guidance to help every child thrive."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Gentle Consultations',
              desc: 'Unhurried visits with clear explanations and empathy for parents.',
            },
            {
              title: 'Growth and Nutrition',
              desc: 'Personalized nutrition plans and milestone monitoring.',
            },
            {
              title: 'Vaccinations and Safety',
              desc: 'Complete immunization schedules with comfort-first care.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft"
            >
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section> */}
      {/* <section className="signature-section py-16">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
          <SectionHeader
            eyebrow="Signature Services"
            title="Care that grows with your child"
            subtitle="Explore specialized pediatric services crafted to meet your child's evolving needs."
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
                  <h3 className="mt-4 font-display text-xl">{service.title}</h3>
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    {service.description}
                  </p>
                </animated.div>
              )
            })}
          </div>
        </div>
      </section> */}
      <section
        className="parallax relative py-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1475776408506-9a5371e7a068?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#1b2a2e]/70" />
        <div className="relative mx-auto w-full max-w-4xl px-4 text-center text-white md:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Care Philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl">
            A calm, comforting experience for every child.
          </h2>
          <p className="mt-4 text-sm text-white/80 md:text-base">
            The clinic blends warm interiors, playful cues, and child-friendly
            explanations to ease anxiety and build confidence.
          </p>
        </div>
      </section>
      {/* <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Accolades"
          title="Recognitions that reflect care quality"
          subtitle="National and local honors for pediatrics excellence, patient experience, and community outreach."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {accolades.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                {item.year}
              </p>
              <h3 className="mt-3 font-display text-xl">{item.title}</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section> */}
      {/* <section className="bg-[#f8f1ea] py-16">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="Parents who feel supported"
            subtitle="Real stories from families who trust Dr. Jhon with their child's wellbeing."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-soft"
              >
                <p className="text-sm text-[var(--muted)]">"{item.quote}"</p>
                <p className="mt-4 font-display text-lg">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section ref={impactRef} className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Our Impact"
          title="Making a Difference in Women's Healthcare"
          subtitle="Our commitment to excellence has helped thousands of women achieve better reproductive and overall health."
          align="center"
        />
        <div className="grid gap-6 text-center md:grid-cols-4">
          <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft">
            <p className="font-display text-4xl">
              {impactCounts.patients}+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Patients Treated
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft">
            <p className="font-display text-4xl">
              {impactCounts.experience}+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Overall Experience
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft">
            <p className="font-display text-4xl">{impactCounts.awards}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Awards Received
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft">
            <p className="font-display text-4xl">
              {impactCounts.satisfaction}%
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Patient Satisfaction
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Google Feedback"
          title="What families say online"
          subtitle="A snapshot of public reviews, highlighting compassion, clarity, and consistent follow-ups."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {feedbacks.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                <span>{item.rating}</span>
                <span>{item.platform}</span>
              </div>
              <p className="mt-4 text-sm text-[var(--muted)]">"{item.text}"</p>
              <p className="mt-4 font-display text-lg">{item.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
