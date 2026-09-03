import { spawn, type ChildProcess } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

import { COPY, HOME } from '../lib/copy'
import { devPrep } from './dev-prep'

dotenv.config()

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const PORT = Number(process.env.E2E_PORT || 3099)
const BASE = process.env.E2E_BASE_URL || `http://127.0.0.1:${PORT}`
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@rmembalagens.local'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'admin123'

type Check = {
  name: string
  run: () => Promise<void>
}

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message)
}

async function waitForServer(url: string, timeoutMs = 120_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: 'follow' })
      if (res.status < 500) return
    } catch {
      // server still booting
    }
    await new Promise((r) => setTimeout(r, 800))
  }
  throw new Error(`Servidor não respondeu em ${timeoutMs / 1000}s: ${url}`)
}

function startDevServer(): ChildProcess {
  return spawn('npx', ['next', 'dev', '-p', String(PORT)], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'development' },
  })
}

async function login(): Promise<string> {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  assert(res.ok, `Login admin falhou (${res.status})`)
  const data = await res.json()
  assert(data?.token, 'Login não retornou token')
  return data.token as string
}

const checks: Check[] = [
  {
    name: 'Home renderiza',
    async run() {
      const res = await fetch(`${BASE}/`)
      const html = await res.text()
      assert(res.ok, `GET / → ${res.status}`)
      assert(html.includes(HOME.heroTitle.slice(0, 40)), 'Home sem título do hero (copy.js)')
      assert(html.includes(COPY.navProducts), 'Home sem menu Produtos (estrutura fixa)')
      assert(
        html.includes('/hero.jpg') || html.includes('/api/media/file/hero'),
        'Home sem foto do hero',
      )
    },
  },
  {
    name: 'Catálogo renderiza',
    async run() {
      const res = await fetch(`${BASE}/produtos`)
      const html = await res.text()
      assert(res.ok, `GET /produtos → ${res.status}`)
      assert(html.includes('Sacolas'), 'Página produtos sem linha Sacolas')
    },
  },
  {
    name: 'Contato renderiza',
    async run() {
      const res = await fetch(`${BASE}/contato`)
      const html = await res.text()
      assert(res.ok, `GET /contato → ${res.status}`)
      assert(html.includes('WhatsApp'), 'Página contato sem WhatsApp')
    },
  },
  {
    name: 'Global company (API pública)',
    async run() {
      const res = await fetch(`${BASE}/api/globals/company?depth=0`)
      assert(res.ok, `GET /api/globals/company → ${res.status}`)
      const data = await res.json()
      assert(data?.phone, 'Global company sem telefone')
      assert(data?.whatsapp, 'Global company sem WhatsApp')
    },
  },
  {
    name: 'Global home-config (API pública)',
    async run() {
      const res = await fetch(`${BASE}/api/globals/home-config?depth=0`)
      assert(res.ok, `GET /api/globals/home-config → ${res.status}`)
      const data = await res.json()
      assert(Array.isArray(data?.sections), 'home-config sem seções')
    },
  },
  {
    name: 'Catálogo via API',
    async run() {
      const res = await fetch(`${BASE}/api/product-groups?limit=10&sort=order`)
      assert(res.ok, `GET /api/product-groups → ${res.status}`)
      const data = await res.json()
      assert(data?.docs?.length >= 4, 'Menos de 4 linhas no catálogo')
    },
  },
  {
    name: 'Admin abre',
    async run() {
      const res = await fetch(`${BASE}/admin`, { redirect: 'follow' })
      assert(res.ok, `GET /admin → ${res.status}`)
      const html = await res.text()
      assert(html.includes('RM Embalagens') || html.includes('Payload'), 'Admin não carregou')
    },
  },
  {
    name: 'Login admin + listar produtos (fluxo funcionária)',
    async run() {
      const token = await login()
      const res = await fetch(`${BASE}/api/product-categories?limit=5&depth=0`, {
        headers: { Authorization: `JWT ${token}` },
      })
      assert(res.ok, `GET categorias autenticado → ${res.status}`)
      const data = await res.json()
      assert(data?.docs?.length >= 1, 'Nenhum produto no catálogo')
    },
  },
]

async function main() {
  console.log('[e2e] Preparando banco local…')
  await devPrep({ reset: process.env.E2E_FRESH === '1' })

  console.log(`[e2e] Subindo servidor em ${BASE}…`)
  const server = startDevServer()

  server.stdout?.on('data', (chunk) => {
    const line = String(chunk)
    if (line.includes('Pulling schema') || line.includes('Is company table')) {
      console.error('\n[e2e] ERRO: Drizzle pediu confirmação interativa — rode npm run dev:reset\n')
      server.kill('SIGTERM')
      process.exit(1)
    }
  })

  try {
    await waitForServer(`${BASE}/`)

    let passed = 0
    for (const check of checks) {
      process.stdout.write(`  • ${check.name}… `)
      await check.run()
      passed++
      console.log('OK')
    }

    console.log(`\n[e2e] ${passed}/${checks.length} checks passaram.\n`)
  } finally {
    server.kill('SIGTERM')
    await new Promise((r) => setTimeout(r, 500))
  }
}

main().catch((error) => {
  console.error('\n[e2e] FALHOU:', error.message || error)
  process.exit(1)
})
