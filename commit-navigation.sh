#!/bin/bash

# Add the modified files
git add src/app/components/Navigation.tsx src/app/page.tsx

# Commit the changes
git commit -m "fix: Update navigation component and header for proper event handling"

# Push to GitHub
git push origin main

# Print success message
echo "Navigation changes committed and pushed successfully!" 