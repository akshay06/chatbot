declare let document: any;
declare let window: any;

this.gtmScriptStatus = 'notLoaded';
this.gtmQueue = [{ 'event': 'loadScripts' }];

export const loadGtmScript = () => {
  let that = this;
  if (that.gtmScriptStatus === 'notLoaded') {
    that.gtmScriptStatus = 'loading';
    window.onload = function () {
        (function (w, d, s, l, i) {
          w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true;
          j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
          j.addEventListener('load', function () {
            that.gtmScriptStatus = 'loaded';
            that.gtmQueue.map(args => window.dataLayer.push(args));
            that.gtmQueue = [];
          })
        })(window, document, 'script', 'dataLayer', 'gtm_id');
    }
  }
};

export const gtmPush = function (args) {
  
  console.log('Event --- ', args)
  switch (this.gtmScriptStatus) {
    case 'loaded':
      window.dataLayer.push(args);
      break;

    case 'notLoaded':
      loadGtmScript();
      this.gtmQueue.push(args);
      break;

    case 'loading':
      this.gtmQueue.push(args);
      break;
  }
};

export const trackEvent = function (category?: any, action?: any, label?: any, value?: any) {
  try {
    category = category ? (isNaN(category) ? category.toLowerCase() : category) : '';
    action = action ? (isNaN(action) ? action.toLowerCase() : action) : '';
    label = label ? (isNaN(label) ? label.toLowerCase() : label) : '';
    value = value ? value : 0;
    // if ( gaAccessArray.indexOf(authUser.email) !== -1) {
    console.log('\n category: ', category, '\n action: ', action, '\n label: ', label, '\n value: ', value);
    // }
    gtmPush({
      'event': 'ga_event_trigger',
      'ga_category': category,
      'ga_action': action,
      'ga_label': label,
      'ga_value': value
    });
  } catch (e) {
    console.error(e);
  }
};
