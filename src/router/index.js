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
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'
import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue'

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
      name: 'reset-password',
      component: ResetPasswordPage
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (to.path === '/' && isAuthenticated) {
      // If already authenticated and trying to access login page, redirect to home or dashboard
      next('/home'); // Change '/home' to your desired home page route
  } else if (!isAuthenticated && to.path !== '/' && to.path !== '/register' && to.name !== 'reset-password' && to.path !== '/forgot-password') {
      // If not authenticated and trying to access a route other than login or register, redirect to login page
      next('/');
  } else {
      // Proceed to the route if authenticated or trying to access register
      next();
  }
});
export default router
