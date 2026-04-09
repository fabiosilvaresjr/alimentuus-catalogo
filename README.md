# Alimentuus – Sistema de Automação de Catálogos B2B

**Status:** Versão 1.0 em produção | Refatoração técnica em andamento (TypeScript)

## Sobre o Projeto
Sistema Full Stack desenvolvido para a **Alimentuus (Nutrição Animal)** com foco na automação da criação de catálogos comerciais digitais.

O sistema permite gerar catálogos **on‑demand** a partir de filtros por categoria ou produto, produzindo PDFs otimizados para impressão e uso comercial, reduzindo processos manuais e padronizando materiais de vendas.

## Stack Tecnológica
- **Node.js & Express** – Backend e rotas HTTP  
- **TypeScript** – Tipagem estática e contratos de dados (em implementação progressiva)  
- **MySQL** – Persistência de dados relacional  
- **Multer** – Upload e gerenciamento de imagens  
- **Handlebars** – Server‑Side Rendering (SSR)  
- **Bootstrap 5 & CSS Print** – Interface responsiva e layouts A4  

## Funcionalidades
- CRUD completo de produtos
- Upload múltiplo de imagens
- Busca e filtro por nome ou categoria
- Geração de catálogo simples e detalhado em PDF
- Proteções básicas contra SQL Injection
- Uso de variáveis de ambiente (.env)

## Evolução Técnica (TypeScript)
O projeto foi iniciado em JavaScript para validação rápida da regra de negócio.
A fase atual foca em:
- Criação de **interfaces de domínio**
- Tipagem de entradas (DTOs) e resultados de queries
- Maior segurança e previsibilidade no backend

## Execução local
```bash
git clone https://github.com/fabiosilvaresjr/alimentuus-catalogo.git
cd alimentuus-catalogo
npm install
npm start

## Execução local
Aplicação disponível em:
http://localhost:3000

Autor: Fabio Almeida
Desenvolvedor Backend | Node.js | TypeScript
LinkedIn: https://www.linkedin.com/in/fabiosilvaresjr/