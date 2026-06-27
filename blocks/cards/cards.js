import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  // Optimize same-origin images only; external (e.g. source CDN) images keep
  // their original URL — createOptimizedPicture rewrites the query string and
  // would break cross-origin renditions.
  ul.querySelectorAll('picture > img').forEach((img) => {
    try {
      const u = new URL(img.src, window.location.href);
      if (u.origin === window.location.origin) {
        img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
      } else {
        img.setAttribute('loading', 'lazy');
      }
    } catch (e) { /* leave as-is */ }
  });
  block.replaceChildren(ul);
}
