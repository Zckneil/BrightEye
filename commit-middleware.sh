#!/bin/bash

# Add the middleware file
git add src/middleware.ts

# Commit the changes
git commit -m "chore: Temporarily disable auth middleware for testing"

# Push to GitHub
git push origin main

echo "Middleware changes committed and pushed successfully!" 