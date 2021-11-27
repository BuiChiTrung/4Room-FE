import { createApp } from 'vue'
import App from './App.vue'
import Chat from 'vue3-beautiful-chat'
import router from './router'
import store from './store/index'
import Pusher from 'pusher-js/with-encryption';

Pusher.logToConsole = true;

window.pusher = new Pusher('3ef48bd1a87852f6ef19', {
    cluster: 'ap1',
    authEndpoint: "http://localhost:8000/broadcasting/auth",
    auth: { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') } }
});

createApp(App).use(router).use(store).use(Chat).mount('#app')
