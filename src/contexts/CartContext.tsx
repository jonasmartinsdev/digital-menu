import produce from 'immer'
import { createContext, ReactNode, useState } from 'react'

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
  cartItem: CreateCardData[]
  listItems: any
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItem, setCartItem] = useState<CreateCardData[]>([])

  const listItems = cartItem.map((item) => {
    return `*${item.quantity}x ${item.name}*%20%0A`
  })

  const cartItemsTotal = cartItem.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  )
  function addBurgerToCart(data: CreateCardData) {
    const burgerAlreadyExistisInCart = cartItem.findIndex(
      (burger) => burger.id === data.id,
    )
    const newBurger = produce(cartItem, (draft) => {
      if (burgerAlreadyExistisInCart < 0) {
        draft.push(data)
      } else {
        draft[burgerAlreadyExistisInCart].quantity += data.quantity
      }
    })

    setCartItem(newBurger)
  }

  function removeItemCart(cardItemId: number) {
    const burgerAlreadyExistisInCart = cartItem.findIndex(
      (burger) => burger.id === cardItemId,
    )

    const updateCart = produce(cartItem, (draft) => {
      if (burgerAlreadyExistisInCart >= 0) {
        draft.splice(burgerAlreadyExistisInCart, 1)
      }
    })

    setCartItem(updateCart)
  }

  return (
    <CartContext.Provider
      value={{
        cartItemsTotal,
        cartItem,
        addBurgerToCart,
        removeItemCart,
        listItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
