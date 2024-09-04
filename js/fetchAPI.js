function showModal(message) {
  document.getElementById("modalMessage").textContent = message;
  var confirmationModal = new bootstrap.Modal(
    document.getElementById("confirmationModal")
  );
  confirmationModal.show();
}

function showLoadingModal() {
  var loadingModal = new bootstrap.Modal(
    document.getElementById("loadingModal")
  );
  loadingModal.show();
}

function hideLoadingModal() {
  var loadingModal = bootstrap.Modal.getInstance(
    document.getElementById("loadingModal")
  );
  if (loadingModal) {
    loadingModal.hide();
  }
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const zap = document.getElementById("zap").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const gasto = document.getElementById("gasto").value.trim();

    const economiaPorAnoText = document
      .getElementById("economia-anual")
      .textContent.replace("R$", "")
      .trim();
    const economiaPorMesText = document
      .getElementById("economia-mensal")
      .textContent.trim();

    const economiaPorAno = parseFloat(
      economiaPorAnoText.replace(/\./g, "").replace(",", ".")
    );
    const economiaPorMes = parseFloat(
      economiaPorMesText.replace(/\./g, "").replace(",", ".")
    );

    function validateForm() {
      if (!nome) {
        showModal("Por favor, insira seu nome.");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showModal("Por favor, insira um e-mail válido.");
        return false;
      }

      if (!zap) {
        showModal("Por favor, insira seu WhatsApp.");
        return false;
      }

      if (!mensagem) {
        showModal("Por favor, insira sua mensagem.");
        return false;
      }

      if (!gasto) {
        showModal("Por favor, insira um valor válido para o gasto mensal.");
        return false;
      }

      if (isNaN(economiaPorAno) || economiaPorAno <= 0) {
        showModal("Por favor, insira um valor válido para a economia anual.");
        return false;
      }

      if (isNaN(economiaPorMes) || economiaPorMes <= 0) {
        showModal("Por favor, insira um valor válido para a economia mensal.");
        return false;
      }

      return true;
    }

    if (!validateForm()) {
      return;
    }

    showLoadingModal(); // Mostrar modal de carregamento

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
        showModal("E-mail enviado com sucesso!");
        document.getElementById("contactForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        showModal("Ocorreu um erro ao enviar o e-mail.");
      })
      .finally(() => {
        hideLoadingModal(); // Ocultar modal de carregamento
      });
  });
