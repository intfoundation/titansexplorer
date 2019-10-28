<template>
  <div class="layout">
    <Navbar ref="Navbar"/>
    <router-view></router-view>
    <Footer ref="Footer"/>
  </div>
</template>

<script>
  import Navbar from '@/components/layouts/Navbar';
  import Footer from '@/components/layouts/Footer';
  export default {
    name: "Layout",
    components: {
      Navbar: Navbar,
      Footer: Footer
    }
  }
</script>

<style scoped>
  .layout {
    background-color: #f3f3f3;
    width: 100%;
    min-height: 100%;
  }

</style>
