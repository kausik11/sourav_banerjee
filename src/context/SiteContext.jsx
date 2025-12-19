import React, { createContext, useContext } from 'react'

const SiteContext = createContext(null)

const data = {
  services: [
    {
      title: 'Newborn Assessments',
      description:
        'Complete physical exams, jaundice checks, and early developmental guidance.',
      image:
        'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Immunization Planning',
      description:
        'Detailed vaccine schedules with post-visit care instructions.',
      image:
        'https://images.unsplash.com/photo-1580281658626-3619a41ab8a3?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Nutrition and Growth',
      description:
        'Personalized meal guidance, growth charts, and supplement advice.',
      image:
        'https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Allergy and Asthma Care',
      description:
        'Diagnosis, action plans, and family education for breathing comfort.',
      image:
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Adolescent Wellness',
      description:
        'Physical, emotional, and lifestyle support for teens and parents.',
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Behavioral Guidance',
      description:
        'Sleep, tantrum, and attention support with practical routines.',
      image:
        'https://images.unsplash.com/photo-1503455637927-730bce8583c0?auto=format&fit=crop&w=800&q=80',
    },
  ],
  testimonials: [
    {
      name: 'Ananya Rao',
      detail: 'Mother of 2',
      quote:
        'Dr. Jhon explains everything so patiently. My daughter is no longer anxious about clinic visits.',
    },
    {
      name: 'Nikhil Mehta',
      detail: 'First-time parent',
      quote:
        'The nutrition plan helped our baby gain healthy weight in just a few months.',
    },
    {
      name: 'Priya Varma',
      detail: 'Parent of a toddler',
      quote:
        'We always feel heard here. The clinic environment is calm and welcoming.',
    },
  ],
  accolades: [
    {
      year: '2024',
      title: 'Best Pediatric Practice Award',
      description: 'Recognized for outstanding patient experience and care.',
    },
    {
      year: '2023',
      title: 'Community Wellness Partner',
      description: 'Honored for school health camps and parent workshops.',
    },
    {
      year: '2022',
      title: 'Top Doctor - City Health Forum',
      description: 'Selected by peer review and parent feedback surveys.',
    },
  ],
  tips: [
    {
      title: 'Building a bedtime routine',
      text: 'A consistent wind-down routine supports healthy sleep and calm mornings.',
      image:
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Smart snacking ideas',
      text: 'Balance protein, fiber, and hydration to keep energy levels steady.',
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Managing screen time',
      text: 'Create tech boundaries and replace screen time with play and reading.',
      image:
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    },
  ],
  blogs: [
    {
      id: 'seasonal-flu-prep',
      title: 'Seasonal flu prep checklist',
      excerpt:
        'Learn how to prepare your family for flu season with smart habits.',
      tag: 'Wellness',
      date: '2025-02-10',
      readTime: '4 min read',
      content: [
        'Flu season can be tough on little ones, but a calm, prepared approach makes all the difference.',
        'Start with hand hygiene routines, especially after school or public outings. Encourage gentle reminders rather than strict rules.',
        'Build a balanced plate with immunity-supporting foods like citrus, yogurt, lentils, and leafy greens.',
        'Sleep routines matter most during seasonal changes. Aim for consistent bedtimes and a screen-free wind-down hour.',
        'Talk to Dr. Jhon about vaccinations and any pre-existing conditions that may need extra monitoring.',
      ],
      image:
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'newborn-visit-guide',
      title: 'What to expect at a newborn visit',
      excerpt:
        'A quick guide to the first pediatric appointment and what parents should bring.',
      tag: 'Newborn Care',
      date: '2025-01-28',
      readTime: '5 min read',
      content: [
        'The first pediatric visit focuses on growth, feeding, and answering your biggest questions.',
        'Bring your baby’s birth records, any discharge notes, and a list of feeding patterns.',
        'The visit covers weight checks, skin tone, reflexes, and a gentle physical exam.',
        'We also address sleep patterns, diaper output, and common newborn concerns.',
        'No question is too small—this is a safe space to learn what is normal and what needs attention.',
      ],
      image:
        'https://images.unsplash.com/photo-1486428263684-28ec9e4f2584?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'school-nutrition',
      title: 'Nutrition through the school years',
      excerpt:
        'Simple ways to keep lunchboxes balanced and fun for kids.',
      tag: 'Nutrition',
      date: '2024-12-15',
      readTime: '6 min read',
      content: [
        'School-age kids need steady energy throughout the day, especially for focus and play.',
        'Pair protein with fiber: paneer rolls, hummus with veggies, or boiled eggs with fruit.',
        'Hydration matters just as much. Encourage water breaks and limit sugary drinks.',
        'Let children help plan lunchbox ideas so they feel ownership over healthy choices.',
        'If picky eating is a challenge, we can build a strategy together during a visit.',
      ],
      image:
        'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=900&q=80',
    },
  ],
  feedbacks: [
    {
      name: 'Isha K.',
      rating: '5.0',
      platform: 'Google',
      text: 'Calm, informative, and supportive. We feel taken care of.',
    },
    {
      name: 'Rahul D.',
      rating: '4.9',
      platform: 'Google',
      text: 'The clinic is clean and kid friendly. Great follow-ups.',
    },
    {
      name: 'Sara M.',
      rating: '5.0',
      platform: 'Google',
      text: 'Appointments are on time and advice is easy to follow.',
    },
  ],
  faqs: [
    {
      question: 'How often should growth be monitored?',
      answer:
        'Most children benefit from growth checks every 3 to 6 months depending on age.',
    },
    {
      question: 'Do you offer vaccination reminders?',
      answer:
        'Yes, parents receive reminder texts and a printed schedule after visits.',
    },
    {
      question: 'What should I bring to the first visit?',
      answer:
        'Bring previous medical records, vaccination card, and any specific concerns.',
    },
    {
      question: 'How do you handle fever emergencies?',
      answer:
        'We provide urgent slots each day and phone guidance when needed.',
    },
  ],
}

export const SiteProvider = ({ children }) => (
  <SiteContext.Provider value={data}>{children}</SiteContext.Provider>
)

export const useSite = () => {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSite must be used within SiteProvider')
  }
  return context
}
