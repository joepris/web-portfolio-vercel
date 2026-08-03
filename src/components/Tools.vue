<script setup>
import { tools } from '../data/tools.js'
const toolGroups = tools;
</script>

<template>
  <section
    class="row bg-orange-cream justify-content-center align-items-center gap-3 p-2 p-md-5 m-3"
    id="tools"
  >
    <div class="col-12">
      <div class="bg-orange-dark text-light mx-auto rounded text-center py-3 section-header">
        <h2 class="mb-0">Technologies I used at Zuitt Coding Bootcamp</h2>
      </div>
    </div>
    <div v-for="group in toolGroups" :key="group.title" class="col-md-3 p-3 text-center">
      <h3>{{ group.title }}</h3>
      <div class="row mt-5 justify-content-center align-items-center gap-3">
        <div
          v-for="icon in group.icons"
          :key="icon.alt"
          class="col-5 bg-orange-dark rounded-circle tool-icon"
        >
          <img class="img-fluid" :src="icon.src" :alt="icon.alt" />
        </div>
      </div>
    </div>
  </section>
</template>
