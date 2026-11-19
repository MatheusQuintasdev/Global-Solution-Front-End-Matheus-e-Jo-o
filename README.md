# CidadeAtiva - Global Solution 2026/2

Projeto acadêmico de **Front-End Design Engineering (FIAP)** para a Global Solution 2026/2, tema **CitizenTech**.

## Objetivo

O CidadeAtiva é uma SPA para cadastro e consulta de problemas urbanos, como buracos, iluminação pública, enchentes, lixo e acessibilidade. O projeto propõe organizar a participação cidadã e se relaciona principalmente ao **ODS 11 - Cidades e comunidades sustentáveis**.

> **Atenção:** trata-se de um protótipo acadêmico e não de um canal oficial da prefeitura.

## Tecnologias

- React 18, Vite e TypeScript
- Tailwind CSS
- React Router DOM
- Fetch API nativa (sem Axios)
- Lucide React para ícones
- Vercel para hospedagem do front-end
- API REST Java desenvolvida na disciplina de Domain Driven Design Using Java

## Funcionalidades

- Home: apresentação e acesso às principais funcionalidades.
- Sobre: problema, solução e impacto esperado.
- Integrantes: equipe e RMs.
- FAQ: perguntas frequentes com acordeão interativo.
- Contato: formulário demonstrativo com validação (não envia mensagens).
- Ocorrências: GET real, busca local e filtro de categorias.
- Nova ocorrência: formulário validado e POST real.
- Detalhe da ocorrência: rota dinâmica `/ocorrencias/:id` com GET real.
- Layout responsivo, navegação mobile e mensagens de carregamento, erro e vazio.

## Estrutura

```text
src/
  components/    Componentes compartilhados (Header, Footer, Layout, Feedback, Cards)
  data/          Dados de identificação dos integrantes
  pages/         Páginas e rotas da aplicação
  services/      Funções Fetch de integração com a API Java
  types/         Interfaces e tipos TypeScript
  utils/         Funções de apresentação de categorias e datas
  App.tsx        Definição das rotas
  main.tsx       Inicialização React
  index.css      Diretivas do Tailwind e estilos compartilhados
```

## Como executar

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Antes de testar a integração, edite `.env` para inserir a **URL real da API Java publicada**. O endereço mostrado em `.env.example` é apenas um marcador e não é uma API funcional.

### Build de produção

```bash
npm run build
npm run preview
```

## Contrato da API Java

Consulte `CONTRATO_API_JAVA.md` com as rotas e os campos esperados. O front-end só atende completamente ao critério de integração quando a equipe Java disponibilizar o serviço remoto e os fluxos GET e POST forem testados.

**API Java:** PENDENTE - substituir pela URL pública real do backend.

## Deploy na Vercel

1. Envie este projeto para um repositório público do GitHub.
2. Importe o repositório na Vercel usando preset Vite.
3. Configure `VITE_API_URL` com a URL real e `VITE_API_OCORRENCIAS_PATH` com a rota correta.
4. Faça o deploy e teste a Home, as rotas internas e os fluxos GET/POST.
5. Confirme configuração CORS na API Java.

O arquivo `vercel.json` já contém o rewrite para suportar acesso direto às rotas SPA.

**Link do repositório GitHub:** PENDENTE - inserir URL real.

**Link do front-end na Vercel:** PENDENTE - inserir URL real.

**Link do vídeo YouTube (máximo 3 minutos):** PENDENTE - inserir URL real.

**Contato da equipe:** PENDENTE - informar canal institucional de contato, se utilizado.

## Integrantes

| Integrante | RM |
| --- | --- |
| João Arthur Maia Almeida | 573458 |
| Matheus Nogueira Quintas | 572542 |
| Thiago Dias Gomes | 569675 |
| Lucas José Paolillo Vasconcelos | 565561 |
| Guilherme Ribeiro | 573890 |

Turma: **PENDENTE - confirmar identificação exata da turma.**

## Versionamento

O enunciado exige um **mínimo de 15 commits no total e cinco commits por integrante**. Se todos os cinco alunos constarem como integrantes, a equipe deve organizar pelo menos 25 commits, incluindo contribuições reais e identificadas de cada participante. O guia PDF distribui os 16 commits principais de front-end entre Matheus e João, mas **não substitui a exigência dos outros três integrantes**.

## Vídeo e apresentação

Gravar vídeo de até 3 minutos, mostrando páginas, navegação, responsividade e a API real. A apresentação presencial está prevista para 23 a 27/11, com participação oral de todos os membros.

## Uso de IA

Ferramentas de IA foram utilizadas como apoio na elaboração inicial e na revisão do front-end. A equipe deve revisar, testar e compreender todo o código antes da entrega e descrever fielmente o uso de IA conforme as orientações da FIAP.

## Checklist de entrega

- [ ] URL pública da API Java configurada e acessível
- [ ] GET, POST e detalhe testados com dados reais
- [ ] CORS liberado para o domínio Vercel
- [ ] Rotas e formulários testados em mobile, tablet e desktop
- [ ] Repositório público e participações reais dos cinco integrantes
- [ ] URLs finais inseridas neste README
- [ ] Vídeo publicado com até 3 minutos
- [ ] ZIP com menos de 50 MB, sem `node_modules` ou `.env`
- [ ] Entrega no Portal FIAP até 19/11/2026, às 23h55
