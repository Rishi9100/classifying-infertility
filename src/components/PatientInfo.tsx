import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

interface PatientData {
  name: string;
  age: string;
  history: string;
  symptoms: string[];
  previousTreatments: string[];
  medications: string[];
}

export function PatientInfo() {
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    age: '',
    history: '',
    symptoms: [],
    previousTreatments: [],
    medications: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <Tabs.Root defaultValue="info" className="w-full">
        <Tabs.List className="flex border-b border-gray-200">
          <Tabs.Trigger
            value="info"
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Basic Info
          </Tabs.Trigger>
          <Tabs.Trigger
            value="history"
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Medical History
          </Tabs.Trigger>
          <Tabs.Trigger
            value="treatments"
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Treatments
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="info" className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                name="name"
                value={patientData.name}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={patientData.age}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="history" className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical History
              </label>
              <textarea
                name="history"
                value={patientData.history}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter relevant medical history..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Symptoms
              </label>
              <div className="space-y-2">
                {patientData.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {symptom}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="treatments" className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Previous Treatments
              </label>
              <div className="space-y-2">
                {patientData.previousTreatments.map((treatment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">
                      {treatment}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Medications
              </label>
              <div className="space-y-2">
                {patientData.medications.map((medication, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 rounded-full text-sm">
                      {medication}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}