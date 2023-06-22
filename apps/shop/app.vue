<template>
  <ui-header />
  <h2 class="quantity">Choose from {{ quantity }} phones</h2>
  <main class="main">
    <div class="filters">
      <ui-btn name="Refurbished" v-model="filterBy.refurbished" />
      <ui-btn name="5g" v-model="filterBy.has5g" />
    </div>
    <ul class="product-list">
      <li v-for="product in filteredProducts" :key="product.id" class="list">
        <ui-product-card
          :image="'https://www.svgrepo.com/show/397517/mobile-phone.svg'"
          :name="product.name"
          :id="product.id"
        />
      </li>
    </ul>
    <div v-if="!products" class="text-center">Loading...</div>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface ProductProps {
  id: number
  name: string
  image: string
  has_5g: boolean
  refurbished: boolean
}

const products = ref<ProductProps[] | null>(null)
const filterBy = ref<{
  refurbished: boolean
  has5g: boolean
}>({
  refurbished: false,
  has5g: false,
})

fetch(
  'https://gist.githubusercontent.com/MaxKostenko/cfb308759c6b2c9762e91dadafe70c0e/raw/934bf752550a715712c905330c8db683674fb57c/phone_feed.json'
)
  .then((response) => response.json())
  .then((data) => (products.value = data.products))

const filteredProducts = computed(() => {
  if (!products.value) {
    return null
  }

  if (!Object.values(filterBy.value).some((val) => val === true)) {
    return products.value
  }

  return products.value.filter((product) => {
    return Object.entries(filterBy.value).every(([key, value]) => {
      if (value === false) {
        return true
      }

      if (key === 'refurbished') {
        return product.refurbished === true
      }

      if (key === 'has5g') {
        return product.has_5g === true
      }

      return true
    })
  })
})

const quantity = computed(() => filteredProducts.value?.length || 0)
</script>
<style>
.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.quantity {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.filters {
  margin-bottom: 40px;
  white-space: nowrap;
  overflow: auto;
}

.filters button {
  margin-right: 10px;
}

.product-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 1rem;
  grid-auto-columns: minmax(360px, 1fr);
}

.list {
  display: grid;
  grid-template-rows: auto;
}
</style>
