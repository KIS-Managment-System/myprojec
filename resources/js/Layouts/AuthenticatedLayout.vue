<script setup lang="ts">
import { h, onBeforeUnmount } from 'vue';
// Ant icon
import {
    MenuUnfoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    InboxOutlined,
    MailOutlined,
    MenuFoldOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons-vue';

// --------------------------
// theme
// --------------------------
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();

import { isDarkMode } from '../theme/store/theme';
function toggleTheme(checked) {
    isDarkMode.value = checked;
}

// --------------------------
// end theme
// --------------------------


//  🌐 i18n setup
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n(); // <-- make sure it's inside setup
// for slect
function switchLocale(lang: string) {
    locale.value = lang;
}
// for switch  
function toggleLocale() {
    currentLocale.value = currentLocale.value === 'en' ? 'km' : 'en';
    switchLocale(currentLocale.value);
}

import { watch } from 'vue';
const currentLocale = ref(locale.value);
watch(locale, (newVal) => {
    currentLocale.value = newVal;
});









const props = defineProps<{
    headerTitle?: string
}>()

function goBack() {
    // Use Inertia if available, fallback to browser history
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Inertia.visit('/');
    }
}

// --------------------------
// Reactive variables
// --------------------------
const collapsed = ref(false); // Sidebar collapse state
const showDrawer = ref(false); // Drawer open state (mobile)
const isMobile = ref(window.innerWidth < 768); // Detect if device is mobile

const openKeys = ref(['sub1']); // Currently open submenu keys


const selectedKeys = ref([getCurrentKey()]);
function getCurrentKey() {
    const path = window.location.pathname; // current URL path
    const pathKeyMap: Record<string, string> = {
        '/': '1',
        '/contact': '2',
        '/profile': '3',

    };
    return pathKeyMap[path] || '1';
}





import { Link } from '@inertiajs/vue3';

// Role-based menu items
import { ref, computed, onMounted } from 'vue';

const userRole = ref('admin'); // default role
onMounted(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userRole.value = user.role || 'admin';
});


const allMenuItemsRaw = [
    { key: '2', icon: () => h(DesktopOutlined), labelKey: 'dashboard', href: '/dashboard', roles: ['admin', 'user'] },
    { key: '3', icon: () => h(InboxOutlined), labelKey: 'profile', href: '/profile', roles: ['admin'] },




];



const allMenuItems = allMenuItemsRaw.map(item => ({
    ...item,
    label: h(Link, { href: item.href }, () => t(item.labelKey))
}));





function filterItemsByRole(items: any[], role: string) {
    return items
        .filter(item => !item.roles || item.roles.includes(role))
        .map(item => ({
            ...item,
            children: item.children ? filterItemsByRole(item.children, role) : undefined
        }));
}

const menuItems = computed(() => filterItemsByRole(allMenuItems, userRole.value));

// --------------------------
//end Role-based menu items
// --------------------------












// --------------------------
// Functions
// --------------------------

// Toggle sidebar collapse (desktop)
function toggleCollapsed() {
    collapsed.value = !collapsed.value;
}

// Update collapse state from layout
function onCollapse(c: boolean) {
    collapsed.value = c;
}

// Handle window resize to toggle mobile view
function handleResize() {
    isMobile.value = window.innerWidth < 768;
    if (!isMobile.value) showDrawer.value = false; // Close drawer if switching to desktop
}

// Add event listeners
onMounted(() => window.addEventListener('resize', handleResize));
onBeforeUnmount(() => window.removeEventListener('resize', handleResize));
</script>

