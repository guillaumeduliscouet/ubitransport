import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeesList from '../views/EmployeesList'
import Create from '../views/Create.vue'
import Employee from '../views/Employee'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: EmployeesList
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/employee/:employeeId',
    name: 'employee',
    component: Employee
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
