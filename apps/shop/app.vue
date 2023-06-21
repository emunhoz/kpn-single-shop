<template>
  <main class="main">
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="list">
        <ui-product-card
          :image="'https://www.kpn.com/shop/cdn/products/_/product_6043820_main.png'"
          :name="product.name"
          :id="product.id"
        />
      </li>
    </ul>
    <div v-if="!products" class="text-center">Loading...</div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface ProductProps {
  id: number
  name: string
  image: string
}

const products = ref<ProductProps[] | null>(null)
fetch(
  'https://gist.githubusercontent.com/MaxKostenko/cfb308759c6b2c9762e91dadafe70c0e/raw/934bf752550a715712c905330c8db683674fb57c/phone_feed.json'
)
  .then((response) => response.json())
  .then((data) => (products.value = data.products))
</script>
<style>
.main {
  max-width: 1200px;
  margin: 0 auto;
}
.product-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 0.5rem;
  grid-auto-columns: minmax(360px, 1fr);
}

.list {
  display: grid;
  grid-template-rows: auto;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
}
</style>
