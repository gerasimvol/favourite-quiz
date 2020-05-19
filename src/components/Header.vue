<template>
  <header class="header title-bar">
    <Logo @click.native="navigateTo('/')" />
    <button @click="navigateTo('/create-quiz')">+  Create new quiz</button>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  name: 'Header',

  components: {
    Logo
  },

  methods: {
    navigateTo (route) {
      // allow from homepage
      if (this.$route.name === 'Home') {
        this.$router.push(route)
      } else {
        // ask before leave from other pages
        if (confirm('Leave this page?')) {
          this.$router.push(route)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
</style>
