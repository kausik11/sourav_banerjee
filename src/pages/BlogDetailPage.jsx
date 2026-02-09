import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'
import { API_BASE } from '../utils/api'

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('favoriteBlogs') || '[]')
  } catch {
    return []
  }
}

const setFavorites = (ids) => {
  localStorage.setItem('favoriteBlogs', JSON.stringify(ids))
}

const BlogDetailPage = () => {
  const { id } = useParams()
  const { blogs } = useSite()
  const blog = blogs.find((item) => item.id === id)
  const [favorites, setFavoriteState] = useState([])
  const [comments, setCommentState] = useState([])
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
    setFavoriteState(getFavorites())
  }, [])

  useEffect(() => {
    if (blog) {
      setCommentState(blog.comments || [])
    }
  }, [blog])

  const isFavorite = blog ? favorites.includes(blog.id) : false

  const relatedBlogs = useMemo(() => {
    if (!blog) return []
    const sameTag = blogs.filter(
      (item) => item.tag === blog.tag && item.id !== blog.id,
    )
    if (sameTag.length > 0) return sameTag.slice(0, 2)
    return blogs.filter((item) => item.id !== blog.id).slice(0, 2)
  }, [blog, blogs])

  const recentBlogs = useMemo(() => {
    return [...blogs]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3)
  }, [blogs])

  if (!blog) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Blog"
          title="Blog not found"
          subtitle="The blog you are looking for does not exist."
        />
        <Link
          to="/blogs"
          className="inline-flex items-center text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]"
        >
          Back to blogs
        </Link>
      </section>
    )
  }

  const handleFavorite = () => {
    const next = isFavorite
      ? favorites.filter((favId) => favId !== blog.id)
      : [...favorites, blog.id]
    setFavoriteState(next)
    setFavorites(next)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !message.trim() || !phoneNumber.trim()) return
    if (!blog?.id) return

    try {
      const response = await fetch(`${API_BASE}/api/blogs/${blog.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: message.trim(),
          name: name.trim(),
          phoneNumber: phoneNumber.trim(),
        }),
      })

      if (!response.ok) {
        return
      }

      const updated = await response.json()
      setCommentState(updated.comments || [])
      setName('')
      setPhoneNumber('')
      setMessage('')
    } catch {
      // Keep form data on error.
    }
  }

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pb-4 pt-16 md:px-8">
        <Link
          to="/blogs"
          className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]"
        >
          Back to blogs
        </Link>
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-flex items-center rounded-full border border-white/80 bg-[var(--brand-accent)] px-3 py-1 text-xs uppercase tracking-[0.1em] text-white shadow-sm">
              {blog.tag}
            </p>
            <h1 className="mt-4 font-display text-3xl text-[var(--brand-blue)] md:text-4xl">
              {blog.title}
            </h1>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {blog.date} | {blog.readTime}
            </p>
            <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
              {blog.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleFavorite}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                  isFavorite
                    ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white'
                    : 'border-[var(--brand-accent)] text-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white'
                }`}
              >
                <span className="h-4 w-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill={isFavorite ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 21s-6.7-4.3-9.2-8C1 9.5 2.5 6.5 5.8 6.2 8 6 9.4 7.5 12 10c2.6-2.5 4-4 6.2-3.8 3.3.3 4.8 3.3 3 6.8C18.7 16.7 12 21 12 21z" />
                  </svg>
                </span>
                {isFavorite ? 'Saved' : 'Favorite'}
              </button>
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                {comments.length} comments
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft">
            <img
              src={blog.image}
              alt={blog.title}
              className="h-56 w-full rounded-xl object-cover"
            />
            <p className="mt-6 text-sm text-[var(--muted)] leading-relaxed">
              Pediatric guidance curated by Dr. Sourav Banerjee. Share this with caregivers
              who need clarity and reassurance.
            </p>
            <div className="mt-6 rounded-xl bg-[#fdf7f1] p-4 text-sm text-[var(--muted)]">
              <p className="font-display text-lg text-[var(--brand-blue)]">
                Quick Clinic Tip
              </p>
              <p className="mt-2">
                Keep a digital note of symptoms to discuss during visits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-soft">
            <h2 className="font-display text-2xl text-[var(--brand-blue)]">
              Article details
            </h2>
            <div className="mt-4 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
              {blog.descriptionHtml ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.descriptionHtml,
                  }}
                />
              ) : (
                blog.content.map((paragraph, index) => (
                  <p key={`${blog.id}-p-${index}`}>{paragraph}</p>
                ))
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[#fdf7f1] p-6 shadow-soft">
              <h3 className="font-display text-xl text-[var(--brand-blue)]">
                Most recent blogs
              </h3>
              <div className="mt-4 space-y-4">
                {recentBlogs.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blogs/${item.id}`}
                    className="flex items-start gap-4 rounded-xl border border-transparent p-2 transition hover:border-[var(--line)]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-[var(--brand-accent)]">
                        {item.tag}
                      </p>
                      <p className="font-display text-base text-[var(--brand-blue)]">{item.title}</p>
                      <p className="text-xs text-[var(--muted)]">{item.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-soft">
              <h3 className="font-display text-xl text-[var(--brand-blue)]">
                Related blogs
              </h3>
              <div className="mt-4 space-y-4">
                {relatedBlogs.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blogs/${item.id}`}
                    className="flex items-start gap-4 rounded-xl border border-transparent p-2 transition hover:border-[var(--line)]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-[var(--brand-accent)]">
                        {item.tag}
                      </p>
                      <p className="font-display text-base text-[var(--brand-blue)]">{item.title}</p>
                      <p className="text-xs text-[var(--muted)]">
                        {item.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
          <SectionHeader
            eyebrow="Comments"
            title="Share your thoughts"
            subtitle="Comments are saved on this device only."
          />
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[var(--line)] bg-white/90 p-6 shadow-soft md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--brand-black)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--brand-accent)]"
                placeholder="Your name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--brand-black)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--brand-accent)]"
                placeholder="Phone number"
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <textarea
              className="mt-4 h-32 w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--brand-black)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--brand-accent)]"
              placeholder="Write your comment"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              type="submit"
              className="mt-4 inline-flex rounded-full bg-[var(--brand-accent)] px-6 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-[#c76d5f]"
            >
              Post Comment
            </button>
          </form>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {comments.length === 0 && (
              <div className="rounded-2xl border border-[var(--line)] bg-white p-6 text-sm text-[var(--muted)] shadow-soft">
                No comments yet. Be the first to share a thought.
              </div>
            )}
            {comments.map((item, index) => (
              <div
                key={item._id || item.id || `${item.name}-${index}`}
                className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-soft"
              >
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--brand-accent)]">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : item.date
                      ? new Date(item.date).toLocaleDateString()
                      : 'Just now'}
                </p>
                <p className="mt-2 font-display text-lg text-[var(--brand-blue)]">{item.name}</p>
                {/* {item.phoneNumber && (
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
                    {item.phoneNumber}
                  </p>
                )} */}
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {item.comment || item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogDetailPage
