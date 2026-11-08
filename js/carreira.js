/**
 * LINHA DO TEMPO DA CARREIRA
 * Converte as datas reais (data-inicio/data-fim, data-de/data-ate) em
 * posições percentuais e coloca o marcador "hoje" na data atual, então a
 * linha do tempo se atualiza sozinha com o passar dos meses.
 */
import { idioma, t } from './i18n.js';
import { limitar } from './utilitarios.js';

const paraData = (texto) => new Date(`${texto}T00:00:00`);

export function iniciarCarreira() {
    const linha = document.getElementById('linha-tempo');
    if (!linha) return;

    const inicio = paraData(linha.dataset.inicio).getTime();
    const fim = paraData(linha.dataset.fim).getTime();
    const hoje = Date.now();
    const fracao = (tempo) => limitar((tempo - inicio) / (fim - inicio), 0, 1);
    const fracaoHoje = fracao(hoje);

    // Anos do eixo
    linha.querySelectorAll('.lt-ano').forEach((ano) => {
        const posicao = fracao(paraData(`${ano.dataset.ano}-01-01`).getTime());
        ano.style.setProperty('--pos', `${posicao * 100}%`);
    });

    // Barra da formação + quanto dela já foi percorrido
    linha.querySelectorAll('.lt-barra').forEach((barra) => {
        const de = fracao(paraData(barra.dataset.de).getTime());
        const ate = fracao(paraData(barra.dataset.ate).getTime());
        const percorrido = limitar((fracaoHoje - de) / (ate - de), 0, 1);
        barra.style.setProperty('--ini', `${de * 100}%`);
        barra.style.setProperty('--larg', `${(ate - de) * 100}%`);
        barra.style.setProperty('--prog', `${percorrido * 100}%`);
    });

    linha.style.setProperty('--hoje', `${fracaoHoje * 100}%`);
    linha.style.setProperty('--hoje-num', String(fracaoHoje));

    const rotulo = document.getElementById('lt-hoje-rotulo');
    const atualizarRotulo = () => {
        if (!rotulo) return;
        const mes = new Intl.DateTimeFormat(idioma() === 'en' ? 'en-US' : 'pt-BR', { month: 'short', year: 'numeric' }).format(hoje);
        rotulo.textContent = `${t('carreira.hoje')}: ${mes.replace(/\.?\s*de\s*/i, ' ').replace('.', '')}`;
    };
    atualizarRotulo();
    document.addEventListener('idioma:alterado', atualizarRotulo);
}
