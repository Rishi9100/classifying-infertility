import React from 'react';
import { ImageClassifier } from './components/ImageClassifier';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Medical Image Analysis System
        </h1>
        <ImageClassifier />
      </div>
    </div>
  );
}

export default App;