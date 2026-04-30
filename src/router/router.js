import { createRouter, createWebHashHistory } from 'vue-router'
import Books from '../pages/Books.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
Register
const routes = [
    { path: '/', redirect: '/books' },
    { path: '/books', component: Books },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

]

const router = createRouter({
    history: createWebHashHistory('/biblios/'),
    routes
})

export default router