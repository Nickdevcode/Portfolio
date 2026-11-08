/**
 * RETRATO EM DUAS TINTAS
 *
 * A foto (img/retrato-recorte.webp) é a primeira tinta, nítida, pra quem visita
 * ver quem é. Este módulo desenha a SEGUNDA tinta num canvas atrás dela: uma
 * retícula laranja (grade a 15°, ângulo clássico de impressão) fora de
 * registro, como numa risografia. O tamanho de cada ponto vem do tom da foto
 * (img/retrato-reticula.png, luminância + alfa).
 *
 * Interação: o cursor funciona como uma fonte de luz. A tinta laranja escorrega
 * pro lado oposto (como sombra) e os pontos perto do cursor incham e se afastam.
 * O loop de animação só roda enquanto há algo mudando; parado, não gasta CPU.
 */
import { limitar, suavizar, prefereMenosMovimento } from './utilitarios.js';

const ANGULO_GRADE = Math.PI / 12;  // 15°
const PONTOS_POR_LARGURA = 72;      // densidade da grade (mais = pontos menores)
const RAIO_LENTE = 120;             // px de alcance do efeito lente
const GANHO_LENTE = 0.85;           // quanto os pontos incham no centro da lente
const EMPURRAO_LENTE = 8;           // px que os pontos se afastam do cursor
const REGISTRO_BASE = { x: 0.022, y: 0.018 }; // desalinhamento de repouso (fração da largura)
const SOMBRA_MAX = 0.03;            // deslocamento extra máximo puxado pelo cursor (fração da largura)
const DURACAO_PONTO = 520;          // ms que cada ponto leva para "nascer"
const ESPALHAMENTO_INTRO = 900;     // ms entre o primeiro e o último ponto
const FOCO_INTRO = { x: 0.64, y: 0.31 }; // a onda da intro começa pelo olho (fração da imagem)

/**
 * Quanto a tinta laranja pinta para cada luminância da foto: forte nos
 * meios-tons (pele), fraca nas luzes (camisa) e com um piso pra silhueta.
 * No claro a foto entra por cima em multiply, então o laranja aparece nas luzes.
 */
const tomDaTinta = (lum) => 0.16 + 0.84 * suavizar(1, 0.42, lum);

/** Saída com um leve passo além do alvo: o ponto "pinga" no papel. */
const easeSaidaComRetorno = (t) => {
    const c1 = 1.2;
    const c3 = c1 + 1;
    return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

/** Lê a imagem fonte como arrays de luminância e alfa (0..1). */
function lerAmostra(imagem) {
    const largura = imagem.naturalWidth;
    const altura = imagem.naturalHeight;
    const tela = document.createElement('canvas');
    tela.width = largura;
    tela.height = altura;
    const contexto = tela.getContext('2d', { willReadFrequently: true });
    contexto.drawImage(imagem, 0, 0);
    const { data } = contexto.getImageData(0, 0, largura, altura);

    const lum = new Float32Array(largura * altura);
    const alfa = new Float32Array(largura * altura);
    for (let i = 0; i < lum.length; i++) {
        lum[i] = data[i * 4] / 255;
        alfa[i] = data[i * 4 + 3] / 255;
    }
    return { largura, altura, lum, alfa };
}

/** Amostragem bilinear da imagem fonte numa posição normalizada (0..1). */
function amostrar(amostra, u, v, canal) {
    const x = limitar(u * (amostra.largura - 1), 0, amostra.largura - 1);
    const y = limitar(v * (amostra.altura - 1), 0, amostra.altura - 1);
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, amostra.largura - 1);
    const y1 = Math.min(y0 + 1, amostra.altura - 1);
    const fx = x - x0;
    const fy = y - y0;
    const dados = amostra[canal];
    const l = amostra.largura;
    const topo = dados[y0 * l + x0] * (1 - fx) + dados[y0 * l + x1] * fx;
    const base = dados[y1 * l + x0] * (1 - fx) + dados[y1 * l + x1] * fx;
    return topo * (1 - fy) + base * fy;
}

/**
 * Gera a grade de pontos rotacionada cobrindo a tela e guarda só os pontos
 * que caem dentro da silhueta, já com o tom e o atraso da intro.
 */
