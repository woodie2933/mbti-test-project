// server.js
const jsonServer = import("json-server"); // JSON Server 라이브러리 가져오기
const server = jsonServer.create(); // 서버 인스턴스 생성
const router = jsonServer.router("db.json"); // db.json을 데이터베이스로 사용
const middlewares = jsonServer.defaults(); // 기본 미들웨어 추가

server.use(middlewares); // JSON Server 기본 설정 적용
server.use(router); // 라우터 추가

// 포트 5000번에서 서버 실행
server.listen(5000, () => {
  console.log("JSON Server is running on port 5000");
});
