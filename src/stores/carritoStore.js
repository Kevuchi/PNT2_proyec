import { defineStore } from "pinia";
import { computed } from "vue";

/*export const useCarritoStore = defineStore('carritoStore',()=>{
    const itemsCarrito = ref([])

    const cantCarrito = computed(()=> itemsCarrito.value.length)

    return {
        cantCarrito
    }
})*/

export const useCarritoStore = defineStore('carrito', {
    state: () => ({
        items: [],
        descuentoStockAlto: 0.5,
        stockParaDescuento: 100
    }),

    getters: {
        total: (state) => {
            return state.items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0)
        },
        totalConDescuento: (state) => {
            return state.items.reduce((acc, item) => {
                const subtotal = item.precioUnitario * item.cantidad
                const descuento = item.stock > state.stockParaDescuento ? subtotal * state.descuentoStockAlto : 0
                return acc + (subtotal - descuento)
            }, 0)
        },

        descuentoTotal: (state) => {
            return state.items.reduce((acc, item) => {
                const subtotal = item.precioUnitario * item.cantidad
                const descuento = item.stock > state.stockParaDescuento ? subtotal * state.descuentoStockAlto : 0
                return acc + descuento
            }, 0)
        },
        cantidadTotal: (state) => {
            return state.items.reduce((acc, item) => acc + item.cantidad, 0)
        },
    },

    actions: {
        agregarAlCarrito(producto) {
            const existe = this.items.find((item) => item.id === producto.id)
            if (existe) {
                existe.cantidad++
            } else {
                this.items.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    precioUnitario: producto.precio,
                    cantidad: 1,
                    stock: producto.stock
                })
            }
        },

        quitarDelCarrito(id) {
            this.items = this.items.filter((item) => item.id !== id)
        },

        vaciarCarrito() {
            this.items = []
        },
    },
})
