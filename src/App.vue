<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const routes = [
  { to: '/', title: 'Login' },
  { to: '/about', title: 'About' },
];
const useRouteInstance = { fullPath: '' } // useRoute();
</script>

<template>
  <header v-if="useRouteInstance.fullPath && useRouteInstance.fullPath !== '/'">
    <nav>
      <RouterLink v-for="(route) in routes" :key="route.to" :to="route.to" on>{{ route.title }}</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>

header {
  line-height: 1.5;
  max-height: 100vh;
  margin-right: 20px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */

/* input[type="text"], input[type="password"] {
  border: 1px solid #777777;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 1px #777777;
  outline: none;
  padding: 3px 7px;
}

.form-table {
  margin-bottom: 20px;
}
.form-table tr {
  line-height: 2;
} */
</style>
