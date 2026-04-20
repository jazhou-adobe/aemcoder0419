/* eslint-disable */
/* global WebImporter */
/** Parser for carousel-research. Base: carousel. Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Research carousel: each slick-slide has a card with image + title + description + link
  var slides = element.querySelectorAll('.slick-slide .card-general, .card-general');
  if (!slides.length) return;
  var cells = [];

  slides.forEach(function(slide) {
    var image = slide.querySelector('.card-teaser__image img, picture img, img');
    var link = slide.querySelector('a.title-link, a.base');
    var title = slide.querySelector('h3.title, h3');
    var description = slide.querySelector('.content p, .content');

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

  if (cells.length > 0) {
    var block = WebImporter.Blocks.createBlock(document, { name: 'carousel-research', cells: cells });
    element.replaceWith(block);
  }
}
