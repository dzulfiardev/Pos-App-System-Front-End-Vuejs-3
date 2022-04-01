<template>
  <router-view />
</template>

<script>

</script>

<style>
#nav {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

/* Animation Fade */
.wrapper-enter-active {
  animation: finished 1s reverse;
}
.wrapper-leave-active {
  position: absolute !important;
  animation: finished 1s;
}
@keyframes finished {
  0% {
    opacity: 1;
    top: 0;
  }
  50% {
    opacity: 1;
    top: 0;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: -100vh;
  }
}
</style>
