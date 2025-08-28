<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import { Head, Link } from '@inertiajs/vue3';

// i18n
const { t } = useI18n();

// Props
defineProps({
    canResetPassword: Boolean,
    status: String,
});

// Form
const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">

            <Head :title="t('login')" />

            <h1 class="text-2xl font-bold text-center mb-6">{{ t('login') }}</h1>

            <div v-if="status" class="mb-4 text-sm font-medium text-green-600 text-center">
                {{ status }}
            </div>

            <a-form layout="vertical" @submit.prevent="submit">
                <!-- Email -->
                <a-form-item :label="t('email')" :validate-status="form.errors.email ? 'error' : ''"
                    :help="form.errors.email">
                    <a-input v-model:value="form.email" type="email" placeholder="example@email.com"
                        autocomplete="username" autofocus class="rounded-md" />
                </a-form-item>

                <!-- Password -->
                <a-form-item :label="t('password')" :validate-status="form.errors.password ? 'error' : ''"
                    :help="form.errors.password">
                    <a-input-password v-model:value="form.password" placeholder="••••••••"
                        autocomplete="current-password" class="rounded-md" />
                </a-form-item>

                <!-- Remember Me -->
                <a-form-item class="flex justify-between items-center">
                    <a-checkbox v-model:checked="form.remember">
                        {{ t('remember_me') }}
                    </a-checkbox>

                    <Link v-if="canResetPassword" :href="route('password.request')"
                        class="text-sm underline text-gray-600 hover:text-gray-900">
                    {{ t('forgot_password') }}
                    </Link>
                </a-form-item>

                <!-- Submit -->
                <a-form-item class="mt-4">
                    <a-button type="primary" block :loading="form.processing" html-type="submit" class="font-semibold">
                        {{ t('login') }}
                    </a-button>
                </a-form-item>
            </a-form>

            <!-- Register -->
            <div class="mt-6 text-center">
                <span class="text-gray-500 mr-1">{{ t('no_account') }}</span>
                <Link :href="route('register')" class="text-blue-600 hover:text-blue-800 font-medium underline">
                {{ t('register') }}
                </Link>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Optional: smoother input focus */
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
