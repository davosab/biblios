<script setup>
import Button from "../../components/Button.vue";
import FormInput from "../../components/FormInput.vue";
import ReadInput from "../../components/ReadInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../lib/supabaseClient.js";

const router = useRouter();

const name = ref("");
const category = ref("");
const quantity = ref("");
const unit = ref("");
const alertAt = ref("");
const supplier = ref("");
const errorMessage = ref("");
const loading = ref(false);

async function handleSubmit() {
    errorMessage.value = "";
    loading.value = true;

    const { error } = await supabase.from("inventory").insert({
        name: name.value,
        category: category.value,
        quantity: Number(quantity.value),
        unit: unit.value,
        low_stock_threshold: Number(alertAt.value),
        supplier: supplier.value,
    });

    loading.value = false;

    if (error) {
        errorMessage.value = error.message;
    } else {
        router.push("/inventory");
    }
}
</script>

<template>
    <div class="ml-[200px]">
        <h1 class="text-center text-[22px] font-medium pt-[100px]">
            Add new Item
        </h1>
        <div>
            <form
                @submit.prevent="handleSubmit"
                class="w-full flex justify-center items-center flex-col"
            >
                <ReadInput v-model="inventoryId" labelText="ID" />
                <FormInput v-model="name" labelText="Name" />
                <FormInput v-model="category" labelText="Category" />
                <FormInput
                    v-model="quantity"
                    inputType="number"
                    labelText="Quantity"
                />
                <FormInput v-model="unit" labelText="Unit" />
                <FormInput
                    v-model="alertAt"
                    inputType="number"
                    labelText="Alert at"
                />
                <FormInput v-model="supplier" labelText="Supplier" />
                <FormInput
                    v-model="updatedAt"
                    inputType="date"
                    labelText="Updated At"
                />

                <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
                    {{ errorMessage }}
                </p>

                <div>
                    <Button
                        type="submit"
                        :disabled="loading"
                        text="Add in Inventory"
                    />

                    <router-link to="/inventory">
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
