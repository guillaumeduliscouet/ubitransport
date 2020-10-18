<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="save"
  >
    <v-text-field
      v-model="item.employee_name"
      :rules="[rules.required]"
      label="Name"
    />
    <v-text-field
      v-model="item.employee_age"
      :rules="[rules.required, rules.age]"
      label="Age"
    />
    <v-text-field
      v-model="item.employee_salary"
      :rules="[rules.required, rules.salary]"
      label="Salary"
      prefix="$"
    />
    <v-row>
      <v-spacer />
      <v-btn
        color="success"
        type="submit"
        :loading="loading"
      >
        Save
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { pick } from 'ramda'
import { rules } from '@/lib/rules'
import { handleApiError } from '@/lib/apiError'
import Employee from '@/store/models/Employee'

export default {
  name: 'EditForm',
  props: {
    employeeId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    loading: false,
    item: null,
    rules
  }),
  created () {
    this.item = pick([
      'employee_name',
      'employee_age',
      'employee_salary'
    ], Employee.find(this.employeeId))
  },
  methods: {
    save () {
      if (!this.$refs.form.validate() || this.loading) return
      this.loading = true
      this.$store.dispatch('employee/update', {
        id: this.employeeId,
        data: this.item
      }).then(() => {
        this.$emit('close')
      }).catch(handleApiError)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
