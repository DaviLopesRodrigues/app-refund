# 📊 Sistema de Reembolsos Interativo com JavaScript e JSON Server

Aplicação Web desenvolvida para registrar, listar e excluir solicitações de reembolso de forma simples, rápida e responsiva. Os dados são armazenados em uma **API** utilizando o `json-server`.

---

## 🚀 Funcionalidades

- ✅ Cadastro de novos reembolsos com:
  - Nome do item
  - Categoria
  - Valor formatado em R$
- 📄 Listagem dinâmica dos reembolsos cadastrados
- ❌ Exclusão de reembolsos com confirmação
- 💬 Feedback visual com `SweetAlert2`
- 📦 Dados persistidos via `axios` com API local (`json-server`)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**, **CSS3** e **JavaScript (ES6+)**
- **axios** – Requisições HTTP
- **SweetAlert2** – Alertas e toasts personalizados
- **json-server** – Simulação de uma API REST

---

## 🧠 Conceitos Aplicados

### 🔁 JavaScript Moderno

- Desestruturação de objetos e arrays
- Arrow functions
- Operações com `map`, `forEach`, `find` para manipulação de Array
- Template literals
- `async/await` + `try/catch`

### 📁 Organização em Módulos

- `refund.js`: Classe `Refund` responsável pela lógica de criação, listagem e exclusão dos reembolsos
- `formattedAmount.js`: Funções auxiliares para formatação de valores monetários
- `alert.js`: Classe `Alerts` com métodos para toasts e pop-ups de confirmação
- `main.js`: Script principal que controla os eventos da interface e manipulação dos dados

### 🌐 Integração com API (json-server)

- `GET`: Listar todos os reembolsos
- `POST`: Cadastrar um novo reembolso
- `DELETE`: Excluir reembolso por ID

---

### 🌱 Versionamento de Código (Git e GitHub)

- Utilização de **Git** para controle de versão
- Criação e organização de **branches**:
  - `main`: branch principal de produção
  - `develop`: branch de desenvolvimento
- Commits semânticos e frequentes
- Integração com repositório remoto no **GitHub**
- Boas práticas de versionamento e fluxo de trabalho em equipe

---

## 🧪 Como Rodar o Projeto Localmente

- Certifique-se de ter o Node.js instalado

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Instalar depedências
   ```bash
   npm install
   ```
3. Iniciar API na porta 3333 (json-server)
   ```bash
   npm run server
   ```
4. Abrir index.html no navegador (Live Server)
