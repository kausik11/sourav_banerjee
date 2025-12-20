import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { SiteProvider } from './context/SiteContext'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import LocationsPage from './pages/LocationsPage'
import TipsPage from './pages/TipsPage'
import FaqPage from './pages/FaqPage'
import BlogsPage from './pages/BlogsPage'
import BlogDetailPage from './pages/BlogDetailPage'
import Navbar from './components/Navbar'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Locations', to: '/locations' },
  { label: 'Tips & Advice', to: '/tips' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'FAQs', to: '/faqs' },
]

const AppLayout = () => (
  <div className="min-h-screen">
    <Navbar navItems={navItems} />

    <main className="relative overflow-hidden">
      {/* <div className="particle particle-1" />
      <div className="particle particle-2" />
      <div className="particle particle-3" /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/tips" element={<TipsPage />} />
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
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=120&h=120&q=80"
                alt="Dr. Jhon"
                className="h-11 w-11 rounded-full border border-white/30 object-cover"
              />
              <p className="text-lg font-semibold text-white">Dr. Jhon</p>
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
                  About Dr. Jhon
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
                  Insurance Information
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
            <p className="text-sm font-semibold text-white">Our Services</p>
            <div className="mt-3 h-px w-16 bg-white/30" />
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Newborn Care</li>
              <li>Immunization Planning</li>
              <li>Nutrition Guidance</li>
              <li>Allergy Management</li>
              <li>Adolescent Wellness</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Office Hours</p>
            <div className="mt-3 h-px w-16 bg-white/30" />
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div className="flex items-start justify-between gap-4">
                <span>Monday - Saturday</span>
                <span className="text-white">8:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span>Sunday</span>
                <span className="text-white">Closed</span>
              </div>
            </div>
            <NavLink
              to="/locations"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-[#1d4ed8]"
            >
              Book Appointment
            </NavLink>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-xs text-white/60 md:flex-row">
          <p>© 2025 Dr. Jhon Pediatrics Clinic. All rights reserved.</p>
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

const App = () => (
  <SiteProvider>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </SiteProvider>
)

export default App
