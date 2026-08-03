export const projects = [
  {
    slug: 'airline-booking-system-mockup',
    image: '/images/project-airline.jpg',
    alt: 'Airline Booking System Mockup',
    title: 'Airline Booking System Mockup',
    description:
      'Side Project: Conceptual design showcasing an intuitive UI for flight search, seat selection, and booking confirmation, focusing on user experience and workflow efficiency.',
    details:
      'This mockup explores the full airline booking journey—from searching flights to confirming a seat. The focus was clarity of flow, readable hierarchy, and reducing friction at each step of the reservation process.',
    tags: ['UI/UX', 'Figma', 'Prototyping'],
  },
  {
    slug: 'airline-booking-system-prototype',
    image: '/images/project-airline-prototype.jpg',
    alt: 'Airline Booking System Prototype',
    title: 'Airline Booking System Prototype',
    description:
      'Side Project: Interactive prototype simulating end-to-end airline booking functionalities, including flight search, reservation, payment processing, and real-time ticket management.',
    details:
      'Built as an interactive prototype that simulates search, reservation, payment, and ticket management. It demonstrates how screens connect into a coherent booking experience with realistic user flows.',
    tags: ['Prototype', 'Interaction Design', 'UX'],
  },
  {
    slug: 'course-booking-app',
    image: '/images/project-course-booking-app.jpg',
    alt: 'Course booking App',
    title: 'Course booking App',
    description:
      'A MERN-stack course enrollment system featuring user registration, authentication, and profile management. Authenticated users can create, update, archive, and activate courses. The platform also allows users to browse available courses and enroll seamlessly.',
    details:
      'A full-stack MERN application for course enrollment. Users can register, authenticate, manage profiles, and enroll in courses. Admins can create, update, archive, and activate course listings.',
    tags: ['MERN', 'React', 'Node.js', 'MongoDB'],
  },
  {
    slug: 'course-booking-api',
    image: '/images/project-course-booking-api.jpg',
    alt: 'Course Booking API',
    title: 'Course Booking API',
    description:
      'RESTful API for managing course enrollments, featuring user registration, authentication, and retrieval of user details. Supports course creation, updates, archiving, activation, and student enrollment. Publicly documented using Postman',
    details:
      'RESTful backend powering course enrollment workflows. Endpoints cover auth, user details, course CRUD/archive/activate, and enrollment. Documented publicly with Postman for easy testing.',
    tags: ['REST API', 'Express', 'MongoDB', 'Postman'],
  },
  {
    slug: 'ecommerce-app',
    image: '/images/project-ecommerce-app.jpg',
    alt: 'E-commerce App',
    title: 'E-commerce App',
    description:
      'MERN E-Commerce Platform. The platform features dynamic product catalog with filtering and sorting, real-time search, seamless cart updates, secure checkout, and a comprehensive admin dashboard with real-time analytics and user management capabilities.',
    details:
      'Full MERN e-commerce platform with catalog filtering/sorting, search, cart updates, checkout, and an admin dashboard for analytics and user management.',
    tags: ['MERN', 'E-commerce', 'Admin Dashboard'],
  },
  {
    slug: 'ecommerce-api',
    image: '/images/project-ecommerce-api.jpg',
    alt: 'Ecommerce API',
    title: 'Ecommerce API',
    description:
      'Dynamic E-Commerce Workflow Management. The system features dynamic routes for order processing, real-time inventory updates, and secure user authentication. It also supports seamless automated order reporting and comprehensive product management. Documented Backend API published publicly using Postman.',
    details:
      'Backend for e-commerce workflows: order processing, inventory updates, authentication, product management, and automated order reporting. Public Postman docs included.',
    tags: ['REST API', 'Orders', 'Inventory', 'Postman'],
  },
  {
    slug: 'portfolio-website',
    image: '/images/project-short-courses-capstone3.jpg',
    alt: 'Short Course Capstone',
    title: 'This Portfolio Website',
    description:
      'This is my portfolio website. It is a simple website that I created to showcase my projects and skills. It is built with HTML, CSS, Bootstrap, and JavaScript.',
    details:
      'Personal portfolio built to showcase projects and skills. Originally HTML/CSS/Bootstrap/JS, now powered by Vue with multi-page routing and a simple blog.',
    tags: ['Vue', 'Bootstrap', 'Portfolio'],
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null
}
