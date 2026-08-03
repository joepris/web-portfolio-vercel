export const posts = [
  {
    slug: 'building-a-vue-portfolio',
    title: 'Building a Vue Portfolio',
    date: '2026-07-15',
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      content: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      ],
    tags: ['Vue', 'Portfolio', 'Frontend'],
  },
  {
    slug: 'why-json-file-storage-works',
    title: 'Why JSON-File Storage Works for Small Sites',
    date: '2026-07-22',
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      content: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      ],
      tags: ['Vue', 'Portfolio', 'Frontend'],
  },
  {
    slug: 'dynamic-routes-for-project-details',
    title: 'Dynamic Routes for Project Details',
    date: '2026-08-01',
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    content: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    ],
    tags: ['Vue', 'Portfolio', 'Frontend'],
  },
]

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) ?? null
}
