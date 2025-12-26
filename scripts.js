const STORAGE_KEY = "usuarios";
const THEME_KEY = "preferenciaTema";

// -------------------- Tema --------------------
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("themeToggle");
  toggle.textContent = theme === "dark" ? "☀️ Modo claro" : "🌙 Modo escuro";
  localStorage.setItem(THEME_KEY, theme);
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved || "light");
}

// -------------------- CRUD --------------------
function getUsuarios() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
function setUsuarios(usuarios) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}
function listarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";
  getUsuarios().forEach((u, i) => {
    const li = document.createElement("li");
    li.textContent = `${u.nome} - ${u.email} - ${u.rua}, ${u.numero} - ${u.cidade}/${u.estado}`;
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    btnEdit.onclick = () => editarUsuario(i);
    const btnDel = document.createElement("button");
    btnDel.textContent = "Excluir";
    btnDel.onclick = () => excluirUsuario(i);
    li.appendChild(btnEdit);
    li.appendChild(btnDel);
    lista.appendChild(li);
  });
}
function salvarUsuario(usuario) {
  const usuarios = getUsuarios();
  usuarios.push(usuario);
  setUsuarios(usuarios);
  listarUsuarios();
}
function excluirUsuario(i) {
  const usuarios = getUsuarios();
  usuarios.splice(i, 1);
  setUsuarios(usuarios);
  listarUsuarios();
}
function editarUsuario(i) {
  const usuarios = getUsuarios();
  if (i < 0 || i >= usuarios.length) return;
  const u = usuarios[i];
  document.getElementById("nome").value = u.nome || "";
  document.getElementById("email").value = u.email || "";
  document.getElementById("cep").value = u.cep || "";
  document.getElementById("numero").value = u.numero || "";
  document.getElementById("rua").value = u.rua || "";
  document.getElementById("bairro").value = u.bairro || "";
  document.getElementById("cidade").value = u.cidade || "";
  document.getElementById("estado").value = u.estado || "";
  excluirUsuario(i); // remove o antigo, salva como novo ao enviar
}

// -------------------- Validações --------------------
function validarCampos(usuario) {
  let valido = true;
  const nomeEl = document.getElementById("erro-nome");
  const emailEl = document.getElementById("erro-email");
  const cepEl = document.getElementById("erro-cep");
  const numeroEl = document.getElementById("erro-numero");

  if (!usuario.nome) { nomeEl.textContent = "Nome obrigatório"; valido = false; } else { nomeEl.textContent = ""; }
  if (!usuario.email || !usuario.email.includes("@")) { emailEl.textContent = "Email inválido"; valido = false; } else { emailEl.textContent = ""; }
  if (!usuario.cep || usuario.cep.length !== 8) { cepEl.textContent = "CEP inválido"; valido = false; } else { cepEl.textContent = ""; }
  if (!usuario.numero) { numeroEl.textContent = "Número obrigatório"; valido = false; } else { numeroEl.textContent = ""; }
  return valido;
}

// -------------------- ViaCEP com debounce --------------------
let debounceTimer;
async function buscarEndereco(cep) {
  const statusEl = document.getElementById("cep-status");
  try {
    statusEl.textContent = "Consultando CEP...";
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (data.erro) { statusEl.textContent = "CEP não encontrado."; return; }
    document.getElementById("rua").value = data.logradouro || "";
    document.getElementById("bairro").value = data.bairro || "";
    document.getElementById("cidade").value = data.localidade || "";
    document.getElementById("estado").value = data.uf || "";
    statusEl.textContent = "Endereço preenchido.";
  } catch { statusEl.textContent = "Erro ao buscar CEP."; }
}
function debounceCEP(e) {
  clearTimeout(debounceTimer);
  const cep = e.target.value.replace(/\D/g, "");
  if (cep.length === 8) {
    debounceTimer = setTimeout(() => buscarEndereco(cep), 500);
  }
}

// -------------------- Exportar/Importar --------------------
function exportarJSON() {
  const data = JSON.stringify(getUsuarios(), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "usuarios.json";
  a.click();
  URL.revokeObjectURL(url);
}
function importarJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const usuarios = JSON.parse(e.target.result);
      if (!Array.isArray(usuarios)) throw new Error("Formato inválido");
      setUsuarios(usuarios);
      listarUsuarios();
    } catch { alert("Arquivo inválido"); }
  };
  reader.readAsText(file);
}

// -------------------- Inicialização --------------------
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.onclick = () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    };
  }

  listarUsuarios();

  const form = document.getElementById("cadastroForm");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const usuario = {
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim(),
        cep: document.getElementById("cep").value.replace(/\D/g, ""),
        numero: document.getElementById("numero").value.trim(),
        rua: document.getElementById("rua").value.trim(),
        bairro: document.getElementById("bairro").value.trim(),
        cidade: document.getElementById("cidade").value.trim(),
        estado: document.getElementById("estado").value.trim()
      };
      if (!validarCampos(usuario)) return;
      salvarUsuario(usuario);
      form.reset();
      const cepStatus = document.getElementById("cep-status"); if (cepStatus) cepStatus.textContent = "";
    };
  }

  const cepInput = document.getElementById("cep");
  if (cepInput) cepInput.addEventListener("input", debounceCEP);

  const importarInput = document.getElementById("importar");
  if (importarInput) importarInput.addEventListener("change", importarJSON);

  const exportBtn = document.getElementById("exportar");
  if (exportBtn) exportBtn.addEventListener("click", exportarJSON);
});