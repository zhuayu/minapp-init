const MODE = 'devlopment';
// const MODE = 'production';

const VERSION = 'V0.1.0';
const PRODUCTION_APPID = 4;
const DEVELOPMENT_APPID = 2;
const PRODUCTION_PREFIX = 'https://api.xxx.com';
const DEVELOPMENT_PREFIX = 'https://api.xxx2.com';
const PREFIX =  ( MODE === 'production' ) ? PRODUCTION_PREFIX : DEVELOPMENT_PREFIX;

const API = {
  version: VERSION,
  appid:  ( MODE === 'production' ) ? PRODUCTION_APPID : DEVELOPMENT_APPID,
  login: `${PREFIX}/mini-program/account/login`,
  my: `${PREFIX}/mini-program/account/my`,
}

export default API;