/* Menu (phones) · CV tabs · timeline open/close · project filter · story "+" */
(function () {
  "use strict";

  /* ---- Phone menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
        toggle.focus();
      }
    });
  }

  /* ---- CV: one section at a time (all visible without JS) ---- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".cv-nav a"));
  if (tabs.length) {
    var panels = tabs.map(function (a) { return document.getElementById(a.hash.slice(1)); });
    document.documentElement.classList.add("js-tabs");
    var show = function (id) {
      tabs.forEach(function (a, i) {
        var on = a.hash === "#" + id;
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        if (panels[i]) panels[i].hidden = !on;
      });
    };
    var fromHash = function () {
      var id = location.hash.slice(1);
      return tabs.some(function (a) { return a.hash === "#" + id; }) ? id : tabs[0].hash.slice(1);
    };
    show(fromHash());
    tabs.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var id = a.hash.slice(1);
        show(id);
        history.replaceState(null, "", "#" + id);
      });
    });
    window.addEventListener("hashchange", function () { show(fromHash()); });
  }

  /* ---- Timeline: always open on wide screens, "+" on phones ---- */
  var wide = window.matchMedia("(min-width: 900px)");
  var entries = Array.prototype.slice.call(document.querySelectorAll("details.entry"));
  var syncEntries = function () { entries.forEach(function (d) { d.open = wide.matches; }); };
  if (entries.length) {
    syncEntries();
    if (wide.addEventListener) wide.addEventListener("change", syncEntries); else wide.addListener(syncEntries);
    entries.forEach(function (d) {
      d.querySelector("summary").addEventListener("click", function (e) { if (wide.matches) e.preventDefault(); });
    });
  }

  /* ---- Projects: skill filter, also from links like /projects/#python ---- */
  var filter = document.getElementById("filter");
  if (filter) {
    var buttons = Array.prototype.slice.call(filter.querySelectorAll("button"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".pcard"));
    var empty = document.getElementById("empty");
    var apply = function (f, updateHash) {
      if (!buttons.some(function (b) { return b.dataset.f === f; })) f = "all";
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.f === f)); });
      var shown = 0;
      cards.forEach(function (c) {
        var ok = f === "all" || (" " + c.dataset.skills + " ").indexOf(" " + f + " ") > -1;
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      if (updateHash) history.replaceState(null, "", f === "all" ? location.pathname : "#" + f);
    };
    buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b.dataset.f, true); }); });
    apply(location.hash.slice(1) || "all", false);
    window.addEventListener("hashchange", function () { apply(location.hash.slice(1) || "all", false); });
  }

  /* ---- Project page: /projects/x/#story opens the story ---- */
  var story = document.getElementById("story");
  if (story) {
    if (location.hash === "#story") story.open = true;
  }
})();
