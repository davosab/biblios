<template>
    <div class="books-page ml-[200px]">
        <!-- Header -->
        <header class="page-header">
            <div class="header-left">
                <h1 class="page-title">Library</h1>
                <span class="book-count"
                    >{{ filteredBooks.length }} titles</span
                >
            </div>
            <div class="header-right">
                <div class="search-wrapper">
                    <svg
                        class="search-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        v-model="searchQuery"
                        class="search-input"
                        type="text"
                        placeholder="Search titles, authors..."
                    />
                </div>
                <div class="view-toggle">
                    <button
                        :class="['toggle-btn', { Active: viewMode === 'grid' }]"
                        @click="viewMode = 'grid'"
                        title="Grid view"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z"
                            />
                        </svg>
                    </button>
                    <button
                        :class="['toggle-btn', { Active: viewMode === 'list' }]"
                        @click="viewMode = 'list'"
                        title="List view"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>

        <!-- Filters Bar -->
        <div class="filters-bar">
            <div class="genre-filters">
                <button
                    v-for="genre in genres"
                    :key="genre"
                    :class="['genre-chip', { Active: selectedGenre === genre }]"
                    @click="
                        selectedGenre = selectedGenre === genre ? null : genre
                    "
                >
                    {{ genre }}
                </button>
            </div>
            <div class="sort-wrapper">
                <label class="sort-label">Sort by</label>
                <select v-model="sortBy" class="sort-select">
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                </select>
            </div>
        </div>

        <!-- Grid View -->
        <transition-group
            v-if="viewMode === 'grid'"
            name="book-fade"
            tag="div"
            class="books-grid"
        >
            <div
                v-for="book in filteredBooks"
                :key="book.id"
                class="book-card"
                @click="selectBook(book)"
            >
                <div
                    class="book-cover"
                    :style="{ background: book.coverColor }"
                >
                    <div class="cover-texture"></div>
                    <div class="cover-content">
                        <span class="cover-genre">{{ book.genre }}</span>
                        <div class="cover-spine"></div>
                    </div>
                    <div class="cover-badge" v-if="book.badge">
                        {{ book.badge }}
                    </div>
                </div>
                <div class="book-info">
                    <h3 class="book-title">{{ book.title }}</h3>
                    <p class="book-author">{{ book.author }}</p>
                    <div class="book-meta">
                        <div class="book-rating">
                            <span class="book-copies"
                                >{{ book.available_copies }}/{{
                                    book.total_copies
                                }}</span
                            >
                        </div>
                    </div>
                    <div class="book-footer">
                        <span class="book-isbn">{{ book.isbn }}</span>
                        <button
                            class="add-to-cart"
                            @click.stop="addToCart(book)"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2.5"
                            >
                                <path
                                    d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                                />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </transition-group>

        <!-- List View -->
        <transition-group v-else name="book-fade" tag="div" class="books-list">
            <div
                v-for="book in filteredBooks"
                :key="book.id"
                class="list-row"
                @click="selectBook(book)"
            >
                <div
                    class="list-cover"
                    :style="{ background: book.coverColor }"
                ></div>
                <div class="list-details">
                    <div class="list-main">
                        <h3 class="book-title">{{ book.title }}</h3>
                        <p class="book-author">{{ book.author }}</p>
                    </div>
                    <div class="list-genre-pill">{{ book.genre }}</div>
                    <div class="list-rating">
                        <span class="book-copies"
                            >{{ book.available_copies }}/{{
                                book.total_copies
                            }}</span
                        >
                    </div>
                    <span class="book-year list-year">{{ book.isbn }}</span>
                    <span class="book-price list-price"
                        >{{ book.available_copies }}/{{
                            book.total_copies
                        }}</span
                    >
                    <button
                        class="add-to-cart list-cart"
                        @click.stop="addToCart(book)"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                        >
                            <path
                                d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                            />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </transition-group>

        <!-- Empty State -->
        <div v-if="!loading && filteredBooks.length === 0" class="empty-state">
            <div class="empty-icon">📚</div>
            <p class="empty-title">No books found</p>
            <p class="empty-sub">Try adjusting your search or filters</p>
            <button class="reset-btn" @click="resetFilters">
                Reset filters
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="empty-state">
            <p class="empty-title">Loading books...</p>
        </div>

        <!-- Toast Notification -->
        <transition name="toast-slide">
            <div v-if="toast.visible" class="toast">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    class="toast-icon"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ toast.message }}
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { bookQueries } from "../lib/database";

// --- State ---
const searchQuery = ref("");
const selectedGenre = ref(null);
const sortBy = ref("title");
const viewMode = ref("grid");
const toast = ref({ visible: false, message: "" });
const loading = ref(true);

// --- Data ---
const books = ref([]);

