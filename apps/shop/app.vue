<template>
  <ui-header />
  <h2 class="quantity" v-if="quantity !== 0">
    Choose from {{ quantity }} phones
  </h2>
  <h2 class="quantity" v-else>No items were found!</h2>
  <main class="main">
    <div class="filters">
      <ui-pill
        variant="secondary"
        name="Refurbished"
        v-model="filterBy.refurbished"
      />
      <ui-pill variant="secondary" name="5g" v-model="filterBy.has5g" />
      <ui-pill variant="secondary" name="e-sim" v-model="filterBy.hasEsim" />
      <ui-pill variant="secondary" name="Apple" v-model="filterBy.apple" />
      <ui-pill variant="secondary" name="Android" v-model="filterBy.android" />
    </div>
    <ul class="product-list">
      <li v-if="loading" v-for="n in 12" :key="n" class="list">
        <ui-product-card-skeleton />
      </li>
      <li
        v-else
        v-for="product in filteredProducts"
        :key="product.id"
        class="list"
      >
        <ui-product-card
          :image="'https://www.svgrepo.com/show/397517/mobile-phone.svg'"
          :name="product.name"
          :id="product.id"
        />
      </li>
    </ul>
    <div v-if="!products && !loading" class="text-center">Loading...</div>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { fetchProducts } from '~/services/product'
import { ProductProps, FilterByProps } from '~/types/product'
import { filterProducts } from '~/filters/product'

const products = ref<ProductProps[] | null>(null)
const loading = ref(true)

const filterBy = ref<FilterByProps>({
  refurbished: false,
  has5g: false,
  hasEsim: false,
  apple: false,
  android: false,
})

fetchProducts()
  .then((data) => {
    products.value = data.products
    loading.value = false
  })
  .catch((error) => {
    console.error('Failed to fetch products:', error)
    loading.value = false
  })

const filteredProducts = computed(() =>
  filterProducts(products.value, filterBy.value)
)

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
  scrollbar-width: none;
}

.filters button,
.filters label {
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
