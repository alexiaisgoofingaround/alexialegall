/* PROJECT TEMPLATE. Copy to assets/js/data/projects/<id>.js, then add a <script> tag in index.html.
   Jekyll equivalent: _projects/<id>.md (front matter = fields below, body = description/results/resources) */
PROJ.push({
  id: "short-unique-id",
  title: "Project title",
  when: "2024–2025",
  color: "#2E5560",          // tile colour; later replaced by a cover image
  big: false,                // true = large tile (use for one hub project only)
  skills: [],                // ids from SKILLS, e.g. ["fea","cad"]
  subs: [],                  // hubs only: ids of child projects

  /* Description */
  description: "One or two paragraphs.",

  /* Results, in reading order:
       ["fig", caption, color]  image + caption
       ["p", "text with $math$"] paragraph (LaTeX allowed) */
  results: [],

  /* Resources: [label, url, kind] */
  resources: [],

  /* optional code snippet */
  code: ""
});
