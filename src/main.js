import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Promociones from './components/PromocionesBancarias.vue'
import RegistraTuComercio from './components/RegistraComercio.vue'
import UniteComoRepartidor from './components/UniteComoRepartidor.vue'
import Login from './components/Login.vue'

const routes = [
    
    { path: '/', component: Home },
    { path: '/promociones', component: Promociones },
    {path: '/registra-comercio', component: RegistraTuComercio },
    { path: '/unite-repartidor', component: UniteComoRepartidor },
    { path: '/login', component: Login }
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
