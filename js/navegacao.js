/**
 * NAVEGAÇÃO
 * - Cabeçalho ganha borda depois de rolar (IntersectionObserver numa sentinela).
 * - Link da seção visível fica ativo e a pílula desliza até ele.
 * - Menu do celular em <dialog> nativo.
 * - Menu "Baixar CV" (disclosure acessível).
 * A rolagem até as âncoras é feita pelo próprio CSS (scroll-behavior + scroll-margin).
 */
import { indexarFilhos } from './utilitarios.js';

function observarRolagemDoCabecalho() {
    const cabecalho = document.getElementById('cabecalho');
    const sentinela = document.querySelector('.sentinela-topo');
    if (!cabecalho || !sentinela) return;

    new IntersectionObserver(([entrada]) => {
        cabecalho.toggleAttribute('data-rolado', !entrada.isIntersecting);
    }).observe(sentinela);
}

function observarSecaoAtiva() {
    const nav = document.querySelector('.nav');
    const indicador = document.querySelector('.nav-indicador');
    const links = Array.from(document.querySelectorAll('.nav-link'));
    if (!nav || !indicador || links.length === 0) return;

    let linkAtivo = null;

    const posicionarIndicador = () => {
        if (!linkAtivo) {
            indicador.removeAttribute('data-ativo');
            return;
        }
        indicador.style.setProperty('--ind-x', `${linkAtivo.offsetLeft}px`);
        indicador.style.setProperty('--ind-largura', `${linkAtivo.offsetWidth}px`);
        indicador.setAttribute('data-ativo', '');
    };

    const ativar = (idSecao) => {
        links.forEach((link) => {
            const ativo = link.dataset.secao === idSecao;
            if (ativo) {
                link.setAttribute('aria-current', 'true');
                linkAtivo = link;
            } else {
                link.removeAttribute('aria-current');
            }
        });
        posicionarIndicador();
    };

    // Uma seção é "a atual" quando cruza a faixa central da tela
    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) ativar(entrada.target.id);
            });
        },
        { rootMargin: '-45% 0px -50% 0px' }
    );

    links.forEach((link) => {
        const secao = document.getElementById(link.dataset.secao);
        if (secao) observador.observe(secao);
    });

    // Larguras dos links mudam com idioma, fonte carregada e tamanho da tela
    document.addEventListener('idioma:alterado', () => requestAnimationFrame(posicionarIndicador));
    document.fonts?.ready.then(posicionarIndicador);
    new ResizeObserver(posicionarIndicador).observe(nav);
}

function iniciarMenuMovel() {
    const menu = document.getElementById('menu-movel');
    const abrir = document.getElementById('abrir-menu');
    if (!menu || !abrir || typeof menu.showModal !== 'function') return;

    indexarFilhos(menu.querySelectorAll('.menu-movel-lista li'));

    const fechar = () => {
        if (menu.open) menu.close();
    };

    abrir.addEventListener('click', () => {
        menu.showModal();
        abrir.setAttribute('aria-expanded', 'true');
    });
    menu.addEventListener('close', () => {
        abrir.setAttribute('aria-expanded', 'false');
        document.documentElement.style.removeProperty('overflow');
    });
    menu.addEventListener('toggle', () => {
        // trava a rolagem do fundo enquanto o menu está aberto
        if (menu.open) document.documentElement.style.setProperty('overflow', 'hidden');
    });
    menu.querySelector('[data-fechar-menu]')?.addEventListener('click', fechar);

    // Fecha ao escolher um destino; a âncora segue normalmente
    menu.querySelectorAll('.menu-movel-lista a').forEach((link) => link.addEventListener('click', fechar));

    // Se a tela crescer com o menu aberto (girar o tablet), fecha
    window.matchMedia('(min-width: 961px)').addEventListener('change', (evento) => {
        if (evento.matches) fechar();
    });
}

function iniciarMenuCv() {
    document.querySelectorAll('[data-menu-cv]').forEach((menu) => {
        const botao = menu.querySelector('[data-menu-cv-botao]');
        const lista = menu.querySelector('.menu-cv-lista');
        if (!botao || !lista) return;

        const abrirOuFechar = (abrir) => {
            botao.setAttribute('aria-expanded', String(abrir));
            lista.hidden = !abrir;
        };

        botao.addEventListener('click', () => {
            const abrir = botao.getAttribute('aria-expanded') !== 'true';
            abrirOuFechar(abrir);
            if (abrir) lista.querySelector('a')?.focus();
        });

        menu.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape' && !lista.hidden) {
                abrirOuFechar(false);
                botao.focus();
            }
        });

        // Clique fora ou foco saindo do menu fecha
        document.addEventListener('click', (evento) => {
            if (!menu.contains(evento.target)) abrirOuFechar(false);
        });
        menu.addEventListener('focusout', (evento) => {
            if (evento.relatedTarget && !menu.contains(evento.relatedTarget)) abrirOuFechar(false);
        });
        lista.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => abrirOuFechar(false)));
    });
}

export function iniciarNavegacao() {
    observarRolagemDoCabecalho();
    observarSecaoAtiva();
    iniciarMenuMovel();
    iniciarMenuCv();
}
