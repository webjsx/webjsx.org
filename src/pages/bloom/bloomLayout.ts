export default function bloomLayout(contents: string) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="/highlight.css" />
  <link rel="stylesheet" type="text/css" href="/pages/bloom/bloom.css" />
  <link rel="shortcut icon" type="image/png" href="/img/icon.png"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap" rel="stylesheet">
  <script type="importmap">
    {
      "imports": {
        "webjsx": "https://cdn.jsdelivr.net/npm/webjsx@0.0.42/dist/index.js",
        "webjsx/jsx-runtime": "https://cdn.jsdelivr.net/npm/webjsx@0.0.42/dist/jsx-runtime.js",
        "bloom-router": "https://cdn.jsdelivr.net/npm/bloom-router@0.0.16/dist/index.js"
      }
    }
  </script>
  <script src="/pages/bloom/components/blooming-flower.js" type="module"></script>
  <script src="/pages/bloom/components/floating-codebox.js" type="module"></script>
  <title>WebJSX: Web Components + JSX</title>
</head>

<body>
  <div id="root">
    ${contents}
  </div>
</body>

</html>
`;
}
