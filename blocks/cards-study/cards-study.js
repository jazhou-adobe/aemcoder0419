import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-study-card-image';
      else div.className = 'cards-study-card-body';
    });

    // Move heading into image container as overlay
    const imageDiv = li.querySelector('.cards-study-card-image');
    const bodyDiv = li.querySelector('.cards-study-card-body');
    const heading = bodyDiv?.querySelector('h3, h4');
    if (imageDiv && heading) {
      const overlay = document.createElement('span');
      overlay.className = 'cards-study-card-title';
      overlay.textContent = heading.textContent;
      imageDiv.append(overlay);
      heading.remove();
    }

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
