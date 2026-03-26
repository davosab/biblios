<script setup>
    const props = defineProps ({
        labelText:String,
        model:String
    })
</script>

<template>
<div class="flex flex-col">
    <label>{{ labelText }}</label>
    <input :v-model=model type=number readonly
        class=" w-[600px] h-[30px] border-1 rounded-md border-gray-400">
    </div>
</template>