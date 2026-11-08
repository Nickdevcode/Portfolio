/**
 * PROJETOS
 * - Renderiza os 3 primeiros do filtro como destaques (com vídeo) e o resto
 *   como índice. Re-renderiza ao trocar filtro ou idioma.
 * - Vídeos dos destaques só carregam/tocam quando aparecem na tela.
 * - No índice, uma prévia acompanha o cursor (só em telas com mouse).
 * - Modal com navegação anterior/próximo (botões e setas do teclado).
 */
import { projetos } from './dados/projetos.js';
import { t, textoProjeto } from './i18n.js';
import { observar } from './revelar.js';
import {
    criarElemento,
    criarIcone,
    limitar,
    prefereMenosMovimento,
    temPonteiroFino
} from './utilitarios.js';

const QUANTIDADE_DESTAQUES = 3;
const CLASSES_DESTAQUE = ['destaque--principal', 'destaque--a', 'destaque--b'];

let filtroAtivo = 'todos';
let listaAtual = [];
let indiceModal = -1;
let observadorVideos = null;

const elementos = {};

/** Projetos do filtro ativo, na ordem de relevância do catálogo. */
const filtrar = (filtro) => (filtro === 'todos' ? projetos : projetos.filter((p) => p.categoria === filtro));

/* ---------------------------------------------------------------------------
   Peças compartilhadas
   ------------------------------------------------------------------------ */

function criarTags(tecnologias) {
    const lista = criarElemento('ul', { classe: 'tags' });
    tecnologias.forEach((tec) => lista.append(criarElemento('li', { classe: 'tag', texto: tec })));
    return lista;
}

function criarMeta(projeto) {
    const meta = criarElemento('p', { classe: 'projeto-meta' });
    meta.append(criarElemento('span', { texto: t(`portfolio.categoria.${projeto.categoria}`) }));
    if (projeto.site) meta.append(criarElemento('span', { classe: 'ao-vivo', texto: t('portfolio.aoVivo') }));
    return meta;
}

/** Link externo com seta ↗; `icone` opcional à esquerda (ex.: logo do GitHub). */
function criarLinkExterno(href, rotulo, icone = null) {
    const link = criarElemento('a', {
        classe: 'link-seta',
        atributos: { href, target: '_blank', rel: 'noopener noreferrer' }
    });
    if (icone) link.append(criarIcone(icone));
    link.append(criarElemento('span', { texto: rotulo }), criarIcone('seta-diagonal'));
    return link;
}

/* ---------------------------------------------------------------------------
   Destaques
   ------------------------------------------------------------------------ */

function criarMidiaDestaque(projeto) {
    const moldura = criarElemento('div', { classe: 'destaque-midia' });
    const { titulo } = textoProjeto(projeto.id);

    if (projeto.previa) {
        // preload="none" + src só quando aparecer: nada de baixar vídeo fora da tela
        const video = criarElemento('video', {
            atributos: {
                muted: true,
                loop: true,
                playsinline: true,
                preload: 'none',
                poster: projeto.capa,
                width: 960,
                height: 540,
                'aria-hidden': 'true',
                'data-src': projeto.previa
            }
        });
        video.muted = true; // o atributo sozinho não basta para o autoplay em alguns navegadores
        moldura.append(video);
        observadorVideos?.observe(video);
    } else {
        moldura.append(
            criarElemento('img', {
                atributos: { src: projeto.capa, alt: titulo, width: 960, height: 540, loading: 'lazy', decoding: 'async' }
            })
        );
    }

    const abrir = criarElemento('span', { classe: 'destaque-abrir', atributos: { 'aria-hidden': 'true' } });
    abrir.append(criarIcone('seta-diagonal'));
    moldura.append(abrir);
    return moldura;
}

