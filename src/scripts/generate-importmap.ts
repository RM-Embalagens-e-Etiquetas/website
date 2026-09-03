import { execSync } from 'node:child_process'

process.env.BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_abc123_def456789012'
process.env.RM_USE_POSTGRES_LOCAL = '1'

execSync('npx payload generate:importmap', { stdio: 'inherit' })
