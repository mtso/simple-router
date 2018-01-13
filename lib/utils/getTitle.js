export default function getTitle(markup) {
  const match = /(?:<title>)(.+)(?:(<\/title>))/.exec(markup);
  return match && match[1] || '';
}
