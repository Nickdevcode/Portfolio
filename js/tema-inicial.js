/**
 * Roda de forma síncrona no <head>, antes da primeira pintura.
 * Define o tema (claro/escuro) e marca o <html> com a classe "js",
 * que libera os estados iniciais das animações no CSS. Sem JS, nada
 * fica escondido e o tema segue o prefers-color-scheme do sistema.
 *
 * Fica num arquivo próprio (e não inline) para funcionar com a CSP
 * "script-src 'self'" do vercel.json.
 */
(function () {
    var raiz = document.documentElement;
    raiz.classList.add('js');

    var tema = null;
    try {
        var salvo = localStorage.getItem('tema');
        if (salvo === 'claro' || salvo === 'escuro') {
            tema = salvo;
        }
    } catch (erro) {
        // Armazenamento bloqueado (aba anônima, cookies desligados): segue o sistema.
    }

    if (!tema) {
        tema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
    }
    raiz.setAttribute('data-tema', tema);
})();
