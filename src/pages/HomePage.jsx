import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { animated, useSpring, useTrail } from '@react-spring/web'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'
import DoctorCentersSection from '../components/DoctorCentersSection'
import { sampleDoctorCenters } from '../data/doctorCenters'
import { FaAward, FaHeartbeat, FaSmile, FaUserMd } from 'react-icons/fa'
import Typed from 'typed.js'
// import doctorimage from "../../public/doctor_main.png"
import doctorImage from "../assets/S_banerjee_main.jpeg"
import cert1 from "../assets/certificate (1).jpeg"
import cert2 from "../assets/certificate (2).jpeg"
import cert3 from "../assets/certificate (3).jpeg"
import cert4 from "../assets/certificate (4).jpeg"
import cert5 from "../assets/certificate (5).jpeg"
import cert6 from "../assets/certificate (6).jpeg"
import cert7 from "../assets/certificate (7).jpeg"
import cert8 from "../assets/certificate (8).jpeg"
import cert9 from "../assets/certificate (9).jpeg"
import cert10 from "../assets/certificate (10).jpeg"
import cert11 from "../assets/certificate (12).jpeg"
import cert12 from "../assets/certificate (13).jpeg"
import homeConference from "../assets/home_conference.jpeg"
import video4 from "../../public/video.mp4"



