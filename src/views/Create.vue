<template>
  <v-form
    class="pa-5"
    ref="form"
    lazy-validation
    @submit.prevent="save"
  >
    <v-text-field
      v-model="name"
      :rules="[rules.required]"
      label="Name"
    />
    <v-text-field
      v-model="age"
      :rules="[rules.required, rules.age]"
      label="Age"
    />
    <v-text-field
      v-model="salary"
      :rules="[rules.required, rules.salary]"
      label="Salary"
      prefix="$"
    />
    <v-row>
      <v-spacer />
      <v-btn
        class="ml-3"
        color="success"
        type="submit"
        :loading="loading"
      >
        Create employee
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { handleApiError } from '@/lib/apiError'
import { rules } from '@/lib/rules'

export default {
  name: 'Create',
  data: () => ({
    loading: false,
    name: '',
    age: '',
    salary: '',
    rules
  }),
  methods: {
    save () {
      if (!this.$refs.form.validate() || this.loading) return
      this.loading = true
      this.$store.dispatch('employee/create', {
        employee_name: this.name,
        employee_age: this.age,
        employee_salary: this.salary
      }).then((id) => {
        this.$router.push({ name: 'employee', params: { employeeId: id } })
      }).catch(handleApiError)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
