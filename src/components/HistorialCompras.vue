<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Mis compras</h2>
      <div v-if="compras.length">
        <div v-for="compra in compras" :key="compra.fecha" class="border p-4 rounded mb-2">
          <p><strong>Fecha:</strong> {{ compra.fecha }}</p>
          <p><strong>Precio total:</strong> ${{ compra.precioFinal }}</p>
          <p><strong>Items:</strong></p>
          <ul>
            <li v-for="items in JSON.parse(compra.productos)" :key="item.id">
              {{ item.nombre }} (x{{ item.cantidad }}) - ${{ item.precioUnitario }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>No tenés compras registradas.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useUsuarioStore } from '../stores/usuarioStore'
  
  const usuarioStore = useUsuarioStore()
  const compras = ref([])
  
  onMounted(async () => {
    if (!usuarioStore.getUser.id) return
    const res = await axios.get('https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/Compras')
    compras.value = res.data.filter(c => c.idUsuario === usuarioStore.getUser.id)
  })
  </script>
  