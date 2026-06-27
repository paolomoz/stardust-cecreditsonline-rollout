/**
 * testimonials — "featured voice + chorus". Editorial testimonial wall:
 * the first quote is featured (large, with an oversized quotation glyph), the
 * rest form a supporting chorus. Verbatim quotes only. Staggered reveal is
 * an enhancement of an already-visible default (never strands content).
 *
 * Authoring: one row per testimonial. Cell 1 = quote, last <p> = attribution.
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row, i) => {
    const cell = row.querySelector(':scope > div') || row;
    const li = document.createElement('li');
    li.className = i === 0 ? 'testimonial featured' : 'testimonial';
    // last paragraph is the attribution
    const ps = [...cell.querySelectorAll('p')];
    const attr = ps.length > 1 ? ps.pop() : null;
    const quote = document.createElement('blockquote');
    ps.forEach((p) => quote.append(p));
    li.append(quote);
    if (attr) { attr.className = 'testimonial-attr'; li.append(attr); }
    li.style.setProperty('--i', i);
    ul.append(li);
  });
  block.replaceChildren(ul);

  // Reveal-as-enhancement: content is visible by default; if motion is allowed
  // and IO is available, start hidden-then-stagger. Failsafe reveals all.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    block.classList.add('reveal-ready');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    ul.querySelectorAll('.testimonial').forEach((el) => io.observe(el));
    setTimeout(() => ul.querySelectorAll('.testimonial:not(.in)').forEach((el) => el.classList.add('in')), 2000);
  }
}