function criarDestaque(projeto, posicao) {
    const { titulo, resumo } = textoProjeto(projeto.id);
    const artigo = criarElemento('article', {
        classe: `destaque ${CLASSES_DESTAQUE[posicao]}`,
        atributos: { 'data-revelar': true }
    });

    const info = criarElemento('div', { classe: 'destaque-info' });
    const tituloEl = criarElemento('h3', { classe: 'destaque-titulo' });
    const botao = criarElemento('button', {
        texto: titulo,
        atributos: { type: 'button', 'aria-label': t('portfolio.abrir', { titulo }) }
    });
    botao.addEventListener('click', () => abrirModal(projeto.id));
    tituloEl.append(botao);

    const links = criarElemento('div', { classe: 'destaque-links' });
    if (projeto.site) links.append(criarLinkExterno(projeto.site, t('portfolio.site')));
    links.append(criarLinkExterno(projeto.repositorio, t('portfolio.codigo'), 'github'));

    info.append(criarMeta(projeto), tituloEl, criarElemento('p', { classe: 'destaque-resumo', texto: resumo }), criarTags(projeto.tecnologias), links);
    artigo.append(criarMidiaDestaque(projeto), info);
    return artigo;
}

/* ---------------------------------------------------------------------------
   Índice
   ------------------------------------------------------------------------ */

function criarItemIndice(projeto) {
    const { titulo, resumo } = textoProjeto(projeto.id);
    const item = criarElemento('li', { atributos: { 'data-revelar': true } });
    const botao = criarElemento('button', {
        classe: 'indice-item',
        atributos: { type: 'button', 'data-id': projeto.id, 'aria-label': t('portfolio.abrir', { titulo }) }
    });

    const seta = criarElemento('span', { classe: 'indice-seta', atributos: { 'aria-hidden': 'true' } });
    seta.append(criarIcone('seta-diagonal'));

    botao.append(
        criarElemento('img', {
            classe: 'indice-thumb',
            atributos: { src: projeto.capa, alt: '', width: 960, height: 540, loading: 'lazy', decoding: 'async' }
        }),
        criarElemento('span', { classe: 'indice-titulo', texto: titulo }),
        criarElemento('span', { classe: 'indice-resumo', texto: resumo }),
        criarElemento('span', { classe: 'indice-categoria', texto: t(`portfolio.categoria.${projeto.categoria}`) }),
        seta
    );
    botao.addEventListener('click', () => abrirModal(projeto.id));
    botao.addEventListener('pointerenter', () => trocarPrevia(projeto));
    botao.addEventListener('focus', () => trocarPrevia(projeto));
    item.append(botao);
    return item;
}

/* ---------------------------------------------------------------------------
   Render + filtro
   ------------------------------------------------------------------------ */

/**
 * @param {{ revelarAoRolar?: boolean }} [opcoes] só a primeira render anima ao rolar;
 *   trocas de filtro/idioma aparecem direto (o cross-fade fica com a View Transition).
 */
function renderizar({ revelarAoRolar = false } = {}) {
    listaAtual = filtrar(filtroAtivo);
    const { destaques, indice } = elementos;

    destaques.querySelectorAll('video').forEach((video) => observadorVideos?.unobserve(video));
    destaques.replaceChildren();
    indice.replaceChildren();

    if (listaAtual.length === 0) {
        destaques.append(criarElemento('p', { classe: 'projetos-vazio', texto: t('portfolio.vazio') }));
    }

    listaAtual.slice(0, QUANTIDADE_DESTAQUES).forEach((projeto, i) => destaques.append(criarDestaque(projeto, i)));
    listaAtual.slice(QUANTIDADE_DESTAQUES).forEach((projeto) => indice.append(criarItemIndice(projeto)));

    const novos = [...destaques.querySelectorAll('[data-revelar]'), ...indice.querySelectorAll('[data-revelar]')];
    if (revelarAoRolar) {
        observar(novos);
    } else {
        novos.forEach((el) => el.classList.add('visivel'));
    }
}

function aplicarFiltro(filtro, botao) {
    if (filtro === filtroAtivo) return;
    filtroAtivo = filtro;
    elementos.filtros.forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));

    // View Transitions faz o cross-fade da lista onde o navegador suporta
    if (document.startViewTransition && !prefereMenosMovimento()) {
        document.startViewTransition(renderizar);
    } else {
        renderizar();
    }

    elementos.anuncio.textContent = t('portfolio.filtro.anuncio', { n: listaAtual.length, filtro: botao.textContent.trim() });
}

