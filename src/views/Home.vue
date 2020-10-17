<template>
  <div>
    <v-list
      two-line
      color="transparent"
    >
      <v-text-field
        v-model="search"
        class="ma-3"
        placeholder="Search an employee"
        prepend-inner-icon="mdi-magnify"
        outlined
        hide-details
      />
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
            <v-icon
              color="grey lighten-1"
              @click.prevent="remove(employee.id)"
            >
              mdi-delete
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-pagination
      v-model="page"
      class="pa-3"
      :length="nbPages"
    ></v-pagination>

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

const ITEMS_PER_PAGE = 10

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    search: '',
    page: 1
  }),
  computed: {
    employees () {
      return Employee.query()
        .where('employee_name', v => v.includes(this.search))
        .orderBy('employee_name')
        .limit(ITEMS_PER_PAGE)
        .offset((this.page - 1) * ITEMS_PER_PAGE)
        .get()
    },
    nbPages () {
      const count = Employee.query()
        .where('employee_name', v => v.includes(this.search))
        .count()
      return Math.ceil(count / ITEMS_PER_PAGE)
    }
  },
  created () {
    this.$store.dispatch('employee/fetchAll')
      .catch(handleApiError)
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    remove (id) {
      this.$store.dispatch('employee/remove', id)
        .catch(handleApiError)
    }
  }
}
</script>
