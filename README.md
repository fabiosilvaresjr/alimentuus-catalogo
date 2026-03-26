# Alimentuus - Sistema de Gestão de Catálogos B2B

**Status:** Versão 1.0 Concluída | Em refatoração para TypeScript

## Sobre o Projeto
Sistema FullStack desenvolvido para a **Alimentuus** (Nutrição Animal) com o objetivo de digitalizar o portfólio de produtos e automatizar a criação de catálogos comerciais personalizados. 

O diferencial arquitetural do sistema é a capacidade de gerar PDFs "on-demand" baseados em regras de negócio e buscas do usuário: se o vendedor filtra por "Equinos", o motor de renderização gera um documento formatado para impressão contendo apenas essa linha, economizando tempo e padronizando o material de vendas.

## 🛠️ Tecnologias Utilizadas
* **Node.js & Express:** Backend e roteamento da API.
* **TypeScript (Em migração):** Tipagem estática, Interfaces e segurança em tempo de compilação.
* **MySQL:** Banco de dados relacional (Persistência completa).
* **Multer:** Middleware para upload e gerenciamento de múltiplas imagens locais.
* **Handlebars:** Renderização dinâmica de HTML (Server-Side Rendering).
* **Bootstrap 5 & CSS Print:** Interface responsiva e motor de estilização vetorial avançado para geração perfeita de PDFs.

## Funcionalidades Entregues (Versão 1.0)
* **CRUD Completo & Blindado:** Criação, leitura, edição e exclusão de produtos com travas de validação no Front-end (UX) e no Back-end (Node.js) para garantir a integridade do banco.
* **Upload Múltiplo de Imagens:** Suporte para upload simultâneo da foto do produto e da tabela nutricional (níveis de garantia).
* **Motor de Impressão Dinâmico:** * Catálogo Simples: Layout em grid adaptado para folha A4 em retrato, exibindo resumo de múltiplos produtos em colunas perfeitamente alinhadas.
  * Catálogo Detalhado: Layout com quebra de página automatizada, renderizando a ficha técnica completa e imagens de garantia de cada produto individualmente.
* **Busca & Filtros:** Barra de pesquisa em tempo real (SQL LIKE).
* **Segurança:** Variáveis de ambiente (.env) e proteção contra SQL Injection.

## Roadmap e Evolução Técnica: A Era TypeScript
O projeto nasceu como um MVP (Produto Mínimo Viável) em **JavaScript puro** para validar a regra de negócio e entregar valor rápido ao cliente. 

Com a Versão 1.0 homologada, o foco atual é a **Refatoração para TypeScript**. O objetivo dessa migração é:
1. Adicionar **Interfaces** claras para a entidade Produto, espelhando o banco de dados.
2. Prevenir erros de tempo de execução e garantir previsibilidade no tráfego de dados.
3. Elevar o nível de escalabilidade e manutenção do código para padrões corporativos.

## Como rodar o projeto localmente

1. Clone e Instale as dependências:
git clone https://github.com/fabiosilvaresjr/alimentuus-catalogo.git
cd alimentuus-catalogo
npm install

2. Instale as dependências do TypeScript (Ambiente Dev):
npm install typescript @types/node @types/express @types/multer ts-node-dev --save-dev

3. Configure o Banco de Dados:
Crie um banco chamado "alimentuus" no MySQL.
Certifique-se de que a tabela "produtos" possui as colunas "imagem" e "imagem_garantia" (VARCHAR 255).
Renomeie o arquivo .env.example para .env (ou crie um novo) e preencha:
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=alimentuus

4. Rode o servidor:
npm start

Acesse: http://localhost:3000

---
**Desenvolvido por Fabio Almeida** Estudante de Análise e Desenvolvimento de Sistemas | Focado na construção de sistemas escaláveis e soluções B2B.
🔗 Conecte-se comigo no LinkedIn: https://www.linkedin.com/in/fabiosilvaresjr/
