/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: UNSW sections. Adds section breaks and section-metadata blocks.
 * Selectors from captured DOM of https://www.unsw.edu.au/
 * Runs in afterTransform only, using payload.template.sections.
 * Uses heading text matching as fallback for dynamic IDs.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    var sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    var document = element.ownerDocument;

    // Helper: find section element by CSS selector or heading text fallback
    function findSectionElement(section) {
      var selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      for (var s = 0; s < selectors.length; s++) {
        try {
          var el = element.querySelector(selectors[s]);
          if (el) return el;
        } catch (e) {
          // invalid selector
        }
      }
      // Fallback: find by heading text matching section name
      var headings = element.querySelectorAll('h2');
      for (var h = 0; h < headings.length; h++) {
        var text = headings[h].textContent.trim();
        if (text === section.name || text.indexOf(section.name) === 0) {
          return headings[h];
        }
      }
      return null;
    }

    // Helper: find top-level ancestor under main element
    function findAncestor(el) {
      var ancestor = el;
      while (ancestor.parentElement && ancestor.parentElement !== element) {
        ancestor = ancestor.parentElement;
      }
      return ancestor;
    }

    // First pass: resolve all section anchors
    var anchors = [];
    for (var i = 0; i < sections.length; i++) {
      var sectionEl = findSectionElement(sections[i]);
      if (sectionEl) {
        anchors.push({ ancestor: findAncestor(sectionEl), section: sections[i] });
      } else {
        anchors.push(null);
      }
    }

    // Second pass: insert in reverse order
    for (var j = anchors.length - 1; j >= 0; j--) {
      if (!anchors[j]) continue;
      var anchor = anchors[j].ancestor;
      var sec = anchors[j].section;

      if (sec.style) {
        var metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: sec.style },
        });
        anchor.after(metaBlock);
      }

      if (j > 0) {
        var hr = document.createElement('hr');
        anchor.before(hr);
      }
    }
  }
}
