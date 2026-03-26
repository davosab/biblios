<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "/src/lib/supabaseClient";

// array that will contain objects with database records
const wards = ref([]);

// querry from supabase database
async function getWards() {
    const { data } = await supabase.from("wards").select("*");
    wards.value = data;
}

async function deleteWard(id) {
    const { error } = await supabase.from("wards").delete().eq("id", id);
    if (error) {
        console.error(error.message);
    } else {
        wards.value = wards.value.filter((ward) => ward.id !== id);
    }
}

onMounted(() => {
    getWards();
});
</script>

<template>
    <div
        id="patients-card"
        class="w-[full] bg-white mx-[30px] mb-[30px] rounded-[10px]"
    >
        <h1 class="text-[18px] font-semibold mt-3">Wards</h1>

        <div class="grid grid-cols-1 mt-2 max-h-[700px] overflow-y-auto">
            <div
                class="grid grid-cols-9 border-b border-t border-gray-300 p-3 text-center items-center"
            >
                <p class="text-[16px] font-semibold">ID</p>
                <p class="text-[16px] font-semibold">Name</p>
                <p class="text-[16px] font-semibold">Type</p>
                <p class="text-[16px] font-semibold">Capacity</p>
                <p class="text-[16px] font-semibold">Occupied</p>
                <p class="text-[16px] font-semibold">Floor</p>
                <p class="text-[16px] font-semibold">Created At</p>
                <p class="text-[16px] font-semibold">Edit</p>
                <p class="text-[16px] font-semibold">Delete</p>
            </div>
            <ul>
                <li
                    v-for="(ward, index) in wards"
                    :key="ward.id"
                    class="grid grid-cols-9 border-b border-gray-200 p-3 text-center items-center hover:bg-gray-50"
                >
                    <p class="text-[14px]">{{ index + 1 }}</p>
                    <p class="text-[14px]">{{ ward.name }}</p>
                    <p class="text-[14px]">{{ ward.type }}</p>
                    <p class="text-[14px]">{{ ward.capacity }}</p>
                    <p class="text-[14px]">{{ ward.occupied }}</p>
                    <p class="text-[14px]">{{ ward.floor }}</p>
                    <p class="text-[14px]">
                        {{ new Date(ward.created_at).toLocaleDateString() }}
                    </p>
                    <div class="flex justify-center">
                    <router-link to="/editWard">
                    <button
                        class="bg-[#56D788] hover:bg-[#2cba62] text-[12px] font-medium py-1 rounded-md transition-colors duration-200 w-[70px]">
                        Edit
                    </button>
                    </router-link>
                    </div>
                    <div class="flex justify-center">
                    <button
                        class="bg-red-500 hover:bg-red-600 text-white text-[12px] font-medium py-1 rounded-md transition-colors duration-200 w-[70px]">
                        Delete
                    </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
