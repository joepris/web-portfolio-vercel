<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-orange-dark text-light p-3">
    <div class="container-fluid">
      <RouterLink class="navbar-brand text-light fw-bold" to="/" id="logo">MyPortfolio</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink
              class="nav-link nav-link-light"
              active-class=""
              exact-active-class="router-link-active"
              to="/"
            >
              About Me
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link nav-link-light" to="/projects">My Projects</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link nav-link-light" to="/tools">Tools</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link nav-link-light" to="/blog">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link nav-link-light" to="/contact">Contact</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
