import { defineStore } from "pinia";
import { computed } from "vue";

export const useCarritoStore = defineStore('carritoStore',()=>{
    const itemsCarrito = ref([])

    const cantCarrito = computed(()=> itemsCarrito.value.length)

    return {
        cantCarrito
    }
})