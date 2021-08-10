<template>
  <div class="main-container">
    <nav-component></nav-component>
    <router-view />
    <footer-component></footer-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import navbar from "./components/Navbar.vue";
import footer from "./components/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    "nav-component": navbar,
    "footer-component": footer,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-container {
  position: absolute;
  right: 0;
  bottom: 223px;
  left: 0;
  top: 0;
}
</style>
