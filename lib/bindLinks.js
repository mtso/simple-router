var previousListeners = [];

function makeLinkTo(href) {
  return function(e) {
    if (!e.defaultPrevented) {
      e.preventDefault();
    }

    fetchAndReplace(href)
      .then(function() {
        window.scrollTo(0, 0);
        history.pushState({path: location.href}, '', href);
      })
      .catch(console.warn);
  };
}

export default function bindLinks(root) {
  if (previousListeners) {
    previousListeners.forEach(function(listener) {
      listener.link.removeEventListener('click', listener.handler);
      listener.link.removeEventListener('touchend', listener.handler);
      listener.link.removeEventListener('touchcancel', listener.handler);
    });
  }

  const links = root.getElementsByTagName('a');
  const listeners = [];

  for (var i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute('href');
    const handler = makeLinkTo(href);

    if (isSameDomain(href)) {
      link.addEventListener('click', handler);
      link.addEventListener('touchend', handler);
      link.addEventListener('touchcancel', handler);
    }

    listeners.push({
      link: link,
      handler: handler,
    });
  }

  previousListeners = listeners;
}
