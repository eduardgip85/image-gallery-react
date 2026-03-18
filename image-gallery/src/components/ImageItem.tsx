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
            style={style}
            {...attributes}
            {...listeners}
            draggable
            className={`
                relative overflow-hidden rounded-xl bg-white shadow
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
                className='absolute top-2 right-2 z-10 rounded-full bg-red-500 px-3 text-lg'
            >
                Delete
            </button>
        </article>
        
    );
}