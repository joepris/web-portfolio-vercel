<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { projects } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.vue'

const carouselRef = ref(null)
const currentIndex = ref(0)
const slideWidthPx = ref(0)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

function getSlidesPerView() {
    if (windowWidth.value >= 992) return 3
    if (windowWidth.value >= 768) return 2
    return 1
}

const slidesPerView = computed(() => getSlidesPerView())
const maxIndex = computed(() => Math.max(0, projects.length - slidesPerView.value))
const pageCount = computed(() => maxIndex.value + 1)
const trackStyle = computed(() => ({
    transform: `translateX(-${currentIndex.value * slideWidthPx.value}px)`,
}))
const slideStyle = computed(() => ({
    flexBasis: `${slideWidthPx.value}px`,
    maxWidth: `${slideWidthPx.value}px`,
}))

function updateCarousel() {
    if (!carouselRef.value) return
    windowWidth.value = window.innerWidth
    if (currentIndex.value > maxIndex.value) {
        currentIndex.value = maxIndex.value
    }
    slideWidthPx.value = carouselRef.value.clientWidth / slidesPerView.value
}

function goTo(index) {
    currentIndex.value = Math.min(Math.max(index, 0), maxIndex.value)
}

function prev() {
    if (currentIndex.value > 0) currentIndex.value--
}

function next() {
    if (currentIndex.value < maxIndex.value) currentIndex.value++
}

let resizeTimer
function onResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(updateCarousel, 150)
}

onMounted(async () => {
    await nextTick()
    updateCarousel()
    window.addEventListener('resize', onResize)
})

onUnmounted(() => {
    clearTimeout(resizeTimer)
    window.removeEventListener('resize', onResize)
})
</script>

<template>
  <section class="row bg-orange-cream g-4 pb-5 justify-content-center p-2 p-md-5 m-3" id="projects">
        <div class="col-12">
            <div class="bg-orange-dark text-light mx-auto rounded text-center py-3 section-header">
                <h2 class="mb-0">My Projects</h2>
            </div>
        </div>
        <div class="col-12">
            <div class="projects-carousel-wrapper">
                <div class="projects-carousel-stage">
                    <button type="button" class="projects-carousel-btn projects-carousel-btn-prev"
                        aria-label="Previous projects" :disabled="currentIndex === 0" @click="prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            viewBox="0 0 16 16" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </button>
                    <div ref="carouselRef" class="projects-carousel">
                        <div class="projects-carousel-track" :style="trackStyle">
                            <div v-for="project in projects" :key="project.slug" class="projects-carousel-slide"
                                :style="slideStyle">
                                <ProjectCard :project="project" />
                            </div>
                        </div>
                    </div>
                    <button type="button" class="projects-carousel-btn projects-carousel-btn-next"
                        aria-label="Next projects" :disabled="currentIndex >= maxIndex" @click="next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            viewBox="0 0 16 16" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
                <div class="projects-carousel-dots" role="tablist" aria-label="Project slides">
                    <button v-for="page in pageCount" :key="page" type="button" class="projects-carousel-dot"
                        :class="{ active: page - 1 === currentIndex }" :aria-label="`Go to project slide ${page}`"
                        :aria-selected="page - 1 === currentIndex ? 'true' : 'false'" @click="goTo(page - 1)" />
                </div>
            </div>
        </div>
    </section>
</template>
