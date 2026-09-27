export const posts = [
  {
    slug: "what-ive-learned-in-zuitt",
    title: "What I'm Learning in My Full-Stack Bootcamp",
    date: "2026-09-25",
    excerpt: "Here is what i have learned from my time in the Zuitt Training bootcamp.",
    content: [
      "I have finished my full-stack development bootcamp where I'm learned MongoDB, Express.js, React, and Node.js.",
      "After the main course package, I have also expanded my knowledge by continuing my enhancement of skills by enrolling short course packages of Zuitt. I enrolled in the Java and Python Package.",
      "I have now acquired the knowledge to create SQL, MySQL, Java, Springboot, Python, and Django Apps."
    ],
    tags: ["MERN", "SQL", "Java", "Python"],
  },
  {
    slug: "how-this-blog-works",
    title: "How This Blog Works",
    date: "2026-08-20",
    excerpt: "An overview of the technologies and processes behind this blog.",
    content: [
      "This Vue 3 component manages a local blog using localStorage to persist created, edited, and deleted posts across browser refreshes.",
      `It handles state switching between a "Create" and "Edit" form, parsing tag inputs and paragraph line breaks dynamically into arrays.`,
      "The UI leverages Bootstrap layouts and visual cues, like conditional borders, to highlight active edits and toggle form visibility.",
      "It goes back to its original state if you clear browser data, open incognito mode, or use a completely different browser."
    ],
    tags: ["Local Storage", "Vue.js", "CRUD"],
  },
  {
    slug: "what-im-learning-in-my-full-stack-bootcamp",
    title: "What I'm Learning in My Full-Stack Bootcamp",
    date: "2026-08-01",
    excerpt: "Building modern web applications with the MERN stack and expanding my backend development skills.",
    content: [
      "I'm currently attending a full-stack development bootcamp where I'm learning MongoDB, Express.js, React, and Node.js.",
      "The bootcamp has helped me understand RESTful APIs, authentication with JWT, database design using MongoDB, and how frontend and backend applications work together.",
      "Every new project allows me to strengthen my problem-solving skills while becoming more confident as a full-stack developer.",
    ],
    tags: ["MERN", "Bootcamp", "MongoDB", "Node.js"],
  },
  {
    slug: "my-programming-journey",
    title: "My Programming Journey",
    date: "2024-06-20",
    excerpt: "How my interest in software development grew from self-learning to building real-world projects.",
    content: [
      "My interest in programming began after seeing what my siblings, who are software engineers, were building. Their work inspired me to explore software development for myself.",
      "I started learning through online resources such as Pluralsight, YouTube, and official documentation before pursuing formal education in software development.",
      "Over time, I learned C#, ASP.NET MVC, JavaScript, SQL, and modern web technologies by combining classroom projects with personal development work.",
    ],
    tags: ["Journey", "Programming", "Learning"],
  },
  {
    slug: "my-experience-building-a-Unity-Game-App",
    title: "Building a Unity Game App",
    date: "2024-01-05",
    excerpt: "The Unity game app, I made for fun",
    content: [
      "During my days in Canada, I wanted to keep my skills sharpened as much as I can",
      "I decided on making a Unity Game App. It used the Unity technology and codes using the C# language.",
      "The game consisted of systems to make characters, move and interact with each other. It had a deployment system where you can deploy your heroes to a mission and have prompts that you can select what the heroes do. A skill check system is added to give consequences to decided acts. ",
      "It also had a money system where players can make money using business. Players would buy a business that will give passive income to continue growing money.",
    ],
    tags: ["Unity", "C#", "Game"],
  },
  {
    slug: "my-experience-building-a-hospital-scheduling-system",
    title: "Building a Hospital Scheduling System",
    date: "2023-01-05",
    excerpt: "One of the most valuable projects I worked on during my software development studies.",
    content: [
      "During my studies, I participated in developing a hospital scheduling system using ASP.NET MVC for a real client project.",
      "Working with a team taught me how to organize an application using the MVC architecture, collaborate through Git, and communicate effectively while meeting project requirements.",
      "The experience strengthened my understanding of C#, SQL Server, object-oriented programming, and writing maintainable code.",
    ],
    tags: ["ASP.NET MVC", "C#", "Team Project"],
  },
  {
    slug: "the-beginning-of-journey",
    title: "The beginning of my journey",
    date: "2022-01-01",
    excerpt: "How my programming journey officially started",
    content: [
      "My interest in programming began after seeing what my siblings, who are software engineers, were building. Their work inspired me to explore software development for myself.",
      "I started learning through online resources such as Pluralsight, YouTube, and official documentation before pursuing formal education in software development.",
      "I learned about JavaScript, HTML, CSS, React and Typescript.",
      "All of this I learned using online resources and advice from my siblings.",
    ],
    tags: ["Journey", "Programming", "Learning"],
  },
  {
    slug: "the-college-encounter",
    title: "College class programming",
    date: "2016-01-01",
    excerpt: "How I programmed using VB.Net",
    content: [
      "I had a class in my Mining Engineering course where we made codes using VB.Net",
      "We had to make one program for every problem presented.",
      "In the programs we had to solve problems using ifs, loops, arrays and matrixes.",
    ],
    tags: ["Engineering", "Programming", "VB.Net"],
  },
  {
    slug: "the-very-start",
    title: "How I learned about programming",
    date: "2012-01-01",
    excerpt: "How I came to learn about programming",
    content: [
      "I first learned about programming from University of Baguio Science High School, where I attended my secondary level education.",
      "It was first introduced in a Computer class and the basics of logic coding was given as an experience.",
      "We learned about ifs, loops, arrays, and matrixes.",
    ],
    tags: ["Journey", "Programming", "Learning"],
  },
  ];

export function getPostBySlug(slug) {
  let activePosts = posts;
  
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('local_blog_posts');
    if (saved) {
      activePosts = JSON.parse(saved);
    }
  }
  
  return activePosts.find((post) => post.slug === slug) ?? null;
}
