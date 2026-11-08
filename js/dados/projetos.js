/**
 * Catálogo de projetos, em ordem de relevância (o mais forte primeiro).
 * Os três primeiros do filtro ativo ganham destaque com vídeo; o resto
 * entra no índice. Textos (título, resumo, descrição) ficam em
 * traducoes.js, chaveados pelo `id`.
 *
 * Campos de mídia:
 *  - capa:    imagem leve (960px) usada como pôster e na prévia do índice
 *  - previa:  loop curto e mudo (~10s, 960px) para os destaques; null = usa a capa
 *  - completo: mídia original exibida no modal
 *
 * @typedef {'front-end'|'back-end'|'full-stack'} Categoria
 * @typedef {{
 *   id: string,
 *   categoria: Categoria,
 *   tecnologias: string[],
 *   capa: string,
 *   previa: string|null,
 *   completo: { tipo: 'video'|'imagem', src: string },
 *   repositorio: string,
 *   site: string|null
 * }} Projeto
 */

/** @type {Projeto[]} */
export const projetos = [
    {
        id: 'startech',
        categoria: 'full-stack',
        tecnologias: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
        capa: 'projetos/capas/startech.webp',
        previa: 'projetos/previas/startech.mp4',
        completo: { tipo: 'video', src: 'projetos/Startech.mp4' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/StarTech',
        site: 'https://startechgg.vercel.app/'
    },
    {
        id: 'cashflow',
        // Era "full-stack", mas o repositório é só HTML/CSS/JS (sem servidor).
        categoria: 'front-end',
        tecnologias: ['HTML', 'CSS', 'JavaScript'],
        capa: 'projetos/capas/cashflow.webp',
        previa: 'projetos/previas/cashflow.mp4',
        completo: { tipo: 'video', src: 'projetos/Cashflow.mp4' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/CashFlow',
        site: 'https://cashflowxyz.vercel.app/'
    },
    {
        id: 'api-crud',
        categoria: 'back-end',
        tecnologias: ['Node.js', 'Express', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
        capa: 'projetos/capas/api-crud.webp',
        previa: 'projetos/previas/api-crud.mp4',
        completo: { tipo: 'video', src: 'projetos/API_CRUD_Ecormmece.mp4' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/API_CRUD',
        site: null
    },
    {
        id: 'impressora-elgin',
        categoria: 'back-end',
        tecnologias: ['Java'],
        capa: 'projetos/capas/impressora-elgin.webp',
        previa: null,
        completo: { tipo: 'imagem', src: 'projetos/impressora_elgin.jpg' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/ImpressoraNF',
        site: null
    },
    {
        id: 'api-boas-vindas',
        categoria: 'back-end',
        tecnologias: ['Node.js', 'Express', 'JavaScript', 'HTML', 'CSS'],
        capa: 'projetos/capas/api-boas-vindas.webp',
        previa: 'projetos/previas/api-boas-vindas.mp4',
        completo: { tipo: 'video', src: 'projetos/API_EMAIL.mp4' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/APIwelcome',
        site: null
    },
    {
        id: 'noticias',
        categoria: 'front-end',
        tecnologias: ['HTML', 'CSS', 'JavaScript'],
        capa: 'projetos/capas/noticias.webp',
        previa: null,
        completo: { tipo: 'imagem', src: 'projetos/Noticias.jpeg' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Noticias',
        site: 'https://noticias-nicolascarvalho22b.vercel.app/'
    },
    {
        id: 'login',
        categoria: 'front-end',
        tecnologias: ['HTML', 'CSS', 'JavaScript'],
        capa: 'projetos/capas/login.webp',
        previa: null,
        completo: { tipo: 'imagem', src: 'projetos/Login.jpeg' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/projeto-vertigo',
        site: 'https://vertigo-nicolas-carvalho12b.netlify.app/'
    },
    {
        id: 'feedback',
        categoria: 'front-end',
        tecnologias: ['HTML', 'CSS', 'JavaScript'],
        capa: 'projetos/capas/feedback.webp',
        previa: 'projetos/previas/feedback.mp4',
        completo: { tipo: 'video', src: 'projetos/Feedback.mp4' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Feedback',
        site: 'https://feedback-nicolas-carvalho-12b-ti-tarde.vercel.app/'
    },
    {
        id: 'carros',
        categoria: 'front-end',
        tecnologias: ['HTML', 'CSS'],
        capa: 'projetos/capas/carros.webp',
        previa: 'projetos/previas/carros.mp4',
        completo: { tipo: 'video', src: 'projetos/Carros.mp4' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Carros',
        site: 'https://carros-amber.vercel.app/'
    },
    {
        id: 'resultados',
        categoria: 'front-end',
        tecnologias: ['HTML', 'CSS'],
        capa: 'projetos/capas/resultados.webp',
        previa: null,
        completo: { tipo: 'imagem', src: 'projetos/Resultados.jpeg' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Resultados',
        site: 'https://resultados-nicolascarvalho12b.vercel.app/'
    },
    {
        id: 'receita',
        categoria: 'front-end',
        tecnologias: ['HTML', 'CSS'],
        capa: 'projetos/capas/receita.webp',
        previa: 'projetos/previas/receita.mp4',
        completo: { tipo: 'video', src: 'projetos/Receita.mp4' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Receita',
        site: 'https://receita-nicolas-carvalho-nascimento-12b.vercel.app/'
    },
    {
        id: 'links',
        categoria: 'front-end',
        tecnologias: ['HTML', 'CSS'],
        capa: 'projetos/capas/links.webp',
        previa: 'projetos/previas/links.mp4',
        completo: { tipo: 'video', src: 'projetos/Links.mp4' },
        repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Meus-Links',
        site: 'https://links-nicolas-carvalho-12b-tarde.vercel.app/'
    }
];