function gerarGrade(amostra, largura, altura, passo) {
    const cx = largura / 2;
    const cy = altura / 2;
    const n = Math.ceil(Math.hypot(largura, altura) / 2 / passo) + 1;
    const cos = Math.cos(ANGULO_GRADE);
    const sen = Math.sin(ANGULO_GRADE);
    const focoX = FOCO_INTRO.x * largura;
    const focoY = FOCO_INTRO.y * altura;
    const distMax = Math.hypot(largura, altura);

    const xs = [];
    const ys = [];
    const tons = [];
    const atrasos = [];

    for (let i = -n; i <= n; i++) {
        for (let j = -n; j <= n; j++) {
            const x = cx + (i * cos - j * sen) * passo;
            const y = cy + (i * sen + j * cos) * passo;
            if (x < 0 || y < 0 || x > largura || y > altura) continue;

            const u = x / largura;
            const v = y / altura;
            // mesma dissolução da máscara da foto: some na base e na esquerda
            const vinheta = suavizar(1, 0.78, v) * suavizar(0, 0.12, u);
            const alfa = amostrar(amostra, u, v, 'alfa') * vinheta;
            if (alfa < 0.04) continue;

            xs.push(x);
            ys.push(y);
            tons.push(tomDaTinta(amostrar(amostra, u, v, 'lum')) * alfa);
            const dist = Math.hypot(x - focoX, y - focoY) / distMax;
            atrasos.push(dist * ESPALHAMENTO_INTRO * 1.6 + Math.random() * 110);
        }
    }

    return {
        x: Float32Array.from(xs),
        y: Float32Array.from(ys),
        tom: Float32Array.from(tons),
        atraso: Float32Array.from(atrasos)
    };
}

