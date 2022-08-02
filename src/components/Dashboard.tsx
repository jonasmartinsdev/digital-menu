import { Bag, Clock, MapPin, Truck, WhatsappLogo } from 'phosphor-react'
import { useState } from 'react'
import { EventModalWatch } from './EventModalWatch'

export function Dashboard() {
  const [timeModal, setTimeModal] = useState(false)

  function handleOpenModal() {
    setTimeModal(true)
  }
  function handleCloseModal() {
    setTimeModal(false)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <header className="flex items-center gap-2  border-b pb-2">
            <Clock size={28} />
            <div className="flex justify-between items-center w-full">
              <div>
                <span className="block text-sm text-green-600">
                  Aberto agora
                </span>
                <span className="block text-xs text-gray-400">
                  Até às 23:59
                </span>
              </div>
              <button
                onClick={handleOpenModal}
                className="text-blue-700  text-xs uppercase"
              >
                Ver horários
              </button>
            </div>
          </header>
          <div className="pt-2 text-gray-400 text-sm flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Truck /> Entrega: 40 mins
            </div>
            <div className="flex items-center gap-1">
              <Bag /> Retirada: 20 mins
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <header className="flex items-center gap-2 ">
            <WhatsappLogo size={28} />
            <div className="flex justify-between items-center w-full">
              <div>
                <span className="block text-sm">(33) 99999 9999</span>
                <span className="block text-xs text-gray-400">WhatsApp</span>
              </div>
              <a
                href="https://api.whatsapp.com/send/?phone=5533988915354"
                className="text-blue-700  text-xs uppercase"
                target={'_blank'}
                rel="noreferrer"
              >
                Contatos
              </a>
            </div>
          </header>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <header className="flex items-center gap-2 ">
            <MapPin size={28} />
            <div className="flex justify-between items-center w-full">
              <div>
                <span className="block text-sm ">Centro</span>
                <span className="block text-xs text-gray-400">
                  Conselheiro Pena, MG
                </span>
              </div>
              <a
                href="https://www.google.com.br/maps/place/19%C2%B010'27.0%22S+41%C2%B028'25.5%22W/@-19.1718641,-41.4712724,15z/data=!4m6!3m5!1s0xb12785ad53b121:0xf319ba0682f041e7!7e2!8m2!3d-19.1741682!4d-41.4737615"
                className="text-blue-700  text-xs uppercase"
                target={'_blank'}
                rel="noreferrer"
              >
                Direções
              </a>
            </div>
          </header>
        </div>
      </div>

      <EventModalWatch
        isModalOpen={timeModal}
        handleModalClose={handleCloseModal}
      />
    </>
  )
}
