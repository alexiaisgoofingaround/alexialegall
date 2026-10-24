# alexialegall: portfolio (Jekyll, runs on GitHub Pages)

```
_config.yml            site title, baseurl, author block (email, links, photo, PDF CV)
index.html             Home: photo, description, contact, four focus blocks
cv/index.html          CV: section menu (Experience, Education, Skills, ...) + PDF button
projects/index.html    Projects: rounded rows with "+", skill filter
_data/
  skills.yml           skill list (CV skills + project filter)
  cv.yml               experience, education, publications, hobbies, languages
  focus.yml            the four blocks under the home description
_projects/             ONE FILE PER PROJECT  → /projects/<file-name>/
  _template.html       copy this to start a new one (ignored by the build)
_layouts/              default (header/footer), project (picture, "+" story, documents, contact)
_includes/             icon, figure, video, embed, chip, cover, ...
assets/
  css/style.css  js/site.js     (in this zip)
  img/  video/  files/          YOUR folders, keep them as they are
```

Files you need to add yourself: `assets/img/profile.jpg` (home portrait) and
`assets/files/cv.pdf` (the Download CV button). Project cover: add `image: "assets/img/x.jpg"`
to the project header, otherwise a coloured block is shown.

## Write a project page
Each file in `_projects/` = a small header (between `---`) + **plain HTML**.

```html
---
title: "My project"
when: "2025"
order: 6
color: "#2E5560"            # cover colour until you add image:
image: "assets/img/my-project.jpg"
skills: ["python", "3dprinting"]
description: "Shown under the title."
resources:
  - {label: "Thesis (PDF)", url: "assets/files/thesis.pdf", kind: "thesis"}
---
<h2>Results</h2>
<p>Any HTML. Math: $\tau = pA\ell$ or $$\tau(\theta) = p\,A\,\ell(\theta)$$ (single backslash).</p>
{% include figure.html src="assets/img/a.jpg" caption="Figure 1. ..." %}
{% include video.html src="assets/video/a.mp4" caption="Video 1. ..." %}
{% include embed.html url="https://www.youtube.com/embed/ID" caption="Video 2. ..." %}
<table>...</table>
```

- Resources are added automatically at the bottom; sub-projects too (`subs:`).
- If a formula ever contains `{{` or `{%`, wrap that paragraph in `{% raw %}...{% endraw %}`.
- Link a CV entry to a project: `projects: ["phd"]` in `_data/cv.yml` (file name without `.html`).
- The page shows: cover picture + description, then a "+" for the full story (everything below the header), then documents and contact.
- A skill = one line in `_data/skills.yml`; use its `id` in `skills:`.

## baseurl
`baseurl: "/alexialegall"` matches https://alexiaisgoofingaround.github.io/alexialegall/.
If the repo becomes `alexiaisgoofingaround.github.io` or gets a custom domain, set `baseurl: ""`.

## Preview locally (optional)
`bundle install && bundle exec jekyll serve` → http://localhost:4000/alexialegall/
Otherwise just push: GitHub rebuilds in about a minute (errors: repo → Actions tab).
