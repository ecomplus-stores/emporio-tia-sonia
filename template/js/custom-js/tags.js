const requestIdleCallback = (fn, fallbackMs = 300) => {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(fn)
  } else {
    setTimeout(fn, fallbackMs)
  }
}

const onFirstScroll = function () {
  requestIdleCallback(() => {
    /* eslint-disable */

    // -- Omnisend - roleta
    window.omnisend = window.omnisend || [];
    omnisend.push(["accountID", "61b14a16d457aa001dd6d66f"]);
    omnisend.push(["track", "$pageViewed"]);
    !function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://omnisnippet1.com/inshop/launcher-v2.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();

    // -- MailerLite
    (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
    var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
    f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
    var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
    _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');
    var ml_account = ml('accounts', '1184030', 'r4h1t6y8d5', 'load');

    // -- Mailbiz
    (function(m, a, i, l, b, z, j, s) {
      m['MailbizIntegration'] = {
        id: b,
        ready: 0
      };
      z = a.createElement(i);
      j = a.getElementsByTagName(i)[0];
      z.async = 1;
      z.src = l;
      j.parentNode.insertBefore(z, j);
    })(window, document, 'script', 'https://d3eq1zq78ux3cv.cloudfront.net/static/scripts/integration.min.js', '64c3f41f71951d5113974223');

    /* eslint-enable */
  })
  window.removeEventListener('scroll', onFirstScroll, false)
}

requestIdleCallback(() => {
  window.addEventListener('scroll', onFirstScroll, false)
})
