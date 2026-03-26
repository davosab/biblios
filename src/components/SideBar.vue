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
    mainPath === "/patients" &&
    (currentPath === "/editPatient" || currentPath === "/addPatient")
  )
    return true;
  if (
    mainPath === "/appointments" &&
    (currentPath === "/editAppointment" || currentPath === "/addAppointment")
  )
    return true;
  if (
    mainPath === "/inventory" &&
    (currentPath === "/editInventory" || currentPath === "/addInventory")
  )
    return true;
  if (
    mainPath === "/invoices" &&
    (currentPath === "/editInvoice" || currentPath === "/addInvoice")
  )
    return true;
  if (
    mainPath === "/wards" &&
    (currentPath === "/editWard" || currentPath === "/addWard")
  )
    return true;

  return false;
};
</script>

<template>
  <div id="menu" class="fixed w-[200px] h-screen bg-[#FFFFFF] flex flex-col">
    <div class="flex flex-col flex-1 justify-between mt-[25px]">
      <ul class="flex flex-col gap-3">
        <li>
          <router-link
            to="/patients"
            class="li"
            :class="{ active: isActive('/patients') }"
          >
            <Users class="icon" /> Books
          </router-link>
        </li>
        <li>
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
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.li {
  margin-inline: 25px;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 17px;
  text-decoration: #2e2e2e;
  font-weight: 600;
  padding: 5px 0px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.a {
  font-size: 17px;
  margin-inline: 25px;
  padding-top: 6px;
  margin-bottom: 20px;
  padding: 5px 0px;
  font-weight: 600;
}

.active {
  background-color: #e7ffef;
  color: #56d788;
  border-radius: 10px;
}

.icon {
  width: 20px;
  height: 20px;
  margin-left: 19px;
  margin-right: 5px;
}

#menu {
  border-right: 1px solid rgb(219, 216, 216);
}
</style>
