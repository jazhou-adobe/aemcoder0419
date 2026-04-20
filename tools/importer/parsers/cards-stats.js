/* eslint-disable */
/* global WebImporter */
/** Parser for cards-stats. Base: cards. Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Icon tiles: each icon-tile-item has icon + heading + copy + link
  var tiles = element.querySelectorAll('.icon-tile-item');
  if (!tiles.length) return;
  var cells = [];

  tiles.forEach(function(tile) {
    var icon = tile.querySelector('img.image, picture img, img');
    var heading = tile.querySelector('.tile-heading');
    var subtitle = tile.querySelector('.tile-subtitle');
    var copy = tile.querySelector('.tile-copy');
    var link = tile.querySelector('a');

    var imageCell = document.createElement('div');
    if (icon) imageCell.append(icon);

    var contentCell = document.createElement('div');
    if (heading) {
      var h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      contentCell.append(h3);
    }
    if (subtitle) {
      var sub = document.createElement('p');
      sub.textContent = subtitle.textContent.trim();
      contentCell.append(sub);
    }
    if (copy) contentCell.append(copy);
    if (link) {
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = 'Learn more';
      contentCell.append(a);
    }

    cells.push([imageCell, contentCell]);
  });

  var block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells: cells });
  element.replaceWith(block);
}
