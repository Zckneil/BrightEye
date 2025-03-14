'use client';

import { useState } from 'react';
import CornealVisualization from '@/components/scan/CornealVisualization';
import { motion } from 'framer-motion';

type VisualizationMode = 'surface' | 'wireframe' | 'contour' | 'ai-analysis';

export default function CornealVisualizationDemo() {
  const [irregularity, setIrregularity] = useState(0);
  const [thickness, setThickness] = useState(1);
  const [mode, setMode] = useState<VisualizationMode>('surface');

  const visualizationModes: VisualizationMode[] = ['surface', 'contour', 'ai-analysis'];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Section */}
      <header className="w-full py-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">
            3D Corneal Visualization
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience our advanced corneal mapping technology with real-time parameter controls 
            and professional analysis tools.
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-6 pb-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column - Visualization */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Visualization Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full aspect-[4/3] glass-panel p-4 relative overflow-hidden"
          >
            <div className="w-full h-full">
              <CornealVisualization
                irregularity={irregularity}
                thickness={thickness}
                mode={mode}
                height="100%"
                width="100%"
              />
            </div>
          </motion.div>

          {/* Interactive Controls - Moved Below Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Irregularity Control */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Corneal Irregularity
                </h3>
                <div className="space-y-6">
                  <div className="relative pt-6">
                    <input
                      type="range"
                      min="0"
                      max="0.2"
                      step="0.01"
                      value={irregularity}
                      onChange={(e) => setIrregularity(parseFloat(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="absolute top-0 left-0 right-0 flex justify-between text-sm text-gray-400">
                      <span>Normal</span>
                      <span className="text-primary">{irregularity.toFixed(2)}</span>
                      <span>Irregular</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Adjust to simulate various corneal surface irregularities.
                  </p>
                </div>
              </div>

              {/* Thickness Control */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Corneal Thickness
                </h3>
                <div className="space-y-6">
                  <div className="relative pt-6">
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      value={thickness}
                      onChange={(e) => setThickness(parseFloat(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="absolute top-0 left-0 right-0 flex justify-between text-sm text-gray-400">
                      <span>Thin</span>
                      <span className="text-primary">{thickness.toFixed(1)}</span>
                      <span>Thick</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Modify thickness to visualize different conditions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Controls and Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-96 space-y-6 flex flex-col"
        >
          {/* Visualization Mode */}
          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Visualization Mode
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {visualizationModes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    mode === m
                      ? 'bg-primary/20 text-primary border border-primary/50'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {m.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Information Panel */}
          <div className="glass-panel p-6 flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">
              About This Visualization
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                This interactive 3D visualization demonstrates our advanced corneal mapping technology, 
                featuring real-time rendering with custom shaders for accurate optical properties.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Fresnel effects for realistic light interaction
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Dynamic surface deformation simulation
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Accurate thickness visualization
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Real-time parameter adjustments
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 