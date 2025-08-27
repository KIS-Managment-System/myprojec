<script setup lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);



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
// --------------------------
// Menu Items
// --------------------------
// const menuItems = [
//   {
//     key: '1',
//     icon: () => h(PieChartOutlined),
//     label: h('a', { href: '/' }, 'home') // use translation key
//   },
//   {
//     key: '2',
//     icon: () => h(DesktopOutlined),
//     label: h('a', { href: '/contact' }, 'Contact')
//   },
//   {
//     key: '3',
//     icon: () => h(InboxOutlined),
//     label: h('a', { href: '/profile' }, 'Profile')
//   },

//   {
//     key: 'sub1',
//     icon: () => h(MailOutlined),
//     label: 'Navigation One',
//     children: [
//       { key: '5', label: 'Option 5' },
//       { key: '6', label: 'Option 6' },
//       { key: '7', label: 'Option 7' },

//       {
//         key: '2',
//         icon: () => h(DesktopOutlined),
//         label: h('a', { href: '/contact' }, 'Contact')
//       },
//     ],
//   },
// ];





// Role-based menu items
import { ref, computed, onMounted } from 'vue';

const userRole = ref('admin'); // default role
onMounted(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userRole.value = user.role || 'admin';
});


const allMenuItems = [

 

    {
        key: '2',
        icon: () => h(DesktopOutlined),
        label: h('a', { href: '/dashboard' }, 'dashboard'),
        roles: ['admin', 'user']
    },
    {
        key: '3',
        icon: () => h(InboxOutlined),
        label: h('a', { href: '/profile' }, 'Profile'),
        roles: ['admin']
    },


    {
        key: 'sub1',
        icon: () => h(MailOutlined),
        label: 'Navigation One',
        roles: ['admin'], // only admin sees this
        children: [
            { key: '5', label: 'Option 5', roles: ['admin'] },
            { key: '6', label: 'Option 6', roles: ['admin'] },
            { key: '7', label: 'Option 7', roles: ['admin'] },
        ]
    },
];


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
            <div class="sidebar-container" :style="{ backgroundColor: isDarkMode ? '#343434FF' : '#FFFFFFFF' }">

                <!-- 🟢 Logo Section -->
                <div class="logo">
                    <img src="https://www.paragonisc.edu.kh/wp-content/uploads/2023/08/Moeys-01.png" alt="Logo"
                        class="logo-img" />
                    <span v-if="!collapsed" class="logo-text">My School</span>
                </div>








                <!-- Collapse Button -->
                <!-- Allows the sidebar to be collapsed or expanded -->
                <a-button type="primary" style="margin: 10px" @click="toggleCollapsed">
                    <MenuUnfoldOutlined v-if="collapsed" />
                    <MenuFoldOutlined v-else />
                </a-button>



                <a-switch style="margin: 10px" :checked="isDarkMode" checked-children="Dark" un-checked-children="Light"
                    @change="toggleTheme" />
                <br>


                <!-- Sidebar Menu -->
                <!-- Contains navigation items. Scrollable if items overflow -->
                <div class="menu-scroll  scroll">
                    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="light"
                        :inline-collapsed="collapsed" :items="menuItems" />
                </div>



                <div class="user-details" style="position: absolute;
         bottom: 0; 
         width: 100%;
          padding: 10px;  
           align-items: center; 
           justify-content: space-between;
      
            
           ">

                    <!-- <a-avatar :size="34" src="https://avatars.githubusercontent.com/u/160134498?v=4"
                        style="margin: 2px; ">

                    </a-avatar> -->

                    <div class="">
                        <!-- <div class="text-base font-medium text-gray-800">
                            {{ $page.props.auth.user.name }}
                        </div> -->
                        <div class=" " :href="route('profile.edit')">


                            <ResponsiveNavLink :href="route('profile.edit')">
                                <a-typography-title :level="5" v-if="!collapsed">
                                    {{ $page.props.auth.user.email }}
                                </a-typography-title>

                            </ResponsiveNavLink>
                        </div>
                    </div>

                    <div class=" ">

                        <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>




                </div>



            </div>

        </a-layout-sider>


        <!-- Drawer for Mobile -->
        <!-- Only visible on mobile devices -->
        <a-drawer v-if="isMobile" placement="left" :open="showDrawer" @close="showDrawer = false" width="256"
            :body-style="{ padding: '0' }" :header-style="{ display: 'none' }">

            <!-- 🟢 Logo in Mobile Drawer -->
            <div class="logo">
                <img src="https://www.paragonisc.edu.kh/wp-content/uploads/2023/08/Moeys-01.png" alt="Logo"
                    class="logo-img" />
                <span class="logo-text">My School</span>
            </div>

            <!-- Mobile Menu -->
            <!-- Scrollable menu items for mobile drawer -->
            <div class="sidebar-container menu-scroll">
                <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="light"
                    :items="menuItems" />
            </div>




            <a-switch style="margin: 10px" :checked="isDarkMode" checked-children="Dark" un-checked-children="Light"
                @change="toggleTheme" />
            <br>

  
                <div class=" " :href="route('profile.edit')">


                    <ResponsiveNavLink :href="route('profile.edit')">
                        <a-typography-title :level="5" v-if="!collapsed">
                            {{ $page.props.auth.user.email }}
                        </a-typography-title>

                    </ResponsiveNavLink>
                </div>
       

            <div class=" ">

                <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                    Log Out
                </ResponsiveNavLink>
            </div>





        </a-drawer>

        <!-- Main Content Layout -->
        <a-layout>
            <!-- Header -->
            <a-layout-header :style="{
                backgroundColor: '#15047FFF', // colorPrimary
                height: '56px',               // header height
                display: 'flex',              // align items with flexbox
                alignItems: 'center',
                fontSize: '11px',             // token fontSize
            }"
                style="background: #0061F1FF; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 16px;">
                <!-- Left side: Back button + Header title -->


                <div style="display: flex; align-items: center;">
                    <a-button type="text" @click="goBack" style="margin-right: 8px;">
                        <ArrowLeftOutlined />
                    </a-button>
                    <span>{{ props.headerTitle || '' }}</span>
                </div>

                <!-- Right side: Mobile menu toggle -->
                <div v-if="isMobile">
                    <a-button type="primary" @click="showDrawer = true">
                        <MenuUnfoldOutlined />
                    </a-button>
                </div>
            </a-layout-header>



            <!-- Main content area -->
            <a-layout-content class="menu-scroll p-5"
                :style="{ backgroundColor: isDarkMode ? '#232323FF' : '#FFFFFFFF' }">
                <slot />

            </a-layout-content>

        </a-layout>
    </a-layout>








</template>








<style scoped>
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
    max-height: calc( 60vh );
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
    background: #0468c5;
    /* Logo background color */
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
    margin: 12px;
    width: calc(100% - 24px);
    text-align: left;
    color: v-bind('token.colorText');
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
