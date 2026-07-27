// Theme toggle: light <-> dark, remembered across visits.
// The stored theme is applied by an inline script in <head> to avoid a flash.
(function () {
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    return root.getAttribute("data-theme") || (media.matches ? "dark" : "light");
  }

  function label(theme) {
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  function apply(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {}
    }
    label(theme);
  }

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(current() === "dark" ? "light" : "dark", true);
    });
  });

  label(current());

  // Follow the OS until the visitor makes an explicit choice.
  media.addEventListener("change", function (e) {
    var stored = null;
    try {
      stored = localStorage.getItem("theme");
    } catch (err) {}
    if (!stored) label(e.matches ? "dark" : "light");
  });
})();

// Give the sticky header a hairline once the page scrolls under it.
(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  function update() {
    header.classList.toggle("is-stuck", window.scrollY > 4);
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
})();

// Mark the nav link for whichever section is currently in view.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if (!links.length || !("IntersectionObserver" in window)) return;

  var sections = links
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  var visible = new Set();

  function highlight() {
    var active = sections.filter(function (s) {
      return visible.has(s);
    })[0];
    links.forEach(function (link) {
      if (active && link.getAttribute("href") === "#" + active.id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      highlight();
    },
    { rootMargin: "-20% 0px -60% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
