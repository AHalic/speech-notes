import Logo from './assets/logo-nlw.svg';
import NewNoteCard from './components/new-note-card';
import NoteCard from './components/note-card';

export default function App() {
  return (
    <div className='max-w-6xl mx-auto my-12 space-y-6'>
        <img src={Logo} alt='Logo NLW Expert' />

        <form className='w-full'>
            <input 
            type='text' 
            placeholder='Busque em suas notas...'
            className='w-full bg-transparent text-3xl font-semibold tracking-tight 
                placeholder:text-slate-500 outline-none'
            />
        </form>

        {/* divisor */}
        <div className='h-px bg-slate-700' />

        {/* cards */}
        <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
            <NewNoteCard />

            <NoteCard />
            <NoteCard />
            <NoteCard />
        
        </div>
    </div>
  )
}