<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="consultaUsuario">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="buscarEmail" required>

        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="verifPassword" required>

        <button type="submit">Ingresar</button>

        <div class="registro-link">
          ¿No tenés cuenta?
          <router-link to="/registro">Registrate</router-link>
        </div>

        <span v-if="mensajeError" class="mensaje-error">{{ mensajeError }}</span>
      </form>
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue';
import { useRouter } from 'vue-router'
import { useUsuarioStore } from '../stores/usuarioStore';
const router = useRouter()
const usuarioStore = useUsuarioStore()

const usuarios = ref([]);
const buscarEmail = ref(''); //del input
const verifPassword = ref(''); //del input
const mensajeError = ref('');

const consultaUsuario = async () => {
  const queryMail = buscarEmail.value.toLowerCase();
  const queryPass = verifPassword.value;

  try {
    const response = await fetch('https://684dea7265ed087139176cc4.mockapi.io/api/v1/usuarios');
    usuarios.value = await response.json();

    const buscarUsuario = usuarios.value.find(
      usuario =>
        usuario.mail.toLowerCase() === queryMail &&
        usuario.password === queryPass
    );

    if (buscarUsuario) {
      usuarioStore.setUser(buscarUsuario);
      router.push('/');
    } else {
      mensajeError.value = 'Usuario no encontrado o contraseña incorrecta.';
    }
  } catch (error) {
    console.error('Error al consultar el endpoint:', error);
    mensajeError.value = 'Ocurrió un error al verificar el usuario.';
  }
  buscarEmail.value = '';
  verifPassword.value = '';
}

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #e64a19;
}

.mensaje-error {
  color: red;
  display: block;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}

.registro-link {
  margin-top: 15px;
  font-size: 0.9rem;
}

.registro-link a {
  color: #ff5722;
  margin-left: 5px;
  text-decoration: underline;
  cursor: pointer;
}
</style>