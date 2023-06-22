<template>
  <ui-header />
  <h2 class="quantity" v-if="quantity !== 0">
    Choose from {{ quantity }} phones
  </h2>
  <h2 class="quantity" v-else>No items were found!</h2>
  <main class="main">
    <div class="filters">
      <!-- <ui-btn @click="toggleSidebar">+ Filter</ui-btn> -->
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
  <!-- <div class="sidebar" :class="{ 'sidebar-open': showSidebar }">
    <button @click="toggleSidebar">Close</button>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface ProductProps {
  id: number
  name: string
  image: string
  has_5g: boolean
  refurbished: boolean
  has_esim: boolean
  operating_system: string
}

const products = ref<ProductProps[] | null>(null)
// const showSidebar = ref(false)
const loading = ref(true)

const filterBy = ref<{
  refurbished: boolean
  has5g: boolean
  hasEsim: boolean
  apple: boolean
  android: boolean
}>({
  refurbished: false,
  has5g: false,
  hasEsim: false,
  apple: false,
  android: false,
})

fetch(
  'https://gist.githubusercontent.com/MaxKostenko/cfb308759c6b2c9762e91dadafe70c0e/raw/934bf752550a715712c905330c8db683674fb57c/phone_feed.json'
)
  .then((response) => response.json())
  .then((data) => {
    products.value = data.products
    loading.value = false
  })

// function toggleSidebar() {
//   showSidebar.value = !showSidebar.value
// }

const filteredProducts = computed(() => {
  if (!products.value) {
    return null
  }

  return products.value.filter((product) => {
    return Object.entries(filterBy.value).every(([key, value]) => {
      if (filterBy.value.apple && filterBy.value.android) {
        return true
      }

      if (!value) {
        return true
      }

      if (key === 'refurbished') {
        return product.refurbished === true
      }

      if (key === 'has5g') {
        return product.has_5g === true
      }

      if (key === 'hasEsim') {
        return product.has_esim === true
      }

      if (key === 'apple') {
        return product.operating_system.toLowerCase() === 'ios'
      }

      if (key === 'android') {
        return product.operating_system.toLowerCase() === 'android'
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

.sidebar {
  width: 320px;
  height: 100%;
  position: fixed;
  top: 0;
  left: -320px;
  transition: left 0.3s ease;
  padding: 20px;
}

.sidebar-open {
  left: 0;
  background: #fff;
  box-shadow: -10px 0px 30px -14px rgba(0, 0, 0, 0.25);
}
</style>
