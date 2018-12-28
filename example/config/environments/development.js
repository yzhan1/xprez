/**
 * Xprez will load the configuration based on the current environment automatically.
 * 
 * For example, during development environment, using `this.config` in controllers/services
 * will return `{ LANG: 'English', port: ${PORT} }` as defined below.
 */
export default {
  LANG: 'English',

  port: process.env.PORT || 3000
};
