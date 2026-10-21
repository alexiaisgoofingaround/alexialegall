/* Two small behaviours. No content here.
   1. CV: hovering a sidebar skill dims the CV entries that did not use it.
   2. Projects: filter tiles by skill. Works with links like /projects/#fea. */
(function () {
  /* ---- 1. CV hover ---- */
  var side = document.getElementById('skills'), cv = document.querySelector('.cv');
  if (side && cv) {
    var entries = [].slice.call(cv.querySelectorAll('.entry'));
    side.addEventListener('pointerover', function (e) {
      var c = e.target.closest('[data-skill]');
      if (!c) return;
      cv.classList.add('dim');
      entries.forEach(function (en) {
        en.classList.toggle('hit', en.dataset.skills.split(' ').indexOf(c.dataset.skill) > -1);
      });
    });
    side.addEventListener('pointerleave', function () { cv.classList.remove('dim'); });
  }

  /* ---- 2. Projects filter ---- */
  var bar = document.getElementById('filter'), mosaic = document.getElementById('mosaic');
  if (bar && mosaic) {
    var tiles = [].slice.call(mosaic.querySelectorAll('.tile')), empty = document.getElementById('empty');
    var apply = function (id) {
      var shown = 0;
      tiles.forEach(function (t) {
        var ok = id === 'all' || t.dataset.skills.split(' ').indexOf(id) > -1;
        t.hidden = !ok; if (ok) shown++;
      });
      mosaic.classList.toggle('filtered', id !== 'all');
      [].forEach.call(bar.querySelectorAll('[data-f]'), function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.f === id));
      });
      empty.hidden = shown > 0;
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-f]');
      if (!b) return;
      history.replaceState(null, '', b.dataset.f === 'all' ? location.pathname : '#' + b.dataset.f);
      apply(b.dataset.f);
    });
    window.addEventListener('hashchange', function () { apply(location.hash.slice(1) || 'all'); });
    apply(location.hash.slice(1) || 'all');
  }
})();
