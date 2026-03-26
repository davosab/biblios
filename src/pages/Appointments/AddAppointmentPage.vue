<script setup>
import Button from "../../components/Button.vue";
import FormInput from "../../components/FormInput.vue";
import ReadInput from "../../components/ReadInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../lib/supabaseClient.js";

const router = useRouter();

const scheduledAt = ref("");
const status = ref("");
const reminderSent = ref("");
const createdAt = ref("");
const errorMessage = ref("");
const loading = ref(false);

async function handleSubmit() {
    errorMessage.value = "";
    loading.value = true;

    const { error } = await supabase.from("appointments").insert({
        scheduled_at: scheduledAt.value,
        status: status.value,
        reminder_sent: reminderSent.value,
        created_at: createdAt.value,
    });

    loading.value = false;

    if (error) {
        errorMessage.value = error.message;
    } else {
        router.push("/appointments");
    }
}
</script>

<template>
    <div class="ml-[200px]">
        <h1 class="text-center text-[22px] font-medium pt-[100px]">
            Add new Appointment
        </h1>
        <div>
            <form
                @submit.prevent="handleSubmit"
                class="w-full flex justify-center items-center flex-col"
            >
                <ReadInput v-model="appointmentId" labelText="ID" />
                <ReadInput v-model="patientId" labelText="Patient ID" />
                <ReadInput v-model="doctorId" labelText="Doctor ID" />
                <FormInput
                    v-model="scheduledAt"
                    inputType="date"
                    labelText="Scheduled At"
                />
                <div class="flex flex-col">
                    <label>Status</label>
                    <select
                        v-model="status"
                        class="w-[600px] h-[30px] border-1 rounded-md border-gray-400"
                    >
                        <option>scheduled</option>
                        <option>completed</option>
                        <option>cancelled</option>
                    </select>
                </div>

                 <FormInput
                    v-model="notes"
                    labelText="Notes"
                />

                <div class="flex flex-col">
                    <label>Reminder Sent</label>
                    <select
                        v-model="reminderSent"
                        class="w-[600px] h-[30px] border-1 rounded-md border-gray-400"
                    >
                        <option>TRUE</option>
                        <option>FALSE</option>
                    </select>
                </div>

                <FormInput
                    v-model="createdAt"
                    inputType="date"
                    labelText="Created At"
                />

                <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
                    {{ errorMessage }}
                </p>

                <div>
                    <Button
                        type="submit"
                        :disabled="loading"
                        :text="loading ? 'Saving...' : 'Add new Appointment'"
                    />

                    <router-link to="/appointments">
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
