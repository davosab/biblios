<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { BookOpen } from "lucide-vue-next";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { signIn, loading, error, userRole } = useAuth();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
    error.value = "";
    const result = await signIn(email.value, password.value);

    if (result.success) {
        if (userRole.value === "librarian") {
            router.push("/librarian/approvals");
        } else {
            router.push("/student/books");
        }
    }
};
</script>

<template>
    <div class="min-h-screen bg-[#f7f4ef] flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Header with Icon -->
            <div class="flex flex-col items-center mb-8">
                <div class="bg-[#b45309] p-4 rounded-full mb-4">
                    <BookOpen class="w-8 h-8 text-white" />
                </div>
                <h1
                    class="text-4xl font-bold text-[#1c1917] mb-2"
                    style="font-family: &quot;Playfair Display&quot;, serif"
                >
                    Biblios
                </h1>
                <p class="text-[#78716c]">Library Management System</p>
            </div>

            <!-- Login Card -->
            <div
                class="bg-white rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-8 border-1.5 border-[#e4ddd4]"
            >
                <h2
                    class="text-2xl font-bold text-[#1c1917] mb-6"
                    style="font-family: &quot;Playfair Display&quot;, serif"
                >
                    Welcome Back
                </h2>

                <!-- Error Message -->
                <div
                    v-if="error"
                    class="bg-red-50 border-1.5 border-red-200 text-red-700 px-4 py-3 rounded-[8px] mb-6 text-sm"
                >
                    {{
                        typeof error === "string"
                            ? error
                            : "Login failed. Please try again."
                    }}
                </div>

                <!-- Form -->
                <form @submit.prevent="handleLogin" class="space-y-5">
                    <div>
                        <label
                            class="block text-sm font-semibold text-[#1c1917] mb-2"
                            >Email</label
                        >
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Enter your email"
                            class="w-full px-4 py-3 border-1.5 border-grey-300 rounded-[8px] focus:outline-none focus:border-[#b45309] transition-colors bg-white text-[#1c1917]"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            required
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-semibold text-[#1c1917] mb-2"
                            >Password</label
                        >
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Enter your password"
                            class="w-full px-4 py-3 border-1.5 border-grey-300 rounded-[8px] focus:outline-none focus:border-[#b45309] transition-colors bg-white text-[#1c1917]"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            required
                        />
                    </div>

                    <!-- Login Button -->
                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full bg-[#b45309] hover:bg-[#92410d] text-white font-semibold py-3 px-4 rounded-[8px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        style="font-family: &quot;DM Sans&quot;, sans-serif"
                    >
                        {{ loading ? "Signing in..." : "Sign In" }}
                    </button>
                </form>

                <!-- Divider -->
                <div class="flex items-center gap-3 my-6">
                    <div class="flex-1 border-t border-[#e4ddd4]"></div>
                    <span class="text-sm text-[#78716c]">or</span>
                    <div class="flex-1 border-t border-[#e4ddd4]"></div>
                </div>

                <!-- Links -->
                <div class="space-y-3">
                    <router-link
                        to="/register"
                        class="block w-full text-center bg-[#fef3c7] hover:bg-[#fde68a] text-[#b45309] font-semibold py-2 px-4 rounded-[8px] transition-colors"
                        style="font-family: &quot;DM Sans&quot;, sans-serif"
                    >
                        Create New Account
                    </router-link>
                    <p
                        class="text-center text-sm text-[#78716c]"
                        style="font-family: &quot;DM Sans&quot;, sans-serif"
                    >
                        <a
                            href="#"
                            class="text-[#b45309] hover:underline font-semibold"
                            >Forgot your password?</a
                        >
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center mt-6">
                <p
                    class="text-sm text-[#78716c]"
                    style="font-family: &quot;DM Sans&quot;, sans-serif"
                >
                    © 2026 Biblios. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap");

input:focus {
    box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.1);
}

button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(180, 83, 9, 0.15);
}
</style>
