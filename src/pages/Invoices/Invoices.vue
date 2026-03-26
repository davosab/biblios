<script setup>
import Button from '../../components/Button.vue';
import InvoicesCard from '../../components/invoices-page/InvoicesCard.vue';
import router from '../../router/router';
</script>
<template> 
    <div class="ml-[200px] h-full" >
    <div class="flex justify-self-end">
        <router-link to="/addInvoice">
        <Button text="New Invoice" />
        </router-link>
    </div>

    <div class="w-full h-full">
        <InvoicesCard />
    </div>
</div>
</template>