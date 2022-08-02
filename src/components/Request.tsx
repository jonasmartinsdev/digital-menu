import { X } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { formatMoney } from '../utils/formatMoney'

export interface RequestProps {
  id: number
  name: string
  quantity: number
  price: number
}

export function Request(data: RequestProps) {
  const { removeItemCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState<number>(data.quantity)

  useEffect(() => {
    setQuantity(data.quantity)
  }, [data.quantity])

  function handleChangeQuantity(event: any) {
    setQuantity(event.target.value)
  }

  function handleRemoveBurger() {
    removeItemCart(data.id)
  }

  const totalValue = quantity * data.price

  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 flex flex-wrap">
        <strong className="text-sm font-semibold">{data.name}</strong>
      </div>
      <div className="w-[140px] flex items-center justify-between gap-2">
        <input
          className="w-[30px] h-[30px] border rounded-lg text-center"
          type="number"
          disabled={!!quantity}
          onChange={handleChangeQuantity}
          value={quantity}
        />
        <strong className="text-sm">R$ {totalValue}</strong>
        <button
          onClick={handleRemoveBurger}
          className="bg-red-200 text-red-800 rounded-full p-1"
        >
          <X />
        </button>
      </div>
    </div>
  )
}
