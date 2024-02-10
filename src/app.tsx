import { useState } from 'react';
import Logo from './assets/logo-nlw.svg';
import NewNoteCard from './components/new-note-card';
import NoteCard from './components/note-card';


interface Note {
    id: string;
    date: Date;
    content: string;
}

export default function App() {
    const [searchString, setSearchString] = useState('');
    const [notes, setNotes] = useState<Note[]>(() => {
        const notes = localStorage.getItem('notes');

        if (notes) {
            return JSON.parse(notes);
        }

        return [];
    })

    const filteredNotes = searchString !== '' 
        ? notes.filter(note => note.content.toLowerCase().includes(searchString.toLowerCase()))
        : notes;
        


    const onNoteCreated = (content: string) => {
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            content
        }


        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);

        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.currentTarget.value);
    }

    const onNoteDeleted = (id: string) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);

        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }


    return (
        <div className='max-w-6xl mx-auto my-12 space-y-6 px-5 xl:px-0'>
            <img src={Logo} alt='Logo NLW Expert' />

            <form className='w-full'>
                <input 
                    type='text' 
                    placeholder='Search your notes...'
                    onChange={handleSearch}
                    className='w-full bg-transparent text-3xl font-semibold tracking-tight 
                        placeholder:text-slate-500 outline-none'
                />
            </form>

            {/* divisor */}
            <div className='h-px bg-slate-700' />

            {/* cards */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 auto-rows-[250px]'>
                <NewNoteCard onNoteCreated={onNoteCreated} />

                {filteredNotes.map((note) => (
                    <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
                ))}
            
            </div>
        </div>
    )
}