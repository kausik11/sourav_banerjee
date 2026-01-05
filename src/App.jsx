import React from 'react'
import { FaFacebookF, FaGoogle, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { SiteProvider, useSite } from './context/SiteContext'
import { sampleDoctorCenters } from './data/doctorCenters'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import LocationsPage from './pages/LocationsPage'
import TipsPage from './pages/TipsPage'
import TipsDetailPage from './pages/TipsDetailPage'
import FaqPage from './pages/FaqPage'
import BlogsPage from './pages/BlogsPage'
import BlogDetailPage from './pages/BlogDetailPage'
import GalleryPage from './pages/GalleryPage'
import Navbar from './components/Navbar'
import logo from '../public/logo.png'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Locations', to: '/locations' },
  { label: 'Tips & Advice', to: '/tips' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'FAQs', to: '/faqs' },
]

const AppLayout = () => {
  const { loading } = useSite()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--brand-deep)]">
        <div className="spinner" aria-label="Loading" />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
    <Navbar navItems={navItems} />

    {/* <div className="global-rings" aria-hidden="true">
      <span className="ring ring-blue" />
      <span className="ring ring-teal" />
      <span className="ring ring-orange" />
      <span className="ring ring-green" />
      <span className="ring ring-blue ring-lg" />
      <span className="ring ring-teal ring-lg" />
    </div> */}

    <a
      className="whatsapp-float"
      href="https://wa.me/919876543210?text=I%20want%20to%20book%20an%20appointment"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp-tooltip">Contact me</span>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="whatsapp-icon">
        <path
          fill="currentColor"
          d="M16 3C9.4 3 4 8.2 4 14.7c0 2.4.7 4.6 1.9 6.5L4 29l7-1.8c1.7.9 3.6 1.5 5.6 1.5 6.6 0 12-5.2 12-11.7S22.6 3 16 3zm6.9 16.1c-.3.9-1.7 1.7-2.4 1.8-.5.1-1.1.2-3.6-.7-3.1-1.1-5.1-4-5.2-4.2-.1-.2-1.3-1.7-1.3-3.2s.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.8.6.3.7 1 2.5 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.3.6-.2.2-.3.4-.5.6-.2.2-.3.4-.1.7.1.3.7 1.2 1.5 1.9 1 .9 1.8 1.2 2.1 1.4.3.1.5.1.7-.1.2-.2.8-.9 1-1.3.2-.3.4-.3.7-.2.3.1 1.7.8 2 1 .3.1.5.2.6.4.1.1.1.9-.2 1.8z"
        />
      </svg>
    </a>

    <main className="relative overflow-hidden">
      {/* <div className="particle particle-1" />
      <div className="particle particle-2" />
      <div className="particle particle-3" /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/tips/:id" element={<TipsDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/faqs" element={<FaqPage />} />
      </Routes>
    </main>

    <footer className="footer-shell">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Dr. Jhon"
                className="h-11 w-11 rounded-full border border-white/30 object-cover"
              />
              <p className="text-lg font-semibold text-white">Dr. Sourav Banerjee</p>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Providing exceptional pediatric care with personalized guidance
              for every child’s wellness journey and family comfort.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <div className="mt-3 h-px w-16 bg-white/30" />
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <NavLink to="/" className="hover:text-white">
                  About Dr. Sourav
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-white">
                  Our Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs" className="hover:text-white">
                  Patient Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/locations" className="hover:text-white">
                  Tips & Advice
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className="hover:text-white">
                  Blog & Articles
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Doctor Address</p>
            <div className="mt-3 h-px w-16 bg-white/30" />
            <div className="mt-4 grid gap-6 text-sm text-white/70 md:grid-cols-[1fr_1.1fr]">
              <div className="space-y-3">
                <p className="leading-relaxed">
                  Dr. Sourav Banerjee Clinic
                  <br />
                  214 Lakeview Avenue
                  <br />
                  Kolkata, WB 700029
                </p>
                <a
                  href="https://maps.google.com/?q=214+Lakeview+Avenue+Kolkata+WB+700029"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 transition hover:text-white"
                >
                  <span>Get Directions</span>
                  <span aria-hidden="true">→</span>
                </a>
                <div className="space-y-1 text-white/80">
                  <p>Call: +91 98765 43210</p>
                  <p>Email: care@drsouravclinic.com</p>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 transition hover:border-white hover:text-white"
                  >
                    <FaFacebookF className="h-4 w-4" />
                  </a>
                  <a
                    href="https://workspace.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Google Workspace"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 transition hover:border-white hover:text-white"
                  >
                    <FaGoogle className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 transition hover:border-white hover:text-white"
                  >
                    <FaLinkedinIn className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 transition hover:border-white hover:text-white"
                  >
                    <FaInstagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
    
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Newsletter</p>
            <div className="mt-3 h-px w-16 bg-white/30" />
            <p className="mt-4 text-sm text-white/70">
              Get clinic updates, pediatric tips, and new service alerts.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-blue)] transition hover:bg-white/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/60 md:flex-row">
          <p>© 2026 Dr. Sourav Banerjee Clinic. All rights reserved.Proudly maintained by   <a
      href="https://www.linkedin.com/in/kausik-saha-fsd"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:underline"
    >
      Kausik
    </a>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

const App = () => (
  <SiteProvider>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </SiteProvider>
)

export default App
