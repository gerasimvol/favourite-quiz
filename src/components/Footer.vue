<template>
  <footer class="footer">
    <a href="https://github.com/gerasimvol" target="_blank">Github</a>
    <a href="https://github.com/jdan/98.css" target="_blank">98.css</a>
  </footer>
</template>

<script>

export default {
  name: 'Footer'
}
</script>

<style lang="scss">
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;

    a {
      margin-right: 10px;
    }
  }
</style>
