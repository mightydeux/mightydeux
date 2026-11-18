# 걸그룹 메이커 (Girl Group Maker)

프린세스 메이커 × 포켓몬 스타일의 걸그룹 육성 시뮬레이션 웹 게임.
연습생에서 월드스타까지 — 8단계 성장, 도트 마을 탐험, 드래그 옷입히기, 실기 미니게임, 멀티 엔딩.

## 실행
`index.html`을 브라우저로 열면 바로 플레이할 수 있습니다. (빌드 결과물, 외부 에셋 없는 단일 파일)

## 구조
| 파일 | 내용 |
|---|---|
| `src/shell.html` | 화면 레이아웃·CSS (빌드 템플릿) |
| `src/girl.js` | 캐릭터 일러스트(SVG) 생성 — 머리·눈·표정·의상 파츠 |
| `src/fx.js` | 효과음·연출·이벤트 컷신(SNS, 유튜브, 기사, 콘서트, 변신 등) |
| `src/core.js` | 데이터(스탯·일정·기획사·의상·엔딩)·한 달 진행·단계 평가 |
| `src/dress.js` | 옷장·상점(드래그 옷입히기) |
| `src/map.js` | 도트 마을 맵 4종(서교동/강남/상암/LA)·이동·NPC — 타일·건물·캐릭터 도트를 코드로 그림 |
| `src/games.js` | 실기 미니게임 |
| `src/story.js` | 대화 에피소드·이벤트 |
| `build.py` | `src/`를 합쳐 `index.html` 생성 |

## 빌드
```
python3 build.py
```

## 데뷔 이후 일러스트 (img/, concept/)
- 연습생 단계(STAGE 1~4)는 코드로 그린 SVG·도트를 쓰고, **데뷔 이벤트(STAGE 5)부터 `img/` 일러스트로 전환**됩니다.
- 경로 설정: `src/core.js`의 `IMG`(배경)·`ME`(주인공) 상수, `CAST.arteam/cafe.img`(NPC 초상)
- `img/me_idol.webp`는 `concept/characters/02_debut_pink_hoodie.png`에서 배경을 잘라낸 컷아웃입니다.
- 주인공 표정 이미지를 추가하려면 `ME`에 `smile`, `surprise`, `tired`, `confident` 키로 경로를 넣으면 자동으로 사용됩니다.
- 원본 컨셉 이미지와 가이드: `concept/`

## 디자인 작업 시 참고
- 그래픽은 전부 코드로 그린 자체 제작물입니다 (외부 에셋 없음).
- 캐릭터: `src/girl.js`의 `girl()` — SVG 좌표로 그림
- 마을 타일·건물: `src/map.js`의 `drawTile()`, `drawBuilding()` — 16×16 도트를 캔버스에 그림
- 걷는 캐릭터 도트: `src/map.js`의 `SPR`, `WALK` (16×20 문자 배열)
- 배경(방·연습실·무대): `src/core.js`의 `roomSVG()`, `ACTBG`
- 이미지 파일로 교체하려면 위 함수들을 이미지 그리기로 바꾸면 됩니다.
