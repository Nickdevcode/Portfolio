/**
 * Dicionário de traduções PT/EN do portfólio.
 *
 * Estrutura: translations[idioma][chave] = texto.
 * As chaves seguem o padrão "secao.elemento" e são referenciadas no HTML
 * pelo atributo data-i18n. O script.js lê esse objeto para trocar os textos
 * em tempo real, sem recarregar a página.
 *
 * Ao adicionar um texto novo no site, inclua a mesma chave nos DOIS idiomas.
 */
const translations = {
    pt: {
        // Meta / <head>
        'meta.title': 'Nicolas Carvalho - Portfólio',

        // Navegação (header e menu lateral)
        'nav.home': 'Home',
        'nav.sobre': 'Sobre mim',
        'nav.portfolio': 'Portfólio',
        'nav.skills': 'Skills',
        'nav.carreira': 'Carreira',
        'nav.contato': 'Contato',

        // Hero
        'hero.saudacoes': 'Saudações!',
        'hero.profissao': 'Desenvolvedor Front-end & Back-end · Rumo a Full-Stack',
        'hero.baixarCv': 'Baixar CV',
        'hero.conversar': 'Vamos conversar',

        // Sobre mim
        'sobre.badge': 'Sobre mim',
        'sobre.item1': 'Me chamo Nicolas Carvalho. Prazer em conhecê-lo!',
        'sobre.item2': 'Desenvolvedor estudante de 18 anos PCD, dedicado e colaborativo. Crio sites e aplicações web completas e responsivas com React, Next.js, TypeScript e Tailwind CSS, além de back-end em Node.js e MySQL.',
        'sobre.item3': 'Cursando 3º ano do Ensino Médio com TI na UNASP SP.',
        'sobre.item4': 'Atuo em front-end e back-end, com noções de UX/UI, e evoluo em curso rumo ao desenvolvimento Full-Stack.',
        'sobre.item5': 'Paixão por desafios. Sonho: ser Full-Stack em grande empresa ou projeto.',

        // Portfólio
        'portfolio.badge': 'Portfólio',
        'portfolio.titulo': 'Trabalhos e projetos',
        'portfolio.filtro.todos': 'Todos',
        'portfolio.filtro.frontend': 'Front-end',
        'portfolio.filtro.backend': 'Back-end',
        'portfolio.filtro.fullstack': 'Full-stack',
        'portfolio.verMais': 'Ver mais projetos →',
        'portfolio.online': 'Online',
        'portfolio.modal.repositorio': 'Repositório',
        'portfolio.modal.verProjeto': 'Ver Projeto',

        // Skills
        'skills.badge': 'Skills · Habilidades',
        'skills.titulo': 'Tecnologias e habilidades',
        'skills.subtitulo.dia': 'Techs que uso no dia a dia',
        'skills.subtitulo.ferramentas': 'Ferramentas',
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
        'carreira.badge': 'Carreira',
        'carreira.titulo': 'Trajetória até aqui',
        'carreira.profissional.titulo': 'Área profissional',
        'carreira.profissional.periodo': '2024 · Atualmente',
        'carreira.profissional.card.titulo': 'Em breve',
        'carreira.profissional.card.descricao': 'Procurando oportunidades freelancers enquanto estou no ensino médio. Busco projetos em desenvolvimento web (front-end), backends e sistemas que me permitam aplicar e expandir meus conhecimentos. Tenho conhecimento intermediário tanto em front-end quanto em back-end, e estou disposto a me desafiar em diferentes tipos de projetos e tecnologias.',
        'carreira.profissional.card.duracao': 'Em busca',
        'carreira.profissional.card.datas': 'Atualmente',
        'carreira.academica.titulo': 'Acadêmica',
        'carreira.academica.periodo': '2024 · Atualmente',
        'carreira.academica.card1.titulo': 'Curso de Tecnologia da Informação integrado ao ensino médio',
        'carreira.academica.card1.descricao': 'Cursando o curso técnico de Tecnologia da Informação integrado ao ensino médio no Centro Universitário Adventista de São Paulo (UNASP). Finalizei o segundo ano, tanto do ensino médio quanto do curso técnico. O curso abrange programação, desenvolvimento web, banco de dados, redes e outras áreas essenciais da TI.',
        'carreira.academica.card1.duracao': 'Cursando',
        'carreira.academica.card1.datas': 'Janeiro/2024 - Dezembro/2026',
        'carreira.academica.card2.titulo': 'Cursando o ensino médio',
        'carreira.academica.card2.descricao': 'Cursando o ensino médio no Centro Universitário Adventista de São Paulo (UNASP), com previsão de conclusão em dezembro de 2026. O ensino médio está integrado ao curso técnico de Tecnologia da Informação, proporcionando uma formação completa e alinhada com as demandas do mercado.',
        'carreira.academica.card2.duracao': 'Cursando',
        'carreira.academica.card2.datas': 'Janeiro/2024 - Dezembro/2026',

        // Contato
        'contato.badge': 'Contatos',
        'contato.titulo': 'Vamos conversar!',
        'contato.whatsapp': 'Vamos conversar',
        'contato.emailLabel': 'E-mail:',
        'contato.voltarTopo': 'Voltar ao topo',

        // Modais
        'modal.cv.titulo': 'Baixar Currículo',
        'modal.cv.descricao': 'Escolha o idioma do currículo que deseja baixar:',
        'modal.cv.portugues': 'Português',
        'modal.cv.ingles': 'English',
        'modal.contato.titulo': 'Vamos Conversar',
        'modal.contato.descricao': 'Escolha como deseja entrar em contato:',
        'modal.contato.whatsapp': 'WhatsApp',
        'modal.contato.email': 'E-mail',

        // Feedback dinâmico (JS)
        'js.emailCopiado': 'E-mail copiado!',

        // Rodapé
        'footer.copyright': 'Copyright © Nicolas Carvalho -',

        // Botão de idioma (aria-label)
        'lang.toggleLabel': 'Mudar idioma para inglês'
    },

    en: {
        // Meta / <head>
        'meta.title': 'Nicolas Carvalho - Portfolio',

        // Navigation (header and side menu)
        'nav.home': 'Home',
        'nav.sobre': 'About me',
        'nav.portfolio': 'Portfolio',
        'nav.skills': 'Skills',
        'nav.carreira': 'Career',
        'nav.contato': 'Contact',

        // Hero
        'hero.saudacoes': 'Greetings!',
        'hero.profissao': 'Front-end & Back-end Developer · Heading toward Full-Stack',
        'hero.baixarCv': 'Download CV',
        'hero.conversar': "Let's talk",

        // About me
        'sobre.badge': 'About me',
        'sobre.item1': "My name is Nicolas Carvalho. Nice to meet you!",
        'sobre.item2': 'An 18-year-old student developer with a disability, dedicated and collaborative. I build complete, responsive websites and web applications with React, Next.js, TypeScript and Tailwind CSS, plus back-end work with Node.js and MySQL.',
        'sobre.item3': 'In my 3rd year of high school combined with an IT program at UNASP SP.',
        'sobre.item4': 'I work across front-end and back-end, with a grasp of UX/UI, and I keep growing through my studies toward Full-Stack development.',
        'sobre.item5': 'A passion for challenges. My dream: to be a Full-Stack developer at a great company or project.',

        // Portfolio
        'portfolio.badge': 'Portfolio',
        'portfolio.titulo': 'Work and projects',
        'portfolio.filtro.todos': 'All',
        'portfolio.filtro.frontend': 'Front-end',
        'portfolio.filtro.backend': 'Back-end',
        'portfolio.filtro.fullstack': 'Full-stack',
        'portfolio.verMais': 'See more projects →',
        'portfolio.online': 'Online',
        'portfolio.modal.repositorio': 'Repository',
        'portfolio.modal.verProjeto': 'View Project',

        // Skills
        'skills.badge': 'Skills · Abilities',
        'skills.titulo': 'Technologies and skills',
        'skills.subtitulo.dia': 'Techs I use day to day',
        'skills.subtitulo.ferramentas': 'Tools',
        'skills.subtitulo.gerais': 'General skills',
        'skills.soft.comunicacao': 'Communication skills',
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
        'carreira.badge': 'Career',
        'carreira.titulo': 'My journey so far',
        'carreira.profissional.titulo': 'Professional area',
        'carreira.profissional.periodo': '2024 · Present',
        'carreira.profissional.card.titulo': 'Coming soon',
        'carreira.profissional.card.descricao': 'Looking for freelance opportunities while in high school. I seek projects in web development (front-end), back-ends and systems that let me apply and expand my knowledge. I have intermediate knowledge in both front-end and back-end, and I am willing to challenge myself with different types of projects and technologies.',
        'carreira.profissional.card.duracao': 'Seeking',
        'carreira.profissional.card.datas': 'Present',
        'carreira.academica.titulo': 'Academic',
        'carreira.academica.periodo': '2024 · Present',
        'carreira.academica.card1.titulo': 'Information Technology program integrated with high school',
        'carreira.academica.card1.descricao': 'Taking the technical Information Technology program integrated with high school at Centro Universitário Adventista de São Paulo (UNASP). I have completed the second year of both high school and the technical program. The program covers programming, web development, databases, networking and other essential IT areas.',
        'carreira.academica.card1.duracao': 'In progress',
        'carreira.academica.card1.datas': 'January/2024 - December/2026',
        'carreira.academica.card2.titulo': 'Completing high school',
        'carreira.academica.card2.descricao': 'Completing high school at Centro Universitário Adventista de São Paulo (UNASP), expected to finish in December 2026. High school is integrated with the technical Information Technology program, providing a complete education aligned with market demands.',
        'carreira.academica.card2.duracao': 'In progress',
        'carreira.academica.card2.datas': 'January/2024 - December/2026',

        // Contact
        'contato.badge': 'Contacts',
        'contato.titulo': "Let's talk!",
        'contato.whatsapp': "Let's talk",
        'contato.emailLabel': 'Email:',
        'contato.voltarTopo': 'Back to top',

        // Modals
        'modal.cv.titulo': 'Download Resume',
        'modal.cv.descricao': 'Choose the language of the resume you want to download:',
        'modal.cv.portugues': 'Portuguese',
        'modal.cv.ingles': 'English',
        'modal.contato.titulo': "Let's Talk",
        'modal.contato.descricao': 'Choose how you would like to get in touch:',
        'modal.contato.whatsapp': 'WhatsApp',
        'modal.contato.email': 'Email',

        // Dynamic feedback (JS)
        'js.emailCopiado': 'Email copied!',

        // Footer
        'footer.copyright': 'Copyright © Nicolas Carvalho -',

        // Language button (aria-label)
        'lang.toggleLabel': 'Switch language to Portuguese'
    }
};

