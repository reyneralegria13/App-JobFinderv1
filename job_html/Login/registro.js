document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", () => {
    document
      .querySelectorAll(".option")
      .forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");

    document.getElementById("botaovoltar").onclick = function () {
      window.location.href = "../login.html";
    };
  });
});

document.getElementById("register-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const userType = document.querySelector('input[name="user-type"]:checked').value;

  if (userType === "candidate") {
    window.location.href = "../empresa_usuario_registro/reg_candidato.html";
  } else if (userType === "employer") {
    window.location.href = "../empresa_usuario_registro/reg_empresa.html";
  }
});