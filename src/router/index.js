import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import CheckAttendancePage from '@/views/CheckAttendancePage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import LeaveReqPage from '@/views/LeaveReqPage.vue'
import ApprovePage from '@/views/ApprovePage.vue'

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
      path: '/home/admin',
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
