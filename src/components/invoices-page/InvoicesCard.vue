<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "/src/lib/supabaseClient";

// array that will contain objects with database records
const invoices = ref([]);

// querry from supabase database
async function getInvoices() {
    const { data } = await supabase.from("invoices").select("*");
    invoices.value = data;
}

async function deleteInvoice(id) {
    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (error) {
        console.error(error.message);
    } else {
        invoices.value = invoices.value.filter((invoice) => invoice.id !== id);
    }
}

onMounted(() => {
    getInvoices();
});
</script>

<template>
    <div
        id="patients-card"
        class="w-[full] bg-white mx-[30px] mb-[30px] rounded-[10px]"
    >
        <h1 class="text-[18px] font-semibold mt-3">Invoices</h1>

        <div class="grid grid-cols-1 mt-2 max-h-[700px] overflow-y-auto">
            <div
                class="grid grid-cols-8 border-b border-t border-gray-300 p-3 text-center items-center"
            >
                <p class="text-[16px] font-semibold">ID</p>
                <p class="text-[16px] font-semibold">Patient ID</p>
                <p class="text-[16px] font-semibold">Total Amount</p>
                <p class="text-[16px] font-semibold">Status</p>
                <p class="text-[16px] font-semibold">Issued at</p>
                <p class="text-[16px] font-semibold">Paid at</p>
                <p class="text-[16px] font-semibold">Edit</p>
                <p class="text-[16px] font-semibold">Delete</p>
            </div>
            <ul>
                <li
                    v-for="(invoice, index) in invoices"
                    :key="invoice.id"
                    class="grid grid-cols-8 border-b border-gray-200 p-3 text-center items-center hover:bg-gray-50"
                >
                    <p class="text-[14px]">{{ index + 1 }}</p>
                    <p class="text-[14px]">{{ invoice.patient_id }}</p>
                    <p class="text-[14px]">{{ invoice.total_amount }}</p>
                    <p class="text-[14px]">{{ invoice.status }}</p>
                    <p class="text-[14px]">
                        {{ new Date(invoice.issued_at).toLocaleDateString() }}
                    </p>
                    <p class="text-[14px]">
                        {{ new Date(invoice.paid_at).toLocaleDateString() }}
                    </p>
                    <div class="flex justify-center">
                        <router-link to="/editInvoice">
                            <button
                                class="bg-[#56D788] hover:bg-[#2cba62] text-[12px] font-medium py-1 rounded-md transition-colors duration-200 w-[70px]"
                            >
                                Edit
                            </button>
                        </router-link>
                    </div>
                    <div class="flex justify-center">
                        <button
                            @click="deleteInvoice(invoice.id)"
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
