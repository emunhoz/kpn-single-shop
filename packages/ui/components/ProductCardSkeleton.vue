<template>
  <div class="product-card-skeleton">
    <div class="image"></div>
    <div class="name"></div>
    <div class="id"></div>
  </div>
</template>

<style>
.product-card-skeleton {
  background-color: #f0f0f0;
  border-radius: 4px;
  width: 100%;
  height: 300px;
  animation: skeleton-pulse 1s infinite alternate;
}

@keyframes skeleton-pulse {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

.image {
  width: 100%;
  height: 70%;
  background-color: #ccc;
}

.name {
  width: 80%;
  height: 20px;
  margin-top: 8px;
  background-color: #ccc;
}

.id {
  width: 60%;
  height: 16px;
  margin-top: 8px;
  background-color: #ccc;
}
</style>
