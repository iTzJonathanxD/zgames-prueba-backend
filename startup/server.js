const express = require("express");
const http = require("http");
let _express = null;
let _config = null;
let _server = null;

module.exports = class Server {
  constructor({ config, router }) {
    _config = config;
    _express = express().use(router);
    _server = http.createServer(_express);
  }

  start() {
    return new Promise((resolve) => {
      _server.listen(_config.PORT, () => {
        console.log(`Server running at http://localhost:${_config.PORT}`);
        _express._router.stack
          .filter((r) => r.route)
          .map((r) => r.route.path)
          .forEach((path) => console.log(`Ruta activa: ${path}`));
      });
      resolve();
    });
  }
  
};
