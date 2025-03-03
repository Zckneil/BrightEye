#!/bin/bash

# Add all modified and new files
git add commit-readme.sh
git add package-lock.json
git add package.json
git add src/app/globals.css
git add commit-design.sh
git add commit-middleware.sh
git add commit-navigation.sh
git add commit-visualization.sh
git add fix-deps.sh
git add src/app/components/Footer.tsx
git add update-deps.sh

# Commit the changes
git commit -m "chore: Add all project files and scripts"

# Push to GitHub
git push origin main

# Print success message
echo "All project files committed and pushed successfully!" 