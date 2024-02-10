import * as Dialog from "@radix-ui/react-dialog";

import { X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
    note: {
        id: string;
        date: Date;
        content: string;
    },
    onNoteDeleted: (id: string) => void;
}

export default function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
        <Dialog.Trigger className='text-left flex flex-col outline-none rounded-md bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
            <span className='text-sm font-medium text-slate-300 first-letter:capitalize'>
                {/* {note.date.toLocaleDateString()} */}
                {formatDistanceToNow(note.date, { addSuffix: true })}
            </span>
            <p className='text-sm leading-6 text-slate-400'>
                {note.content}
            </p>

            <div className=' absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/80 to-slate-950/0 pointer-events-none'/>
        </Dialog.Trigger>

        <Dialog.Portal>
            <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
            <Dialog.Content className="overflow-hidden fixed inset-0 md:inset-auto md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2 md:max-w-[600px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
                <Dialog.Close className="absolute top-0 right-0 p-1.5 text-slate-400 outline-none focus-visible:text-lime-400 hover:text-slate-300">
                    <X className="size-5"/>
                </Dialog.Close>

                <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className='text-sm font-medium text-slate-300 first-letter:capitalize'>
                        {formatDistanceToNow(note.date, { addSuffix: true })} 
                        {/* {note.date.toLocaleDateString()} */}
                    </span>
                    <p className='text-sm leading-6 text-slate-400'>
                        {note.content}
                    </p>
                </div>

                <button 
                    type="button"
                    onClick={() => onNoteDeleted(note.id)}
                    className="w-full bg-slate-800 py-4 text-center text-sm text-red-500 outline-none font-medium group hover:bg-slate-800/85 focus-visible:bg-slate-800/85 focus-visible:underline"
                >
                    {/* Using group */}
                    {/* <span className="text-red-400 group-hover:underline group-focus-visible:underline">Delete</span> this note */}
                    Delete this note
                </button>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}