/**
 * INTRO DO HERO
 * A tinta preta do nome sobe linha por linha e a laranja assenta depois,
 * como a segunda passada de uma impressão. Roda assim que o JS carrega,
 * sem esperar o retrato: o texto não pode ficar refém de uma imagem.
 */
import { indexarFilhos } from './utilitarios.js';

const DURACAO_TOTAL_INTRO = 2000; // ms: atraso da tinta laranja + duração da transição

export function iniciarHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // índice por linha alimenta o atraso em cascata no CSS
    indexarFilhos(hero.querySelectorAll('.nome-camada--tinta .linha-texto'));
    hero.classList.add('animando');

    // dois quadros: garante que o estado inicial (letras abaixo) foi pintado antes da transição
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            hero.classList.add('pronto');
            window.setTimeout(() => hero.classList.remove('animando'), DURACAO_TOTAL_INTRO);
        });
    });
}
