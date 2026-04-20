export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'journey-cta-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    const content = cells[cells.length - 1];
    if (!content) return;

    const heading = content.querySelector('h2, h3');
    const paragraphs = content.querySelectorAll('p');
    const link = content.querySelector('a');

    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent;
      wrapper.append(h3);
    }

    paragraphs.forEach((p) => {
      if (p.querySelector('a')) return;
      const desc = document.createElement('p');
      desc.className = 'journey-cta-description';
      desc.textContent = p.textContent;
      wrapper.append(desc);
    });

    if (link) {
      const cta = document.createElement('a');
      cta.href = link.href;
      cta.className = 'journey-cta-button';
      cta.innerHTML = `<span>${link.textContent}</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
      wrapper.append(cta);
    }
  });

  block.append(wrapper);
}
