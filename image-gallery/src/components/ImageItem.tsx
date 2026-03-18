import React from 'react';
import type { Image } from '../types/image';


interface ImageItemProps {
    image: Image;
    isFeatured?: boolean;
    onDelete: (id: string) => void;
    onDragStart: (id:string) => void;
    onDragOver: (event: React.DragEvent<HTMLElement>) => void;
    onDrop: (id:string) => void;
}

export default function ImageItem({ image, isFeatured = false, onDelete, onDragStart, onDragOver, onDrop }: ImageItemProps) {
    return (
        <article
            draggable
            onDragStart={() => onDragStart(image.id)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(image.id)}
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