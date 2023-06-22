<template>
  <label :for="name" :class="[labelClass, checked ? 'active' : null]">
    <input
      :id="name"
      type="checkbox"
      value="Hello"
      :checked="checked"
      @change="handleChange"
    />
    {{ name }}
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: '',
      validator: (value) => ['primary', 'secondary'].includes(value),
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checked: this.value,
      text: this.type,
    }
  },
  computed: {
    labelClass() {
      return this.variant
    },
  },
  methods: {
    handleChange(event) {
      this.checked = event.target.checked
      this.$emit('update:modelValue', this.checked)
    },
  },
}
</script>
<style scoped>
.primary {
  border: 1px dashed #5d5d5d;
  background: none;
  color: #000;
}

.secondary {
  border: 1px solid #5d5d5d;
  background: none;
  color: black;
}

label {
  border: 1px dashed #5d5d5d;
  background: none;
  border-radius: 20px;
  transition: all 0.1s ease-out;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
}

label:hover {
  transform: scale(0.95);
}

.active {
  background: #09f;
  color: #fff;
  border: 1px solid rgb(0, 115, 192);
}

.active:hover {
  text-decoration: line-through;
  opacity: 0.4;
}

input {
  display: none;
}
</style>
