import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { animated, useSpring, useTrail } from '@react-spring/web'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'
import DoctorCentersSection from '../components/DoctorCentersSection'
import { sampleDoctorCenters } from '../data/doctorCenters'
import { API_BASE } from '../utils/api'
import {
  FaAward,
  FaHeartbeat,
  FaSmile,
  FaUserMd,
} from 'react-icons/fa'
import Typed from 'typed.js'
// import doctorimage from "../../public/doctor_main.png"
import doctorImage from "../assets/S_banerjee_main.jpeg"
import homeConference from "../assets/home_conference.jpeg"
import video4 from "../../public/video.mp4"



const HomePage = () => {
  const { services, testimonials, accolades, feedbacks, certificates, videoGallery } = useSite()
  const impactRef = useRef(null)
  const [aboutOpenIndex, setAboutOpenIndex] = useState(0)
  const [impactCounts, setImpactCounts] = useState({
    patients: 0,
    experience: 0,
    awards: 0,
    satisfaction: 0,
  })
  const [hasAnimated, setHasAnimated] = useState(false);
  const typedRef = useRef(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingCard, setBookingCard] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    chamberName: '',
    description: '',
  })
  const [bookingSubmitting, setBookingSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState('')
  const sanitizeEmbedUrl = (value) => {
    if (!value) return ''
    return value.split('"')[0].trim()
  }
  const isEmbeddableVideo = (value) => {
    if (!value) return false
    return value.includes('youtube.com/embed') || value.includes('player.vimeo.com')
  }
  const awardsSlides = certificates.map((item) => ({
    image: item.image,
    year: item.year,
    title: item.title,
    description: item.description,
  }))
  const [awardIndex, setAwardIndex] = useState(0);
  const awardsCount = awardsSlides.length
  const handlePrevAward = () => {
    if (!awardsCount) return
    setAwardIndex((prev) => (prev - 1 + awardsCount) % awardsCount)
  }
  const handleNextAward = () => {
    if (!awardsCount) return
    setAwardIndex((prev) => (prev + 1) % awardsCount)
  }
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [chambers, setChambers] = useState([])
  const videoSlides = videoGallery.map((item) => ({
    id: item.id || item.title,
    title: item.title,
    description: item.description,
    embedUrl: sanitizeEmbedUrl(item.embedUrl),
    videoLink: item.embedUrl,
  }))
  const [videoIndex, setVideoIndex] = useState(0)
  const videoCount = videoSlides.length
  const handlePrevVideo = () => {
    if (!videoCount) return
    setVideoIndex((prev) => (prev - 1 + videoCount) % videoCount)
  }
  const handleNextVideo = () => {
    if (!videoCount) return
    setVideoIndex((prev) => (prev + 1) % videoCount)
  }
  const aboutItems = [
    {
      title: 'Short Bio',
      content:
        'Dr. Sourav Banerjee is a renowned pediatrician,He has vast knowledge & over 10 yrs experience in this field. He is a very dynamic person, calm & passionate to his profession. Moto Is Healthy Baby Happy Family',
    },
    {
      title: 'Academic Qualifications',
      content:
        "MBBS (R.G.KAR), M. D. (PED) (Medical College KOLKATA ), ex Senior Resident Medical College KOLKATA , ex WBHS, Certified course : IPPN(Australia ),PGPN (BOSTON )",
    },
    {
      title: 'Skill Certification',
      content:
        'Certified in pediatric nutrition, developmental and behavioral screening, neonatal and pediatric emergency care, immunization practices, and child-friendly clinical management..',
    },
    {
      title: 'Membership',
      content:
        'Affiliated with leading pediatric organizations, reflecting a strong commitment to safe, ethical, and evidence-driven pediatric care',
    },
    {
      title: 'Previous Appointments In India',
      content:
        'Clinical experience across India, bringing national best practices to local care.',
    },
  ]
  const handlePrevFeedback = () =>
    setFeedbackIndex((prev) =>
      feedbacks.length ? (prev - 1 + feedbacks.length) % feedbacks.length : 0
    );
  const handleNextFeedback = () =>
    setFeedbackIndex((prev) =>
      feedbacks.length ? (prev + 1) % feedbacks.length : 0
    );
  const startImpactAnimation = () => {
    if (hasAnimated) return
    setHasAnimated(true)
    const start = performance.now()
    const duration = 2400
    const targets = {
      patients: 5000,
      experience: 13,
      awards: 25,
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
  }
  const openBookingModal = (card) => {
    setBookingCard(card);
    setBookingOpen(true);
    setBookingForm((prev) => ({
      ...prev,
      chamberName: card?.chamberName || '',
    }))
    setBookingError('')
    setBookingSuccess('')
  };
  const closeBookingModal = () => {
    setBookingOpen(false);
    setBookingCard(null);
  };
  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    setBookingSubmitting(true)
    setBookingError('')
    setBookingSuccess('')
    try {
      const response = await fetch(`${API_BASE}/api/callbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: bookingForm.fullName,
          phoneNumber: bookingForm.phoneNumber,
          email: bookingForm.email,
          chamberName: bookingForm.chamberName || bookingCard?.chamberName || '',
          description: bookingForm.description,
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.message || 'Failed to send request')
      }
      setBookingSuccess('Request sent successfully.')
      setBookingForm({
        fullName: '',
        phoneNumber: '',
        email: '',
        chamberName: bookingCard?.chamberName || '',
        description: '',
      })
      setTimeout(() => {
        closeBookingModal()
      }, 600)
    } catch (error) {
      setBookingError(error.message || 'Failed to send request')
    } finally {
      setBookingSubmitting(false)
    }
  };
  const getVisibleFeedbacks = () => {
    if (feedbacks.length <= 3) return feedbacks
    return [
      feedbacks[feedbackIndex % feedbacks.length],
      feedbacks[(feedbackIndex + 1) % feedbacks.length],
      feedbacks[(feedbackIndex + 2) % feedbacks.length],
    ]
  }
  const renderHours = (hours) => {
    if (!hours) return null
    return hours.split(/<br\s*\/?>/i).map((line, index) => (
      <span key={`${line}-${index}`} className="block">
        {line.trim()}
      </span>
    ))
  }
  const addressCards = chambers.map((chamber) => ({
    chamberName: chamber.name || '',
    label: 'OPD Address',
    address: chamber.address || '',
    hours: Array.isArray(chamber.timings)
      ? chamber.timings.join(' <br/> ')
      : '',
    phone: chamber.contact || '',
  }))

  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,20px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
  })

  const serviceTrail = useTrail(services.length, {
    from: { opacity: 0, transform: 'translate3d(0,12px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    delay: 200,
  })

  const [feedbackSpring, feedbackApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'translate3d(0,12px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    config: { tension: 210, friction: 22 },
  }))

  useEffect(() => {
    if (!impactRef.current || hasAnimated) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      startImpactAnimation()
      return
    }

    const isMobile = window.innerWidth < 768
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated) return
          startImpactAnimation()
        })
      },
      {
        threshold: isMobile ? 0.35 : 0.7,
        rootMargin: isMobile ? '0px 0px -20% 0px' : '0px',
      },
    )

    observer.observe(impactRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    feedbackApi.start({
      from: { opacity: 0, transform: 'translate3d(0,12px,0)' },
      to: { opacity: 1, transform: 'translate3d(0,0,0)' },
      reset: true,
    })
  }, [feedbackIndex, feedbackApi])

  useEffect(() => {
    const controller = new AbortController()
    const loadChambers = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/chambers`, {
          signal: controller.signal,
        })
        if (!response.ok) return
        const data = await response.json()
        setChambers(Array.isArray(data) ? data : [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          setChambers([])
        }
      }
    }
    loadChambers()
    return () => controller.abort()
  }, [])

  useEffect(()=>{
    if(!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [  'Expert Pediatrician.',
      'Child Health Specialist.',
      'Pediatrician and Neonatologist.'],
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

  useEffect(() => {
    if (feedbacks.length <= 1) return
    const intervalId = setInterval(() => {
      setFeedbackIndex((prev) => (prev + 1) % feedbacks.length)
    }, 10000)
    return () => clearInterval(intervalId)
  }, [feedbacks.length])

  useEffect(() => {
    if (feedbackIndex >= feedbacks.length && feedbacks.length > 0) {
      setFeedbackIndex(0)
    }
  }, [feedbackIndex, feedbacks.length])

  useEffect(() => {
    if (awardIndex >= awardsCount && awardsCount > 0) {
      setAwardIndex(0)
    }
  }, [awardIndex, awardsCount])

  useEffect(() => {
    if (videoIndex >= videoCount && videoCount > 0) {
      setVideoIndex(0)
    }
  }, [videoIndex, videoCount])

  return (
    <>
      <section
        id="hero-video"
        className="relative isolate min-h-[100svh] overflow-hidden"
      >
        <div className="absolute inset-0">
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(27, 214, 222,0.5) 0%, rgba(64,177,192,0.35) 55%, rgba(64,177,182,0.8) 100%)',
          }}
        />
          {/* <div className="absolute inset-0 video-overlay" /> */}
        </div>

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-28 md:px-8">
          <animated.div style={heroSpring} className="max-w-2xl">

            
              {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-2 py-2 text-xm font-semibold text-[#1d4ed8] mb-2">
              <span className="h-3 w-3 rounded-full bg-[#1d4ed8]" />
              Child Health and Wellness
            </span> */}

            
            <h1 className="font-display text-4xl text-[var(--paper)] leading-tight md:text-6xl">
              {/* Gentle care for growing minds and joyful childhoods. */}
              Dr. sourav Banerjee is a{' '}
              <span className="text-[var(--brand-black)] drop-shadow" ref={typedRef}></span>
            </h1>
            <p className="mt-4 text-lg text-white/90 md:text-xl">
              Dr. Sourav Banerjee combines evidence-based pediatrics with compassionate
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

          {/* <div className="mt-10 flex flex-wrap gap-6 text-white/90 font-bold">
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
          </div> */}

          <div className="relative z-10 mt-10 w-full md:mt-12 lg:mt-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {addressCards.map((card) => (
                <div
                  key={`${card.chamberName}-${card.address}`}
                  className="w-full rounded-2xl border border-white/20 bg-white/95 p-5 text-slate-900 shadow-xl backdrop-blur-lg"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 lg:text-slate-600">
                    {card.label}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {card.chamberName}
                  </p>
                  <p className="mt-2 font-display text-lg">{card.address}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    {renderHours(card.hours)}
                  </p>
                  {card.phone ? (
                    <p className="mt-3 text-sm text-slate-700">
                      Call: {card.phone}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => openBookingModal(card)}
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-[var(--brand-accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white bg-[var(--brand-accent)] transition hover:bg-[var(--brand-accent)] hover:text-white"
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
           
          
          
          
        </div>
      </section>
      {bookingOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent)]">
                  Book Appointment
                </p>
                <h3 className="mt-2 font-display text-2xl text-[var(--brand-blue)]">
                  {bookingCard?.address || 'Clinic Consultation'}
                </h3>
                {bookingCard?.hours ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {bookingCard.hours.replace(/<br\s*\/?>/gi, ' | ')}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={closeBookingModal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-blue)]/20 text-[var(--brand-blue)] transition hover:bg-[var(--brand-blue)] hover:text-white"
                aria-label="Close booking form"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <form className="mt-6 space-y-4" onSubmit={handleBookingSubmit}>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={bookingForm.fullName}
                  onChange={(event) =>
                    setBookingForm((prev) => ({
                      ...prev,
                      fullName: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-[var(--brand-blue)]/15 px-4 py-3 text-sm text-slate-900 focus:border-[var(--brand-accent)] focus:outline-none"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Your number"
                    value={bookingForm.phoneNumber}
                    onChange={(event) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        phoneNumber: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-[var(--brand-blue)]/15 px-4 py-3 text-sm text-slate-900 focus:border-[var(--brand-accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={bookingForm.email}
                    onChange={(event) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-[var(--brand-blue)]/15 px-4 py-3 text-sm text-slate-900 focus:border-[var(--brand-accent)] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                  Chamber Name
                </label>
                <select
                  required
                  value={bookingForm.chamberName}
                  onChange={(event) =>
                    setBookingForm((prev) => ({
                      ...prev,
                      chamberName: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-[var(--brand-blue)]/15 px-4 py-3 text-sm text-slate-900 focus:border-[var(--brand-accent)] focus:outline-none"
                >
                  <option value="">Select a chamber</option>
                  {chambers.map((chamber) => (
                    <option key={chamber._id} value={chamber.name}>
                      {chamber.name}
                      {chamber.address ? ` - ${chamber.address}` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                  Message
                </label>
                <textarea
                  rows="3"
                  placeholder="Share your concern"
                  value={bookingForm.description}
                  onChange={(event) =>
                    setBookingForm((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-[var(--brand-blue)]/15 px-4 py-3 text-sm text-slate-900 focus:border-[var(--brand-accent)] focus:outline-none"
                />
              </div>
              {bookingError ? (
                <p className="text-sm text-red-600">{bookingError}</p>
              ) : null}
              {bookingSuccess ? (
                <p className="text-sm text-emerald-600">{bookingSuccess}</p>
              ) : null}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {bookingCard?.phone ? (
                  <a
                    href={`tel:${bookingCard.phone.replace(/\s/g, '')}`}
                    className="text-sm font-semibold text-[var(--brand-blue)]"
                  >
                    Call: {bookingCard.phone}
                  </a>
                ) : null}
                <button
                  type="submit"
                  disabled={bookingSubmitting}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--brand-accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--brand-blue)]"
                >
                  {bookingSubmitting ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <section className="particle-section relative overflow-hidden">
        {/* <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" /> */}
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-start md:px-8">
          <div className="space-y-9">
            {/* <span className="inline-flex items-center rounded-full bg-[var(--brand-accent)]/15 px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-blue)]">
              About Me
            </span> */}
             <SectionHeader
          eyebrow="About Me"
          title="Delivering dedicated, individual care for better health"
          subtitle="Our team of dedicated professionals is committed to providing exceptional care and support on your Parenthood journey
"
          align="center"
        />
            <div className="space-y-4">
              {aboutItems.map((item, index) => {
                const isOpen = aboutOpenIndex === index
                return (
                  <div key={item.title} className="border-b border-[var(--brand-blue)]/20 pb-3">
                    <button
                      type="button"
                      onClick={() => setAboutOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between py-2 text-left text-base font-semibold tracking-[0.01em] text-[var(--brand-blue)]"
                      aria-expanded={isOpen}
                      aria-controls={`about-panel-${index}`}
                    >
                      <span>{item.title}</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--brand-blue)]/30">
                        <svg
                          viewBox="0 0 24 24"
                          className={`h-3 w-3 text-[var(--brand-blue)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <div
                      id={`about-panel-${index}`}
                      className={`overflow-hidden text-sm leading-relaxed text-[var(--muted)] transition-all duration-300 ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="pb-3">{item.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="pt-2">
              <p className="font-signature text-3xl font-medium leading-none text-[var(--brand-blue)] md:text-4xl">
                Dr. Sourav Banerjee
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--brand-accent)]">
                MD
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute -left-6 top-6 h-[94%] w-[94%] rounded-[2.6rem] bg-[var(--brand-accent)]/20 shadow-[0_30px_60px_rgba(12,45,90,0.12)] rotate-[-4deg]" />
              <div className="pointer-events-none absolute -right-3 -top-4 h-[86%] w-[86%] rounded-[2.5rem] border border-[var(--brand-blue)]/10 bg-white/70" />
              <img
                src={doctorImage}
                alt="Doctor portrait"
                className="relative w-full rounded-[2.5rem] object-cover shadow-[0_18px_50px_rgba(15,23,42,0.2)]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Our Services"
          title="Care tailored to every child"
          subtitle="From routine checkups to specialized pediatric guidance, each visit is designed to support healthy growth."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card rounded-2xl border border-[var(--line)] bg-white/90 p-6"
            >
              <h3 className="font-display text-xl text-[var(--brand-blue)]">{service.title}</h3>
              <p className="mt-3 text-sm text-[var(--muted)] line-clamp-2 md:line-clamp-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        {services.length === 0 ? (
          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            Services will appear here once available.
          </p>
        ) : null}
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
  <div className="absolute inset-0 bg-[#0f172a]/70" />
  <div className="relative mx-auto w-full max-w-4xl px-4 text-center md:px-8">
    <p className="text-xl uppercase tracking-[0.3em] text-[var(--brand-accent)]">
      Care Philosophy
    </p>
    <h2 className="mt-6 font-display text-3xl text-white drop-shadow md:text-5xl">
      A calm, comforting experience for every child
    </h2>
    <p className="mt-5 text-base text-white/85 md:text-lg">
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
          title="Making a Difference in Children's Healthcare"
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
        {awardsCount > 0 ? (
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
                      <p className="text-base uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                        {item.year}
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-[var(--brand-blue)]">{item.title}</h3>
                      <p className="mt-3 text-sm text-[var(--muted)]">
                        {item.description}
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
        ) : (
          <div className="rounded-3xl border border-dashed border-[var(--line)] bg-white/70 p-8 text-center text-sm text-[var(--muted)]">
            Awards will appear here once available.
          </div>
        )}
      </section>
      <section className="bg-white/80 py-16">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
          <SectionHeader
            eyebrow="Video Gallery"
            title="Watch Dr. Sourav in action"
            subtitle="Short clips that explain care routines, clinic visits, and family-friendly guidance."
            align="center"
          />
          {videoCount > 0 ? (
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-soft">
                  {isEmbeddableVideo(videoSlides[videoIndex].embedUrl) ? (
                    <div className="relative pb-[56.25%]">
                      <iframe
                        key={videoSlides[videoIndex].id}
                        src={videoSlides[videoIndex].embedUrl}
                        title={videoSlides[videoIndex].title}
                        className="absolute inset-0 h-full w-full"
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-6 text-center">
                      <p className="text-sm text-[var(--muted)]">
                        This video provider doesn't support in-page playback.
                      </p>
                      <a
                        href={videoSlides[videoIndex].videoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-[var(--brand-accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                      >
                        Watch Video
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {videoSlides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setVideoIndex(index)}
                        aria-label={`Show ${slide.title}`}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          index === videoIndex
                            ? 'bg-[var(--brand-accent)]'
                            : 'bg-[var(--line)]'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <button
                      type="button"
                      onClick={handlePrevVideo}
                      className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--brand-blue)] transition hover:border-[var(--brand-blue)]"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={handleNextVideo}
                      className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--brand-blue)] transition hover:border-[var(--brand-blue)]"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-[var(--line)] bg-white/90 p-6 shadow-soft">
                <h3 className="mt-4 font-display text-2xl text-[var(--brand-blue)]">
                  {videoSlides[videoIndex].title}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {videoSlides[videoIndex].description}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[var(--line)] bg-white/70 p-8 text-center text-sm text-[var(--muted)]">
              Videos will appear here once available.
            </div>
          )}
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Google Feedback"
          title="What families say online"
          subtitle="A snapshot of public reviews, highlighting compassion, clarity, and consistent follow-ups."
          align="center"
        />
        {feedbacks.length > 0 ? (
          <>
            <animated.div style={feedbackSpring} className="grid gap-6 md:grid-cols-3">
              {getVisibleFeedbacks().map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 text-center shadow-soft transition-transform duration-500 ease-out hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center gap-6 text-sm uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                    <span className="inline-flex items-center gap-0 text-sm">
                      <span aria-hidden="true">★</span>
                      {item.rating}
                    </span>
                    <span>{item.platform}</span>
                  </div>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="mx-auto mt-5 h-16 w-16 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <p className="mt-5 text-base text-[var(--muted)]">
                    "{item.text}"
                  </p>
                  <p className="mt-4 font-display text-lg text-[var(--brand-blue)]">{item.name}</p>
                </div>
              ))}
            </animated.div>
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevFeedback}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--brand-blue)] transition hover:bg-[rgba(24,80,160,0.08)]"
              >
                Prev
              </button>
              <div className="flex items-center gap-2">
                {feedbacks.map((_, index) => (
                  <button
                    key={`feedback-dot-${index}`}
                    type="button"
                    onClick={() => setFeedbackIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === feedbackIndex
                        ? 'bg-[var(--brand-accent)]'
                        : 'bg-[var(--line)]'
                    }`}
                    aria-label={`Go to feedback ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleNextFeedback}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--brand-blue)] transition hover:bg-[rgba(24,80,160,0.08)]"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/70 p-8 text-center text-sm text-[var(--muted)]">
            Reviews will appear here once they are published.
          </div>
        )}
        <div className="mt-8 flex justify-center bg-var[--brand-accent] s transition">
          <a
            href="https://www.google.com/search?sca_esv=2bc7513dd8de01bf&sxsrf=AE3TifPyKUZnZgv15xnzS-iJprPjpgFsUw:1767630835801&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E85QoNXJfnuO6OoJJUCsMc3Y5HynQSm1N_fXM8pjvQNN2FMhAw-Htrgfx4Y3uaGofQzaAD-HDl-Y5gC07342Wr_azM3nQ9gRgoiAr32nSo8jjrJQZXFQwW6vAPEUcv9zin_DHDxEp8vWzM4pTwWFiEUYo2q9IOK-l75AAQfc48wOL3HIXrfNZBp9RmWOHO6oC0DF3h3KOdDvflYqkqrQYVr7Fkj8e1Fax8fjUjfIDU1MwDFS0w%3D%3D&q=Dr.+Sourav+Banerjee+,+MD+%28pediatrics%29+Newborn+%26+Child+Specialist.+Consultant+pediatrician+in+North+24+Parganas+%26+Kolkata+Reviews&sa=X&ved=2ahUKEwilpL-A6vSRAxXRRmcHHaL_HWYQ0bkNegQIIxAD&biw=1536&bih=699&dpr=1.25#lrd=0x39f89fb85d26bdd1:0x5cd37c76dffcbe1d,3,,,,"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand-accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white "
          >
            Leave a Google Review
          </a>
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
