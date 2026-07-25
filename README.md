# 🔴 Pokédex - Next.js

Uma aplicação moderna e responsiva simulando uma Pokédex, construída com **Next.js** e inspirada no universo (anime) de Pokémon. Ela consome dados diretamente da [PokéAPI](https://pokeapi.co/) para exibir informações, tipos, habilidades e estatísticas de combate (Stats) dos Pokémons.

## ✨ Funcionalidades

- **Design Temático de Anime:** Interface moderna com toques que remetem à clássica Pokédex (Cores vibrantes, badges tipificados, luzes de sinalização).
- **Cartas Interativas:** Cartões dos Pokémons com design "Glassmorphism", animações suaves de _hover_ e visualização em grade.
- **Barra de Stats Inteligente:** Exibição do nível de força de cada atributo através de barras de progresso que mudam de cor conforme o valor.
- **Paginação (Catálogo Infinito):** Carregamento de Pokémons em lotes (20 por vez) com um botão dinâmico de "Carregar Mais", otimizando o tempo de carregamento da página.
- **Design Responsivo:** Totalmente otimizado para celulares, tablets e desktops utilizando Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** - Framework React (App Router)
- **[React](https://reactjs.org/)** - Biblioteca de Interfaces (Hooks, UseState, UseEffect, UseCallback)
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária avançada e responsividade
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[PokéAPI](https://pokeapi.co/)** - API REST para fornecimento dos dados dos Pokémons

## 🛠️ Como Executar o Projeto

Siga as instruções abaixo para rodar o projeto localmente na sua máquina:

### 1. Pré-requisitos
Você precisa ter o [Node.js](https://nodejs.org/) instalado.

### 2. Clonar / Baixar
Faça o download do código-fonte ou clone o repositório em sua máquina.

### 3. Instalar Dependências
Abra o terminal na pasta raiz do projeto e execute:
```bash
npm install
```

### 4. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto (se não existir) e configure a base da API:
```env
URL_BASE=https://pokeapi.co/api/v2
```

### 5. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação rodando!

---
*Feito com dedicação e estilo de mestre Pokémon!* 🧢⚡
