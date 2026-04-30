<script setup>
import { ref, onMounted } from "vue";
import { Plus, Edit2, Trash2 } from "lucide-vue-next";
import { bookQueries } from "../../lib/database";

const books = ref([]);
const loading = ref(true);
const showAddBook = ref(false);
const newBook = ref({ title: "", author: "", isbn: "", total_copies: 1 });

const fetchBooks = async () => {
    loading.value = true;
    const { data, error } = await bookQueries.getAll();
    if (!error && data) {
        books.value = data;
    } else if (error) {
        console.error("Error fetching books:", error);
    }
    loading.value = false;
};

const addBook = async () => {
    if (newBook.value.title && newBook.value.author && newBook.value.isbn) {
        const { error } = await bookQueries.create({
            title: newBook.value.title,
            author: newBook.value.author,
            isbn: newBook.value.isbn,
            total_copies: parseInt(newBook.value.total_copies),
            available_copies: parseInt(newBook.value.total_copies),
        });
        if (!error) {
            newBook.value = {
                title: "",
                author: "",
                isbn: "",
                total_copies: 1,
            };
            showAddBook.value = false;
            fetchBooks();
        }
    }
};

const deleteBook = async (id) => {
    const { error } = await bookQueries.delete(id);
    if (!error) {
        fetchBooks();
    }
};

onMounted(fetchBooks);
</script>

<template>
    <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
        <div class="flex justify-between items-start mb-8">
            <div>
                <h1
                    class="text-4xl font-bold text-[#1c1917] mb-2"
                    style="font-family: &quot;Playfair Display&quot;, serif"
                >
                    Manage Books
                </h1>
                <p class="text-[#78716c]">
                    Add, edit, or remove books from the catalog
                </p>
            </div>
            <button
                @click="showAddBook = !showAddBook"
                class="flex items-center gap-2 bg-[#b45309] hover:bg-[#92410d] text-white px-4 py-2 rounded-[8px] transition-colors"
            >
                <Plus class="w-4 h-4" />
                Add Book
            </button>
        </div>

        <!-- Add Book Form -->
        <div
            v-if="showAddBook"
            class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] mb-6"
        >
            <h3 class="text-lg font-semibold text-[#1c1917] mb-4">New Book</h3>
            <div class="grid grid-cols-2 gap-4">
                <input
                    v-model="newBook.title"
                    type="text"
                    placeholder="Book Title"
                    class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309]"
                />
                <input
                    v-model="newBook.author"
                    type="text"
                    placeholder="Author"
                    class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309]"
                />
                <input
                    v-model="newBook.isbn"
                    type="text"
                    placeholder="ISBN"
                    class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309]"
                />
                <input
                    v-model.number="newBook.total_copies"
                    type="number"
                    placeholder="Total Copies"
                    min="1"
                    class="px-4 py-2 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309]"
                />
            </div>
            <div class="flex gap-3 mt-4">
                <button
                    @click="addBook"
                    class="bg-[#b45309] hover:bg-[#92410d] text-white px-4 py-2 rounded-[8px] transition-colors"
                >
                    Save
                </button>
                <button
                    @click="showAddBook = false"
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-[8px] transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>

        <!-- Books Table -->
        <div
            v-if="!loading"
            class="bg-white rounded-[12px] overflow-hidden border-1.5 border-[#e4ddd4]"
        >
            <table class="w-full">
                <thead class="bg-[#fef3c7] border-b border-[#e4ddd4]">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Title
                        </th>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Author
                        </th>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            ISBN
                        </th>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Copies
                        </th>
                        <th
                            class="px-6 py-3 text-left text-sm font-semibold text-[#1c1917]"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="book in books"
                        :key="book.id"
                        class="border-b border-[#e4ddd4] hover:bg-[#f7f4ef] transition-colors"
                    >
                        <td class="px-6 py-3 text-[#1c1917]">
                            {{ book.title }}
                        </td>
                        <td class="px-6 py-3 text-[#78716c]">
                            {{ book.author }}
                        </td>
                        <td class="px-6 py-3 text-[#78716c]">
                            {{ book.isbn }}
                        </td>
                        <td class="px-6 py-3 text-[#1c1917] font-semibold">
                            {{ book.available_copies }}/{{ book.total_copies }}
                        </td>
                        <td class="px-6 py-3">
                            <div class="flex gap-2">
                                <button
                                    class="p-2 hover:bg-[#fef3c7] rounded transition-colors"
                                >
                                    <Edit2 class="w-4 h-4 text-[#b45309]" />
                                </button>
                                <button
                                    @click="deleteBook(book.id)"
                                    class="p-2 hover:bg-red-50 rounded transition-colors"
                                >
                                    <Trash2 class="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
            <p class="text-[#78716c]">Loading books...</p>
        </div>
    </div>
</template>

<style scoped></style>
