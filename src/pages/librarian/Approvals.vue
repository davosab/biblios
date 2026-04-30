<script setup>
import { ref, onMounted } from "vue";
import { CheckCircle, XCircle } from "lucide-vue-next";
import { useAuth } from "../../composables/useAuth";
import { studentQueries } from "../../lib/database";

const { user } = useAuth();
const pendingApprovals = ref([]);
const loading = ref(true);

const fetchPending = async () => {
    loading.value = true;
    const { data, error } = await studentQueries.getPending();
    if (!error && data) {
        pendingApprovals.value = data;
    } else if (error) {
        console.error("Error fetching Pending approvals:", error);
    }
    loading.value = false;
};

const approveStudent = async (studentId) => {
    if (!user.value) return;
    const { error } = await studentQueries.approve(studentId, user.value.id);
    if (!error) {
        pendingApprovals.value = pendingApprovals.value.filter(
            (s) => s.id !== studentId,
        );
    } else {
        console.error("Error approving student:", error);
    }
};

const rejectStudent = async (studentId) => {
    const { error } = await studentQueries.reject(studentId);
    if (!error) {
        pendingApprovals.value = pendingApprovals.value.filter(
            (s) => s.id !== studentId,
        );
    } else {
        console.error("Error rejecting student:", error);
    }
};

onMounted(fetchPending);
</script>

<template>
    <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
        <div class="mb-8">
            <h1
                class="text-4xl font-bold text-[#1c1917] mb-2"
                style="font-family: &quot;Playfair Display&quot;, serif"
            >
                Student Approvals
            </h1>
            <p class="text-[#78716c]">
                Approve or reject student account requests
            </p>
        </div>

        <div class="grid gap-4">
            <div
                v-for="approval in pendingApprovals"
                :key="approval.id"
                class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <h3
                            class="text-lg font-semibold text-[#1c1917]"
                            style="
                                font-family:
                                    &quot;Playfair Display&quot;, serif;
                            "
                        >
                            {{ approval.first_name }} {{ approval.last_name }}
                        </h3>
                        <p class="text-sm text-[#78716c]">
                            {{ approval.email }}
                        </p>
                    </div>
                    <div class="flex gap-3">
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
                </div>
            </div>
        </div>

        <div v-if="loading" class="text-center py-12">
            <p class="text-[#78716c]">Loading Pending approvals...</p>
        </div>
        <div
            v-else-if="pendingApprovals.length === 0"
            class="text-center py-12"
        >
            <p class="text-[#78716c]">No Pending approvals</p>
        </div>
    </div>
</template>

<style scoped></style>
