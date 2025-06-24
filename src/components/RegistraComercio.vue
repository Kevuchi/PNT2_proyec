<template>
    <div class="fondo-registro">
  <div class="registro-container">
    <div class="resena">
      <h2>Bienvenido a MorfarApp</h2>
      <p>
        MorfarApp te conecta con los mejores comercios gastronómicos de la ciudad. 
        Sumate a nuestra red de emprendedores culinarios y hacé crecer tu negocio de comida casera, delivery o platos gourmet.
      </p>
    </div>

    <form @submit.prevent="registrarComercio" class="formulario">
      <h3>Registrar nuevo comercio</h3>

      <label for="nombreComercio">Nombre del comercio:</label>
      <input v-model="nombreComercio" type="text" id="nombreComercio" required />

      <label for="cuil">CUIL:</label>
      <input v-model="cuil" type="number" id="cuil" required />

      <label for="razonSocial">Razón social:</label>
      <input v-model="razonSocial" type="text" id="razonSocial" required />

      <label for="numeroContacto">Número de contacto:</label>
      <input v-model="numeroContacto" type="tel" id="numeroContacto" required />

      <button type="submit">Registrar comercio</button>

        <span v-if="mensajeError" class="mensaje-error">{{ mensajeError }}</span>
        <span v-if="mensajeExito" class="mensaje-exito">{{ mensajeExito }}</span>

    </form>
  </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const nombreComercio = ref('')
const cuil = ref(null)
const razonSocial = ref('')
const numeroContacto = ref(null)

const mensajeError = ref('');
const mensajeExito = ref('');

async function registrarComercio() {
  if (!nombreComercio.value || !cuil.value || !razonSocial.value || !numeroContacto.value) {
    mensajeError.value = 'Todos los campos son obligatorios.';
    mensajeExito.value = '';
    return;
  }

  const nuevoComercio = {
    nombreComercio: nombreComercio.value,
    cuil: cuil.value,
    razonSocial: razonSocial.value,
    numeroContacto: numeroContacto.value
  }

  try {
    const response = await fetch('https://684dea7265ed087139176cc4.mockapi.io/api/v1/registro-comercio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoComercio)
    });

    if (!response.ok) throw new Error('No se pudo registrar el comercio');

    mensajeExito.value = '¡Comercio registrado exitosamente! Aguarde a ser contacto por nuestros representantes.';
    mensajeError.value = '';

    // Limpiar campos
    nombreComercio.value = '';
    cuil.value = null;
    razonSocial.value = '';
    numeroContacto.value = null;
    
  } catch (error) {
    console.error(error);
    mensajeError.value = 'Hubo un problema al registrar el comercio.';
    mensajeExito.value = '';
  }
}
</script>

<style scoped>
.fondo-registro {
    background-image: url('../imagenes/fondo-platos.jpeg');
    background-size: cover;
}

.registro-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: #fff3e0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.resena {
  margin-bottom: 30px;
}

.resena h2 {
  color: #d84315;
  margin-bottom: 10px;
}

.resena p {
  font-size: 1rem;
  color: #444;
}

.formulario h3 {
  margin-bottom: 15px;
  color: #bf360c;
}

.formulario label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

.formulario input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  margin-top: 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e64a19;
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