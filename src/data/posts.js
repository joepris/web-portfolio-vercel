export const posts = [
  {
    slug: "my-programming-journey",
    title: "My Programming Journey",
    date: "2026-06-20",
    excerpt:
      "How my interest in software development grew from self-learning to building real-world projects.",
    content: [
      "My interest in programming began after seeing what my siblings, who are software engineers, were building. Their work inspired me to explore software development for myself.",
      "I started learning through online resources such as Pluralsight, YouTube, and official documentation before pursuing formal education in software development.",
      "Over time, I learned C#, ASP.NET MVC, JavaScript, SQL, and modern web technologies by combining classroom projects with personal development work.",
    ],
    tags: ["Journey", "Programming", "Learning"],
  },
  {
    slug: "my-experience-building-a-hospital-scheduling-system",
    title: "Building a Hospital Scheduling System",
    date: "2026-07-08",
    excerpt:
      "One of the most valuable projects I worked on during my software development studies.",
    content: [
      "During my studies, I participated in developing a hospital scheduling system using ASP.NET MVC for a real client project.",
      "Working with a team taught me how to organize an application using the MVC architecture, collaborate through Git, and communicate effectively while meeting project requirements.",
      "The experience strengthened my understanding of C#, SQL Server, object-oriented programming, and writing maintainable code.",
    ],
    tags: ["ASP.NET MVC", "C#", "Team Project"],
  },
  {
    slug: "what-im-learning-in-my-full-stack-bootcamp",
    title: "What I'm Learning in My Full-Stack Bootcamp",
    date: "2026-08-01",
    excerpt:
      "Building modern web applications with the MERN stack and expanding my backend development skills.",
    content: [
      "I'm currently attending a full-stack development bootcamp where I'm learning MongoDB, Express.js, React, and Node.js.",
      "The bootcamp has helped me understand RESTful APIs, authentication with JWT, database design using MongoDB, and how frontend and backend applications work together.",
      "Every new project allows me to strengthen my problem-solving skills while becoming more confident as a full-stack developer.",
    ],
    tags: ["MERN", "Bootcamp", "MongoDB", "Node.js"],
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) ?? null;
}