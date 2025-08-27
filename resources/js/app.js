import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';



import Antd, { ConfigProvider } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';


import { i18n } from './i18n';

import { currentTheme } from './theme/store/theme';
import km_KH from 'ant-design-vue/es/locale/km_KH';
import './dayjs-km';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({
            
            // render: () => h(App, props)

               render: () => h(ConfigProvider, {
        theme: currentTheme.value,
                   locale: km_KH,
                
        }, [h(App, props)])
 




        })
            .use(Antd)
            .use(i18n)   // <-- add this


            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
