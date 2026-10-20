# Concordo

**Escolha propostas, não nomes.** Um teste apartidário de 12 perguntas, uma por tema. Em cada uma, a pessoa compara duas propostas dos candidatos à Presidência (PL e PT) sem saber de quem é cada uma. No final, descobre com quem mais concorda e vê de quem era cada proposta, com a página do plano de governo.

Todas as propostas foram resumidas dos planos de governo registrados no TSE: [plano do PL](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pl/@@display-file/file/proposta-pl.pdf) · [plano do PT](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pt/@@display-file/file/proposta-pt.pdf). Os PDFs na raiz deste repositório são cópias, só para conferência.

## Como funciona

1. O banco tem 32 pares de propostas em 12 temas. Cada rodada sorteia 1 par por tema, então quem refaz o teste vê propostas diferentes.
2. Para cada par, a pessoa responde numa escala de 5 pontos: *Muito A · Um pouco A · Neutro · Um pouco B · Muito B*.
3. O resultado mostra a proximidade com cada candidato e o gabarito, com links para as páginas dos planos.

**Por que escala e não só A/B?** O A/B obriga a escolher mesmo quando a pessoa não tem preferência, e uma preferência fraca pesa igual a uma forte. Dar nota a cada proposta separadamente dobraria o tamanho do teste e puxa o viés de concordar com tudo. A comparação com intensidade é curta e mede melhor.

## Privacidade

Tudo roda no navegador: nenhuma resposta é enviada ou salva. O site não usa cookies, analytics nem scripts de terceiros.

## Publicar na Vercel

É um site estático, sem build, sem banco e sem variáveis de ambiente. O `vercel.json` já define a pasta `public/` e os cabeçalhos de segurança.

1. Suba este repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. Deixe o Framework Preset como **Other** e clique em **Deploy**.

Pelo terminal também funciona: `npx vercel` cria um preview e `npx vercel --prod` publica.

### Prévia no WhatsApp

O link compartilhado mostra título, descrição e a imagem `public/compartilhar.png` (1200×630). O WhatsApp exige endereço absoluto, e o `index.html` usa `https://concordo.vercel.app`. Se o seu domínio for outro, troque esse endereço nas tags `canonical`, `og:url` e `og:image`.

O WhatsApp guarda a prévia em cache. Para testar depois de mudar algo, compartilhe o link com um parâmetro novo, como `?v=2`.

## Rodar localmente

O front-end usa ES modules, então precisa ser servido por HTTP. Abrir o `index.html` direto do disco não funciona.

```bash
npx vercel dev   # aplica os mesmos cabeçalhos da produção
npm test         # regras do banco de propostas, placar e CSP
```

Uma alternativa é a extensão Live Server do VS Code apontando para `public/`.

## Aviso

Resumir sempre simplifica: cada proposta cita a página do PDF original para quem quiser conferir. Não é recomendação de voto.

Para desenvolver, veja o [AGENTS.md](AGENTS.md).
