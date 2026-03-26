<script setup>
import Button from "../components/Button.vue";
import InventoryCard from "../components/inventory-page/InventoryCard.vue";
// import
</script>

<template>
  <div class="ml-[200px] h-full">
    <div class="flex justify-self-end">
      <Button text="Add new item" />
    </div>

    <div class="w-full h-full">
      <InventoryCard />
    </div>
  </div>
</template>
