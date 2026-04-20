import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const grid = document.createElement('div');
  grid.className = 'cards-news-grid';

  rows.forEach((row, i) => {
    const card = document.createElement('div');
    card.className = i === 0 ? 'cards-news-featured' : 'cards-news-tile';

    while (row.firstElementChild) {
      const div = row.firstElementChild;
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-news-card-image';
      } else if (div.innerHTML.trim()) {
        div.className = 'cards-news-card-body';
      }
      card.append(div);
    }

    grid.append(card);
  });

  // Remove standalone "Read more" link paragraphs
  grid.querySelectorAll('.cards-news-card-body p').forEach((p) => {
    const link = p.querySelector('a');
    if (link && p.children.length === 1 && link.textContent.trim().toLowerCase() === 'read more') {
      p.remove();
    }
  });

  // Optimize images
  grid.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.append(grid);
}
