import React, { useState } from 'react';
import { format } from 'date-fns';

interface ResultsPanelProps {
  prediction: string;
  confidence: number;
  annotations: string[];
  onAnnotationAdd: (annotation: string) => void;
  selectedImage: File | any;
}

export function ResultsPanel({
  prediction,
  confidence,
  annotations,
  onAnnotationAdd,
  selectedImage
}: ResultsPanelProps) {
  const [newAnnotation, setNewAnnotation] = useState('');
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [newCollaborator, setNewCollaborator] = useState('');

  const handleAnnotationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnnotation.trim()) {
      onAnnotationAdd(`${format(new Date(), 'MM/dd/yyyy HH:mm')} - ${newAnnotation}`);
      setNewAnnotation('');
    }
  };

  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollaborator.trim() && !collaborators.includes(newCollaborator)) {
      setCollaborators([...collaborators, newCollaborator]);
      setNewCollaborator('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
      {/* Analysis Results */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
          <h4 className="font-medium text-lg mb-2">Detected Condition</h4>
          <p className="text-2xl font-bold text-blue-600 mb-2">{prediction}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${confidence * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Confidence: {(confidence * 100).toFixed(1)}%
          </p>
        </div>

        {/* AI Recommendations */}
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
          <h4 className="font-medium text-lg mb-2">AI Recommendations</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Schedule follow-up examination within 2 weeks</li>
            <li>Consider additional hormone testing (FSH, LH, E2)</li>
            <li>Review patient history for related symptoms</li>
            <li>Recommend pelvic ultrasound series</li>
          </ul>
        </div>
      </div>

      {/* Collaboration Section */}
      <div className="p-6">
        <h4 className="font-medium text-lg mb-4">Collaboration</h4>
        <form onSubmit={handleAddCollaborator} className="mb-4">
          <div className="flex gap-2">
            <input
              type="email"
              value={newCollaborator}
              onChange={(e) => setNewCollaborator(e.target.value)}
              placeholder="Add collaborator email..."
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2 mb-4">
          {collaborators.map((email, index) => (
            <div key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {email}
            </div>
          ))}
        </div>
      </div>

      {/* Medical Notes */}
      <div className="p-6">
        <h4 className="font-medium text-lg mb-4">Medical Notes</h4>
        <form onSubmit={handleAnnotationSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newAnnotation}
              onChange={(e) => setNewAnnotation(e.target.value)}
              placeholder="Add a medical note..."
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
        
        <div className="space-y-2">
          {annotations.map((annotation, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              {annotation}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}