const genres = computed(() => {
    const uniqueGenres = [
        ...new Set(books.value.map((b) => b.genre).filter(Boolean)),
    ];
    return ["All", ...uniqueGenres];
});

// --- Computed ---
const filteredBooks = computed(() => {
    let result = books.value;

    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
            (b) =>
                b.title.toLowerCase().includes(q) ||
                b.author.toLowerCase().includes(q),
        );
    }

    if (selectedGenre.value && selectedGenre.value !== "All") {
        result = result.filter((b) => b.genre === selectedGenre.value);
    }

    return [...result].sort((a, b) => {
        if (sortBy.value === "title") return a.title.localeCompare(b.title);
        if (sortBy.value === "author") return a.author.localeCompare(b.author);
        return 0;
    });
});

// --- Methods ---
const getRandomColor = () => {
    const colors = [
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        "linear-gradient(135deg, #c8a45a 0%, #8b6914 50%, #5c4a1e 100%)",
        "linear-gradient(135deg, #2d5016 0%, #4a7c2b 50%, #6aaa3e 100%)",
        "linear-gradient(135deg, #0b3d91 0%, #1565c0 50%, #42a5f5 100%)",
        "linear-gradient(135deg, #1b1b1b 0%, #333 50%, #555 100%)",
        "linear-gradient(135deg, #0d1b2a 0%, #1b2a4a 50%, #2d4a7a 100%)",
        "linear-gradient(135deg, #2c1810 0%, #4a2c1a 50%, #6b3e26 100%)",
        "linear-gradient(135deg, #8b0000 0%, #c62828 50%, #ef5350 100%)",
        "linear-gradient(135deg, #3e1f47 0%, #6a1b9a 50%, #9c27b0 100%)",
        "linear-gradient(135deg, #ff6f00 0%, #e65100 50%, #bf360c 100%)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const fetchBooks = async () => {
    loading.value = true;
    const { data, error } = await bookQueries.getAll();
    if (!error && data) {
        books.value = data.map((book) => ({
            ...book,
            coverColor: getRandomColor(),
        }));
    } else if (error) {
        console.error("Error fetching books:", error);
        showToast("Failed to load books");
    }
    loading.value = false;
};

function selectBook(book) {
    console.log("Selected book:", book);
}

function addToCart(book) {
    showToast(`"${book.title}" added to cart`);
}

function resetFilters() {
    searchQuery.value = "";
    selectedGenre.value = null;
    sortBy.value = "title";
}

function showToast(message) {
    toast.value = { visible: true, message };
    setTimeout(() => {
        toast.value.visible = false;
    }, 2800);
}

onMounted(fetchBooks);
</script>

<style scoped>
/* ─── Fonts ─────────────────────────────────────────────── */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap");

/* ─── Variables ─────────────────────────────────────────── */
:root {
    --bg: #f7f4ef;
    --surface: #ffffff;
    --border: #e4ddd4;
    --text-primary: #1c1917;
    --text-secondary: #78716c;
    --accent: #b45309;
    --accent-light: #fef3c7;
    --radius: 12px;
    --shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
    --shadow-hover: 0 8px 28px rgba(0, 0, 0, 0.13);
}

/* ─── Layout ─────────────────────────────────────────────── */
.books-page {
    min-height: 100vh;
    background: var(--bg);
    font-family: "DM Sans", sans-serif;
    padding: 2rem 2.5rem 4rem;
    color: var(--text-primary);
}

/* ─── Header ─────────────────────────────────────────────── */
.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.header-left {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
}

.page-title {
    font-family: "Playfair Display", serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    letter-spacing: -0.5px;
}

.book-count {
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 400;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

/* Search */
.search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}
.search-icon {
    position: absolute;
    left: 0.75rem;
    width: 16px;
    height: 16px;
    color: var(--text-secondary);
    pointer-events: none;
}
.search-input {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 999px;
    padding: 0.5rem 1rem 0.5rem 2.25rem;
    font-family: "DM Sans", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    width: 240px;
    outline: none;
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}
.search-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.1);
}
.search-input::placeholder {
    color: var(--text-secondary);
}

/* View toggle */
.view-toggle {
    display: flex;
    gap: 0.25rem;
}
.toggle-btn {
    width: 34px;
    height: 34px;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: all 0.15s;
}
.toggle-btn svg {
    width: 16px;
    height: 16px;
}
.toggle-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
}
.toggle-btn.Active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
}

/* ─── Filters Bar ────────────────────────────────────────── */
.filters-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    gap: 1rem;
    flex-wrap: wrap;
}

.genre-filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.genre-chip {
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    border: 1.5px solid var(--border);
    background: var(--surface);
    font-family: "DM Sans", sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
}
.genre-chip:hover {
    border-color: var(--accent);
    color: var(--accent);
}
.genre-chip.Active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
}

