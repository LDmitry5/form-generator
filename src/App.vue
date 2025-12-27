<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/form1">Демо‑форма 1</router-link>
      <router-link to="/form2">Демо‑форма 2</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
  background: #f0f0f0;
  width: 100%;

  @media (max-width: 480px) {
    gap: 1rem;
  }
}
nav a {
  text-decoration: none;
  color: #333;
}
</style>