export async function iniciarRetrato() {
    const canvas = document.getElementById('retrato');
    const dica = document.querySelector('.retrato-dica');
    if (!canvas || !canvas.getContext) return;

    const contexto = canvas.getContext('2d');
    const imagem = new Image();
    imagem.src = canvas.dataset.src;
    // Se a imagem falhar, a foto continua lá; só a segunda tinta não aparece
    await imagem.decode();

    const amostra = lerAmostra(imagem);
    const estado = {
        largura: 0,
        altura: 0,
        dpr: 1,
        passo: 8,
        grade: null,
        cor: '#ff5a1f',
        inicioIntro: performance.now(),
        semIntro: prefereMenosMovimento(),
        alvo: { x: 0, y: 0 },
        ponteiro: { x: 0, y: 0 },
        forca: 0,
        forcaAlvo: 0,
        rodando: false
    };

    const lerCor = () => {
        const valor = getComputedStyle(document.documentElement).getPropertyValue('--c-sinal').trim();
        if (valor) estado.cor = valor;
    };

    const montar = () => {
        const caixa = canvas.getBoundingClientRect();
        if (caixa.width === 0) return false;
        estado.largura = caixa.width;
        estado.altura = caixa.height;
        estado.dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(caixa.width * estado.dpr);
        canvas.height = Math.round(caixa.height * estado.dpr);
        estado.passo = limitar(caixa.width / PONTOS_POR_LARGURA, 4.5, 8);
        estado.grade = gerarGrade(amostra, caixa.width, caixa.height, estado.passo);
        lerCor();
        return true;
    };

    const desenhar = (agora) => {
        const { largura, altura, dpr, passo, forca, ponteiro, grade } = estado;
        const tempoIntro = agora - estado.inicioIntro;

        contexto.setTransform(dpr, 0, 0, dpr, 0, 0);
        contexto.clearRect(0, 0, largura, altura);

        // Registro: deslocamento de repouso + "sombra" que foge do cursor
        const nx = largura ? (ponteiro.x / largura - 0.5) * 2 : 0;
        const ny = altura ? (ponteiro.y / altura - 0.5) * 2 : 0;
        const dx = (REGISTRO_BASE.x - nx * SOMBRA_MAX * forca) * largura;
        const dy = (REGISTRO_BASE.y - ny * SOMBRA_MAX * forca) * largura;
        const raioMax = passo * 0.6;

        // A camada inteira num único path: bem mais rápido que um fill por ponto
        contexto.fillStyle = estado.cor;
        contexto.beginPath();
        for (let i = 0; i < grade.x.length; i++) {
            let escala = 1;
            if (!estado.semIntro) {
                const progresso = limitar((tempoIntro - grade.atraso[i]) / DURACAO_PONTO, 0, 1);
                if (progresso === 0) continue;
                escala = easeSaidaComRetorno(progresso);
            }

            let x = grade.x[i] + dx;
            let y = grade.y[i] + dy;

            if (forca > 0.001) {
                const ox = x - ponteiro.x;
                const oy = y - ponteiro.y;
                const dist = Math.hypot(ox, oy);
                if (dist < RAIO_LENTE) {
                    const k = (1 - suavizar(0, RAIO_LENTE, dist)) * forca;
                    escala *= 1 + GANHO_LENTE * k;
                    if (dist > 0.5) {
                        x += (ox / dist) * EMPURRAO_LENTE * k;
                        y += (oy / dist) * EMPURRAO_LENTE * k;
                    }
                }
            }

            const raio = raioMax * Math.sqrt(grade.tom[i]) * escala;
            if (raio < 0.3) continue;
            contexto.moveTo(x + raio, y);
            contexto.arc(x, y, raio, 0, Math.PI * 2);
        }
        contexto.fill();
    };

    const duracaoIntro = ESPALHAMENTO_INTRO * 1.6 + 110 + DURACAO_PONTO;

    const quadro = (agora) => {
        // Suaviza ponteiro e força (inércia)
        estado.ponteiro.x += (estado.alvo.x - estado.ponteiro.x) * 0.18;
        estado.ponteiro.y += (estado.alvo.y - estado.ponteiro.y) * 0.18;
        estado.forca += (estado.forcaAlvo - estado.forca) * 0.1;

        desenhar(agora);

        const introRodando = !estado.semIntro && agora - estado.inicioIntro < duracaoIntro;
        const assentado =
            Math.abs(estado.forca - estado.forcaAlvo) < 0.002 &&
            Math.abs(estado.alvo.x - estado.ponteiro.x) < 0.3 &&
            Math.abs(estado.alvo.y - estado.ponteiro.y) < 0.3;

        if (introRodando || !assentado) {
            requestAnimationFrame(quadro);
        } else {
            estado.forca = estado.forcaAlvo;
            estado.rodando = false;
            desenhar(agora);
        }
    };

    const pedirQuadro = () => {
        if (estado.rodando) return;
        estado.rodando = true;
        requestAnimationFrame(quadro);
    };

    // ---------- Interação ----------
    const area = canvas.parentElement;
    const moverPonteiro = (evento) => {
        if (prefereMenosMovimento()) return;
        const caixa = canvas.getBoundingClientRect();
        estado.alvo.x = evento.clientX - caixa.left;
        estado.alvo.y = evento.clientY - caixa.top;
        if (estado.forcaAlvo === 0) {
            // entrando: a lente nasce onde o cursor está, sem deslizar do canto
            estado.ponteiro.x = estado.alvo.x;
            estado.ponteiro.y = estado.alvo.y;
        }
        estado.forcaAlvo = 1;
        dica?.classList.add('usada');
        pedirQuadro();
    };
    const soltarPonteiro = () => {
        estado.forcaAlvo = 0;
        pedirQuadro();
    };

    area.addEventListener('pointermove', moverPonteiro);
    area.addEventListener('pointerdown', moverPonteiro);
    area.addEventListener('pointerleave', soltarPonteiro);
    area.addEventListener('pointercancel', soltarPonteiro);
    area.addEventListener('pointerup', (evento) => {
        if (evento.pointerType !== 'mouse') soltarPonteiro();
    });

    // ---------- Ciclo de vida ----------
    if (!montar()) return;

    let refazer = 0;
    new ResizeObserver(() => {
        cancelAnimationFrame(refazer);
        refazer = requestAnimationFrame(() => {
            if (montar()) desenhar(performance.now());
        });
    }).observe(canvas);

    document.addEventListener('tema:alterado', () => {
        lerCor();
        desenhar(performance.now());
    });

    // Intro: os pontos nascem a partir do olho, numa onda
    estado.inicioIntro = performance.now();
    pedirQuadro();
}
