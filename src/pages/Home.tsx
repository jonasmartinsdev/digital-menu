import { useState } from 'react'
import { BurgerCard } from '../components/BurgerCard'
import { Dashboard } from '../components/Dashboard'
import { EventModalBurger } from '../components/EventModalBurger'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { BurgerProps } from '../contexts/CartContext'
import { burgers } from '../data/burger'

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [burger, setBurger] = useState<BurgerProps>({} as BurgerProps)

  function handleOpenModal(data: BurgerProps) {
    setIsModalOpen(true)
    setBurger(data)
    setBurger(data)
  }

  function onCloseModal() {
    setIsModalOpen(false)
    setBurger({} as BurgerProps)
  }

  return (
    <>
      <div className="p-4 md:max-w-3xl m-auto">
        <Header />
        <Dashboard />
        <main className="py-7">
          <section className=" py-5 text-center">
            <h2 className="font-bold text-lg">Hambúrgueres</h2>
            <p className="text-gray-500 text-sm">
              Conheça nossos hambúrgueres tradicionais
            </p>
            <div
              id="Hambúrgueres"
              className="flex justify-center items-center flex-wrap gap-4 pt-4"
            >
              {burgers.map((item) => {
                return (
                  <BurgerCard
                    key={item.id}
                    id={item.id}
                    handleOpenModal={handleOpenModal}
                    name={item.name}
                    description={item.description}
                    photo={item.photo}
                    price={item.price}
                  />
                )
              })}
            </div>
          </section>
        </main>
        <EventModalBurger
          data={burger}
          onCloseModal={onCloseModal}
          isModalOpen={isModalOpen}
        />
      </div>
      <Footer />
    </>
  )
}
