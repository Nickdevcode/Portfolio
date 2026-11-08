/**
 * INTERNACIONALIZAÇÃO (PT/EN)
 * Troca em tempo real todos os textos marcados com data-i18n, data-i18n-html
 * e data-i18n-attr. A escolha fica salva e o <html lang> é atualizado.
 * Módulos que geram conteúdo por JS escutam o evento "idioma:alterado".
 */
import { traducoes, textosProjetos } from './dados/traducoes.js';
import { lerArmazenado, gravarArmazenado, formatar } from './utilitarios.js';

const IDIOMAS = ['pt', 'en'];
const PADRAO = 'pt';
const CHAVE_ARMAZENADA = 'idioma';

let idiomaAtual = PADRAO;

/**
 * Idioma inicial, nesta ordem: escolha salva, idioma do navegador, português.
 * @returns {'pt'|'en'}
 */
function detectarIdioma() {
    const salvo = lerArmazenado(CHAVE_ARMAZENADA);
    if (IDIOMAS.includes(salvo)) return salvo;
    const navegador = (navigator.language || PADRAO).toLowerCase();
    return navegador.startsWith('en') ? 'en' : PADRAO;
}

/** Idioma ativo. */
export const idioma = () => idiomaAtual;

/**
 * Tradução de uma chave no idioma ativo, com fallback para PT e depois a própria chave.
 * @param {string} chave
 * @param {Record<string, string|number>} [valores] substitui {marcadores} no texto
 */
export function t(chave, valores) {
    const texto = traducoes[idiomaAtual]?.[chave] ?? traducoes[PADRAO][chave] ?? chave;
    return valores ? formatar(texto, valores) : texto;
}

/** Textos de um projeto (título, resumo, descrição) no idioma ativo. */
export const textoProjeto = (id) => textosProjetos[idiomaAtual]?.[id] ?? textosProjetos[PADRAO][id];

/** Aplica o idioma em toda a página e avisa os outros módulos. */
export function aplicarIdioma(novo) {
    idiomaAtual = IDIOMAS.includes(novo) ? novo : PADRAO;
    const raiz = document.documentElement;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });

    // Só textos fixos do dicionário (nunca entrada de usuário) passam por aqui
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        el.dataset.i18nAttr.split(',').forEach((par) => {
            const [atributo, chave] = par.split(':').map((parte) => parte.trim());
            if (atributo && chave) el.setAttribute(atributo, t(chave));
        });
    });

    raiz.lang = idiomaAtual === 'en' ? 'en' : 'pt-BR';
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.descricao'));

    document.querySelectorAll('.idioma-opcao').forEach((opcao) => {
        opcao.classList.toggle('ativo', opcao.dataset.lang === idiomaAtual);
    });

    gravarArmazenado(CHAVE_ARMAZENADA, idiomaAtual);
    document.dispatchEvent(new CustomEvent('idioma:alterado', { detail: { idioma: idiomaAtual } }));
}

export function iniciarI18n() {
    document.querySelectorAll('[data-alternar-idioma]').forEach((botao) => {
        botao.addEventListener('click', () => aplicarIdioma(idiomaAtual === 'pt' ? 'en' : 'pt'));
    });
    aplicarIdioma(detectarIdioma());
}