<template>


    <a-layout has-sider style="height: 100vh">
        <!-- Sidebar for Desktop  collapsible-->
        <a-layout-sider v-if="!isMobile" :collapsed="collapsed" :width="256" @collapse="onCollapse">
            <div class="sidebar-container" :style="{ backgroundColor: isDarkMode ? '#141414' : token.colorBgLayout }">

                <!-- 🟢 Logo Section -->
                <div class="logo ">
                    <div class="d-flex align-items-center p-2 bg-primary">
                        <img src="/logo.jpg" alt="Logo" class="rounded-circle me-2" :style="{
                            height: collapsed ? '36px' : '55px',
                            width: collapsed ? '36px' : '55px',
                            borderRadius: '50%'
                        }" />
                    </div>
                    <span v-if="!collapsed" class="logo-text">My School</span>
                </div>


                <!-- Collapse Button -->
                <a-button type="primary" @click="toggleCollapsed" class="collapse-btn">
                    <MenuUnfoldOutlined v-if="collapsed" />
                    <MenuFoldOutlined v-else />
                </a-button>

                <!-- Sidebar Menu -->
                <div class="menu-scroll  scroll">
                    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="light"
                        :inline-collapsed="collapsed" :items="menuItems" />






                </div>

            </div>
        </a-layout-sider>


        <!-- Drawer for Mobile -->
        <a-drawer v-if="isMobile" placement="left" :open="showDrawer" @close="showDrawer = false" width="256"
            :body-style="{ padding: '0' }" :header-style="{ display: 'none' }">
            <!-- 🟢 Logo in Mobile Drawer -->
            <div class="logo">
                <div class="d-flex align-items-center p-2 bg-primary">
                    <img src="/logo.jpg" alt="Logo" class="rounded-circle me-2" :style="{
                        height: collapsed ? '36px' : '55px',
                        width: collapsed ? '36px' : '55px',
                        borderRadius: '50%'
                    }" />
                </div>
                <span class="logo-text">My School</span>
            </div>

            <!-- Mobile Menu -->
            <div class="sidebar-container menu-scroll">
                <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="light"
                    :items="menuItems" />
            </div>

            <a-switch style="margin: 10px" :checked="isDarkMode" checked-children="Dark" un-checked-children="Light"
                @change="toggleTheme" />
            <br>
            <div class="flex items-center space-x-3">
                <a-dropdown>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item :key="1" @click="$inertia.get(route('profile.edit'))">
                                Profile
                            </a-menu-item>
                            <a-menu-item :key="2" @click="$inertia.post(route('logout'))">
                                Log Out
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <!-- Clickable Avatar -->
                    <a-avatar :size="34"
                        :src="$page.props.auth.user.profile_photo_url || 'https://avatars.githubusercontent.com/u/160134498?v=4'"
                        style="cursor: pointer;" alt="User Avatar" />
                </a-dropdown>
                <!-- Email text vertically centered -->
                <span v-if="!collapsed" class="text-sm  flex items-center">
                    {{ $page.props.auth.user.email }}
                </span>
            </div>
        </a-drawer>

        <!-- Main Content Layout -->
        <a-layout>
            <!-- Header -->
            <a-layout-header :style="{
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '11px',
                backgroundColor: token.colorPrimary || '#15047F',
            }"
                style=" color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 16px;">
                <!-- Left side: Back button + Header title -->

                <div style="display: flex; align-items: center;">
                    <a-button type="text" @click="goBack" style="margin-right: 8px;">
                        <ArrowLeftOutlined />
                    </a-button>
                    {{ props.headerTitle }}
                </div>
                <!-- Right side: Mobile menu toggle -->
                <div v-if="isMobile">
                    <a-button type="primary" @click="showDrawer = true">
                        <MenuUnfoldOutlined />
                    </a-button>
                </div>




                <div v-if="!isMobile" class="flex items-center space-x-3">

                    <!-- <a-switch v-if="!isMobile" style="margin: 10px" :checked="isDarkMode" checked-children="Dark"
                        un-checked-children="Light" @change="toggleTheme" /> -->


                    <a-switch v-if="!isMobile" style="margin: 10px" :checked="isDarkMode" :checked-children="t('dark')"
                        :un-checked-children="t('light')" @change="toggleTheme" />



                    <a-switch :checked="currentLocale === 'km'" checked-children="​ខ្មែរ" un-checked-children="EN"
                        @change="toggleLocale" />



                    <!-- Switch ជាមួយទង់ជាតិ -->
                    <!-- <a-switch :checked="currentLocale === 'km'" @change="toggleLocale">
                        <template #checkedChildren style="display: flex;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/1200px-Flag_of_Cambodia.svg.png"
                                alt="ខ្មែរ" style="width: 30px;" />
                        </template>
                        <template #unCheckedChildren>
                            🇺🇸 English
                        </template>
                    </a-switch> -->


                    <a-dropdown>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item class="text-sm  flex items-center">
                                    {{ t('email') }}:
                                    {{ $page.props.auth.user.email }}
                                </a-menu-item>
                                <a-menu-item :key="1" @click="$inertia.get(route('profile.edit'))">
                                    {{ t('profile') }}
                                </a-menu-item>
                                <a-menu-item :key="2" @click="$inertia.post(route('logout'))">
                                    {{ t('logout') }}
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <!-- Clickable Avatar -->
                        <a-avatar :size="34"
                            :src="$page.props.auth.user.profile_photo_url || 'https://avatars.githubusercontent.com/u/160134498?v=4'"
                            style="cursor: pointer;" alt="User Avatar" />
                    </a-dropdown>
                    <!-- Email text vertically centered -->
                </div>
            </a-layout-header>

            <!-- Main content area -->
            <a-layout-content class="menu-scroll p-5 h-100 "
                :style="{ backgroundColor: isDarkMode ? token.colorBgLayout : '#FFFFFFD1' }">
                <slot />
            </a-layout-content>

        </a-layout>
    </a-layout>


</template>








<style scoped>
.ant-select-item {
    background-color: #15047F !important;
    color: #fff !important;
}

.ant-select-item-option-selected {
    background-color: #0d0d0d !important;
}

/* --------------------------
   Sidebar container
-------------------------- */
.sidebar-container {
    height: 100%;
}

/* --------------------------S
   Scrollable menu
-------------------------- */
.menu-scroll {
    max-height: calc(100vh - 64px);
    /* Account for header */
    overflow-y: auto;
    overflow-x: hidden;
}

.scroll {
    max-height: calc(60vh);
    margin-bottom: 500px;
    /* Account for header */
    overflow-y: auto;
    overflow-x: hidden;
}

/* --------------------------
   Logo styling
-------------------------- */
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: v-bind('token.colorPrimary');
    color: v-bind('token.colorText');
}

.logo-img {
    height: 32px;
    width: 32px;
    margin-right: 8px;
}

.logo-text {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    white-space: nowrap;
}



.collapse-btn {
    width: calc(100%);
    border-radius: 0;
    margin-top: 2px;
    background-color: v-bind('token.colorPrimary');
}

.theme-switch {
    margin: 12px;
    width: calc(100% - 24px);
}

.sidebar-menu :deep(.ant-menu-item),
.sidebar-menu :deep(.ant-menu-submenu-title) {
    transition: all 0.3s ease;
}

.sidebar-menu :deep(.ant-menu-item:hover),
.sidebar-menu :deep(.ant-menu-submenu-title:hover) {
    background-color: v-bind('token.colorBgTextHover');
    transform: translateX(4px);
}




</style>
<!-- dd -->