import { createRouter, createWebHashHistory } from 'vue-router'
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

// Helper function to get user role (from localStorage for now)
const getUserRole = () => {
  return localStorage.getItem('userRole') || null
}

// Route guard for role-based access
const requireRole = (role) => {
  return (to, from, next) => {
    const userRole = getUserRole()
    if (userRole === role) {
      next()
    } else {
      next('/login')
    }
  }
}

const routes = [
    { path: '/', redirect: '/books' },
    { path: '/books', component: Books },
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