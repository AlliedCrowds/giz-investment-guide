<template>
  <select
    class="select2 selectStyle"
    :disabled="disabled"
    :required="required"
    :name="name"
    @change="$emit('change', $event.target.value)"
    @keydown="$emit('change', $event.target.value)"
  >
    <option v-if="placeholder" :disabled="open">{{ placeholder }}</option>
    <option
      v-for="option of options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      :title="option.title"
      >{{ option.label }}</option
    >
  </select>
</template>
<script>
export default {
  name: 'jquery-select',
  data: () => ({
    open: false,
  }),
  props: {
    disabled: {
      type: Boolean,
      require: false,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mounted() {
    $(this.$el).selectmenu({
      open: () => {
        this.open = true
      },
      close: () => {
        this.open = false
      },
      select: () => {
        this.$emit('change', this.$el.value)
      },
    })
  },
  updated() {
    $(this.$el).selectmenu('refresh')
  },
}
</script>
