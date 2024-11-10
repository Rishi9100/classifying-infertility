import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { classifyImage } from '../utils/classifier';
import { ImageViewer } from './ImageViewer';

interface Annotation {
  x: number;
  y: number;
}

export function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(file);
      const result = await classifyImage(file);
      setPrediction(result.class);
      setConfidence(result.confidence);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  });

  const handleAnnotationAdd = (annotation: Annotation) => {
    setAnnotations([...annotations, annotation]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Medical Image Classification</h2>
      
      <div className="mb-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500">Drop the image here...</p>
          ) : (
            <p className="text-gray-500">
              Drag and drop a medical image here, or click to select
            </p>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="space-y-6">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsDrawingMode(!isDrawingMode)}
              className={`px-4 py-2 rounded ${
                isDrawingMode ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {isDrawingMode ? 'Drawing Mode' : 'View Mode'}
            </button>
          </div>

          <ImageViewer
            image={selectedImage}
            annotations={annotations}
            onAnnotationAdd={handleAnnotationAdd}
            isDrawingMode={isDrawingMode}
          />

          {prediction && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Analysis Results:</h3>
              <p className="mb-2">Condition: {prediction}</p>
              <p>Confidence: {(confidence * 100).toFixed(1)}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}