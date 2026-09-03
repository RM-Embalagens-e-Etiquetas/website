# Conteúdo do site

## Quem edita o quê

| Pessoa | Onde | Quando |
|---|---|---|
| Funcionária | `/admin` | Textos, fotos, produtos no dia a dia |
| Dev | `src/content/` no repo | Conteúdo em lote, novos produtos |

## Arquivos de conteúdo

```
src/content/
  groups.json
  categories.json
  globals/site.json, home.json, about.json, contact.json
  media.json
public/products/{slug}/   ← fotos dos produtos
```

## Sincronizar repo → produção

GitHub → **Actions** → **Sync CMS** → escolha o modo:

| Modo | Uso |
|---|---|
| `safe` | Padrão — não apaga edições da funcionária |
| `force` | Primeira vez ou reset total |
| `media` | Só reenvia fotos pro Blob |

Secrets: `PAYLOAD_SECRET`, `POSTGRES_URL`, `BLOB_READ_WRITE_TOKEN`
