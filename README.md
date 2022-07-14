# pxl
> A framework-ish theme that customizable and modern as possible.

<img class="center" src="screenshot.png" alt="As you can see, Solarized theme has 2 variants: day and night." />

## Features

- Mobile-first responsive layout.
- (Almost) every element has multiple designs to serve content in multiple ways.
	- Color palette options from popular term/code editor themes like Solarized, Monokai, Atom One etc.
	- Auto, dark or light theme
	- Navigation views for every screen sizes/comforts like [touch-friendly](https://osvaldas.info/drop-down-navigation-responsive-and-touch-friendly) dropdown menu, collapsible tree view or navigation bar
- Scalable codebase, written with OOCSS, BEVM in mind.
	- Opinionated styles as options.
	- Only homemade components.
- Improved legibility with vertical rhythm and modular scale by default.
- Sanitize.css reset
- Supports modern web browsers except all versions of IE, Opera Mini, and other browsers that has global usage lesser than 0.33%
- Automated builds with [Gulp.js](https://gulpjs.com/) toolkit.
- Built-in 11ty templates with HTML and Liquid template language.

## Build

**Note:** Instructions tested on Linux and macOS.

**Dependencies:** [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [npm](https://www.npmjs.com/get-npm), [gulp](https://gulpjs.com/docs/en/getting-started/quick-start)

Open a terminal emulator (/Applications/Terminal.app in macOS) and execute commands below.

```sh
# Clone the repository to your local machine
git clone https://github.com/egeesin/pxl

# Change directory
cd pxl

# Install Gulp plugins to local directory.
npm install

# Generate
gulp build

# Open in your browser
gulp watch # or just gulp
```

### Browser Support

The intention is to support modern browsers to use newest tools. Supporting legacy browsers isn't main focus yet. Check supported browsers list in `package.json`.

### Methodology/Class Namings

It's based on a combination of [BEM](http://getbem.com/naming/), [OOCSS](https://www.slideshare.net/stubbornella/object-oriented-css), [BEVM](https://webuild.envato.com/blog/chainable-bem-modifiers/) and [Harry Roberts' namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/).

In this theme, intention is to combine a few of naming conventions to improve legibility and maintainability. Word groups are written with `camelCase` instead of comma-separated in order to not confused between seperation of `block-element-modifier` and word group.

Modifier and variant classes are separated from block and element classes. If you familiar with UNIX command line this will probably help.

```
// Not like this
block block--modifier
	block__element block__element--modifier

// But this
block --modifier
	block__element --modifier
block -variant
```

To connect modifier with a block(in CSS): ``.block.-modifier``

### Typography
Every width, height, padding, margin unit are em-based. Heading elements are proportionally sized by modular scale and each typographic element margin resized to fit vertical rhythm. Thanks to CSS variables, everything is reconfigurable. Default font is Inter V and fallback is system font stack.

### Concepts
Most of them has pretty simple purposes. As far as it's simple, all of them can be reusable, some of them can be placed recursively.

#### Card | ``c-card``
It's a familiar concept that mostly visually seen in Material Design, iOS App Store. Cards are portable and contains any type of content. Height of a card must be formed by included content.

Cards must not look like it's part of element itself but children of element. That's the main difference between frames and cards. The visuals may differ on or has exclusions in small screens.

#### Frame | ``c-frame``
This concept can host full-sized content like jumbotron, videos. It must looks like **part** of element. Visually, frames must contain, not being contained. Width of a frame is also width of viewport.

#### Rusty Grid | ``o-rustygrid``
This grid system based on [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids) with altered namings.

#### Navigation | ``o-nav``
A navigation menu must let reader navigate through site or category. It doesn't have be limited to be a navigation bar. This concept can involve Table of Content lists, site map, blog tags and other relevant things too.

##### Tree View | ``o-nav -viewTree``
Tree view is the most simple form of a navigation concept.

##### Dropdown View | ``o-nav -viewDropdown``
A navigation bar with only first-level shown. Deeper levels displayed by hovering cursor on its parent (in mobile, by tapping its parent). It's useful to make complex navigations look compact.

With ``-collapsible`` option, first-level of navigation bar minimizes to toggle (``c-toggleTrigger``) button. Highly recommended for handheld devices, if you have complex menu items.

Dropdown navigation placement can also changed by ``-positionTop`` and ``-positionSide``

**Note:** All functions except arrows works without JavaScript.

#### Perfectly Full-Sized, Fixed Background Image
Originally, to make background image viewable as much as possible no matter how window resized, there's an independent element with 'c-background -viewFullSizeFixed' classes. It's necessary if you want your background image look fixed in iOS. ([Source](https://css-tricks.com/perfect-full-page-background-image/))

### Colors
The default color theme is based on Solarized theme which terminal users is familiar with because of different tones, harmonical colors and dark theme option. But users who doesn't prefer Solarized can choose other themes like Monokai, Seti, Night Owl, Atom One etc. or change color variables.

### Media Breakpoints

Unlike most other works breakpoints are not grouped by device/model names but [human ergonomics](https://twitter.com/lukew/status/273453112902172672).

## Known Issues

- Long sub-menus are unreachable in short screens.
- Different combinations of navigations may not look as expected.
- Contrasts between different layers of colors may differ.

## Roadmap

- [x] Custom icon set
- [ ] Much more detailed documentation.
- [ ] Build info for Windows users
- [ ] [Pywal](https://github.com/dylanaraps/pywal) support
- [ ] Legacy support

## Contribution
Issues and PRs are welcomed!

## License
Theme is under [GNU GPL 2.0](https://www.gnu.org/licenses/gpl-2.0.html) license.
