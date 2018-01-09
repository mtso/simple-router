// if not relative link (starts with . or /)
// extension is 'html, htm, /, or none'
// or maybe: if hostname is not the same
export default function isSameDomain(url) {
  return url === '/' || /^(\.|\/[^\/])/.test(url);
}
