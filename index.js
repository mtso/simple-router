!function(){function t(t,n){document.title=c(n),document.body.innerHTML=d(n),u.handlers[a].forEach(function(t){t()}),o.bind(this,document.body)()}function n(n){return u.handlers[i].forEach(function(t){t()}),fetch(n).then(function(t){if(200!==t.status)throw new Error("Could not get data at "+n);return t.text()}).then(t.bind(this,n)).then(o.bind(this,document.body))}function e(t){return function(e){e.defaultPrevented||e.preventDefault(),n(t).then(function(){window.scrollTo(0,0),history.pushState({path:location.href},"mtso.io",t)}).catch(console.warn)}}function o(t){const n=t.getElementsByTagName("a");for(var o=0;o<n.length;o++){const c=n[o],d=c.getAttribute("href");r(d)&&(c.addEventListener("click",e(d)),c.addEventListener("touchend",e(d)),c.addEventListener("touchcancel",e(d)))}}function r(t){return"/"===t||/\.|\/[^\/]/.test(t)}function c(t){const n=/(?:<title>)(.+)(?:(<\/title>))/.exec(t);return n&&n[1]||""}function d(t){const n=/(<body>)((.|\s)+)(<\/body>)/.exec(t);return n&&n[2]||""}const i="loadstart",a="loadend",u=window.SiteRouter={handlers:{loadstart:[],loadend:[]}};u.addEventListener=function(t,n){return u.handlers[t]=u.handlers[t]||[],u.handler[t].includes(n)||u.handlers[t].push(n),n},u.redirect=function(t,e){e=e||{},n(t).then(function(){history.replacestate({path:location.href},e.title,t)})},window.addEventListener("load",function(t){o(document.body)}),window.addEventListener("popstate",function(t){u.handlers[i].forEach(function(t){t()}),n(location.href).catch(console.error)})}();