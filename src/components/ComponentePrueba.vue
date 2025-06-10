
<template>
    <h2>Productos </h2>
    <div v-if="loading">Cargando productos...</div>
<div class="contenedor" v-for="producto in productos" :key="producto.id">
    <div class="producto" >
  

        <h3>
            {{ producto.nombre }}
        </h3>  
        <img v-bind:src="producto.imagen"  alt="No image available" class="avatars"/> 
        
        <ul>
            
            <li>
                Precio: {{ producto.precio }}
            </li>
            <li>
                
                {{ producto.descripcion }}
            </li>
        </ul>
        <button @click=agregarCarrito></button>
    </div>
        
        
   <!--
</div>
-->
</div>
</template>
<script setup>
//API url
// https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/productos
import { ref, computed, onMounted } from 'vue';


const productos = ref([]);
const loading = ref(true);
onMounted(async () => {
    try {
      const response = await fetch('https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/productos');
      productos.value = await response.json();
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      loading.value = false;
    }
  });
</script>
<style>
.contenedor {
  display:flex
}
.avatars{
   flex-direction: row;
   align-items: flex-end;
   height: 200px;
   width: 200px; 
}
.producto{
    background-color: darkgrey;
    display:flexbox;
}
</style>