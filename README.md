# Projeto Pagina de Cadastro

Este projeto foi desenvolvido com o objetivo de realizar o cadastro de informações a respeito de cidades e pessoas. Nesta primeira versão só é possível cadastrar dados simples como nome, email e telefone, mas as próximas versões contaram com endereço e dados mais sensíveis.

Desenvolvido em React com templete typescript, o projeto é robusto e escalável. Contando ainda com um protótipo de autenticação de usuário.

O BackEnd da aplicação ainda não foi totalmente implementado mas esta em andamento.

[Visitar site]()

### Lista com as funcionalidades:

- [x] Estrutura de pastas e componentização dos elementos;
- [x] Criação e implementação dos formulários;
- [x] Criação e implementação da barra de ferramentas;
- [x] Manipulação das informações do banco de dados via API;
- [x] Autenticação de usuário (teste);
- [x] Aplicar tema light/dark;

## 🔧 Instalação

Depois de clonar o repositório, instale as dependências rodando o seguinte comando no terminal:

```
npm install
```

Modifique o arquivo src/shared/environment/index.ts trocando a URL_BASE por:

```
http://localhost:3333
```

Modifique também o arquivo src\shared\services\api\pessoas\PessoasService.ts trocando o retorno de dados da função getAllPessoas() para:

```
data: data['data'],
totalCount: Number(data['data'].length),
```

Depois rode no terminal o comando:

```
npm run build
```

Inicie a aplicação rodando o comando:

```
npm start
```

Abra um novo terminal e execute o comando para iniciar o servidor JSON:

```
npm run mock
```

Após os servidores inicializarem:

Acesse: `http://localhost:3000` no browser da sua preferencia.

Teste a aplicação.

## 🛠️ Tecnologias & Libs

Ferramentas usadas para criar o projeto:

- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

E com as bibliotecas:

- [yup](https://www.npmjs.com/package/yup)
- [axios](https://axios-http.com/ptbr/docs/intro)
- [eslint](https://eslint.org/)
- [unform](https://github.com/unform/unform)
- [prettier](https://prettier.io/)
- [material UI](https://mui.com/material-ui/)
- [json-server](https://www.npmjs.com/package/json-server)
- [react-icons](https://react-icons.github)

## Próximos passos

- [ ] Busca personalizada e paginação;
- [ ] Reduzir o número de requisições ao banco de dados para melhorar a performance;
- [ ] Implementar a LGDP;
- [ ] Implementar o lazyload;

## ✒️ Autor

Projeto desenvolvido por:

- **[Eliel Silva](https://github.com/Eliel-Silva-dev)** - _Software Developer_
