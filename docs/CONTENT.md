# Conteúdo do site (content-as-code)

Dois fluxos independentes:

| Quem | Onde edita | O que muda |
|---|---|---|
| **Funcionária** | `/admin` em produção | Textos, fotos, produtos no dia a dia |
| **Você (dev)** | `src/content/` no repositório | Conteúdo em lote, novos produtos, reset |

## Arquivos de conteúdo

```
src/content/
  groups.json          # linhas do catálogo (Sacolas, Etiquetas…)
  categories.json      # produtos/categorias
  media.json           # hero, sobre, slugs de prova
  globals/
    site.json          # header, footer, SEO, contatos
    home.json          # página inicial
    about.json         # página sobre
    contact.json       # página contato
```

Fotos dos produtos ficam em `public/products/{slug}/`.

## Imagens (importante para quota Vercel)

As fotos do catálogo vêm de `public/products/` — servidas pela **CDN estática da Vercel** (grátis, sem serverless).

O CMS guarda referências (filename); o site resolve para `/products/sacolas-algodao/01.jpg` etc.

- **Funcionária** edita textos no admin normalmente
- **Novas fotos** → adicionar em `public/products/{slug}/` no repo + sync, ou upload pelo admin (Blob)
- **Não** precisa rodar sync só por causa de imagens se os arquivos já estão em `public/`

## Sincronizar para produção

### Pelo GitHub (recomendado)

1. Edite os JSON, commit, push
2. GitHub → **Actions** → **Sync CMS** → **Run workflow**
3. Escolha o modo:
   - **safe** — cria o que falta, corrige fotos no Blob, **não apaga edições da funcionária**
   - **force** — sobrescreve tudo com o que está no repo (use só na primeira vez ou reset)
   - **media** — só envia fotos para o Vercel Blob

Secrets necessários: `PAYLOAD_SECRET`, `POSTGRES_URL`, `BLOB_READ_WRITE_TOKEN`

### Pelo terminal (local)

```bash
npx vercel env pull .env.production --environment=production
# Cole os valores [SENSITIVE] manualmente
set -a && source .env.production && set +a

npm run content:sync          # safe (padrão)
npm run content:sync:force      # sobrescreve tudo
npm run content:sync:media      # só fotos
npm run seed                    # alias de force (bootstrap)
```

## Editar pelo Cursor / MCP

1. Peça ao Cursor para alterar `src/content/*.json` ou adicionar fotos em `public/products/`
2. Commit + push
3. Dispare **Sync CMS** no GitHub (modo `safe`)

Para alterações pontuais sem sync, use a API REST do Payload:

```
POST https://rm-embalagens.vercel.app/api/globals/site
Authorization: users API key ou login de admin
```

## Regra de ouro

- **Funcionária editou no admin?** → use modo `safe` (nunca `force`)
- **Primeira vez / reset total?** → use modo `force` uma vez
- **Só imagens quebradas?** → use modo `media`
