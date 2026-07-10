# WebRTC 프로젝트 인증 시스템 (Auth)

팀 프로젝트의 회원가입/로그인/로그인 유지 인증 시스템입니다.

## 실행 방법

```bash
npm install
# .env 파일에 MONGO_URI, JWT_SECRET_KEY, PORT 등 설정 필요
npm start   # 또는 nodemon app.mjs
```

## 프로젝트 구조

```
├── app.mjs                  # 서버 진입점
├── config.mjs                # 환경변수 중앙 관리
├── db/
│   └── user_database.mjs     # MongoDB 연결 및 컬렉션 접근
├── router/
│   └── auth.mjs               # 인증 관련 라우팅
├── controller/
│   └── auth.mjs               # 요청 처리 로직
├── repository/
│   └── auth.mjs               # DB 접근 로직
├── middleware/
│   └── auth.mjs               # 토큰 인증(로그인 유지) 미들웨어
└── public/
    ├──js/
    │   ├── login.js
    │   └── signup.js
    ├──css/
    │   └──
    ├── login.html
    └── signup.html
```

> 3계층 아키텍처(`router` → `controller` → `repository`)로 구성

## 회원 정보 스키마

```js
{
  _id: ObjectId,
  userid: String,       // 로그인 아이디
  userpw: String,       // bcrypt로 해싱된 비밀번호
  nickname: String,
  username: String,     // 실명
  email: String,
  userType: "teacher" | "student",
  createdAt: Date
}
```

## 인증 흐름

1. **회원가입/로그인 시** `jsonwebtoken`으로 JWT 발급 (payload: `{ id }`, 문자열 통일)
2. 프론트는 발급받은 토큰을 `localStorage`에 저장
3. 보호된 API 요청 시 `Authorization: Bearer <token>` 헤더로 토큰 전송
4. `middleware/auth.mjs`의 `isAuth`가 토큰 검증 → 유효하면 `req.user`에 유저 정보 담아 다음 단계로 전달
5. 로그인 성공 시 `userType`(teacher/student)에 따라 각각 다른 로비 페이지로 리다이렉트

## 주요 구현 포인트

- **비밀번호 보안**: `bcrypt.hashSync`로 해싱하여 저장, 응답 시 `userpw` 필드 제외
- **JWT 페이로드 일관성**: 회원가입/로그인 모두 `{ id: "문자열" }` 형태로 통일 (`_id.toString()`)
- **미들웨어 재사용**: `isAuth`는 다른 보호된 라우터(방 생성 등)에도 그대로 적용 가능
- **정적 파일 서빙**: `express.static(path.join(__dirname, "public"))`으로 실행 위치와 무관하게 안정적으로 서빙

## 기술 스택

- **Runtime & Framework**: Node.js, Express
- **Database**: MongoDB Atlas
- **인증**: `jsonwebtoken` (JWT), `bcrypt` (비밀번호 해싱)
- **프론트엔드**: Vanilla JS (`fetch` API, 폼 핸들링)
- **환경변수 관리**: `.env` + `config.mjs`의 `required()` 헬퍼
