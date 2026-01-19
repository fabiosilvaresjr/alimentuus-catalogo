# Alimentuus - Gerenciador de Catálogo Digital

> **Status:** Frontend e Gerador de PDF Prontos | Próximo Passo: Banco de Dados MySQL

## Sobre o Projeto
Sistema desenvolvido para a **Alimentuus** (Nutrição Animal) para unificar fichas técnicas e gerar catálogos comerciais em PDF automaticamente.

O sistema resolve o problema de **descrições técnicas complexas** separando o conteúdo em:
1.  **Visão Comercial:** Texto curto e vendedor para o catálogo impresso.
2.  **Visão Técnica:** Tabelas nutricionais detalhadas acessíveis via QR Code/Link.

## Tecnologias

* **Node.js & Express:** Servidor Web.
* **Handlebars:** Renderização de páginas (SSR).
* **Bootstrap 5:** Interface responsiva e moderna.
* **CSS Print:** Estilização específica para geração de PDF limpo (vetorial).

## Funcionalidades Entregues

- [x] **Cadastro Inteligente:** Formulário com separação de dados (Marketing vs Técnico).
- [x] **Catálogo Digital:** Visualização em Grid (3 colunas) otimizada para impressão.
- [x] **Ficha Técnica:** Página de detalhes com formatação automática de tabelas copiadas de PDF.
- [x] **UX/UI:** Botões de ação rápida, feedbacks visuais e design "Clean" para o setor Agro.
- [ ] **Banco de Dados:** Integração com MySQL (Em breve).
- [ ] **Upload de Imagens:** Gerenciamento de fotos reais (Em breve).

## Como rodar o projeto

1.  Clone o repositório:
    git clone [https://github.com/SEU-USUARIO/alimentuus-catalogo.git](https://github.com/SEU-USUARIO/alimentuus-catalogo.git)
    
2.  Instale as dependências:
    npm install
    
3.  Inicie o servidor:
    npm start
    
4.  Acesse:
    * **Painel:** `http://localhost:3000`
    * **Visualização PDF:** Clique no botão "Visualizar PDF" na Home.

---
Desenvolvido por **Fabio Almeida** 
*Estudante de Análise e Desenvolvimento de Sistemas | Foco em Backend Node.js*