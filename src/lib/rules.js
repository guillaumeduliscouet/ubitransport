const required = v => !!v || 'This field is required'

const age = v => {
  if (!/^\d+$/.test(v)) return 'The age should be a positive number'
  return Number(v) < 150 || 'This is way to old'
}

const salary = v => {
  return /^\d+$/.test(v) || 'The salary should be a positive number'
}

export const rules = {
  required,
  age,
  salary
}
