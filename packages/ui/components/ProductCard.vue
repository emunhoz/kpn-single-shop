<template>
  <div class="product-card">
    <div class="product-card__wrapper">
      <img
        :src="image"
        :alt="name"
        class="product-card__image"
        width="150"
        height="227"
      />
    </div>
    <h3 class="product-card__name">{{ name }}</h3>
    <p class="product-card__id">ID: {{ id }}</p>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.product-card {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
}

.product-card__wrapper {
  display: flex;
  justify-content: center;
}

.product-card__image {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
  max-width: 150px;
}

.product-card__name {
  margin-bottom: 4px;
}

.product-card__id {
  font-size: 12px;
  color: rgb(99, 99, 99);
}
</style>
