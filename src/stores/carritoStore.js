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
        stockParaDescuento: 50
    }),

    getters: {
        total: (state) => {
            return state.items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0)
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
