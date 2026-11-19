# Contrato esperado da API Java

O professor exige integração verdadeira com a API da disciplina de Java. Este projeto **não usa mocks**.

## Configuração

Copie `.env.example` para `.env` e ajuste:

```env
VITE_API_URL=https://URL-REAL-DO-BACKEND
VITE_API_OCORRENCIAS_PATH=/api/ocorrencias
```

A API deve permitir a origem do site Vercel e do localhost via CORS.

## Endpoints esperados (ajustar em conjunto com a equipe Java)

- `GET /api/ocorrencias`: retorna um array JSON de ocorrências.
- `GET /api/ocorrencias/{id}`: retorna uma ocorrência JSON.
- `POST /api/ocorrencias`: recebe uma nova ocorrência e retorna a ocorrência criada com ID.

Exemplo de POST:

```json
{
  "titulo": "Poste apagado na rua",
  "descricao": "O poste próximo da esquina está apagado há vários dias.",
  "categoria": "ILUMINACAO",
  "endereco": "Rua Exemplo, 100",
  "bairro": "Vila Mariana",
  "cidade": "São Paulo"
}
```

Formato esperado nas respostas:

```json
{
  "id": 1,
  "titulo": "Poste apagado na rua",
  "descricao": "O poste próximo da esquina está apagado há vários dias.",
  "categoria": "ILUMINACAO",
  "status": "ABERTA",
  "endereco": "Rua Exemplo, 100",
  "bairro": "Vila Mariana",
  "cidade": "São Paulo",
  "dataCriacao": "2026-11-11T10:00:00"
}
```

Categorias previstas: `BURACO`, `ILUMINACAO`, `LIXO`, `ENCHENTE`, `ACESSIBILIDADE`, `OUTROS`.

Status previstos: `ABERTA`, `EM_ANDAMENTO`, `RESOLVIDA`.

**Importante:** se o backend usa nomes, endpoints, enums ou um formato de paginação diferente, adaptar `src/services/ocorrenciasService.ts` e `src/types/ocorrencia.ts`. Enquanto isso não ocorrer, os resultados reais não podem ser considerados validados.
