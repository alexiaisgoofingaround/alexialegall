# alexialegall: portfolio (Jekyll, runs on GitHub Pages)

```
_config.yml            site title, baseurl, collections
index.html             CV page (hero text is plain HTML here)
projects/index.html    Projects page (mosaic + skill filter)
_data/
  skills.yml           skill list (sidebar + filter)
  cv.yml               experience, education, hobbies, languages
_projects/             ONE FILE PER PROJECT  → /projects/<file-name>/
  phd.html, origami.html, ...
  _template.html       copy this to start a new one (ignored by the build)
_layouts/              page skeletons (default, project)
_includes/             figure, video, embed, chip, ...
assets/
  css/style.css  js/site.js
  img/  video/  files/   your images, videos, PDFs
```

## Write a project page
Each file in `_projects/` = a small header (between `---`) + **plain HTML**.

```html
---
title: "My project"
when: "2025"
order: 6
color: "#2E5560"
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
- A skill = one line in `_data/skills.yml`; use its `id` in `skills:`.

## baseurl
`baseurl: "/alexialegall"` matches https://alexiaisgoofingaround.github.io/alexialegall/.
If the repo becomes `alexiaisgoofingaround.github.io` or gets a custom domain, set `baseurl: ""`.

## Preview locally (optional)
`bundle install && bundle exec jekyll serve` → http://localhost:4000/alexialegall/
Otherwise just push: GitHub rebuilds in about a minute (errors: repo → Actions tab).
