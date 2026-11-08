/**
 * Dicionário de traduções PT/EN do portfólio.
 *
 * Estrutura: traducoes[idioma][chave] = texto.
 * No HTML, as chaves são referenciadas por:
 *  - data-i18n="chave"        troca o texto do elemento
 *  - data-i18n-html="chave"   troca o HTML (só para textos fixos deste arquivo, ex.: <mark>)
 *  - data-i18n-attr="attr:chave, attr2:chave2"   troca atributos (aria-label etc.)
 *
 * Ao adicionar um texto novo no site, inclua a mesma chave nos DOIS idiomas.
 */
export const traducoes = {
    pt: {
        // <head>
        'meta.title': 'Nicolas Carvalho · Desenvolvedor front-end e back-end',
        'meta.descricao': 'Portfólio de Nicolas Carvalho, desenvolvedor front-end e back-end de 18 anos em São Paulo. Sites, APIs e sistemas com JavaScript, Node.js, MySQL e Java.',

        // Acessibilidade geral
        'pular': 'Pular para o conteúdo',
        'marca.rotulo': 'Nicolas Carvalho, voltar ao início',
        'lang.toggleLabel': 'Mudar idioma para inglês',
        'tema.paraEscuro': 'Mudar para tema escuro',
        'tema.paraClaro': 'Mudar para tema claro',

        // Navegação
        'nav.rotulo': 'Navegação principal',
        'nav.home': 'Início',
        'nav.sobre': 'Sobre',
        'nav.portfolio': 'Projetos',
        'nav.skills': 'Skills',
        'nav.carreira': 'Carreira',
        'nav.contato': 'Contato',
        'nav.menu': 'Abrir menu',
        'nav.fecharMenu': 'Fechar menu',

        // Hero
        'hero.status': 'Aberto a projetos freelance',
        'hero.local': 'São Paulo, SP',
        'hero.subtitulo': 'Desenvolvedor front-end e back-end. Crio interfaces com React e Next.js e APIs com Node.js e MySQL.',
        'hero.verProjetos': 'Ver projetos',
        'hero.baixarCv': 'Baixar CV',
        'cv.pt': 'Português',
        'cv.en': 'English',
        'retrato.alt': 'Retrato de Nicolas Carvalho',
        'retrato.dica': 'passe o cursor',

        // Sobre
        'sobre.titulo': 'Sobre mim',
        'sobre.texto': 'Tenho 18 anos, moro em São Paulo, sou PCD e estou no último ano do <mark>técnico em TI integrado ao ensino médio</mark> na UNASP SP. Crio <mark>sites e aplicações web completas e responsivas</mark> com React, Next.js, TypeScript e Tailwind CSS, e cuido do <mark>back-end com Node.js e MySQL</mark>.',
        'sobre.complemento': 'Tenho noções de UX/UI e sigo estudando rumo ao desenvolvimento full-stack. Gosto de desafio, e o sonho é ser full-stack em uma grande empresa ou projeto.',
        'sobre.fato.base.rotulo': 'Base',
        'sobre.fato.base.valor': 'São Paulo, SP',
        'sobre.fato.idade.rotulo': 'Idade',
        'sobre.fato.idade.valor': '18 anos',
        'sobre.fato.formacao.rotulo': 'Formação',
        'sobre.fato.formacao.valor': 'Técnico em TI + Ensino Médio, UNASP SP',
        'sobre.fato.conclusao.rotulo': 'Conclusão',
        'sobre.fato.conclusao.valor': 'Dezembro de 2026',
        'sobre.fato.foco.rotulo': 'Foco',
        'sobre.fato.foco.valor': 'Front-end e back-end, rumo ao full-stack',

        // Projetos
        'portfolio.titulo': 'Projetos',
        'portfolio.filtro.rotulo': 'Filtrar projetos por área',
        'portfolio.filtro.todos': 'Todos',
        'portfolio.filtro.frontend': 'Front-end',
        'portfolio.filtro.backend': 'Back-end',
        'portfolio.filtro.fullstack': 'Full-stack',
        'portfolio.filtro.anuncio': '{n} projetos em {filtro}',
        'portfolio.categoria.front-end': 'Front-end',
        'portfolio.categoria.back-end': 'Back-end',
        'portfolio.categoria.full-stack': 'Full-stack',
        'portfolio.aoVivo': 'No ar',
        'portfolio.site': 'Site',
        'portfolio.codigo': 'Código',
        'portfolio.abrir': 'Abrir detalhes de {titulo}',
        'portfolio.github': 'Mais no GitHub',
        'portfolio.vazio': 'Nenhum projeto nessa categoria por enquanto.',
        'portfolio.modal.fechar': 'Fechar',
        'portfolio.modal.anterior': 'Projeto anterior',
        'portfolio.modal.proximo': 'Próximo projeto',
        'portfolio.modal.verSite': 'Ver site no ar',
        'portfolio.modal.verCodigo': 'Ver código',
        'portfolio.modal.posicao': '{atual} de {total}',

        // Skills
        'skills.titulo': 'Skills',
        'skills.intro': 'As tecnologias do meu dia a dia. Pode apertar as teclas, inclusive as do seu teclado.',
        'skills.grupo.front': 'Front-end',
        'skills.grupo.back': 'Back-end',
        'skills.grupo.ferramentas': 'Ferramentas',
        'skills.grupo.extras': 'Extras',
        'skills.subtitulo.gerais': 'Habilidades gerais',
        'skills.soft.comunicacao': 'Facilidade de comunicação',
        'skills.soft.equipe': 'Trabalho em equipe',
        'skills.soft.gestaoProjetos': 'Gestão de projetos',
        'skills.soft.lideranca': 'Liderança de equipe',
        'skills.soft.resolucao': 'Resolução de problemas',
        'skills.soft.organizacao': 'Organização',
        'skills.soft.adaptabilidade': 'Adaptabilidade',
        'skills.soft.aprendizadoContinuo': 'Aprendizado contínuo',
        'skills.soft.facilidadeAprendizado': 'Facilidade de aprendizado',
        'skills.soft.pensamentoCritico': 'Pensamento crítico',
        'skills.soft.inteligenciaEmocional': 'Inteligência emocional',
        'skills.soft.criatividade': 'Criatividade',
        'skills.soft.gestaoTempo': 'Gestão do tempo',

        // Carreira
        'carreira.titulo': 'Carreira',
        'carreira.trilha.formacao': 'Formação',
        'carreira.trilha.profissional': 'Profissional',
        'carreira.hoje': 'hoje',
        'carreira.formacao.status': 'Último ano',
        'carreira.formacao.datas': 'jan. 2024 a dez. 2026',
        'carreira.formacao.titulo': 'Técnico em TI integrado ao ensino médio',
        'carreira.formacao.instituicao': 'UNASP SP, Centro Universitário Adventista de São Paulo',
        'carreira.formacao.descricao': 'Formação técnica junto com o ensino médio: programação, desenvolvimento web, banco de dados, redes e outras áreas essenciais de TI.',
        'carreira.profissional.status': 'Em busca',
        'carreira.profissional.datas': 'A partir de agora',
        'carreira.profissional.titulo': 'Projetos freelance',
        'carreira.profissional.local': 'Web, back-end e sistemas',
        'carreira.profissional.descricao': 'Busco projetos que me deixem aplicar e expandir o que sei. Tenho base intermediária em front-end e back-end e topo desafios com tecnologias diferentes.',

        // Contato
        'contato.titulo': 'Vamos conversar?',
        'contato.texto': 'Freela, vaga ou ideia de projeto: me chama por onde for mais fácil.',
        'contato.copiar': 'Copiar',
        'contato.copiado': 'Copiado',
        'contato.copiarRotulo': 'Copiar e-mail',
        'contato.anuncioCopiado': 'E-mail copiado para a área de transferência.',
        'contato.falhaCopiar': 'Não deu pra copiar automaticamente. O e-mail ficou selecionado, é só usar Ctrl+C.',
        'contato.whatsapp': 'WhatsApp',

        // Rodapé
        'footer.topo': 'Voltar ao topo'
    },

    en: {
        // <head>
        'meta.title': 'Nicolas Carvalho · Front-end and back-end developer',
        'meta.descricao': 'Portfolio of Nicolas Carvalho, an 18-year-old front-end and back-end developer based in São Paulo, Brazil. Websites, APIs and systems with JavaScript, Node.js, MySQL and Java.',

        // General accessibility
        'pular': 'Skip to content',
        'marca.rotulo': 'Nicolas Carvalho, back to top',
        'lang.toggleLabel': 'Switch language to Portuguese',
        'tema.paraEscuro': 'Switch to dark theme',
        'tema.paraClaro': 'Switch to light theme',

        // Navigation
        'nav.rotulo': 'Main navigation',
        'nav.home': 'Home',
        'nav.sobre': 'About',
        'nav.portfolio': 'Projects',
        'nav.skills': 'Skills',
        'nav.carreira': 'Career',
        'nav.contato': 'Contact',
        'nav.menu': 'Open menu',
        'nav.fecharMenu': 'Close menu',

        // Hero
        'hero.status': 'Open to freelance work',
        'hero.local': 'São Paulo, Brazil',
        'hero.subtitulo': 'Front-end and back-end developer. I build interfaces with React and Next.js, and APIs with Node.js and MySQL.',
        'hero.verProjetos': 'See projects',
        'hero.baixarCv': 'Download CV',
        'cv.pt': 'Português',
        'cv.en': 'English',
        'retrato.alt': 'Portrait of Nicolas Carvalho',
        'retrato.dica': 'hover me',

        // About
        'sobre.titulo': 'About me',
        'sobre.texto': "I'm 18, based in São Paulo, a person with a disability, and in the final year of an <mark>IT technical program integrated with high school</mark> at UNASP SP. I build <mark>complete, responsive websites and web apps</mark> with React, Next.js, TypeScript and Tailwind CSS, and I handle the <mark>back-end with Node.js and MySQL</mark>.",
        'sobre.complemento': 'I have a grasp of UX/UI and keep studying toward full-stack development. I enjoy a challenge, and the dream is to be a full-stack developer at a great company or project.',
        'sobre.fato.base.rotulo': 'Based in',
        'sobre.fato.base.valor': 'São Paulo, Brazil',
        'sobre.fato.idade.rotulo': 'Age',
        'sobre.fato.idade.valor': '18',
        'sobre.fato.formacao.rotulo': 'Education',
        'sobre.fato.formacao.valor': 'IT Technician + High School, UNASP SP',
        'sobre.fato.conclusao.rotulo': 'Graduating',
        'sobre.fato.conclusao.valor': 'December 2026',
        'sobre.fato.foco.rotulo': 'Focus',
        'sobre.fato.foco.valor': 'Front-end and back-end, heading to full-stack',

        // Projects
        'portfolio.titulo': 'Projects',
        'portfolio.filtro.rotulo': 'Filter projects by area',
        'portfolio.filtro.todos': 'All',
        'portfolio.filtro.frontend': 'Front-end',
        'portfolio.filtro.backend': 'Back-end',
        'portfolio.filtro.fullstack': 'Full-stack',
        'portfolio.filtro.anuncio': '{n} projects in {filtro}',
        'portfolio.categoria.front-end': 'Front-end',
        'portfolio.categoria.back-end': 'Back-end',
        'portfolio.categoria.full-stack': 'Full-stack',
        'portfolio.aoVivo': 'Live',
        'portfolio.site': 'Website',
        'portfolio.codigo': 'Code',
        'portfolio.abrir': 'Open details for {titulo}',
        'portfolio.github': 'More on GitHub',
        'portfolio.vazio': 'No projects in this category yet.',
        'portfolio.modal.fechar': 'Close',
        'portfolio.modal.anterior': 'Previous project',
        'portfolio.modal.proximo': 'Next project',
        'portfolio.modal.verSite': 'Visit live site',
        'portfolio.modal.verCodigo': 'View code',
        'portfolio.modal.posicao': '{atual} of {total}',

        // Skills
        'skills.titulo': 'Skills',
        'skills.intro': 'The tech I use every day. Go ahead and press the keys, even the ones on your own keyboard.',
        'skills.grupo.front': 'Front-end',
        'skills.grupo.back': 'Back-end',
        'skills.grupo.ferramentas': 'Tools',
        'skills.grupo.extras': 'Extras',
        'skills.subtitulo.gerais': 'General skills',
        'skills.soft.comunicacao': 'Clear communication',
        'skills.soft.equipe': 'Teamwork',
        'skills.soft.gestaoProjetos': 'Project management',
        'skills.soft.lideranca': 'Team leadership',
        'skills.soft.resolucao': 'Problem solving',
        'skills.soft.organizacao': 'Organization',
        'skills.soft.adaptabilidade': 'Adaptability',
        'skills.soft.aprendizadoContinuo': 'Continuous learning',
        'skills.soft.facilidadeAprendizado': 'Quick learner',
        'skills.soft.pensamentoCritico': 'Critical thinking',
        'skills.soft.inteligenciaEmocional': 'Emotional intelligence',
        'skills.soft.criatividade': 'Creativity',
        'skills.soft.gestaoTempo': 'Time management',

        // Career
        'carreira.titulo': 'Career',
        'carreira.trilha.formacao': 'Education',
        'carreira.trilha.profissional': 'Work',
        'carreira.hoje': 'today',
        'carreira.formacao.status': 'Final year',
        'carreira.formacao.datas': 'Jan 2024 to Dec 2026',
        'carreira.formacao.titulo': 'IT technical program integrated with high school',
        'carreira.formacao.instituicao': 'UNASP SP, Centro Universitário Adventista de São Paulo',
        'carreira.formacao.descricao': 'Technical training alongside high school: programming, web development, databases, networking and other core IT areas.',
        'carreira.profissional.status': 'Looking',
        'carreira.profissional.datas': 'Starting now',
        'carreira.profissional.titulo': 'Freelance projects',
        'carreira.profissional.local': 'Web, back-end and systems',
        'carreira.profissional.descricao': "I'm looking for projects that let me apply and expand what I know. I have intermediate skills in both front-end and back-end and I'm up for challenges with different technologies.",

        // Contact
        'contato.titulo': "Let's talk?",
        'contato.texto': 'Freelance, a job or a project idea: reach me wherever is easiest.',
        'contato.copiar': 'Copy',
        'contato.copiado': 'Copied',
        'contato.copiarRotulo': 'Copy email',
        'contato.anuncioCopiado': 'Email copied to clipboard.',
        'contato.falhaCopiar': "Couldn't copy automatically. The email is selected, just press Ctrl+C.",
        'contato.whatsapp': 'WhatsApp',

        // Footer
        'footer.topo': 'Back to top'
    }
};

