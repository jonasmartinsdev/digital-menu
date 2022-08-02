import produce from 'immer'
import { createContext, ReactNode, useState } from 'react'
import { formatMoney } from '../utils/formatMoney'

export interface BurgerProps {
  id: number
  name: string
  description: string
  price: number
  photo: string
}

export interface CreateCardData extends BurgerProps {
  quantity: number
  observation?: string
}

interface CartContextType {
  addBurgerToCart: (data: CreateCardData) => void
  removeItemCart: (cartItemId: number) => void
  cartItemsTotal: number
  cartItems: CreateCardData[]
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CreateCardData[]>([
    {
      id: 1,
      name: 'Best Bacon Cheddar',
      description:
        'Bacon, Cheddar, Hambúguer Angus 180g, Molho Barbecue, Pão Especial',
      photo:
        'https://static.expressodelivery.com.br/imagens/produtos/64905/180/Expresso-Delivery_3103ea9e2ecca2317cf4c4d1494cbda5.jpg',
      price: 20.0,
      quantity: 1,
      observation: '',
    },
    {
      id: 2,
      name: 'X tudo',
      description:
        'Bacon, Cheddar, Hambúguer Angus 180g, Molho Barbecue, Pão Especial',
      photo:
        'https://static.expressodelivery.com.br/imagens/produtos/64905/180/Expresso-Delivery_3103ea9e2ecca2317cf4c4d1494cbda5.jpg',
      price: 20.0,
      quantity: 1,
      observation: 'Retirar o presunto por favor',
    },
  ])

  const cartItemsTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  )

  console.log(cartItemsTotal)
  function addBurgerToCart(data: CreateCardData) {
    const burgerAlreadyExistisInCart = cartItems.findIndex(
      (burger) => burger.id === data.id,
    )
    const newBurger = produce(cartItems, (draft) => {
      if (burgerAlreadyExistisInCart < 0) {
        draft.push(data)
      } else {
        draft[burgerAlreadyExistisInCart].quantity += data.quantity
      }
    })

    setCartItems(newBurger)
  }

  function removeItemCart(cardItemId: number) {
    const burgerAlreadyExistisInCart = cartItems.findIndex(
      (burger) => burger.id === cardItemId,
    )

    const updateCart = produce(cartItems, (draft) => {
      if (burgerAlreadyExistisInCart >= 0) {
        draft.splice(burgerAlreadyExistisInCart, 1)
      }
    })

    setCartItems(updateCart)
  }

  return (
    <CartContext.Provider
      value={{
        cartItemsTotal,
        cartItems,
        addBurgerToCart,
        removeItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
