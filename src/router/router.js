import { createRouter, createWebHashHistory } from 'vue-router'
import Books from '../pages/Books.vue'

const routes = [
    { path: '/', redirect: '/books' },
    { path: '/books', component: Books }
]

const router = createRouter({
    history: createWebHashHistory('/biblios/'),
    routes
})

export default router