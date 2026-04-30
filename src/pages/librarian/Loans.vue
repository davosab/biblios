<script setup>
import { ref, onMounted } from "vue";
import { CheckCircle, Clock, Plus, Trash2 } from "lucide-vue-next";
import { loanQueries, bookQueries, studentQueries } from "../../lib/database";
import { useAuth } from "../../composables/useAuth";

const { user } = useAuth();
const loans = ref([]);
const pendingRequests = ref([]);
const books = ref([]);
const students = ref([]);
const loading = ref(true);
const issueLoan = ref(false);

const newLoan = ref({
    studentId: "",
    bookId: "",
    daysToReturn: 14,
});

const fetchAll = async () => {
    loading.value = true;
    const [loansRes, requestsRes, booksRes, studentsRes] = await Promise.all([
        loanQueries.getAll(),
        loanQueries.getPending(),
        bookQueries.getAll(),
        studentQueries.getApproved(),
    ]);

    if (!loansRes.error) loans.value = loansRes.data;
    if (!requestsRes.error) pendingRequests.value = requestsRes.data;
    if (!booksRes.error) books.value = booksRes.data;
    if (!studentsRes.error) students.value = studentsRes.data;

    loading.value = false;
};

const issueLoanToStudent = async () => {
    if (!user.value || !newLoan.value.studentId || !newLoan.value.bookId)
        return;

    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(loanDate.getDate() + newLoan.value.daysToReturn);

    const { error } = await loanQueries.create({
        student_id: newLoan.value.studentId,
        book_id: newLoan.value.bookId,
        issued_by: user.value.id,
        loan_date: loanDate.toISOString(),
        due_date: dueDate.toISOString(),
        status: "Active",
    });

    if (!error) {
        issueLoan.value = false;
        newLoan.value = { studentId: "", bookId: "", daysToReturn: 14 };
        fetchAll();
    } else {
        console.error("Error issuing loan:", error);
    }
};

const approveRequest = async (request) => {
    if (!user.value) return;

    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(loanDate.getDate() + 14); // Default 14 days

    const { error } = await loanQueries.update(request.id, {
        issued_by: user.value.id,
        loan_date: loanDate.toISOString(),
        due_date: dueDate.toISOString(),
        status: "Active",
    });

    if (!error) {
        fetchAll();
    } else {
        console.error("Error approving request:", error);
    }
};

const rejectRequest = async (id) => {
    const { error } = await loanQueries.delete(id);
    if (!error) {
        fetchAll();
    } else {
        console.error("Error rejecting request:", error);
    }
};

const getStatusColor = (status) => {
    return status === "Active"
        ? "text-blue-600"
        : status === "Returned"
          ? "text-green-600"
          : "text-red-600";
};

