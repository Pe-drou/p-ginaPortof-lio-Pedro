// controle do menu hamburger

const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () =>{
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');

    // Bloqueia o scroll
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
})
// fechar o amburger
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', ()=> {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    })
})
// fechar ao rolar a página
window.addEventListener('scroll', ()=>{
    if(navList.classList.contains('open')){
        menuIcon.classList.remove('bx-x')
        navList.classList.remove('open')
        document.body.style.overflow = 'auto'
    }
})

// =========== Navegação ativa ==========

const navLinks = document.querySelectorAll('.navlist a');

// funfão para adicionar a classe 'active' no link clicado
function activeLink(){
    navLinks.forEach(item => item.classList.remove('active'))
    this.classList.add('active')
}

// adiciona um evento de clique no link de navegação
navLinks.forEach(item => item.addEventListener('click', activeLink))

// =====alter ao modo claro=====
function toggleMode(){
    const html = document.documentElement;
    html.classList.toggle('light')

    // salva o tema escolhido no localstorag
    const mode = html.classlist.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    // altera aparência do título
    updateTextColor();
}
// carregr o tema salvo no localstorage ao carregar a pagina
const savedTheme = localStorage.getItem('theme');
if(savedTheme){
    document.documentElement.classList.toggle('light', savedTheme === 'light')
}
// função que altera a cor do texto de acordo com o tema
function updateTextColor(){
    currentColor = document.documentElement
    .classList.contains('light') ? 'black' : "#fff";
    titleElement.style.color = currentColor
}

// === animação do título principal
// seleciona o elemento 'título' e define as variáveis para animação
const titleElement = document.querySelector('#name');
const text = "Pedro Henrique";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

// função para animar o texto
function animatedText(){
    if (isTyping) {
        if (index < text.length) {
            titleElement.textContent = text.slice(0, index +1); // adiciona uma letra ao título
            index ++;
        } else {
            isTyping = false; // alterna para o modo de apagamento
        }
    } else {
        if (index > 0) {
            titleElement.textContent = text.slice(0, index -1);
            index --
        } else {
            isTyping = true;
            // altera a cor de preto pa laranja
            currentColor = currentColor === (document.documentElement.classList.contains('light') ? 'black' : '#fff') ? '#2a4db7' : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
            titleElement.style.color = currentColor;
        }
    }
    setTimeout(animatedText, 200);
}
// inicia a animação quando carrega a página
document.addEventListener('DOMContentLoaded', animatedText);
updateTextColor();

// =====ANIMAÇÃO DA SEÇÃO HOME
// Seleciona a seção home e aplica uma animação de fade in
const homeSection = document.querySelector('#home');
homeSection.style.opacity = 0;
homeSection.style.transform = 'translateY(200px)';
homeSection.style.transition = 'opacity 1s ease, transform 1s ease';

setTimeout(()=> {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
})


// =========== Animação das seções
// selecoiona as animqções e aplica 'fade-in' ao atualizar
const sections = document.querySelectorAll('section')

sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s, transform 1s'

    if (index !== 0){
        if(index === 1){
            section.style.transform = 'translateY(100px)'
        } else if (index === 2) {
            section.style.transform = 'scale(0.8)'
        } else if (index === 3) {
            section.style.transform = 'rotateY(90deg)'
        }
    }   
})

// observer para animar as seções ao rolar a página
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry =>{
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'none'
        }
    })
})

// observa para cada seção
sections.forEach((section) => observer.observe(section))

// ========== BOTÃO DE VOLTAR AO TOPO =========
// adiciona um evento de clique ao botão de voltar ao topo
document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
})

// ========== CARROSSEL DE PROJETOS ==========
// seleciona os elementos do carrossel
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide')
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let autoSlideInterval;

// Função para exibir o slide atual
function showSlide(slideIndex) {
  slides.forEach(slide => {
    slide.classList.remove('active');
    slide.style.display = 'none';
  });

  // Ajusta o índice do slide para garantir que ele esteja dentro dos limites
  if (slideIndex < 0) currentSlide = slides.length - 1;
  else if (slideIndex >= slides.length) currentSlide = 0;
  else currentSlide = slideIndex;

  // Exibe o slide atual
  slides[currentSlide].classList.add('active');
  slides[currentSlide].style.display = 'flex';
  updateSlidePosition();
}

// função para atualizar a posição do carrossel
function updateSlidePosition(){
    const slideWidth = slides[0].offsetWidth;
    carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// função para avançar slide
function nextSlide(){
    showSlide(currentSlide+1);
    resetAutoSlide(); // reinicia o intervalo de transição automática
}

// função para voltar slide
function prevSlide(){
    showSlide(currentSlide-1);
    resetAutoSlide(); // reinicia o intervalo de transição automática
}

// função para iniciar a transição automática dos slides
function startAutoSlide(){
    autoSlideInterval = setInterval(nextSlide, 5000); // avança o slide a cada 5 segundos
}

// função para reiniciar a transição automática
function resetAutoSlide(){
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// adiciona eventos de clique aos botões de navegação do carrossel
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// inicia o carrossel ao carregar a página
window.addEventListener('load', () => {
    showSlide(currentSlide);
    startAutoSlide();

    // atualiza a posição do carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});

// pausa a transição automatica ao passar o mouse sobre o carrossel
carouselSlides.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);

// ========== FORMULÁRIO DE CONTATO ==========
// Seleciona o formulário de contato e a mensagem de agradecimento
const contactForm = document.getElementById('contactForm')
const thankYouMessage = document.getElementById('thankYouMessage')

// adiciona um evento de envio ao formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    thankYouMessage.style.display = 'block'

    // envia os dados do formulário usando fetch api
    const formData = new FormData(contactForm)
    fetch(contactForm.ariaDescription, {
        method: 'post',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if(response.ok) {
            setTimeout(() => window.location.reload(), 2000);
        } else {
            alert('Erro ao enviar formulário. Tente novamente.')
        }
    })
    .catch(() => alert('Erro na conexão. Tente novamente.'))
})

// ========== ANIMAÇÃO DA SEÇÃO "SOBRE MIM" ==========
// Seleciona a seção "sobre mim"
const aboutSection = document.querySelector('.about')

// função para verificar se a seção está visível na tela
function checkAboutVisibility() {
    const rect = aboutSection.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    // verifica se a seção está dentro da área visível da tela
    if(rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        aboutSection.classList.add('visible') // Adiciona a classe "visible"
        window.removeEventListener('scroll', checkAboutVisibility) // Remove o listener após a animação
    }
}

// adiciona um listener para o evento de scroll
window.addEventListener('scroll', checkAboutVisibility)

// verifica a visibilidade ao carregar a página (caso a seção já esteja visivel)
checkAboutVisibility()