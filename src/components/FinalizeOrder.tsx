import { NewAddressFormDate } from './Footer'
import { Truck, WhatsappLogo, X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { CartContext, CreateCardData } from '../contexts/CartContext'
import { formatMoney } from '../utils/formatMoney'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from './Modal'
import { useNavigate } from 'react-router-dom'
import { ErrosType } from './FormAddress'

export interface FinalizeOrderProps {
  address: NewAddressFormDate | undefined
  handleModalAddress: () => void
  isModalOpenAddress: number
  handleCloseModal: () => void
}

enum PaymentMethods {
  'Cartão de Credito' = 'Cartão de Credito',
  'Cartão de Débito' = 'Cartão de Débito',
  'Dinheiro' = 'Dinheiro',
  'Vale Alimentação' = 'Vale Alimentação',
}

const newPaymentFormValidateSchema = zod.object({
  payment: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return { message: 'Informe o método de pagamento' }
    },
  }),
  observation: zod.string(),
  name: zod.string().min(1, 'Informe o seu Nome'),
  phone: zod.string().min(1, 'Informe o seu Telefone'),
})

export type NewPAymentFormDate = zod.infer<typeof newPaymentFormValidateSchema>

interface NewOrderProps {
  cartItem: CreateCardData[]
  number?: string | undefined
  street?: string | undefined
  complement?: string | undefined
  district?: string | undefined
  reference?: string | undefined
  payment: PaymentMethods
  observation: string
  name: string
  phone: string
}

export function FinalizeOrder({
  address,
  handleModalAddress,
  isModalOpenAddress,
  handleCloseModal,
}: FinalizeOrderProps) {
  const { register, handleSubmit, formState } = useForm<NewPAymentFormDate>({
    resolver: zodResolver(newPaymentFormValidateSchema),
  })

  const { errors } = formState as unknown as ErrosType

  const { cartItemsTotal, cartItem, listItems } = useContext(CartContext)

  const totalItems = cartItemsTotal + 2

  function handleCreateNewOrder(data: NewPAymentFormDate) {
    const newOrderPedido = {
      ...data,
      ...address,
      cartItem,
    }

    window.location.href = `https://api.whatsapp.com/send/?phone=5533998064169&text=%F0%9F%9B%8D%20*Novo%20pedido%20via%20Jonas%3A*%0A%0A${listItems}%0A%0A*Valor*%0AProdutos%3A%20${formatMoney(
      cartItemsTotal,
    )}%0ATaxa%20de%20entrega%3A%2002%2C00%0ATotal%3A%20${formatMoney(
      totalItems,
    )}%20%0A%0A*Forma%20de%20pagamento*%0A${
      newOrderPedido.payment
    }%20%0A%0A*Entrega*%0ARua%20${newOrderPedido?.street}%2C%20${
      newOrderPedido?.number
    }%20-%20${
      newOrderPedido?.complement
    }%0AConselheiro%20Pena%2C%20Minas%20Gerais%0A%0A*Cliente*%0A${
      newOrderPedido?.name
    }%20-%20${newOrderPedido?.phone}`
  }
  // *Comprovante%20do%20pedido*%0Ahttps%3A%2F%2Fpedido.hubt.com.br%2Fk4g6-dysi%0A%0A
  return (
    <Modal isModalOpenAddress={isModalOpenAddress} onClick={handleCloseModal}>
      <div className=" p-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold pb-3">Finalize seu pedido</h1>

          <div className="bg-gray-200 p-3 rounded">
            <div className="flex items-center gap-2">
              <Truck size={25} />
              <div className="flex justify-between items-center w-full">
                <div className="text-xs">
                  <strong>Entrega:</strong>
                  <span>
                    {address?.street}, {address?.number}
                  </span>
                  <span className="block text-gray-500 text-xs">
                    Aprox. 40 mins
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleModalAddress}
                  className="text-blue-700 text-sm"
                >
                  Alterar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 p-3 rounded">
            <div className="flex items-center gap-2">
              <div className="flex justify-between items-center w-full">
                <div className="text-sm flex gap-1">
                  <strong>{cartItem.length}</strong>
                  <strong>Produto</strong>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-blue-700 text-sm"
                >
                  Ver Item
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 rounded bg-white border">
            <div className="text-sm flex items-center justify-between">
              <span>Valor dos produtos</span>
              <span>R$ {formatMoney(cartItemsTotal)}</span>
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
        </div>

        <form
          className="w-full pt-3"
          onSubmit={handleSubmit(handleCreateNewOrder)}
        >
          <strong>Forma de pagamento</strong>
          <p className="text-xs text-gray-400">
            Pagamentos por cartão, vale ou dinheiro são feitos no momento da
            entrega.
          </p>
          {errors && (
            <p className="text-red-500 text-xs italic">
              {errors.payment?.message}.
            </p>
          )}

          <div className="flex gap-3 flex-wrap pt-3">
            <div className="flex items-center gap-1 py-2 px-4 border rounded max-w[30px] checked:bg-black">
              <input
                id="dinheiro"
                type="radio"
                className="border rounded-lg"
                {...register('payment', { required: true })}
                value={'Dinheiro'}
              />
              <label htmlFor="dinheiro" className="text-xs">
                Dinheiro
              </label>
            </div>
            <div className="flex items-center  gap-1 py-2 px-4 border rounded max-w[30px]">
              <input
                id="debito"
                type="radio"
                className="border rounded-lg"
                {...register('payment', { required: true })}
                value="Cartão de Débito"
              />
              <label htmlFor="debito" className="text-xs ">
                Débito
              </label>
            </div>
            <div className="flex items-center  gap-1 py-2 px-4 border rounded max-w[30px]">
              <input
                id="credito"
                type="radio"
                className="border rounded-lg"
                {...register('payment', { required: true })}
                value="Cartão de Credito"
              />
              <label htmlFor="credito" className="text-xs ">
                Credito
              </label>
            </div>
            <div className="flex items-center  gap-1 py-2 px-4 border rounded max-w[30px]">
              <input
                id="refeicao"
                type="radio"
                className="border rounded-lg"
                {...register('payment', { required: true })}
                value="Vale Alimentação"
              />
              <label htmlFor="refeicao" className="text-xs ">
                Vale Alimentação
              </label>
            </div>
          </div>

          <div className="py-4 flex flex-col">
            <label
              htmlFor=""
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Observações
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline resize-none h-24"
              placeholder="Ex: Observações sobre o pedido, entrega ou outras informações"
              {...register('observation')}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Nome do Cliente
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline resize-none "
                {...register('name')}
              />
              {errors && (
                <p className="text-red-500 text-xs italic">
                  {errors.name?.message}.
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Telefone <span className="text-xs">(Com DDD)</span>
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline resize-none "
                placeholder="(99) 0000 0000"
                {...register('phone')}
              />
              {errors && (
                <p className="text-red-500 text-xs italic">
                  {errors.phone?.message}.
                </p>
              )}
            </div>
          </div>
          <div className="w-full p-2 mt-3 bg-slate-200 rounded">
            <div className="text-xs py-3">
              <p>
                Ao clicar em enviar, você será direcionado para o WhatsApp.
                <b>Envie a mensagem para confirmar seu pedido.</b>
              </p>
            </div>
            <button className="bg-green-600 text-white p-4 rounded-lg w-full ">
              <a
                className="flex items-center justify-center gap-3"
                target={'_blank'}
                rel="noreferrer"
              >
                <WhatsappLogo size={25} weight="fill" /> Enviar pelo WhatsApp
              </a>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
