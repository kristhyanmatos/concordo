// Front-end do Concordo. Tudo roda no navegador: nenhuma resposta é enviada ou salva.
// O DOM é montado só com textContent/createElement (nunca innerHTML).
import { CANDIDATOS, TEMAS, placar, rotulo } from './concordo.js'

const $ = (seletor) => document.querySelector(seletor)
const el = (tag, props, ...filhos) => {
  const e = Object.assign(document.createElement(tag), props)
  e.append(...filhos)
  return e
}
// Embaralhamento sem viés: chave aleatória para cada item e ordenação pela chave
const embaralhar = (lista) => lista.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x)
const sortearUm = (lista) => lista[Math.floor(Math.random() * lista.length)]
const contar = (n, palavra) => `${n} ${palavra}${n === 1 ? '' : 's'}`
const TOTAL_PARES = TEMAS.reduce((s, t) => s + t.itens.length, 0)

let rodada = []
let passo = 0
let respostas = {}

function mostrar(id) {
  for (const secao of document.querySelectorAll('main > section')) secao.hidden = secao.id !== id
  scrollTo(0, 0)
  document.querySelector(`#${id} h2[tabindex]`)?.focus()
}

function comecar() {
  // 1 par sorteado por tema; ordem dos temas e lado A/B sorteados para neutralizar efeito de ordem e de posição
  rodada = embaralhar(TEMAS.map((t) => ({ ...sortearUm(t.itens), tema: t.tema, plEhA: Math.random() < 0.5 })))
  respostas = {}
  passo = 0
  mostrarItem()
}

function mostrarItem() {
  const it = rodada[passo]
  const [a, b] = it.plEhA ? [it.pl, it.pt] : [it.pt, it.pl]
  $('#barra').style.width = `${(100 * passo) / rodada.length}%`
  $('#contador').textContent = `${passo + 1} de ${rodada.length}`
  $('#tema').textContent = it.tema
  $('#pergunta').textContent = it.pergunta
  $('#texto-a').textContent = a.texto
  $('#texto-b').textContent = b.texto
  const marcado = Object.hasOwn(respostas, it.id) ? String(it.plEhA ? respostas[it.id] : -respostas[it.id]) : null
  for (const botao of document.querySelectorAll('.escala button')) botao.setAttribute('aria-pressed', botao.dataset.v === marcado)
  $('#voltar').hidden = passo === 0
  mostrar('item')
}

$('.escala').addEventListener('click', (evento) => {
  const botao = evento.target.closest('button')
  if (!botao) return
  const v = Number(botao.dataset.v) // negativo = prefere A
  const it = rodada[passo]
  respostas[it.id] = it.plEhA ? v : -v // guardado sempre como negativo = PL, positivo = PT
  if (++passo < rodada.length) mostrarItem()
  else mostrarResultado()
})

$('#voltar').addEventListener('click', () => {
  passo -= 1
  mostrarItem()
})

function mostrarResultado() {
  const p = placar(respostas)
  // No empate, a ordem é a alfabética dos nomes
  const [x, y] = p.pt > p.pl ? ['pt', 'pl'] : ['pl', 'pt']
  $('#veredito').textContent = p.resultado === 'empate' ? 'Empate: suas escolhas ficaram no meio' : `Você concorda mais com ${rotulo(x)}`
  $('#barra-resultado').style.width = `${p[x]}%`
  $('#legenda-1').replaceChildren(el('b', { textContent: rotulo(x) }), ` ${p[x]}%`)
  $('#legenda-2').replaceChildren(el('b', { textContent: rotulo(y) }), ` ${p[y]}%`)
  $('#resumo').textContent =
    `Você preferiu as propostas de ${CANDIDATOS[x].nome} em ${contar(p.temas[x], 'tema')}, ` +
    `as de ${CANDIDATOS[y].nome} em ${contar(p.temas[y], 'tema')} e ficou neutro em ${p.temas.neutro}.`
  const naOrdemDosTemas = TEMAS.map((t) => rodada.find((it) => it.tema === t.tema))
  $('#gabarito').replaceChildren(...naOrdemDosTemas.map(gabarito))
  mostrar('resultado')
}

function gabarito(it) {
  const v = respostas[it.id]
  const preferido = v < 0 ? 'pl' : v > 0 ? 'pt' : null
  const lado = (c, letra) =>
    el(
      'div',
      { className: c === preferido ? 'proposta preferida' : 'proposta' },
      el('b', { textContent: `Proposta ${letra} · ${rotulo(c)}` }),
      `${it[c].texto} `,
      el('a', { href: `${CANDIDATOS[c].plano}#page=${it[c].pg[0]}`, target: '_blank', rel: 'noopener', textContent: `(p. ${it[c].pg.join(', ')})` }),
    )
  const [a, b] = it.plEhA ? ['pl', 'pt'] : ['pt', 'pl']
  const escolha = preferido ? `${Math.abs(v) === 2 ? 'Bem mais' : 'Um pouco mais'} ${CANDIDATOS[preferido].nome}` : 'Neutro'
  return el(
    'details',
    {},
    el('summary', {}, el('span', { className: 'tema', textContent: it.tema }), el('span', { textContent: escolha })),
    el('p', { className: 'nota', textContent: it.pergunta }),
    lado(a, 'A'),
    lado(b, 'B'),
  )
}

for (const link of document.querySelectorAll('[data-plano]')) link.href = CANDIDATOS[link.dataset.plano].plano
$('#qtd').textContent = contar(TEMAS.length, 'pergunta')
$('#nota-sorteio').textContent = `Cada rodada sorteia ${TEMAS.length} de ${TOTAL_PARES} pares de propostas, então o resultado pode variar entre rodadas.`
$('#comecar').addEventListener('click', comecar)
$('#refazer').addEventListener('click', comecar)
