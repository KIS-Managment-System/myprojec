<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import { Head, Link } from '@inertiajs/vue3';

// i18n
const { t } = useI18n();

// Form
const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">

            <Head :title="t('register')" />

            <h1 class="text-2xl font-bold text-center mb-6">{{ t('register') }}</h1>

            <a-form layout="vertical" @submit.prevent="submit">
                <!-- Name -->
                <a-form-item :label="t('name')" :validate-status="form.errors.name ? 'error' : ''"
                    :help="form.errors.name">
                    <a-input v-model:value="form.name" type="text" placeholder="John Doe" autocomplete="name" autofocus
                        class="rounded-md" />
                </a-form-item>

                <!-- Email -->
                <a-form-item :label="t('email')" :validate-status="form.errors.email ? 'error' : ''"
                    :help="form.errors.email">
                    <a-input v-model:value="form.email" type="email" placeholder="example@email.com"
                        autocomplete="username" class="rounded-md" />
                </a-form-item>

                <!-- Password -->
                <a-form-item :label="t('password')" :validate-status="form.errors.password ? 'error' : ''"
                    :help="form.errors.password">
                    <a-input-password v-model:value="form.password" placeholder="••••••••" autocomplete="new-password"
                        class="rounded-md" />
                </a-form-item>

                <!-- Confirm Password -->
                <a-form-item :label="t('confirm_password')"
                    :validate-status="form.errors.password_confirmation ? 'error' : ''"
                    :help="form.errors.password_confirmation">
                    <a-input-password v-model:value="form.password_confirmation" placeholder="••••••••"
                        autocomplete="new-password" class="rounded-md" />
                </a-form-item>

                <!-- Submit Button -->
                <a-form-item class="mt-4">
                    <a-button type="primary" block :loading="form.processing" html-type="submit" class="font-semibold">
                        {{ t('register') }}
                    </a-button>
                </a-form-item>
            </a-form>

            <!-- Login Link -->
            <div class="mt-6 text-center">
                <span class="text-gray-500 mr-1">{{ t('already_registered') }}</span>
                <Link :href="route('login')" class="text-blue-600 hover:text-blue-800 font-medium underline">
                {{ t('login') }}
                </Link>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Optional: smoother input focus effect */
.a-input,
.a-input-password {
    transition: all 0.2s ease-in-out;
}

.a-input:focus,
.a-input-password:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
</style>
