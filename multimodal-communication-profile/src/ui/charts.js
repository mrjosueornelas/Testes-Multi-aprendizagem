import { MODE_COLORS } from '../data/catalog.js';
import { escapeHtml, formatPercent } from '../core/format.js';
/** Desenha um SVG sem biblioteca externa. Os percentuais também aparecem na legenda. */
export function renderPie(shares) {
  const values = shares.map(x => x.share ?? 0);
  const sum = values.reduce((a, b) => a + b, 0);
  if (!sum) return '<p>Sem dados suficientes para o gráfico.</p>';
  let start = -Math.PI / 2;
  const shapes = values.map((value, i) => {
    const angle = value / sum * Math.PI * 2;
    const end = start + angle;
    const x1 = 160 + 125 * Math.cos(start), y1 = 160 + 125 * Math.sin(start);
    const x2 = 160 + 125 * Math.cos(end), y2 = 160 + 125 * Math.sin(end);
    const shape = angle >= 2*Math.PI - 1e-7
      ? `<circle cx="160" cy="160" r="125" fill="${MODE_COLORS[i]}"/>`
      : `<path d="M160 160 L${x1} ${y1} A125 125 0 ${angle > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z" fill="${MODE_COLORS[i]}" stroke="white" stroke-width="2"/>`;
    const middle = start + angle/2;
    const tx = 160 + 82*Math.cos(middle), ty = 160 + 82*Math.sin(middle);
    start = end;
    return shape + (value >= 8 ? `<text x="${tx}" y="${ty}" fill="white" text-anchor="middle" dominant-baseline="middle" font-size="15" font-weight="750">${formatPercent(value)}</text>` : '');
  });
  return `<svg class="pie" viewBox="0 0 320 320" role="img" aria-label="Gráfico de pizza: ${escapeHtml(shares.map(s => `${s.name} ${formatPercent(s.share)}`).join(', '))}">${shapes.join('')}</svg>`;
}
/** Faixas de cor convencionais, sem equivalência com níveis CEFR. */
export function skillColor(index) {
  return index >= 70 ? '#239455' : index >= 55 ? '#287cce' : index >= 40 ? '#e7b72e' : '#d9534f';
}
/** Exibe barra horizontal, nome e porcentagem legível no PDF. */
export function renderBar(label, value, color) {
  const width = value === null ? 0 : Math.min(100, Math.max(0, value));
  return `<div class="barline"><b>${escapeHtml(label)}</b><div class="track"><div class="fill" style="width:${width}%;background:${color}"></div></div><b>${formatPercent(value)}</b></div>`;
}
