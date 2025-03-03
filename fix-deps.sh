#!/bin/bash

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install specific versions that are compatible
npm install react@18.2.0 react-dom@18.2.0 next@14.0.4 --save
npm install @auth/prisma-adapter --save
npm install --legacy-peer-deps

# Clean the Next.js cache
rm -rf .next

echo "Dependencies fixed successfully!" 