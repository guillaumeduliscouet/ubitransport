<template>
  <v-list-item
    :to="{ name: 'employee', params: { employeeId: employee.id } }"
    :disabled="loading"
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
        age: {{ employee.employee_age }} | salary: $ {{ employee.employee_salary }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon :loading="loading">
        <v-icon
          color="grey lighten-1"
          @click.prevent="remove"
        >
          mdi-delete
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { handleApiError } from '@/lib/apiError'

export default {
  name: 'EmployeesListItem',
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    remove () {
      this.loading = true
      this.$store.dispatch('employee/remove', this.employee.id)
        .catch(handleApiError)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
