<template>
  <div id="app">
    <Header />
    <div class="container">
      <div v-if="!$store.state.loading" key="page">
        <router-view/>
      </div>
      <div v-else key="loading" class="loading">
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',

  components: {
    Header
  },

  created () {
    this.$store.dispatch('fetchQuizes')
  }
}
</script>

<style lang="scss">
  @import "./assets/style.scss";

  .loading {
    &::after {
      content: 'Loading...';
      animation: loading 0.7s infinite;
    }

    @keyframes loading {
      0% {
        content: 'Loading';
      }

      25% {
        content: 'Loading.';
      }

      50% {
        content: 'Loading..';
      }

      75% {
        content: 'Loading...';
      }

      100% {
        content: 'Loading';
      }
    }
  }
</style>
