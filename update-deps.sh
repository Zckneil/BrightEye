#!/bin/bash

# Update Next.js and related dependencies
npm install next@latest react@latest react-dom@latest

# Clean the Next.js cache and rebuild
rm -rf .next
npm run build

echo "Dependencies updated successfully!" 