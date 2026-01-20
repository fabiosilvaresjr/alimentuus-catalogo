# Alimentuus - Sistema de Gestão de Catálogos

> **Status:** Filtros de Busca Implementados | Próximo Passo: Upload de Imagens

## Sobre o Projeto
Sistema FullStack desenvolvido para a **Alimentuus** (Nutrição Animal) para gerenciar o portfólio de produtos e automatizar a criação de catálogos comerciais personalizados.

O diferencial do sistema é a capacidade de gerar PDFs "on-demand" baseados na busca do usuário: se o vendedor filtra por "Equinos", o PDF gerado conterá apenas produtos dessa linha.

## Tecnologias

* **Node.js & Express:** Backend e API.
* **MySQL:** Banco de dados relacional (Persistência completa).
* **Handlebars:** Renderização com lógica de visualização (Server Side Rendering).
* **Bootstrap 5:** Interface administrativa responsiva e limpa.
* **CSS Print:** Motor de estilização vetorial para geração de PDFs.

## Funcionalidades Entregues

- [x] **CRUD Completo:** Criar, Ler, Atualizar e Excluir produtos do banco MySQL.
- [x] **Busca & Filtros:** Barra de pesquisa que filtra produtos por Nome ou Categoria (SQL `LIKE`).
- [x] **PDF Inteligente:** O botão de impressão respeita o filtro ativo na tela (WYSIWYG).
- [x] **UI Profissional:** Botões de ação (Detalhes, Editar, Excluir) otimizados e intuitivos.
- [x] **Segurança:** Variáveis de ambiente (.env) configuradas.

## Próximos Passos (Roadmap)

1.  **Upload de Imagens:** Implementar `Multer` para substituir os placeholders por fotos reais.
2.  **Identidade Visual:** Aplicar logo, paleta de cores e tipografia oficial da Alimentuus.
3.  **Deploy:** Subir a aplicação em ambiente de produção (Railway/Render).

## Como rodar o projeto

1.  **Clone e Instale:**
    ```bash
    git clone [https://github.com/fabiosilvaresjr/alimentuus-catalogo.git](https://github.com/fabiosilvaresjr/alimentuus-catalogo.git)
    npm install
    ```

2.  **Configure o MySQL (.env):**
    ```env
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASS=sua_senha
    DB_NAME=alimentuus
    ```

3.  **Rode o servidor:**
    ```bash
    npm start
    ```
    Acesse: `http://localhost:3000`

---
Desenvolvido por **Fabio Almeida**
*Estudante de Análise e Desenvolvimento de Sistemas | Foco em Backend Node.js*
[LinkedIn](https://www.linkedin.com/in/fabio-silvaresjunior)