/* ---------------------------------------------------------------------------
   Vídeos dos destaques: carregam e tocam só quando visíveis
   ------------------------------------------------------------------------ */

function criarObservadorVideos() {
    if (!('IntersectionObserver' in window)) return null;
    const economizarDados = navigator.connection?.saveData === true;

    return new IntersectionObserver(
        (entradas) => {
            entradas.forEach(({ target: video, isIntersecting }) => {
                if (isIntersecting) {
                    // Movimento reduzido ou economia de dados: fica no pôster
                    if (prefereMenosMovimento() || economizarDados) return;
                    if (!video.src) video.src = video.dataset.src;
                    video.play().catch(() => {
                        /* autoplay bloqueado: o pôster continua visível */
                    });
                } else if (!video.paused) {
                    video.pause();
                }
            });
        },
        { threshold: 0.35 }
    );
}

/* ---------------------------------------------------------------------------
   Prévia flutuante do índice
   ------------------------------------------------------------------------ */

const previa = { el: null, img: null, alvo: { x: 0, y: 0 }, pos: { x: 0, y: 0 }, ativa: false, rodando: false };

function trocarPrevia(projeto) {
    if (!previa.el) return;
    if (!previa.img) {
        previa.img = criarElemento('img', { atributos: { alt: '', width: 960, height: 540, decoding: 'async' } });
        previa.el.append(previa.img);
    }
    if (previa.img.getAttribute('src') !== projeto.capa) previa.img.src = projeto.capa;
}

