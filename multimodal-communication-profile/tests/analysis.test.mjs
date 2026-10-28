import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS } from '../src/data/questions.js';
import { needsFollowup, isQuestionComplete, analyzeModes, analyzeSkills, relativeShares, summarize } from '../src/core/analysis.js';
import { normalizedIndex, mean, escapeHtml } from '../src/core/format.js';
import { renderPie, skillColor } from '../src/ui/charts.js';

test('exatamente 25 itens, 5 por modalidade e complementos válidos', () => {
  assert.equal(QUESTIONS.length,25);
  for(const mode of ['Linguistic','Aural','Visual','Spatial','Gestural'])
    assert.equal(QUESTIONS.filter(q=>q.mode===mode).length,5);
  assert.ok(QUESTIONS.every(q=>q.follow && q.options.length===5));
});
test('gatilhos condicionais respeitam contrastes e itens positivos', () => {
  assert.equal(needsFollowup(QUESTIONS[0], 4),true);
  assert.equal(needsFollowup(QUESTIONS[0], 1),false);
  assert.equal(needsFollowup(QUESTIONS[5], 1),true);
  assert.equal(needsFollowup(QUESTIONS[5], 4),false);
  assert.equal(needsFollowup(QUESTIONS[0], 0),false);
  assert.equal(needsFollowup(QUESTIONS[0], null),false);
});
test('pergunta só avança após complemento obrigatório', () => {
  assert.equal(isQuestionComplete(QUESTIONS[0],4,null),false);
  assert.equal(isQuestionComplete(QUESTIONS[0],4,[0]),true);
  assert.equal(isQuestionComplete(QUESTIONS[0],4,[0,1,2]),false);
  assert.equal(isQuestionComplete(QUESTIONS[0],0,null),true);
  assert.equal(isQuestionComplete(QUESTIONS[0],null,[]),false);
});
test('normalização das médias usa escala 1 a 4', () => {
  assert.equal(normalizedIndex(1),0);
  assert.equal(normalizedIndex(4),100);
  assert.equal(normalizedIndex(2.5),50);
  assert.equal(normalizedIndex(null),null);
  assert.equal(mean([]),null);
});
test('pizza soma 100% e tem legenda textual acessível', () => {
  const scores = analyzeModes(Array(25).fill(3));
  const shares = relativeShares(scores);
  assert.ok(Math.abs(shares.reduce((a,b)=>a+b.share,0)-100)<0.000001);
  const svg = renderPie(shares);
  assert.match(svg,/Linguistic/);
  assert.match(svg,/%/);
});
test('contraste não soma pontos positivos indevidos ao skill', () => {
  const answers = Array(25).fill(null);const followups = Array(25).fill(null);
  answers[0]=4; followups[0]=[0];
  const skills=analyzeSkills(answers,followups);
  assert.equal(skills.Reading.index,null);
  assert.equal(skills.Speaking.index,null);
  assert.ok(skills.Speaking.need.length>0);
});
test('não vivenciei não reduz média ou gera habilidades falsas', () => {
  const answers = Array(25).fill(0);const followups = Array(25).fill(null);
  const summary=summarize(answers,followups);
  assert.equal(summary.average,null);
  assert.ok(summary.modes.every(m=>m.mean===null));
  assert.ok(Object.values(summary.skills).every(s=>s.index===null));
});
test('classificação de cores e proteção básica do HTML', () => {
  assert.equal(skillColor(78),'#239455');
  assert.equal(skillColor(61),'#287cce');
  assert.equal(skillColor(48),'#e7b72e');
  assert.equal(skillColor(36),'#d9534f');
  assert.equal(escapeHtml('<script>'),'&lt;script&gt;');
});
