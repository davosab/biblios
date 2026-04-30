import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Books from '../pages/Books.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

// Librarian pages
import LibrarianApprovals from '../pages/librarian/Approvals.vue'
import LibrarianBooks from '../pages/librarian/Books.vue'
import LibrarianLoans from '../pages/librarian/Loans.vue'
import LibrarianReturns from '../pages/librarian/Returns.vue'

// Student pages
import StudentBooks from '../pages/student/Books.vue'
import StudentLoans from '../pages/student/Loans.vue'

const requireAuth = async (to, from, next) => {
  const { checkAuth, isAuthenticated } = useAuth()
  const isAuth = await checkAuth()

  if (isAuth) {
    next()
  } else {
    next('/login')
  }
}

const requireRole = (role) => {
  return async (to, from, next) => {
    const { userRole, checkAuth } = useAuth()
    const isAuth = await checkAuth()

    if (isAuth && userRole.value === role) {
      next()
    } else {
      next('/login')
    }
  }
}

const routes = [
  { path: '/', redirect: '/books' },
  { path: '/books', component: Books, beforeEnter: requireAuth },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  // Librarian routes
  {
    path: '/librarian/approvals',
    component: LibrarianApprovals,
    beforeEnter: requireRole('librarian')
  },
  {
    path: '/librarian/books',
    component: LibrarianBooks,
    beforeEnter: requireRole('librarian')
  },
  {
    path: '/librarian/loans',
    component: LibrarianLoans,
    beforeEnter: requireRole('librarian')
  },
  {
    path: '/librarian/returns',
    component: LibrarianReturns,
    beforeEnter: requireRole('librarian')
  },

  // Student routes
  {
    path: '/student/books',
    component: StudentBooks,
    beforeEnter: requireRole('student')
  },
  {
    path: '/student/loans',
    component: StudentLoans,
    beforeEnter: requireRole('student')
  },
]

const router = createRouter({
  history: createWebHashHistory('/biblios/'),
  routes
})

export default router