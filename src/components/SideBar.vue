<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import { Users, BookOpen, Clock, RotateCw, CheckCircle, LogOut } from "lucide-vue-next";

const route = useRoute();

// Get user role from localStorage
const userRole = ref(localStorage.getItem('userRole') || 'student');

// Determine if a nav item should be active based on current route
const isActive = (path) => {
  return route.path === path;
};

const logout = () => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  window.location.href = '/#/login';
};

const librarianLinks = [
  { label: 'Approvals', icon: CheckCircle, path: '/librarian/approvals' },
  { label: 'Books', icon: BookOpen, path: '/librarian/books' },
  { label: 'Loans', icon: Clock, path: '/librarian/loans' },
  { label: 'Returns', icon: RotateCw, path: '/librarian/returns' },
];

const studentLinks = [
  { label: 'Books', icon: BookOpen, path: '/student/books' },
  { label: 'My Loans', icon: Clock, path: '/student/loans' },
];
</script>

<template>
  <div id="menu" class="fixed w-[200px] h-screen bg-surface flex flex-col border-r border-border">
    <!-- Header with User Role -->
    <div class="px-4 pt-6 pb-4">
      <div class="text-center">
        <div class="inline-block bg-[#b45309] p-2 rounded-full mb-2">
          <Users class="w-5 h-5 text-white" v-if="userRole === 'student'" />
          <CheckCircle class="w-5 h-5 text-white" v-else />
        </div>
        <p class="text-xs font-semibold text-[#78716c] uppercase tracking-wide">
          {{ userRole === 'librarian' ? 'Librarian' : 'Student' }}
        </p>
      </div>
    </div>

    <hr class="border-[#e4ddd4] mx-2" />

    <!-- Navigation Links -->
    <div class="flex flex-col flex-1 justify-between mt-2 px-2">
      <ul class="flex flex-col gap-2">
        <li v-for="link in userRole === 'librarian' ? librarianLinks : studentLinks" :key="link.path">
          <router-link
            :to="link.path"
            class="li"
            :class="{ active: isActive(link.path) }"
          >
            <component :is="link.icon" class="icon" />
            {{ link.label }}
          </router-link>
        </li>
      </ul>

      <!-- Logout Button -->
      <button
        @click="logout"
        class="flex items-center gap-3 w-full mx-0 px-4 py-2 text-[#78716c] hover:text-red-600 hover:bg-red-50 rounded-[8px] transition-all text-sm font-semibold mb-4"
      >
        <LogOut class="w-4 h-4" />
        Logout
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap");

:root {
  --bg: #f7f4ef;
  --surface: #ffffff;
  --border: #e4ddd4;
  --text-primary: #1c1917;
  --text-secondary: #78716c;
  --accent: #b45309;
  --accent-light: #fef3c7;
  --radius: 12px;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
}

#menu {
  background: var(--surface) !important;
  border-right: 1.5px solid var(--border) !important;
}

.li {
  display: flex;
  align-items: center;
  flex-direction: row;
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  padding: 0.75rem 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  text-decoration: none;
  margin: 0;
}

.li:hover {
  background-color: var(--accent-light);
  color: var(--accent);
}

.active {
  background-color: var(--accent-light);
  color: var(--accent);
  font-weight: 600;
}

.icon {
  width: 18px;
  height: 18px;
  margin-right: 0.75rem;
  flex-shrink: 0;
}
</style>
