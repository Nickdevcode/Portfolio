document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarLogoHome = document.getElementById('sidebar-logo-home');
    
    function abrirMenu() {
        sidebarMenu.classList.add('active');
        menuOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function fecharMenu() {
        sidebarMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navegarParaSecao(linkText, sectionId) {
        const section = sectionId || linkText.toLowerCase();
        
        if (section === 'home' || linkText === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetSection = document.getElementById(section);
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
        
        if (window.innerWidth <= 1024) {
            fecharMenu();
        }
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (sidebarMenu.classList.contains('active')) {
                fecharMenu();
            } else {
                abrirMenu();
            }
        });
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', fecharMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', fecharMenu);
    }
    
    if (sidebarLogoHome) {
        sidebarLogoHome.addEventListener('click', function(e) {
            e.preventDefault();
            navegarParaSecao('', 'home');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section') || this.getAttribute('href').substring(1);
            navegarParaSecao('', sectionId);
        });
    });
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section') || this.getAttribute('href').substring(1);
            navegarParaSecao('', sectionId);
        });
    });

    const logoHome = document.getElementById('logo-home');
    if (logoHome) {
        logoHome.addEventListener('click', function(e) {
            e.preventDefault();
            navegarParaSecao('', 'home');
        });
    }

    const contactButton = document.getElementById('btn-conversar');
    const downloadCv = document.getElementById('btn-download-cv');
    const modalContato = document.getElementById('modal-contato');
    const modalCv = document.getElementById('modal-cv');
    const closeModalContato = document.getElementById('close-modal-contato');
    const closeModalCv = document.getElementById('close-modal-cv');

    function abrirModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function fecharModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (contactButton) {
        contactButton.addEventListener('click', function() {
            abrirModal(modalContato);
        });
    }

    if (downloadCv) {
        downloadCv.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal(modalCv);
        });
    }

    if (closeModalContato) {
        closeModalContato.addEventListener('click', function() {
            fecharModal(modalContato);
        });
    }

    if (closeModalCv) {
        closeModalCv.addEventListener('click', function() {
            fecharModal(modalCv);
        });
    }

    if (modalContato) {
        modalContato.addEventListener('click', function(e) {
            if (e.target === modalContato) {
                fecharModal(modalContato);
            }
        });
    }

    const btnEmail = document.getElementById('btn-email');
    if (btnEmail) {
        btnEmail.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const email = 'nickcarva31@gmail.com';
            
            navigator.clipboard.writeText(email).then(function() {
                const originalText = this.querySelector('span').textContent;
                const originalIcon = this.querySelector('i').className;
                this.querySelector('span').textContent = 'E-mail copiado!';
                this.querySelector('i').className = 'fas fa-check';
                
                setTimeout(() => {
                    this.querySelector('span').textContent = originalText;
                    this.querySelector('i').className = originalIcon;
                    fecharModal(modalContato);
                }, 2500);
            }.bind(this)).catch(function() {
                alert('E-mail: ' + email + '\n\nPor favor, copie manualmente.');
                fecharModal(modalContato);
            });
        });
    }

    const anoAtual = document.getElementById('ano-atual');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    const btnCopyEmail = document.getElementById('btn-copy-email');
    if (btnCopyEmail) {
        btnCopyEmail.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const email = 'nickcarva31@gmail.com';
            
            navigator.clipboard.writeText(email).then(function() {
                const originalIcon = this.querySelector('i').className;
                this.querySelector('i').className = 'fas fa-check';
                
                setTimeout(() => {
                    this.querySelector('i').className = originalIcon;
                }, 2000);
            }.bind(this)).catch(function() {
                alert('E-mail: ' + email + '\n\nPor favor, copie manualmente.');
            });
        });
    }

    const voltarTopo = document.getElementById('voltar-topo');
    if (voltarTopo) {
        voltarTopo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (modalCv) {
        modalCv.addEventListener('click', function(e) {
            if (e.target === modalCv) {
                fecharModal(modalCv);
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fecharModal(modalContato);
            fecharModal(modalCv);
            if (sidebarMenu && sidebarMenu.classList.contains('active')) {
                fecharMenu();
            }
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024 && sidebarMenu.classList.contains('active')) {
            fecharMenu();
        }
    });
    
    function atualizarLinkAtivo(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
            if (linkSection === sectionId) {
                link.classList.add('active');
            }
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
            if (linkSection === sectionId) {
                link.classList.add('active');
            }
        });
    }
    
    function detectarSecaoAtiva() {
        const sections = [
            { id: 'home', element: document.getElementById('home') },
            { id: 'sobre', element: document.getElementById('sobre') },
            { id: 'portfolio', element: document.getElementById('portfolio') },
            { id: 'skills', element: document.getElementById('skills') },
            { id: 'carreira', element: document.getElementById('carreira') },
            { id: 'contato', element: document.getElementById('contato') }
        ].filter(s => s.element !== null);
        
        if (sections.length === 0) return;
        
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const offset = windowHeight / 3;
        let activeSection = 'home';
        
        if (scrollPosition < sections[0].element.offsetTop - offset) {
            activeSection = 'home';
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.element) {
                    const sectionTop = section.element.offsetTop;
                    const sectionBottom = sectionTop + section.element.offsetHeight;
                    
                    if (scrollPosition + offset >= sectionTop && scrollPosition < sectionBottom) {
                        activeSection = section.id;
                        break;
                    }
                }
            }
        }
        
        atualizarLinkAtivo(activeSection);
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(detectarSecaoAtiva, 10);
    });
    
    detectarSecaoAtiva();

    const projetos = [
        {
            id: 'links',
            titulo: 'Links',
            categoria: 'front-end',
            descricao: 'Primeiro projeto do curso de TI, desenvolvido como introdução ao HTML e CSS. Uma página estilo link tree com links das redes sociais, nome e informações sobre o desenvolvedor.',
            tecnologias: ['HTML', 'CSS'],
            preview: 'projetos/Links.mp4',
            tipoPreview: 'video',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Meus-Links',
            projeto: 'https://links-nicolas-carvalho-12b-tarde.vercel.app/'
        },
        {
            id: 'receita',
            titulo: 'Receita',
            categoria: 'front-end',
            descricao: 'Segundo projeto do curso, focado na criação de um card de receita de omelete. Aprofundamento em HTML e CSS com aprendizado de posicionamentos, estilização de tabelas e novas tags HTML.',
            tecnologias: ['HTML', 'CSS'],
            preview: 'projetos/Receita.mp4',
            tipoPreview: 'video',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Receita',
            projeto: 'https://receita-nicolas-carvalho-nascimento-12b.vercel.app/'
        },
        {
            id: 'feedback',
            titulo: 'Feedback',
            categoria: 'front-end',
            descricao: 'Terceiro projeto do curso com introdução ao JavaScript. Sistema de avaliação com modal contendo cinco estrelas, onde o usuário seleciona a quantidade desejada e visualiza o resultado na tela.',
            tecnologias: ['HTML', 'CSS', 'JavaScript'],
            preview: 'projetos/Feedback.mp4',
            tipoPreview: 'video',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Feedback',
            projeto: 'https://feedback-nicolas-carvalho-12b-ti-tarde.vercel.app/'
        },
        {
            id: 'resultados',
            titulo: 'Resultados',
            categoria: 'front-end',
            descricao: 'Modal de resultado que exibe o score e habilidades do usuário em diferentes áreas. Interface desenvolvida para apresentar resultados de forma clara e organizada.',
            tecnologias: ['HTML', 'CSS'],
            preview: 'projetos/Resultados.jpeg',
            tipoPreview: 'imagem',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Resultados',
            projeto: 'https://resultados-nicolascarvalho12b.vercel.app/'
        },
        {
            id: 'carros',
            titulo: 'Carros',
            categoria: 'front-end',
            descricao: 'Interface com três cards apresentando categorias de carros: sedãs, SUVs e luxuosos. Cada card possui botão "Ver mais" que direciona para uma loja onde é possível comprar carros dessas categorias.',
            tecnologias: ['HTML', 'CSS'],
            preview: 'projetos/Carros.mp4',
            tipoPreview: 'video',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Carros',
            projeto: 'https://carros-amber.vercel.app/'
        },
        {
            id: 'login',
            titulo: 'Login',
            categoria: 'front-end',
            descricao: 'Tela de login desenvolvida para aprendizado de criação de formulários estilizados. Projeto realizado para o curso integrado de TI do ensino médio.',
            tecnologias: ['HTML', 'CSS', 'JavaScript'],
            preview: 'projetos/Login.jpeg',
            tipoPreview: 'imagem',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/projeto-vertigo',
            projeto: 'https://vertigo-nicolas-carvalho12b.netlify.app/'
        },
        {
            id: 'noticias',
            titulo: 'Notícias',
            categoria: 'front-end',
            descricao: 'Projeto de tela inicial de jornal com notícias e manchetes. Foi o projeto com maior aprofundamento em JavaScript, incluindo menu lateral, responsividade mobile e aprendizado de posicionamento, UX e UI.',
            tecnologias: ['HTML', 'CSS', 'JavaScript'],
            preview: 'projetos/Noticias.jpeg',
            tipoPreview: 'imagem',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/Noticias',
            projeto: 'https://noticias-nicolascarvalho22b.vercel.app/'
        },
        {
            id: 'cashflow',
            titulo: 'Cashflow',
            categoria: 'full-stack',
            descricao: 'Site completo sobre investimentos desenvolvido para projeto de Matemática do curso integrado. Inclui modo claro e escuro, responsividade, calculadoras, gráficos interativos e sistema de quiz.',
            tecnologias: ['HTML', 'CSS', 'JavaScript'],
            preview: 'projetos/Cashflow.mp4',
            tipoPreview: 'video',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/CashFlow',
            projeto: 'https://cashflowxyz.vercel.app/'
        },
        {
            id: 'startech',
            titulo: 'Startech',
            categoria: 'full-stack',
            descricao: 'Projeto mais complexo desenvolvido durante dois anos do ensino médio. Trabalho EduTech sobre astronomia com planetas 3D, sistema de quiz, ranking de usuários, login, cadastro e diversas funcionalidades interativas.',
            tecnologias: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
            preview: 'projetos/Startech.mp4',
            tipoPreview: 'video',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/StarTech',
            projeto: 'https://startechgg.vercel.app/'
        },
        {
            id: 'api-boas-vindas',
            titulo: 'API de boas-vindas',
            categoria: 'back-end',
            descricao: 'API desenvolvida para envio automático de emails de boas-vindas com tema de e-commerce. O usuário cadastra nome e email, recebendo automaticamente uma mensagem personalizada de boas-vindas.',
            tecnologias: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express'],
            preview: 'projetos/API_EMAIL.mp4',
            tipoPreview: 'video',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/APIwelcome',
            projeto: '#'
        },
        {
            id: 'api-crud',
            titulo: 'API CRUD e-commerce',
            categoria: 'back-end',
            descricao: 'Primeiro CRUD completo desenvolvido para e-commerce. Sistema permite cadastrar clientes, atualizar dados, excluir registros e consultar a lista completa de clientes cadastrados no banco de dados.',
            tecnologias: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
            preview: 'projetos/API_CRUD_Ecormmece.mp4',
            tipoPreview: 'video',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/API_CRUD',
            projeto: '#'
        },
        {
            id: 'impressora-elgin',
            titulo: 'Sistema para impressoras de nota fiscal Elgin',
            categoria: 'back-end',
            descricao: 'Sistema completo desenvolvido em Java para impressoras de nota fiscal Elgin. Inclui funcionalidades de impressão de notas fiscais, geração de QR codes, sinais sonoros e diversas outras funções da impressora.',
            tecnologias: ['Java'],
            preview: 'projetos/impressora_elgin.jpg',
            tipoPreview: 'imagem',
            repositorio: 'https://github.com/Nicolas-Carvalho-22B-UNASP/ImpressoraNF',
            projeto: '#'
        }
    ];

    const portfolioGrid = document.getElementById('portfolio-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modalProjeto = document.getElementById('modal-projeto');
    const closeModalProjeto = document.getElementById('close-modal-projeto');
    const modalProjetoContent = document.getElementById('modal-projeto-content');
    const verMaisProjetos = document.getElementById('ver-mais-projetos');
    let filtroAtivo = 'todos';
    let projetosVisiveis = 8;
    const projetosPorPagina = 8;

    function obterClasseTag(tecnologia) {
        const tags = {
            'HTML': 'html',
            'CSS': 'css',
            'JavaScript': 'javascript',
            'Node.js': 'nodejs',
            'Express': 'express',
            'MySQL': 'mysql',
            'Java': 'java'
        };
        return tags[tecnologia] || '';
    }

    function criarCardProjeto(projeto) {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.setAttribute('data-categoria', projeto.categoria);
        card.setAttribute('data-id', projeto.id);

        const temOnline = (projeto.categoria === 'front-end' || projeto.categoria === 'full-stack') && projeto.projeto !== '#';
        const tagsHTML = projeto.tecnologias.map(tech => {
            const classe = obterClasseTag(tech);
            return `<span class="card-tag ${classe}">${tech}</span>`;
        }).join('');

        const previewHTML = projeto.tipoPreview === 'video' 
            ? `<video class="preview-media" autoplay loop muted playsinline>
                <source src="${projeto.preview}" type="video/mp4">
            </video>`
            : `<img src="${projeto.preview}" alt="${projeto.titulo}" class="preview-media">`;

        card.innerHTML = `
            <h3 class="card-title">${projeto.titulo}</h3>
            <p class="card-description">${projeto.descricao}</p>
            <div class="card-tags">
                ${temOnline ? '<span class="card-tag online">Online</span>' : ''}
                ${tagsHTML}
            </div>
            <div class="card-preview">
                ${previewHTML}
            </div>
        `;

        card.addEventListener('click', () => abrirModalProjeto(projeto));
        return card;
    }

    function renderizarProjetos() {
        if (!portfolioGrid) return;

        portfolioGrid.innerHTML = '';

        let projetosFiltrados;
        
        if (filtroAtivo === 'todos') {
            projetosFiltrados = projetos;
        } else if (filtroAtivo === 'full-stack') {
            projetosFiltrados = projetos.filter(p => 
                p.categoria === 'full-stack' || 
                p.categoria === 'back-end' ||
                (p.categoria === 'front-end' && p.tecnologias.includes('JavaScript'))
            );
        } else {
            projetosFiltrados = projetos.filter(p => p.categoria === filtroAtivo);
        }

        const projetosParaMostrar = projetosFiltrados.slice(0, projetosVisiveis);

        projetosParaMostrar.forEach(projeto => {
            const card = criarCardProjeto(projeto);
            portfolioGrid.appendChild(card);
        });

        if (projetosFiltrados.length > projetosVisiveis) {
            verMaisProjetos.style.display = 'flex';
        } else {
            verMaisProjetos.style.display = 'none';
        }
    }

    function atualizarFiltros() {
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filtroAtivo) {
                btn.classList.add('active');
            }
        });
    }

    function abrirModalProjeto(projeto) {
        if (!modalProjeto || !modalProjetoContent) return;

        const tagsHTML = projeto.tecnologias.map(tech => {
            const classe = obterClasseTag(tech);
            return `<span class="card-tag ${classe}">${tech}</span>`;
        }).join('');

        const previewHTML = projeto.tipoPreview === 'video'
            ? `<video class="preview-media" controls>
                <source src="${projeto.preview}" type="video/mp4">
            </video>`
            : `<img src="${projeto.preview}" alt="${projeto.titulo}" class="preview-media">`;

        modalProjetoContent.innerHTML = `
            <div class="projeto-modal-header">
                <h2 class="projeto-modal-title">${projeto.titulo}</h2>
                <p class="projeto-modal-description">${projeto.descricao}</p>
                <div class="projeto-modal-tags">
                    ${tagsHTML}
                </div>
            </div>
            <div class="projeto-modal-preview">
                ${previewHTML}
            </div>
            <div class="projeto-modal-actions">
                <a href="${projeto.repositorio}" target="_blank" rel="noopener noreferrer" class="projeto-modal-btn repositorio">
                    <i class="fab fa-github"></i>
                    <span>Repositório</span>
                </a>
                ${projeto.projeto !== '#' ? `
                <a href="${projeto.projeto}" target="_blank" rel="noopener noreferrer" class="projeto-modal-btn projeto">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Ver Projeto</span>
                </a>
                ` : ''}
            </div>
        `;

        modalProjeto.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function fecharModalProjeto() {
        if (modalProjeto) {
            modalProjeto.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filtroAtivo = this.getAttribute('data-filter');
                projetosVisiveis = projetosPorPagina;
                atualizarFiltros();
                renderizarProjetos();
            });
        });
    }

    if (closeModalProjeto) {
        closeModalProjeto.addEventListener('click', fecharModalProjeto);
    }

    if (modalProjeto) {
        modalProjeto.addEventListener('click', function(e) {
            if (e.target === modalProjeto) {
                fecharModalProjeto();
            }
        });
    }

    if (verMaisProjetos) {
        verMaisProjetos.addEventListener('click', function(e) {
            e.preventDefault();
            let projetosFiltrados;
            
            if (filtroAtivo === 'todos') {
                projetosFiltrados = projetos;
            } else if (filtroAtivo === 'full-stack') {
                projetosFiltrados = projetos.filter(p => 
                    p.categoria === 'full-stack' || 
                    p.categoria === 'back-end' ||
                    (p.categoria === 'front-end' && p.tecnologias.includes('JavaScript'))
                );
            } else {
                projetosFiltrados = projetos.filter(p => p.categoria === filtroAtivo);
            }
            
            if (projetosVisiveis < projetosFiltrados.length) {
                projetosVisiveis += projetosPorPagina;
                renderizarProjetos();
            } else {
                this.style.display = 'none';
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalProjeto && modalProjeto.classList.contains('active')) {
            fecharModalProjeto();
        }
    });

    renderizarProjetos();
});

