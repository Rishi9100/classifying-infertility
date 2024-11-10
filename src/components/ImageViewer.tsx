import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Stage, Layer, Circle } from 'react-konva';

interface ImageViewerProps {
  image: File | null;
  annotations: Array<{ x: number; y: number }>;
  onAnnotationAdd?: (annotation: { x: number; y: number }) => void;
  isDrawingMode: boolean;
}

export function ImageViewer({ 
  image, 
  annotations, 
  onAnnotationAdd,
  isDrawingMode 
}: ImageViewerProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageSize({ width: img.width, height: img.height });
  };

  const handleCanvasClick = (e: any) => {
    if (!isDrawingMode || !onAnnotationAdd) return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    onAnnotationAdd({ x: point.x, y: point.y });
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <TransformWrapper>
        <TransformComponent>
          <div className="relative">
            {image && (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Medical scan"
                  className="max-w-full h-auto"
                  onLoad={handleImageLoad}
                />
                <Stage
                  width={imageSize.width}
                  height={imageSize.height}
                  onClick={handleCanvasClick}
                  className="absolute top-0 left-0"
                >
                  <Layer>
                    {annotations.map((annotation, i) => (
                      <Circle
                        key={i}
                        x={annotation.x}
                        y={annotation.y}
                        radius={5}
                        fill="#FF0000"
                        opacity={0.8}
                      />
                    ))}
                  </Layer>
                </Stage>
              </>
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
      
      <div className="absolute bottom-4 right-4 space-x-2">
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Zoom In
        </button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Zoom Out
        </button>
      </div>
    </div>
  );
}