function animarPrevia() {
    const { el, alvo, pos } = previa;
    const anteriorX = pos.x;
    pos.x += (alvo.x - pos.x) * 0.16;
    pos.y += (alvo.y - pos.y) * 0.16;
    // inclina na direção do movimento, como um papel arrastado
    const inclinacao = limitar((pos.x - anteriorX) * 0.35, -9, 9);
    el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${inclinacao}deg)`;

    const parado = Math.abs(alvo.x - pos.x) < 0.2 && Math.abs(alvo.y - pos.y) < 0.2;
    if (previa.ativa || !parado) {
        requestAnimationFrame(animarPrevia);
    } else {
        previa.rodando = false;
    }
}

function iniciarPrevia() {
    previa.el = document.querySelector('.previa-flutuante');
    const indice = elementos.indice;
    if (!previa.el || !indice) return;

    indice.addEventListener('pointermove', (evento) => {
        if (!temPonteiroFino() || prefereMenosMovimento()) return;
        previa.alvo.x = evento.clientX;
        previa.alvo.y = evento.clientY;
        if (!previa.ativa) {
            // aparece já no cursor, sem atravessar a tela
            previa.pos.x = evento.clientX;
            previa.pos.y = evento.clientY;
            previa.ativa = true;
            previa.el.classList.add('ativa');
        }
        if (!previa.rodando) {
            previa.rodando = true;
            requestAnimationFrame(animarPrevia);
        }
    });

    indice.addEventListener('pointerleave', () => {
        previa.ativa = false;
        previa.el.classList.remove('ativa');
    });
}

/* ---------------------------------------------------------------------------
   Modal
   ------------------------------------------------------------------------ */

function preencherModal(projeto) {
    const { titulo, descricao } = textoProjeto(projeto.id);
    const { modal } = elementos;
    const posicao = t('portfolio.modal.posicao', { atual: indiceModal + 1, total: listaAtual.length });

    modal.querySelector('#modal-categoria').textContent = `${t(`portfolio.categoria.${projeto.categoria}`)}  /  ${posicao}`;
    modal.querySelector('#modal-titulo').textContent = titulo;
    modal.querySelector('#modal-descricao').textContent = descricao;

    const tags = modal.querySelector('#modal-tags');
    tags.replaceChildren(...Array.from(criarTags(projeto.tecnologias).children));

    const midia = modal.querySelector('#modal-midia');
    midia.querySelector('video')?.pause();
    if (projeto.completo.tipo === 'video') {
        const video = criarElemento('video', {
            atributos: {
                src: projeto.completo.src,
                poster: projeto.capa,
                controls: true,
                muted: true,
                playsinline: true,
                preload: 'metadata',
                autoplay: !prefereMenosMovimento(),
                loop: true,
                'aria-label': titulo
            }
        });
        video.muted = true;
        midia.replaceChildren(video);
    } else {
        midia.replaceChildren(criarElemento('img', { atributos: { src: projeto.completo.src, alt: titulo, decoding: 'async' } }));
    }

    const acoes = modal.querySelector('#modal-acoes');
    acoes.replaceChildren();
    if (projeto.site) {
        const site = criarElemento('a', {
            classe: 'botao botao--primario',
            atributos: { href: projeto.site, target: '_blank', rel: 'noopener noreferrer' }
        });
        site.append(criarElemento('span', { texto: t('portfolio.modal.verSite') }), criarIcone('seta-diagonal'));
        acoes.append(site);
    }
    const codigo = criarElemento('a', {
        classe: `botao ${projeto.site ? 'botao--contorno' : 'botao--primario'}`,
        atributos: { href: projeto.repositorio, target: '_blank', rel: 'noopener noreferrer' }
    });
    codigo.append(criarIcone('github'), criarElemento('span', { texto: t('portfolio.modal.verCodigo') }));
    acoes.append(codigo);

    // volta a rolagem interna pro topo ao trocar de projeto
    modal.querySelector('.modal-caixa').scrollTop = 0;
}

function abrirModal(id) {
    indiceModal = listaAtual.findIndex((p) => p.id === id);
    if (indiceModal < 0) return;
    preencherModal(listaAtual[indiceModal]);
    if (!elementos.modal.open) {
        elementos.modal.showModal();
        document.documentElement.style.setProperty('overflow', 'hidden');
    }
}

function navegarModal(passo) {
    if (listaAtual.length === 0) return;
    indiceModal = (indiceModal + passo + listaAtual.length) % listaAtual.length;
    preencherModal(listaAtual[indiceModal]);
}

function iniciarModal() {
    const { modal } = elementos;
    if (!modal || typeof modal.showModal !== 'function') return;

    modal.querySelector('[data-modal-fechar]').addEventListener('click', () => modal.close());
    modal.querySelector('[data-modal-anterior]').addEventListener('click', () => navegarModal(-1));
    modal.querySelector('[data-modal-proximo]').addEventListener('click', () => navegarModal(1));

    // Clique no fundo escurecido fecha
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) modal.close();
    });

    modal.addEventListener('keydown', (evento) => {
        // setas navegam, menos quando o foco está no player (lá elas avançam o vídeo)
        if (evento.target instanceof HTMLVideoElement) return;
        if (evento.key === 'ArrowRight') navegarModal(1);
        if (evento.key === 'ArrowLeft') navegarModal(-1);
    });

    modal.addEventListener('close', () => {
        const video = modal.querySelector('#modal-midia video');
        if (video) {
            video.pause();
            video.removeAttribute('src'); // libera o download do vídeo
            video.load();
        }
        document.documentElement.style.removeProperty('overflow');
    });
}

/* ---------------------------------------------------------------------------
   Início
   ------------------------------------------------------------------------ */

export function iniciarProjetos() {
    elementos.destaques = document.getElementById('destaques');
    elementos.indice = document.getElementById('indice-projetos');
    elementos.anuncio = document.getElementById('anuncio-filtro');
    elementos.modal = document.getElementById('modal-projeto');
    elementos.filtros = Array.from(document.querySelectorAll('[data-filtro]'));
    if (!elementos.destaques || !elementos.indice) return;

    observadorVideos = criarObservadorVideos();

    elementos.filtros.forEach((botao) => {
        botao.addEventListener('click', () => aplicarFiltro(botao.dataset.filtro, botao));
    });

    iniciarPrevia();
    iniciarModal();
    renderizar({ revelarAoRolar: true });

    document.addEventListener('idioma:alterado', () => {
        renderizar();
        if (elementos.modal?.open && listaAtual[indiceModal]) preencherModal(listaAtual[indiceModal]);
    });
}
