<script setup>
import FormInput from '../../components/FormInput.vue';



</script>

<template>
    <div class="ml-[200px]">
        <h1 class="text-center text-[22px] font-medium pt-[100px]">
            Edit Patient
        </h1>
        <div>
            <form
                @submit.prevent="handleSubmit"
                class="w-full flex justify-center items-center flex-col"
            >
                <div class="flex flex-col">
                    <label>ID</label>
                    <input
                        v-model="id"
                        type="number"
                        readonly
                        class="w-[600px] h-[30px] border-1 rounded-md border-gray-400"
                    />
                </div>
                <FormInput
                    v-model="firstName"
                    inputType="text"
                    labelText="First Name"
                />
                <FormInput
                    v-model="lastName"
                    inputType="text"
                    labelText="Last Name"
                />
                <FormInput v-model="cnp" inputType="number" labelText="CNP" />
                <FormInput
                    v-model="dateOfBirth"
                    inputType="date"
                    labelText="Date of Birth"
                />
                <div class="flex flex-col">
                    <label>Gender</label>
                    <select
                        v-model="gender"
                        class="w-[600px] h-[30px] border-1 rounded-md border-gray-400"
                    >
                        <option>M</option>
                        <option>F</option>
                        <option>Mekanik</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <label>Status</label>
                    <select
                        v-model="status"
                        class="w-[600px] h-[30px] border-1 rounded-md border-gray-400"
                    >
                        <option>admitted</option>
                        <option>discharged</option>
                    </select>
                </div>

                <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
                    {{ errorMessage }}
                </p>

                <div>
                    <button type="submit" :disabled="loading">
                        <Button
                            :text="loading ? 'Saving...' : 'Edit new Patient'"
                        />
                    </button>

                    <router-link to="/patients">
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