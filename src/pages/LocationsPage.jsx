import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import DoctorCentersSection from '../components/DoctorCentersSection'
import { sampleDoctorCenters } from '../data/doctorCenters'
import { API_BASE } from '../utils/api'
import contact from "../assets/Contact.jpeg"


const LocationsPage = () => {
  const location = useLocation()
  const [formData, setFormData] = useState({
    fullName: '',
    // email: '',
    phoneNumber: '',
    location: 'kolkata',
    // description: '',
    // image: null,
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

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState({ status: 'loading', message: '' })

    const payload = new FormData()
    payload.append('fullName', formData.fullName.trim())
    payload.append('email', formData.email.trim())
    payload.append('phoneNumber', formData.phoneNumber.trim())
    payload.append('location', formData.location)
    payload.append('description', formData.description.trim())
    if (formData.image) {
      payload.append('image', formData.image)
    }

    try {
      const response = await fetch(`${API_BASE}/api/callbacks`, {
        method: 'POST',
        body: payload,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const message =
          errorData?.message || 'Unable to submit the callback request.'
        setSubmitState({ status: 'error', message })
        return
      }

      setSubmitState({
        status: 'success',
        message: 'Thanks! We received your request and will call you soon.',
      })
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        location: 'kolkata',
        description: '',
        image: null,
      })
    } catch {
      setSubmitState({
        status: 'error',
        message: 'Network error. Please try again in a moment.',
      })
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
        {[
          {
            title: 'Lakeview Heights Clinic',
            address: '23 Harmony Lane, Bengaluru 560001',
            hours: 'Mon - Sat, 9:00 AM - 7:00 PM',
          },
          {
            title: 'Greenfield Pediatric Center',
            address: '11 Orchard Road, Bengaluru 560034',
            hours: 'Mon - Fri, 10:00 AM - 6:00 PM',
          },
          {
            title: 'Northside Childcare',
            address: '85 Riverwalk Ave, Bengaluru 560067',
            hours: 'Tue - Sun, 9:30 AM - 5:30 PM',
          },
        ].map((location) => (
          <div
            key={location.title}
            className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft"
          >
            <h3 className="font-display text-xl text-[var(--brand-blue)]">{location.title}</h3>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {location.address}
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--brand-accent)]">
              {location.hours}
            </p>
          </div>
        ))}
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
              {/* <input
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              /> */}
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
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="kolkata">Kolkata</option>
                <option value="howrah">Howrah</option>
                <option value="bardhaman">Bardhaman</option>
              </select>
            </div>
            {/* <textarea
              className="mt-4 h-32 w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
              placeholder="Message"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            /> */}
            {/* <div className="mt-4">
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Optional image
              </label>
              <input
                className="mt-2 block w-full rounded-xl border border-[var(--line)] bg-white px-4 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[var(--brand-accent)] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.2em] file:text-white"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div> */}
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
