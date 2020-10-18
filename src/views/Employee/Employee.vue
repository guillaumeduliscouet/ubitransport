<template>
  <div class="pa-5">
    <h3 class="text-h4 mb-4">
      Employee #{{ employeeId }}
    </h3>
    <EditForm
      v-if="isEditing"
      :employee-id="employeeId"
      @close="isEditing = false"
    />
    <div v-else-if="employee">
      <LabeledInfo
        label="name"
        :content="employee.employee_name"
      />
      <LabeledInfo
        class="mt-4"
        label="age"
        :content="employee.employee_age"
      />
      <LabeledInfo
        class="mt-4"
        label="salary"
        :content="`$ ${employee.employee_salary}`"
      />
    </div>

    <v-progress-linear
      :active="loading"
      :indeterminate="true"
      absolute
      top
    />

    <v-fab-transition>
      <v-btn
        v-if="employee"
        :key="activeFab.icon"
        :color="activeFab.color"
        fixed
        fab
        bottom
        right
        @click="isEditing = !isEditing"
      >
        <v-icon>{{ activeFab.icon }}</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { handleApiError } from '@/lib/apiError'
import Employee from '@/store/models/Employee'
import LabeledInfo from '@/components/LabeledInfo.vue'
import EditForm from './components/EditForm.vue'

export default {
  name: 'Employee',
  components: {
    LabeledInfo,
    EditForm
  },
  data: () => ({
    isEditing: false,
    loading: true
  }),
  computed: {
    employeeId () {
      return Number(this.$route.params.employeeId)
    },
    employee () {
      return Employee.find(this.employeeId)
    },
    activeFab () {
      return this.isEditing
        ? { icon: 'mdi-close', color: 'error' }
        : { icon: 'mdi-pencil', color: 'success' }
    }
  },
  created () {
    this.$store.dispatch('employee/fetch', this.employeeId)
      .catch(handleApiError)
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
