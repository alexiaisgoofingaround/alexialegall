# Portfolio skeleton

```
portfolio/
├── index.html                 markup only: nav, 3 empty pages, script tags
├── assets/
│   ├── css/style.css          tokens → base → layout → components → pages → responsive
│   └── js/
│       ├── app.js             helpers, renderCV / renderProjects / renderDetail, router
│       └── data/              ← the only place you edit content
│           ├── skills.js      skills + languages
│           ├── cv.js          experience, education, hobbies
│           └── projects/
│               ├── _registry.js   creates PROJ = []
│               ├── _template.js   copy this for a new project
│               └── <id>.js        one file per project
```

## Add a project
1. Copy `projects/_template.js` to `projects/<id>.js`, fill it in.
2. Add `<script src="assets/js/data/projects/<id>.js"></script>` in `index.html`, after `_registry.js` and before `app.js`.
3. Use skill ids from `skills.js`. A new skill = one line in `skills.js`.

## Mapping to Jekyll / al-folio
| This skeleton            | Jekyll                          |
|--------------------------|---------------------------------|
| data/skills.js           | _data/skills.yml                |
| data/cv.js               | _data/cv.yml                    |
| data/projects/<id>.js    | _projects/<id>.md               |
| app.js render functions  | _layouts/*.liquid               |
| css/style.css            | _sass/_custom.scss              |
