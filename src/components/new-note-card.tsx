import * as Dialog from "@radix-ui/react-dialog";

import { ArrowLeft, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void;
}

export default function NewNoteCard({ onNoteCreated } : NewNoteCardProps){
    const [showOnBoarding, setShowOnBoarding] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [content, setContent] = useState('');

    let recognitionAPI: SpeechRecognition | null = null;

    const handleStartTextEditor = () => {
        setShowOnBoarding(false);
    }

    const handleContentChange = (event: FormEvent<HTMLTextAreaElement>) => {
        setContent(event.currentTarget.value);
    }

    const handleSaveNote = (event: FormEvent) => {
        // prevent change of page
        event.preventDefault();


        if (content === '') {
            toast.error('Note cannot be empty');
            return;
        }

        onNoteCreated(content);
        
        setContent('');
        setIsOpen(false);
        setShowOnBoarding(true);

        toast.success('Note saved successfully');
    }

    const handleStartRecording = () => {
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
        || 'webkitSpeechRecognition' in window;
        
        if (!isSpeechRecognitionAPIAvailable) {
            toast.warning('Speech recognition is not available in your browser');
            return;
        }

        setIsRecording(true);
        setShowOnBoarding(false);
        
        recognitionAPI = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        
        recognitionAPI.lang = 'pt-BR';
        recognitionAPI.continuous = true;
        recognitionAPI.maxAlternatives = 1; // only one result for each recognition
        recognitionAPI.interimResults = true; // show results while speaking


        recognitionAPI.onresult = (event) => {
            const transcript = Array.from(event.results)
                .reduce((acc, result) => acc.concat(result[0].transcript), '')
            
            setContent(transcript);
        }

        recognitionAPI.onerror = (event) => {
            console.error(event.error);
            setIsRecording(false);
        }

        recognitionAPI.start();
    }

    const handleStopRecording = () => {
        setIsRecording(false);

        if (recognitionAPI !== null) {
            recognitionAPI.stop();
        }
    }

    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Trigger onClick={() => setIsOpen(true)} className='rounded-md bg-slate-700 p-5 gap-3 flex flex-col text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-sm font-medium text-slate-200'>
                    Add Note
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                    Record an audio note that will be automatically converted to text.
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
                <Dialog.Content className="overflow-hidden fixed inset-0 md:inset-auto md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2 md:max-w-[600px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
                    <Dialog.Close 
                        onClick={() => {
                            setShowOnBoarding(true)
                            handleStopRecording()
                            setContent('')
                            setIsOpen(false)
                        }} 
                        className="outline-none absolute top-0 right-0 p-1.5 text-slate-400 hover:text-slate-300 focus-visible:text-lime-400"
                    >
                        <X className="size-5"/>
                    </Dialog.Close>

                    {!showOnBoarding && (
                        <button 
                            className="text-slate-400 hover:text-slate-300 focus-visible:text-lime-400 cursor-pointer outline-none absolute top-0 right-8 p-1.5" 
                            onClick={() => {
                                setShowOnBoarding(true)
                                setContent('')
                                handleStopRecording()
                            }} 
                        >
                            <ArrowLeft className="size-5"/>
                        </button>
                    )}

                    <form className="flex-1 flex flex-col gap-3 overflow-hidden">
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className='text-sm font-medium text-slate-300 first-letter:capitalize'>
                                New Note
                            </span>


                            {showOnBoarding ? (
                                <p className='text-sm leading-6 text-slate-400'>
                                    {/* Comece gravando uma nota em áudio ou se preferir utilize apenas texto. */}
                                    Start&nbsp;
                                    <button
                                        type="button"
                                        onClick={handleStartRecording}
                                        className='text-lime-400 font-medium outline-none hover:underline focus-visible:underline'
                                    >
                                        recording an audio note
                                    </button> 
                                    &nbsp;or if you prefer,&nbsp;
                                    <button
                                        type="button"
                                        onClick={handleStartTextEditor}
                                        className='text-lime-400 font-medium outline-none hover:underline focus-visible:underline'
                                    >
                                        use only text
                                    </button> 
                                    .
                                </p>
                            ) : (
                                <textarea
                                    autoFocus
                                    value={content}
                                    onChange={handleContentChange}
                                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                                />
                            )}
                        </div>

                        {isRecording ? (
                            <button 
                                type="button" 
                                onClick={handleStopRecording}
                                className='w-full flex items-center justify-center gap-2 py-4 text-center text-sm outline-none font-medium bg-slate-800 text-slate-50 transition-colors duration-300'
                            >
                                <div className="size-3 rounded-full bg-red-500 animate-pulse"/>
                                Recording! (click to stop)
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                disabled={showOnBoarding}
                                onClick={handleSaveNote}
                                className={`w-full py-4 text-center text-sm outline-none font-medium 
                                    ${showOnBoarding ? 'bg-slate-800 text-slate-500 transition-colors duration-300' 
                                    : 'duration-300 transition-colors text-lime-950 bg-lime-400 hover:bg-lime-500 focus-visible:bg-lime-500'}
                                `}
                            >
                                Save Note
                            </button>
                        )}

                    </form>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}