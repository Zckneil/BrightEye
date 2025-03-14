# Password Protection Setup

This document explains how to set up and manage the site-wide password protection feature.

## Overview

The EyeQ application includes a site-wide password protection feature that requires visitors to enter a password before accessing any content. This is implemented using:

1. Next.js middleware to intercept requests
2. A password verification API endpoint
3. A secure cookie to remember authenticated users
4. Environment variables to store the password securely

## Local Development

For local development, the password is stored in the `.env` file:

```
SITE_PASSWORD="your-password-here"
```

## Vercel Deployment

For production deployment on Vercel, follow these steps:

1. Log in to your Vercel dashboard
2. Select your EyeQ project
3. Navigate to "Settings" > "Environment Variables"
4. Add a new environment variable:
   - Name: `SITE_PASSWORD`
   - Value: Your chosen password (e.g., "MayoJax")
   - Environment: All (or select specific environments)
5. Click "Save"

![Vercel Environment Variables](https://vercel.com/docs/storage/images/env-vars-dashboard.png)

## Changing the Password

To change the password:

1. Go to your Vercel dashboard
2. Navigate to your project's "Settings" > "Environment Variables"
3. Find the `SITE_PASSWORD` variable
4. Click "Edit" and update the value
5. Click "Save"
6. Redeploy your application for the changes to take effect

## Security Considerations

- The password is never exposed to the client-side JavaScript
- The password verification happens server-side in the API route
- The authentication status is stored in an HTTP-only cookie
- The middleware intercepts all requests to protected routes

## Troubleshooting

If you encounter issues with the password protection:

1. Verify that the `SITE_PASSWORD` environment variable is correctly set in Vercel
2. Check that the middleware is correctly configured to protect the desired routes
3. Clear your browser cookies and try again
4. Check the server logs for any error messages

For additional help, please contact the development team. 