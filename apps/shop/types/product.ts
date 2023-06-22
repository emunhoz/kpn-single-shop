export interface ProductProps {
  id: number
  name: string
  image: string
  has_5g: boolean
  refurbished: boolean
  has_esim: boolean
  operating_system: string
}

export interface FilterByProps {
  refurbished: boolean
  has5g: boolean
  hasEsim: boolean
  apple: boolean
  android: boolean
}
