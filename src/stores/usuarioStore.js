import { defineStore } from "pinia";
import { ref, computed} from "vue";

export const useUsuarioStore = defineStore('usuarioStore',()=>{
    const usuarioLogueado = ref('')

    const setUser = usuario=>usuarioLogueado.value=usuario

    const cerrarSesion = () => { usuarioLogueado.value = '' }

    const estaLogueado = computed(() => !!usuarioLogueado.value) //el doble signo exclamacion devuelve si no hay nada false si hay algo true

    const getUser = computed(() => usuarioLogueado.value)

    return {
        setUser,
        estaLogueado,
        cerrarSesion,
        getUser
    }
})