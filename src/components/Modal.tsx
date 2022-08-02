import { motion } from 'framer-motion'
import { X } from 'phosphor-react'
import ReactDom from 'react-dom'
import { overlayVariants } from '../variants/overlayVariants'
import { ReactNode } from 'react'
import { modalVariants } from '../variants/modalVariants'

interface BackdropProps {
  children: ReactNode
  isModalOpenAddress: number
  onClick: () => void
}

export function Modal({
  children,
  isModalOpenAddress,
  onClick,
}: BackdropProps) {
  return ReactDom.createPortal(
    <motion.div
      className="p-2 fixed hidden items-center justify-center w-full h-full top-0 left-0 bg-[#00000090] z-[9998] "
      animate={isModalOpenAddress ? 'show' : 'hidden'}
      variants={overlayVariants}
    >
      <motion.div
        variants={modalVariants}
        className=" bg-white rounded-lg relative p-4 w-full max-h-screen  md:max-w-lg overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClick}
          className="absolute right-1 top-3 p-1  rounded-full text-blue-600 bg-blue-200"
        >
          <X />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.getElementById('modal-root') as any,
  )
}
