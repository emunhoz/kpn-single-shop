<template>
  <button :class="checked ? 'active' : null">
    <label>
      <input type="checkbox" :checked="checked" @change="handleChange" />
      {{ name }}
    </label>
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checked: this.value,
    }
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
button {
  background: none;
  border-radius: 20px;
  cursor: pointer;
  border: 1px dashed #5d5d5d;
  transition: all 0.1s ease-out;
}

button:hover {
  transform: scale(0.95);
}

button.active {
  background: #09f;
  color: #fff;
}

button.active:hover {
  text-decoration: line-through;
  opacity: 0.4;
}

label {
  display: block;
  padding: 14px 20px;
}

input {
  display: none;
}

input:checked {
  color: red;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
}
</style>
