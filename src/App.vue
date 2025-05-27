<script setup>
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
function goToComponentePrueba() {
    console.log('PRueba')
    router.push('/componente-prueba')
}
</script>

<template>
  <div>
    <h1>Primer testeo del proyecto</h1>
    <a @click="goToComponentePrueba"> Componente de Prueba</a>
    <RouterLink to="/componente-prueba"> Componente de Prueba con RouterLink </RouterLink>
    <RouterLink to="/"> Home </RouterLink>
    <RouterView></RouterView>
  </div>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
