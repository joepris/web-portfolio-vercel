<script setup>
import { RouterLink } from 'vue-router'
import { posts } from '../data/posts.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <section class="row bg-orange-cream g-4 pb-5 justify-content-center p-2 p-md-5 m-3" id="blog">
    <div class="col-12">
      <div class="bg-orange-dark text-light mx-auto rounded text-center py-3 section-header">
        <h2 class="mb-0">Blog</h2>
      </div>
    </div>
    <div class="col-12 col-lg-10">
      <div class="row g-4">
        <div v-for="post in posts" :key="post.slug" class="col-md-6 col-lg-4">
          <article class="blog-card h-100">
            <p class="blog-date mb-2">{{ formatDate(post.date) }}</p>
            <h3 class="blog-card-title h5">{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <ul class="detail-tags list-unstyled d-flex flex-wrap gap-2 mb-3">
              <li v-for="tag in post.tags" :key="tag" class="detail-tag">{{ tag }}</li>
            </ul>
            <RouterLink class="btn btn-orange" :to="{ name: 'blog-detail', params: { slug: post.slug } }">
              Read more
            </RouterLink>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
