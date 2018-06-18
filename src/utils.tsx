import * as Cookies from 'universal-cookie';
declare let window: any;
let dispatch: any;

let cookies = new Cookies();

export const JSON_CONTENT_TYPE = 'application/json';

export const setCookie = (key, value) => {
  const expiryDateTime = new Date();
  expiryDateTime.setDate(expiryDateTime.getDate() + 7);
  cookies.set(key, value, { path: '/', expires: expiryDateTime });
  return value;
}

export const getFromCookie = (key) => {
  return cookies.get(key);
}

export const saveAccessCredentials = (values) => {
  if (values) {
    if (values.email) setCookie('email', values.email)
    if (values.token) setCookie('token', values.token)
    if (values.first_name) setCookie('name', values.first_name)
    if (values.mobile) setCookie('mobile', values.mobile)
    if (values.token) {
      const accessToken = window.btoa(`${values.token.trim()}:${values.email.trim()}`)
      if (accessToken) setCookie('Access-Token', accessToken);
      if (values) setCookie('authData', values)
    }
  }
}

export const getAccessToken = () => {
  return getFromCookie('Access-Token');
}

export const getEmail = () => {
  return getFromCookie('email');
}

export const parsedQueryParams = () => {
  let queryString = location.search.substring(1);
  let regex = /([^&=]+)=([^&]*)/g, m;
  let params: any = {};
  while (m = regex.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return params;
}

export const getQueryParams = (query) => {
  let queryArray = [];
  if (query) {
    Object.keys(query).map((eachQuery) => {
      queryArray.push(eachQuery + '=' + (typeof query[eachQuery] == 'string' ? query[eachQuery] : JSON.stringify(query[eachQuery])))
    })
    return (queryArray).join('&');
  }
}

export const deleteToken = () => {
  if (typeof window !== 'undefined') { getFromCookie('socialLoginVia') }
  cookies.remove('Token', { path: '/' });
  cookies.remove('email', { path: '/' });
  cookies.remove('Access-Token', { path: '/' });
  cookies.remove('name', { path: '/' });
  cookies.remove('mobile', { path: '/' });
}

export const parseUrlParams = (params) => {
  let paramsArray = params.substr(1).split('&');
  let returnObj = {}
  paramsArray.forEach(element => {
    let key = element.split('=')[0]
    let value = element.split('=')[1]
    returnObj[key] = value
  });
  return Object.keys(returnObj).length ? returnObj : undefined;
}

export const stringifyUrlParams = (params) => {
  let paramsString = '?'
  Object.keys(params).forEach((key, val) => {
    let moreThanOne = val + 1 !== Object.keys(params).length ? '&' : '';
    paramsString += key + '=' + params[key] + moreThanOne
  });
  return Object.keys(params).length ? paramsString : '';
}

export const Dispatch = {
  set: function (args) {
    dispatch = args;
  },
  get: function () {
    return dispatch
  }
}

export const getParams = (url) => {
  let queryString = url.substring(1);
  let regex = /([^&=]+)=([^&]*)/g, m;
  let params = {};
  while (m = regex.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return params;
}

export const context = {
  value: '',
  minLength: { error: false, value: 0 },
  maxLength: { error: false, value: 0 },
  required: { error: false, value: true },
  $valid: false,
  pattern: false,
  numeric: false,
  password: false,
  touched: false,
  focused: false,
}

export const regex = {
  name: /^[A-Za-z]+(\s[A-Za-z]+)*$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i,
  mobile: /^[1-9]{1}[0-9]{9}$/,
  pincode: /^[0-9]{6}$/
}

export const homeIndexes = {
  category: 0,
  action: 1,
  label: 2,
  gaValue: 3,
  image: 4,
  imgTitle: 5,
  imgAlt: 6,
  link: 7,
  BoxPosTop: 8,
  BoxPosLeft: 9,
  BoxMaxWidth: 10,
  textAlign: 11,
  heading: 12,
  headingSize: 13,
  headingColor: 14,
  subHeading: 15,
  subHeadingSize: 16,
  subHeadingColor: 17,
  buttonText: 18,
  btnColor: 19,
  btnBorder: 20,
  btnBackground: 21,
  btnSize: 22,
};

export const fire = (action, f, e) => {
  let name = e.target.name
  let value = e.target.value
  let form = Object.assign({}, f)
  let input = Object.assign({}, { ...form[name], value: value })

  if (action === 'submit') {
    let $valid = true
    Object.keys(form).map(index => {
      if (index.indexOf('$') === -1) {
        form[index].required.error = form[index].required.value && form[index].value.trim() == ''
        form[index].numeric = !(form[index].required.error || isNaN(form[index].value))
        form[index].minLength.error = form[index].value.length < form[index].minLength.value
        form[index].$valid = !(form[index].required.error || form[index].pattern)
        if (!form[index].$valid)
          $valid = false
      }
    })
    form.$submitted = true
    form.$valid = $valid
  }

  if (input && input.value !== undefined) {
    switch (action) {
      case 'change':
        switch (name) {
          case 'name':
          case 'addrLine1':
          case 'addrLine2':
            input = Object.assign({}, { ...input, pattern: !regex.name.test(input.value) })
            break
          case 'email':
            input = Object.assign({}, { ...input, pattern: !regex.email.test(input.value) })
            break
          case 'mobile':
          case 'alternate_mobile':
            input = Object.assign({}, { ...input, pattern: !regex.mobile.test(input.value) })
            break
          case 'pincode':
            input = Object.assign({}, { ...input, pattern: !regex.pincode.test(input.value) })
            break
        }
        input = Object.assign({}, { ...input, touched: true })
        input = Object.assign({}, { ...input, required: { ...input.required, error: input.required.value && input.value.trim() == '' } })
        input = Object.assign({}, { ...input, numeric: !(input.required.error || isNaN(input.value)) })
        input = Object.assign({}, { ...input, minLength: { ...input.minLength, error: input.value.length < input.minLength.value } })
        input = Object.assign({}, { ...input, $valid: !(input.required.error || input.pattern) })
        form.$submitted = false
        break
      case 'click':
        input = Object.assign({}, { ...input, touched: true, focused: true })
        break
      case 'blur':
        input = Object.assign({}, { ...input, focused: false })
        break
    }
    form[name] = input
  }

  return form
}