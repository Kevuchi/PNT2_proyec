<template>
  <div class="registro-container">
    <div class="registro-box">
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="registrarse">
        <label for="nombre">Nombre *</label>
        <input id="nombre" v-model="nombre" type="text" required />

        <label for="apellido">Apellido *</label>
        <input id="apellido" v-model="apellido" type="text" required />

        <label for="email">Correo electrónico *</label>
        <input id="email" v-model="email" type="email" required />

        <label for="password">Contraseña *</label>
        <input id="password" v-model="password" type="password" required />

        <button type="submit">Registrarse</button>

        <span v-if="mensajeError" class="mensaje-error">{{ mensajeError }}</span>
        <span v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</span>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//para el router de navegación
import { useRouter } from 'vue-router'
const router = useRouter()

const nombre = ref('')
const apellido = ref('')
const email = ref('')
const password = ref('')

const mensajeError = ref('')
const mensajeExito = ref('')

async function registrarse() {
  if (!nombre.value || !apellido.value || !email.value || !password.value) {
    mensajeError.value = 'Todos los campos son obligatorios.';
    mensajeExito.value = '';
    return;
  }

  const nuevoUsuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    mail: email.value,
    password: password.value
  }

  try {
    const response = await fetch('https://684dea7265ed087139176cc4.mockapi.io/api/v1/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoUsuario)
    });

    if (!response.ok) throw new Error('No se pudo registrar el usuario');

    mensajeExito.value = '¡Registro exitoso!';
    mensajeError.value = '';

    // Limpiar campos
    nombre.value = '';
    apellido.value = '';
    email.value = '';
    password.value = '';

    router.push('/login')
    
  } catch (error) {
    console.error(error);
    mensajeError.value = 'Hubo un problema al registrar el usuario.';
    mensajeExito.value = '';
  }
}

</script>

<style scoped>
.registro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fefefe;
}
.registro-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 350px;
}
label {
  display: block;
  margin-top: 15px;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background-color: #2875cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #175397;
}
.mensaje-error {
  color: red;
  display: block;
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
}
.mensaje-exito {
  color: green;
  display: block;
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
}
</style>