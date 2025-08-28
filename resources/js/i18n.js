// resources/js/i18n.js
import { createI18n } from 'vue-i18n';



export const messages = {
  en: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    submit: 'Submit',
    welcome: 'Welcome',
    email: 'Your email',
    password: 'Your password',
    confirm_password: 'Confirm Password',
    name: 'Name',
    login: 'Log in',
    register: 'Register',
    remember_me: 'Remember me',
    forgot_password: 'Forgot your password?',
    dark: 'Dark',
    light: 'Light',
    logout: 'Log Out',
    settings: 'Settings',
    home: 'Home',
    contact: 'Contact',
    language: 'Language',
    theme: 'Theme',
    notifications: 'Notifications',
    search: 'Search',
    help: 'Help',
    about: 'About',
    already_registered: 'Already registered?',
  },
  km: {
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    profile: 'ប្រូហ្វាយ',
    submit: 'ដាក់ស្នើ',
    welcome: 'ស្វាគមន៍',
    email: 'អ៊ីម៉ែលរបស់អ្នក',
    password: 'ពាក្យសម្ងាត់',
    confirm_password: 'បញ្ជាក់ពាក្យសម្ងាត់',
    name: 'ឈ្មោះ',
    login: 'ចូល',
    register: 'ចុះឈ្មោះ',
    remember_me: 'ចងចាំខ្ញុំ',
    forgot_password: 'ភ្លេចពាក្យសម្ងាត់?',
    dark: 'ងងឹត',
    light: 'ស្រាល',
    logout: 'ចេញ​ពីប្រព័ន្ធ',
    settings: 'ការកំណត់',
    home: 'ទំព័រដើម',
    contact: 'ទំនាក់ទំនង',
    language: 'ភាសា',
    theme: 'ប្រធានបទ',
    notifications: 'ការជូនដំណឹង',
    search: 'ស្វែងរក',
    help: 'ជំនួយ',
    about: 'អំពី',
    already_registered: 'មានគណនីរួចហើយ?',
  },
};




// Load saved locale from localStorage or fallback to 'km'
const savedLocale = localStorage.getItem('locale') || 'km';



export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
    messages,
});
