# haochend413.github.io

Personal website. Static HTML and CSS, no build step, no dependencies.

## Structure

```
index.html                              home — one page, anchored sections
assets/css/main.css                     all styles (light + dark tokens at the top)
assets/js/main.js                       theme toggle + nav scroll-spy
.nojekyll                               tells GitHub Pages to serve files as-is

writing/                                unlinked drafts — not reachable from the site
```

## Local preview

```
python3 -m http.server 4000
```

Then open <http://localhost:4000>. Root-relative paths (`/assets/...`) require a
server; opening the files directly with `file://` will not load the CSS.

## Adding a section

The top nav links to sections on the home page by id. To add one (e.g.
Experiences):

1. Copy a `<section class="section" id="...">` block in `index.html`.
2. Add a matching `<a href="#that-id">` to the `.nav` in the header.

The scroll-spy in `assets/js/main.js` picks it up automatically — it reads the
nav's own `#` links, so there is nothing else to register.

## Theming

Colors live as CSS custom properties in `:root` (light) and
`:root[data-theme="dark"]`, mirrored in a `prefers-color-scheme: dark` block so
first-time visitors get their system theme. The toggle stores an explicit choice
in `localStorage` under `theme`. Column width is the `--measure` token.

## Deploying

Push to `main`. GitHub Pages serves the repository root.
