<template>
    <div class="carrito">
      <h2>Carrito de compras</h2>
  
      <div v-if="carrito.items.length === 0">
        <p>El carrito está vacío.</p>
      </div>
  
      <div v-else>
        <div v-for="item in carrito.items" :key="item.id" class="item-carrito">
          <p>{{ item.nombre }} x {{ item.cantidad }} — ${{ item.precioUnitario * item.cantidad }}</p>
          <button @click="carrito.quitarDelCarrito(item.id)">Eliminar</button>
        </div>
        <h3>Total: </h3>
        <p>Total de productos: {{ carrito.cantidadTotal }}</p>
        <p>Total sin descuento: ${{ carrito.total }}</p>
        <p>Total con descuento: ${{ carrito.totalConDescuento }}</p>
        <p>Descuento aplicado: ${{ carrito.descuentoTotal }}</p>
  
        <button @click="confirmarCompra"
         :disabled="!usuario.getUser.id"
        >Confirmar compra</button>
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
  </style>
  