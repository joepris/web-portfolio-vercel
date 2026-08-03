<script setup>
import Navbar from './components/Navbar.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Tools from './components/Tools.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  <main class="container-fluid mx-auto">
    <About />
    <hr class="border-orange" />
    <Projects />
    <hr class="border-orange" />
    <Tools />
    <hr class="border-orange" />
    <Contact />
  </main>
  <Footer />
</template>
