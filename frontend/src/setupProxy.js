const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5125',
      changeOrigin: true,
      logLevel: 'silent'
    })
  );
};


