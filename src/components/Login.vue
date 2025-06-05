<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Iniciar sesión</h2>
      <form>
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="buscarEmail" required>

        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="verifPassword" required>

        <button type="submit" @click="consultaUsuario">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script setup>

import {ref, onMounted} from 'vue';

const usuarios = ref([]);
const buscarEmail = ref(''); //del input
const verifPassword = ref(''); //del input

onMounted(async()=>{
    try{
        const response = await fetch('https://www.mockachino.com/eb715ed8-7002-4b/usuarios');
        const data = await response.json();
        usuarios.value = await data.users; //filtro solo la lista de usuarios
        console.log(usuarios);
    } catch (error) {
        console.error('Error al cargar usuarios', error);
    }
});

const consultaUsuario = () => {
  const queryMail = buscarEmail.value.toLowerCase();
  const queryPass = verifPassword.value;

  const buscarUsuario = usuarios.value.find(
    usuario => usuario.mail.toLowerCase() === queryMail && usuario.password === queryPass
  );

  if (buscarUsuario) {
    alert("¡Bienvenido, " + buscarUsuario.nombre + "!");
  } else {
    alert("Usuario no encontrado o contraseña incorrecta.");
  }
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
</style>