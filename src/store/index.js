import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import Employee from './models/Employee'
import snackbar from './modules/snackbar'
import employee from './modules/employee'

Vue.use(Vuex)

const database = new VuexORM.Database()
database.register(Employee)

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  modules: {
    snackbar,
    employee
  }
})
