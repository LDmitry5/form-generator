<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<template>
  <div class="home">
    <h2>Генератор форм Vue 3 + TypeScript</h2>
    <p>Выберите демо‑форму для просмотра:</p>
    <nav>
      <router-link to="/form1" class="btn btn-primary">Демо‑форма 1</router-link>
      <router-link to="/form2" class="btn btn-secondary">Демо‑форма 2</router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.home {
  text-align: center;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;

  &-primary {
    background-color: #007bff;
    color: white;
  }

  &-secondary {
    background-color: #6c757d;
    color: white;
  }
}
</style>
