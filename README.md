 # GitHub Explorer

O GitHub Explorer é uma aplicação web que desenvolvi para pesquisar usuários do GitHub e visualizar seus repositórios públicos. O projeto utiliza a API REST do GitHub, sem precisar de um backend próprio.

# Funcionalidades

- Pesquisa de usuários pelo nome de usuário do GitHub.
- Exibição do perfil com avatar, nome, bio, localização, seguidores, seguindo e quantidade de repositórios públicos.
- Listagem de repositórios com descrição, linguagem, estrelas, forks e data da última atualização, além de um link para acessar cada repositório no GitHub.
- Busca de repositórios por nome, filtro por linguagem e ordenação por nome, estrelas ou data de atualização, em ordem crescente ou decrescente.
- Paginação com 10 repositórios por página.
- Tratamento dos estados de carregamento, resultados vazios e erros, como usuário não encontrado, limite de requisições atingido ou falha de conexão.
- Opção de tentar novamente quando ocorre um erro que permite uma nova tentativa.
- Armazenamento do último usuário pesquisado usando `localStorage`.
- Interface responsiva para celular, tablet e desktop, com atenção à acessibilidade, incluindo HTML semântico, rótulos e navegação por teclado.

# Tecnologias utilizadas

- React
- Vite
- TypeScript
- SCSS com CSS Modules

# Como executar o projeto

**Pré-requisito:** Node.js 18 ou superior.

```bash
git clone https://github.com/joaopedroborda/github-explorer.git
cd github-explorer
npm install
npm run dev
```

Outros comandos disponíveis:

```bash
npm run build    
npm run preview  
```

## Estrutura do projeto

```text
src/
  api/          # Comunicação com a API do GitHub
  components/   # Componentes da interface e seus estilos
  hooks/        # Hooks para buscar usuários e filtrar repositórios
  styles/       # Estilos globais, variáveis e mixins
  types/        # Tipos dos dados recebidos da API
  utils/        # Funções de filtro, ordenação, paginação e storage
```

## Decisões técnicas

- **Filtros no cliente:** os repositórios são carregados uma vez, com limite de até 100 por usuário. A busca por nome, o filtro por linguagem, a ordenação e a paginação são feitos no próprio navegador, sem precisar fazer novas requisições a cada alteração dos filtros.

- **Limite de requisições:** a API pública do GitHub permite até 60 requisições por hora sem autenticação. Para evitar chamadas desnecessárias, a pesquisa é realizada somente quando o formulário é enviado. Caso o limite seja atingido, a aplicação informa o usuário.

- **Controle de requisições:** quando uma nova pesquisa é feita antes de a anterior terminar, as respostas antigas são descartadas para evitar que dados desatualizados apareçam na tela.

- **Separação de responsabilidades:** as chamadas à API ficam em `api/`, os hooks cuidam dos dados e dos estados da aplicação, as funções de `utils/` concentram a lógica reutilizável e os componentes ficam responsáveis pela interface.

## Limitações

- A aplicação carrega no máximo 100 repositórios por usuário. Portanto, usuários com mais repositórios podem ter resultados que não aparecem na listagem.
- Como não há backend nem autenticação, a aplicação depende dos limites e da disponibilidade da API pública do GitHub.
