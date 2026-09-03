import { timingSafeEqual } from 'node:crypto'
import { getPayload } from 'payload'
import config from '@payload-config'

import { reuploadPendingMedia } from '@/lib/reupload-media'

export const maxDuration = 60

function secretOk(provided: string | null) {
  const expected = process.env.PAYLOAD_SECRET
  if (!provided || !expected) return false
  try {
    const a = Buffer.from(provided)
    const b = Buffer.from(expected)
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}

function htmlPage(secret: string) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Enviar fotos para o Blob</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
    #log { background: #111; color: #0f0; padding: 1rem; border-radius: 8px; min-height: 12rem; white-space: pre-wrap; font-size: 14px; }
    .err { color: #f66; }
    .ok { color: #6f6; }
  </style>
</head>
<body>
  <h1>Enviando fotos para o Vercel Blob…</h1>
  <p>Não feche esta aba até aparecer <strong>Concluído</strong>.</p>
  <div id="log">Iniciando…</div>
  <script>
    const secret = ${JSON.stringify(secret)};
    const log = document.getElementById('log');
    function line(text, cls) {
      const span = document.createElement('div');
      if (cls) span.className = cls;
      span.textContent = text;
      log.appendChild(span);
    }
  async function run() {
    log.textContent = '';
    let rounds = 0;
    while (true) {
      rounds++;
      const res = await fetch('/api/reupload-media?secret=' + encodeURIComponent(secret) + '&limit=4');
      const data = await res.json();
      if (!res.ok) {
        line('Erro: ' + (data.error || res.status), 'err');
        return;
      }
      for (const item of data.processed || []) {
        line('✓ ' + item.filename, 'ok');
      }
      for (const name of data.missing || []) {
        line('✗ sem arquivo: ' + name, 'err');
      }
      if (!data.done) {
        line('… faltam ' + data.remaining + ' (lote ' + rounds + ')');
        continue;
      }
      line('\\nConcluído! ' + data.total + ' fotos no banco.', 'ok');
      line('Atualize o site (Ctrl+F5).', 'ok');
      return;
    }
  }
  run().catch((e) => line(String(e), 'err'));
  </script>
</body>
</html>`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!secretOk(secret)) {
    return Response.json({ error: 'secret inválido' }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      {
        error:
          'BLOB_READ_WRITE_TOKEN não está neste deploy. Adicione em Production (e Preview) e faça redeploy.',
      },
      { status: 503 },
    )
  }

  if (searchParams.get('ui') === '1') {
    return new Response(htmlPage(secret!), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  const limit = Math.min(Math.max(Number(searchParams.get('limit') || 5), 1), 10)
  const payload = await getPayload({ config })
  const result = await reuploadPendingMedia(payload, { limit })

  return Response.json(result)
}
