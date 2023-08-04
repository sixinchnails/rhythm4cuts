const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/member", "/lobby"], // 프록시를 적용할 경로를 설정합니다. 이 경로를 통해 API 요청을 보냅니다.
    createProxyMiddleware({
      target: "http://i9b109.p.ssafy.io:8080", // 백엔드 서버의 주소를 입력합니다.
      changeOrigin: true,
    })
  );
};
