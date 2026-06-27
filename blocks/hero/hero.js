/**
 * hero — full-bleed photographic hero when the image has enough resolution,
 * otherwise a split (text + image) layout. Experience-led by default.
 *
 * Authoring shape (one row, two cells): text cell + image cell.
 * @param {Element} block
 */
const FULLBLEED_MIN_WIDTH = 1200;

export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const cells = [...row.children];
  const imgCell = cells.find((c) => c.querySelector('picture, img'));
  const textCell = cells.find((c) => c !== imgCell);
  const img = imgCell && imgCell.querySelector('img');
  if (!img || !textCell) return;

  const apply = (w) => {
    if (w >= FULLBLEED_MIN_WIDTH) {
      const picture = imgCell.querySelector('picture') || img;
      picture.classList.add('hero-bg');
      block.prepend(picture);
      textCell.classList.add('hero-content');
      imgCell.remove();
      block.classList.remove('hero-split');
      block.classList.add('hero-fullbleed');
    } else {
      block.classList.add('hero-split');
    }
  };

  const declaredWidth = Number(img.getAttribute('width')) || 0;
  if (declaredWidth) {
    apply(declaredWidth);
  } else if (img.complete && img.naturalWidth) {
    apply(img.naturalWidth);
  } else {
    block.classList.add('hero-split'); // safe default until we know
    img.addEventListener('load', () => apply(img.naturalWidth), { once: true });
  }
}
