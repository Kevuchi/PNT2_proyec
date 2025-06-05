<template>

  <div>
    <!-- Barra de navegación -->
    <nav class="navbar">
      <div class="logo" @click="irAHome"><img src="./imagenes/logo.png" alt="logo-morfar"></div>
      <div class="nav-links">
        <router-link to="/promociones">Promociones bancarias</router-link>
        <router-link to="/registra-comercio">Registra tu comercio</router-link>
        <router-link to="/unite-repartidor">Unite como repartidor</router-link>
        <router-link to="/login">Iniciar sesión</router-link>
      </div>
    </nav>
  </div>
  <RouterView></RouterView>

</template>

<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

function goToComponentePrueba() {
    console.log('Prueba')
    router.push('/componentePrueba')
}

function irAHome() {
    console.log('se va al home')
    router.push('/')
}

</script>

<style scoped>

img{
  width: 80px;
  height: auto;
  border-radius: 10px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff5722;
  padding: 15px;
  color: white;
}

.logo {
  font-size: 1.5em;
}

.nav-links a {
  margin: 0 15px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

.home-content {
  text-align: center;
  margin-top: 50px;
  background-color: blueviolet;
}

</style>
