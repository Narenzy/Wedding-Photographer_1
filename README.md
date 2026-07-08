# Wedding Photographer — Landing Page

A single-page responsive website for wedding photographer Maria Kovalenko. Built
as a team training project (MVP) by a team of 10 developers.

## About the project

The site consists of 10 sections — Header, Hero, About, Benefits, Feedbacks,
Portfolio, FAQ, Contacts, Footer, Success Modal — and solves the task of
presenting photography services, a portfolio, and collecting inquiries from
potential clients through a contact form.

The layout follows a **Mobile First** approach, with the following breakpoints:

- **mobile** — fluid from 320px, becomes adaptive at 375px
- **tablet** — from 768px
- **desktop** — from 1440px

## Tech stack

| Technology                | Purpose                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **Vite**                  | project build tool, dev server                                                                      |
| `vite-plugin-html-inject` | includes HTML partials (`<load src="...">`) — each section lives in its own file                    |
| **modern-normalize**      | resets default browser styles                                                                       |
| **Prettier**              | code formatting                                                                                     |
| **Swiper.js**             | horizontal feedback slider (Feedbacks section) with mouse, keyboard (Tab/arrows), and touch support |
| **Axios**                 | HTTP requests to the backend                                                                        |
| **IcoMoon**               | generates the SVG icon sprite (`icons/sprite.svg`), used via `<use href="...">`                     |
| Google Fonts (`<link>`)   | fonts connected directly in `<head>`                                                                |

## API

Documentation: https://wedding-photographer.b.goit.study/api-docs/

| Endpoint              | Used for                                   |
| --------------------- | ------------------------------------------ |
| `GET /feedbacks`      | client reviews for the Feedbacks section   |
| `GET /categories`     | filter categories for the Portfolio        |
| `GET /wedding-photos` | portfolio photos with pagination           |
| `POST /orders`        | contact form submission (Contacts section) |

## Project structure

```
wedding-photographer/
├── index.html          # main file, includes all partials via <load>
├── main.js
├── vite.config.js
├── favicon.svg
├── css/
│   ├── main.css         # imports all styles
│   ├── reset.css        # resets default browser styles
│   ├── base.css         # CSS variables (colors, fonts), base body styles
│   └── sections/        # one stylesheet per section
├── js/                  # one script per section
├── icons/
│   └── sprite.svg        # SVG icon sprite (IcoMoon)
├── images/               # images grouped by section
└── partials/             # HTML markup for each section, one file each
```

## CSS variables (design tokens)

Defined in `css/base.css`:

```
--color-scheme-1-text / --color-scheme-2-text        text color
--color-scheme-1-background / -2-background          background color
--color-scheme-1-foreground / -2-foreground           card/accent block background
--color-scheme-1-border / -2-border                    borders
--color-scheme-1-accent / -2-accent                     accent color
--font-family                                            main font (Mulish)
--second-family                                          heading font (Cormorant)
```

## Team & section ownership

| Section            | Developer                                                     |
| ------------------ | ------------------------------------------------------------- |
| Header             | [Taras Zabudsky](https://github.com/taraszabudsky)            |
| Hero               | [Arsenii Kruk](https://github.com/Arsenii-21)                 |
| About              | [Taras Makhanko](https://github.com/Narenzy) _(Team Lead)_    |
| Benefits           | [Andrii Vasylchenko](https://github.com/kidstonek)            |
| Feedbacks          | [Kozka Maksym](https://github.com/muffin127) _(Scrum Master)_ |
| Portfolio          | [Ivan Korolyov](https://github.com/Ivan-pes)                  |
| FAQ                | [Mariia Chekachkova](https://github.com/MariiaChekachkova)    |
| Contacts           | [Natalia Fliut](https://github.com/nataliafliut-cyber)        |
| Footer / Scroll Up | [Julia Demura](https://github.com/julia-demura)               |
| Success Modal      | [Khrystyna Konepud](https://github.com/KKonepud)              |

## Getting started

```bash
git clone git@github.com:Narenzy/Wedding-Photographer_1.git
cd Wedding-Photographer_1
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Team guidelines

- Each section has its own partial (`partials/section.html`), its own CSS
  (`css/sections/section.css`), and, if needed, its own JS (`js/section.js`) —
  to avoid Git conflicts.
- CSS classes inside a section are prefixed with the section name (e.g.
  `.feedbacks-title`, `.contacts-btn`), except shared classes (`.container`,
  `.icon`).
- Before committing, check the layout at all three breakpoints and validate it
  with the [W3C Validator](https://validator.w3.org/) and
  [CSS Validator](https://jigsaw.w3.org/css-validator/).
