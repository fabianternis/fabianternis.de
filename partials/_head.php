<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fabian Ternis</title>
  <link rel="stylesheet" href="assets/css/styles.css">
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Montserrat:wght@500;700&display=swap"
    rel="stylesheet"
  >

  <script>
    const theme =
      localStorage.getItem("theme-preference") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", theme);
  </script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
