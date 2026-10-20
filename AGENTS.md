# AGENTS.md — Concordo

Teste "às cegas" e apartidário de propostas eleitorais. A pessoa compara pares de propostas dos planos de governo do PL e do PT, registrados no TSE, sem saber de quem é cada uma. No fim, vê com quem concorda mais. É um site estático publicado na Vercel: nada é enviado nem salvo.

## Comandos

- `npm test` — regras do banco de propostas, placar e compatibilidade do HTML com a CSP. Tem que passar antes de qualquer commit.
- `npx vercel dev` — roda localmente com os cabeçalhos de produção. ES modules não abrem via `file://`.
- Deploy: importar o repositório na Vercel (preset Other) ou `npx vercel --prod`. Sem build e sem variáveis de ambiente.

## Arquivos

| Arquivo | Papel |
| --- | --- |
| `public/concordo.js` | Banco de propostas, links dos planos no TSE e `placar()`. |
| `public/index.html`, `public/app.js`, `public/estilo.css`, `public/icone.svg` | O site inteiro. Sem framework e sem build. |
| `public/compartilhar.png` | Imagem da prévia de link (1200×630, < 300 KB). Refaça se a frase principal mudar. |
| `vercel.json` | Pasta publicada (`public/`) e cabeçalhos de segurança (CSP etc.). |
| `teste.js` | Teste único (`npm test`). |
| `proposta-pl.pdf`, `proposta-pt.pdf` | Cópias dos planos do TSE, para conferir páginas. Não são publicadas. |

Só o que está em `public/` vai ao ar.

## Regras do conteúdo (neutralidade)

1. Toda proposta resume fielmente o plano registrado no TSE e cita a página (`pg`, numeração do leitor de PDF). Confira no PDF antes de mudar qualquer texto.
2. O texto não pode identificar o candidato: nada de nomes, siglas, nomes de programas (Bolsa Família, Pé-de-Meia, Casa Verde e Amarela...), slogans ou ataques ao adversário. O teste barra os casos mais óbvios.
3. Pares equilibrados: 12 a 28 palavras por lado, no máximo 8 de diferença entre os lados, mesmo tom, sem adjetivos de propaganda. Cada lado mostra o objetivo que o próprio plano declara.
4. Só entram pares em que os dois planos têm proposta explícita sobre o mesmo assunto. Exemplo do que ficou de fora: redução da maioridade penal, que só um dos planos trata.
5. Cada tema precisa de 2 ou mais pares (cada rodada sorteia 1 par por tema).
6. Textos de interface sempre neutros: o site é apartidário e não recomenda voto.

## Método

- Comparação pareada com escala bipolar de 5 pontos (Muito A … Muito B), guardada de −2 (prefere a proposta do PL) a +2 (prefere a do PT).
- Sorteio estratificado: 1 par por tema. A ordem dos temas e o lado A/B são sorteados a cada rodada.
- Placar: média das respostas convertida em % de proximidade (`50 + 25 × média`).
- Ordem alfabética (PL antes de PT) sempre que não houver sorteio: links, empate.

## Privacidade e lei eleitoral

- O site não coleta nada: sem envio de respostas, cookies, analytics, fontes ou scripts de terceiros.
- Não adicione coleta de respostas sem revisar a LGPD e a lei eleitoral. Durante a campanha, enquetes que permitam inferir a ordem dos candidatos são proibidas (Lei 9.504/97, art. 33, §5º).

## Segurança (OWASP Top 10:2025, aplicado a um site estático)

- **A01 Controle de acesso:** só `public/` é publicado; não há rotas, dados nem área administrativa.
- **A02 Configuração:** CSP estrita no `vercel.json` (`default-src 'none'`, sem script ou estilo inline), `nosniff`, `frame-ancestors 'none'`, `Referrer-Policy: no-referrer`.
- **A03 Cadeia de suprimentos:** zero dependências npm e nenhuma CDN. Adicionar dependência exige justificativa forte e versão fixa.
- **A05 Injeção (XSS):** DOM montado só com `textContent`/`createElement`, nunca `innerHTML`. O teste barra script inline, `style=` e `on*=` no HTML.
- **A06 Design inseguro:** sem coleta de dados, não há o que vazar nem fraudar.
- **A08 Integridade:** nada é carregado de terceiros; todo código é servido pela própria origem.
- **A04, A07, A09, A10:** sem segredos, autenticação ou servidor neste projeto. Se um dia houver backend, retome esses itens.

## Estilo de código

- Nomes e textos em português; ES modules; sem build e sem transpilação.
- 2 espaços, aspas simples, sem ponto e vírgula, funções pequenas.
- Comentário só para explicar o porquê, não o quê.

## Visual

- Editorial, "papel e tinta": fundo creme, texto em tinta escura e sépia como único acento. Tema claro único.
- Nenhuma cor que lembre partido (vermelho, azul, verde-amarelo). Nada de degradês, sombras difusas, roxo ou ícones decorativos: eles dão cara de template.
- Serifada do sistema nos títulos e nas propostas; sem serifa só em rótulos, botões e números de interface. Nenhuma fonte externa (a CSP não permite).
- Prévia de link: as tags Open Graph do `index.html` precisam de URL absoluta. O teste confere as tags e o peso da imagem.
