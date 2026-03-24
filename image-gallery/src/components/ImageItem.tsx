import React from 'react';
import type { Image } from '../types/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


interface ImageItemProps {
    image: Image;
    isFeatured?: boolean;
    onDelete: (id: string) => void;
}

export default function ImageItem({ image, isFeatured = false, onDelete }: ImageItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <article
            ref={setNodeRef}
            data-featured={isFeatured ? "true" : "false"}
            style={style}
            {...attributes}
            {...listeners}
            draggable
            className={`
                group relative overflow-hidden rounded-xl bg-white shadow
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`
            }
        >   
            <img 
                src={image.url} 
                alt={image.alt} 
                className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
            />
            <button
                type='button' 
                onClick={(event) =>{event.stopPropagation(); onDelete(image.id)}}
                className='absolute top-2 right-2 z-10
                            inline-flex items-center justify-center
                            px-4 py-2
                            rounded-full
                            bg-red-400 text-white
                            text-sm font-medium
                            shadow-md

                            hover:bg-red-700
                            active:scale-95

                            transition'
                                >
                Delete
            </button>
        </article>
        
    );
}