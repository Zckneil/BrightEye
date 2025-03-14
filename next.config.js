/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'EyeQ.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline' http: https:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: http: https:; connect-src 'self' ws: wss: http: https:; font-src 'self' data:;"
          }
        ],
      },
    ]
  },
  // Make environment variables available to the client
  env: {
    // We don't expose the actual password to the client
    // Instead, we just indicate that password protection is enabled
    PASSWORD_PROTECTION_ENABLED: !!process.env.SITE_PASSWORD,
  },
}

module.exports = nextConfig
