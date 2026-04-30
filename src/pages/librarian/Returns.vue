<script setup>
import { ref } from 'vue';
import { CheckCircle, Clock, AlertCircle } from 'lucide-vue-next';

const returns = ref([
  { id: 1, studentName: 'Alice Brown', bookTitle: 'The Great Gatsby', requestedDate: '2026-04-28', status: 'pending' },
  { id: 2, studentName: 'Bob Wilson', bookTitle: 'Brave New World', requestedDate: '2026-04-25', status: 'pending' },
  { id: 3, studentName: 'Charlie Davis', bookTitle: 'The Catcher in the Rye', returnedDate: '2026-04-27', status: 'completed' },
]);

const approveReturn = (id) => {
  const returnRequest = returns.value.find(r => r.id === id);
  if (returnRequest) {
    returnRequest.status = 'completed';
    returnRequest.returnedDate = new Date().toISOString().split('T')[0];
  }
};

const getStatusIcon = (status) => {
  if (status === 'pending') return Clock;
  if (status === 'completed') return CheckCircle;
  return AlertCircle;
};

const getStatusColor = (status) => {
  if (status === 'pending') return 'text-orange-600';
  if (status === 'completed') return 'text-green-600';
  return 'text-red-600';
};

const getStatusBgColor = (status) => {
  if (status === 'pending') return 'bg-orange-50';
  if (status === 'completed') return 'bg-green-50';
  return 'bg-red-50';
};
</script>

<template>
  <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#1c1917] mb-2" style="font-family: 'Playfair Display', serif;">Process Returns</h1>
      <p class="text-[#78716c]">Approve book return requests from students</p>
    </div>

    <!-- Return Requests -->
    <div class="grid gap-4">
      <div v-for="returnReq in returns" :key="returnReq.id" class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-[#1c1917]" style="font-family: 'Playfair Display', serif;">{{ returnReq.bookTitle }}</h3>
            <p class="text-sm text-[#78716c]">Student: {{ returnReq.studentName }}</p>
            <p class="text-xs text-[#78716c] mt-1">
              Requested: {{ returnReq.requestedDate }}
              <span v-if="returnReq.returnedDate">, Returned: {{ returnReq.returnedDate }}</span>
            </p>
          </div>
          <div class="flex items-center gap-4">
            <span :class="[getStatusBgColor(returnReq.status), getStatusColor(returnReq.status)]" class="px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <component :is="getStatusIcon(returnReq.status)" class="w-4 h-4" />
              {{ returnReq.status.charAt(0).toUpperCase() + returnReq.status.slice(1) }}
            </span>
            <button
              v-if="returnReq.status === 'pending'"
              @click="approveReturn(returnReq.id)"
              class="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-[8px] transition-colors border border-green-200 font-semibold text-sm"
            >
              <CheckCircle class="w-4 h-4 inline mr-1" />
              Approve Return
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="returns.length === 0" class="text-center py-12">
      <p class="text-[#78716c]">No return requests at the moment</p>
    </div>
  </div>
</template>

<style scoped>
</style>
