import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'

import { Modal } from './Modal'

export interface FormAddressProps {
  isModalOpenAddress: number
  handleCloseModal: () => void
}

export interface ErrosType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export function FormAddress({
  isModalOpenAddress,
  handleCloseModal,
}: FormAddressProps) {
  const { register, formState } = useFormContext()

  const { errors } = formState as unknown as ErrosType

  console.log(errors.len)

  return (
    <Modal isModalOpenAddress={isModalOpenAddress} onClick={handleCloseModal}>
      <form action="" className="p-4  overflow-y-auto flex flex-col gap-2">
        <h1 className="text-xl font-semibold pb-3">
          Insira o endereço de entrega
        </h1>

        <div>
          <label
            className={classNames(
              'uppercase tracking-wide text-gray-700 text-xs mb-1',
              {
                'text-red-500': errors?.street?.message,
              },
            )}
          >
            Rua
          </label>
          <input
            type="text"
            className={classNames(
              'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
              {
                'border-red-500': errors.street?.message,
              },
            )}
            {...register('street')}
          />
        </div>

        <div className="flex items-center justify-center  gap-2">
          <div className="w-[200px] ">
            <label
              className={classNames(
                'uppercase tracking-wide text-gray-700 text-xs mb-1',
                {
                  'text-red-500': errors?.number?.message,
                },
              )}
            >
              Número
            </label>
            <input
              className={classNames(
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
                {
                  'border-red-500': errors?.number?.message,
                },
              )}
              type="number"
              placeholder="123"
              {...register('number')}
            />
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs mb-1">
              Complemento
              <span className="ml-2 text-[10px] text-gray-300">(Opcional)</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
              {...register('complement')}
            />
          </div>
        </div>
        <div>
          <label
            className={classNames(
              'uppercase tracking-wide text-gray-700 text-xs mb-1',
              {
                'text-red-500': errors?.district?.message,
              },
            )}
          >
            Bairro
          </label>
          <input
            type="text"
            className={classNames(
              'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
              {
                'border-red-500': errors?.district?.message,
              },
            )}
            {...register('district')}
          />
        </div>
        <div>
          <label className="uppercase tracking-wide text-gray-700 text-xs mb-1">
            Ponto de referência
            <span className="text-[10px] text-gray-300">(Opcional)</span>
          </label>
          <input
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            {...register('reference')}
          />
        </div>
        <button className=" bg-blue-600 text-white p-4 rounded-lg">
          Entregar neste endereço
        </button>
      </form>
    </Modal>
  )
}
