<script setup>
import { useRoute } from "vue-router";
import { Users } from "lucide-vue-next";
import { ClipboardClock } from "lucide-vue-next";
import { ShelvingUnit } from "lucide-vue-next";
import { Receipt } from "lucide-vue-next";
import { Hospital } from "lucide-vue-next";

const route = useRoute();

// Determine if a nav item should be active based on current route
const isActive = (mainPath) => {
  const currentPath = route.path;

  // Check if exact match or if edit/add variant of the same category
  if (currentPath === mainPath) return true;

  if (
    mainPath === "/books" &&
    (currentPath === "/editBook" || currentPath === "/addBook")
  )
    return true;
  // if (
  //   mainPath === "/appointments" &&
  //   (currentPath === "/editAppointment" || currentPath === "/addAppointment")
  // )
  //   return true;
  // if (
  //   mainPath === "/inventory" &&
  //   (currentPath === "/editInventory" || currentPath === "/addInventory")
  // )
  //   return true;
  // if (
  //   mainPath === "/invoices" &&
  //   (currentPath === "/editInvoice" || currentPath === "/addInvoice")
  // )
  //   return true;
  // if (
  //   mainPath === "/wards" &&
  //   (currentPath === "/editWard" || currentPath === "/addWard")
  // )
  //   return true;

  return false;
};
</script>

<template>
  <div id="menu" class="fixed w-[200px] h-screen bg-surface flex flex-col border-r border-border">
    <div class="flex flex-col flex-1 justify-between mt-6 px-4">
      <ul class="flex flex-col gap-2">
        <li>
          <router-link
            to="/books"
            class="li"
            :class="{ active: isActive('/books') }"
          >
            <Users class="icon" /> Books
          </router-link>
        </li>
        <!-- <li>
          <router-link
            to="/appointments"
            class="li"
            :class="{ active: isActive('/appointments') }"
          >
            <ClipboardClock class="icon" /> Appointments
          </router-link>
        </li>
        <li>
          <router-link
            to="/inventory"
            class="li"
            :class="{ active: isActive('/inventory') }"
          >
            <ShelvingUnit class="icon" /> Inventory
          </router-link>
        </li>
        <li>
          <router-link
            to="/invoices"
            class="li"
            :class="{ active: isActive('/invoices') }"
          >
            <Receipt class="icon" /> Invoices
          </router-link>
        </li>
        <li>
          <router-link
            to="/wards"
            class="li"
            :class="{ active: isActive('/wards') }"
          >
            <Hospital class="icon" /> Wards
          </router-link>
        </li> -->
      </ul>
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
