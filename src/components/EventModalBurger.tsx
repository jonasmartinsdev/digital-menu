import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import ReactDom from 'react-dom'
import { BurgerProps, CartContext } from '../contexts/CartContext'
import { formatMoney } from '../utils/formatMoney'
import { modalVariants } from '../variants/modalVariants'
import { overlayVariants } from '../variants/overlayVariants'

interface BackdropProps {
  data: BurgerProps
  isModalOpen: boolean
  onCloseModal: () => void
}

export function EventModalBurger({
  data,
  isModalOpen,
  onCloseModal,
}: BackdropProps) {
  const { addBurgerToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)
  const [observation, setObservation] = useState('')

  function handleDecrease() {
    setQuantity((prevState) => prevState - 1)
  }
  function handleIncrease() {
    setQuantity((prevState) => prevState + 1)
  }

  function handleAddToBurger() {
    const newBurger = {
      ...data,
      quantity,
      observation,
    }

    addBurgerToCart(newBurger)
    handleCloseModal()
  }

  function handleCloseModal() {
    onCloseModal()
    setQuantity(1)
    setObservation('')
  }

  const totalQuantityBurger = quantity * data?.price
  const formatPriceMoney = formatMoney(totalQuantityBurger)

  return ReactDom.createPortal(
    <motion.div
      className="fixed hidden items-end justify-center w-full h-full top-0 left-0 bg-[#00000090] z-[9998]"
      animate={isModalOpen ? 'show' : 'hidden'}
      variants={overlayVariants}
    >
      <motion.div
        variants={modalVariants}
        className="bg-white max-w-[500px] max-h-screen  w-full m-4 rounded-lg overflow-y-auto "
      >
        <header className="relative">
          <img
            className="h-[300px] w-full object-cover rounded-t-lg"
            src={data?.photo}
            alt=""
          />
          <button
            onClick={handleCloseModal}
            className="absolute right-1 top-1 p-2 bg-orange-700 rounded-full text-white"
          >
            <X />
          </button>
        </header>
        <main className="p-4">
          <header className="border-b pb-4">
            <h3 className="font-bold text-xl">{data?.name}</h3>
            <p className="text-sm text-gray-600">{data?.description}</p>
          </header>
          <section className="py-4 flex flex-col">
            <span className="font-bold">Algum comentário?</span>

            <textarea
              className="border rounded h-24 resize-none p-2 "
              placeholder="Ex: tirar a cebola, maionese etc."
              onChange={(e) => setObservation(e.target.value)}
            />
          </section>

          <div className="flex items-center gap-4">
            <div className="bg-orange-100 flex items-center gap-3 p-2 rounded">
              <button
                disabled={quantity === 1}
                onClick={handleDecrease}
                className="text-orange-700"
              >
                <Minus />
              </button>
              <span className="w-[30px] h-[30px] flex items-center justify-center text-white bg-orange-700 rounded-full ">
                {quantity}
              </span>
              <button onClick={handleIncrease} className="text-orange-700">
                <Plus />
              </button>
            </div>
            <button
              onClick={handleAddToBurger}
              className="flex-1 flex items-center justify-center gap-3 bg-orange-700 text-white p-2 rounded"
            >
              <ShoppingCart />
              <span>
                Adicionar
                <b> • </b>
                <strong>R$ {formatPriceMoney}</strong>
              </span>
            </button>
          </div>
        </main>
      </motion.div>
    </motion.div>,
    document.getElementById('modal-root') as any,
  )
}
