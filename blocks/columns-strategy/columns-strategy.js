export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-strategy-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture') || col.querySelector('img');
      if (pic && !col.querySelector('h2, h3')) {
        col.classList.add('columns-strategy-img-col');
      }

      // Style CTA links as buttons
      const links = col.querySelectorAll('a');
      links.forEach((link, index) => {
        // Skip links inside pictures
        if (link.closest('picture')) return;
        const p = link.closest('p');
        if (p && p.childNodes.length === 1) {
          p.classList.add('columns-strategy-cta-wrapper');
          link.classList.add('columns-strategy-cta');
          if (index === 0) {
            link.classList.add('columns-strategy-cta-primary');
          } else {
            link.classList.add('columns-strategy-cta-secondary');
          }
        }
      });
    });
  });
}
