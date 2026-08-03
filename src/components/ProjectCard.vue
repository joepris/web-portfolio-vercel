<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="card h-100 project-card">
    <img :src="project.image" class="card-img-top img-fluid" :alt="project.alt" />
    <div class="card-body d-flex flex-column">
      <h3 class="card-title h5">{{ project.title }}</h3>
      <p class="card-text flex-grow-1">{{ project.description }}</p>
      <RouterLink
        class="btn btn-orange mt-2 align-self-start"
        :to="{ name: 'project-detail', params: { slug: project.slug } }"
      >
        View details
      </RouterLink>
    </div>
  </div>
</template>
