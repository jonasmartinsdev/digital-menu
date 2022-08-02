import { BurgerProps } from '../contexts/CartContext'
import { formatMoney } from '../utils/formatMoney'

export interface BurgerCardProps extends BurgerProps {
  handleOpenModal: (data: BurgerProps) => void
}

export function BurgerCard({
  name,
  description,
  photo,
  handleOpenModal,
  price,
  id,
}: BurgerCardProps) {
  const data = { name, description, photo, price, id }

  const formatPriceMoney = formatMoney(price)

  return (
    <button
      onClick={() => handleOpenModal(data)}
      className="flex items-start gap-2 bg-white shadow-md rounded-xl"
    >
      <img
        className="rounded-l-xl brightness-75 max-h-[130px] max-w-[130px] w-full object-cover"
        src={photo}
        alt=""
      />
      <div className="text-start flex-1">
        <h1 className="text-lg font-semibold pt-2">{name}</h1>
        <strong className="block pt-2 text-orange-600 font-medium text-sm">
          R$ {formatPriceMoney}
        </strong>
        <p className="text-xs ">{description}</p>
      </div>
    </button>
  )
}
