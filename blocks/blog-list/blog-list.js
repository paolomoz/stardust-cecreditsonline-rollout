/**
 * blog-list — dynamic block. Fetches the blog query-index and renders article
 * cards (image + title + date), sorted newest first. Filter via ?q=. Graceful
 * authored fallback when the index is empty/unreachable.
 * @param {Element} block
 */
export default async function decorate(block) {
  const fallback = block.innerHTML;
  block.textContent = '';
  block.classList.add('blog-list');

  let data = [];
  try {
    const resp = await fetch('/blogs/news/query-index.json');
    if (resp.ok) ({ data } = await resp.json());
  } catch (e) { /* fall through to fallback */ }

  if (!data || !data.length) {
    block.innerHTML = fallback; // keep authored static teasers
    return;
  }

  // optional ?q= filter
  const q = new URLSearchParams(window.location.search).get('q');
  let items = data.filter((it) => it.path && it.path !== '/blogs/news');
  if (q) {
    const ql = q.toLowerCase();
    items = items.filter((it) => `${it.title} ${it.description}`.toLowerCase().includes(ql));
  }
  const ts = (it) => Number(it.publishdate || it.lastModified || 0);
  items.sort((a, b) => ts(b) - ts(a));

  const ul = document.createElement('ul');
  items.slice(0, 60).forEach((it) => {
    const li = document.createElement('li');
    const img = it.image && !it.image.includes('default-meta-image')
      ? `<a href="${it.path}" class="blog-list-img"><img src="${it.image}" alt="${it.title || ''}" loading="lazy"></a>` : '';
    li.innerHTML = `${img}<div class="blog-list-body"><h3><a href="${it.path}">${it.title || it.path}</a></h3>${it.description ? `<p>${it.description}</p>` : ''}<p><a class="blog-list-more" href="${it.path}">Read article →</a></p></div>`;
    ul.append(li);
  });
  block.append(ul);
}
