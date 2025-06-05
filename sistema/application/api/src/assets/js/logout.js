//para usar quando tiver um botão para encerrar/sair da sessão/conta

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
    try {
        logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token"); // Remove o token
        window.location.href = "/login"; // Redireciona para a tela de login
    });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ message: 'Erro ao realizar o logout!', error: erro.messgae });
    }
  
}
