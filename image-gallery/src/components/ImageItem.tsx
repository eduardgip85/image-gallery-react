import type { Image } from '../types/image';


interface ImageItemProps {
    image: Image;
    isFeatured?: boolean;
}

export default function ImageItem({ image, isFeatured = false }: ImageItemProps) {
    return (
        <article
            className={`image-item ${isFeatured ? 'image-item--featured' : ''}`}
            >   
            <img src={image.url} alt={image.alt} />
        </article>
        
    );
}