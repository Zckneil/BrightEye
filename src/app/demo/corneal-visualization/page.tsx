'use client';

import { useState } from 'react';
import CornealVisualization from '@/components/scan/CornealVisualization';

export default function CornealVisualizationDemo() {
  const [irregularity, setIrregularity] = useState(0);
  const [thickness, setThickness] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            3D Corneal Visualization Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Interactive demonstration of our advanced corneal visualization technology.
            Adjust the parameters below to simulate different corneal conditions and
            explore the 3D model.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <CornealVisualization
              irregularity={irregularity}
              thickness={thickness}
              height="700px"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Corneal Irregularity
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={irregularity}
                onChange={(e) => setIrregularity(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Normal</span>
                <span>Value: {irregularity.toFixed(2)}</span>
                <span>Irregular</span>
              </div>
              <p className="text-sm text-gray-500">
                Adjust this slider to simulate various corneal surface irregularities,
                such as astigmatism or keratoconus.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Corneal Thickness
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={thickness}
                onChange={(e) => setThickness(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Thin</span>
                <span>Value: {thickness.toFixed(1)}</span>
                <span>Thick</span>
              </div>
              <p className="text-sm text-gray-500">
                Modify the corneal thickness to visualize different corneal conditions
                and their impact on vision.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            About This Visualization
          </h3>
          <div className="prose max-w-none text-gray-900">
            <p>
              This interactive 3D visualization demonstrates our advanced corneal
              mapping technology. The model uses real-time rendering with custom
              shaders to accurately represent the cornea's unique optical properties,
              including:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Fresnel effects for realistic light interaction</li>
              <li>Dynamic surface deformation for irregularity simulation</li>
              <li>Accurate thickness visualization</li>
              <li>Real-time parameter adjustments</li>
            </ul>
            <p className="mt-4">
              Medical professionals can use this tool to better understand and
              communicate corneal conditions to patients, while researchers can
              utilize it for educational purposes and treatment planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 