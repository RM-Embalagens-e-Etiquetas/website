# Cursor — Vercel e GitHub (MCP)

Configuração para o agente ler logs, deploys e o repo sem colar tokens no chat.

## 1. Arquivos (já no repo)

- `.cursor/mcp.json` — Vercel + GitHub (só URL, OAuth no Cursor)
- `.cursor/rules/vercel-github.mdc` — IDs do projeto/time/repo

Global (opcional, todas as pastas): `~/.cursor/mcp.json` com o mesmo conteúdo.

**Não** coloque PAT, `BLOB_READ_WRITE_TOKEN` nem `PAYLOAD_SECRET` no `mcp.json`.

## 2. Autenticar no Cursor

1. **Settings → MCP** (ou Customize → MCP)
2. **Vercel** → se aparecer *Needs login*, clique e entre com a conta **`rmetiquetaseembalagens-9670`**
3. Na autorização, escolha o time **RM Embalagens e Etiquetas** (não só conta pessoal)
4. **GitHub** → *Needs login* → entre com **`dev-jose-roberto`** (membro da org `RM-Embalagens-e-Etiquetas`)
5. Reinicie o Cursor se algum servidor ficar em *loading*

### Como saber se deu certo

| Ferramenta | OK | Problema |
|---|---|---|
| Vercel `list_teams` | Mostra `rm-embalagens-e-etiquetas` | Lista vazia → conta/time errado |
| Vercel `get_project` | Retorna `rm-embalagens` | 403 → reconectar MCP no time |
| GitHub `get_me` | `dev-jose-roberto` | Timeout → reconectar GitHub MCP |
| GitHub org repo | Acessa `RM-Embalagens-e-Etiquetas/website` | 403 → PAT expirado ou org bloqueia token |

## 3. CLI (quando MCP falhar)

Vercel (já logado nesta máquina):

```bash
npx vercel whoami          # deve: rmetiquetaseembalagens-9670
npx vercel env ls
npx vercel logs rm-embalagens.vercel.app --since 1h
npx vercel env pull .env.vercel
npm run seed:prod          # Postgres + Blob
```

GitHub:

```bash
gh auth status
gh repo view RM-Embalagens-e-Etiquetas/website
```

## 4. Revogar PAT antigo (importante)

Se um Personal Access Token do GitHub chegou a ficar em `~/.cursor/mcp.json`, revogue em:
https://github.com/settings/tokens

Use OAuth do MCP daqui pra frente.
