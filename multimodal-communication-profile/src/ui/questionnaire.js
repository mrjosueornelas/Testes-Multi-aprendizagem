import { QUESTIONS } from '../data/questions.js';
import { escapeHtml } from '../core/format.js';
import { needsFollowup, isQuestionComplete } from '../core/analysis.js';
import { renderReport } from './report.js';
const el = id => document.getElementById(id);
/** Dados apenas em memória durante a sessão; nenhum envio ou armazenamento. */
export function createQuestionnaire() {
  const state = { answers: Array(QUESTIONS.length).fill(null), followups: Array(QUESTIONS.length).fill(null), step: 0 };
  function show(id) {
    for (const view of ['intro','quiz','report']) el(view).classList.toggle('hidden', view !== id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  /** Atualiza a tela de pergunta e aplica as regras condicionais. */
  function renderQuestion() {
    const { step, answers, followups } = state;
    const question = QUESTIONS[step], answer = answers[step];
    const showFollowup = needsFollowup(question, answer);
    el('counter').textContent = `Questão ${step + 1} de ${QUESTIONS.length} · ${question.mode}`;
    el('progress').value = step + 1;
    el('questionText').textContent = question.text;
    const labels = ['Discordo totalmente', 'Discordo parcialmente', 'Concordo parcialmente', 'Concordo totalmente', 'Não vivenciei essa situação'];
    el('choices').innerHTML = [1,2,3,4,0].map((value, index) => `<label class="option"><input type="radio" name="mainanswer" value="${value}" ${answer === value ? 'checked' : ''}>${labels[index]}</label>`).join('');
    el('followup').classList.toggle('hidden', !showFollowup);
    if (showFollowup) {
      el('followQuestion').textContent = question.follow;
      el('followChoices').innerHTML = question.options.map((value, index) => `<label class="option"><input type="checkbox" name="fopt" value="${index}" ${followups[step]?.includes(index) ? 'checked' : ''}>${escapeHtml(value)}</label>`).join('');
      for (const checkbox of el('followChoices').querySelectorAll('input')) checkbox.addEventListener('change', () => {
        const selected = [...el('followChoices').querySelectorAll('input:checked')];
        if (selected.length > 2) { checkbox.checked = false; window.alert('Selecione até duas opções.'); }
        state.followups[step] = [...el('followChoices').querySelectorAll('input:checked')].map(x => Number(x.value));
        updateNavigation();
      });
    }
    for (const radio of el('choices').querySelectorAll('input')) radio.addEventListener('change', () => {
      state.answers[step] = Number(radio.value);
      state.followups[step] = null;
      renderQuestion();
    });
    el('back').disabled = step === 0;
    el('next').textContent = step === QUESTIONS.length - 1 ? 'Gerar relatório' : 'Próxima';
    updateNavigation();
  }
  /** Avançar só com resposta válida e complemento quando requerido. */
  function updateNavigation() {
    el('next').disabled = !isQuestionComplete(QUESTIONS[state.step], state.answers[state.step], state.followups[state.step]);
  }
  /** Eventos ficam isolados: mudar gráficos não afeta navegação e vice-versa. */
  function initialize() {
    el('start').addEventListener('click', () => {
      const student = el('student').value.trim(), age = Number(el('age').value), education = el('education').value;
      if (!student || !Number.isInteger(age) || age < 6 || age > 110 || !education) {
        window.alert('Preencha nome, idade válida (6 a 110) e escolaridade.'); return;
      }
      show('quiz'); renderQuestion();
    });
    el('back').addEventListener('click', () => { if (state.step > 0) { state.step--; renderQuestion(); } });
    el('next').addEventListener('click', () => {
      if (!isQuestionComplete(QUESTIONS[state.step], state.answers[state.step], state.followups[state.step])) return;
      if (state.step < QUESTIONS.length - 1) { state.step++; renderQuestion(); return; }
      renderReport({ answers: state.answers, followups: state.followups, student: el('student').value.trim(), age: el('age').value, education: el('education').value });
      show('report');
    });
    el('edit').addEventListener('click', () => { state.step = 0; show('quiz'); renderQuestion(); });
    el('print').addEventListener('click', () => window.print());
  }
  return { state, initialize, renderQuestion, updateNavigation };
}
