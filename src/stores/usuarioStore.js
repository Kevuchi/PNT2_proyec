import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useUsuarioStore = defineStore('usuarioStore', () => {
  const usuarioLogueado = ref(JSON.parse(localStorage.getItem('usuario')) || '')

  const setUser = usuario => {
    usuarioLogueado.value = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  const cerrarSesion = () => {
    usuarioLogueado.value = '';
    localStorage.removeItem('usuario');
  }

  const estaLogueado = computed(() => !!usuarioLogueado.value) //el doble signo exclamacion devuelve si no hay nada false si hay algo true

  const getUser = computed(() => usuarioLogueado.value)

  return {
    setUser,
    estaLogueado,
    cerrarSesion,
    getUser
  }
})