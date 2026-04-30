<script setup>
import { ref, onMounted } from "vue";
import { CheckCircle, Clock, AlertCircle } from "lucide-vue-next";
import { returnQueries } from "../../lib/database";
import { useAuth } from "../../composables/useAuth";

const { user } = useAuth();
const returns = ref([]);
const loading = ref(true);

const fetchReturns = async () => {
    loading.value = true;
    const { data, error } = await returnQueries.getPending();
    if (!error && data) {
        returns.value = data;
    } else if (error) {
        console.error("Error fetching returns:", error);
    }
    loading.value = false;
};

const approveReturn = async (returnId) => {
    if (!user.value) return;
    const { error } = await returnQueries.approve(returnId, user.value.id);
    if (!error) {
        returns.value = returns.value.filter((r) => r.id !== returnId);
    } else {
        console.error("Error approving return:", error);
    }
};

const getStatusIcon = (status) => {
    if (status === "Pending") return Clock;
    if (status === "Approved") return CheckCircle;
    return AlertCircle;
};

const getStatusColor = (status) => {
    if (status === "Pending") return "text-orange-600";
    if (status === "Approved") return "text-green-600";
    return "text-red-600";
};

const getStatusBgColor = (status) => {
    if (status === "Pending") return "bg-orange-50";
    if (status === "Approved") return "bg-green-50";
    return "bg-red-50";
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

onMounted(fetchReturns);
</script>

<template>
    <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
        <div class="mb-8">
            <h1
                class="text-4xl font-bold text-[#1c1917] mb-2"
                style="font-family: &quot;Playfair Display&quot;, serif"
            >
                Process Returns
            </h1>
            <p class="text-[#78716c]">
                Approve book return requests from students
            </p>
        </div>

        <!-- Return Requests -->
        <div class="grid gap-4">
            <div
                v-for="returnReq in returns"
                :key="returnReq.id"
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
                            {{ returnReq.loan.book.title }}
                        </h3>
                        <p class="text-sm text-[#78716c]">
                            Student: {{ returnReq.loan.student.first_name }}
                            {{ returnReq.loan.student.last_name }}
                        </p>
                        <p class="text-xs text-[#78716c] mt-1">
                            Requested: {{ formatDate(returnReq.return_date) }}
                            <span v-if="returnReq.reviewed_at"
                                >, Approved:
                                {{ formatDate(returnReq.reviewed_at) }}</span
                            >
                        </p>
                    </div>
                    <div class="flex items-center gap-4">
                        <span
                            :class="[
                                getStatusBgColor(returnReq.status),
                                getStatusColor(returnReq.status),
                            ]"
                            class="px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                        >
                            <component
                                :is="getStatusIcon(returnReq.status)"
                                class="w-4 h-4"
                            />
                            {{
                                returnReq.status.charAt(0).toUpperCase() +
                                returnReq.status.slice(1)
                            }}
                        </span>
                        <button
                            v-if="returnReq.status === 'Pending'"
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

        <div v-if="loading" class="text-center py-12">
            <p class="text-[#78716c]">Loading returns...</p>
        </div>
        <div v-else-if="returns.length === 0" class="text-center py-12">
            <p class="text-[#78716c]">No return requests at the moment</p>
        </div>
    </div>
</template>

<style scoped></style>
