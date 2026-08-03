<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPostBySlug } from '../data/posts.js'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const post = computed(() => getPostBySlug(props.slug))

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function goBack() {
  router.push({ name: 'blog' })
}
</script>

<template>
  <section class="row bg-orange-cream g-4 pb-5 justify-content-center p-2 p-md-5 m-3" id="blog-detail">
    <div class="col-12">
      <div class="bg-orange-dark text-light mx-auto rounded text-center py-3 section-header">
        <h2 class="mb-0">Blog Post</h2>
      </div>
    </div>

    <div v-if="post" class="col-12 col-lg-8">
      <article class="detail-panel">
        <button type="button" class="btn btn-orange-dark mb-4" @click="goBack">
          Back to Blog
        </button>
        <p class="blog-date mb-2">{{ formatDate(post.date) }}</p>
        <h1 class="detail-title">{{ post.title }}</h1>
        <ul class="detail-tags list-unstyled d-flex flex-wrap gap-2 mb-4">
          <li v-for="tag in post.tags" :key="tag" class="detail-tag">{{ tag }}</li>
        </ul>
        <p v-for="(paragraph, index) in post.content" :key="index" class="detail-body">
          {{ paragraph }}
        </p>
      </article>
    </div>

    <div v-else class="col-12 col-lg-8 text-center">
      <article class="detail-panel">
        <h1 class="detail-title">Post not found</h1>
        <p class="detail-body">That post slug does not match any entry in the posts data file.</p>
        <button type="button" class="btn btn-orange-dark" @click="goBack">
          Back to Blog
        </button>
      </article>
    </div>
  </section>
</template>
