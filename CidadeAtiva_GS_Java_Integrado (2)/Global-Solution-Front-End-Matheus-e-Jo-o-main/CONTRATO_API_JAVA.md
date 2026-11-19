# Integração real com a API Java do CidadeAtiva

A API Java recebida neste trabalho expõe os recursos diretamente em `/ocorrencias`, `/categorias`, `/bairros` e `/cidadaos` (sem prefixo `/api`).

O front-end faz requisições HTTP reais para a API configurada em `VITE_API_URL`, por padrão `https://cidadeativa-api-gs2026.onrender.com` conforme o README da equipe Java.

## Operações utilizadas

- `GET /ocorrencias`, `GET /ocorrencias/{id}`: listagem e detalhes
- `GET /categorias`, `GET /bairros`, `GET /cidadaos`: opções reais do banco
- `POST /cidadaos`, `POST /bairros`: criação opcional antes de enviar uma ocorrência
- `POST /ocorrencias`: cadastro de ocorrência

Exemplo do corpo POST enviado à API:

```json
{
  "cidadaoId": 1,
  "bairroId": 1,
  "categoriaId": 1,
  "descricao": "Poste apagado — A luz está desligada há muitos dias.",
  "endereco": "Rua Exemplo, 100",
  "prioridade": 3
}
```

A API não tem campo de título separado: o front-end inclui o título no início de `descricao`, separado por ` — `, e o recupera ao listar. Ocorrências criadas fora do site mostram os primeiros 70 caracteres como título. Status reais: `PENDENTE`, `EM_ANALISE` e `RESOLVIDA`.

**Importante:** é necessário ter categorias cadastradas previamente. O front-end não usa mocks nem altera dados automaticamente ao abrir uma página. O CORS do back-end precisa permitir o domínio exato do front-end implantado na Vercel por meio da variável `CORS_ORIGINS`.
