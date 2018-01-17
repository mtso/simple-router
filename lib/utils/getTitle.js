export default function getTitle(markup) {
  const match = /(?:<title>)((.|\n)+)(?:(<\/title>))/m.exec(markup);
  return match && match[1] || '';
}
