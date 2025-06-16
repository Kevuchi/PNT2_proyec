<template>
  <div class="carousel">
    <div class="carousel-image" v-if="imagenes.length">
      <img :src="imagenes[indiceActual]" alt="Publicidad" />
    </div>

    <div class="controles">
      <button @click="anterior">⬅️</button>
      <button @click="siguiente">➡️</button>
    </div>
  </div>

  <div class="texto-container">
    <p class="texto-estilizado">
    ¿Qué es Lorem Ipsum?
    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
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
    const res = await fetch('https://684dea7265ed087139176cc4.mockapi.io/api/v1/imagenes-publicidad');
    const data = await res.json();

    // Extraer solo el campo "img-publi"
    imagenes.value = data.map(item => item['img-publi']);
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

</style>