<template>
  <button>
    <slot></slot>
  </button>
</template>

<script></script>
<style scoped>
button {
  border: 1px dashed #5d5d5d;
  background: none;
  border-radius: 20px;
  transition: all 0.1s ease-out;
  padding: 10px 20px;
}

button:hover {
  transform: scale(0.95);
}
</style>
