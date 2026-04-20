/* eslint-disable */
/* global WebImporter */
/** Parser for cards-news. Base: cards. Source: https://www.unsw.edu.au/. */
export default function parse(element, { document }) {
  // Latest stories: featured story + smaller story links
  var stories = element.querySelectorAll('a.story, a[id^="story-"]');
  if (!stories.length) return;
  var cells = [];

  stories.forEach(function(story) {
    var image = story.querySelector('img');
    var title = story.querySelector('h3, .title');
    var description = story.querySelector('.description, p:not(.title)');

    var imageCell = document.createElement('div');
    if (image) imageCell.append(image);

    var contentCell = document.createElement('div');
    if (title) {
      var h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentCell.append(h3);
    }
    if (description) contentCell.append(description);
    if (story.href) {
      var a = document.createElement('a');
      a.href = story.href;
      a.textContent = 'Read more';
      contentCell.append(a);
    }

    cells.push([imageCell, contentCell]);
  });

  var block = WebImporter.Blocks.createBlock(document, { name: 'cards-news', cells: cells });
  element.replaceWith(block);
}
