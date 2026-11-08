# 🟠 Portfólio · Nicolas Carvalho

Meu portfólio pessoal: quem eu sou, o que eu construo e como falar comigo. No ar em **[portnick.vercel.app](https://portnick.vercel.app)**.

Feito em **HTML, CSS e JavaScript puros**, sem framework e sem etapa de build. Abre rápido, pesa pouco e funciona em português e inglês, no claro e no escuro.

---

## 🎨 A linguagem visual

A ideia é um **cartaz impresso em risografia**: papel, tinta preta e uma única cor de destaque, o laranja-sinal. Nada de gradiente roxo nem de "cara de template".

| Peça | O que faz |
|---|---|
| ✒️ **Marca NC** | Uma ligadura desenhada num grid 100×100: a haste do meio é das duas letras (fecha o N e é a lombada do C, front e back numa peça só), e as pontas do C são cortadas no mesmo ângulo da diagonal do N. N em preto, C em laranja por cima; no hover o laranja sai de registro. |
| 🖨️ **Duas tintas fora de registro** | A regra que amarra a identidade: tudo é "impresso" em preto + laranja levemente desalinhados. Vale pra marca, pro nome no hero e pro retrato. |
| 📷 **Retrato** | A foto fica nítida (P&B) e a segunda tinta é uma retícula laranja atrás dela, a 15°. O cursor funciona como luz: a "sombra" laranja foge dele e os pontos por perto incham. |
| 🔠 **Tipografia condensada** | Mona Sans no eixo de largura mais estreito (75%) e peso black nos títulos; Martian Mono nos rótulos. |
| 🖍️ **Marca-texto** | Os trechos-chave do "Sobre" são pintados de laranja quando entram na tela. |
| ⌨️ **Teclado de skills** | Cada tecnologia é uma tecla que afunda no clique e revela a cor da marca no hover. As categorias são teclas laranja de destaque, e o teclado de verdade de quem visita também aperta as teclas (J afunda JavaScript e Java). |
| 📅 **Linha do tempo viva** | O marcador "hoje" é calculado pela data atual, então a carreira se atualiza sozinha. |

### Design system (tudo em `css/tokens.css`)

| Token | Valor |
|---|---|
| Papel / tinta (claro) | `#f0f0ec` / `#131417` |
| Papel / tinta (escuro) | `#111215` / `#eeeee9` |
| Destaque | `#ff5a1f` (claro) · `#ff6b35` (escuro) |
| Raios | interativo = pílula · painel = 12px · tecla = 10px |
| Fontes | Mona Sans (variável, largura 75–125%) + Martian Mono, auto-hospedadas |

---

## 🗂️ Estrutura

```
├── index.html              → todas as seções (Início, Sobre, Projetos, Skills, Carreira, Contato)
├── vercel.json             → headers de segurança (CSP) e cache
├── css/
│   ├── tokens.css          → cores, tipo, espaço, raios, movimento, temas
│   ├── base.css            → reset, tipografia base, revelação ao rolar
│   ├── layout.css          → cabeçalho, navegação, menu do celular, rodapé
│   ├── componentes.css     → botões, tags, filtros, menu do CV, modal
│   └── secoes.css          → o visual de cada seção
├── js/
│   ├── tema-inicial.js     → aplica o tema antes da primeira pintura (sem piscar)
│   ├── main.js             → ponto de entrada (cada módulo isolado)
│   ├── dados/projetos.js   → catálogo de projetos ⭐
│   ├── dados/traducoes.js  → todos os textos PT/EN ⭐
│   └── *.js                → i18n, tema, navegação, retrato, projetos, teclado...
├── assets/                 → currículos, fontes, sprite de ícones, imagem social
├── img/                    → foto original, recorte P&B (retrato-recorte.webp) e a fonte da retícula
└── projetos/               → vídeos/imagens originais + prévias leves e capas
```

---

## 💻 Rodando no seu PC

Precisa de um servidor local (os módulos JS não rodam abrindo o arquivo direto):

```bash
npx serve -l 4173 .
```

Depois é só abrir **http://localhost:4173**.

---

## ➕ Adicionando um projeto novo

1. **Mídia**: coloque o vídeo/imagem original em `projetos/` e gere a capa e a prévia leve:

   ```bash
   # capa (960px, webp)
   ffmpeg -ss 2 -i projetos/MeuProjeto.mp4 -frames:v 1 -vf "scale=960:-2" -c:v libwebp -quality 78 projetos/capas/meu-projeto.webp
   # prévia em loop (10s, sem áudio)
   ffmpeg -ss 2 -t 10 -i projetos/MeuProjeto.mp4 -an -vf "scale=960:-2,fps=24" -c:v libx264 -crf 30 -pix_fmt yuv420p -movflags +faststart projetos/previas/meu-projeto.mp4
   ```

2. **Dados**: adicione um objeto em `js/dados/projetos.js`. A **ordem importa**: os 3 primeiros viram destaque com vídeo.
3. **Textos**: adicione `titulo`, `resumo` e `descricao` com o mesmo `id` em `js/dados/traducoes.js`, nos **dois idiomas**.

Pronto, o filtro, o índice, o modal e a contagem se ajustam sozinhos. ✨

---

## ✅ Qualidade

| Checagem | Resultado |
|---|---|
| ♿ Acessibilidade (axe-core, WCAG 2.1 AA, claro e escuro) | 0 violações |
| 🛡️ Content Security Policy do `vercel.json` | 0 violações (nada carregado de fora) |
| ⚡ Peso da primeira visita | ~400 KB (vídeos só carregam quando aparecem na tela) |
| 📱 Celular simulado com CPU 4× mais lenta | LCP ~2,4 s · CLS 0 |
| 🎞️ `prefers-reduced-motion` | sem animação, tudo visível, faixa vira lista |
| 🌐 Sem JavaScript | conteúdo inteiro aparece (as animações só escondem algo quando o JS liga) |

---

## 🚀 Deploy

O projeto está ligado à Vercel pelo GitHub: **todo push na `main` publica sozinho** em [portnick.vercel.app](https://portnick.vercel.app). Não tem build, a Vercel só serve os arquivos estáticos com os headers do `vercel.json`.

---

## 📜 Créditos

- Ícones de interface: [Phosphor Icons](https://phosphoricons.com) (MIT)
- Logos de tecnologia: [Devicon](https://devicon.dev) (MIT)
- Fontes: [Mona Sans](https://github.com/github/mona-sans) e [Martian Mono](https://github.com/evilmartians/mono) (SIL Open Font License)
