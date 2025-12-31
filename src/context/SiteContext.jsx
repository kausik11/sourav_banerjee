import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const SiteContext = createContext(null)

const emptyData = {
  services: [],
  testimonials: [],
  accolades: [],
  tips: [],
  blogs: [],
  feedbacks: [],
  faqs: [],
  gallery: [],
}

const stripHtml = (value) =>
  value ? value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''

const toTitleCase = (value) => {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const getReadTime = (text) => {
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0
  return `${Math.max(1, Math.round(words / 200))} min read`
}

export const SiteProvider = ({ children }) => {
  const [data, setData] = useState(emptyData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const API_BASE = import.meta.env.VITE_API_BASE || 'https://s-backend-two.vercel.app'

    const api = axios.create({
      baseURL: API_BASE,
    })

    api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    )

    const fetchList = async (path) => {
      try {
        const response = await api.get(path, {
          signal: controller.signal,
        })
        const items = response?.data
        return Array.isArray(items) ? items : null
      } catch (error) {
        if (error.name === 'CanceledError') return null
        return null
      }
    }

    const loadAll = async () => {
      try {
        const [
          servicesData,
          blogsData,
          faqsData,
          galleryData,
          testimonialsData,
          tipsData,
        ] = await Promise.all([
          fetchList('/api/services'),
          fetchList('/api/blogs'),
          fetchList('/api/faqs'),
          fetchList('/api/gallery'),
          fetchList('/api/testimonials'),
          fetchList('/api/tips'),
        ])

        if (!isMounted) return

        const next = {}

        if (servicesData) {
          next.services = servicesData.map((item) => ({
            title: item.title || 'Service',
            description: item.description || '',
            image: item.imageUrl || item.image || '',
          }))
        }

        if (blogsData) {
          next.blogs = blogsData.map((item) => {
            const plain = stripHtml(item.description || '')
            const dateValue = item.createdAt
              ? new Date(item.createdAt).toISOString().slice(0, 10)
              : ''
            return {
              id: item._id,
              title: item.title || '',
              excerpt: plain.length > 140 ? `${plain.slice(0, 140)}...` : plain,
              excerptHtml: item.description || '',
              descriptionHtml: item.description || '',
              tag: item.category || '',
              date: dateValue,
              readTime: getReadTime(plain),
              content: plain ? [plain] : [],
              image: item.imageUrl || '',
              comments: Array.isArray(item.comments) ? item.comments : [],
            }
          })
        }

        if (faqsData) {
          next.faqs = faqsData.map((item) => ({
            question: item.question || '',
            answer: item.answer || '',
          }))
        }

        if (galleryData) {
          next.gallery = galleryData.map((item) => {
            const tags = Array.isArray(item.tags) ? item.tags : []
            const primaryTag = tags[0] || 'Clinic'
            return {
              id: item._id,
              title: item.description || 'Gallery item',
              tag: toTitleCase(primaryTag),
              note: tags.length ? tags.join(', ') : 'Gallery',
              image: item.imageUrl || '',
            }
          })
        }

        if (testimonialsData && testimonialsData.length > 0) {
          next.feedbacks = testimonialsData.map((item) => ({
            name: item.fullName || 'Anonymous',
            rating: item.rating ? String(item.rating) : '5.0',
            platform: 'Google',
            text: item.message || '',
            imageUrl: item.imageUrl || '',
          }))

          next.testimonials = testimonialsData.map((item) => ({
            name: item.fullName || 'Anonymous',
            detail: 'Google review',
            quote: item.message || '',
            imageUrl: item.imageUrl || '',
            rating: item.rating ? String(item.rating) : '5.0',
          }))
        }

        if (tipsData) {
          next.tips = tipsData.map((item) => ({
            id: item._id,
            title: item.title || 'Tip',
            text: item.text || '',
            image: item.imageUrl || '',
          }))
        }

        if (Object.keys(next).length) {
          setData((prev) => ({ ...prev, ...next }))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadAll()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <SiteContext.Provider value={{ ...data, loading }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSite = () => {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSite must be used within SiteProvider')
  }
  return context
}
