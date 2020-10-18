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
      <EmployeesListItem
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
      />
    </v-list>

    <v-pagination
      v-model="page"
      class="pa-3"
      :length="nbPages"
    />

    <v-progress-linear
      :active="loading"
      indeterminate
      absolute
      top
    />

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
import EmployeesListItem from './components/EmployeesListItem.vue'

const ITEMS_PER_PAGE = 10

export default {
  name: 'EmployeesList',
  components: {
    EmployeesListItem
  },
  data: () => ({
    loading: true,
    search: '',
    page: 1
  }),
  watch: {
    search () {
      this.page = 1
    },
    nbPages (val) {
      this.page = Math.min(this.page, this.nbPages)
    }
  },
  computed: {
    employees () {
      return Employee.query()
        .where('employee_name', v => v.includes(this.search))
        .orderBy(e => e.employee_name.toLowerCase())
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
  }
}
</script>
