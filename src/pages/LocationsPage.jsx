import React from 'react'
import SectionHeader from '../components/SectionHeader'


const LocationsPage = () => (
  <>
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <SectionHeader
        eyebrow="Locations"
        title="Visit Dr. Jhon's clinics"
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
            <h3 className="font-display text-xl">{location.title}</h3>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {location.address}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">{location.hours}</p>
          </div>
        ))}
      </div>
    </section>
    

    <section className="bg-[#f8f1ea] py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div>
          <SectionHeader
            eyebrow="Contact Us"
            title="Send a message"
            subtitle="Share your concern and we will respond with available appointment slots."
          />
          <form className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-soft">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                placeholder="Full name"
                type="text"
              />
              <input
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                placeholder="Email"
                type="email"
              />
              <input
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                placeholder="Phone"
                type="tel"
              />
              <input
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
                placeholder="Preferred location"
                type="text"
              />
            </div>
            <textarea
              className="mt-4 h-32 w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)]"
              placeholder="Message"
            />
            <button
              type="button"
              className="mt-4 inline-flex rounded-full bg-[var(--brand-accent)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-[#c76d5f]"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
            Clinic Map
          </p>
          <h3 className="mt-3 font-display text-xl">Central Location</h3>
          <p className="mt-3 text-sm text-[var(--muted)]">
            23 Harmony Lane, Lakeview Heights
          </p>
          <img
            className="mt-6 h-56 w-full rounded-xl object-cover"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
            alt="Clinic location"
          />
          <div className="mt-6 rounded-xl bg-[#fdf7f1] p-4 text-sm text-[var(--muted)]">
            <p className="font-display text-lg text-[var(--ink)]">
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

export default LocationsPage
