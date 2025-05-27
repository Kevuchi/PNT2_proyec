
<template>
    <h2>Hola soy un componente de prueba </h2>
    <div v-if="loading">Cargando personajes...</div>
<div class="contenedor" v-for="character in characters" :key="character.id">
    <div class="personaje" >
    <!--
    <div v-if="character.howhogwartsStudent">
    -->

        <h3>
            {{ character.name }}
        </h3>  
        <img v-bind:src="character.image"  alt="No image available" class="avatars"/> 
        
        <ul>
            
            <li>
                Especie: {{ character.species }}
            </li>
            <li>
                
                Actor:   {{ character.actor }}
            </li>
        </ul>
    </div>
        
        
   <!--
</div>
-->
</div>
</template>
<script setup>
//https://hp-api.onrender.com/api/characters
import { ref, computed, onMounted } from 'vue';


const characters = ref([]);
const loading = ref(true);
onMounted(async () => {
    try {
      const response = await fetch('https://hp-api.onrender.com/api/characters');
      characters.value = await response.json();
    } catch (error) {
      console.error('Error al cargar personajes:', error);
    } finally {
      loading.value = false;
    }
  });
</script>
<style>
.avatars{
   flex-direction: row;
   align-items: flex-end;
   height: 200px;
   width: 200px; 
}
.personaje{
    background-color: darkgrey;
    display:flexbox;
}
</style>