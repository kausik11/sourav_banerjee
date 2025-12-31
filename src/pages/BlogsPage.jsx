import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'

const BlogsPage = () => {
  const { blogs } = useSite()
  console.log("blogs", blogs);
  const [page, setPage] = useState(1)
  const pageSize = 6

  const totalPages = Math.max(1, Math.ceil(blogs.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pagedBlogs = useMemo(
    () => blogs.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [blogs, currentPage]
  )

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <SectionHeader
        eyebrow="Blogs"
        title="Thoughtful reads for modern parents"
        subtitle="Insights on pediatric health, seasonal care, and mindful family routines."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pagedBlogs.map((item) => (
          <article
            key={item.id}
            className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-soft"
          >
            <Link to={`/blogs/${item.id}`} className="block">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 w-full object-cover"
                />
                <p className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/80 bg-[var(--brand-accent)] px-3 py-1 text-xs uppercase tracking-[0.1em] text-white shadow-sm">
                  {item.tag}
                </p>
              </div>
            </Link>
            <div className="p-6 md:p-8">
              <Link
                to={`/blogs/${item.id}`}
              >
                  <h3 className="mt-3 font-display text-xl text-[var(--brand-blue)]">{item.title}</h3>
              </Link>
            
              <p className="mt-2 text-sm text-[var(--muted)]">{item.excerpt}</p>
              <Link
                to={`/blogs/${item.id}`}
                className="mt-4 inline-flex items-center text-sm tracking-[0.1em] text-[var(--brand-accent)]"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
      {blogs.length > pageSize && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 text-sm shadow-soft">
          <p className="text-slate-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-[var(--brand-accent)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={`page-${index + 1}`}
                type="button"
                onClick={() => setPage(index + 1)}
                className={`h-9 w-9 rounded-full border text-xs font-semibold transition ${
                  currentPage === index + 1
                    ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white'
                    : 'border-[var(--line)] text-slate-600 hover:border-[var(--brand-accent)]'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-[var(--brand-accent)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default BlogsPage
