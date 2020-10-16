<template>
  <div>
    <div class="caption">
      {{ label }}
    </div>
    <div
      v-if="isEmpty"
      class="grey--text"
    >
      (empty)
    </div>
    <div v-else>
      <slot v-bind="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script>
import { isEmpty, isNil } from 'ramda'

export default {
  name: 'LabeledInfo',
  props: {
    label: {
      type: String,
      required: true
    },
    content: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    isEmpty () {
      return isEmpty(this.content) || isNil(this.content)
    }
  }
}
</script>
