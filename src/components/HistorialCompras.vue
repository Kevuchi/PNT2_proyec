<template>
  <div class="compras-container">
    <h2 class="titulo">📦 Mis compras realizadas</h2>

    <div v-if="compras.length">
      <div v-for="compra in compras" :key="compra.fecha" class="compra-tarjeta">
        <div class="campo">
          <label>Fecha:</label>
          <input type="text" :value="compra.fecha" readonly />
        </div>
        <div class="campo">
          <label>Total con descuento aplicado:</label>
          <input type="text" :value="'$' + compra.totalDescuento" readonly />
        </div>
        <div class="campo">
          <label>Total:</label>
          <input type="text" :value="'$' + compra.total" readonly />
        </div>
        <div class="campo-items">
          <label>Items comprados:</label>
          <ul>
            <li v-for="item in JSON.parse(compra.items)" :key="item.id">
              {{ item.nombre }} (x{{ item.cantidad }}) - ${{ item.precioUnitario }}
            </li>
          </ul>
        </div>
        <button @click="repetirCompra(compra)">
        Repetir compra
        </button>
      </div>
    </div>

    <div v-else class="sin-compras">
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
   // if (!usuarioStore.getUser.id) return
    const res = await axios.get(`https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/Compras?idUsuario=${usuarioStore.getUser.id}`)
    console.log(res.data)
    console.log(usuarioStore.getUser.id)
    compras.value = res.data
    console.log(compras.value )
  })
  const repetirCompra = async (compra) => {
    try {
    //   const payload = {
    //     idUsuario: usuario.getUser.id,
    //     items:JSON.stringify( carrito.items.map(item => ({
    //         id: item.id,
    //         nombre: item.nombre,
    //         precioUnitario: item.precioUnitario,
    //         cantidad: item.cantidad,
    //     }))),
    //     fecha: obtenerFechaFormateada(),
    //     total: carrito.total,//si no se aplica descuento pasa el precio completo
    //     totalDescuento: carrito.totalConDescuento
    //   }
      console.log("payloaaaad",compra)
      await axios.post('https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/compras', compra,
      {headers: {
        'Content-Type': 'application/json'
    }}
      )
  
     
      alert('Compra realizada con éxito')
    } catch (error) {
      console.error('Error al confirmar compra:', error)
      alert('Hubo un problema al realizar la compra')
    }
  }

  </script>
  
  <style scoped>
.compras-container {
  width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: #fff3e0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.titulo {
  text-align: center;
  font-size: 1.8rem;
  color: #d84315;
  margin-bottom: 30px;
}

.compra-tarjeta {
  background: #fbe9e7;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 5px solid #e64a19;
}

.campo {
  margin-bottom: 15px;
}

.campo label {
  display: block;
  font-weight: bold;
  color: #bf360c;
  margin-bottom: 5px;
}

.campo input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  color: #444;
}

.campo-items ul {
  list-style-type: disc;
  margin-left: 20px;
  color: #5d4037;
}

.sin-compras {
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-top: 40px;
}
</style>