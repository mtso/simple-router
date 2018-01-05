// mtso 2017
//
// if on index page, load /code/
// for each page load,
// fetch body content and write to document.body
// remove all click event listeners on <a /> tags and re-add

(function() {
  const StartEventKey = 'loadstart';
  const EndEventKey = 'loadend';

  const SiteRouter = window.SiteRouter = {
    handlers: {
      'loadstart': [],
      'loadend': [], 
    },
  };

  SiteRouter.addEventListener = function addEventListener(event, listener) {
    SiteRouter.handlers[event] = SiteRouter.handlers[event] || [];
    if (!SiteRouter.handler[event].includes(listener)) {
      SiteRouter.handlers[event].push(listener);
    }
    return listener;
  };

  SiteRouter.redirect = function redirect(to, options) {
    options = options || {};

    fetchAndReplace(to)
      .then(function() {
        history.replacestate({path: location.href}, options.title, to);
      });
  };

  window.addEventListener('load', function onLoadBindRouter(e) {
    bindLinks(document.body);
  });

  window.addEventListener('popstate', function handlePopState(e) {
    SiteRouter.handlers[StartEventKey].forEach(function(handler) {
      handler();
    });

    fetchAndReplace(location.href)
      .catch(console.error);
  });

  function replaceContent(href, html) {
    document.title = getTitle(html)
    document.body.innerHTML = getBody(html);

    SiteRouter.handlers[EndEventKey].forEach(function(handler) {
      handler();
    });

    bindLinks.bind(this, document.body)();
  }

  function fetchAndReplace(href) {
    SiteRouter.handlers[StartEventKey].forEach(function(handler) {
      handler();
    });

    return fetch(href)
      .then(function(resp) {
        if (resp.status !== 200) {
          throw new Error('Could not get data at ' + href);
        }
        return resp.text();
      })
      .then(replaceContent.bind(this, href))
      .then(bindLinks.bind(this, document.body));
  }

  function makeLinkTo(href) {
    return function(e) {
      if (!e.defaultPrevented) {
        e.preventDefault()
      }

      fetchAndReplace(href)
        .then(function() {
          window.scrollTo(0, 0);
          history.pushState({path: location.href}, 'mtso.io', href);
        })
        .catch(console.warn);
    }
  }

  function bindLinks(root) {
    const links = root.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
      const link = links[i];
      const href = link.getAttribute('href');

      if (isSameDomain(href)) {
        link.addEventListener('click', makeLinkTo(href));
        link.addEventListener('touchend', makeLinkTo(href));
        link.addEventListener('touchcancel', makeLinkTo(href));
      }
    }
  }

  // if not relative link (starts with . or /)
  // extension is 'html, htm, /, or none'
  // or maybe: if hostname is not the same
  function isSameDomain(url) {
    return /^(\.|\/[^/])/.test(url);
  }

  function getTitle(markup) {
    const match = /(?:<title>)(.+)(?:(<\/title>))/.exec(markup);
    return match && match[1] || '';
  }

  function getBody(markup) {
    const match = /(<body>)((.|\s)+)(<\/body>)/.exec(markup);
    return match && match[2] || '';
  }
})();
