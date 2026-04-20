/* eslint-disable */
/* global WebImporter */
/** Parser for columns-strategy. Base: columns. Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Progress for All section: image left, text+CTAs right
  // Find the two responsive grid columns inside the shape-bg-colour container
  var parent = element.closest('.column-layout') || element;
  var grids = parent.querySelectorAll(':scope .responsivegrid, :scope > span > div > div');

  // Left column: image
  var image = parent.querySelector('.cmp-image__image, .tpl-image img, img');

  // Right column: heading, paragraph, buttons
  var heading = parent.querySelector('.cmp-text h2, h2');
  var paragraph = parent.querySelector('.cmp-text p, p');
  var buttons = Array.from(parent.querySelectorAll('.unsw-brand-button-container a'));

  // Build left cell (image)
  var leftCell = document.createElement('div');
  if (image) leftCell.append(image);

  // Build right cell (text + CTAs)
  var rightCell = document.createElement('div');
  if (heading) rightCell.append(heading);
  if (paragraph) rightCell.append(paragraph);
  buttons.forEach(function(btn) { rightCell.append(btn); });

  var cells = [[leftCell, rightCell]];
  var block = WebImporter.Blocks.createBlock(document, { name: 'columns-strategy', cells: cells });
  element.replaceWith(block);
}
