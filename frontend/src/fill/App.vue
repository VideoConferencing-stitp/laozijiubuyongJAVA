
<template>
  <div id="app">
    <transition name="flow" appear>
      <keep-alive>
        <Fill></Fill>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Fill from './Fill'
export default {
  components: {
    Fill
  },
  name: "app",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 1rem;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
