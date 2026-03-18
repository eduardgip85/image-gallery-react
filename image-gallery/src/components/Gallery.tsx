import { useState } from 'react';
import ImageItem from './imageItem';
import { Image } from '../types/image';

const initialImages: Image[] = [
    { id: '1', url: './src/assets/img1.jpg', alt: 'Image 1' },
    { id: '2', url: './src/assets/img1.jpg', alt: 'Image 2' },
    { id: '3', url: './src/assets/img1.jpg', alt: 'Image 3' },
    { id: '4', url: './src/assets/img2.jpg', alt: 'Image 4' },
    { id: '5', url: './src/assets/img1.jpg', alt: 'Image 5' },
    { id: '6', url: './src/assets/img1.jpg', alt: 'Image 6' },
    { id: '7', url: './src/assets/img1.jpg', alt: 'Image 7' },
    { id: '8', url: './src/assets/img1.jpg', alt: 'Image 8' },
    { id: '9', url: './src/assets/img1.jpg', alt: 'Image 9' },
];

export default function Gallery() {
    
    const [images,setImages] = useState<Image[]>(initialImages);
    const [draggedImageId, setDraggedImageId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this image?');
        if (!confirmed) return;
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    };

    //starts the drag operation and stores the id of the dragged image
    const handleDragStart = (id:string) => {
        setDraggedImageId(id);
    }

    //handles the drop event, reordering the images based on the dragged image and the target image
    const handleDragOver= (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
    }

    //reranges the array
    const handleDrop = (targetId: string) => {
        if(!draggedImageId || draggedImageId === targetId) return;

        setImages((prevImages) => {
            const updatedImages = [...prevImages];

            const draggerIndex = updatedImages.findIndex(
                (img) => img.id === draggedImageId
            );

            const targetIndex = updatedImages.findIndex(
                (img) => img.id === targetId
            )

            if(draggerIndex === -1 || targetIndex === -1) return prevImages;

            //take the element from the original position
            const [draggedImage] = updatedImages.splice(draggerIndex, 1);
            //insert the element in the new position
            updatedImages.splice(targetIndex, 0, draggedImage);

            return updatedImages;
        });

        setDraggedImageId(null);
        
    }

    return (
        <section className='mx-auto max-w-6xl p-4'>
            <h1 className='mb-6 text-3xl font-bold text-center'>Image Gallery</h1>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                {images.map((img,index) => (
                    <ImageItem 
                        key={img.id} 
                        image={img} 
                        isFeatured={index === 0} 
                        onDelete={handleDelete}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        />
                ))}
            </div>

        </section>
    )

}