<template>
  <header class="header title-bar">
    <Logo />
    <button @click="$router.push('/create-quiz')">+  Create new quiz</button>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  name: 'Header',

  components: {
    Logo
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
