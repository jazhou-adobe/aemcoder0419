var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-homepage.js
  function parse(element, { document }) {
    var heading = element.querySelector(".hero-heading h1, .hero-heading p, h1");
    var description = element.querySelector(".hero-sub-heading p, .hero-sub-heading");
    var ctaLink = element.querySelector(".hero-cta a");
    var bgImage = element.querySelector(".hero-image img, .hero-backdrop img, picture img");
    var cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    var contentCell = document.createElement("div");
    if (heading) contentCell.append(heading);
    if (description) contentCell.append(description);
    if (ctaLink) contentCell.append(ctaLink);
    if (contentCell.childNodes.length > 0) cells.push([contentCell]);
    var block = WebImporter.Blocks.createBlock(document, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-study.js
  function parse2(element, { document }) {
    var cards = element.querySelectorAll(".cmp-browse-degrees__card");
    if (!cards.length) return;
    var cells = [];
    cards.forEach(function(card) {
      var image = card.querySelector(".cmp-browse-degrees__header__image img, img");
      var title = card.querySelector(".cmp-browse-degrees__header__title, span");
      var links = Array.from(card.querySelectorAll(".cmp-browse-degrees__list__item__link, .cmp-browse-degrees__list a"));
      var imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      var contentCell = document.createElement("div");
      if (title) {
        var h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        contentCell.append(h3);
      }
      var ul = document.createElement("ul");
      links.forEach(function(link) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent.trim();
        li.append(a);
        ul.append(li);
      });
      if (ul.children.length > 0) contentCell.append(ul);
      cells.push([imageCell, contentCell]);
    });
    var block = WebImporter.Blocks.createBlock(document, { name: "cards-study", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-stats.js
  function parse3(element, { document }) {
    var tiles = element.querySelectorAll(".icon-tile-item");
    if (!tiles.length) return;
    var cells = [];
    tiles.forEach(function(tile) {
      var icon = tile.querySelector("img.image, picture img, img");
      var heading = tile.querySelector(".tile-heading");
      var subtitle = tile.querySelector(".tile-subtitle");
      var copy = tile.querySelector(".tile-copy");
      var link = tile.querySelector("a");
      var imageCell = document.createElement("div");
      if (icon) imageCell.append(icon);
      var contentCell = document.createElement("div");
      if (heading) {
        var h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        contentCell.append(h3);
      }
      if (subtitle) {
        var sub = document.createElement("p");
        sub.textContent = subtitle.textContent.trim();
        contentCell.append(sub);
      }
      if (copy) contentCell.append(copy);
      if (link) {
        var a = document.createElement("a");
        a.href = link.href;
        a.textContent = "Learn more";
        contentCell.append(a);
      }
      cells.push([imageCell, contentCell]);
    });
    var block = WebImporter.Blocks.createBlock(document, { name: "cards-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-strategy.js
  function parse4(element, { document }) {
    var parent = element.closest(".column-layout") || element;
    var grids = parent.querySelectorAll(":scope .responsivegrid, :scope > span > div > div");
    var image = parent.querySelector(".cmp-image__image, .tpl-image img, img");
    var heading = parent.querySelector(".cmp-text h2, h2");
    var paragraph = parent.querySelector(".cmp-text p, p");
    var buttons = Array.from(parent.querySelectorAll(".unsw-brand-button-container a"));
    var leftCell = document.createElement("div");
    if (image) leftCell.append(image);
    var rightCell = document.createElement("div");
    if (heading) rightCell.append(heading);
    if (paragraph) rightCell.append(paragraph);
    buttons.forEach(function(btn) {
      rightCell.append(btn);
    });
    var cells = [[leftCell, rightCell]];
    var block = WebImporter.Blocks.createBlock(document, { name: "columns-strategy", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-events.js
  function parse5(element, { document }) {
    var entries = element.querySelectorAll(".key-date-entry");
    if (!entries.length) return;
    var cells = [];
    entries.forEach(function(entry) {
      var dateBlock = entry.querySelector(".date-block");
      var category = entry.querySelector(".key-date-category");
      var title = entry.querySelector(".key-date-title h3, .key-date-title");
      var dateCell = document.createElement("div");
      if (dateBlock) {
        var dateText = dateBlock.textContent.replace(/\s+/g, " ").trim();
        var p = document.createElement("p");
        p.textContent = dateText;
        dateCell.append(p);
      }
      var contentCell = document.createElement("div");
      if (category) {
        var em = document.createElement("em");
        em.textContent = category.textContent.trim();
        contentCell.append(em);
      }
      if (title) {
        var h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        contentCell.append(h3);
      }
      if (entry.href) {
        var a = document.createElement("a");
        a.href = entry.href;
        a.textContent = "Learn more";
        contentCell.append(a);
      }
      cells.push([dateCell, contentCell]);
    });
    var block = WebImporter.Blocks.createBlock(document, { name: "cards-events", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-research.js
  function parse6(element, { document }) {
    var slides = element.querySelectorAll(".slick-slide .card-general, .card-general");
    if (!slides.length) return;
    var cells = [];
    slides.forEach(function(slide) {
      var image = slide.querySelector(".card-teaser__image img, picture img, img");
      var link = slide.querySelector("a.title-link, a.base");
      var title = slide.querySelector("h3.title, h3");
      var description = slide.querySelector(".content p, .content");
      var imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      var contentCell = document.createElement("div");
      if (title) contentCell.append(title);
      if (description) contentCell.append(description);
      if (link) {
        var a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent.trim() || "Learn more";
        contentCell.append(a);
      }
      cells.push([imageCell, contentCell]);
    });
    if (cells.length > 0) {
      var block = WebImporter.Blocks.createBlock(document, { name: "carousel-research", cells });
      element.replaceWith(block);
    }
  }

  // tools/importer/parsers/cards-feature.js
  function parse7(element, { document }) {
    var cards = element.querySelectorAll(".card-general");
    if (!cards.length) return;
    var cells = [];
    cards.forEach(function(card) {
      var image = card.querySelector(".card-teaser__image img, picture img, img");
      var link = card.querySelector("a.title-link, a.base");
      var title = card.querySelector("h3.title, h3");
      var description = card.querySelector(".content p, .content");
      var imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      var contentCell = document.createElement("div");
      if (title) contentCell.append(title);
      if (description) contentCell.append(description);
      if (link) {
        var a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent.trim() || "Learn more";
        contentCell.append(a);
      }
      cells.push([imageCell, contentCell]);
    });
    var block = WebImporter.Blocks.createBlock(document, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse8(element, { document }) {
    var stories = element.querySelectorAll('a.story, a[id^="story-"]');
    if (!stories.length) return;
    var cells = [];
    stories.forEach(function(story) {
      var image = story.querySelector("img");
      var title = story.querySelector("h3, .title");
      var description = story.querySelector(".description, p:not(.title)");
      var imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      var contentCell = document.createElement("div");
      if (title) {
        var h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        contentCell.append(h3);
      }
      if (description) contentCell.append(description);
      if (story.href) {
        var a = document.createElement("a");
        a.href = story.href;
        a.textContent = "Read more";
        contentCell.append(a);
      }
      cells.push([imageCell, contentCell]);
    });
    var block = WebImporter.Blocks.createBlock(document, { name: "cards-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse9(element, { document }) {
    var link = element.querySelector("a.title-link, a.base");
    if (!link) return;
    var title = element.querySelector("h3.title, h3");
    var description = element.querySelector(".content p, .content");
    var contentCell = document.createElement("div");
    if (title) contentCell.append(title);
    if (description) contentCell.append(description);
    if (link.href) {
      var a = document.createElement("a");
      a.href = link.href;
      a.textContent = "Read more";
      contentCell.append(a);
    }
    var cells = [[contentCell]];
    var block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-alumni.js
  function parse10(element, { document }) {
    var cards = element.querySelectorAll(".card-general");
    if (!cards.length) return;
    var cells = [];
    cards.forEach(function(card) {
      var image = card.querySelector(".card-teaser__image img, picture img, img");
      var link = card.querySelector("a.title-link, a.base");
      var title = card.querySelector("h3.title, h3");
      var description = card.querySelector(".content p, .content");
      var imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      var contentCell = document.createElement("div");
      if (title) contentCell.append(title);
      if (description) contentCell.append(description);
      if (link) {
        var a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent.trim() || "Learn more";
        contentCell.append(a);
      }
      cells.push([imageCell, contentCell]);
    });
    var block = WebImporter.Blocks.createBlock(document, { name: "cards-alumni", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/unsw-cleanup.js
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#cookieConsentEnabled",
        ".header-overlay",
        ".cc-message"
      ]);
    }
    if (hookName === "afterTransform") {
      WebImporter.DOMUtils.remove(element, [
        ".globalheader",
        ".globalfooter",
        ".skip-to-source",
        ".skip-to-target",
        ".breadcrumb",
        ".socialfollow",
        "#page-analytics",
        "#category-analytics",
        ".background-shape-container",
        ".hero-standard-feed-embed",
        ".hero-standard-video-desktop",
        ".hero-standard-video-mobile",
        "header",
        "footer",
        "noscript",
        "iframe",
        "link"
      ]);
      element.querySelectorAll("[data-track]").forEach(function(el) {
        el.removeAttribute("data-track");
      });
      element.querySelectorAll("[onclick]").forEach(function(el) {
        el.removeAttribute("onclick");
      });
    }
  }

  // tools/importer/transformers/unsw-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      let findSectionElement = function(section) {
        var selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (var s = 0; s < selectors.length; s++) {
          try {
            var el = element.querySelector(selectors[s]);
            if (el) return el;
          } catch (e) {
          }
        }
        var headings = element.querySelectorAll("h2");
        for (var h = 0; h < headings.length; h++) {
          var text = headings[h].textContent.trim();
          if (text === section.name || text.indexOf(section.name) === 0) {
            return headings[h];
          }
        }
        return null;
      }, findAncestor = function(el) {
        var ancestor = el;
        while (ancestor.parentElement && ancestor.parentElement !== element) {
          ancestor = ancestor.parentElement;
        }
        return ancestor;
      };
      var sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      var document = element.ownerDocument;
      var anchors = [];
      for (var i = 0; i < sections.length; i++) {
        var sectionEl = findSectionElement(sections[i]);
        if (sectionEl) {
          anchors.push({ ancestor: findAncestor(sectionEl), section: sections[i] });
        } else {
          anchors.push(null);
        }
      }
      for (var j = anchors.length - 1; j >= 0; j--) {
        if (!anchors[j]) continue;
        var anchor = anchors[j].ancestor;
        var sec = anchors[j].section;
        if (sec.style) {
          var metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: sec.style }
          });
          anchor.after(metaBlock);
        }
        if (j > 0) {
          var hr = document.createElement("hr");
          anchor.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "cards-study": parse2,
    "cards-stats": parse3,
    "columns-strategy": parse4,
    "cards-events": parse5,
    "carousel-research": parse6,
    "cards-feature": parse7,
    "cards-news": parse8,
    "cards-article": parse9,
    "cards-alumni": parse10
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "University homepage with hero banner, featured content, news, events, and calls to action",
    urls: [
      "https://www.unsw.edu.au/"
    ],
    blocks: [
      {
        name: "hero-homepage",
        instances: [".hero-standard.hero-standard--full-width"]
      },
      {
        name: "cards-study",
        instances: [".cmp-browse-degrees"]
      },
      {
        name: "cards-stats",
        instances: [".icon-tile.uds-component"]
      },
      {
        name: "columns-strategy",
        instances: [".shape-bg-colour--primary-yellow"]
      },
      {
        name: "cards-events",
        instances: [".keydates"]
      },
      {
        name: "carousel-research",
        instances: [".horizontal-scroll"]
      },
      {
        name: "cards-feature",
        instances: [".horizontal-scroll"]
      },
      {
        name: "cards-news",
        instances: [".latest-stories"]
      },
      {
        name: "cards-article",
        instances: [".card-general.unsw-brand-card-theme"]
      },
      {
        name: "cards-alumni",
        instances: [".horizontal-scroll"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".hero-standard.hero-standard--full-width",
        style: "dark",
        blocks: ["hero-homepage"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Degree Search",
        selector: "#degree-search",
        style: null,
        blocks: [],
        defaultContent: ["h2:has(strong)", "#degree-search", ".unsw-brand-button-container"]
      },
      {
        id: "section-3",
        name: "Study Options",
        selector: ".cmp-browse-degrees",
        style: null,
        blocks: ["cards-study"],
        defaultContent: ["h2"]
      },
      {
        id: "section-4",
        name: "Rankings Stats",
        selector: ".icon-tile.uds-component",
        style: null,
        blocks: ["cards-stats"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Progress for All",
        selector: ".shape-bg-colour--primary-yellow",
        style: "yellow",
        blocks: ["columns-strategy"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Key Dates",
        selector: ".keydates",
        style: null,
        blocks: ["cards-events"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Excellent research, translated",
        selector: ".horizontal-scroll",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Experience UNSW",
        selector: ".horizontal-scroll",
        style: null,
        blocks: ["cards-feature"],
        defaultContent: []
      },
      {
        id: "section-9",
        name: "Latest Stories",
        selector: ".latest-stories",
        style: null,
        blocks: ["cards-news"],
        defaultContent: []
      },
      {
        id: "section-10",
        name: "Explore a lifetime of learning",
        selector: ".card-general.unsw-brand-card-theme",
        style: null,
        blocks: ["cards-article"],
        defaultContent: []
      },
      {
        id: "section-11",
        name: "Alumni",
        selector: ".horizontal-scroll",
        style: "yellow",
        blocks: ["cards-alumni"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error("Transformer failed at " + hookName + ":", e);
      }
    });
  }
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
              section: blockDef.section || null
            });
          });
        } catch (e) {
          console.warn("Invalid selector for block " + blockDef.name + ": " + selector);
        }
      });
    });
    console.log("Found " + pageBlocks.length + " block instances on page");
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error("Failed to parse " + block.name + " (" + block.selector + "):", e);
          }
        } else {
          console.warn("No parser found for block: " + block.name);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
