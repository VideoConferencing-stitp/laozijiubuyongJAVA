<template>
  <div
    id="app"
    v-loading="$store.state.loading"
    element-loading-background="rgba(255,255,255,0.3)"
    element-loading-text="冲冲冲！"
  >
    <transition name="flow" appear>
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 10rem;
  min-height: 100vh;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: #333;
}

body {
  background: white;
}

@media screen and (max-width: 800px) {
  #app {
    padding: 0 2rem;
  }
}

.flow-enter-active {
  transition: all 0.5s ease;
}
.flow-leave-active {
  transition: none;
}
.flow-enter,
.flow-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
