# pxl [![Build](https://github.com/egeesin/pxl/actions/workflows/build.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/build.yml) [![Deploy to GH Pages](https://github.com/egeesin/pxl/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/deploy-gh-pages.yml) <img class=left src=static/asset/logo.gif width=71px align=right alt="Pixelated logo with flashy written letters 'pxl'." />
# pxl [![Build](https://github.com/egeesin/pxl/actions/workflows/build.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/build.yml) [![Deploy to GH Pages](https://github.com/egeesin/pxl/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/egeesin/pxl/actions/workflows/deploy-gh-pages.yml) [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/egeesin/pxl) <img class=left src=static/asset/logo.gif width=71px align=right alt="Pixelated logo with flashy written letters 'pxl'." />

> An adjustable framework-ish website theme (and an 11ty boilerplate) with sensible defaults and nice looks.

<img class=center src=static/asset/preview.png alt="A screenshot of the website theme previewing both light and dark theme." />

## <span style="font-weight:400">**p**retty e**x**treme **l**ist of features 'cause I ❤️ <span title="Confusing Specificity Sufferfest">CSS</span></span>

- Focused on HTML and CSS, leaving JavaScript for responsive design, a11y features and non-essential tasks only
- CSS Reset with [Sanitize.css](https://github.com/csstools/sanitize.css)
- Improved legibility with vertical rhythm and modular scale
- Mobile-first responsive design
- Auto or manual dark mode with lots of color palette options including [Solarized](https://github.com/altercation/solarized), [Gruvbox](https://github.com/morhetz/gruvbox), [One Dark UI](https://github.com/atom/one-dark-ui) and many more for each mode.
- (Almost) every element has multiple designs to serve content in multiple ways
	- Customizable and responsive navigation component
	- Container make-ups like shadow/emboss effects, border and outer border thickness, adjustable corner roundness
	- External background layers for adding blending grain/gradient effects
- [BEM](https://getbem.com/naming/) class naming with chainable modifier and [other](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) tweaks
- Support for basic multidirectional writing mode with [logical properties](https://css-tricks.com/css-logical-properties-and-values/) (WIP)

## Usage

### Installation
#### Build from Source

Tested on macOS, also should work on most GNU/Linux distros.

**Dependencies:** [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [pnpm](https://pnpm.io/installation)

**Note:** On Windows, install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or [Git for Windows](https://git-scm.com/download/win) to work with tasks that depends on Node modules and shell commands. If you go with Git for Windows, [set](https://pnpm.io/cli/run#script-shell) this configuration. `pnpm (or npm) config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`


Open a terminal emulator and execute commands below:

```sh
# Clone the repository and change directory
git clone https://github.com/egeesin/pxl && cd pxl

# 1.  Install local Node modules of the repository
pnpm i # or "npm i"

# If you're using npm, find and replace all "pnpm run" matches with "npm run" in package.json via a code editor or grep/sed CLI tool.

# 2. Generate your first build (pnpm build) and start dev server
pnpm start # or "npm start"

# Once server is running, type "http://localhost:3000" or "http://127.0.0.1:3000" in the address bar of a web browser. For testing dev server in different devices on local network, check the terminal log to access alternative host (usually begins with 192.168.1.1XX:3000)
```

### ☁️  Deploy to Your Site

> Production branch: `main`
> Build command: `pnpm build`
> Development command: `pnpm build`
> Install command: `pnpm i`
> Build directory: `dist`

[![Deploy to CloudCannon](https://buttons.cloudcannon.com/deploy.svg)](https://app.cloudcannon.com/register#sites/connect/github/egeesin/pxl)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fegeesin%2Fpxl)
[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/egeesin/pxl)
[Deploy to Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/#deploy-with-cloudflare-pages)

1. Select [**Actions**](https://github.com/egeesin/pxl/actions) tab in main [repository](https://github.com/egeesin/pxl) page.
2. Find and click on the latest successful workflow run with the green checkmark at the top of the list.
3. Scroll to the bottom and download build artifacts (`dist/`).


(TBA)

### Storing/Editing Content

(TBA)

## Design

Initially, pxl is built as a personal web theme for blogging, portfolio and various content types. But as development continued, different CSS methodologies and design systems has been applied to handle complexity and scalability.

### CSS Methodology

By chronologic order, BEM (`block--element__modifier`) naming convention, ITCSS (Inverted Triangle CSS) file structure, BEMIT (BEM + ITCSS) and other transparent UI namespaces from Harry Roberts, chainable modifiers from BEM (BEVM) and Intrinsic Web Design (influenced by Jen Simmons, Heydon Pickering & Andy Bell) are the designs pxl based of.

### Directory Structure

- Root directory contains information on metadata of this repository, which files to exclude, the license and this "README" page.

- Inside `view/` directory, there are blog/website templates written with Liquid template language on top of HTML or Markdown content, JSON global website data, transform/filter scripts and CMS media files to be processed by framework-agnostic static site generator tool called [11ty](https://11ty.dev). This directory is required for production.
- Inside `static/`, there are stylesheets, scripts, vector icons, and placeholder images. Stylesheets (`static/style`) are processed by PostCSS plugins + LightningCSS (as a PostCSS plugin) and also has sub-directories in order to emphasize and categorize different scopes of CSS.
	- `static/style/index.css` is the main file of all styles. With postcss-import and postcss-import-glob plugins, each categorized styles in corresponding subdirectory that is specified with globs are *imported* and concatenated with alphabetical order into single CSS file while building.
	- `static/style/_vendor/` or any other 3rd party CSS files sourced from `node_modules` are for including CSS Reset beforehand.
	- Styles inside `static/style/abstract/` includes mixins, custom properties (variables), animation declarations and lots of color schemes for light/dark mode. These styles affects the look, spacing, typography of every page no matter what's inside the markup.
	- `static/style/base/` includes opinionated CSS resets, theme modifiers, default HTML styles like forms, inline elements, grid layouts and reusable components.
	- `static/style/class/` includes slightly concrete components like navigations, cards, frames, headers and external background frames.
	- `static/style/shame.css` has bleeding edge, experimental, uncategorized styles. Style declarations from `shame.css` tend to be renamed, deleted or moved to relevant CSS file in the future.
- `static/script/` has client-side functions and event listeners to apply certain style modifiers of navigation and *rusty* grid component based on viewport size or update ARIA attributes of essential elements for better accessibility in screen readers. `main.js` is for production and `test.js` is for development only.
- `static/asset/` has essential media files such as favicon, webfont and placeholder images.
- `static/icon/` has SVG vector files exported from a Affinity Designer template file (not included on this repository yet). Those are for processing into a single `<symbol>` spritesheet later.
- `config/` is a place to keep all configurations of Node modules capable of checking, watching, building and optimizing source files there.

- *Plain* HTML files in `plain/` directory are for development and partials to processed by PostHTML plugins in order to decrease repeating markup and ease editing header/footer. The directory includes basic structures of various components, layouts with dummy content, color table, kitchen sink of all HTML elements. This directory is optional for production if you want to review or tinker with existing plain HTML files to make custom designs on a template language other than Liquid.
	- `plain/_include/` are the partials I mentioned earlier.
	- Templates in `plain/class/` contains the markup of reusable components, grids and layout primitives.
	- `plain/example/` includes examples of color scheme table, all classless HTML5 elements and icon preview.

#### Interpretation on Methodologies
The directory and specificity hierarchy from [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), block and element namings from [BEM](https://getbem.com/naming/), chainable modifiers from [BEVM](https://www.slideshare.net/Jyaasa/bevm-blockelementvariation-modifier)), camelCase name groups from [ABEM](https://css-tricks.com/abem-useful-adaptation-bem/) are the chosen designs that are applied as it is.

Harry Roberts' namespaces (for objects, components, utilities, theme, scope, JS states, hacks) from [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) and Intrinsic Web Design are influenced designs that needed to be tinkered with or picked only the distinctive parts of it for making it sensible to co-exist with other designs and making this project accessible.

### Typography

Most inline elements like paragraph and headings are sized based on a set modular scale. Each element has single vertical spacing unit or multiples (`var(--typeScale…)`) to keep vertical rhythm intact throughout the whole page.

Default fonts are subset and OpenType feature/stylistic set frozen version of both [Inter](https://rsms.me/inter/) and [Iosevka](https://typeof.net/Iosevka/). Fallbacks are system font stack but there are different font stacks that should work on popular operating systems for different styles. Check `static/style/abstract/01-font.css` for different font stacks.

### Media Breakpoints for Responsive Design

By default, mobile-first responsive design approach is being used and expand through different
screen sizes that fits different [human ergonomics](https://x.com/lukew/status/273453112902172672).
- wrist (smartwatches, <2inch),
- palm (smartphones, "phablets", ≥640px),
- lap (tablets on portrait mode, ≥960px),
- desk (tablets on landscape mode, laptops, desktop PCs, ≥1280px) and,
- exaggarated custom media properties like:
	- wall (desktop PCs, full HD monitors, ≥1600px)
	- mall (2K monitors, ≥1920px) and,
	- titan (ultra-wide monitors, 4K displays, ≥2400px)

### Browser Support

All web browsers that has 0.5% or higher global usage (except Opera Mini and any other deprecated browsers) are supported. Review the query from `browserslist` key in package.json. The up-to-date list of supported browsers shown [here](https://browserslist.dev/?q=Pj0gLjUlIGFuZCBub3QgZGVhZCBhbmQgbm90IG9wX21pbmkgYWxs).

## License

This project is under [GNU GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) license.

*[pxl]: Short for "pixel"
*[npm]: Node Package Manager
*[pnpm]: performant npm
*[WSL]: Windows Subsystem for Linux
*[GNU]: GNU's Not Unix!
*[GPL]: General Public License
*[BEM]: Block Element Modifier
*[JS]: JavaScript
*[CSS]: Cascading Style Sheets
*[HTML5]: Hyper Text Markup Language 5
*[HTML]: Hyper Text Markup Language
*[a11y]: accessibility
*[11ty]: Eleventy
*[i18n]: internationalization
