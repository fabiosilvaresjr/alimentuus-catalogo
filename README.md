# Alimentuus - Sistema de Gestão de Catálogos

> **Status:** Backend Integrado (MySQL) | Próximo Passo: Upload de Imagens

## Sobre o Projeto
Sistema desenvolvido para a **Alimentuus** (Nutrição Animal) para gerenciar o portfólio de produtos e automatizar a criação de catálogos comerciais.

O projeto evoluiu de uma aplicação estática para um sistema **FullStack**, onde os dados são persistidos de forma segura em banco de dados relacional, garantindo integridade e gestão eficiente do estoque.

O sistema resolve o conflito entre dados técnicos e comerciais:
1.  **Visão Comercial:** Texto curto e vendedor para o catálogo impresso.
2.  **Visão Técnica:** Tabelas nutricionais detalhadas e fichas técnicas completas.

## Tecnologias

* **Node.js & Express:** Backend e API.
* **MySQL:** Banco de dados relacional para persistência dos produtos.
* **Handlebars:** Renderização de páginas dinâmicas (Server Side Rendering).
* **Bootstrap 5:** Interface responsiva.
* **Dotenv:** Segurança e gestão de variáveis de ambiente.

## Funcionalidades

- [x] **Persistência de Dados:** Conexão robusta com MySQL (CRUD).
- [x] **Cadastro Inteligente:** Formulário com separação de dados (Marketing vs Técnico).
- [x] **Gestão de Produtos:** Listagem dinâmica e função de **Excluir** itens do banco.
- [x] **Catálogo Digital:** Geração automática de layout otimizado para impressão (Grid 3 colunas).
- [x] **Segurança:** Credenciais protegidas via variáveis de ambiente (.env).
- [ ] **Upload de Imagens:** Gerenciamento de fotos reais (Em Breve).
- [ ] **Filtros Avançados:** Categorização por linha de produto (Em Breve).

## Como rodar o projeto

### Pré-requisitos
* Node.js instalado.
* MySQL Server rodando.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/alimentuus-catalogo.git](https://github.com/SEU-USUARIO/alimentuus-catalogo.git)
    cd alimentuus-catalogo
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    * Crie um banco de dados MySQL chamado `alimentuus`.
    * Crie a tabela `produtos` (Use o script SQL abaixo no seu cliente MySQL/DBeaver):
    ```sql
    CREATE TABLE produtos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        categoria VARCHAR(50),
        peso VARCHAR(50),
        preco DECIMAL(10, 2),
        descricao_curta TEXT,
        ficha_tecnica TEXT,
        imagem VARCHAR(255) DEFAULT 'placeholder.jpg'
    );
    ```

4.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Adicione suas credenciais do MySQL:
    ```env
    DB_HOST=127.0.0.1
    DB_USER=seu_usuario_mysql
    DB_PASS=sua_senha_mysql
    DB_NAME=alimentuus
    ```

5.  **Inicie o servidor:**
    ```bash
    npm start
    ```

6.  **Acesse:**
    * Abra `http://localhost:3000` no seu navegador.

---
Desenvolvido por **Fabio Almeida**
*Estudante de Análise e Desenvolvimento de Sistemas | Foco em Backend Node.js*