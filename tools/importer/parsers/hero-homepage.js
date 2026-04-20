/* eslint-disable */
/* global WebImporter */
/** Parser for hero-homepage. Base: hero. Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Extract hero content from UNSW hero-standard component
  var heading = element.querySelector('.hero-heading h1, .hero-heading p, h1');
  var description = element.querySelector('.hero-sub-heading p, .hero-sub-heading');
  var ctaLink = element.querySelector('.hero-cta a');
  var bgImage = element.querySelector('.hero-image img, .hero-backdrop img, picture img');

  var cells = [];
  // Row 1: background image (if present)
  if (bgImage) {
    cells.push([bgImage]);
  }
  // Row 2: heading + description + CTA in single cell
  var contentCell = document.createElement('div');
  if (heading) contentCell.append(heading);
  if (description) contentCell.append(description);
  if (ctaLink) contentCell.append(ctaLink);
  if (contentCell.childNodes.length > 0) cells.push([contentCell]);

  var block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells: cells });
  element.replaceWith(block);
}
