export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-strategy-${cols.length}-cols`);

  // Inject SVG clip-path for organic blob mask (UNSW pebble shape)
  if (!document.getElementById('unsw-blob-clip')) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    svg.innerHTML = `<defs>
      <clipPath id="unsw-blob-clip" clipPathUnits="objectBoundingBox">
        <path d="M0.568,0 C0.415,0 0.263,0.102 0.19,0.175 C0.102,0.263 0.088,0.337 0.129,0.483 L0.129,0.483 C0.171,0.629 0.131,0.595 0.09,0.719 C0.049,0.846 0.207,1.132 0.549,0.93 L0.559,0.924 C0.559,0.924 0.923,0.732 0.931,0.431 L0.932,0.422 L0.932,0.417 C0.931,0.361 0.918,0.3 0.888,0.236 L0.886,0.232 C0.803,0.06 0.687,0.001 0.572,0 Z"/>
      </clipPath>
    </defs>`;
    document.body.append(svg);
  }

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
