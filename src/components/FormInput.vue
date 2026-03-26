<script setup>
const props = defineProps({
    modelValue: String,
    labelText: String,
    inputType: String,
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="flex flex-col">
        <label>{{ labelText }}</label>
        <input
            :value="modelValue"
            :type="inputType"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-[600px] h-[30px] border-1 rounded-md border-gray-400"
        />
    </div>
</template>
