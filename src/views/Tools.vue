<script setup>
import { tools } from '../data/tools.js'
const skillGroups = tools
</script>

<template>
  <section class="bg-orange-cream p-2 p-md-5 m-3" id="tools">
    <div class="bg-orange-dark text-light mx-auto rounded text-center py-3 section-header">
      <h2 class="mb-0">Technical Skills</h2>
    </div>

    <div v-for="group in skillGroups" :key="group.title" class="skill-group">
      <h3>{{ group.title }}</h3>
      <div class="skills-grid">
        <div v-for="icon in group.icons" :key="icon.alt" class="skill-card">
          <img :src="icon.src" :alt="icon.alt" />
          <span>{{ icon.alt }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
