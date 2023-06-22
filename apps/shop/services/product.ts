const BASE_URL =
  'https://gist.githubusercontent.com/MaxKostenko/cfb308759c6b2c9762e91dadafe70c0e/raw/934bf752550a715712c905330c8db683674fb57c'

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/phone_feed.json`)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}
