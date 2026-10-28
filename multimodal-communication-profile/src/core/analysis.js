import { QUESTIONS } from '../data/questions.js';
import { MODES, SKILLS } from '../data/catalog.js';
import { mean, normalizedIndex } from './format.js';

/** A questão complementar é exibida apenas com respostas informativas específicas. */
export function needsFollowup(question, answer) {
  if (answer == null || answer === 0) return false;
  return question.type === 'contrast' ? answer >= 3 : answer <= 2;
}
/** Uma questão é completa quando o item principal foi marcado e o complemento exigido foi respondido. */
export function isQuestionComplete(question, answer, selections) {
  return answer !== null && answer !== undefined &&
    (!needsFollowup(question, answer) || (selections?.length >= 1 && selections.length <= 2));
}
/**
 * Médias de concordância por modalidade; para itens de contraste a média NÃO
 * demonstra capacidade, apenas o quanto o aluno concorda com a afirmação composta.
 */
export function analyzeModes(answers, questions = QUESTIONS) {
  return MODES.map(name => {
    const values = questions.flatMap((q, index) => q.mode === name && answers[index] > 0 ? [answers[index]] : []);
    const average = mean(values);
    return { name, mean: average, count: values.length, index: normalizedIndex(average) };
  });
}
/** Distribui 100% da soma das médias válidas, não a proficiência. */
export function relativeShares(modeData) {
  const sum = modeData.reduce((total, mode) => total + (mode.mean ?? 0), 0);
  return modeData.map(mode => ({ ...mode, share: sum ? (mode.mean ?? 0) / sum * 100 : null }));
}
/**
 * Evidências de habilidades: apenas respostas a itens positivos diretos geram índice.
 * Afirmações compostas e complementos geram contexto / necessidades, não pontos.
 */
export function analyzeSkills(answers, followups, questions = QUESTIONS) {
  const data = Object.fromEntries(SKILLS.map(skill => [skill, { scores: [], strength: [], need: [], context: [] }]));
  questions.forEach((q, index) => {
    const answer = answers[index];
    if (answer === null || answer === undefined || answer === 0) return;
    const options = (followups[index] ?? []).map(id => q.options[id]).filter(Boolean);
    if (q.type === 'positive' && q.primary && data[q.primary]) {
      data[q.primary].scores.push(answer);
      if (answer >= 3) data[q.primary].strength.push(`Q${index + 1}: ${q.text}`);
      else data[q.primary].need.push(`Q${index + 1}: baixa concordância com a afirmação.`);
    } else if (q.type === 'contrast') {
      if (answer >= 3) {
        if (q.primary && q.primary !== q.secondary && data[q.primary])
          data[q.primary].context.push(`Q${index + 1}: relata recurso ou compreensão na primeira parte da afirmação.`);
        if (q.secondary && data[q.secondary])
          data[q.secondary].need.push(`Q${index + 1}: relata dificuldade ou dependência de apoio na segunda parte.`);
      } else {
        for (const skill of new Set([q.primary, q.secondary].filter(Boolean)))
          if (data[skill]) data[skill].context.push(`Q${index + 1}: discordância de afirmação composta; resultado inconclusivo.`);
      }
    }
    if (options.length) {
      for (const skill of new Set([q.primary, q.secondary].filter(Boolean)))
        if (data[skill]) data[skill].context.push(`Q${index + 1} — complemento: ${options.join(' / ')}`);
    }
  });
  for (const skill of SKILLS) {
    data[skill].mean = mean(data[skill].scores);
    data[skill].index = normalizedIndex(data[skill].mean);
    data[skill].count = data[skill].scores.length;
  }
  return data;
}
/** Síntese agregada sem incluir a opção Não vivenciei (valor 0). */
export function summarize(answers, followups) {
  const valid = answers.filter(x => x !== null && x !== undefined && x !== 0);
  const modes = relativeShares(analyzeModes(answers));
  const eligible = modes.filter(x => x.mean !== null);
  const ranked = [...eligible].sort((a, b) => b.mean - a.mean);
  return {
    validCount: valid.length,
    followupCount: followups.filter(x => x?.length).length,
    average: mean(valid),
    highest: ranked[0] ?? null,
    lowest: ranked[ranked.length - 1] ?? null,
    modes,
    skills: analyzeSkills(answers, followups)
  };
}
