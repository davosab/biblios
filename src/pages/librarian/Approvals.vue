<script setup>
import { ref } from 'vue';
import { CheckCircle, XCircle } from 'lucide-vue-next';

const pendingApprovals = ref([
  { id: 1, studentName: 'John Doe', studentEmail: 'john@example.com', status: 'pending' },
  { id: 2, studentName: 'Jane Smith', studentEmail: 'jane@example.com', status: 'pending' },
  { id: 3, studentName: 'Mike Johnson', studentEmail: 'mike@example.com', status: 'pending' },
]);

const approveStudent = (id) => {
  const approval = pendingApprovals.value.find(a => a.id === id);
  if (approval) {
    approval.status = 'approved';
  }
};

const rejectStudent = (id) => {
  const approval = pendingApprovals.value.find(a => a.id === id);
  if (approval) {
    approval.status = 'rejected';
  }
};
</script>

<template>
  <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#1c1917] mb-2" style="font-family: 'Playfair Display', serif;">Student Approvals</h1>
      <p class="text-[#78716c]">Approve or reject student account requests</p>
    </div>

    <div class="grid gap-4">
      <div v-for="approval in pendingApprovals" :key="approval.id" class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-[#1c1917]" style="font-family: 'Playfair Display', serif;">{{ approval.studentName }}</h3>
            <p class="text-sm text-[#78716c]">{{ approval.studentEmail }}</p>
          </div>
          <div v-if="approval.status === 'pending'" class="flex gap-3">
            <button
              @click="approveStudent(approval.id)"
              class="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-[8px] transition-colors border border-green-200"
            >
              <CheckCircle class="w-4 h-4" />
              Approve
            </button>
            <button
              @click="rejectStudent(approval.id)"
              class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-[8px] transition-colors border border-red-200"
            >
              <XCircle class="w-4 h-4" />
              Reject
            </button>
          </div>
          <div v-else :class="approval.status === 'approved' ? 'text-green-700' : 'text-red-700'" class="font-semibold text-sm">
            {{ approval.status.charAt(0).toUpperCase() + approval.status.slice(1) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
