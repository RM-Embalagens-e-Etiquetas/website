import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

const seedProduction =
  process.argv.includes('--prod') || process.env.RM_SEED_PRODUCTION === '1'

if (seedProduction) {
  for (const file of ['.env.vercel', '.env.production.local', '.env']) {
    const abs = path.resolve(process.cwd(), file)
    if (fs.existsSync(abs)) dotenv.config({ path: abs, override: false })
  }
} else {
  dotenv.config()
}
