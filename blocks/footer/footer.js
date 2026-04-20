import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function decorateAcknowledgement(section) {
  const wrapper = section.querySelector('.default-content-wrapper');
  if (!wrapper) return;

  // Find the flags paragraph and text elements
  const flagsP = wrapper.querySelector('p:first-child');
  const flags = flagsP?.querySelectorAll('img');
  if (!flags || flags.length === 0) return;

  // Create side-by-side layout: flags left, text right
  const layout = document.createElement('div');
  layout.className = 'footer-ack-layout';

  const flagsDiv = document.createElement('div');
  flagsDiv.className = 'footer-ack-flags';
  flags.forEach((img) => flagsDiv.append(img.cloneNode(true)));

  const textDiv = document.createElement('div');
  textDiv.className = 'footer-ack-text';

  // Move all content except flags paragraph into text div
  [...wrapper.children].forEach((child) => {
    if (child !== flagsP) textDiv.append(child);
  });

  flagsP.remove();
  layout.append(flagsDiv, textDiv);
  wrapper.append(layout);
}

function decorateAddressSection(section) {
  const wrapper = section.querySelector('.default-content-wrapper');
  if (!wrapper) return;

  // Add social icons
  const socialBar = document.createElement('div');
  socialBar.className = 'footer-social';

  const label = document.createElement('span');
  label.className = 'footer-social-label';
  label.textContent = 'Follow us';
  socialBar.append(label);

  const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/school/unsw/', icon: '<path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>' },
    { name: 'Facebook', url: 'https://www.facebook.com/unsw', icon: '<path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>' },
    { name: 'Instagram', url: 'https://www.instagram.com/unsw/', icon: '<path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z"/>' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@unsw', icon: '<path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.9 5.82V5h-3v12.4a2.592 2.592 0 01-2.587 2.593 2.592 2.592 0 01-2.587-2.593 2.592 2.592 0 012.587-2.593c.272 0 .538.038.792.11v-3.08A5.56 5.56 0 005.31 12 5.69 5.69 0 000 17.69 5.69 5.69 0 005.31 23.4a5.69 5.69 0 005.69-5.69V10.3A8.14 8.14 0 0016.6 12V8.9a4.25 4.25 0 01-4.1-3.08z" transform="translate(4 0)"/>' },
    { name: 'YouTube', url: 'https://www.youtube.com/unsw', icon: '<path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>' },
  ];

  socials.forEach(({ name, url, icon }) => {
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('aria-label', name);
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `<svg viewBox="0 0 24 24">${icon}</svg>`;
    socialBar.append(a);
  });

  // Extract legal links from existing paragraph with pipe separators
  const legalP = [...wrapper.querySelectorAll('p')].find((p) => p.querySelector('a[href*="privacy"]'));
  let legalDiv = null;
  if (legalP) {
    legalDiv = document.createElement('div');
    legalDiv.className = 'footer-legal-links';
    legalP.querySelectorAll('a').forEach((a) => {
      const link = a.cloneNode(true);
      legalDiv.append(link);
    });
    legalP.remove();
  }

  // Insert social bar and legal links at the beginning
  if (legalDiv) wrapper.prepend(legalDiv);
  wrapper.prepend(socialBar);
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Decorate acknowledgement section (4th section)
  const sections = footer.querySelectorAll('.section');
  if (sections[3]) decorateAcknowledgement(sections[3]);
  if (sections[4]) decorateAddressSection(sections[4]);

  block.append(footer);
}
