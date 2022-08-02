import { Storefront, Truck, X } from 'phosphor-react'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { formatMoney } from '../utils/formatMoney'
import { Request } from './Request'
import { CartContext } from '../contexts/CartContext'

import { zodResolver } from '@hookform/resolvers/zod'

import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { FormAddress } from './FormAddress'
import { FinalizeOrder } from './FinalizeOrder'

const variants = {
  open: {
    transition: {
      duration: 0.3,
    },
    y: 0,
    opacity: 1,
    display: 'block',
  },
  closed: {
    transition: {
      duration: 0.3,
    },
    y: '100%',
    opacity: 0,
    display: 'none',
  },
}

const newAddressFormValidateSchema = zod.object({
  street: zod.string().min(1, 'Informe a sua Rua'),
  number: zod.string().min(1, 'Informe o seu Número'),
  complement: zod.string(),
  district: zod.string().min(1, 'Informe o seu Bairro'),
  reference: zod.string(),
})

export type NewAddressFormDate = zod.infer<typeof newAddressFormValidateSchema>

export function Footer() {
  const { cartItemsTotal, cartItems } = useContext(CartContext)
  const [address, setAddress] = useState<NewAddressFormDate>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAddress, setIsModalOpenAddress] = useState<number>(0)

  const newAddress = useForm<NewAddressFormDate>({
    resolver: zodResolver(newAddressFormValidateSchema),
  })

  const { handleSubmit } = newAddress

  function handleCreateAddress(data: NewAddressFormDate) {
    setAddress(data)
    handleCloseModal()
  }

  function handleToggleModal() {
    setIsModalOpen((prevState) => !prevState)
  }

  function handleModalAddress() {
    setIsModalOpenAddress(1)
  }
  function handleModalPayment() {
    setIsModalOpenAddress(2)
  }

  function handleCloseModal() {
    setIsModalOpenAddress(0)
  }

  const totalItems = cartItemsTotal + 2

  return (
    <div className="sticky bottom-0  w-full md:max-w-sm md:fixed md:ml-5 ">
      <div className="drop-shadow-xl rounded-t-xl bg-white border p-4 w-full">
        <button
          onClick={handleToggleModal}
          className="flex items-center justify-between gap-4 text-lg 
        text-blue-600 pb-2  w-full
        "
        >
          <div className="flex items-center gap-4 text-left">
            <Storefront size={30} />
            <div>
              <strong>Faça seu pedido</strong>
              <p className="text-xs text-slate-400">
                O pedido será enviado por <b>WhatsApp</b>{' '}
              </p>
            </div>
          </div>
          {cartItems?.length >= 0 && (
            <div className="bg-red-600 p-2 text-white text-sm rounded-lg shadow-lg">
              {cartItems?.length} item
            </div>
          )}
        </button>
        <motion.div
          animate={isModalOpen ? 'open' : 'closed'}
          variants={variants}
        >
          <div className="p-4 border-b bg-gray-200">
            {address ? (
              <div className="flex items-center gap-2">
                <Truck size={25} />
                <div className="flex justify-between items-center w-full">
                  <div className="text-sm">
                    <strong>Entrega:</strong>
                    <span>
                      {address.street}, {address.number}
                    </span>
                    <span className="block text-gray-500 text-xs">
                      Aprox. 40 mins
                    </span>
                  </div>
                  <button
                    onClick={handleModalAddress}
                    className="text-blue-700 text-sm"
                  >
                    Alterar
                  </button>
                </div>
              </div>
            ) : (
              <span className="text-blue-600 text-sm">
                Definir local para entrega ou retirada
              </span>
            )}
          </div>
          <div className="bg-white p-2  max-h-32 overflow-y-auto flex flex-col gap-2">
            {cartItems?.length >= 0 ? (
              cartItems.map((item) => {
                return (
                  <Request
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                  />
                )
              })
            ) : (
              <span className="p-4 text-slate-400 font-medium">
                Navegue pela página e selecione os produtos que deseja para
                fazer seu pedido
              </span>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="text-sm flex items-center justify-between">
              <span>Valor dos produtos</span>
              {/* <span>R$ {formatMoney(cartItemsTotal)}</span> */}
            </div>
            <div className="text-sm flex items-center justify-between">
              <span>Taxa de entrega</span>
              <span>R$ 2,00</span>
            </div>
            <div className="text-sm flex items-center justify-between">
              <strong>Total</strong>
              <strong>R$ {formatMoney(totalItems)}</strong>
            </div>
          </div>
          {address ? (
            <button
              disabled={cartItems?.length === 0}
              onClick={handleModalPayment}
              className="p-4 bg-blue-600  text-white text-center text-sm w-full rounded-2xl"
            >
              Escolher forma de pagamento
            </button>
          ) : (
            <button
              onClick={handleModalAddress}
              className="p-4 bg-blue-600  text-white text-center text-sm w-full rounded-2xl"
            >
              Prosseguir com o pedido
            </button>
          )}
        </motion.div>
      </div>

      {isModalOpenAddress === 1 && (
        <FormProvider {...newAddress}>
          <form action="" onSubmit={handleSubmit(handleCreateAddress)}>
            <FormAddress
              isModalOpenAddress={isModalOpenAddress}
              handleCloseModal={handleCloseModal}
            />
          </form>
        </FormProvider>
      )}

      {isModalOpenAddress === 2 && (
        <FinalizeOrder
          address={address}
          handleModalAddress={handleModalAddress}
          isModalOpenAddress={isModalOpenAddress}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  )
}
