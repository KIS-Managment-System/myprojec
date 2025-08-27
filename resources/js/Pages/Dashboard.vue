<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>

    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Dashboard
            </h2>
        </template>

    
        <br>

        <a-space direction="vertical" :size="12">
            <a-date-picker v-model:value="value1" />
            <a-date-picker v-model:value="value2" picker="week" />
            <a-date-picker v-model:value="value3" picker="month" />
            <a-date-picker v-model:value="value4" picker="quarter" />
            <a-date-picker v-model:value="value5" picker="year" />
        </a-space>

        <br> <br>

        <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
            <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
        </div>


        <br>

        <a-descriptions title="User Info">
            <a-descriptions-item label="UserName">Zhou Maomao</a-descriptions-item>
            <a-descriptions-item label="Telephone">1810000000</a-descriptions-item>
            <a-descriptions-item label="Live">Hangzhou, Zhejiang</a-descriptions-item>
            <a-descriptions-item label="Remark">empty</a-descriptions-item>
            <a-descriptions-item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </a-descriptions-item>
        </a-descriptions>

    </AuthenticatedLayout>
</template>
