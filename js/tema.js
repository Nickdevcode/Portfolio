/**
 * TEMA CLARO/ESCURO
 * O tema inicial já foi aplicado por tema-inicial.js (antes da pintura).
 * Aqui só cuidamos do botão, da persistência e de seguir o sistema
 * enquanto a pessoa não escolheu um tema manualmente.
 */
import { t } from './i18n.js';
import { lerArmazenado, gravarArmazenado } from './utilitarios.js';

const CHAVE_ARMAZENADA = 'tema';
const raiz = document.documentElement;

export const temaAtual = () => (raiz.dataset.tema === 'escuro' ? 'escuro' : 'claro');

function atualizarRotulos() {
    const rotulo = temaAtual() === 'escuro' ? t('tema.paraClaro') : t('tema.paraEscuro');
    document.querySelectorAll('[data-alternar-tema]').forEach((botao) => botao.setAttribute('aria-label', rotulo));
}

function definirTema(tema, { salvar }) {
    raiz.dataset.tema = tema;
    if (salvar) gravarArmazenado(CHAVE_ARMAZENADA, tema);
    atualizarRotulos();
    document.dispatchEvent(new CustomEvent('tema:alterado', { detail: { tema } }));
}

export function iniciarTema() {
    document.querySelectorAll('[data-alternar-tema]').forEach((botao) => {
        botao.addEventListener('click', () => {
            definirTema(temaAtual() === 'escuro' ? 'claro' : 'escuro', { salvar: true });
        });
    });

    // Sem escolha salva, acompanha a troca de tema do sistema em tempo real
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (evento) => {
        if (!lerArmazenado(CHAVE_ARMAZENADA)) {
            definirTema(evento.matches ? 'escuro' : 'claro', { salvar: false });
        }
    });

    document.addEventListener('idioma:alterado', atualizarRotulos);
    atualizarRotulos();
}
