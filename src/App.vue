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
    <RouterLink to="/login"> Log in</RouterLink>
    <RouterView></RouterView>
  </div>
  
</template>

<style scoped>

</style>
