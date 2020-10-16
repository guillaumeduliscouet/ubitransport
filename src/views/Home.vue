<template>
  <div>

    <v-list
      subheader
      two-line
      color="transparent"
    >
      <v-subheader inset>Employees</v-subheader>

      <v-list-item
        v-for="employee in employees"
        :key="employee.id"
        :to="{ name: 'employee', params: { employeeId: employee.id } }"
      >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="employee.employee_name" />
          <v-list-item-subtitle>
            age: {{ employee.employee_age }} | salary: {{ employee.employee_salary }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-btn
      color="success"
      fixed
      fab
      bottom
      right
      :to="{ name: 'create' }"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Employee from '@/store/models/Employee'
import { handleApiError } from '@/lib/apiError'

export default {
  name: 'Home',
  data: () => ({
    loading: true
  }),
  computed: {
    employees () {
      return Employee.all()
    }
  },
  created () {
    this.$store.dispatch('employee/fetchAll')
      .catch(handleApiError)
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
