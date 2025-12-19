import React from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'
import SectionHeader from '../components/SectionHeader'

const BlogsPage = () => {
  const { blogs } = useSite()

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <SectionHeader
        eyebrow="Blogs"
        title="Thoughtful reads for modern parents"
        subtitle="Insights on pediatric health, seasonal care, and mindful family routines."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-soft"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-44 w-full object-cover"
            />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]">
                {item.tag}
              </p>
              <h3 className="mt-3 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.excerpt}</p>
              <Link
                to={`/blogs/${item.id}`}
                className="mt-4 inline-flex items-center text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)]"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BlogsPage
