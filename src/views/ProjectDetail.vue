<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getProjectBySlug } from '../data/projects.js'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const project = computed(() => getProjectBySlug(props.slug))

function goBack() {
  router.push({ name: 'projects' })
}
</script>

<template>
  <section class="row bg-orange-cream g-4 pb-5 justify-content-center p-2 p-md-5 m-3" id="project-detail">
    <div class="col-12">
      <div class="bg-orange-dark text-light mx-auto rounded text-center py-3 section-header">
        <h2 class="mb-0">Project Details</h2>
      </div>
    </div>

    <div v-if="project" class="col-12 col-lg-10">
      <article class="detail-panel">
        <button type="button" class="btn btn-orange-dark mb-4" @click="goBack">
          Back to Projects
        </button>
        <div class="row g-4 align-items-center">
          <div class="col-md-5 text-center">
            <img :src="project.image" class="img-fluid detail-image" :alt="project.alt" />
          </div>
          <div class="col-md-7">
            <h1 class="detail-title">{{ project.title }}</h1>
            <p class="detail-lead">{{ project.description }}</p>
            <p class="detail-body">{{ project.details }}</p>
            <ul class="detail-tags list-unstyled d-flex flex-wrap gap-2 mb-0">
              <li v-for="tag in project.tags" :key="tag" class="detail-tag">{{ tag }}</li>
            </ul>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="col-12 col-lg-8 text-center">
      <article class="detail-panel">
        <h1 class="detail-title">Project not found</h1>
        <p class="detail-body">That project slug does not match any entry in the projects data file.</p>
        <button type="button" class="btn btn-orange-dark" @click="goBack">
          Back to Projects
        </button>
      </article>
    </div>
  </section>
</template>
