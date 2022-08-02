import { Hamburger } from 'phosphor-react'

export function Header() {
  return (
    <header className="py-4 flex justify-center">
      <div className="bg-white w-[150px] h-[150px] rounded-full flex flex-col justify-center items-center shadow-md">
        <Hamburger size={70} />
        <span className="text-gray-900 text-base font-bold">Jonas Lanches</span>
      </div>
    </header>
  )
}
