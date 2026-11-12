(() => {
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("powermove-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  const videos = document.querySelectorAll(".scroll-video");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play().catch(() => {
          // El navegador puede bloquear la reproducción automática.
        });
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  videos.forEach((video) => {
    observer.observe(video);
  });

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    toggleButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
      const icon = button.querySelector(".theme-icon");
      const label = button.querySelector(".theme-label");
      if (icon) icon.textContent = dark ? "☀" : "☾";
      if (label) label.textContent = dark ? "Modo claro" : "Modo oscuro";
    });
  }

  applyTheme(initialTheme);
  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try { localStorage.setItem("powermove-theme", nextTheme); } catch (error) { /* El sitio sigue funcionando sin almacenamiento. */ }
    });
  });

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();