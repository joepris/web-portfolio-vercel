<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isSubmitting = ref(false)
const entryId = ref('')      // Required by CMS to update the precise entry
const currentVersion = ref(1) // Contentful requires version tracking for updates

const form = ref({
    title: '',
    slug: '',
    excerpt: '',
    date: '',
    tags: ''
})

onMounted(async () => {
    try {
        // 1. Fetch current content using the route slug parameter
        const slug = route.params.slug
        const res = await fetch(`https://contentful.com{slug}&access_token=YOUR_DELIVERY_TOKEN`)
        const data = await res.json()

        if (data.items.length === 0) throw new Error('Post not found')

        const post = data.items[0]
        entryId.value = post.sys.id
        currentVersion.value = post.sys.revision // Track current structural version

        // 2. Pre-fill the form with existing database records
        form.value = {
            title: post.fields.title,
            slug: post.fields.slug,
            excerpt: post.fields.excerpt,
            date: post.fields.date,
            tags: post.fields.tags ? post.fields.tags.join(', ') : ''
        }
    } catch (error) {
        console.error('Error pre-filling form:', error)
    } finally {
        isLoading.value = false
    }
})

async function handleUpdate() {
    isSubmitting.value = true
    const tagArray = form.value.tags.split(',').map(t => t.trim()).filter(Boolean)

    try {
        // 3. Put edited JSON data back into the explicit asset identifier
        const response = await fetch(`https://contentful.com{entryId.value}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer YOUR_MANAGEMENT_TOKEN',
                'Content-Type': 'application/vnd.contentful.management.v1+json',
                'X-Contentful-Version': currentVersion.value // Pass revision number to avoid conflicts
            },
            body: JSON.stringify({
                fields: {
                    title: { 'en-US': form.value.title },
                    slug: { 'en-US': form.value.slug },
                    excerpt: { 'en-US': form.value.excerpt },
                    date: { 'en-US': form.value.date },
                    tags: { 'en-US': tagArray }
                }
            })
        })

        if (!response.ok) throw new Error('Failed to update entry')
        const updatedData = await response.json()

        // 4. Re-publish changes live
        await fetch(`https://contentful.com{entryId.value}/published`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer YOUR_MANAGEMENT_TOKEN',
                'X-Contentful-Version': updatedData.sys.version
            }
        })

        router.push({ name: 'blog' })
    } catch (error) {
        console.error('Update operation failed:', error)
        alert('Failed to save modifications.')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section class="row bg-orange-cream g-4 pb-5 justify-content-center p-2 p-md-5 m-3">
        <div class="col-12 col-md-8 col-lg-6">
            <div class="bg-orange-dark text-light rounded text-center py-3 mb-4">
                <h2 class="mb-0">Edit Blog Post</h2>
            </div>

            <div v-if="isLoading" class="text-center py-4">
                <p>Loading post data...</p>
            </div>

            <form v-else @submit.prevent="handleUpdate" class="bg-white p-4 rounded shadow-sm">
                <div class="mb-3">
                    <label class="form-label fw-bold">Title</label>
                    <input v-model="form.title" type="text" class="form-control" required />
                </div>

                <div class="mb-3">
                    <label class="form-label fw-bold">Slug</label>
                    <input v-model="form.slug" type="text" class="form-control" required />
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
                    <label class="form-label fw-bold">Tags</label>
                    <input v-model="form.tags" type="text" class="form-control" />
                </div>

                <button type="submit" class="btn btn-orange w-100" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Saving Changes...' : 'Save and Publish' }}
                </button>
            </form>
        </div>
    </section>
</template>
