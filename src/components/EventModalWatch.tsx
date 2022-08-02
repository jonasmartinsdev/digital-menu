import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { modalVariants } from '../variants/modalVariants'
import { overlayVariants } from '../variants/overlayVariants'

interface EventModalWatchProps {
  isModalOpen: boolean
  handleModalClose: () => void
}

export function EventModalWatch({
  isModalOpen,
  handleModalClose,
}: EventModalWatchProps) {
  return ReactDOM.createPortal(
    <motion.div
      className="fixed items-center inset-0 justify-center w-full h-full bg-[#343A4050] backdrop-filter  overflow-y-auto"
      animate={isModalOpen ? 'show' : 'hidden'}
      variants={overlayVariants}
    >
      <motion.div variants={modalVariants} className="w-full p-4 md:max-w-lg">
        <div className="bg-white p-4 rounded-t-lg">
          <header>
            <h4 className="text-base font-bold">Horários de atendimento:</h4>
          </header>
          <div className="border border-gray-400 bg-gray-200 rounded  flex justify-between p-2 text-xs">
            <div>
              <span>Todos os dias:</span>
            </div>
            <span>18:00 - 23:00</span>
          </div>
          <span className="text-gray-400 text-sm pt-2">
            Atendimento normal nos feriados.
          </span>
        </div>
        <button
          onClick={handleModalClose}
          className="bg-gray-200 p-4 text-center rounded-b-lg uppercase text-blue-700 text-sm font-bold w-full"
        >
          Fechar
        </button>
      </motion.div>
    </motion.div>,
    document.getElementById('modal-root') as any,
  )
}
