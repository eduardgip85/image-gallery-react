import { useState } from 'react';
import ImageItem from './imageItem';
import { Image } from '../types/image';
//dnd-kit
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';



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
    
    //same with native and dnd-kit, we can use the same delete handler
    const handleDelete = (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this image?');
        if (!confirmed) return;
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if(!over || active.id === over.id) return;

        setImages((prevImages) => {
            const oldIndex = prevImages.findIndex((img) => img.id === active.id);
            const newIndex = prevImages.findIndex((img) => img.id === over.id);
            return arrayMove(prevImages, oldIndex, newIndex);
        });
    };

    return (
        <section className='mx-auto max-w-6xl p-4'>
            <h1 className='mb-6 text-3xl font-bold text-center'>Image Gallery</h1>

            <DndContext 
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={images.map((img) => img.id)}
                    strategy={rectSortingStrategy}
                >   
                    <div 
                    role='list'
                    aria-label="Image gallery"
                    className="grid gap-4
                                    grid-cols-2
                                    md:grid-cols-4
                                    lg:grid-cols-5
                                    auto-rows-[150px]">
                        {images.map((img,index) => (
                            <ImageItem 
                                key={img.id}
                                image={img}
                                isFeatured={index === 0}
                                onDelete={handleDelete}
                                />
                        ))}

                    </div>
                </SortableContext>
            </DndContext>

        </section>
    )

}