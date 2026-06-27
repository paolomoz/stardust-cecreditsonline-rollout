/**
 * stat-band — full-width forest-green band with a large numeral + caption.
 * Authoring: one row, one cell. First strong/heading = the number; rest = caption.
 * @param {Element} block
 */
export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block.firstElementChild;
  if (!cell) return;
  // Promote the first short line (e.g. "94%") to the big numeral.
  const num = cell.querySelector('h1, h2, h3, strong');
  if (num) num.classList.add('stat-band-num');
  block.classList.add('stat-band-decorated');
}