/**
 * Textos de cada projeto, chaveados pelo id usado em projetos.js.
 * `resumo` aparece nos cards e no índice; `descricao` no modal.
 */
export const textosProjetos = {
    pt: {
        'startech': {
            titulo: 'Startech',
            resumo: 'EduTech de astronomia com planetas 3D, quiz, ranking e login.',
            descricao: 'Projeto mais complexo desenvolvido durante dois anos do ensino médio. Trabalho EduTech sobre astronomia com planetas 3D, sistema de quiz, ranking de usuários, login, cadastro e diversas funcionalidades interativas.'
        },
        'cashflow': {
            titulo: 'Cashflow',
            resumo: 'Site de educação financeira com calculadoras, gráficos e quiz.',
            descricao: 'Site completo sobre investimentos desenvolvido para o projeto de Matemática do curso integrado. Inclui modo claro e escuro, responsividade, calculadoras, gráficos interativos e sistema de quiz.'
        },
        'api-crud': {
            titulo: 'API CRUD e-commerce',
            resumo: 'API de clientes para e-commerce: cadastrar, editar, excluir e listar.',
            descricao: 'Primeiro CRUD completo desenvolvido para e-commerce. O sistema permite cadastrar clientes, atualizar dados, excluir registros e consultar a lista completa de clientes cadastrados no banco de dados.'
        },
        'impressora-elgin': {
            titulo: 'Sistema Elgin',
            resumo: 'Sistema em Java para impressoras de nota fiscal Elgin.',
            descricao: 'Sistema completo desenvolvido em Java para impressoras de nota fiscal Elgin. Inclui impressão de notas fiscais, geração de QR codes, sinais sonoros e diversas outras funções da impressora.'
        },
        'api-boas-vindas': {
            titulo: 'API de boas-vindas',
            resumo: 'Cadastro que dispara um e-mail de boas-vindas personalizado.',
            descricao: 'API desenvolvida para envio automático de e-mails de boas-vindas com tema de e-commerce. O usuário cadastra nome e e-mail e recebe automaticamente uma mensagem personalizada.'
        },
        'noticias': {
            titulo: 'Notícias',
            resumo: 'Home de portal de notícias com menu lateral e layout responsivo.',
            descricao: 'Projeto de tela inicial de jornal com notícias e manchetes. Foi o projeto com maior aprofundamento em JavaScript, incluindo menu lateral, responsividade mobile e aprendizado de posicionamento, UX e UI.'
        },
        'login': {
            titulo: 'Login',
            resumo: 'Tela de login com formulário estilizado.',
            descricao: 'Tela de login desenvolvida para aprender a criar formulários estilizados. Projeto realizado para o curso integrado de TI do ensino médio.'
        },
        'feedback': {
            titulo: 'Feedback',
            resumo: 'Modal de avaliação com cinco estrelas em JavaScript.',
            descricao: 'Terceiro projeto do curso, com introdução ao JavaScript. Sistema de avaliação com modal de cinco estrelas, onde o usuário escolhe a nota e vê o resultado na tela.'
        },
        'carros': {
            titulo: 'Carros',
            resumo: 'Três cards de categorias de carros com link para a loja.',
            descricao: 'Interface com três cards de categorias de carros: sedãs, SUVs e luxuosos. Cada card tem um botão "Ver mais" que leva a uma loja onde é possível comprar carros daquela categoria.'
        },
        'resultados': {
            titulo: 'Resultados',
            resumo: 'Card de resultado com score e notas por habilidade.',
            descricao: 'Modal de resultado que exibe o score e as habilidades do usuário em diferentes áreas. Interface pensada para apresentar resultados de forma clara e organizada.'
        },
        'receita': {
            titulo: 'Receita',
            resumo: 'Card de receita de omelete com tabela e listas.',
            descricao: 'Segundo projeto do curso, focado na criação de um card de receita de omelete. Aprofundamento em HTML e CSS com posicionamento, estilização de tabelas e novas tags.'
        },
        'links': {
            titulo: 'Links',
            resumo: 'Página de links no estilo link tree. Meu primeiro projeto.',
            descricao: 'Primeiro projeto do curso de TI, feito como introdução ao HTML e CSS. Uma página estilo link tree com links das redes sociais, nome e informações sobre o desenvolvedor.'
        }
    },
    en: {
        'startech': {
            titulo: 'Startech',
            resumo: 'Astronomy EduTech with 3D planets, quizzes, ranking and login.',
            descricao: 'The most complex project, built over two years of high school. An EduTech project about astronomy with 3D planets, a quiz system, user ranking, login, sign-up and many interactive features.'
        },
        'cashflow': {
            titulo: 'Cashflow',
            resumo: 'Personal finance site with calculators, charts and a quiz.',
            descricao: 'A complete website about investing, built for a Math project in the integrated program. It includes light and dark mode, responsiveness, calculators, interactive charts and a quiz system.'
        },
        'api-crud': {
            titulo: 'E-commerce CRUD API',
            resumo: 'Customer API for e-commerce: create, update, delete and list.',
            descricao: 'My first complete CRUD, built for e-commerce. The system lets you register customers, update their data, delete records and query the full list of customers stored in the database.'
        },
        'impressora-elgin': {
            titulo: 'Elgin System',
            resumo: 'Java system for Elgin invoice printers.',
            descricao: 'A complete system built in Java for Elgin invoice printers. It covers invoice printing, QR code generation, sound signals and several other printer functions.'
        },
        'api-boas-vindas': {
            titulo: 'Welcome API',
            resumo: 'Sign-up that sends a personalized welcome email.',
            descricao: 'An API that automatically sends e-commerce themed welcome emails. The user registers a name and email and instantly receives a personalized message.'
        },
        'noticias': {
            titulo: 'News',
            resumo: 'News portal homepage with a side menu and responsive layout.',
            descricao: 'A newspaper homepage with news and headlines. It was my deepest dive into JavaScript, with a side menu, mobile responsiveness and lessons on positioning, UX and UI.'
        },
        'login': {
            titulo: 'Login',
            resumo: 'Login screen with a styled form.',
            descricao: 'A login screen built to learn how to create styled forms. Made for the integrated high school IT program.'
        },
        'feedback': {
            titulo: 'Feedback',
            resumo: 'Five-star rating modal in JavaScript.',
            descricao: 'Third project of the program and my introduction to JavaScript. A rating modal with five stars where the user picks a score and sees the result on screen.'
        },
        'carros': {
            titulo: 'Cars',
            resumo: 'Three car category cards linking to a store.',
            descricao: 'An interface with three car category cards: sedans, SUVs and luxury. Each card has a "See more" button leading to a store where you can buy cars from that category.'
        },
        'resultados': {
            titulo: 'Results',
            resumo: 'Result card with a score and per-skill grades.',
            descricao: "A result modal showing the user's score and skills across different areas. An interface designed to present results in a clear, organized way."
        },
        'receita': {
            titulo: 'Recipe',
            resumo: 'Omelette recipe card with a table and lists.',
            descricao: 'Second project of the program, focused on an omelette recipe card. A deeper dive into HTML and CSS: positioning, table styling and new tags.'
        },
        'links': {
            titulo: 'Links',
            resumo: 'Link tree style page. My very first project.',
            descricao: 'First project of the IT program, built as an introduction to HTML and CSS. A link tree style page with social links, name and information about the developer.'
        }
    }
};
