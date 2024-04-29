import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import CheckAttendancePage from '@/views/CheckAttendancePage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import LeaveReqPage from '@/views/LeaveReqPage.vue'
import ApprovePage from '@/views/ApprovePage.vue'
import HelpPage from '@/views/HelpPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import ChangePasswordPage from '@/views/ChangePasswordPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/approve-sw',
      name: 'admin',
      component: CheckAttendancePage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/leave-req',
      name: 'leave-req',
      component: LeaveReqPage
    },
    {
      path: '/approve-lr',
      name: 'approve',
      component: ApprovePage
    },
    {
      path: '/help',
      name: 'help',
      component: HelpPage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/reset-password/:token',
      name: 'change-password',
      component: ChangePasswordPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/register' && to.path !== '/' && localStorage.getItem('token') == null) {
    next('/');
  } else {
    next();
  }
});

export default router
