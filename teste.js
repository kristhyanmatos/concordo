// Teste do Concordo: regras do banco de propostas, placar e compatibilidade com a CSP. Rode com `npm test`.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { CANDIDATOS, TEMAS, placar } from './public/concordo.js'

// 1. Banco de propostas: neutralidade e fontes (regras do AGENTS.md)
const PAGINAS_DO_PDF = { pl: 77, pt: 85 }
const IDENTIFICA = /\b(Lula|Bolsonaro|Flávio|PT|PL|Bolsa Família|Pé-de-Meia|Casa Verde e Amarela|Minha Casa Minha Vida|Mais Médicos|Farmácia Popular|Novo PAC|Desenrola|Tesouraço)\b/
const palavras = (texto) => texto.split(/\s+/).length
const ids = TEMAS.flatMap((t) => t.itens.map((it) => it.id))
assert.equal(new Set(ids).size, ids.length, 'ids repetidos')
for (const t of TEMAS) {
  assert.ok(t.itens.length >= 2, `${t.tema}: cada tema precisa de 2+ pares para o sorteio`)
  for (const it of t.itens) {
    for (const c of ['pl', 'pt']) {
      const { texto, pg } = it[c]
      assert.doesNotMatch(texto, IDENTIFICA, `${it.id}/${c}: texto identifica o candidato`)
      assert.ok(palavras(texto) >= 12 && palavras(texto) <= 28, `${it.id}/${c}: ${palavras(texto)} palavras (use 12 a 28)`)
      assert.ok(pg.length && pg.every((n) => Number.isInteger(n) && n >= 1 && n <= PAGINAS_DO_PDF[c]), `${it.id}/${c}: página inválida`)
    }
    assert.ok(Math.abs(palavras(it.pl.texto) - palavras(it.pt.texto)) <= 8, `${it.id}: lados muito desiguais em tamanho`)
  }
}
for (const c of ['pl', 'pt']) assert.match(CANDIDATOS[c].plano, /^https:\/\/www\.tse\.jus\.br\//, `${c}: a fonte tem que ser o TSE`)

// 2. Placar (valores conferidos à mão)
assert.deepEqual(placar({ a: 2, b: -1 }), { pt: 63, pl: 37, temas: { pl: 1, pt: 1, neutro: 0 }, resultado: 'pt' })
assert.equal(placar({ a: 1, b: -1 }).resultado, 'empate')
assert.equal(placar({ a: -2, b: -2 }).pl, 100)

// 3. A CSP do vercel.json bloqueia script e estilo inline: o HTML não pode depender deles
const html = readFileSync(new URL('./public/index.html', import.meta.url), 'utf8')
assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)[^>]*>/, 'script inline quebra com a CSP')
assert.doesNotMatch(html, /<style|\sstyle=|\son[a-z]+=/i, 'estilo inline ou onclick quebram com a CSP')
// 4. Prévia no WhatsApp: tags Open Graph com URL absoluta e imagem leve com as dimensões declaradas
const meta = (prop) => html.match(new RegExp(`<meta property="${prop}" content="([^"]+)"`))?.[1]
for (const prop of ['og:title', 'og:description', 'og:url', 'og:image']) assert.ok(meta(prop), `${prop} ausente`)
assert.match(meta('og:url'), /^https:\/\//, 'og:url precisa ser absoluta')
assert.match(meta('og:image'), /^https:\/\/.+\/compartilhar\.png$/, 'og:image precisa ser absoluta')
const imagem = readFileSync(new URL('./public/compartilhar.png', import.meta.url))
assert.ok(imagem.length < 300_000, 'imagem de prévia acima de 300 KB (o WhatsApp pode ignorar)')
assert.deepEqual([imagem.readUInt32BE(16), imagem.readUInt32BE(20)], [Number(meta('og:image:width')), Number(meta('og:image:height'))])

const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
const csp = vercel.headers[0].headers.find((h) => h.key === 'Content-Security-Policy').value
assert.match(csp, /default-src 'none'/)
assert.match(csp, /script-src 'self'/)

console.log('ok: todos os testes passaram')
