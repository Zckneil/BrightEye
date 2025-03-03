#!/bin/bash

# Configure git if needed
git config --global user.email "user@example.com" 2>/dev/null || true
git config --global user.name "User" 2>/dev/null || true

# Add files
git add README.md LICENSE .gitignore

# Commit
git commit -m "Initial commit: Add README, LICENSE, and .gitignore"

# Set up remote (use HTTPS)
git remote set-url origin https://github.com/Zckneil/BrightEye.git

# Push
git push -u origin main

echo "Setup complete!" 