#!/bin/bash

# Add all modified files
git add .

# Create a commit with a descriptive message
git commit -m "Add password protection feature with Vercel environment variables support

- Implemented password protection page with animations and styling
- Added API endpoint for password verification
- Updated middleware to check for password authentication
- Added documentation for Vercel deployment
- Configured environment variables for secure password storage"

# Push the changes to the remote repository
git push

echo "Password protection feature committed and pushed successfully!" 