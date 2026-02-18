import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import DoctorCentersSection from '../components/DoctorCentersSection'
import { sampleDoctorCenters } from '../data/doctorCenters'
import { API_BASE } from '../utils/api'
import contact from "../assets/Contact.jpeg"


const LocationsPage = () => {
  const location = useLocation()
  const [chambers, setChambers] = useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    chamberName: '',
    description: '',
  })
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })
  useEffect(() => {
    if (location.hash === '#send-message') {
      const target = document.getElementById('send-message')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location.hash])

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

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState({ status: 'loading', message: '' })

    try {
      const response = await fetch(`${API_BASE}/api/callbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          chamberName: formData.chamberName,
          description: formData.description.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const message =
          errorData?.message || 'Unable to submit the callback request.'
        setSubmitState({ status: 'error', message })
        window.alert(message)
        return
      }

      setSubmitState({
        status: 'success',
        message: 'Thanks! We received your request and will call you soon.',
      })
      window.alert('Thanks! We received your request and will call you soon.')
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        chamberName: '',
        description: '',
      })
    } catch {
      setSubmitState({
        status: 'error',
        message: 'Network error. Please try again in a moment.',
      })
      window.alert('Network error. Please try again in a moment.')
    }
  }

  return (
    <>
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <SectionHeader
        eyebrow="Locations"
        title="Dr. Sourav Banerjee's clinics"
        subtitle="Choose a convenient clinic and reach out for appointments or pediatric guidance."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {chambers.map((chamber) => (
          <div
            key={chamber._id}
            className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft"
          >
            <h3 className="font-display text-xl text-[var(--brand-blue)]">
              {chamber.name}
            </h3>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {chamber.address}
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--brand-accent)]">
              {(chamber.timings || []).join(' | ')}
            </p>
            {chamber.contact ? (
              <p className="mt-3 text-sm text-[var(--muted)]">
                Call: {chamber.contact}
              </p>
            ) : null}
          </div>
        ))}
        {!chambers.length && (
          <p className="text-sm text-[var(--muted)]">
            No locations available right now.
          </p>
        )}
      </div>
    </section>
    <DoctorCentersSection
      centers={sampleDoctorCenters}
      heading="Get in Touch"
      subtitle="Select a clinic center to view its live location on the map."
    />
    

    <section id="send-message" className=" py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div>
          <SectionHeader
            eyebrow="Contact Us"
            title="Send a message"
            subtitle="Share your concern and we will respond with available appointment slots."
          />
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-[var(--line)] bg-white/90 px-4 py-4 text-sm text-slate-800 shadow-soft"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                placeholder="Full name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                placeholder="Phone"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <select
                className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                name="chamberName"
                value={formData.chamberName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select chamber</option>
                {chambers.map((chamber) => (
                  <option key={chamber._id} value={chamber.name}>
                    {chamber.name}{chamber.address ? ` - ${chamber.address}` : ""}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className="mt-4 h-32 w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
              placeholder="Message"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="mt-5 inline-flex rounded-full bg-[var(--brand-accent)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-[#c76d5f] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={submitState.status === 'loading'}
            >
              {submitState.status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {submitState.message ? (
              <p
                className={`mt-3 text-sm ${
                  submitState.status === 'success'
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                }`}
              >
                {submitState.message}
              </p>
            ) : null}
          </form>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
            Clinic Map
          </p>
          <h3 className="mt-3 font-display text-xl text-[var(--brand-blue)]">Central Location</h3>
          <p className="mt-3 text-sm text-[var(--muted)]">
            23 Harmony Lane, Lakeview Heights
          </p>
          <img
            className="mt-6 h-56 w-full rounded-xl object-cover border border-[var(--brand-blue)]"
            src={contact}
            alt="Clinic location"
          />
          <div className="mt-6 rounded-xl p-4 text-sm text-[var(--muted)]">
            <p className="font-display text-lg text-[var(--brand-blue)]">
              Appointment Desk
            </p>
            <p className="mt-2">+91 98765 43210</p>
            <p className="mt-1">hello@drjhonclinic.com</p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default LocationsPage
