import { Model } from '@vuex-orm/core'

export default class User extends Model {
  static entity = 'employees'

  static fields () {
    return {
      id: this.attr(null),
      employee_name: this.attr(''),
      employee_age: this.attr(''),
      employee_salary: this.attr('')
    }
  }
}
