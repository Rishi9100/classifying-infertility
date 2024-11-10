import React from 'react';
import { MedicalImage } from '../data/sampleImages';

interface ImageGalleryProps {
  images: MedicalImage[];
  onImageSelect: (image: MedicalImage) => void;
}

export function ImageGallery({ images, onImageSelect }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative cursor-pointer group"
          onClick={() => onImageSelect(image)}
        >
          <img
            src={image.url}
            alt={image.condition}
            className="w-full h-48 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
            <p className="text-sm font-semibold">{image.condition}</p>
          </div>
        </div>
      ))}
    </div>
  );
}