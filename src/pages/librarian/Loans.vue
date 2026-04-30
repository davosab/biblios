<script setup>
import { ref } from 'vue';
import { CheckCircle, Clock } from 'lucide-vue-next';

const loans = ref([
  { id: 1, studentName: 'John Doe', bookTitle: 'The Great Gatsby', dueDate: '2026-05-15', status: 'active', issuedDate: '2026-04-15' },
  { id: 2, studentName: 'Jane Smith', bookTitle: '1984', dueDate: '2026-05-20', status: 'active', issuedDate: '2026-04-20' },
  { id: 3, studentName: 'Mike Johnson', bookTitle: 'To Kill a Mockingbird', dueDate: '2026-05-10', status: 'returned', issuedDate: '2026-04-10' },
]);

const issueLoan = ref(false);
const newLoan = ref({ studentName: '', bookTitle: '', daysToReturn: 30 });

const issueLoanToStudent = () => {
  if (newLoan.value.studentName && newLoan.value.bookTitle) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + parseInt(newLoan.value.daysToReturn));
    
    loans.value.push({
      id: Math.max(...loans.value.map(l => l.id), 0) + 1,
      studentName: newLoan.value.studentName,
      bookTitle: newLoan.value.bookTitle,
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'active',
      issuedDate: new Date().toISOString().split('T')[0]
    });
    
    newLoan.value = { studentName: '', bookTitle: '', daysToReturn: 30 };
    issueLoan.value = false;
  }
};

const getStatusColor = (status) => {
  return status === 'active' ? 'text-blue-600' : 'text-green-600';
};

const getStatusBgColor = (status) => {
  return status === 'active' ? 'bg-blue-50' : 'bg-green-50';
};
</script>

<template>
  <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-4xl font-bold text-[#1c1917] mb-2" style="font-family: 'Playfair Display', serif;">Manage Loans</h1>
        <p class="text-[#78716c]">Issue loans and view loan history</p>
      </div>
      <button
        @click="issueLoan = !issueLoan"
        class="bg-[#b45309] hover:bg-[#92410d] text-white px-4 py-2 rounded-[8px] transition-colors"
      >
        + Issue Loan
      </button>
    </div>

    <!-- Issue Loan Form -->
    <div v-if="issueLoan" class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] mb-6">
      <h3 class="text-lg font-semibold text-[#1c1917] mb-4">Issue New Loan</h3>
      <div class="grid grid-cols-3 gap-4">
        <input
          v-model="newLoan.studentName"
          type="text"
          placeholder="Student Name"
          class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309]"
        />
        <input
          v-model="newLoan.bookTitle"
          type="text"
          placeholder="Book Title"
          class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309]"
        />
        <input
          v-model.number="newLoan.daysToReturn"
          type="number"
          placeholder="Days to Return"
          min="1"
          class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309]"
        />
      </div>
      <div class="flex gap-3 mt-4">
        <button
          @click="issueLoanToStudent"
          class="bg-[#b45309] hover:bg-[#92410d] text-white px-4 py-2 rounded-[8px] transition-colors"
        >
          Issue
        </button>
        <button
          @click="issueLoan = false"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-[8px] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Loans Table -->
    <div class="bg-white rounded-[12px] overflow-hidden border-1.5 border-[#e4ddd4]">
      <table class="w-full">
        <thead class="bg-[#fef3c7] border-b border-[#e4ddd4]">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]">Student</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]">Book</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]">Issued</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]">Due Date</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loans" :key="loan.id" class="border-b border-[#e4ddd4] hover:bg-[#f7f4ef] transition-colors">
            <td class="px-6 py-3 text-[#1c1917] font-semibold">{{ loan.studentName }}</td>
            <td class="px-6 py-3 text-[#78716c]">{{ loan.bookTitle }}</td>
            <td class="px-6 py-3 text-[#78716c]">{{ loan.issuedDate }}</td>
            <td class="px-6 py-3 text-[#78716c]">{{ loan.dueDate }}</td>
            <td class="px-6 py-3">
              <span :class="[getStatusBgColor(loan.status), getStatusColor(loan.status)]" class="px-3 py-1 rounded-full text-sm font-semibold">
                {{ loan.status.charAt(0).toUpperCase() + loan.status.slice(1) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
