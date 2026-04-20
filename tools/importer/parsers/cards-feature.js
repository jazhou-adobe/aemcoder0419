/* eslint-disable */
/* global WebImporter */
/** Parser for cards-feature. Base: cards. Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Experience UNSW cards in horizontal-scroll: each card-general has image + title + description
  var cards = element.querySelectorAll('.card-general');
  if (!cards.length) return;
  var cells = [];

  cards.forEach(function(card) {
    var image = card.querySelector('.card-teaser__image img, picture img, img');
    var link = card.querySelector('a.title-link, a.base');
    var title = card.querySelector('h3.title, h3');
    var description = card.querySelector('.content p, .content');

    var imageCell = document.createElement('div');
    if (image) imageCell.append(image);

    var contentCell = document.createElement('div');
    if (title) contentCell.append(title);
    if (description) contentCell.append(description);
    if (link) {
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim() || 'Learn more';
      contentCell.append(a);
    }

    cells.push([imageCell, contentCell]);
  });

  var block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells: cells });
  element.replaceWith(block);
}
