/**
 * Utilitários pequenos e sem estado, usados por vários módulos.
 */

const consultaMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
const consultaPonteiroFino = window.matchMedia('(hover: hover) and (pointer: fine)');

/** true se a pessoa pediu menos movimento no sistema. */
export const prefereMenosMovimento = () => consultaMovimento.matches;

/** true em telas com mouse/trackpad (hover real). */
export const temPonteiroFino = () => consultaPonteiroFino.matches;

/** Prende `valor` entre `min` e `max`. */
export const limitar = (valor, min, max) => Math.min(max, Math.max(min, valor));

/** Curva suave de 0 a 1 entre `borda0` e `borda1` (aceita borda0 > borda1 para inverter). */
export function suavizar(borda0, borda1, x) {
    const t = limitar((x - borda0) / (borda1 - borda0), 0, 1);
    return t * t * (3 - 2 * t);
}

/** Lê localStorage sem quebrar quando o armazenamento está bloqueado. */
export function lerArmazenado(chave) {
    try {
        return localStorage.getItem(chave);
    } catch {
        return null;
    }
}

/** Grava no localStorage sem quebrar quando o armazenamento está bloqueado. */
export function gravarArmazenado(chave, valor) {
    try {
        localStorage.setItem(chave, valor);
    } catch {
        // Sem persistência: a escolha vale só nesta visita.
    }
}

/**
 * Define --i (índice) em cada filho, usado pelo CSS para escalonar animações.
 * Feito via CSSOM porque a CSP do site bloqueia atributos style="" no HTML.
 */
export function indexarFilhos(elementos) {
    Array.from(elementos).forEach((el, i) => el.style.setProperty('--i', String(i)));
}

/** Troca {chaves} de um texto pelos valores informados. */
export const formatar = (texto, valores) =>
    texto.replace(/\{(\w+)\}/g, (_, chave) => (chave in valores ? String(valores[chave]) : `{${chave}}`));

/** Cria um <svg><use> apontando para um ícone do sprite. */
export function criarIcone(id, classe = 'icone') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', classe);
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `assets/icones.svg#${id}`);
    svg.append(use);
    return svg;
}

/** Atalho para criar elementos com classe e texto sem usar innerHTML. */
export function criarElemento(tag, { classe, texto, atributos } = {}) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    if (atributos) {
        Object.entries(atributos).forEach(([nome, valor]) => {
            if (valor !== null && valor !== undefined && valor !== false) el.setAttribute(nome, valor === true ? '' : valor);
        });
    }
    return el;
}
