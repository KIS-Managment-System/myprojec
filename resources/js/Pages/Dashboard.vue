<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import { Dayjs } from 'dayjs'

// 🗓 Ant Design Vue state
const value = ref<Dayjs>()
const value1 = ref<Dayjs>()
const value2 = ref<Dayjs>()
const value3 = ref<Dayjs>()
const value4 = ref<Dayjs>()
const value5 = ref<Dayjs>()

// Calendar change handler
function onPanelChange(val: Dayjs, mode: string) {
    console.log('Panel changed:', val, mode)
}



// //  🌐 i18n setup
// import { useI18n } from 'vue-i18n';
// const { t, locale } = useI18n(); // <-- make sure it's inside setup
// function switchLocale(lang: string) {
//     locale.value = lang; // reactive, updates all t() calls
// }

// import { watch } from 'vue';
// // Reactive value for Antd select
// const currentLocale = ref(locale.value);
// // Watch locale change to update Antd select if changed elsewhere
// watch(locale, (newVal) => {
//     currentLocale.value = newVal;
// });

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n(); // <-- make sure it's inside setup




</script>

<template>

    <!-- <select @change="switchLocale($event.target.value)">
        <option value="en">English</option>
        <option value="km">Khmer</option>
    </select> -->
    <!-- 

    <a-select v-model:value="currentLocale" style="width: 120px" @change="switchLocale">
        <a-select-option value="en">English</a-select-option>
        <a-select-option value="km">Khmer</a-select-option>
    </a-select> -->





    <Head title="Dashboard" />
    <AuthenticatedLayout :headerTitle="'Dashboard'">
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Dashboard
            </h2>
        </template>


        <h1>{{ t('dashboard') }}</h1>
        <p>{{ t('welcome') }}</p>



        <br />

        <!-- 🗓 Ant Design Date Pickers -->
        <a-space direction="vertical" :size="12">
            <a-date-picker v-model:value="value1" />
            <a-date-picker v-model:value="value2" picker="week" />
            <a-date-picker v-model:value="value3" picker="month" />
            <a-date-picker v-model:value="value4" picker="quarter" />
            <a-date-picker v-model:value="value5" picker="year" />
        </a-space>

        <br /><br />

        <!-- 📅 Ant Design Calendar -->
        <div :style="{ width: '300px' }">
            <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
        </div>

        <br />

        <!-- 👤 Ant Design Descriptions -->
        <a-descriptions title="User Info">
            <a-descriptions-item label="UserName">Zhou Maomao</a-descriptions-item>
            <a-descriptions-item label="Telephone">1810000000</a-descriptions-item>
            <a-descriptions-item label="Live">Hangzhou, Zhejiang</a-descriptions-item>
            <a-descriptions-item label="Remark">empty</a-descriptions-item>
            <a-descriptions-item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </a-descriptions-item>
        </a-descriptions>

        <h1 class="text-2xl font-bold mb-5 mt-10">📌 Flowbite Calendar Example</h1>

        <!-- 📧 Flowbite Form -->
        <form class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    email</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"
                    required />
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    password</label>
                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div class="flex items-start mb-5">
                <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 
                   focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 
                   dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                </div>
                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember
                    me</label>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
               focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
               text-sm w-full sm:w-auto px-5 py-2.5 text-center 
               dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
            </button>
        </form>

        <!-- ⏰ Flowbite Modal Trigger -->
        <button type="button" data-modal-target="timepicker-modal" data-modal-toggle="timepicker-modal" class="mt-6 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 
             focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium 
             rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center 
             dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 
             dark:text-white dark:hover:bg-gray-700">
            Schedule appointment
        </button>

        <!-- 🕑 Flowbite Modal (inline-datepicker + time slots) -->
        <div id="timepicker-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 
             z-50 justify-center items-center w-full md:inset-0 
             h-[calc(100%-1rem)] max-h-full">
            <!-- your modal content unchanged... -->
        </div>
    </AuthenticatedLayout>
</template>
