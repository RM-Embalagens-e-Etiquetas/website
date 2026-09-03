import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withPayload } from '@payloadcms/next/withPayload'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function publicServerURL() {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL?.trim().replace(/\/$/, '')
  if (explicit) return explicit
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  if (host) return host.startsWith('http') ? host : `https://${host}`
  return undefined
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  env: {
    NEXT_PUBLIC_SERVER_URL: publicServerURL(),
  },
}

export default withPayload(nextConfig)
