<script setup>
import Button from '../../components/Button.vue';
import FormInput from '../../components/FormInput.vue';
import ReadInput from '../../components/ReadInput.vue';
</script>

<template>
    <div class="ml-[200px]">
        <h1 class="text-center text-[22px] font-medium pt-[100px]">Edit Appointment</h1>
        <div>
            <form submit.prevent class="w-full flex justify-center items-center flex-col">
                <ReadInput model="appointmentId" labelText="ID" />
                <ReadInput model="patientId" labelText="Patient ID" />
                <ReadInput model="doctorId" labelText="Doctor ID" />
                <FormInput model="scheduledAt" inputType="date" labelText="Scheduled At" />
                <div class="flex flex-col">
                    <labeL>Status</labeL>
                    <select class="w-[600px] h-[30px] border-1 rounded-md border-gray-400">
                        <option>Scheduled</option>
                        <option>Completed</option>
                        <option>Canceled</option>
                    </select>
                </div>

                  <FormInput
                    v-model="notes"
                    labelText="Notes"
                />

                <div class="flex flex-col">
                    <labeL>Reminder Sent</labeL>
                    <select class="w-[600px] h-[30px] border-1 rounded-md border-gray-400">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <FormInput model="createdAt" inputType="date" labelText="Created At" />
                

                <div>
                    <router-link to="/appointments">
                    <Button text="Save Changes" />
                    </router-link>
                    <router-link to="/appointments">
                        <button
                            class="mr-[50px] mt-[25px] text-[16px] font-semibold px-[15px] py-[10px] bg-[#ff4444] rounded-[10px] hover:bg-[#ff3333] cursor-pointer">
                            Cancel
                        </button>
                    </router-link>

                </div>


            </form>

        </div>
    </div>
</template>