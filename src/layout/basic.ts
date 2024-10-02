export default function basicLayout(contents: string) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="/styles.css" />
  <link rel="stylesheet" type="text/css" href="/highlight.css" />
  <link rel="shortcut icon" type="image/png" href="/img/icon.png"/>
  <script type="importmap">
    {
      "imports": {
        "webjsx": "https://webjsx.org/latest/dist/index.js"
      }
    }
  </script>
  <script src="/page.js" type="module"></script>
  <title>WebJSX: Web Components + JSX</title>
</head>

<body class="bg-gray-900 text-gray-300">
  <div id="root">
    ${contents}
  </div>
</body>

</html>
`;
}
