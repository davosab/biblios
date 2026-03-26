import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    // {path:'/', redirect:'/patients'}
]

const router = createRouter({
    history: createWebHashHistory('/SistemSpital/'),
    routes
})

export default router