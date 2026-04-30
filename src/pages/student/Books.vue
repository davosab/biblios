<script setup>
import { ref, onMounted } from "vue";
import { ShoppingCart, BookOpen } from "lucide-vue-next";
import { bookQueries, loanQueries } from "../../lib/database";
import { useAuth } from "../../composables/useAuth";

const { user } = useAuth();
const books = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const requestedBooks = ref([]);

const fetchBooks = async () => {
    loading.value = true;
    const { data, error } = await bookQueries.getAll();
    if (!error && data) {
        books.value = data;
    }
    loading.value = false;
};

const fetchRequests = async () => {
    if (!user.value) return;
    const { data, error } = await loanQueries.getByStudent(user.value.id);
    if (!error && data) {
        // Only show pending ones in the "Loan Requests" section
        requestedBooks.value = data
            .filter((l) => l.status === "pending")
            .map((l) => ({
                ...l.book,
                loanId: l.id,
                requestedDate: l.loan_date.split("T")[0],
                status: "pending",
            }));
    }
};

onMounted(async () => {
    await fetchBooks();
    await fetchRequests();
});

const filteredBooks = () => {
    return books.value.filter(
        (book) =>
            book.title
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
};

const requestLoan = async (book) => {
    if (!user.value) return;

    if (!requestedBooks.value.find((b) => b.id === book.id)) {
        const { data, error } = await loanQueries.create({
            student_id: user.value.id,
            book_id: book.id,
            loan_date: new Date().toISOString(),
            status: "pending",
        });

        if (!error && data) {
            requestedBooks.value.push({
                ...book,
                loanId: data[0].id,
                requestedDate: new Date().toISOString().split("T")[0],
                status: "pending",
            });
        } else {
            console.error("Error requesting loan:", error);
        }
    }
};

const cancelRequest = async (book) => {
    if (book.loanId) {
        const { error } = await loanQueries.delete(book.loanId);
        if (!error) {
            requestedBooks.value = requestedBooks.value.filter(
                (b) => b.id !== book.id,
            );
        } else {
            console.error("Error cancelling request:", error);
        }
    }
};
</script>

<template>
    <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
        <div class="mb-8">
            <h1
                class="text-4xl font-bold text-[#1c1917] mb-2"
                style="font-family: &quot;Playfair Display&quot;, serif"
            >
                Library Catalog
            </h1>
            <p class="text-[#78716c]">
                Browse and request books from our collection
            </p>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by title or author..."
                class="w-full px-4 py-3 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309] bg-white"
            />
        </div>

        <!-- Requested Books Section -->
        <div v-if="requestedBooks.length > 0" class="mb-8">
            <h2
                class="text-xl font-bold text-[#1c1917] mb-4"
                style="font-family: &quot;Playfair Display&quot;, serif"
            >
                Your Loan Requests
            </h2>
            <div class="grid grid-cols-1 gap-4">
                <div
                    v-for="book in requestedBooks"
                    :key="book.id"
                    class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4]"
                >
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-[#1c1917]">
                                {{ book.title }}
                            </h3>
                            <p class="text-sm text-[#78716c]">
                                {{ book.author }}
                            </p>
                            <p class="text-xs text-[#78716c] mt-2">
                                Requested: {{ book.requestedDate }}
                            </p>
                        </div>
                        <div class="flex items-center gap-3">
                            <span
                                class="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold"
                                >Pending</span
                            >
                            <button
                                @click="cancelRequest(book)"
                                class="text-red-600 hover:text-red-700 font-semibold text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-8 border-[#e4ddd4]" />
        </div>

        <!-- Available Books -->
        <h2
            class="text-xl font-bold text-[#1c1917] mb-4"
            style="font-family: &quot;Playfair Display&quot;, serif"
        >
            Available Books
        </h2>
        <div v-if="!loading" class="grid grid-cols-1 gap-4">
            <div
                v-for="book in filteredBooks()"
                :key="book.id"
                class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow"
            >
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-[#1c1917]">
                            {{ book.title }}
                        </h3>
                        <p class="text-sm text-[#78716c]">{{ book.author }}</p>
                        <p class="text-xs text-[#78716c] mt-2">
                            ISBN: {{ book.isbn }}
                        </p>
                        <p class="text-sm font-semibold text-[#b45309] mt-2">
                            <BookOpen class="w-4 h-4 inline mr-1" />
                            {{ book.available_copies }} available
                        </p>
                    </div>
                    <button
                        @click="requestLoan(book)"
                        :disabled="
                            book.available_copies === 0 ||
                            requestedBooks.find((b) => b.id === book.id)
                        "
                        class="bg-[#b45309] hover:bg-[#92410d] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-[8px] transition-colors font-semibold"
                    >
                        <ShoppingCart class="w-4 h-4 inline mr-2" />
                        Request Loan
                    </button>
                </div>
            </div>
        </div>

        <div v-if="loading" class="text-center py-12">
            <p class="text-[#78716c]">Loading books...</p>
        </div>

        <div
            v-if="!loading && filteredBooks().length === 0"
            class="text-center py-12"
        >
            <p class="text-[#78716c]">No books found matching your search</p>
        </div>
    </div>
</template>

<style scoped></style>
