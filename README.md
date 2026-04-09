# Alimentuus – Sistema de Automação de Catálogos B2B

**Status:** Versão 1.1 em produção | Refatoração técnica em andamento (TypeScript)


## Sobre o Projeto

Sistema Full Stack desenvolvido para a **Alimentuus (Nutrição Animal)** com foco na automação da criação de catálogos comerciais digitais.

O sistema permite gerar catálogos **on‑demand** a partir de filtros por nome ou categoria, produzindo PDFs otimizados para impressão e uso comercial, reduzindo processos manuais e garantindo padronização visual para equipes de vendas.


## 🛠️ Stack Tecnológica

- **Node.js & Express** – Backend e rotas HTTP  
- **TypeScript** – Tipagem estática e contratos de dados (refatoração progressiva)  
- **MySQL** – Banco de dados relacional  
- **Multer** – Upload e gerenciamento de imagens  
- **Handlebars** – Server‑Side Rendering (SSR)  
- **Bootstrap 5 & CSS Print** – Interface responsiva e layouts A4 para impressão  


## Funcionalidades

- CRUD completo de produtos  
- Upload múltiplo de imagens  
- Busca e filtro por nome ou categoria  
- Geração de catálogo simples e detalhado em PDF  
- Proteções contra SQL Injection  
- Uso de variáveis de ambiente (.env)


## Evolução Técnica (TypeScript)

O projeto foi iniciado em **JavaScript** para validação rápida da regra de negócio.

A fase atual foca em:

- Criação de **interfaces de domínio**
- Tipagem de entradas (DTOs) e resultados de queries
- Maior previsibilidade, segurança e organização do backend


## Execução Local

```bash
git clone https://github.com/fabiosilvaresjr/alimentuus-catalogo.git
cd alimentuus-catalogo
npm install
npm start

Aplicação disponível em: http://localhost:3000

Autor: Fabio Almeida Desenvolvedor Backend | Node.js | TypeScript
LinkedIn: https://www.linkedin.com/in/fabiosilvaresjr/