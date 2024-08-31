function calcularEconomia() {
  console.log("calcularEconomia chamado");

  // Obtém o valor do gasto mensal do input
  let gastoMensal = document.getElementById("gasto").value;

  // Remove "R$ " e formata o valor para um número
  gastoMensal = gastoMensal
    .replace("R$ ", "")
    .replace(/\./g, "")
    .replace(",", ".");
  gastoMensal = parseFloat(gastoMensal);

  if (isNaN(gastoMensal)) {
    gastoMensal = 0;
  }

  // Calcula o desconto de 35% nos valores mensal e anual
  const desconto = 0.35;
  let economiaMensal = gastoMensal * desconto;
  let economiaAnual = economiaMensal * 12;

  // Atualiza o conteúdo dos elementos com os valores formatados
  document.getElementById("economia-anual").textContent =
    "R$ " +
    economiaAnual
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  document.getElementById("economia-mensal").textContent = economiaMensal
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatarMoeda(input) {
  let valor = input.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  if (valor.length > 11) {
    valor = valor.slice(0, 11); // Limita o comprimento máximo a 11 dígitos
  }

  // Adiciona a vírgula para separar os centavos
  valor = valor.replace(/(\d{1,2})$/, ",$1");

  // Adiciona os pontos para separar os milhar
  valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  // Preenche o campo de entrada com o valor formatado
  input.value = valor ? `R$ ${valor}` : "";
}
