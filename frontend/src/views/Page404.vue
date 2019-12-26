<template>
  <div class="view">
    <h1 class="code">
      {{ code }}
    </h1>
    <p class="text">{{ text }}</p>
  </div>
</template>
<script>
export default {
  name: 'ErrorPage',
  computed: {
    code() {
      return '404'
    },
    text() {
      return 'Hello world! (๑•̀ㅂ•́)و✧'
    },
  },
}
</script>
<style scoped lang="scss">
.view {
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.code {
  font-size: 7rem;
}
.text {
  font-size: 1.15rem;
}
</style>
