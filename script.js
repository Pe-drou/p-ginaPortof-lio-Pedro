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
            currentColor = currentColor === (document.documentElement.classList.contains('light') ? 'black' : '#fff') ? '#c94c16' : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
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
const homeSection = document.querySelector