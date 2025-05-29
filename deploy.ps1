# deploy.ps1 — PowerShell Deploy Script for Vite + GitHub + cPanel

# Stop if any command fails
$ErrorActionPreference = "Stop"

Write-Host "Building project..."
npm run build

Write-Host "Adding dist folder to Git..."
git add -f dist

# Optional: also add dist-ssr if you're using it
# git add -f dist-ssr

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Deploy: $timestamp"

Write-Host "Committing changes..."
git commit -m "$commitMessage"

Write-Host "Pushing to GitHub..."
git push origin main

Write-Host "Done! Your site will update shortly."
