export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'degree-search-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    const content = cells[cells.length - 1];
    if (!content) return;

    const heading = content.querySelector('h2, h3');
    const link = content.querySelector('a');
    const paragraphs = content.querySelectorAll('p');

    if (heading && heading.tagName === 'H2') {
      // Main heading + search-style CTA
      const section = document.createElement('div');
      section.className = 'degree-search-main';

      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      section.append(h2);

      // Description text
      paragraphs.forEach((p) => {
        if (!p.querySelector('a')) {
          const desc = document.createElement('p');
          desc.className = 'degree-search-description';
          desc.textContent = p.textContent;
          section.append(desc);
        }
      });

      // Search-style bar linking to degree finder
      if (link) {
        const searchBar = document.createElement('a');
        searchBar.href = link.href;
        searchBar.className = 'degree-search-bar';
        searchBar.innerHTML = '<span class="degree-search-bar-text">Search for a degree or course</span><span class="degree-search-bar-icon"></span>';
        section.append(searchBar);

        const viewAll = document.createElement('a');
        viewAll.href = link.href;
        viewAll.className = 'degree-search-view-all';
        viewAll.textContent = link.textContent;
        section.append(viewAll);
      }

      wrapper.append(section);
    } else if (heading && heading.tagName === 'H3') {
      // Sub-section: "Start your UNSW journey"
      const section = document.createElement('div');
      section.className = 'degree-search-journey';

      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent;
      section.append(h3);

      paragraphs.forEach((p) => {
        if (!p.querySelector('a')) {
          const desc = document.createElement('p');
          desc.textContent = p.textContent;
          section.append(desc);
        }
      });

      if (link) {
        const cta = document.createElement('a');
        cta.href = link.href;
        cta.className = 'degree-search-cta';
        cta.textContent = link.textContent;
        section.append(cta);
      }

      wrapper.append(section);
    }
  });

  block.append(wrapper);
}
