<script setup>
import Button from '../../components/Button.vue';
import FormInput from '../../components/FormInput.vue';
import ReadInput from '../../components/ReadInput.vue';
</script>

<template>
    <div class="ml-[200px]">
        <h1 class="text-center text-[22px] font-medium pt-[100px]">Edit Invoice</h1>
        <div>
            <form submit.prevent class="w-full flex justify-center items-center flex-col">
                <ReadInput model="invoiceId" labelText="ID" />
                <FormInput model="patientId" labelText="Patient ID" />
                <FormInput model="invoiceAmount"  inputType="number" labelText="Total Amount" />
                <FormInput model="invoiceStatus" labelText="Status" />
                <FormInput model="invoiceIssuedAt" inputType="date" labelText="Issued At" />
                <FormInput model="invoicePaidAt" inputType="date" labelText="Paid At" />                

                <div>
                    <router-link to="/invoices">
                    <Button text="Edit Invoice" />
                    </router-link>
                    <router-link to="/invoices">
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