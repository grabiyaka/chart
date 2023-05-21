<script>
import { RouterLink, RouterView } from "vue-router";
// import HeaderComponent from "./Main/HeaderComponent.vue";
// import LoaderComponent from "./Main/LoaderComponent.vue";
// import FooterComponent from "./Main/FooterComponent.vue";
export default {
  // components: { HeaderComponent, LoaderComponent, FooterComponent },
  data: () => ({}),
  mounted() { }
};
</script>
    
<template>
  <!-- <HeaderComponent ref="header" /> -->
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <div id="viewbox" :key="$route.path">
        <component :is="Component"></component>
        <!-- <LoaderComponent></LoaderComponent> -->
      </div>
    </transition>
  </router-view>
  <!-- <FooterComponent /> -->
</template>

<style>
    
</style>