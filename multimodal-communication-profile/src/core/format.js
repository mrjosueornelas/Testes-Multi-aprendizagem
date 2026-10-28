/** Formatação pt-BR e sanitização de texto introduzido pelo usuário. */
export function escapeHtml(input) {
  return String(input ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}
export function mean(values) {
  return values.length ? values.reduce((sum, x) => sum + x, 0) / values.length : null;
}
/** Normalização convencional da escala 1–4 para 0–100%, NÃO proficiência. */
export function normalizedIndex(value) {
  return value === null ? null : Math.max(0, Math.min(100, (value - 1) / 3 * 100));
}
export function formatMean(value) {
  return value === null ? '—' : value.toFixed(2).replace('.', ',');
}
export function formatPercent(value) {
  return value === null ? '—' : value.toFixed(1).replace('.', ',') + '%';
}
