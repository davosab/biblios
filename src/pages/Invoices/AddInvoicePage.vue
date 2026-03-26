<script setup>
import Button from "../../components/Button.vue";
import FormInput from "../../components/FormInput.vue";
import ReadInput from "../../components/ReadInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../lib/supabaseClient.js";

const router = useRouter();

const patientId = ref("");
const totalAmount = ref("");
const status = ref("");
const issuedAt = ref("");
const paidAt = ref("");
const errorMessage = ref("");
const loading = ref(false);

async function handleSubmit() {
    errorMessage.value = "";
    loading.value = true;

    const { error } = await supabase.from("invoices").insert({
        patient_id: patientId.value || null,
        total_amount: Number(totalAmount.value) || null,
        status: status.value,
        issued_at: issuedAt.value || null,
        paid_at: paidAt.value || null,
    });

    loading.value = false;

    if (error) {
        errorMessage.value = error.message;
    } else {
        router.push("/invoices");
    }
}
</script>

<template>
    <div class="ml-[200px]">
        <h1 class="text-center text-[22px] font-medium pt-[100px]">
            Add new Invoice
        </h1>
        <div>
            <form
                @submit.prevent="handleSubmit"
                class="w-full flex justify-center items-center flex-col"
            >
                <!-- <ReadInput v-model="invoiceId" labelText="ID" /> -->
                <FormInput v-model="patientId" labelText="Patient ID" />
                <FormInput
                    v-model="totalAmount"
                    inputType="number"
                    labelText="Total Amount"
                />
                <!-- <FormInput v-model="status" labelText="Status" /> -->
                <div class="flex flex-col">
                    <label>Status</label>
                    <select
                        v-model="status"
                        class="w-[600px] h-[30px] border-1 rounded-md border-gray-400"
                    >
                        <option>pending</option>
                        <option>paid</option>
                        <option>cancelled</option>
                    </select>
                </div>
                <FormInput
                    v-model="issuedAt"
                    inputType="date"
                    labelText="Issued At"
                />
                <FormInput
                    v-model="paidAt"
                    inputType="date"
                    labelText="Paid At"
                />

                <div>
                    <Button
                        type="submit"
                        :disabled="loading"
                        text="Add Invoice"
                    />

                    <router-link to="/invoices">
                        <button
                            type="button"
                            class="mr-[50px] mt-[25px] text-[16px] font-semibold px-[15px] py-[10px] bg-[#ff4444] rounded-[10px] hover:bg-[#ff3333] cursor-pointer"
                        >
                            Cancel
                        </button>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>
