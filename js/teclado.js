/**
 * TECLADO DE SKILLS
 * - Clique/toque: a tecla ganha .apertada enquanto estiver pressionada (o
 *   :active do CSS é instável no toque, principalmente no iOS), com um tempo
 *   mínimo pra dar a sensação de clique.
 * - Teclado físico: com a seção visível, apertar uma letra afunda as teclas
 *   cujo nome começa com ela (J → JavaScript e Java). Segurar mantém afundada.
 */
const TEMPO_MINIMO_APERTADA = 110;

/** Não sequestra digitação em campos nem atalhos do navegador. */
function deveIgnorar(evento) {
    if (evento.ctrlKey || evento.metaKey || evento.altKey) return true;
    if (evento.key.length !== 1) return true;
    const alvo = evento.target;
    if (alvo instanceof HTMLElement && (alvo.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(alvo.tagName))) return true;
    // modal ou menu aberto: o foco está em outro lugar
    return Boolean(document.querySelector('dialog[open]'));
}

export function iniciarTeclado() {
    const teclas = Array.from(document.querySelectorAll('.teclado .tecla:not(.tecla--mod)'));
    if (teclas.length === 0) return;

    // ---------- Clique e toque ----------
    teclas.forEach((tecla) => {
        let inicio = 0;
        const soltar = () => {
            const restante = Math.max(0, TEMPO_MINIMO_APERTADA - (performance.now() - inicio));
            window.setTimeout(() => tecla.classList.remove('apertada'), restante);
        };
        tecla.addEventListener('pointerdown', () => {
            inicio = performance.now();
            tecla.classList.add('apertada');
        });
        tecla.addEventListener('pointerup', soltar);
        tecla.addEventListener('pointerleave', soltar);
        tecla.addEventListener('pointercancel', soltar);
    });

    // ---------- Teclado físico ----------
    // Índice letra → teclas, pela primeira letra do rótulo visível
    const porLetra = new Map();
    teclas.forEach((tecla) => {
        const letra = tecla.textContent.trim().charAt(0).toLowerCase();
        if (!letra) return;
        if (!porLetra.has(letra)) porLetra.set(letra, []);
        porLetra.get(letra).push(tecla);
    });

    const secao = document.getElementById('skills');
    let secaoVisivel = false;
    if (secao && 'IntersectionObserver' in window) {
        new IntersectionObserver(([entrada]) => {
            secaoVisivel = entrada.isIntersecting;
        }, { threshold: 0.25 }).observe(secao);
    }

    document.addEventListener('keydown', (evento) => {
        if (!secaoVisivel || deveIgnorar(evento)) return;
        porLetra.get(evento.key.toLowerCase())?.forEach((tecla) => tecla.classList.add('apertada'));
    });

    document.addEventListener('keyup', (evento) => {
        if (evento.key.length !== 1) return;
        porLetra.get(evento.key.toLowerCase())?.forEach((tecla) => tecla.classList.remove('apertada'));
    });

    // Se a janela perde o foco com tecla segurada, o keyup nunca chega
    window.addEventListener('blur', () => teclas.forEach((tecla) => tecla.classList.remove('apertada')));
}
