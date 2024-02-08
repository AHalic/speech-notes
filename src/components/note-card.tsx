export default function NoteCard() {
  return (
    <button className='text-left outline-none rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-300'>
            Há 2 dias
        </span>
        <p className='text-sm leading-6 text-slate-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium rerum dolorum quis at dicta! Minima fugiat perspiciatis dolores sequi, cumque voluptatem recusandae vero blanditiis similique sit delectus. Porro, numquam iure?
        </p>

        <div className=' absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/80 to-slate-950/0 pointer-events-none'/>
    </button>
  )
}