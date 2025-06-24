<template>
<div class="carrito">
  <div class="carrito-block">
    <h2>🛒 Carrito de compras</h2>
    <div v-if="carrito.items.length === 0">
      <p>El carrito está vacío.</p>
    </div>
    <div v-else>
      <div
        v-for="item in carrito.items"
        :key="item.id"
        class="item-carrito"
      >
        <p>{{ item.nombre }} x {{ item.cantidad }} — ${{ item.precioUnitario * item.cantidad }}</p>
        <button @click="carrito.quitarDelCarrito(item.id)">Eliminar</button>
      </div>
    </div>
  </div>

  <div class="total-block" v-if="carrito.items.length">
    <h3>🧾 Resumen</h3>
    <p>Total de productos: {{ carrito.cantidadTotal }}</p>
    <p>Total sin descuento: ${{ carrito.total }}</p>
    <p>Total con descuento: ${{ carrito.totalConDescuento }}</p>
    <p>Descuento aplicado: ${{ carrito.descuentoTotal }}</p>
    <button @click="confirmarCompra" :disabled="!usuario.getUser.id">
      Confirmar compra
    </button>
  </div>
</div>
  </template>
  
  <script setup>
  import { useCarritoStore } from '../stores/carritoStore'
  import axios from 'axios'
  import { useUsuarioStore } from '../stores/usuarioStore'
  const usuario = useUsuarioStore()
  const carrito = useCarritoStore()
  
  const confirmarCompra = async () => {
    try {
      const payload = {
        idUsuario: usuario.getUser.id,
        items:JSON.stringify( carrito.items.map(item => ({
            id: item.id,
            nombre: item.nombre,
            precioUnitario: item.precioUnitario,
            cantidad: item.cantidad,
        }))),
        fecha: obtenerFechaFormateada(),
        total: carrito.total,//si no se aplica descuento pasa el precio completo
        totalDescuento: carrito.totalConDescuento
      }
      console.log("payloaaaad",payload)
      await axios.post('https://sheet2api.com/v1/T0ZA8YOQPyc1/pn2/compras', payload,
      {headers: {
        'Content-Type': 'application/json'
    }}
      )
  
      carrito.vaciarCarrito()
      alert('Compra realizada con éxito')
    } catch (error) {
      console.error('Error al confirmar compra:', error)
      alert('Hubo un problema al realizar la compra')
    }
  }

function obtenerFechaFormateada() {
  const fecha = new Date();

  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // ¡los meses van de 0 a 11!
  const anio = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  return `${dia}-${mes}-${anio} ${horas}:${minutos}`;
}
  </script>
  
  <style scoped>
  .carrito {
    border: 1px solid #ccc;
    padding: 1rem;
  }
  .item-carrito {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  /*estilo para carrito*/
  .carrito {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.item-carrito {
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #fbe9e7;
  border-radius: 8px;
  box-shadow: inset 0 0 3px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-carrito p {
  margin: 0;
  font-weight: 500;
  color: #5d4037;
}

.item-carrito button {
  background-color: #e57373;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.item-carrito button:hover {
  background-color: #c62828;
}

.carrito-block {
  flex: 1 1 60%;
  min-width: 300px;
}

.total-block {
  flex: 1 1 35%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.total-block h3 {
  margin-top: 0;
  color: #bf360c;
}

.total-block p {
  font-size: 1rem;
  margin: 10px 0;
  color: #5d4037;
}

.total-block button {
  margin-top: 20px;
  width: 100%;
  background-color: #ff5722;
  color: white;
  padding: 10px 0;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.total-block button:hover:not(:disabled) {
  background-color: #e64a19;
}

.total-block button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
  </style>
  