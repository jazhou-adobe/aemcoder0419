/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: UNSW cleanup. Selectors from captured DOM of https://www.unsw.edu.au/
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    // Remove cookie/consent dialogs and overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#cookieConsentEnabled',
      '.header-overlay',
      '.cc-message',
    ]);
  }
  if (hookName === 'afterTransform') {
    // Remove non-authorable site chrome (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '.globalheader',
      '.globalfooter',
      '.skip-to-source',
      '.skip-to-target',
      '.breadcrumb',
      '.socialfollow',
      '#page-analytics',
      '#category-analytics',
      '.background-shape-container',
      '.hero-standard-feed-embed',
      '.hero-standard-video-desktop',
      '.hero-standard-video-mobile',
      'header',
      'footer',
      'noscript',
      'iframe',
      'link',
    ]);
    // Clean tracking attributes
    element.querySelectorAll('[data-track]').forEach(function(el) { el.removeAttribute('data-track'); });
    element.querySelectorAll('[onclick]').forEach(function(el) { el.removeAttribute('onclick'); });
  }
}
