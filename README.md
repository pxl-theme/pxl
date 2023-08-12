# pxl-theme [![Build](https://github.com/egeesin/pxl/actions/workflows/node-gulp.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/node-gulp.yml) <img class=left src=logo.gif width=71px align=right alt="Pixelated logo with flashy written letters 'pxl'." />

> An adjustable website theme with sensible defaults and nice looks.

<img class=center src=preview.png alt="A screenshot of the website theme previewing both light and dark theme." />

## Features

- Responsive layout with mobile-first approach
- Several variations for navigation component
- Heavily depending on HTML and CSS, leaving JS for providing accessibility and non-essential tweaks
- No CSS frameworks used
- Improved legibility with vertical rhythm and modular scale
- Auto or manual dark mode with lots of color palette options including [Solarized](https://github.com/altercation/solarized), [Gruvbox](https://github.com/morhetz/gruvbox), [One Dark UI](https://github.com/atom/one-dark-ui)  for each mode.
- (Almost) every element has multiple designs to serve content in multiple ways
	- Container make-ups like shadows, border thickness, emboss effects
	- External background layers for adding blending grain/gradient effects
- Sanitize.css Reset
- Scalable codebase, written with OOCSS, BEVM in mind
- Custom grid layout (CSS Grid will be adapted soon)
- Basic multidirectional writing mode with [logical properties](https://css-tricks.com/css-logical-properties-and-values/)
- Builds with [Gulp](https://gulpjs.com/) task runner with advanced configuration
	- CSS written with PostCSS plugins including `autoprefixer`, `nested`, `custom-media`
	- Optimized via [HTMLMinifier](https://github.com/kangax/html-minifier), [cssnano](https://github.com/cssnano/cssnano) and [terser](https://github.com/terser/terser)
	- Optional (and also experimental) tasks like renaming class selectors, removing unused selectors

## Build

### Method 1: Locally
**Note:** Instructions tested on GNU/Linux distros and macOS.

**Dependencies:** [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [pnpm](https://pnpm.io/installation) (or [npm](https://www.npmjs.com/get-npm)), [gulp](https://gulpjs.com/docs/en/getting-started/quick-start)

Open a terminal emulator and execute commands below:

```sh
# Clone the repository and change directory
git clone https://github.com/egeesin/pxl && cd pxl

# Install Node modules locally.
pnpm i # or "npm i"

# Generate your first build
gulp build

# Create live server for preview of the build
gulp watch
```

### Build Method 2: GitHub Actions
- Go to [**Actions**](https://github.com/egeesin/pxl/actions) tab in [repository](https://github.com/egeesin/pxl) homepage.
- Find latest successful workflow run.
- Scroll to bottom and download build artifacts.


## General Info

### Browser Support

All modern browsers released last 2 years are supported. Supporting legacy browsers isn't main focus yet. For details, check `browserslist` section in `package.json`.

### Concepts & The Design

(To be documented…)

### Methodology/Class Namings

It's based on a combination of [BEM](http://getbem.com/naming/), [OOCSS](https://www.slideshare.net/stubbornella/object-oriented-css), [BEVM](https://webuild.envato.com/blog/chainable-bem-modifiers/) and [Harry Roberts' namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/).

In this theme, intention is to combine a few of naming conventions to improve legibility and maintainability. Word groups are written with `camelCase` instead of comma-separated in order to not confused between seperation of `block-element-modifier` and word group.

Modifier and variant classes are separated from block and element classes. If you familiar with UNIX command line this will probably help.

```
// 👎
block block--modifier
	block__element block__element--modifier

// 👍
block --modifier
	block__element --modifier
block -variant
```

To connect modifier with a block(in CSS): ``.block.-modifier``

### Typography
Almost all box units are (r)em-based. Heading elements are proportionally sized by modular scale and each typographic element margin resized to fit vertical rhythm. Thanks to CSS custom properties, everything is reconfigurable. Default font-family is Inter V (patched version of Iosevka as default monospace font) and fallback is system font stack.

### Media Breakpoints
Breakpoints in the media queries based on [human ergonomics](https://twitter.com/lukew/status/273453112902172672).

## Known Issues
- Undocumented combinations of variants or modifiers may not look perfect.
- Contrast value between different color palettes may differ, need further adjustment to match their counterparts.
- Anchor text underline animates on hover except Chrome or any other Chromium based web browsers.

## Roadmap

- [x] Custom icon set
- [ ] Selector whitelist for PurgeCSS and rcs
- [ ] Complete documentation
- [ ] Export options for 11ty templates
- [ ] CSS Grid support
- [ ] [Pywal](https://github.com/dylanaraps/pywal) color theme compatibility
- [ ] WordPress Block Theme support
- [ ] Update CSS when implementations [below](https://caniuse.com/?feats=view-transitions,css-relative-colors,css-text-box-trim,mdn-css_types_color_color-mix,css-media-range-syntax,css-cascade-layers,mdn-css_types_length_lh,mdn-css_at-rules_property,mdn-css_types_color_oklch,css-container-queries,style-scoped,jpegxl,css-has,css-text-wrap-balance) got wide browser support in the future:
	- Selectors 4 ([:has](https://drafts.csswg.org/selectors-4/#relational))
	- Color Module Level 5 (Awaiting for Firefox support) ([OKLCH unit](https://drafts.csswg.org/css-color-5/#relative-OKLCH), [color-mix()](https://drafts.csswg.org/css-color-5/#color-mix)], [Relative Color Syntax](https://drafts.csswg.org/css-color-5/#relative-colors), )
	- [@property values](https://developer.mozilla.org/en-US/docs/Web/CSS/@property#browser_compatibility)
	- Units and Values Module Level 4 ([Exponent Functions (pow() especially)](https://www.w3.org/TR/css-values-4/#exponent-funcs), [Stepped Value Functions (round())](https://www.w3.org/TR/css-values-4/#funcdef-round), [Font-relative lengths (lh)](https://www.w3.org/TR/css-values-4/#lh))
	- env() in media queries

## License
Theme is under [GNU GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) license.
