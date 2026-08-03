<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)

const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  date: new Date().toISOString().split('T')[0],
  tags: ''
})

async function handleSubmit() {
  isSubmitting.value = true
  
  // Convert comma-separated string into an array of strings
  const tagArray = form.value.tags.split(',').map(t => t.trim()).filter(Boolean)

  try {
    // Contentful Management API requires a distinct Content-Type and localized fields ('en-US')
    const response = await fetch('https://contentful.com', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_MANAGEMENT_TOKEN', // Secure write token
        'X-Contentful-Content-Type': 'blogPost',
        'Content-Type': 'application/vnd.contentful.management.v1+json'
      },
      body: JSON.stringify({
        fields: {
          title: { 'en-US': form.value.title },
          slug: { 'en-US': form.value.slug.toLowerCase().replace(/ /g, '-') },
          excerpt: { 'en-US': form.value.excerpt },
          date: { 'en-US': form.value.date },
          tags: { 'en-US': tagArray }
        }
      })
    })

    if (!response.ok) throw new Error('Failed to create post')
    
    const data = await response.json()

    // Note: Contentful entries are created as 'Draft'. 
    // To publish instantly, you must call a PUT request to the /published endpoint:
    await fetch(`https://contentful.com/${data.sys.id}/published`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer YOUR_MANAGEMENT_TOKEN',
        'X-Contentful-Version': data.sys.version
      }
    })

    router.push({ name: 'blog' }) // Redirect back to list
  } catch (error) {
    console.error('Error adding post:', error)
    alert('Could not save post. Check configuration.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="row bg-orange-cream g-4 pb-5 justify-content-center p-2 p-md-5 m-3">
    <div class="col-12 col-md-8 col-lg-6">
      <div class="bg-orange-dark text-light rounded text-center py-3 mb-4">
        <h2 class="mb-0">Add New Blog Post</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white p-4 rounded shadow-sm">
        <div class="mb-3">
          <label class="form-label fw-bold">Title</label>
          <input v-model="form.title" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Slug (URL path)</label>
          <input v-model="form.slug" type="text" class="form-control" placeholder="my-first-post" required />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Excerpt</label>
          <textarea v-model="form.excerpt" class="form-control" rows="3" required></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Publish Date</label>
          <input v-model="form.date" type="date" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Tags (Comma separated)</label>
          <input v-model="form.tags" type="text" class="form-control" placeholder="vue, cms, frontend" />
        </div>

        <button type="submit" class="btn btn-orange w-100" :disabled="isSubmitting">
          {{ isSubmitting ? 'Publishing...' : 'Publish Post' }}
        </button>
      </form>
    </div>
  </section>
</template>
