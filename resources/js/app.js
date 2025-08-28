import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h, ref, watch } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

import Antd, { ConfigProvider } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { i18n } from './i18n';
import { currentTheme } from './theme/store/theme';

import km_KH from 'ant-design-vue/es/locale/km_KH';
import en_US from 'ant-design-vue/es/locale/en_US';

import './dayjs-km';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        ),
    setup({ el, App, props, plugin }) {
        // Load saved locale from localStorage or fallback to 'km'
        const savedLocale = localStorage.getItem('locale') || i18n.global.locale.value;
        i18n.global.locale.value = savedLocale;

        const antdLocale = ref(savedLocale === 'km' ? km_KH : en_US);

        // Watch Vue I18n locale and update Antd locale reactively
        watch(
            () => i18n.global.locale.value,
            (newLocale) => {
                if (newLocale === 'km') antdLocale.value = km_KH;
                else if (newLocale === 'en') antdLocale.value = en_US;

                // Save selection to localStorage
                localStorage.setItem('locale', newLocale);
            }
        );

        return createApp({
            render: () =>
                h(
                    ConfigProvider,
                    {
                        theme: currentTheme.value,
                        locale: antdLocale.value, // reactive Antd locale
                    },
                    [h(App, props)]
                ),
        })
            .use(Antd)
            .use(i18n)
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
