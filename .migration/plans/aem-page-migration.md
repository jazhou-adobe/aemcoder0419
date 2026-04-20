Let me check the current project state before creating the plan.# UNSW Homepage Migration Plan

## Overview
Migrate the UNSW homepage (`https://www.unsw.edu.au/`) to AEM Edge Delivery Services. This is a single-page migration of a university homepage, which typically includes hero banners, navigation, feature cards, news/events sections, and footer content.

## Source
- **URL:** https://www.unsw.edu.au/
- **Type:** University homepage

## Current Project State
- **Framework:** AEM Edge Delivery Services (boilerplate-based)
- **Existing blocks:** hero, columns, cards, header, footer, fragment
- **Content directory:** Empty (no content migrated yet)
- **Styles:** Default boilerplate styles in place

## Approach
Use the `excat-site-migration` skill to orchestrate the full migration workflow, which includes:

1. **Site Analysis** — Classify URL patterns and create page templates
2. **Page Analysis** — Analyze the homepage structure, sections, blocks, and content
3. **Block Mapping** — Map detected content patterns to EDS blocks (reusing existing blocks where possible, creating variants as needed)
4. **Import Infrastructure** — Generate parsers and transformers for the homepage template
5. **Content Import** — Execute the import to produce the HTML content file
6. **Design Adaptation** — Extract and apply design tokens (colors, fonts, spacing) from the original site
7. **Preview & Validation** — Verify the migrated page renders correctly in the local preview

## Checklist

- [ ] Run site analysis on `https://www.unsw.edu.au/`
- [ ] Analyze homepage structure (sections, blocks, content sequences)
- [ ] Map detected blocks to existing EDS blocks or create new variants
- [ ] Generate import infrastructure (parsers, transformers, import script)
- [ ] Execute content import to produce HTML output
- [ ] Adapt design system (colors, typography, spacing) from original site
- [ ] Preview migrated page and validate rendering
- [ ] Compare migrated page against original for visual fidelity
- [ ] Fix any rendering or styling issues identified during review

## Key Considerations
- The UNSW homepage is likely content-rich with multiple section types — expect several block variants
- Existing blocks (hero, columns, cards) may cover some patterns; new variants will be created as needed
- Images will reference source URLs (not downloaded locally)
- Navigation and footer will be handled as part of the migration

## Execution
> This plan requires **Execute mode** to proceed. Exit plan mode to begin the migration.
