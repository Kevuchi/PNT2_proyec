import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ComponentePrueba from './components/ComponentePrueba.vue'
import Home from './components/Home.vue'
import path from 'path'
const routes = [
    { path: '/componente-prueba', component: ComponentePrueba },
    { path: '/', component: Home },
    { path: '/spotify', component: Spotify }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
createApp(App)
    .use(router)
    .mount('#app')
