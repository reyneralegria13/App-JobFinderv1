//para usar quando tiver um botão para encerrar/sair da sessão/conta

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token"); // Remove o token
    window.location.href = "/login"; // Redireciona para a tela de login
  });
}
