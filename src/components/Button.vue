<script setup>
defineProps(["text"]);
</script>

<template>
  <button
    class="mr-[50px] mt-[25px] text-[16px] font-semibold px-[15px] py-[10px] bg-[#56D788] rounded-[10px] hover:bg-[#2cba62] cursor-pointer"
  >
    {{ text }}
  </button>
</template>
