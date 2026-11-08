/**
 * CONTATO
 * Botão de copiar e-mail com feedback visual e anúncio para leitor de tela.
 * Se a API de área de transferência falhar (HTTP sem TLS, permissão negada),
 * o endereço fica selecionado para a pessoa copiar na mão.
 */
import { t } from './i18n.js';

const TEMPO_FEEDBACK = 2200;

function selecionarTexto(elemento) {
    const intervalo = document.createRange();
    intervalo.selectNodeContents(elemento);
    const selecao = window.getSelection();
    selecao?.removeAllRanges();
    selecao?.addRange(intervalo);
}

export function iniciarContato() {
    const botao = document.getElementById('copiar-email');
    const endereco = document.getElementById('email-endereco');
    const anuncio = document.getElementById('anuncio-copia');
    const ano = document.getElementById('ano-atual');

    if (ano) ano.textContent = String(new Date().getFullYear());
    if (!botao || !endereco) return;

    const texto = botao.querySelector('.botao-copiar-texto');
    let temporizador = 0;

    botao.addEventListener('click', async () => {
        const email = botao.dataset.email;
        try {
            if (!navigator.clipboard) throw new Error('Clipboard API indisponível');
            await navigator.clipboard.writeText(email);

            botao.classList.add('copiado');
            if (texto) texto.textContent = t('contato.copiado');
            if (anuncio) anuncio.textContent = t('contato.anuncioCopiado');

            window.clearTimeout(temporizador);
            temporizador = window.setTimeout(() => {
                botao.classList.remove('copiado');
                if (texto) texto.textContent = t('contato.copiar');
                if (anuncio) anuncio.textContent = '';
            }, TEMPO_FEEDBACK);
        } catch {
            selecionarTexto(endereco);
            if (anuncio) anuncio.textContent = t('contato.falhaCopiar');
        }
    });
}
