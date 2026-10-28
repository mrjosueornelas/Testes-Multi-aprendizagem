import { QUESTIONS } from '../data/questions.js';
import { MODES, MODE_COLORS, SKILLS, SKILL_EMOJI, DESCRIPTIONS, ACTIVITIES, SKILL_TASKS, TECHNICAL_NOTE } from '../data/catalog.js';
import { escapeHtml, mean, normalizedIndex, formatMean, formatPercent } from '../core/format.js';
import { summarize } from '../core/analysis.js';
import { renderPie, renderBar, skillColor } from './charts.js';
const reportEl = id => document.getElementById(id);
/** Constrói o relatório completo a partir de um estado pronto para avaliação. */
export function renderReport({ answers, followups, student, age, education }) {
  const summary = summarize(answers, followups);
  const { modes, skills } = summary;
  reportEl('reportName').textContent = student;
  reportEl('reportMeta').textContent = `Idade: ${age} anos · Formação: ${education} · Emitido em ${new Date().toLocaleDateString('pt-BR')}`;
  reportEl('kpis').innerHTML = `
    <div class="kpi"><b>${summary.validCount}/25</b><small>Respostas válidas</small></div>
    <div class="kpi"><b>${summary.followupCount}</b><small>Complementares respondidas</small></div>
    <div class="kpi"><b>${summary.highest ? escapeHtml(summary.highest.name) : '—'}</b><small>Maior média · ${summary.highest ? formatMean(summary.highest.mean) : '—'}</small></div>
    <div class="kpi"><b>${summary.lowest ? escapeHtml(summary.lowest.name) : '—'}</b><small>Menor média · ${summary.lowest ? formatMean(summary.lowest.mean) : '—'}</small></div>`;
  reportEl('overall').textContent = `Média geral das respostas: ${formatMean(summary.average)} de 4 · ${formatPercent(normalizedIndex(summary.average))} (índice normalizado).`;
  reportEl('modePie').innerHTML = renderPie(modes);
  reportEl('modeLegend').innerHTML = modes.map((m, i) => `<div class="legenditem"><span class="swatch" style="background:${MODE_COLORS[i]}"></span><span><b>${escapeHtml(m.name)}</b> — ${formatPercent(m.share)} · média ${formatMean(m.mean)}</span></div>`).join('');
  reportEl('modeBars').innerHTML = modes.map((m, i) => renderBar(m.name, m.index, MODE_COLORS[i])).join('');
  reportEl('skillsBars').innerHTML = SKILLS.map(s => {
    const d = skills[s];
    return renderBar(`${SKILL_EMOJI[s]} ${s}`, d.index, d.index === null ? '#aebbc7' : skillColor(d.index)) +
      `<p class="muted skill-help">${d.index === null ? 'Sem evidência direta suficiente para estimar um índice.' : `${d.count} item(ns) direto(s) · índice de autorrelato, não proficiência.`}</p>`;
  }).join('');
  reportEl('modeRubrics').innerHTML = modes.map((m, i) => renderModeRubric(m, i, answers, followups)).join('');
  reportEl('skillRubrics').innerHTML = SKILLS.map(s => renderSkillRubric(s, skills[s])).join('');
  reportEl('technical').innerHTML = `<p>Este relatório descreve padrões de concordância, recursos relatados e hipóteses para a conversa entre estudante e professor. As perguntas condicionais qualificam a interpretação; elas não são convertidas automaticamente em pontos de proficiência. A leitura pedagógica deve considerar experiências anteriores, objetivos e tarefas observáveis.</p>
    <p><b>Como ler os percentuais:</b> o gráfico de pizza apresenta a participação de cada média na soma das médias válidas, totalizando 100%. As barras dos modos normalizam médias da escala de 1 a 4 por (média − 1) ÷ 3 × 100. As barras das quatro habilidades usam somente itens diretos pertinentes; quando não há evidência suficiente, não é apresentado índice. As faixas de cor são convenções visuais internas, não normas científicas nem níveis CEFR.</p>
    <p><b>Encaminhamento pedagógico:</b> selecionar duas prioridades a partir das necessidades percebidas, realizar tarefas breves de verificação e discutir os resultados com o estudante antes de definir estratégias de ensino.</p>
    <p><b>Nota técnica:</b> ${escapeHtml(TECHNICAL_NOTE.replace(/^Nota técnica:\s*/, ''))}</p>`;
  reportEl('responses').innerHTML = QUESTIONS.map((q, i) => {
    const labels = ['Não vivenciei', 'Discordo totalmente', 'Discordo parcialmente', 'Concordo parcialmente', 'Concordo totalmente'];
    const a = answers[i];
    return `<tr><td>${i + 1}</td><td>${escapeHtml(q.mode)}</td><td>${escapeHtml(q.text)}</td><td>${a == null ? '—' : labels[a]} ${a === 0 || a == null ? '' : `(${a}/4)`}</td><td>${followups[i]?.length ? followups[i].map(idx => escapeHtml(q.options[idx])).join(' / ') : '—'}</td></tr>`;
  }).join('');
}
/** Rubrica de modalidade: fundo azul para favoráveis, amarelo para investigar. */
export function renderModeRubric(mode, colorIndex, answers, followups) {
  const items = QUESTIONS.map((q, index) => ({ q, index, answer: answers[index] }))
    .filter(x => x.q.mode === mode.name && x.answer > 0);
  const favorable = items.filter(x => x.answer >= 3).map(x => `Q${x.index + 1}: concordância com “${x.q.text}”`);
  const needs = items.filter(x => x.answer <= 2).map(x => `Q${x.index + 1}: baixa concordância; investigar experiência e condições da tarefa.`);
  const extras = items.filter(x => followups[x.index]?.length).map(x => `Q${x.index + 1}: ${followups[x.index].map(id => x.q.options[id]).join(' / ')}`);
  // Afirmação contrastiva: não rotular automaticamente toda concordância como competência demonstrada.
  return `<article class="rubric"><h3 style="color:${MODE_COLORS[colorIndex]}">${escapeHtml(mode.name)} — ${formatMean(mode.mean)} / 4 · ${formatPercent(mode.index)}</h3>
    <p><b>Descrição da dimensão:</b> ${escapeHtml(DESCRIPTIONS[mode.name])}</p>
    <p><b>Interpretação:</b> ${mode.count ? `Média de concordância em ${mode.count} item(ns) da categoria. Os itens com contraste exigem leitura conjunta dos complementos.` : 'Não houve respostas válidas nesta dimensão.'}</p>
    <div class="evidence"><b>🔵 Evidências favoráveis relatadas</b><p>${favorable.length ? favorable.map(escapeHtml).join('<br>') : 'Nenhuma evidência favorável direta identificada nesta dimensão.'}</p></div>
    <div class="needs"><b>🟡 Necessidades de investigação</b><p>${needs.length ? needs.map(escapeHtml).join('<br>') : 'Não houve baixa concordância; isso não dispensa verificação prática.'}</p>${extras.length ? `<p><b>Complementos selecionados:</b><br>${extras.map(escapeHtml).join('<br>')}</p>` : ''}</div>
    <p><b>Atividades e tarefas para confirmar hipóteses:</b> ${escapeHtml(ACTIVITIES[mode.name][0])}</p>
    <p><b>Metodologias para experimentar:</b> ${escapeHtml(ACTIVITIES[mode.name][1])}</p></article>`;
}
/** Rubrica das quatro habilidades: não estimar índice se faltar autorrelato direto. */
export function renderSkillRubric(skill, data) {
  return `<article class="rubric"><h3>${SKILL_EMOJI[skill]} ${skill} — ${data.index === null ? 'índice não estimável' : formatPercent(data.index)}</h3>
    <p><b>Leitura técnica:</b> ${data.index === null ? 'As questões disponíveis não oferecem evidências diretas suficientes para pontuar esta habilidade.' : 'Índice calculado somente com afirmações diretas e positivas; não corresponde a nível CEFR.'}</p>
    <div class="evidence"><b>🔵 Evidências favoráveis relatadas</b><p>${data.strength.length ? data.strength.map(escapeHtml).join('<br>') : 'Sem evidências positivas diretas suficientes.'}</p></div>
    <div class="needs"><b>🟡 Necessidades de investigação</b><p>${data.need.length ? data.need.map(escapeHtml).join('<br>') : 'Sem dificuldades diretamente registradas nesta habilidade.'}</p>${data.context.length ? `<p><b>Informações contextuais:</b><br>${data.context.map(escapeHtml).join('<br>')}</p>` : ''}</div>
    <p><b>Tarefa de verificação:</b> ${escapeHtml(SKILL_TASKS[skill])}</p></article>`;
}
