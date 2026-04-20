/* eslint-disable */
/* global WebImporter */
/** Parser for cards-study. Base: cards. Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Study options: each cmp-browse-degrees__card has image header + title + link list
  var cards = element.querySelectorAll('.cmp-browse-degrees__card');
  if (!cards.length) return;
  var cells = [];

  cards.forEach(function(card) {
    var image = card.querySelector('.cmp-browse-degrees__header__image img, img');
    var title = card.querySelector('.cmp-browse-degrees__header__title, span');
    var links = Array.from(card.querySelectorAll('.cmp-browse-degrees__list__item__link, .cmp-browse-degrees__list a'));

    var imageCell = document.createElement('div');
    if (image) imageCell.append(image);

    var contentCell = document.createElement('div');
    if (title) {
      var h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentCell.append(h3);
    }
    var ul = document.createElement('ul');
    links.forEach(function(link) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      li.append(a);
      ul.append(li);
    });
    if (ul.children.length > 0) contentCell.append(ul);

    cells.push([imageCell, contentCell]);
  });

  var block = WebImporter.Blocks.createBlock(document, { name: 'cards-study', cells: cells });
  element.replaceWith(block);
}
