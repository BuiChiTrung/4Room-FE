import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home/HomePage.vue'
import LoginPage from '../views/auth/LoginPage'
import RoomPage from "@/views/room/RoomPage";
import ProfilePage from "@/views/profile/ProfilePage";
import RegisterPage from "@/views/auth/RegisterPage";
import PomodoroClock from "@/views/room/PomodoroClock";
import {authApi} from "../infrastructure/apiServices";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {unProtectedRoute: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: {unProtectedRoute: true}
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/room/:name',
    name: 'Room',
    component: RoomPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/profile/:id',
    name: 'User Profile',
    component: ProfilePage
  },
  {
    path: '/pomodoro',
    name: 'Pomodoro',
    component: PomodoroClock
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    if (to.meta['unProtectedRoute']) {
        next();
    } else {
        authApi.jwtValidate()
            .then(() => next())
            .catch(() => next('/login'))
    }
})

export default router
