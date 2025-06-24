<template>
  <!--
  buscar elemento slide o carrusel + sumar botón carrito
  --->
  <div class="carousel">
    <div class="carousel-image" v-if="imagenes.length">

      <img :src="imagenes[indiceActual]" alt="Publicidad"/>

      <div class="texto-promocion">
      ¡Promociones disponibles en los siguientes productos de hasta 50% descuento!
      </div>

    </div>

    <div class="controles">
      <button @click="anterior">⬅️</button>
      <button @click="siguiente">➡️</button>
    </div>
  </div>

  <div class="texto-container">
    <p class="texto-estilizado">
    Adquiera los mejores productos de rotisería y bodegón.
    Pizzas, empanadas, milanesas, postres y mucho más!
    </p>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const imagenes = ref([]);
const indiceActual = ref(0);
let intervalo = null;

async function cargarImagenes() {
  try {
  
    const res = await fetch('https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/productos');
    const data = await res.json();

    // Extraer solo el campo "imagen los links filtrando los que tiene stock >=100"
    imagenes.value = data
    .filter(item => item.stock > 100)
    .map(item => item.imagen);
  } catch (error) {
    console.error('Error al cargar imágenes:', error);
  }
}

function siguiente() {
  indiceActual.value = (indiceActual.value + 1) % imagenes.value.length;
}

function anterior() {
  indiceActual.value = (indiceActual.value - 1 + imagenes.value.length) % imagenes.value.length;
}

onMounted(() => {
  cargarImagenes();
  intervalo = setInterval(siguiente, 3000);
});

onUnmounted(() => {
  clearInterval(intervalo);
});
</script>

<style scoped>

.carousel {
  width: 80%;
  height: 500px; /* Altura fija */
  position: relative;
  text-align: center;
  overflow: hidden;
  margin: 0 auto;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen dentro del contenedor sin deformarla */
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  display: block;
}

.controles {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  transform: translateY(-50%);
  pointer-events: none; /* Los botones no bloquean la imagen */
}

.controles button {
  font-size: 1.8rem;
  padding: 10px;
  background-color: transparent; /* Fondo transparente */
  color: white;
  border: none;
  cursor: pointer;
  pointer-events: auto;
  transition: opacity 0.3s ease;
}

.controles button:hover {
  opacity: 0.7; /* Efecto al pasar el mouse */
}

/*bloque para ingresar texto*/
.texto-container {
  width: 80%;
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.texto-estilizado {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

/*texto en carrousel */
.texto-promocion {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 87, 34, 0.85); /* tono naranja con opacidad */
  color: white;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 2;
}
</style>