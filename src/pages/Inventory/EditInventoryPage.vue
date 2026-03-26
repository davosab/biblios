<script setup>
import Button from '../../components/Button.vue';
import FormInput from '../../components/FormInput.vue';
import ReadInput from '../../components/ReadInput.vue';
</script>

<template>
    <div class="ml-[200px]">
        <h1 class="text-center text-[22px] font-medium pt-[100px]">Edit Item</h1>
        <div>
            <form submit.prevent class="w-full flex justify-center items-center flex-col">
                <ReadInput model="inventoryId" labelText="ID" />
                <FormInput model="inventoryName" labelText="Name" />
                <FormInput model="inventoryCategory" labelText="Category" />
                <FormInput model="inventoryUnit" inputType="number" labelText="Unit" />
                <FormInput model="inventoryAlertAmount" labelText="Alert at" />
                <FormInput model="inventorySupplier" labelText="Supplier" />
                <FormInput model="updatedAt" inputType="date" labelText="Updated At" />
                

                <div>
                    <router-link to="/inventory">
                    <Button text="Edit Inventory" />
                    </router-link>
                    <router-link to="/inventory">
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