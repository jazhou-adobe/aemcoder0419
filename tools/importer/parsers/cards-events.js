/* eslint-disable */
/* global WebImporter */
/** Parser for cards-events. Base: cards. Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Key dates: each key-date-entry has date block + category + title + link
  var entries = element.querySelectorAll('.key-date-entry');
  if (!entries.length) return;
  var cells = [];

  entries.forEach(function(entry) {
    var dateBlock = entry.querySelector('.date-block');
    var category = entry.querySelector('.key-date-category');
    var title = entry.querySelector('.key-date-title h3, .key-date-title');

    var dateCell = document.createElement('div');
    if (dateBlock) {
      var dateText = dateBlock.textContent.replace(/\s+/g, ' ').trim();
      var p = document.createElement('p');
      p.textContent = dateText;
      dateCell.append(p);
    }

    var contentCell = document.createElement('div');
    if (category) {
      var em = document.createElement('em');
      em.textContent = category.textContent.trim();
      contentCell.append(em);
    }
    if (title) {
      var h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentCell.append(h3);
    }
    if (entry.href) {
      var a = document.createElement('a');
      a.href = entry.href;
      a.textContent = 'Learn more';
      contentCell.append(a);
    }

    cells.push([dateCell, contentCell]);
  });

  var block = WebImporter.Blocks.createBlock(document, { name: 'cards-events', cells: cells });
  element.replaceWith(block);
}
