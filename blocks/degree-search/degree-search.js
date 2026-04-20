const DEGREE_SEARCH_URL = '/study/find-a-degree-or-course/degree-search-results';

function buildSearchBar(searchLink) {
  const container = document.createElement('div');
  container.className = 'degree-search-bar-container';

  // Search form area
  const searchBar = document.createElement('form');
  searchBar.className = 'degree-search-bar';
  searchBar.setAttribute('role', 'search');
  searchBar.action = searchLink || DEGREE_SEARCH_URL;
  searchBar.method = 'get';

  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.placeholder = 'Search';
  input.setAttribute('aria-label', 'Search for a degree or course');
  searchBar.append(input);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'degree-search-submit';
  submitBtn.setAttribute('aria-label', 'Submit search');
  submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  searchBar.append(submitBtn);

  container.append(searchBar);

  // Filters button
  const filtersBtn = document.createElement('button');
  filtersBtn.type = 'button';
  filtersBtn.className = 'degree-search-filters';
  filtersBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg> Filters';
  container.append(filtersBtn);

  return container;
}

function buildToggleRow(viewAllLink) {
  const row = document.createElement('div');
  row.className = 'degree-search-toggle-row';

  // International toggle
  const toggleGroup = document.createElement('div');
  toggleGroup.className = 'degree-search-toggle-group';

  const toggleLabel = document.createElement('span');
  toggleLabel.className = 'degree-search-toggle-label';
  toggleLabel.textContent = 'International';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'degree-search-toggle';
  toggle.setAttribute('role', 'switch');
  toggle.setAttribute('aria-checked', 'false');
  toggle.setAttribute('aria-label', 'Show international degrees');

  const toggleTrack = document.createElement('span');
  toggleTrack.className = 'degree-search-toggle-track';
  const toggleThumb = document.createElement('span');
  toggleThumb.className = 'degree-search-toggle-thumb';
  toggleTrack.append(toggleThumb);
  toggle.append(toggleTrack);

  toggle.addEventListener('click', () => {
    const checked = toggle.getAttribute('aria-checked') === 'true';
    toggle.setAttribute('aria-checked', String(!checked));
    toggle.classList.toggle('is-on', !checked);
  });

  toggleGroup.append(toggleLabel, toggle);

  // View all link
  const viewAll = document.createElement('a');
  viewAll.href = viewAllLink || `${DEGREE_SEARCH_URL}?international=false`;
  viewAll.className = 'degree-search-view-all';
  viewAll.textContent = 'View all degrees';

  row.append(toggleGroup, viewAll);
  return row;
}

export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'degree-search-inner';

  let searchLink = '';
  let viewAllLink = '';

  rows.forEach((row) => {
    const cells = [...row.children];
    const content = cells[cells.length - 1];
    if (!content) return;

    const heading = content.querySelector('h2, h3');
    const link = content.querySelector('a');

    if (heading && heading.tagName === 'H2') {
      // Main section: heading + search
      const section = document.createElement('div');
      section.className = 'degree-search-main';

      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      section.append(h2);

      if (link) {
        searchLink = link.href;
        viewAllLink = link.href;
      }

      // Search area (light blue container)
      const searchArea = document.createElement('div');
      searchArea.className = 'degree-search-area';
      searchArea.append(buildSearchBar(searchLink));
      searchArea.append(buildToggleRow(viewAllLink));
      section.append(searchArea);

      wrapper.append(section);
    }
  });

  block.append(wrapper);
}
