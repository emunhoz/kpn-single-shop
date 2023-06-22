import { ProductProps, FilterByProps } from '~/types/product'

export function filterProducts(
  products: ProductProps[] | null,
  filterBy: FilterByProps
): ProductProps[] | null {
  if (!products) {
    return null
  }

  return products.filter((product) => {
    return Object.entries(filterBy).every(([key, value]) => {
      if (filterBy.apple && filterBy.android) {
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
}
