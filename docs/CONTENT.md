# Conteúdo do site

## Quem edita o quê

| Camada | Onde | O quê |
|---|---|---|
| Funcionária | `/admin` | Catálogo, fotos, dados da empresa, config da home |
| Desenvolvedor | Código (`src/lib/copy.js`, componentes) | Estrutura do site, menu, títulos, SEO, layout |

## Dev local (automático)

```bash
npm run dev        # prep + seed se necessário + sobe em :3000
npm run verify     # E2E local completo (porta 3099)
npm run dev:reset  # recria SQLite + catálogo do zero
```

- **SQLite local** — ignora `POSTGRES_URL` do `.env.local` (Vercel) por padrão
- **Sem prompts** — schema antigo é detectado e o banco é recriado sozinho
- **Fotos no admin** — uploads vão para `media/` em dev (funcionária testa upload local)

Para apontar dev ao Neon (não recomendado): `RM_USE_POSTGRES_LOCAL=1`

## CMS (Payload)

```
Globals
  company       → logo, telefone, WhatsApp, Instagram, endereço, rodapé
  home-config   → seções on/off, ordem, destaques, fotos, diferenciais

Collections
  product-groups      → linhas (Sacolas, Etiquetas…)
  product-categories  → produtos + galeria
  media               → fotos
  users               → login
```

## Código (não vai pro admin)

```
src/lib/copy.js   → textos do site (menu, títulos, páginas Sobre/Contato, SEO)
```

## Bootstrap inicial (produção)

```bash
npm run seed
```

Requer `POSTGRES_URL` + `BLOB_READ_WRITE_TOKEN`.

## Dia a dia

| Ação | Como |
|---|---|
| Editar produtos/fotos/contatos | Funcionária no `/admin` |
| Mudar estrutura do site | Push no `main` → Vercel deploya |
| Validar antes de push | `npm run verify` |
