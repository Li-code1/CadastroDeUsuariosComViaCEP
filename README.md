
# 📋 Cadastro de Usuários com ViaCEP, Web Storage e CRUD Simples (com Número da Casa)

Aplicação web semântica, responsiva e acessível para **cadastro de usuários**.
Integra **ViaCEP** (Fetch API) para preenchimento de endereço pelo **CEP**, permite cadastrar **múltiplos usuários** (CRUD), oferece **modo claro/escuro** com persistência e inclui o campo **Número da casa** (informado manualmente).

---

## 🚀 Funcionalidades

- **Preenchimento de endereço pelo CEP (ViaCEP) com debounce** — logradouro, bairro, cidade e UF preenchidos automaticamente.
- **Número da casa** — informado manualmente pelo usuário.
- **CRUD completo (criar, listar, editar e excluir)** — editar preenche o formulário com os dados existentes para reenvio.
- **Exportar/Importar JSON** — exporte a lista como `usuarios.json` e importe arquivos JSON (array de usuários).
- **Persistência** — registros salvos em `localStorage` (`STORAGE_KEY = "usuarios"`).
- **Modo claro/escuro** — alternância com preferência salva (`THEME_KEY = "preferenciaTema"`).
- **Validações básicas** — campos obrigatórios e verificação simples de email/CEP.
- **Acessibilidade e responsivo** — HTML semântico, mensagens acessíveis e layout adaptado para mobile.

---

## 📂 Estrutura

```
/Projeto (pasta)
  ├── index.html      # Interface semântica, acessível e responsiva
  ├── scripts.js      # ViaCEP (debounce), CRUD com localStorage, validações, export/import, tema
  └── styles.css      # Estilos, variáveis de tema e responsividade
```

---

## 🖥️ Como usar

1. Abra `index.html` em um navegador moderno.
2. Preencha **Nome**, **Email**, **CEP** (8 dígitos) e **Número** (obrigatório).
   - Exemplo de CEP: `01001000` (somente números).
   - Ao inserir um CEP completo, o endereço é consultado após um curto debounce.
3. Clique em **Salvar** para adicionar ou atualizar um usuário (ao editar, o formulário é preenchido automaticamente).
4. Use **Excluir** para remover um registro.
5. Para exportar, clique em **Exportar** — um arquivo `usuarios.json` será gerado.
6. Para importar, selecione um arquivo JSON válido pelo campo **Importar** (deve conter um array de objetos de usuário).
7. Alterne o tema pelo botão **🌙/☀️**; a preferência é salva automaticamente.

> Observação: ao importar, o arquivo deve ser um array JSON; caso contrário, a importação é rejeitada.

---

## 🔧 Tecnologias

- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- **Fetch API** (ViaCEP)
- **Web Storage API** (`localStorage`)

---

## 🧪 Execução e desenvolvimento

- Esta é uma aplicação estática — basta abrir `index.html` no navegador.
- Para desenvolvimento, você também pode servir com um servidor estático (ex.: `npx http-server` ou `python -m http.server`).
- Testado em navegadores modernos com suporte a Fetch e ES6.

---

## ⚠️ Observações

- O **Número da casa** é obrigatório e não vem do ViaCEP.
- Não armazene dados sensíveis em `localStorage`.
- O import exige **JSON válido** (array de usuários).

---

## 📌 Changelog (breve)

- README atualizado para refletir recursos implementados: **edição**, **debounce** na busca de CEP, **exportar/importar** e melhorias de validação.

---