.sort-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.sort-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    white-space: nowrap;
}
.sort-select {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 0.4rem 0.75rem;
    font-family: "DM Sans", sans-serif;
    font-size: 0.85rem;
    color: var(--text-primary);
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s;
}
.sort-select:focus {
    border-color: var(--accent);
}

/* ─── Grid ───────────────────────────────────────────────── */
.books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
}

.book-card {
    background: var(--surface);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    cursor: pointer;
    transition:
        transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1),
        box-shadow 0.25s;
    border: 1px solid var(--border);
}
.book-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
}

/* Cover */
.book-cover {
    height: 180px;
    position: relative;
    overflow: hidden;
}
.cover-texture {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 8px
    );
}
.cover-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0.75rem;
}
.cover-genre {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
}
.cover-spine {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: rgba(0, 0, 0, 0.25);
}
.cover-badge {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    background: var(--accent);
    color: #fff;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
}

/* Info */
.book-info {
    padding: 1rem;
}

.book-title {
    font-family: "Playfair Display", serif;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 0.2rem;
    color: var(--text-primary);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.book-author {
    font-size: 0.78rem;
    color: var(--text-secondary);
    margin: 0 0 0.6rem;
}

.book-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
}
.book-rating {
    display: flex;
    align-items: center;
    gap: 0.3rem;
}
.stars {
    font-size: 0.7rem;
    color: var(--accent);
    letter-spacing: -1px;
}
.rating-count {
    font-size: 0.7rem;
    color: var(--text-secondary);
}
.book-year {
    font-size: 0.72rem;
    color: var(--text-secondary);
}

.book-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.book-price {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.3px;
}

.add-to-cart {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1.5px solid var(--border);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: all 0.15s;
}
.add-to-cart svg {
    width: 15px;
    height: 15px;
}
.add-to-cart:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
}

/* ─── List View ──────────────────────────────────────────── */
.books-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.list-row {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition:
        box-shadow 0.2s,
        border-color 0.2s;
}
.list-row:hover {
    box-shadow: var(--shadow);
    border-color: #d4c4a8;
}

.list-cover {
    width: 44px;
    height: 60px;
    border-radius: 4px;
    flex-shrink: 0;
}
.list-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    flex-wrap: wrap;
}
.list-main {
    flex: 1;
    min-width: 140px;
}
.list-main .book-title {
    font-size: 0.9rem;
    margin-bottom: 0.15rem;
}
.list-main .book-author {
    margin: 0;
}

.list-genre-pill {
    font-size: 0.72rem;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    background: var(--accent-light);
    color: var(--accent);
    font-weight: 600;
    white-space: nowrap;
}
.list-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
}
.list-year {
    font-size: 0.78rem;
    color: var(--text-secondary);
    white-space: nowrap;
}
.list-price {
    font-size: 0.95rem;
    font-weight: 700;
    white-space: nowrap;
}
.list-cart {
    margin-left: auto;
}

/* ─── Empty State ────────────────────────────────────────── */
.empty-state {
    text-align: center;
    padding: 5rem 2rem;
    color: var(--text-secondary);
}
.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.empty-title {
    font-family: "Playfair Display", serif;
    font-size: 1.25rem;
    color: var(--text-primary);
    margin: 0 0 0.4rem;
}
.empty-sub {
    font-size: 0.875rem;
    margin: 0 0 1.5rem;
}
.reset-btn {
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    border: 1.5px solid var(--accent);
    background: transparent;
    color: var(--accent);
    font-family: "DM Sans", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
}
.reset-btn:hover {
    background: var(--accent);
    color: #fff;
}

/* ─── Toast ──────────────────────────────────────────────── */
.toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--text-primary);
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius);
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}
.toast-icon {
    width: 16px;
    height: 16px;
    color: #4ade80;
    flex-shrink: 0;
}

/* ─── Transitions ────────────────────────────────────────── */
.book-fade-enter-Active {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}
.book-fade-leave-Active {
    transition: opacity 0.15s ease;
}
.book-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.book-fade-leave-to {
    opacity: 0;
}

.toast-slide-enter-Active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}
.toast-slide-leave-Active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}
.toast-slide-enter-from {
    opacity: 0;
    transform: translateY(12px);
}
.toast-slide-leave-to {
    opacity: 0;
    transform: translateY(12px);
}

/* ─── Responsive ─────────────────────────────────────────── */
@media (max-width: 768px) {
    .books-page {
        padding: 1.25rem 1rem 3rem;
    }
    .search-input {
        width: 180px;
    }
    .books-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 1rem;
    }
    .list-details {
        gap: 0.6rem;
    }
    .list-genre-pill,
    .list-year {
        display: none;
    }
}
</style>
