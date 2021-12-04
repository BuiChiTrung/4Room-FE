import { createApp } from 'vue'
import App from './App.vue'
import Chat from 'vue3-beautiful-chat'
import router from './router'
import store from './store/index'
import Pusher from 'pusher-js/with-encryption';
import {baseBroadcastUrl} from "./env";

Pusher.logToConsole = true;

window.pusher = new Pusher('3ef48bd1a87852f6ef19', {
    cluster: 'ap1',
    authEndpoint: `${baseBroadcastUrl}/broadcasting/auth`,
    auth: { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') } }
});

createApp(App).use(router).use(store).use(Chat).mount('#app')
