// mtso 2017
//
// if on index page, load /code/
// for each page load,
// fetch body content and write to document.body
// remove all click event listeners on <a /> tags and re-add

window.onload = function() {
  if (location.pathname === '/') {
    fetchAndReplace('/code/')
      .then(function() {
        history.replaceState({path: location.href}, 'mtso.io', '/code/')
      })
  } else {
    bindLinks(document.body)
  }
}

window.onpopstate = function(e) {
  startLoader()

  fetchAndReplace(location.href)
    .catch(console.warn)
}

function replaceContent(href, newBody) {
  // stopLoader()
  document.body.innerHTML = newBody
  bindLinks(document.body)
}

function fetchAndReplace(href) {
  startLoader()

  return fetch(href)
    .then(function(resp) {
      if (resp.status !== 200) {
        throw new Error('Could not get data at ' + href)
      }
      return resp.text()
    })
    .then(replaceContent.bind(this, href))
}

function makeLinkTo(href) {
  return function(e) {
    e.preventDefault()
    fetchAndReplace(href)
      .then(function() {
        window.scrollTo(0, 0)
        history.pushState({path: location.href}, 'mtso.io', href)
      })
      .catch(console.warn)
  }
}

function bindLinks(root) {
  const links = root.getElementsByTagName('a')

  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    const href = link.getAttribute('href')

    if (isSameDomain(href)) {
      link.addEventListener('click', makeLinkTo(href))
      link.addEventListener('touchend', makeLinkTo(href))
      link.addEventListener('touchcancel', makeLinkTo(href))
    }
  }
}

function isSameDomain(url) {
  return /^(\.|\/[^/])/.test(url)
  // if not relative link (starts with . or /)
  // extension is 'html, htm, /, or none'
  // or maybe: if hostname is not the same
}

function startLoader() {
  var node = document.querySelector('.typemark')
  node.setAttribute(
    'class',
    node.getAttribute('class')
      .split(' ')
      .concat('loader')
      .join(' ')
  )
}

// Don't need this if all of document.body is replaced
function stopLoader() {
  var node = document.querySelector('.typemark')
  node.setAttribute(
    'class',
    node.getAttribute('class')
      .split(' ')
      .filter(function(cl) { return cl !== 'loader' })
      .join(' ')
  )
}

function getTitle(markup) {
  const match = /(?:<title>)(.+)(?:(<\/title>)/.exec(markup);
  return match && match[1] || '';
}
