document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Obtenção dos valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const zap = document.getElementById("zap").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const gasto = document.getElementById("gasto").value.trim();

    // Obtendo o texto dos elementos <p> e <span> para economia anual e mensal
    const economiaPorAnoText = document
      .getElementById("economia-anual")
      .textContent.replace("R$", "")
      .trim();
    const economiaPorMesText = document
      .getElementById("economia-mensal")
      .textContent.trim();

    // Convertendo o formato brasileiro para o formato numérico padrão
    const economiaPorAno = parseFloat(
      economiaPorAnoText.replace(/\./g, "").replace(",", ".")
    );
    const economiaPorMes = parseFloat(
      economiaPorMesText.replace(/\./g, "").replace(",", ".")
    );

    console.log("Economia por Ano:", economiaPorAno);
    console.log("Economia por Ano:", economiaPorMes);

    // Função de validação
    function validateForm() {
      if (!nome) {
        alert("Por favor, insira seu nome.");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return false;
      }

      if (!zap) {
        alert("Por favor, insira seu WhatsApp.");
        return false;
      }

      if (!mensagem) {
        alert("Por favor, insira sua mensagem.");
        return false;
      }

      if (!gasto) {
        alert("Por favor, insira um valor válido para o gasto mensal.");
        return false;
      }

      if (isNaN(economiaPorAno) || economiaPorAno <= 0) {
        alert("Por favor, insira um valor válido para a economia anual.");
        return false;
      }

      if (isNaN(economiaPorMes) || economiaPorMes <= 0) {
        alert("Por favor, insira um valor válido para a economia mensal.");
        return false;
      }

      return true;
    }

    // Se a validação falhar, interrompe o envio do formulário
    if (!validateForm()) {
      return;
    }

    // Se a validação passar, continue com o envio do formulário
    const formData = {
      nome,
      email,
      zap,
      mensagem,
      gasto,
      economiaPorAno,
      economiaPorMes,
    };

    fetch("https://nodemailer-e4rz.onrender.com/send-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert("E-mail enviado com sucesso!");

        // Limpar os campos do formulário após o envio
        document.getElementById("contactForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ocorreu um erro ao enviar o e-mail.");
      });
  });
