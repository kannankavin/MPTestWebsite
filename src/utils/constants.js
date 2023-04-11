const API_BASE_URLS = {
  dev: 'http://domainname',
};

const API_URLS = {
  WEBSITE_ADD: {
    URI: '/api/website/add',
    METHOD: 'POST',
    IS_SECURE: false,
  },
  WEBSITE_GET: {
    URI: '/api/website/get',
    METHOD: 'GET',
    IS_SECURE: false,
  },
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  API_BASE_URLS,
  API_URLS,
  capitalize,
};