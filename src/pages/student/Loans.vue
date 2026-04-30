<script setup>
import { ref, onMounted } from "vue";
import { Clock, CheckCircle, AlertCircle } from "lucide-vue-next";
import { useAuth } from "../../composables/useAuth";
import { loanQueries, returnQueries } from "../../lib/database";

const { user } = useAuth();
const loans = ref([]);
const loading = ref(true);
const requestReturn = ref(null);

const fetchLoans = async () => {
    if (!user.value) return;
    loading.value = true;
    const { data, error } = await loanQueries.getByStudent(user.value.id);
    if (!error && data) {
        loans.value = data.map((loan) => {
            // Check if there is a pending return request
            const pendingReturn = loan.returns?.find(
                (r) => r.status === "pending",
            );
            if (pendingReturn) {
                return { ...loan, status: "return_requested" };
            }
            return loan;
        });
    } else if (error) {
        console.error("Error fetching loans:", error);
    }
    loading.value = false;
};

const initiateReturn = (loanId) => {
    requestReturn.value = loanId;
};

const submitReturnRequest = async () => {
    const loanId = requestReturn.value;
    if (!loanId) return;

    const { error } = await returnQueries.create({
        loan_id: loanId,
        return_date: new Date().toISOString(),
        status: "pending",
    });

    if (!error) {
        const loan = loans.value.find((l) => l.id === loanId);
        if (loan) {
            loan.status = "return_requested";
        }
        requestReturn.value = null;
    } else {
        console.error("Error creating return request:", error);
    }
};

const getStatusIcon = (status) => {
    if (status === "active") return Clock;
    if (status === "returned") return CheckCircle;
    if (status === "return_requested" || status === "pending")
        return AlertCircle;
    return Clock;
};

const getStatusColor = (status) => {
    if (status === "active") return "text-blue-600";
    if (status === "returned") return "text-green-600";
    if (status === "return_requested" || status === "pending")
        return "text-orange-600";
    return "text-gray-600";
};

const getStatusBgColor = (status) => {
    if (status === "active") return "bg-blue-50";
    if (status === "returned") return "bg-green-50";
    if (status === "return_requested" || status === "pending")
        "bg-orange-50";
    return "bg-gray-50";
};

const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const isOverdue = (dueDate) => {
    return getDaysUntilDue(dueDate) < 0;
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

onMounted(fetchLoans);
</script>

<template>
    <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
        <div class="mb-8">
            <h1
                class="text-4xl font-bold text-[#1c1917] mb-2"
                style="font-family: &quot;Playfair Display&quot;, serif"
            >
                My Loans
            </h1>
            <p class="text-[#78716c]">View and manage your book loans</p>
        </div>

        <!-- Active Loans -->
        <div class="grid gap-4">
            <div
                v-for="loan in loans"
                :key="loan.id"
                class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
            >
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <h3
                            class="text-lg font-semibold text-[#1c1917]"
                            style="
                                font-family:
                                    &quot;Playfair Display&quot;, serif;
                            "
                        >
                            {{ loan.book.title }}
                        </h3>
                        <p class="text-sm text-[#78716c] mt-2">
                            Issued: {{ formatDate(loan.loan_date) }}
                        </p>

                        <div v-if="loan.status === 'active'" class="mt-3">
                            <p
                                :class="
                                    isOverdue(loan.due_date)
                                        ? 'text-red-600 font-semibold'
                                        : 'text-[#78716c]'
                                "
                            >
                                Due: {{ formatDate(loan.due_date) }}
                                <span
                                    v-if="!isOverdue(loan.due_date)"
                                    class="text-sm"
                                    >({{ getDaysUntilDue(loan.due_date) }} days
                                    remaining)</span
                                >
                                <span v-else class="text-sm text-red-600">
                                    - OVERDUE!</span
                                >
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <span
                            :class="[
                                getStatusBgColor(loan.status),
                                getStatusColor(loan.status),
                            ]"
                            class="px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                        >
                            <component
                                :is="getStatusIcon(loan.status)"
                                class="w-4 h-4"
                            />
                            <span v-if="loan.status === 'active'">Active</span>
                            <span v-else-if="loan.status === 'returned'"
                                >Returned</span
                            >
                            <span v-else-if="loan.status === 'pending'"
                                >Pending Approval</span
                            >
                            <span v-else>Return Requested</span>
                        </span>

                        <div>
                            <button
                                v-if="
                                    loan.status === 'active' &&
                                    requestReturn !== loan.id
                                "
                                @click="initiateReturn(loan.id)"
                                class="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-[8px] transition-colors border border-blue-200 font-semibold text-sm"
                            >
                                Request Return
                            </button>

                            <div
                                v-else-if="requestReturn === loan.id"
                                class="flex gap-2"
                            >
                                <button
                                    @click="submitReturnRequest"
                                    class="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-[8px] transition-colors border border-green-200 font-semibold text-sm"
                                >
                                    Confirm
                                </button>
                                <button
                                    @click="requestReturn = null"
                                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-[8px] transition-colors font-semibold text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" class="text-center py-12">
            <p class="text-[#78716c]">Loading loans...</p>
        </div>
        <div v-else-if="loans.length === 0" class="text-center py-12">
            <p class="text-[#78716c]">You don't have any loans yet</p>
        </div>
    </div>
</template>

<style scoped></style>
