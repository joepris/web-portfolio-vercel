<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { posts as defaultPosts } from '../data/posts.js'

function getTodayDateString() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const posts = ref([])
const isEditing = ref(false)
const targetEditSlug = ref(null)

const formPost = ref({
  title: '',
  excerpt: '',
  date: getTodayDateString(),
  tags: '',
  contentRaw: ''
})

onMounted(() => {
  const savedPosts = localStorage.getItem('local_blog_posts')
  if (savedPosts) {
    posts.value = JSON.parse(savedPosts)
  } else {
    posts.value = defaultPosts
    localStorage.setItem('local_blog_posts', JSON.stringify(defaultPosts))
  }
})

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function saveToStorage() {
  localStorage.setItem('local_blog_posts', JSON.stringify(posts.value))
}

function startEdit(post) {
  isEditing.value = true
  targetEditSlug.value = post.slug

  formPost.value = {
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    tags: post.tags ? post.tags.join(', ') : '',
    contentRaw: post.content ? post.content.join('\n\n') : ''
  }

  const formElement = document.getElementById('blogPostFormContainer')
  if (formElement && !formElement.classList.contains('show')) {
    formElement.classList.add('show')
  }

  formElement?.scrollIntoView({ behavior: 'smooth' })
}

function resetForm() {
  isEditing.value = false
  targetEditSlug.value = null
  formPost.value = {
    title: '',
    excerpt: '',
    date: getTodayDateString(),
    tags: '',
    contentRaw: ''
  }

  const formElement = document.getElementById('blogPostFormContainer')
  formElement?.classList.remove('show')
}

function handleSubmit() {
  const tagsArray = formPost.value.tags.split(',').map(t => t.trim()).filter(t => t !== '')
  const contentArray = formPost.value.contentRaw.split('\n').map(p => p.trim()).filter(p => p !== '')

  if (isEditing.value) {
    const index = posts.value.findIndex(p => p.slug === targetEditSlug.value)
    if (index !== -1) {
      posts.value[index] = {
        ...posts.value[index], // Retain unchanged attributes like original slug
        title: formPost.value.title,
        date: formPost.value.date,
        excerpt: formPost.value.excerpt,
        tags: tagsArray,
        content: contentArray
      }
    }
  } else {
    const generatedSlug = formPost.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const freshPost = {
      slug: generatedSlug || `post-${Date.now()}`,
      title: formPost.value.title,
      date: formPost.value.date || getTodayDateString(),
      excerpt: formPost.value.excerpt,
      content: contentArray,
      tags: tagsArray
    }
    posts.value.unshift(freshPost)
  }

  saveToStorage()
  resetForm()
}

function deletePost(slugToDelete) {
  if (confirm('Delete this article?')) {
    posts.value = posts.value.filter(p => p.slug !== slugToDelete)
    saveToStorage()
    if (targetEditSlug.value === slugToDelete) {
      resetForm()
    }
  }
}
</script>

<template>
  <section class="row bg-orange-cream g-4 pb-5 justify-content-center p-2 p-md-5 m-3" id="blog">
    <div class="col-12 text-center">
      <div class="bg-orange-dark text-light mx-auto rounded text-center py-3 section-header mb-4">
        <h2 class="mb-0">Blog</h2>
      </div>

      <button class="btn btn-outline-dark mb-2" type="button" data-bs-toggle="collapse"
        data-bs-target="#blogPostFormContainer" @click="isEditing ? resetForm() : null">
        {{ isEditing ? '❌ Cancel Editing' : '➕ Create New Post' }}
      </button>
    </div>

    <div class="col-12 col-lg-10 collapse mb-4" id="blogPostFormContainer">
      <div class="card p-4 shadow-sm border-2" :class="isEditing ? 'border-warning' : 'border-light'">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="mb-0 text-orange-dark">
            {{ isEditing ? '✏️ Edit Blog Post' : '✨ New Blog Post' }}
          </h4>
          <span v-if="isEditing" class="badge bg-warning text-dark animate-pulse">Unsaved Modifications</span>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label fw-bold">Title</label>
            <input v-model="formPost.title" type="text" class="form-control" required>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-bold">Date</label>
              <input v-model="formPost.date" type="date" class="form-control" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-bold">Tags (Comma-separated)</label>
              <input v-model="formPost.tags" type="text" class="form-control" placeholder="MERN, Bootcamp, CSS">
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Card Excerpt</label>
            <input v-model="formPost.excerpt" type="text" class="form-control" required
              placeholder="Short brief snippet">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Full Content (Press Enter for new paragraphs)</label>
            <textarea v-model="formPost.contentRaw" class="form-control" rows="6" required
              placeholder="Type text blocks here..."></textarea>
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn" :class="isEditing ? 'btn-warning' : 'btn-orange'">
              {{ isEditing ? 'Save Changes' : 'Publish Post' }}
            </button>
            <button v-if="isEditing" @click="resetForm" type="button" class="btn btn-secondary">
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="col-12 col-lg-10">
      <div class="row g-4">
        <div v-for="post in posts" :key="post.slug" class="col-md-6 col-lg-4">
          <article class="blog-card h-100 position-relative"
            :class="{ 'border border-warning shadow-sm': targetEditSlug === post.slug }">
            <div class="position-absolute top-0 end-0 m-2 d-flex gap-1 align-items-center">
              <button @click="startEdit(post)" class="btn btn-sm btn-link text-primary text-decoration-none px-1"
                title="Edit Post">
                ✏️
              </button>
              <button @click="deletePost(post.slug)" class="btn btn-sm btn-link text-danger text-decoration-none px-1"
                title="Delete Post">
                🗑️
              </button>
            </div>

            <p class="blog-date mb-2">{{ formatDate(post.date) }}</p>
            <h3 class="blog-card-title h5 text-truncate pe-5">{{ post.title }}</h3>
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

<style scoped>
.blog-card {
  padding-top: 2.2rem !important;
}
</style>
