<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="full-page-view">
    <Navbar />
    <main class="container-fluid mx-auto full-page-main d-flex align-items-center justify-content-center">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
