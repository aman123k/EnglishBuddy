import Link from 'next/link'

function PracticeModes() {
  return (
    <section className={`w-[20%] max-[950px]:hidden bg-white px-5 flex flex-col gap-6`} >
    <header
      className="py-6 w-full border-b border-gray-200 font-nunito-sans  font-semibold text-xl flex items-center gap-2.5
     justify-between"
    >
      <h1>Popular modes</h1>
    </header>

    <section className=' flex flex-col gap-6'>
      <Link href={'/learning-modes/chat'} >
      <div className=' flex flex-col gap-4 border border-[#E9EBF9] rounded-3xl p-4 hover:bg-[#E9EBF9] duration-75'>
          <h5 className=' text-xl font-nunito-sans text-[#282828]  font-semibold'>Chat</h5>
          <p className='font-nunito-sans text-[#282828] text-sm'>Improve your language skills by chatting with our AI teacher.</p>
      </div>
      </Link>
      <Link href={'/learning-modes/roleplays'} >
      <div className=' flex flex-col gap-4 border border-[#E9EBF9] rounded-3xl p-4 hover:bg-[#E9EBF9] duration-75'>
          <h5 className=' text-xl font-nunito-sans text-[#282828]  font-semibold'>Roleplays</h5>
          <p className='font-nunito-sans text-[#282828] text-sm'>Learn English by role-playing real-life conversations with our AI teacher.</p>
      </div>
      </Link>
    </section>
   </section>

  )
}

export default PracticeModes