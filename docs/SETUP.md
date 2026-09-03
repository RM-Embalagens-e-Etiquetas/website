# Setup — Caminho A (repo público + Vercel Hobby)

## O que você faz (15 min, na ordem)

### 1. GitHub — repo público de novo
1. https://github.com/RM-Embalagens-e-Etiquetas/website/settings
2. **Danger Zone** → **Change visibility** → **Public**

### 2. Vercel — Blob PUBLIC (novo store)
O store atual é **Private** — não serve para site público.

1. Vercel → projeto **rm-embalagens** → **Storage**
2. **Create Database** → **Blob**
3. Nome: `rm-media` → Access: **Public** → Create
4. Conecte ao projeto **rm-embalagens** (Production + Preview)
5. Isso atualiza `BLOB_READ_WRITE_TOKEN` automaticamente

Opcional: apague o Blob **Private** antigo depois que tudo funcionar.

### 3. Vercel — reconectar Git
1. **Settings** → **Git** → **Connect Git Repository**
2. GitHub → org **RM-Embalagens-e-Etiquetas** → repo **website**
3. Branch de produção: **main**

### 4. Vercel — limpar env desnecessária
**Settings** → **Environment Variables** → apague `BLOB_STORE_ACCESS` se existir.

Confirme que existem (Production + Preview):
- `PAYLOAD_SECRET`
- `POSTGRES_URL`
- `BLOB_READ_WRITE_TOKEN` (do Blob **Public** novo)
- `NEXT_PUBLIC_SERVER_URL` = `https://rm-embalagens.vercel.app`

### 5. Popular banco (primeira vez ou após migration)
Local ou CI com env de produção:

```bash
npm run seed
```

Isso cria catálogo, globals `company` e `home-config`, e envia fotos pro Blob.

### 6. Deploy
Push no `main` ou **Deployments** → **Redeploy** → confira o site.

---

## Como fica no dia a dia

| Ação | Como |
|---|---|
| Editar catálogo, fotos, contatos, home | Funcionária no `/admin` |
| Mudar menu, títulos, estrutura | Push no `main` → Vercel deploya |
| Reset total do catálogo | `npm run seed` |

## Local

```bash
cp .env.example .env
npm run dev
```

Admin: http://localhost:3000/admin
