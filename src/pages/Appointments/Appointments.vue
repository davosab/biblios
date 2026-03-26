   <script setup>
import AppointmentsCard from '../../components/appointments-page/AppointmentsCard.vue';
import Button from '../../components/Button.vue';
</script>
<template> 
<div class="ml-[200px] h-full" >
    <div class="flex justify-self-end">
        <router-link to="/addAppointment">
        <Button text="New Appointment" />
        </router-link>
    </div>

    <div class="w-full h-full">
        <AppointmentsCard/>
    </div>
</div>
</template>
 

