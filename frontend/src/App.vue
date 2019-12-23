<template>
  <div id="app">
    <transition name="flow" appear>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 10rem;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
