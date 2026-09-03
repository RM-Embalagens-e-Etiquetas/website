#!/usr/bin/env tsx
/** Dispara seed de produção na Vercel (1 request — Postgres + Blob). */
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

const base =
  process.env.MIGRATE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://rm-embalagens.vercel.app'
const url = `${base.replace(/\/$/, '')}/api/seed-prod`

for (const file of ['.env.local', '.env']) {
  const abs = path.resolve(process.cwd(), file)
  if (fs.existsSync(abs)) dotenv.config({ path: abs, override: true })
}

const secret = process.env.PAYLOAD_SECRET
if (!secret || secret.includes('[SENSITIVE]')) {
  console.error('Defina PAYLOAD_SECRET no .env')
  process.exit(1)
}

console.log('[seed-prod] Disparando seed na Vercel (pode levar 2–5 min)...')

const res = await fetch(url, {
  method: 'POST',
  headers: { authorization: `Bearer ${secret}` },
})

const text = await res.text()
try {
  console.log(JSON.stringify(JSON.parse(text), null, 2))
} catch {
  console.log(text)
}

if (!res.ok) process.exit(1)
console.log('Seed concluído.')
