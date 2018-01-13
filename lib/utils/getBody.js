export default function getBody(markup) {
  const match = /(<body>)((.|\s)+)(<\/body>)/.exec(markup);
  return match && match[2] || '';
}
