import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Promociones from './components/Promociones.vue'
import RegistraTuComercio from './components/RegistraComercio.vue'
import Login from './components/Login.vue'
import Productos from './components/Productos.vue'

const routes = [
    
    { path: '/', component: Home },
    { path: '/promociones', component: Promociones },
    {path: '/registra-comercio', component: RegistraTuComercio },
    { path: '/productos', component: Productos },
    { path: '/login', component: Login }
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
