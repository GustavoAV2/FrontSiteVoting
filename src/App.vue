<template>
  <div id="app">
    <transition name="anim" mode="out-in" appear>
      <router-view/>
    </transition>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.anim-enter-active{
  transition: opacity 0.5s;
}
.anim-leave-active{
  transition: opacity 0.5s;
}
.anim-enter, .anim-leave-to {
  opacity: 0;
}
</style>
