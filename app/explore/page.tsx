import Sidebar from '../components/Sidebar'
import PracticeModes from './components/PracticeModes'


function Explore() {
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
    <section className="flex max-[950px]:flex-col">
        <Sidebar />
        <section className={`h-[100dvh] overflow-scroll no-scrollbar max-[850px]:pb-36 w-[80%] max-[950px]:w-full`}>
          <header className="py-6 max-[650px]:px-4 px-8 border-b border-gray-300 font-nunito-sans sticky -top-[.4px] bg-[#F7F7FE] z-10 font-semibold text-xl">
            <h1>Suggested for you</h1>
          </header>
          </section>

          <PracticeModes/> 
    </section>
  </section>
  )
}

export default Explore