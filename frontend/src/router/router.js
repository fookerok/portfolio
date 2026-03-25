import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login.vue'
import Admin from '../pages/Admin.vue'
import List from '../pages/List.vue'
import Projects from '../pages/Projects.vue'
import AddProject from '../pages/AddProject.vue'
import Info from '../pages/Info.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/admin/projects',
    component: Projects
  },
  {
    path: '/admin/projects/add',
    component: AddProject
  },
  {
    path: '/',
    component: List
  },
  {
    path: '/admin/info',
    component: Info
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) =>{
  const token = localStorage.getItem('token')
  if (to.path.startsWith('/admin') && !token){
    next('/login')
  }
  else {
    next()
  }
})
export default router