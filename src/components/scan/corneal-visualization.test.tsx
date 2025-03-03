/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import CornealVisualization from './corneal-visualization'

// Mock the Three.js components since they're not easily testable in Jest
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="three-canvas">{children}</div>,
  useFrame: () => jest.fn(),
}))

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  useHelper: () => null,
}))

jest.mock('three', () => ({
  DirectionalLight: class MockDirectionalLight {},
  DirectionalLightHelper: class MockDirectionalLightHelper {},
  Mesh: class MockMesh {},
}))

describe('CornealVisualization Component', () => {
  it('renders the component with default props', () => {
    render(<CornealVisualization />)
    expect(screen.getByTestId('three-canvas')).toBeInTheDocument()
  })

  it('applies custom width and height', () => {
    render(<CornealVisualization width="800px" height="600px" />)
    const container = screen.getByTestId('three-canvas').parentElement
    expect(container).toHaveStyle('width: 800px')
    expect(container).toHaveStyle('height: 600px')
  })

  it('renders orbit controls for user interaction', () => {
    render(<CornealVisualization />)
    expect(screen.getByTestId('orbit-controls')).toBeInTheDocument()
  })
})
