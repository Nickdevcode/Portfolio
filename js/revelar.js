/**
 * REVELAÇÃO AO ROLAR
 * Elementos com [data-revelar] ganham .visivel quando entram na tela
 * (o CSS cuida da animação). [data-revelar-filhos] escalona os filhos.
 * Cada elemento anima uma vez só e depois deixa de ser observado.
 */
import { indexarFilhos, prefereMenosMovimento } from './utilitarios.js';

let observador = null;

/** Passa a observar elementos novos (ex.: cards criados depois de um filtro). */
export function observar(elementos) {
    const lista = Array.from(elementos);
    if (!observador || prefereMenosMovimento()) {
        lista.forEach((el) => el.classList.add('visivel'));
        return;
    }
    lista.forEach((el) => observador.observe(el));
}

export function iniciarRevelar() {
    document.querySelectorAll('[data-revelar-filhos]').forEach((pai) => {
        indexarFilhos(pai.querySelectorAll(':scope > [data-revelar]'));
    });

    if ('IntersectionObserver' in window) {
        // Só agora o CSS passa a esconder os elementos: se este módulo
        // não carregar, nada fica invisível.
        document.documentElement.classList.add('revelar-ativo');
        observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (!entrada.isIntersecting) return;
                    entrada.target.classList.add('visivel');
                    observador.unobserve(entrada.target);
                });
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
        );
    }

    observar(document.querySelectorAll('[data-revelar]'));
}
