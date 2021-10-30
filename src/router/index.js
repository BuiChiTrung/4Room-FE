import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home/HomePage.vue'
import LoginPage from '../views/login/LoginPage'
import RoomPage from "@/views/room/RoomPage";
import ProfilePage from "@/views/profile/ProfilePage";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/room',
    name: 'Room',
    component: RoomPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
