This component is the sitemap, which can be found in the footer. 
It provides an overview of routes from the application.

<template>
  <div class="wrapper">
    <div class="container">
      <h2 class="text">Sitemap</h2>
      <div v-for="route in links.slice(0, 17)" :key="route.name">
        <p v-if="route.detail" class="link detail" @click="navigate(route)">
          • {{ route.name }}
        </p>
        <p
          v-if="!route.detail && route.name !== ''"
          class="link main"
          @click="navigate(route)"
        >
          • {{ route.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import Link from "../types/link";
import City from "../types/city";
import dataService from "../services/dataservice";
import router from "../router/index";

export default class Sitemap extends Vue {
  citys = [] as City[];
  links = [] as Link[];

  mounted() {
    window.scroll(0, 0);
    router.options.routes.forEach((route) => {
      let link: Link = {
        path: route.path,
        name: route.name as string,
        detail: false,
      };
      this.links.push(link);
    });

    const cityArray = dataService.getCityArray();

    for (let i = 0; i < 12; i++) {
      let link: Link = {
        path: "/city/" + cityArray[i],
        name: cityArray[i],
        detail: true,
      };
      this.links.push(link);
    }

    const text = this.$route.params.id as string;
    if (text != undefined) {
      router.push({ name: "City-Detail", params: { id: text } });
    }
  }

  navigate(link: Link) {
    if (link != null) {
      router.push(link.path);
      window.scroll(0, 0);
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  border: 1px solid rgba(63, 63, 63, 0.288);
  text-align: left;
  width: 100%;
}

.detail {
  padding-left: 60px;
  font-style: italic;
}

.link {
  cursor: pointer;
  text-decoration: underline;
  color: rgb(49, 90, 145);
  padding-bottom: 0;
  margin: 0;
}

.link:hover {
  text-decoration: underline;
  color: rgb(130, 143, 185);
}

.main {
  font-weight: bold;
}

.text {
  margin-bottom: 10px;
  text-align: center;
}

.wrapper {
  min-height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-width: 100%;
}
</style>