/**
 * Descrições dos projetos em ambos os idiomas.
 * Chaveado pelo id do projeto (o mesmo usado no array `projetos` do script.js).
 * Mantido separado do array principal para não inflar a lógica de renderização.
 */
const projectTranslations = {
    pt: {
        'links': 'Primeiro projeto do curso de TI, desenvolvido como introdução ao HTML e CSS. Uma página estilo link tree com links das redes sociais, nome e informações sobre o desenvolvedor.',
        'receita': 'Segundo projeto do curso, focado na criação de um card de receita de omelete. Aprofundamento em HTML e CSS com aprendizado de posicionamentos, estilização de tabelas e novas tags HTML.',
        'feedback': 'Terceiro projeto do curso com introdução ao JavaScript. Sistema de avaliação com modal contendo cinco estrelas, onde o usuário seleciona a quantidade desejada e visualiza o resultado na tela.',
        'resultados': 'Modal de resultado que exibe o score e habilidades do usuário em diferentes áreas. Interface desenvolvida para apresentar resultados de forma clara e organizada.',
        'carros': 'Interface com três cards apresentando categorias de carros: sedãs, SUVs e luxuosos. Cada card possui botão "Ver mais" que direciona para uma loja onde é possível comprar carros dessas categorias.',
        'login': 'Tela de login desenvolvida para aprendizado de criação de formulários estilizados. Projeto realizado para o curso integrado de TI do ensino médio.',
        'noticias': 'Projeto de tela inicial de jornal com notícias e manchetes. Foi o projeto com maior aprofundamento em JavaScript, incluindo menu lateral, responsividade mobile e aprendizado de posicionamento, UX e UI.',
        'cashflow': 'Site completo sobre investimentos desenvolvido para projeto de Matemática do curso integrado. Inclui modo claro e escuro, responsividade, calculadoras, gráficos interativos e sistema de quiz.',
        'startech': 'Projeto mais complexo desenvolvido durante dois anos do ensino médio. Trabalho EduTech sobre astronomia com planetas 3D, sistema de quiz, ranking de usuários, login, cadastro e diversas funcionalidades interativas.',
        'api-boas-vindas': 'API desenvolvida para envio automático de emails de boas-vindas com tema de e-commerce. O usuário cadastra nome e email, recebendo automaticamente uma mensagem personalizada de boas-vindas.',
        'api-crud': 'Primeiro CRUD completo desenvolvido para e-commerce. Sistema permite cadastrar clientes, atualizar dados, excluir registros e consultar a lista completa de clientes cadastrados no banco de dados.',
        'impressora-elgin': 'Sistema completo desenvolvido em Java para impressoras de nota fiscal Elgin. Inclui funcionalidades de impressão de notas fiscais, geração de QR codes, sinais sonoros e diversas outras funções da impressora.'
    },
    en: {
        'links': 'First project of the IT program, built as an introduction to HTML and CSS. A link-tree style page with social media links, name and information about the developer.',
        'receita': 'Second project of the program, focused on building an omelette recipe card. A deeper dive into HTML and CSS, learning positioning, table styling and new HTML tags.',
        'feedback': 'Third project of the program, introducing JavaScript. A rating system with a modal containing five stars, where the user selects the desired amount and sees the result on screen.',
        'resultados': "A result modal that displays the user's score and skills across different areas. An interface built to present results in a clear and organized way.",
        'carros': 'An interface with three cards presenting car categories: sedans, SUVs and luxury cars. Each card has a "See more" button that leads to a store where you can buy cars from these categories.',
        'login': 'A login screen built to learn how to create styled forms. Project made for the integrated high school IT program.',
        'noticias': 'A newspaper home screen project with news and headlines. It was the project with the deepest dive into JavaScript, including a side menu, mobile responsiveness and learning about positioning, UX and UI.',
        'cashflow': 'A complete website about investments built for a Math project in the integrated program. It includes light and dark mode, responsiveness, calculators, interactive charts and a quiz system.',
        'startech': 'The most complex project developed over two years of high school. An EduTech project about astronomy with 3D planets, a quiz system, user ranking, login, sign-up and several interactive features.',
        'api-boas-vindas': 'An API built to automatically send welcome emails with an e-commerce theme. The user registers their name and email and automatically receives a personalized welcome message.',
        'api-crud': 'The first complete CRUD built for e-commerce. The system allows registering customers, updating data, deleting records and querying the full list of customers stored in the database.',
        'impressora-elgin': 'A complete system built in Java for Elgin invoice printers. It includes invoice printing, QR code generation, sound signals and several other printer functions.'
    }
};
