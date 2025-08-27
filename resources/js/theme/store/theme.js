// resources/js/theme/store/theme.js
import { ref, computed, watch } from 'vue';
import lightTheme from '../antd-theme-light.json';
import darkTheme from '../antd-theme-dark.json';
import { theme as antdTheme } from 'ant-design-vue';

// load initial value from localStorage or default to false
export const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');

export const currentTheme = computed(() => ({
  ...lightTheme,
  ...(isDarkMode.value ? darkTheme : {}),
  algorithm: isDarkMode.value ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
}));


// watch for changes and save to localStorage
watch(isDarkMode, (val) => {
  localStorage.setItem('darkMode', val);
});
