import { http } from '@/lib/http'
import Employee from '@/store/models/Employee'

export default {
  namespaced: true,
  actions: {
    fetchAll () {
      return http({
        method: 'get',
        url: '/employees'
      }).then(({ data: { data } }) => {
        Employee.insert({ data })
      })
    },
    fetch (context, id) {
      return http({
        method: 'get',
        url: `/employee/${id}`
      }).then(({ data: { data } }) => {
        // on dummy.restapiexample.com fetching a created resource successfully return `null`
        if (data) Employee.insert({ data })
      })
    },
    create (context, data) {
      return http({
        method: 'post',
        url: '/create',
        data
      }).then(({ data: { data: { id } } }) => {
        // dummy.restapiexample.com only returns the id, and the resource is not really created: we simulate a new ressource
        Employee.insert({
          data: {
            id,
            ...data
          }
        })
        return id
      })
    },
    update (context, { id, data }) {
      return http({
        method: 'put',
        url: `/update/${id}`,
        data
      }).then(() => {
        Employee.insert({
          data: {
            id,
            ...data
          }
        })
      })
    },
    remove (context, id) {
      return http({
        method: 'delete',
        url: `/delete/${id}`
      }).then(() => {
        Employee.delete(id)
      })
    }
  }
}
