(function() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var theme = localStorage.getItem("theme");
  var prefersLight = !theme && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  if (theme === "light" || prefersLight) {
    document.body.classList.add("light-mode");
    btn.innerText = "🌙";
  } else {
    btn.innerText = "🌙";
  }
  btn.addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
      btn.innerText = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      btn.innerText = "☀️";
      localStorage.setItem("theme", "dark");
    }
  });
})();
