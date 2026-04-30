<script setup>
import SideBar from './components/SideBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div>
    <SideBar v-if="!['/login', '/register'].includes(route.path)"/>
    <router-view />
    </div>
</template>

<style scoped>
@import "tailwindcss";
</style>