const HomePage = () => {
  const { services, testimonials, accolades, feedbacks } = useSite()
  console.log("feedback", feedbacks);
  const impactRef = useRef(null)
  const [impactCounts, setImpactCounts] = useState({
    patients: 0,
    experience: 0,
    awards: 0,
    satisfaction: 0,
  })
  const [hasAnimated, setHasAnimated] = useState(false);
  const typedRef = useRef(null);
  const certificateImages = [
    cert1,
    cert2,
    cert3,
    cert4,
    cert5,
    cert6,
    cert7,
    cert8,
    cert9,
    cert10,
    cert11,
    cert12,
  ];
  const awardsSlides = certificateImages.map((image, index) => ({
    image,
    year: `20${24 - (index % 5)}`,
    title: `Certificate of Excellence ${index + 1}`,
    description:
      'Recognized for outstanding pediatric care, clinical excellence, and patient-first service.',
  }));
  const [awardIndex, setAwardIndex] = useState(0);
  const handlePrevAward = () =>
    setAwardIndex((prev) => (prev - 1 + awardsSlides.length) % awardsSlides.length);
  const handleNextAward = () =>
    setAwardIndex((prev) => (prev + 1) % awardsSlides.length);
  const addressCards = [
    {
      label: 'OPD Address',
      address: '23 Harmony Lane, Lakeview Heights',
      hours: 'Mon - Sat: 9:00 AM to 7:00 PM',
      phone: '+91 98765 43210',
    },
    {
      label: 'Clinic Address',
      address: '15 Riverbend Road, Greenfield Park',
      hours: 'Mon - Fri: 10:00 AM to 6:00 PM',
      phone: '+91 98765 98765',
    },
    {
      label: 'Consulting Room',
      address: '8 Sunrise Plaza, Maple District',
      hours: 'Tue - Sun: 8:30 AM to 2:00 PM',
      phone: '+91 91234 56789',
    },
    {
      label: 'Weekend OPD',
      address: '45 Willow Street, Northview',
      hours: 'Sat - Sun: 9:00 AM to 5:00 PM',
      phone: '+91 99887 66554',
    },
  ];

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

  useEffect(()=>{
    if(!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [  'Pediatrician.',
      'Neonatologist.',
      'Child Health Specialist.',
      'here to care.'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
    })

    return()=>{
      typed.destroy()
    }
  },[])

  return (
    <>
      <section
        id="hero-video"
        className="relative isolate min-h-[100svh] overflow-hidden"
      >
        <div className="absolute inset-0 h-[100svh]">
          <video
            className="h-full w-full object-cover video-shadow"
            autoPlay
            loop
            muted
            playsInline
            // poster="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80"
          >
            <source src={video4} type="video/mp4" />
          </video>
        <div className="absolute inset-0 bg-gradient-to-br 
            from-[rgba(24,80,160,1)] 
            via-[rgba(87,199,133,0.14)] 
            to-[rgba(64,177,182,1)]" />
          {/* <div className="absolute inset-0 video-overlay" /> */}
        </div>

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-28 md:px-8">
          <animated.div style={heroSpring} className="max-w-2xl">

            
              {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-2 py-2 text-xm font-semibold text-[#1d4ed8] mb-2">
              <span className="h-3 w-3 rounded-full bg-[#1d4ed8]" />
              Child Health and Wellness
            </span> */}

            
            <h1 className="font-display text-4xl text-[var(--paper)] md:text-6xl">
              {/* Gentle care for growing minds and joyful childhoods. */}
              Dr. sourav Banerjee is a{' '}
              <span className="text-[var(--brand-black)]" ref={typedRef}></span>
            </h1>
            <p className="mt-4 text-lg text-white/90 md:text-xl">
              Dr. Jhon combines evidence-based pediatrics with compassionate
              listening. From newborn care to teen wellness, every visit feels
              calm, clear, and reassuring.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/locations"
                className="inline-flex items-center justify-center rounded-full bg-white/40 px-6 py-3 text-lg uppercase tracking-[0.25em]
                font-bold text-white transition hover:bg-[var(--brand-accent)]"
              >
                Book Appointment
              </Link>
              {/* <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/40 px-6 py-3 text-lg uppercase tracking-[0.25em] text-white transition hover:border-white"
              >
                Explore Services
              </Link> */}
            </div>
          </animated.div>

          <div className="mt-10 flex flex-wrap gap-6 text-white/90 font-bold">
            {[
              { label: '15+ Years of Practice', value: '15+' },
              { label: '12k Happy Families', value: '12k' },
              { label: '98% Parent Satisfaction', value: '98%' },
            ].map((stat) => (
              <div key={stat.label} className="min-w-[150px] font-semibold">
                <p className="font-display text-3xl">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 w-full lg:mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:absolute lg:bottom-6 lg:right-0 lg:w-[520px]">
              {addressCards.map((card) => (
                <div
                  key={card.address}
                  className="float-card rounded-2xl border border-white/20 bg-white p-5 text-slate-900 shadow-xl backdrop-blur-lg lg:bg-white/10 lg:text-white"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 lg:text-white/70">
                    {card.label}
                  </p>
                  <p className="mt-2 font-display text-lg">{card.address}</p>
                  <p className="mt-2 text-sm text-slate-600 lg:text-white/80">{card.hours}</p>
                  <p className="mt-3 text-sm text-slate-700 lg:text-white">Call: {card.phone}</p>
                </div>
              ))}
            </div>
          </div>
           
          
          
          
        </div>
      </section>
      <section className="particle-section relative overflow-hidden">
          
        {/* <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" /> */}
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-8">
          <div>
       <span className="inline-flex items-center gap-2 rounded-full 
                 bg-white px-4 py-2 text-xs font-semibold uppercase 
                 tracking-[0.15em] text-[var(--brand-blue)] 
                 border-2 border-[var(--brand-blue)]/60 
                 shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                 font-semibold text-sm">

              <span className="h-2 w-2 rounded-full bg-[var(--brand-blue)] " />
              Pediatric Health Expert
            </span>
            <h2 className=" mt-6 font-display text-4xl font-bold text-[var(--brand-blue)] md:text-5xl">
              Dr. sourav Banerjee
            </h2>
            <p className="mt-3 text-lg font-semibold text-[var(--brand-accent)]">
              Pediatrics & Child Wellness
            </p>
            <p className="mt-4 text-base text-[var(--muted)]">
              Providing calm, personalized pediatric care with a focus on growth
              milestones, nutrition, and preventive health. Every visit is designed
              to keep parents informed and children comfortable.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--brand-blue)]/20 bg-white px-4 py-2 text-xs font-semibold text-[var(--brand-blue)]">
                Top Rated
              </span>
              <span className="rounded-full border border-[var(--brand-accent)]/30 bg-white px-4 py-2 text-xs font-semibold text-[var(--brand-accent)]">
                Board Certified
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-blue)] px-6 py-3 text-sm font-semibold text-[var(--brand-blue)] transition hover:bg-[rgba(24,80,160,0.12)]"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-blue)] px-6 py-3 text-sm font-semibold text-[var(--brand-blue)] transition hover:bg-[rgba(24,80,160,0.12)]"
              >
                Learn More ?
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end relative">
            {/* <div
              className="float-card relative max-w-sm rounded-3xl bg-[var(--brand-accent)] bg-cover bg-center bg-no-repeat p-6 shadow-soft"
              // style={{ backgroundImage: "url('/large-triangles.png')" }}
            > */}
              <img
                src={doctorImage}
                alt="Doctor portrait"
                className="float-image w-full rounded-2xl object-cover border-6 border-[var(--brand-accent)]"
              />
              <div className="absolute -bottom-4 right-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--brand-blue)] shadow-lg">
                Dr. Sourav Banerjee
              </div>
            {/* </div> */}
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
      {/* <section
       className="parallax relative bg-contain bg-center bg-no-repeat py-20"
  style={{
    backgroundImage: `url(${homeConference})`,
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
      </section> */}
      <section
  className="parallax relative bg-auto bg-center bg-no-repeat py-20"
  style={{
    backgroundImage: `url(${homeConference})`,
  }}
>
  <div className="absolute inset-0 bg-[#1b2a2e]/70" />
  <div className="relative mx-auto w-full max-w-4xl px-4 text-center text-white md:px-8">
    <p className="text-xs uppercase tracking-[0.3em] text-white/70 pb-20">
      Care Philosophy
    </p>
    <h2 className="font-display text-4xl md:text-5xl pb-20">
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
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]">
              <FaHeartbeat className="text-xl" aria-hidden="true" />
            </div>
            <p className="font-display text-2xl text-[var(--brand-blue)] font-semibold">
              {impactCounts.patients}+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[var(--muted)] font-semibold">
              Patients Treated
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]">
              <FaUserMd className="text-xl" aria-hidden="true" />
            </div>
            <p className="font-display text-2xl text-[var(--brand-blue)] font-semibold">
              {impactCounts.experience}+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[var(--muted)] font-semibold">
              Overall Experience
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]">
              <FaAward className="text-xl" aria-hidden="true" />
            </div>
            <p className="font-display text-2xl text-[var(--brand-blue)] font-semibold">{impactCounts.awards}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[var(--muted)] font-semibold">
              Awards Received
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-soft">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]">
              <FaSmile className="text-xl" aria-hidden="true" />
            </div>
            <p className="font-display text-2xl text-[var(--brand-blue)] font-semibold">
              {impactCounts.satisfaction}%
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[var(--muted)] font-semibold">
              Patient Satisfaction
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Awards & Recognition"
          title="Honors that reflect care quality"
          subtitle="Selected awards and milestones celebrating excellence in pediatric care."
          align="center"
        />
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white/80 shadow-soft">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${awardIndex * 100}%)` }}
          >
            {awardsSlides.map((item) => (
              <div
                key={`${item.title}-${item.year}`}
                className="min-w-full p-6 md:p-10"
              >
                <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-56 w-full object-contain md:h-72"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                      {item.year}
                    </p>
                    <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                    <p className="mt-3 text-sm text-[var(--muted)]">
                      {item.description}
                    </p>
                    <p className="mt-4 text-sm text-[var(--muted)]">
                      Every recognition marks the trust families place in the
                      clinic, and the care team&apos;s commitment to clear
                      guidance and follow-through.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-6 pb-6 md:px-10">
            <button
              type="button"
              onClick={handlePrevAward}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--brand-blue)] transition hover:bg-[rgba(24,80,160,0.08)]"
            >
              Prev
            </button>
            <div className="flex items-center gap-2">
              {awardsSlides.map((_, index) => (
                <button
                  key={`award-dot-${index}`}
                  type="button"
                  onClick={() => setAwardIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    index === awardIndex
                      ? 'bg-[var(--brand-accent)]'
                      : 'bg-[var(--line)]'
                  }`}
                  aria-label={`Go to award ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNextAward}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--brand-blue)] transition hover:bg-[rgba(24,80,160,0.08)]"
            >
              Next
            </button>
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
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="mt-4 h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <p className="mt-4 text-sm text-[var(--muted)]">"{item.text}"</p>
              <p className="mt-4 font-display text-lg">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <DoctorCentersSection
        centers={sampleDoctorCenters}
        heading="Get in Touch"
        subtitle="We're here to answer your questions and provide the care you need."
      />
    </>
  )
}

export default HomePage
