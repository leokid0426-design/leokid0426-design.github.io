# 무한 크래프트 월드

기본 요소를 합쳐 새로운 요소를 만드는 GitHub Pages용 정적 웹게임입니다.

## 포함 기능

- 물, 불, 바람, 흙 기본 요소
- 클릭/드래그 합성
- 레시피 기반 조합 + 자동 생성 조합
- First Discovery 표시
- 도감
- 업적
- 랭킹
- 합성 기록
- 애니메이션/파티클
- localStorage 자동 저장
- Supabase 연결 시 전 세계 First Discovery / 전 세계 랭킹

## GitHub Pages 배포

1. 이 폴더의 `index.html`, `styles.css`, `app.js`를 `leokid0426-design.github.io` 저장소에 업로드합니다.
2. GitHub 저장소 Settings → Pages에서 Branch를 `main` / root로 설정합니다.
3. `https://leokid0426-design.github.io/` 로 접속합니다.

## 전 세계 First Discovery 켜기

GitHub Pages는 정적 사이트라서 서버에 데이터를 저장할 수 없습니다. 전 세계 First Discovery와 랭킹을 쓰려면 Supabase가 필요합니다.

1. Supabase에서 새 프로젝트를 만듭니다.
2. SQL Editor에서 `supabase.sql` 내용을 실행합니다.
3. Project Settings → API에서 Project URL과 anon public key를 복사합니다.
4. `app.js` 상단을 수정합니다.

```js
const SUPABASE_CONFIG = {
  url: "https://프로젝트아이디.supabase.co",
  anonKey: "여기에 anon public key"
};
```

5. 수정한 파일을 GitHub에 다시 업로드합니다.

## 주의

- 이 버전은 무료 정적 사이트에서 돌아가도록 AI API 없이 만들었습니다.
- 실제 Infinite Craft처럼 AI가 매번 결과를 생성하는 구조는 아닙니다.
- 클라이언트에 OpenAI API 키를 넣으면 키가 공개되므로 넣지 마세요.
- Supabase anon key는 공개되어도 되는 키지만, 반드시 RLS 정책을 켜야 합니다.
