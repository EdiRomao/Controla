 const loader = document.getElementById("loader");

  // Mostrar o loader quando clicar em qualquer link
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      const target = this.getAttribute("target");

      // Evita mostrar loader em links externos ou que abrem nova aba
      if (target === "_blank" || this.href.startsWith("mailto:")) return;

      loader.style.display = "block";
    });
  });

  // Esconde o loader quando a página terminar de carregar
  window.addEventListener("load", () => {
    loader.style.display = "none";
  });

  const loadingTexts = [
    'Carregando...',
    'Inicializando sistema...',
    'Conectando...',
    'Preparando interface...',
    'Quase pronto...'
];

let currentTextIndex = 0;

function updateLoadingText() {
    const textElement = document.getElementById('loadingText');
    textElement.style.opacity = '0';
    
    setTimeout(() => {
        currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
        textElement.textContent = loadingTexts[currentTextIndex];
        textElement.style.opacity = '1';
    }, 300);
}

// Atualiza o texto de carregamento a cada 2 segundos
setInterval(updateLoadingText, 2000);

function simulateLoading() {
    const loader = document.getElementById('loader');
    const button = document.querySelector('.demo-button');
    
    // Esconde o botão durante o carregamento
    button.style.opacity = '0';
    button.style.pointerEvents = 'none';
    
    // Remove a classe loaded se existir
    loader.classList.remove('loaded');
    
    // Simula carregamento por 4 segundos
    setTimeout(() => {
        loader.classList.add('loaded');
        
        // Mostra o botão novamente após a animação
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
            loader.classList.remove('loaded');
        }, 1000);
    }, 4000);
}