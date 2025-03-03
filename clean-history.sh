#!/bin/bash

# Create a new branch without the history
git checkout --orphan latest_branch

# Add all files
git add -A

# Commit changes
git commit -m "feat: Initial commit with clean history"

# Delete the main branch
git branch -D main

# Rename the current branch to main
git branch -m main

# Force push to remote
git push -f origin main

echo "Repository history has been cleaned!" 