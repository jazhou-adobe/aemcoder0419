const INITIAL_VISIBLE = 3;

export default function decorate(block) {
  const ul = document.createElement('ul');
  const rows = [...block.children];
  block.textContent = '';

  rows.forEach((row, index) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    const children = [...li.children];
    if (children.length >= 2) {
      children[0].className = 'cards-events-card-date';
      children[1].className = 'cards-events-card-body';
    } else if (children.length === 1) {
      children[0].className = 'cards-events-card-body';
    }

    // Hide items beyond the initial visible count
    if (index >= INITIAL_VISIBLE) {
      li.classList.add('cards-events-hidden');
    }

    ul.append(li);
  });

  block.append(ul);

  // Add "Show more" button if there are hidden items
  if (rows.length > INITIAL_VISIBLE) {
    const showMore = document.createElement('button');
    showMore.type = 'button';
    showMore.className = 'cards-events-show-more';
    showMore.innerHTML = '<span>Show more</span>';
    showMore.addEventListener('click', () => {
      ul.querySelectorAll('.cards-events-hidden').forEach((li) => {
        li.classList.remove('cards-events-hidden');
      });
      showMore.remove();
    });
    block.append(showMore);
  }
}
