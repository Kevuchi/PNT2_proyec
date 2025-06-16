<template>
<div class="body">
  <div>
    <!-- Barra de navegación -->
    <nav class="navbar">
      <div class="logo" @click="irAHome"><img src="./imagenes/logo.png" alt="logo-morfar"></div>
      <div class="nav-links">
        <router-link to="/promociones">Promociones</router-link>
        <router-link to="/registra-comercio">Registra tu comercio</router-link>
        <router-link to="/productos">Productos</router-link>
        
        <div class="usuario-dropdown" v-if="usuarioStore.estaLogueado">
          <span class="usuario-trigger">
            Bienvenido {{ usuarioStore.getUser.nombre }}
          </span>
          <div class="dropdown-menu">
            <a @click="hacerLogout">Cerrar sesión</a>
          </div>
        </div>
        <router-link v-else to="/login">Iniciar sesión</router-link>

      </div>
    </nav>
  </div>
  <RouterView></RouterView>

  <footer class="footer">
    <div class="redes">
      <a href="https://www.youtube.com" target="_blank">
        <img src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000" alt="YouTube" />
      </a>
      <a href="https://www.tiktok.com/explore" target="_blank">
        <img src="https://img.icons8.com/?size=100&id=118640&format=png&color=000000" alt="TikTok" />
      </a>
      <a href="https://www.instagram.com" target="_blank">
        <img src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000" alt="Instagram" />
      </a>
    </div>
    
    <div class="derechos">
      © 2025 MorfarApp. All rights reserved.
    </div>
  </footer>
</div>
</template>

<script setup>

//para usar Pinia
import { useUsuarioStore } from './stores/usuarioStore'
const usuarioStore = useUsuarioStore()

//para el router de navegación
import { useRouter } from 'vue-router'
const router = useRouter()

function irAHome() {
    console.log('se va al home')
    router.push('/')
}

function hacerLogout() {
  usuarioStore.cerrarSesion()
  console.log(usuarioStore.getUser)
  router.push('/login')
}

</script>

<style scoped>

.body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo img{
  width: 90px;
  height: 100%;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff5722;
  color: white;
  text-transform: uppercase;
  width: 100%;
}

.nav-links a {
  margin: 0 15px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: none; /* eliminar subrayado */
  /*text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);*/
}

.home-content {
  text-align: center;
  margin-top: 50px;
  background-color: blueviolet;
}

/*dropdown al iniciar sesión*/
.usuario-dropdown {
  position: relative;
  display: inline-block;
  color: white;
  font-weight: bold;
  margin: 0 15px;
}

.usuario-trigger {
  cursor: pointer;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 120px;
  right: 0;
  top: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  padding: 10px;
  margin-top: 0px; /*baja el botón cerrar sesión unos px*/
  text-transform: lowercase;
}

.dropdown-menu a {
  color: #ff5722;
  text-decoration: none;
  display: block;
  font-size: 0.9rem;
  cursor: pointer;
}

.dropdown-menu a:hover {
  text-decoration: none;
  color: #e64a19;
}

.usuario-dropdown:hover .dropdown-menu {
  display: block;
}

/*Footer de la app*/
.footer {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;
}

.redes {
  display: flex;
  gap: 15px;
}

.redes img {
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease;
}

.redes img:hover {
  transform: scale(1.2); /* Efecto al pasar el mouse */
}

.derechos {
  font-size: 0.9rem;
}


</style>
