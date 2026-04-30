<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { BookOpen, Users, Briefcase } from "lucide-vue-next";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { signUp, loading, error } = useAuth();
const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref("student");
const success = ref("");

const handleRegister = async () => {
    error.value = "";
    success.value = "";

    if (!fullName.value.trim()) {
        error.value = "Full name is required.";
        return;
    }

    if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match.";
        return;
    }

    if (password.value.length < 6) {
        error.value = "Password must be at least 6 characters.";
        return;
    }

    const result = await signUp(
        email.value,
        password.value,
        fullName.value,
        role.value,
    );

    if (result.success) {
        success.value = "Registration successful! Redirecting...";
        setTimeout(() => {
            if (role.value === "librarian") {
                router.push("/librarian/approvals");
            } else {
                router.push("/student/books");
            }
        }, 1500);
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

            <!-- Register Card -->
            <div
                class="bg-white rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-8 border-1.5 border-[#e4ddd4]"
            >
                <h2
                    class="text-2xl font-bold text-[#1c1917] mb-6"
                    style="font-family: &quot;Playfair Display&quot;, serif"
                >
                    Create Account
                </h2>

                <!-- Error Message -->
                <div
                    v-if="error"
                    class="bg-red-50 border-1.5 border-red-200 text-red-700 px-4 py-3 rounded-[8px] mb-6 text-sm"
                >
                    {{
                        typeof error === "string"
                            ? error
                            : "Registration failed. Please try again."
                    }}
                </div>

                <!-- Success Message -->
                <div
                    v-if="success"
                    class="bg-green-50 border-1.5 border-green-200 text-green-700 px-4 py-3 rounded-[8px] mb-6 text-sm"
                >
                    {{ success }}
                </div>

                <!-- Form -->
                <form @submit.prevent="handleRegister" class="space-y-5">
                    <div>
                        <label
                            class="block text-sm font-semibold text-[#1c1917] mb-2"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            >Full Name</label
                        >
                        <input
                            v-model="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            class="w-full px-4 py-3 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309] transition-colors bg-white text-[#1c1917]"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            required
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-semibold text-[#1c1917] mb-2"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            >Email</label
                        >
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Enter your email"
                            class="w-full px-4 py-3 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309] transition-colors bg-white text-[#1c1917]"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            required
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-semibold text-[#1c1917] mb-2"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            >Password</label
                        >
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Create a password (min 6 chars)"
                            class="w-full px-4 py-3 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309] transition-colors bg-white text-[#1c1917]"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            required
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-semibold text-[#1c1917] mb-2"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            >Confirm Password</label
                        >
                        <input
                            v-model="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            class="w-full px-4 py-3 border-1.5 border-[#e4ddd4] rounded-[8px] focus:outline-none focus:border-[#b45309] transition-colors bg-white text-[#1c1917]"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            required
                        />
                    </div>

                    <div>
                        <label
                            class="block text-sm font-semibold text-[#1c1917] mb-3"
                            style="font-family: &quot;DM Sans&quot;, sans-serif"
                            >Select Your Role</label
                        >
                        <div class="flex gap-4">
                            <label
                                class="flex items-center gap-3 flex-1 p-4 border-1.5 border-[#e4ddd4] rounded-[8px] cursor-pointer hover:border-[#b45309] transition-colors"
                                :class="
                                    role === 'student' &&
                                    'border-[#b45309] bg-[#fef3c7]'
                                "
                            >
                                <input
                                    v-model="role"
                                    type="radio"
                                    value="student"
                                    class="w-4 h-4"
                                    style="accent-color: #b45309"
                                />
                                <div class="flex-1">
                                    <div
                                        class="flex items-center gap-2 text-sm font-semibold text-[#1c1917]"
                                        style="
                                            font-family:
                                                &quot;DM Sans&quot;, sans-serif;
                                        "
                                    >
                                        <Users class="w-4 h-4" />
                                        Student
                                    </div>
                                    <div
                                        class="text-xs text-[#78716c]"
                                        style="
                                            font-family:
                                                &quot;DM Sans&quot;, sans-serif;
                                        "
                                    >
                                        Access library catalog
                                    </div>
                                </div>
                            </label>

                            <label
                                class="flex items-center gap-3 flex-1 p-4 border-1.5 border-[#e4ddd4] rounded-[8px] cursor-pointer hover:border-[#b45309] transition-colors"
                                :class="
                                    role === 'librarian' &&
                                    'border-[#b45309] bg-[#fef3c7]'
                                "
                            >
                                <input
                                    v-model="role"
                                    type="radio"
                                    value="librarian"
                                    class="w-4 h-4"
                                    style="accent-color: #b45309"
                                />
                                <div class="flex-1">
                                    <div
                                        class="flex items-center gap-2 text-sm font-semibold text-[#1c1917]"
                                        style="
                                            font-family:
                                                &quot;DM Sans&quot;, sans-serif;
                                        "
                                    >
                                        <Briefcase class="w-4 h-4" />
                                        Librarian
                                    </div>
                                    <div
                                        class="text-xs text-[#78716c]"
                                        style="
                                            font-family:
                                                &quot;DM Sans&quot;, sans-serif;
                                        "
                                    >
                                        Manage library
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Register Button -->
                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full bg-[#b45309] hover:bg-[#92410d] text-white font-semibold py-3 px-4 rounded-[8px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        style="font-family: &quot;DM Sans&quot;, sans-serif"
                    >
                        {{ loading ? "Creating Account..." : "Create Account" }}
                    </button>
                </form>

                <!-- Divider -->
                <div class="flex items-center gap-3 my-6">
                    <div class="flex-1 border-t border-[#e4ddd4]"></div>
                    <span
                        class="text-sm text-[#78716c]"
                        style="font-family: &quot;DM Sans&quot;, sans-serif"
                        >or</span
                    >
                    <div class="flex-1 border-t border-[#e4ddd4]"></div>
                </div>

                <!-- Link to Login -->
                <div class="text-center">
                    <p
                        class="text-sm text-[#78716c]"
                        style="font-family: &quot;DM Sans&quot;, sans-serif"
                    >
                        Already have an account?
                        <router-link
                            to="/login"
                            class="text-[#b45309] hover:underline font-semibold"
                            >Sign In</router-link
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
