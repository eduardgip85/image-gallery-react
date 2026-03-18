import { useState } from 'react';
import ImageItem from './imageItem';
import { Image } from '../types/image';

const initialImages: Image[] = [
    { id: '1', url: './src/assets/img1.jpg', alt: 'Image 1' },
    { id: '2', url: './src/assets/img1.jpg', alt: 'Image 2' },
    { id: '3', url: './src/assets/img1.jpg', alt: 'Image 3' },
    { id: '4', url: './src/assets/img1.jpg', alt: 'Image 4' },
    { id: '5', url: './src/assets/img1.jpg', alt: 'Image 5' },
    { id: '6', url: './src/assets/img1.jpg', alt: 'Image 6' },
    { id: '7', url: './src/assets/img1.jpg', alt: 'Image 7' },
    { id: '8', url: './src/assets/img1.jpg', alt: 'Image 8' },
    { id: '9', url: './src/assets/img1.jpg', alt: 'Image 9' },
];

export default function Gallery() {
    
    const [images] = useState<Image[]>(initialImages);

    return (
        <section>
            <h1>Image Gallery</h1>

            <div className="gallery-grid">
                {images.map((img,index) => (
                    <ImageItem 
                        key={img.id} 
                        image={img} 
                        isFeatured={index === 0} 
                        />
                ))}
            </div>

        </section>
    )

}