const getStatusBgColor = (status) => {
    return status === "Active"
        ? "bg-blue-50"
        : status === "Returned"
          ? "bg-green-50"
          : "bg-red-50";
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

onMounted(fetchAll);
</script>

<template>
    <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
        <div class="flex justify-between items-start mb-8">
            <div>
                <h1
                    class="text-4xl font-bold text-[#1c1917] mb-2"
                    style="font-family: &quot;Playfair Display&quot;, serif"
                >
                    Manage Loans
                </h1>
                <p class="text-[#78716c]">Issue loans and view loan history</p>
            </div>
            <button
                @click="issueLoan = !issueLoan"
                class="bg-[#b45309] hover:bg-[#92410d] text-white px-4 py-2 rounded-[8px] transition-colors flex items-center gap-2"
            >
                <Plus class="w-4 h-4" />
                Issue Loan
            </button>
        </div>

        <!-- Issue Loan Form -->
        <div
            v-if="issueLoan"
            class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] mb-6 shadow-sm"
        >
            <h3 class="text-lg font-semibold text-[#1c1917] mb-4">
                Issue New Loan
            </h3>
            <div class="grid grid-cols-3 gap-4">
                <select
                    v-model="newLoan.studentId"
                    class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309] bg-white"
                >
                    <option value="" disabled>Select Student</option>
                    <option v-for="s in students" :key="s.id" :value="s.id">
                        {{ s.first_name }} {{ s.last_name }}
                    </option>
                </select>
                <select
                    v-model="newLoan.bookId"
                    class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309] bg-white"
                >
                    <option value="" disabled>Select Book</option>
                    <option v-for="b in books" :key="b.id" :value="b.id">
                        {{ b.title }} ({{ b.available_copies }} left)
                    </option>
                </select>
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
                    class="bg-[#b45309] hover:bg-[#92410d] text-white px-4 py-2 rounded-[8px] transition-colors font-semibold"
                >
                    Issue Loan
                </button>
                <button
                    @click="issueLoan = false"
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-[8px] transition-colors font-semibold"
                >
                    Cancel
                </button>
            </div>
        </div>

        <!-- Pending Requests Section -->
        <div v-if="pendingRequests.length > 0" class="mb-10">
            <h2
                class="text-xl font-bold text-[#1c1917] mb-4"
                style="font-family: &quot;Playfair Display&quot;, serif"
            >
                Pending Loan Requests
            </h2>
            <div class="grid gap-4">
                <div
                    v-for="req in pendingRequests"
                    :key="req.id"
                    class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] shadow-sm"
                >
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-[#1c1917]">
                                {{ req.book.title }}
                            </h3>
                            <p class="text-sm text-[#78716c]">
                                Requested by: {{ req.student.first_name }}
                                {{ req.student.last_name }}
                            </p>
                            <p class="text-xs text-[#78716c] mt-1">
                                Requested on: {{ formatDate(req.loan_date) }}
                            </p>
                        </div>
                        <div class="flex gap-3">
                            <button
                                @click="approveRequest(req)"
                                class="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-[8px] transition-colors border border-green-200 font-semibold text-sm flex items-center gap-2"
                            >
                                <CheckCircle class="w-4 h-4" />
                                Approve
                            </button>
                            <button
                                @click="rejectRequest(req.id)"
                                class="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-[8px] transition-colors border border-red-200 font-semibold text-sm flex items-center gap-2"
                            >
                                <Trash2 class="w-4 h-4" />
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-8 border-[#e4ddd4]" />
        </div>

        <!-- Loans Table -->
        <h2
            class="text-xl font-bold text-[#1c1917] mb-4"
            style="font-family: &quot;Playfair Display&quot;, serif"
        >
            Loan History & Active Loans
        </h2>
        <div
            class="bg-white rounded-[12px] overflow-hidden border-1.5 border-[#e4ddd4] shadow-sm"
        >
            <table class="w-full">
                <thead class="bg-[#fef3c7] border-b border-[#e4ddd4]">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Student
                        </th>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Book
                        </th>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Issued
                        </th>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Due Date
                        </th>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="loan in loans"
                        :key="loan.id"
                        class="border-b border-[#e4ddd4] hover:bg-[#f7f4ef] transition-colors"
                    >
                        <td class="px-6 py-3 text-[#1c1917] font-semibold">
                            {{ loan.student?.first_name }}
                            {{ loan.student?.last_name }}
                        </td>
                        <td class="px-6 py-3 text-[#78716c]">
                            {{ loan.book?.title }}
                        </td>
                        <td class="px-6 py-3 text-[#78716c]">
                            {{ formatDate(loan.loan_date) }}
                        </td>
                        <td class="px-6 py-3 text-[#78716c]">
                            {{ formatDate(loan.due_date) }}
                        </td>
                        <td class="px-6 py-3">
                            <span
                                :class="[
                                    getStatusBgColor(loan.status),
                                    getStatusColor(loan.status),
                                ]"
                                class="px-3 py-1 rounded-full text-sm font-semibold"
                            >
                                {{
                                    loan.status.charAt(0).toUpperCase() +
                                    loan.status.slice(1)
                                }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="loans.length === 0 && !loading" class="text-center py-8">
                <p class="text-[#78716c]">No loans recorded yet.</p>
            </div>
        </div>

        <div v-if="loading" class="text-center py-12">
            <p class="text-[#78716c]">Loading loan data...</p>
        </div>
    </div>
</template>

<style scoped></style>
