# pxl [![Build](https://github.com/egeesin/pxl/actions/workflows/build.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/build.yml) [![Deploy to GH Pages](https://github.com/egeesin/pxl/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/deploy-gh-pages.yml) [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/egeesin/pxl) <img class=left src=static/asset/logo.gif width=71px align=right alt="Pixelated logo with flashy written letters 'pxl'." />
> 👾 An adjustable framework-ish static site theme with sensible defaults and nice looks. *(ˈpik-səl)*
<img class=center src=static/screenshot.webp alt="A screenshot of the static site theme previewing multiple color schemes in both dark and light mode." />

English 🇬🇧 | [Türkçe 🇹🇷](https://github.com/egeesin/pxl/blob/main/README.tr.md)

**Note:** This project is under heavy development, markup structure are subject to change till first major version bump. Expect to changes may break styles/scripts between version tags. Use it only if you know what you're doing.

## Features
- 🥇 [HTML](https://youtu.be/ok-plXXHlWw) & Semantic <a href="https://youtu.be/OEV8gMkCHXQ" title="Confusing Specificity Sufferfest">CSS</a> first, JavaScript with zero-framework later for responsive layouts, accessibility features only (a.k.a. [Progressive Enchancement](https://en.wikipedia.org/wiki/Progressive_enhancement))
	- Improved legibility with vertical rhythm, modular scale, responsive text contrast
	- Basic bidirectional support with [CSS logical properties](https://css-tricks.com/css-logical-properties-and-values/)
	- CSS reset by [Sanitize.css](https://github.com/csstools/sanitize.css)
	- Layout Primitives from [*Every Layout*](https://every-layout.dev)
- 🎈 [11ty](https://11ty.dev)-compatible templates written in Liquid [template language](https://shopify.dev/docs/api/liquid#what_is_a_template_language)
	- Plain version of templates are processed by [PostHTML](https://github.com/posthtml/posthtml#readme) and compatible plugins
- 🌗 Light and dark mode support
	- Auto selects based on system preference first, lets you toggle theme with [drkmd.js](https://github.com/BetaHuhn/drkmd.js#readme)
	- Each mode has their own color scheme preference like [Solarized](https://github.com/altercation/solarized#readme), [Gruvbox](https://github.com/morhetz/gruvbox), [One Dark UI](https://github.com/atom/one-dark-ui#readme)…
	- Each color scheme has different shades and tones of layers and 6 + 2 hues that is converted and edited from [Tinted Theming](https://github.com/tinted-theming/schemes) base16 schemes
- 🎛 Objects and components with lots of style modifiers
	- Container make-ups like border/outline (as `box-shadow`) thickness, corner roundness, shadow/emboss effects,
	- Responsive masonry layout and navigation component in homepage layout by default
	- Optional external backgrounds for adding blending, grain/gradient effects that is full-sized fixed in all platforms.
	- [BEM](https://getbem.com/naming/) class naming with chainable modifier and [other](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) tweaks for making code readable to both humans and web browsers.
- 👷 Building ([PostCSS](https://github.com/postcss/postcss-cli#usage) + [Lightning CSS](https://github.com/onigoetz/postcss-lightningcss#readme), [PostHTML](https://github.com/posthtml/posthtml-cli#readme)), validation ([html-validate](https://html-validate.org/usage/cli.html), [biome](https://biomejs.dev/analyzer/#import-sorting-via-cli)), optimization ([htmlnano](https://htmlnano.netlify.app/), [swc](https://swc.rs/), [svgo](https://github.com/svg/svgo), Lightning CSS, [sharp](https://sharp.pixelplumbing.com/)) and file watching (via [chokidar](https://github.com/paulmillr/chokidar#readme)) tasks for markup, style, script and media files in PNPM scripts
- ⚡️ Local, live and minimal dev server from [11ty](https://www.11ty.dev/docs/watch-serve/#eleventy-dev-server)

## Demos
- [GitHub Pages](https://pxl.egeesin.com)
- [PageSpeed Insights](https://pagespeed.web.dev/report?url=https://pxl.egeesin.com)

## Setup

### 📦 Build from Source
**Prerequisities**
- [Node.js 18 LTS, 20 LTS or later](https://nodejs.org/en/download)
- [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [`pnpm`](https://pnpm.io/installation)

**Note:** On Windows, install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or [Git for Windows](https://git-scm.com/download/win) to work with tasks that depends on Node modules and shell commands. If you go with Git for Windows, [set](https://pnpm.io/cli/run#script-shell) this configuration. `pnpm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`

Open a terminal emulator (In Windows, right-click on start menu and select "Windows PowerShell" or in macOS, press `⌘+Space` and type "Terminal.app") and follow commands below:

```sh
# Clone the repository and change directory
git clone https://github.com/egeesin/pxl && cd pxl

# Install local Node modules of the repository
pnpm i

# Generate your first build (pnpm build) and start dev server (pnpm watch)
pnpm start

# Once server is running, type "http://localhost:3000" or
# "http://127.0.0.1:3000" in the address bar of a web browser. For testing
# dev server in different devices on local network, check the terminal log
# to access alternative host (usually begins with 192.168.1.1XX:3000)
```

### ☁️  Deployment
**Warning:** None of those deployment options are tested yet. Use it if you know what you're doing.

- Production branch: `main`
- Build command: `pnpm build`
- Development command: `pnpm build`
- Install command: `pnpm i`
- Build directory: `dist`

[![Deploy to CloudCannon](https://buttons.cloudcannon.com/deploy.svg)](https://app.cloudcannon.com/register#sites/connect/github/egeesin/pxl)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fegeesin%2Fpxl)
[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/egeesin/pxl)
[Deploy to Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/#deploy-with-cloudflare-pages)

### 🐙 Download Build Artifact
1. Select [**Actions**](https://github.com/egeesin/pxl/actions) tab in main [repository](https://github.com/egeesin/pxl) page.
2. Find and click on the latest successful workflow run with the green checkmark at the top of the list.
3. Scroll to the bottom and download build artifacts (`dist/`).

## Usage
After you've cloned/forked this project in *Setup* section, follow the steps below:

### 🧹 Cleanup Steps
- [ ] Clear author, repository, funding inside `package.json`.
- [ ] Clear files inside `view/media/` and `view/_content/blog/article/` (Keep one if you need a dummy Markdown post to copy new posts from.)
- [ ] (Optional) Remove `plain/` and set Node environment as "production" if you're not interested in testing with theme components. (All tasks contains "plain" must be skipped in build command!)
- [ ] (Optional) If you're not using the built-in icon set, clear files inside `src/icon/` as well.
- [ ] More steps coming soon…

### ✅ Essentials Checklist
- [ ] For global site info like title, favicon, author, social links, edit `view/_data/site.json`.
- [ ] For navigation items, edit `view/_data/nav.json`.
- [ ] For post content, import your Markdown files to `view/_content/blog/article/`. (e.g. `./2024-02-24-post-title.md`) Make sure it has identical front matter keys in example Markdown post. If you're migrating from WordPress, in admin dashboard, export XML backup of your posts to [convert](https://github.com/lonekorean/wordpress-export-to-markdown) it as bulk Markdown files.
- [ ] (Optional) For making site Progressive Web App (PWA), edit `view/app.webmanifest.liquid`
- [ ] (Optional) To override CSS styles, edit `static/style/shame.css`. Also, you can make another CSS file as long as you don't forget to `@import` it in `static/style/index.css`. `@import-glob` is also [allowed](https://github.com/dimitrinicolas/postcss-import-ext-glob).
- [ ] More steps coming soon…

### 🎨 Theme Modification
- [ ] Discover modifications as seen in [here](https://pxl.egeesin.com/plain/).
- [ ] Edit `html_classes` and `body_classes` part in `view/_data/site.json` according to your likings.
- [ ] (Optional) Use front matter keys such as `append_html_class` or `append_body_class` to force theme modification per page.
- [ ] More steps coming soon…

### 🖥️ CLI Scripts
- `pnpm build`: Build production/dev directory
- `pnpm watch`: Watch production/dev directory and serve dev server
- `pnpm upmod`: Update dependencies and package.json
- `pnpm debug:11ty`: Output debug messages from Eleventy build task
- `pnpm "/^optimize:.*/"`: Execute all run scripts that begins with "optimize:" in parallel with nice output.
- `pnpm exec browserslist | pbcopy`: Copies the list of min. supported browser versions to your clipboard so you can easily import this to [Can I Use?](https://caniuse.com/ciu/settings#browsers) as a new set. (Works in macOS with shell env. To use different clipboard tool replace "pbcopy" part)
**Note:** Check more PNPM run scripts in `package.json`

#### Related 3rd Party Commands
- `cloc <path-to-directory> --exclude-dir=node_modules,tmp,dist,.git,utility --exclude-ext=svg,png,jpg,jpeg,webp,tif,ico`: If you have [`cloc`](https://github.com/AlDanial/cloc), calculate total count of lines of the input.

### 🔑 Environment Variable
- `WEBMENTION_IO_TOKEN`

## Design
Initially, pxl is built as a personal web theme for blogging, portfolio and various content types. But as development kept going, different CSS methodologies and design systems has been applied to handle complexity and scalability.

### CSS Methodology
By chronologic order, BEM (`block--element__modifier`) naming convention, ITCSS (Inverted Triangle CSS) file structure, BEMIT (BEM + ITCSS) and other transparent UI namespaces from Harry Roberts, chainable modifiers from BEM (BEVM) and Intrinsic Web Design (influenced by Jen Simmons, Heydon Pickering & Andy Bell) are the designs pxl based on.

#### Interpretation on Methodologies
The directory and specificity hierarchy from [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), block and element namings from [BEM](https://getbem.com/naming/), chainable modifiers from [BEVM](https://www.slideshare.net/Jyaasa/bevm-blockelementvariation-modifier)), camelCase name groups from [ABEM](https://css-tricks.com/abem-useful-adaptation-bem/) are the chosen designs that are applied as it is.

Harry Roberts' namespaces (for objects, components, utilities, theme, scope, JS states, hacks) from [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) and Intrinsic Web Design are influenced designs that needed to be tinkered with or picked only the distinctive parts of it for making it sensible to co-exist with other designs and making this project accessible.
### Directory Structure
- Root directory contains information on metadata of this repository, which files to exclude, the license and this "README" page.

- Inside `view/` directory, there are blog/website templates written with Liquid on top of HTML or Markdown content, JSON global website data, transform/filter scripts and CMS media files to be processed by framework-agnostic static site generator tool called [11ty](https://11ty.dev). This directory is required for production.
- Inside `static/`, there are stylesheets, scripts, vector icons, and placeholder images. Stylesheets (`static/style`) are processed by PostCSS plugins + LightningCSS (as a PostCSS plugin) and also has sub-directories in order to emphasize and categorize different scopes of CSS.
	- `static/style/index.css` is the main file of all styles. With postcss-import and postcss-import-glob plugins, each categorized styles in corresponding subdirectory that is specified with globs are *imported* and concatenated with alphabetical order into single CSS file while building.
	- `static/style/_vendor/` or any other 3rd party CSS files sourced from `node_modules` are for including CSS Reset beforehand.
	- Styles inside `static/style/abstract/` includes mixins, custom properties (variables), animation declarations and lots of color schemes for light/dark mode. These styles affects the look, spacing, typography of every page no matter what's inside the markup.
	- `static/style/base/` includes opinionated CSS resets, theme modifiers, default HTML styles like forms, inline elements, grid layouts and reusable components.
	- `static/style/class/` includes slightly concrete components like navigations, cards, frames, headers and external background frames.
	- `static/style/shame.css` has bleeding edge, experimental, uncategorized styles. Style declarations from `shame.css` tend to be renamed, deleted or moved to relevant CSS file in the future.
- `static/script/` has client-side functions and event listeners to apply certain style modifiers of navigation and *rusty* grid component based on viewport size or update ARIA attributes of essential elements for better accessibility in screen readers. `main.js` is for production and `test.js` is for development only.
- `static/asset/` has essential media files such as webfont and placeholder images.
- `static/icon/` has SVG vector files exported from a Affinity Designer template file (not included on this repository yet). Those are for processing into a single `<symbol>` spritesheet later.
- `config/` is a place to keep all configurations of Node modules capable of checking, watching, building and optimizing source files there.

- *Plain* HTML files in `plain/` directory are for development and partials to processed by PostHTML plugins in order to decrease repeating markup and ease editing header/footer. The directory includes basic structures of various components, layouts with dummy content, color table, kitchen sink of all HTML elements. This directory is optional for production if you want to review or tinker with existing plain HTML files to make custom designs on a template language other than Liquid.
	- `plain/_include/` are the partials I mentioned earlier.
	- Templates in `plain/class/` contains the markup of reusable components, grids and layout primitives.
	- `plain/example/` includes examples of color scheme table, all classless HTML5 elements and icon preview.

### Typography
Most inline elements like paragraph and headings are sized based on a set modular scale. Each element has single vertical spacing unit or multiples (`var(--typeScale…)`) to keep vertical rhythm intact throughout the whole page.

Default fonts are subset and OpenType feature/stylistic set frozen version of both [Inter](https://rsms.me/inter/) and [Iosevka](https://typeof.net/Iosevka/). Fallbacks are system font stack but there are different font stacks that should work on popular operating systems for different styles. Check `static/style/abstract/01-font.css` for different font stacks.

### Media Breakpoints for Responsive Design
By default, mobile-first responsive design approach is being used and expand through different
screen sizes that fits different [human ergonomics](https://x.com/lukew/status/273453112902172672).
- 🤝 wrist (smartwatches, <2inch),
- 🤲 palm (smartphones, *phablets*, ≥640px),
- 🦵 lap (tablets on portrait mode, ≥960px),
- 🖥️ desk (tablets on landscape mode, laptops, desktop PCs, ≥1280px) and,
- exaggarated custom media properties like:
	- 🖼️ wall (desktop PCs, full HD monitors, ≥1600px)
	- 🏬 mall (2K monitors, ≥1920px) and,
	- 🦖 titan (ultra-wide monitors, 4K displays, ≥2400px)

### Browser Support
All web browsers that has 0.5% or higher global usage (except Opera Mini and any other deprecated browsers) are supported. Review the query from `browserslist` key in package.json. The up-to-date list of supported browsers shown [here](https://browserslist.dev/?q=Pj0gLjUlIGFuZCBub3QgZGVhZCBhbmQgbm90IG9wX21pbmkgYWxs).

## License
This project is under [GNU GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) license.
