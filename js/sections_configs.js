function updateCarouselImages() {
  const img2 = document.getElementById("carouselImage2");
  const img3 = document.getElementById("carouselImage3");

  if (window.innerWidth >= 1280) {
    img2.src = "img/carrossel2.png"; // Caminho da imagem para 1280px ou maior
    img3.src = "img/carrossel3.png"; // Caminho da imagem para 1280px ou maior
  } else {
    img2.src = "img/fundo-limpo.png"; // Caminho da imagem padrão
    img3.src = "img/fundo-limpo.png"; // Caminho da imagem padrão
  }
}

// Executa a função no carregamento da página e ao redimensionar a janela
window.addEventListener("load", updateCarouselImages);
window.addEventListener("resize", updateCarouselImages);
