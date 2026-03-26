<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "/src/lib/supabaseClient";
import router from "../../router/router";

// array that will contain objects with database records
const patients = ref([]);

// querry from supabase database
async function getPatients() {
  const { data } = await supabase.from("patients").select("*");
  patients.value = data;
}

async function deletePatient(id) {
  const { error } = await supabase.from("patients").delete().eq("id", id);
  if (error) {
    console.error(error.message);
  } else {
    patients.value = patients.value.filter((patient) => patient.id !== id);
  }
}

onMounted(() => {
  getPatients();
});
</script>

<template>
  <div
    id="patients-card"
    class="w-[full] bg-white mx-[30px] mb-[30px] rounded-[10px]"
  >
    <h1 class="text-[18px] font-semibold mt-3">Patients</h1>

    <div class="grid grid-cols-1 mt-2 max-h-[700px] overflow-y-auto">
      <div
        class="grid grid-cols-9 border-b border-t border-gray-300 p-3 text-center items-center"
      >
        <p class="text-[16px] font-semibold">ID</p>
        <p class="text-[16px] font-semibold">First Name</p>
        <p class="text-[16px] font-semibold">Last Name</p>
        <p class="text-[16px] font-semibold">CNP</p>
        <p class="text-[16px] font-semibold">Date of Birth</p>
        <p class="text-[16px] font-semibold">Gender</p>
        <p class="text-[16px] font-semibold">Status</p>
        <p class="text-[16px] font-semibold">Edit</p>
        <p class="text-[16px] font-semibold">Delete</p>
      </div>
      <ul>
        <li
          v-for="(patient, index) in patients"
          :key="patient.id"
          class="grid grid-cols-9 border-b border-gray-200 p-3 text-center items-center hover:bg-gray-50"
        >
          <p class="text-[14px]">{{ patient.id }}</p>
          <p class="text-[14px]">{{ patient.first_name }}</p>
          <p class="text-[14px]">{{ patient.last_name }}</p>
          <p class="text-[14px]">{{ patient.cnp }}</p>
          <p class="text-[14px]">{{ patient.date_of_birth }}</p>
          <p class="text-[14px]">{{ patient.gender }}</p>
          <p class="text-[14px]">{{ patient.status }}</p>

          <div class="flex justify-center">
          <router-link to="/editPatient">
            <button
              class="bg-[#56D788] hover:bg-[#2cba62] text-[12px] font-medium py-1 rounded-md transition-colors duration-200 w-[70px]"
            >
              Edit
            </button>
          </router-link>
          </div>
          <div class="flex justify-center">
          <button
            @click="deletePatient(patient.id)"
            class="bg-red-500 hover:bg-red-600 text-white text-[12px] font-medium py-1 rounded-md transition-colors duration-200 w-[70px]"
          >
            Delete
          </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
