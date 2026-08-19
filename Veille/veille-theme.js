(function() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var theme = localStorage.getItem("theme");
  if (theme === "light") {
    document.body.classList.add("light-mode");
    btn.innerText = "🌙";
  } else {
    btn.innerText = "☀️";
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
