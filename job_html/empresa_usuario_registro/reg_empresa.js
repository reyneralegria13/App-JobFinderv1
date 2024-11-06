document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backButton");
    const cancelButton = document.getElementById("cancelButton");
    const form = document.getElementById("companyForm");

    // Função para voltar à página anterior
    const goBack = () => {
      window.history.back();
    };

    // Event listeners para os botões de voltar e cancelar
    backButton.addEventListener("click", goBack);
    cancelButton.addEventListener("click", goBack);

    // Prevenir envio do formulário e mostrar mensagem de sucesso
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Cadastro realizado com sucesso!");
      // Aqui você pode adicionar a lógica para enviar os dados do formulário
      window.location.href = "dashboard.html"; // Ajuste conforme necessário
    });

    // Formatação básica para o campo de CNPJ
    const cnpjInput = document.querySelector(
      'input[placeholder="XX.XXX.XXX/XXXX-XX"]'
    );
    cnpjInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length <= 14) {
        value = value.replace(/(\d{2})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
      }
      e.target.value = value;
    });

    // Formatação básica para o campo de telefone
    const phoneInput = document.querySelector(
      'input[placeholder="(XX) XXXXX-XXXX"]'
    );
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
      }
      e.target.value = value;
    });
  });