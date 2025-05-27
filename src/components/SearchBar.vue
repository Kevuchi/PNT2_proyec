<template>
<input type="text" id="text"placeholder="Busque artista, album o canción" v-model="text">
<button></button>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
 const text = ref("")
    function search (){
        const search = fetch()
    };
</script>

<style>
</style>