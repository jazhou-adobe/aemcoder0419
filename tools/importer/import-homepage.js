/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroHomepageParser from './parsers/hero-homepage.js';
import cardsStudyParser from './parsers/cards-study.js';
import cardsStatsParser from './parsers/cards-stats.js';
import columnsStrategyParser from './parsers/columns-strategy.js';
import cardsEventsParser from './parsers/cards-events.js';
import carouselResearchParser from './parsers/carousel-research.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import cardsNewsParser from './parsers/cards-news.js';
import cardsArticleParser from './parsers/cards-article.js';
import cardsAlumniParser from './parsers/cards-alumni.js';

// TRANSFORMER IMPORTS
import unswCleanupTransformer from './transformers/unsw-cleanup.js';
import unswSectionsTransformer from './transformers/unsw-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-homepage': heroHomepageParser,
  'cards-study': cardsStudyParser,
  'cards-stats': cardsStatsParser,
  'columns-strategy': columnsStrategyParser,
  'cards-events': cardsEventsParser,
  'carousel-research': carouselResearchParser,
  'cards-feature': cardsFeatureParser,
  'cards-news': cardsNewsParser,
  'cards-article': cardsArticleParser,
  'cards-alumni': cardsAlumniParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'University homepage with hero banner, featured content, news, events, and calls to action',
  urls: [
    'https://www.unsw.edu.au/'
  ],
  blocks: [
    {
      name: 'hero-homepage',
      instances: ['.hero-standard.hero-standard--full-width']
    },
    {
      name: 'cards-study',
      instances: ['.cmp-browse-degrees']
    },
    {
      name: 'cards-stats',
      instances: ['.icon-tile.uds-component']
    },
    {
      name: 'columns-strategy',
      instances: ['.shape-bg-colour--primary-yellow']
    },
    {
      name: 'cards-events',
      instances: ['.keydates']
    },
    {
      name: 'carousel-research',
      instances: ['.horizontal-scroll']
    },
    {
      name: 'cards-feature',
      instances: ['.horizontal-scroll']
    },
    {
      name: 'cards-news',
      instances: ['.latest-stories']
    },
    {
      name: 'cards-article',
      instances: ['.card-general.unsw-brand-card-theme']
    },
    {
      name: 'cards-alumni',
      instances: ['.horizontal-scroll']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: '.hero-standard.hero-standard--full-width',
      style: 'dark',
      blocks: ['hero-homepage'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Degree Search',
      selector: '#degree-search',
      style: null,
      blocks: [],
      defaultContent: ['h2:has(strong)', '#degree-search', '.unsw-brand-button-container']
    },
    {
      id: 'section-3',
      name: 'Study Options',
      selector: '.cmp-browse-degrees',
      style: null,
      blocks: ['cards-study'],
      defaultContent: ['h2']
    },
    {
      id: 'section-4',
      name: 'Rankings Stats',
      selector: '.icon-tile.uds-component',
      style: null,
      blocks: ['cards-stats'],
      defaultContent: []
    },
    {
      id: 'section-5',
      name: 'Progress for All',
      selector: '.shape-bg-colour--primary-yellow',
      style: 'yellow',
      blocks: ['columns-strategy'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Key Dates',
      selector: '.keydates',
      style: null,
      blocks: ['cards-events'],
      defaultContent: []
    },
    {
      id: 'section-7',
      name: 'Excellent research, translated',
      selector: '.horizontal-scroll',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: []
    },
    {
      id: 'section-8',
      name: 'Experience UNSW',
      selector: '.horizontal-scroll',
      style: null,
      blocks: ['cards-feature'],
      defaultContent: []
    },
    {
      id: 'section-9',
      name: 'Latest Stories',
      selector: '.latest-stories',
      style: null,
      blocks: ['cards-news'],
      defaultContent: []
    },
    {
      id: 'section-10',
      name: 'Explore a lifetime of learning',
      selector: '.card-general.unsw-brand-card-theme',
      style: null,
      blocks: ['cards-article'],
      defaultContent: []
    },
    {
      id: 'section-11',
      name: 'Alumni',
      selector: '.horizontal-scroll',
      style: 'yellow',
      blocks: ['cards-alumni'],
      defaultContent: []
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  unswCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [unswSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error('Transformer failed at ' + hookName + ':', e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      } catch (e) {
        console.warn('Invalid selector for block ' + blockDef.name + ': ' + selector);
      }
    });
  });
  console.log('Found ' + pageBlocks.length + ' block instances on page');
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error('Failed to parse ' + block.name + ' (' + block.selector + '):', e);
        }
      } else {
        console.warn('No parser found for block: ' + block.name);
      }
    });

    // 4. Execute afterTransform transformers (cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
