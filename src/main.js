import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'

const pinia = createPinia()

import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Promociones from './components/Promociones.vue'
import RegistraTuComercio from './components/RegistraComercio.vue'
import Login from './components/Login.vue'
import Productos from './components/Productos.vue'
import Registro from './components/Registro.vue'

const routes = [
    
    { path: '/', component: Home },
    { path: '/promociones', component: Promociones },
    {path: '/registra-comercio', component: RegistraTuComercio },
    { path: '/productos', component: Productos },
    { path: '/login', component: Login },
    { path: '/registro', component: Registro }
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
