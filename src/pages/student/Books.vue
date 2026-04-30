<script setup>
import { ref } from 'vue';
import { ShoppingCart, BookOpen } from 'lucide-vue-next';

const books = ref([
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', available: 5 },
  { id: 2, title: '1984', author: 'George Orwell', isbn: '9780451524935', available: 3 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', available: 4 },
  { id: 4, title: 'Brave New World', author: 'Aldous Huxley', isbn: '9780060085239', available: 2 },
]);

const searchQuery = ref('');
const requestedBooks = ref([]);

const filteredBooks = () => {
  return books.value.filter(book => 
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const requestLoan = (book) => {
  if (!requestedBooks.value.find(b => b.id === book.id)) {
    requestedBooks.value.push({
      ...book,
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
  }
};

const cancelRequest = (bookId) => {
  requestedBooks.value = requestedBooks.value.filter(b => b.id !== bookId);
};
</script>

<template>
  <div class="ml-[200px] h-full bg-[#f7f4ef] p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[#1c1917] mb-2" style="font-family: 'Playfair Display', serif;">Library Catalog</h1>
      <p class="text-[#78716c]">Browse and request books from our collection</p>
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
      <h2 class="text-xl font-bold text-[#1c1917] mb-4" style="font-family: 'Playfair Display', serif;">Your Loan Requests</h2>
      <div class="grid grid-cols-1 gap-4">
        <div v-for="book in requestedBooks" :key="book.id" class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4]">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-[#1c1917]">{{ book.title }}</h3>
              <p class="text-sm text-[#78716c]">{{ book.author }}</p>
              <p class="text-xs text-[#78716c] mt-2">Requested: {{ book.requestedDate }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold">Pending</span>
              <button
                @click="cancelRequest(book.id)"
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
    <h2 class="text-xl font-bold text-[#1c1917] mb-4" style="font-family: 'Playfair Display', serif;">Available Books</h2>
    <div class="grid grid-cols-1 gap-4">
      <div v-for="book in filteredBooks()" :key="book.id" class="bg-white rounded-[12px] p-6 border-1.5 border-[#e4ddd4] shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-[#1c1917]">{{ book.title }}</h3>
            <p class="text-sm text-[#78716c]">{{ book.author }}</p>
            <p class="text-xs text-[#78716c] mt-2">ISBN: {{ book.isbn }}</p>
            <p class="text-sm font-semibold text-[#b45309] mt-2">
              <BookOpen class="w-4 h-4 inline mr-1" />
              {{ book.available }} available
            </p>
          </div>
          <button
            @click="requestLoan(book)"
            :disabled="book.available === 0 || requestedBooks.find(b => b.id === book.id)"
            class="bg-[#b45309] hover:bg-[#92410d] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-[8px] transition-colors font-semibold"
          >
            <ShoppingCart class="w-4 h-4 inline mr-2" />
            Request Loan
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredBooks().length === 0" class="text-center py-12">
      <p class="text-[#78716c]">No books found matching your search</p>
    </div>
  </div>
</template>

<style scoped>
</style>
