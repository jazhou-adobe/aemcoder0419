/* eslint-disable */
/* global WebImporter */
/** Parser for cards-article. Base: cards (no images). Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Explore a lifetime of learning: card-general items with title + description (no images in display)
  var link = element.querySelector('a.title-link, a.base');
  if (!link) return;
  var title = element.querySelector('h3.title, h3');
  var description = element.querySelector('.content p, .content');

  var contentCell = document.createElement('div');
  if (title) contentCell.append(title);
  if (description) contentCell.append(description);
  if (link.href) {
    var a = document.createElement('a');
    a.href = link.href;
    a.textContent = 'Read more';
    contentCell.append(a);
  }

  var cells = [[contentCell]];
  var block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells: cells });
  element.replaceWith(block);
}
