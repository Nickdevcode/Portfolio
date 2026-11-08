/**
 * Ponto de entrada. A ordem importa:
 * 1. i18n primeiro (tudo que é gerado por JS já nasce no idioma certo);
 * 2. tema (os rótulos do botão dependem do idioma);
 * 3. o resto, cada módulo isolado: se um falhar, os outros seguem.
 */
import { iniciarI18n } from './i18n.js';
import { iniciarTema } from './tema.js';
import { iniciarNavegacao } from './navegacao.js';
import { iniciarRevelar } from './revelar.js';
import { iniciarProjetos } from './projetos.js';
import { iniciarRetrato } from './retrato.js';
import { iniciarTeclado } from './teclado.js';
import { iniciarCarreira } from './carreira.js';
import { iniciarContato } from './contato.js';
import { iniciarHero } from './hero.js';

function executarComSeguranca(nome, iniciar) {
    try {
        const resultado = iniciar();
        if (resultado instanceof Promise) {
            resultado.catch((erro) => console.error(`[portfolio] falha em ${nome}:`, erro));
        }
    } catch (erro) {
        console.error(`[portfolio] falha em ${nome}:`, erro);
    }
}

executarComSeguranca('i18n', iniciarI18n);
executarComSeguranca('hero', iniciarHero);
executarComSeguranca('tema', iniciarTema);
executarComSeguranca('revelar', iniciarRevelar);
executarComSeguranca('navegação', iniciarNavegacao);
executarComSeguranca('projetos', iniciarProjetos);
executarComSeguranca('teclado', iniciarTeclado);
executarComSeguranca('carreira', iniciarCarreira);
executarComSeguranca('contato', iniciarContato);
executarComSeguranca('retrato', iniciarRetrato);
