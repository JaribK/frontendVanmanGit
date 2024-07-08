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
import FeedbackPage from '@/views/FeedbackPage.vue'
import FeedbackAdminPage from '@/views/FeedbackAdminPage.vue'
import GraphViewsOfAttendancePage from '@/views/GraphViewsOfAttendancePage.vue'

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
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackPage
    },
    {
      path: '/feedback-admin',
      name: 'feedback-admin',
      component: FeedbackAdminPage
    },
    {
      path: '/graph-attendance-views/:id',
      name: 'graph-attendance-views',
      component: GraphViewsOfAttendancePage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (to.path === '/' && isAuthenticated) {
      next('/home');
  } else if (!isAuthenticated && to.path !== '/' && to.path !== '/register' && to.name !== 'reset-password' && to.path !== '/forgot-password') {
      next('/');
  } else {
      next();
  }
});
export default router
