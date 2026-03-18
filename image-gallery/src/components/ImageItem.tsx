import type { Image } from '../types/image';


interface ImageItemProps {
    image: Image;
    isFeatured?: boolean;
}

export default function ImageItem({ image, isFeatured = false }: ImageItemProps) {
    return (
        <article
            className={`
                overflow-hidden rounded-xl bg-white shadow
                ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`
            }
        >   
            <img 
                src={image.url} 
                alt={image.alt} 
                className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
            />
        </article>
        
    );
}