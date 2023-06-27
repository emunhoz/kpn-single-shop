import { mount } from '@vue/test-utils'
import HomePage from './app.vue'
import { expect } from 'vitest'

describe('[Page]: HomePage', () => {
  test('renders correctly', () => {
    const wrapper = mount(HomePage)
    // Check if the component is rendered correctly
    expect(wrapper.exists()).toBeTruthy()

    // Check if the main elements are present
    expect(wrapper.find('ui-header').exists()).toBe(true)
    expect(wrapper.find('.quantity').exists()).toBe(true)
    expect(wrapper.find('.main').exists()).toBe(true)
  })

  test('displays the correct number of phones', async () => {
    const wrapper = mount(HomePage)
    // Check if the quantity is displayed correctly when there are no available phones
    expect(wrapper.find('.quantity').text()).toContain('No items were found!')

    // Wait for the next Vue lifecycle update
    await wrapper.vm.$nextTick()

    // Change the loading state and check if the products are displayed correctly
    wrapper.vm.loading = false
    wrapper.vm.products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ]
    // Wait for the next Vue lifecycle update
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.quantity').text()).toContain('Choose from 3 phones')
  })

  test('displays the filters correctly', () => {
    const wrapper = mount(HomePage)
    // Check if the filters are present
    expect(wrapper.find('.filters').exists()).toBe(true)

    // Check if the filter options are correct
    expect(wrapper.findAll('ui-pill')).toHaveLength(5)
    expect(wrapper.find('ui-pill[name="Refurbished"]').exists()).toBe(true)
    expect(wrapper.find('ui-pill[name="5g"]').exists()).toBe(true)
    expect(wrapper.find('ui-pill[name="e-sim"]').exists()).toBe(true)
    expect(wrapper.find('ui-pill[name="Apple"]').exists()).toBe(true)
    expect(wrapper.find('ui-pill[name="Android"]').exists()).toBe(true)
  })

  test('displays the products correctly', async () => {
    const wrapper = mount(HomePage)
    // Check if the product list is displayed correctly
    expect(wrapper.find('.product-list').exists()).toBe(true)

    // Check if the loading skeletons are displayed correctly
    expect(wrapper.findAll('.list')).toHaveLength(12)
    expect(wrapper.findAll('ui-product-card-skeleton')).toHaveLength(12)

    // Wait for the next Vue lifecycle update
    await wrapper.vm.$nextTick()

    // Change the loading state and check if the products are displayed correctly
    wrapper.vm.loading = false
    wrapper.vm.products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ]
    // Wait for the next Vue lifecycle update
    await wrapper.vm.$nextTick()

    // Check if the product list is displayed correctly
    expect(wrapper.findAll('.list')).toHaveLength(wrapper.vm.products.length)
    expect(wrapper.findAll('ui-product-card')).toHaveLength(
      wrapper.vm.products.length
    )
  })

  test('filters the products correctly', async () => {
    const wrapper = mount(HomePage)
    // Wait for the next Vue lifecycle update
    await wrapper.vm.$nextTick()

    // Change the loading state and set up some products
    wrapper.vm.loading = false
    wrapper.vm.products = [
      {
        id: 1,
        name: 'Product 1',
        refurbished: true,
        has5g: true,
        hasEsim: false,
        operating_system: 'IOS',
      },
      {
        id: 2,
        name: 'Product 2',
        refurbished: false,
        has5g: false,
        hasEsim: true,
        operating_system: 'ANDROID',
      },
      {
        id: 3,
        name: 'Product 3',
        refurbished: true,
        has5g: true,
        hasEsim: true,
        operating_system: 'IOS',
      },
    ]
    await wrapper.vm.$nextTick()

    // Set the filter value
    wrapper.vm.filterBy.refurbished = true
    await wrapper.vm.$nextTick()

    // Check if the filtered products are displayed correctly
    expect(wrapper.findAll('.list')).toHaveLength(2)
    expect(wrapper.findAll('ui-product-card')).toHaveLength(2)
  })
})
