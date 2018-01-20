// mtso 2017
//
// if on index page, load /code/
// for each page load,
// fetch body content and write to document.body
// remove all click event listeners on <a /> tags and re-add

import { isSameDomain, getTitle, getBody } from './utils';
import bindLinks from './bindLinks';
import { inherits } from 'inherits';
import EventEmitter from 'eventemitter3/umd/eventemitter3.min.js';

const StartEventKey = 'loadstart';
const EndEventKey = 'loadend';

class Router {
  redirect(to, options) {
    options = options || {};

    fetchAndReplace(to)
      .then(function() {
        history.replaceState({path: location.href}, options.title, to);
      });
  }
}

inherits(Router, EventEmitter);

const SiteRouter = window.SiteRouter = new Router();

// const SiteRouter = window.SiteRouter = {
//   handlers: {
//     'loadstart': [],
//     'loadend': [], 
//   },
// };

// SiteRouter.addEventListener = function addEventListener(event, listener) {
//   SiteRouter.handlers[event] = SiteRouter.handlers[event] || [];
//   if (!SiteRouter.handlers[event].includes(listener)) {
//     SiteRouter.handlers[event].push(listener);
//   }
//   return listener;
// };

// SiteRouter.redirect = function redirect(to, options) {
//   options = options || {};

//   fetchAndReplace(to)
//     .then(function() {
//       history.replaceState({path: location.href}, options.title, to);
//     });
// };

window.addEventListener('load', function onLoadBindRouter(e) {
  bindLinks(document.body);
});

window.addEventListener('popstate', function handlePopState(e) {
  SiteRouter.emit(StartEventKey);
  // SiteRouter.handlers[StartEventKey].forEach(function(handler) {
  //   handler();
  // });

  fetchAndReplace(location.href)
    .catch(console.error);
});

function replaceContent(href, html) {
  document.title = getTitle(html)
  document.body.innerHTML = getBody(html);

  SiteRouter.emit(EndEventKey);
  // SiteRouter.handlers[EndEventKey].forEach(function(handler) {
  //   handler();
  // });

  bindLinks.bind(this, document.body)();
}

function fetchAndReplace(href) {
  SiteRouter.emit(StartEventKey);
  // SiteRouter.handlers[StartEventKey].forEach(function(handler) {
  //   handler();
  // });

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
