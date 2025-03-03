#!/bin/bash

# Add the changed files
git add src/app/page.tsx
git add src/components/scan/CornealVisualization.tsx
git add src/app/demo/

# Commit the changes
git commit -m "feat: Add interactive 3D corneal visualization demo and integrate with landing page"

# Push to GitHub
git push origin main

echo "Changes committed and pushed successfully!" 