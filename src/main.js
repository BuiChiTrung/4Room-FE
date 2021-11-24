import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Pusher from 'pusher-js/with-encryption';

Pusher.logToConsole = true;

window.pusher = new Pusher('3ef48bd1a87852f6ef19', {
    cluster: 'ap1',
    authEndpoint: "http://localhost:8000/broadcasting/auth",
    auth: { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') } }
});


// const channel = pusher.subscribe('private-notification_user.' + JSON.parse(localStorage.getItem('user_info'))['id']);
// channel.bind('NotificationUpdate', function(data) {
//     console.log(data, 'hahahahaha');
//     // app.messages.push(JSON.stringify(data));
// });

// window.Pusher = require('pusher-js');
// window.Pusher.logToConsole = true;
//
// window.Echo =
//     new Echo({
//         broadcaster: 'pusher',
//         key: "3ef48bd1a87852f6ef19",
//         cluster: "ap1",
//         encrypted: true,
//         logToConsole: true,
//         // eslint-disable-next-line no-unused-vars
//         authorizer: (channel, options) => {
//             return {
//                 authorize: (socketId, callback) => {
//                     axios.post('http://localhost:8000/broadcasting/auth', {
//                         socket_id: socketId,
//                         channel_name: channel.name
//                     }, {
//                         headers: {
//                             'Authorization': 'Bearer ' + localStorage.getItem('jwt')
//                         }
//                     })
//                         .then(response => {
//                             console.log('wat');
//                             callback(false, response.data);
//                         })
//                         .catch(error => {
//                             console.log(error);
//                             callback(true, error);
//                         });
//                 }
//             };
//         },
//     });
//
// window.Echo.private('notification_user.31')
//     .listen('NotificationUpdate', (e) => {
//         // alert('hihi');
//         console.log('wow');
//         alert(e.notification);
//     });


createApp(App).use(router).use(store).mount('#app')
