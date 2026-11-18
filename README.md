# 걸그룹 메이커 (Girl Group Maker)

프린세스 메이커 스타일의 걸그룹 육성 시뮬레이션 웹 게임.
연습생에서 월드스타까지 — 8단계 성장, 일러스트 마을 탐험, 드래그 옷입히기, 실기 미니게임, 멀티 엔딩.

## 실행
`index.html`을 브라우저로 열면 바로 플레이할 수 있습니다. (`img/` 폴더가 같은 위치에 있어야 합니다)
GitHub Pages: https://mightydeux.github.io/mightydeux/

## 구조
| 파일 | 내용 |
|---|---|
| `src/shell.html` | 화면 레이아웃·CSS (빌드 템플릿). 맨 아래 **MODERN K-POP THEME** 블록이 현재 디자인 |
| `src/art.js` | 일러스트 연결 — 주인공·NPC 그림, 장면 배경 (`ART`, `ARTBG` 표) |
| `src/fx.js` | 효과음·연출·이벤트 컷신(SNS, 유튜브, 기사, 콘서트, 변신 등) |
| `src/core.js` | 데이터(스탯·일정·기획사·의상·엔딩)·한 달 진행·단계 평가 |
| `src/dress.js` | 옷장·상점(드래그 옷입히기) |
| `src/map.js` | 걷는 마을 — 옆에서 본 거리를 좌우로 걷기, 건물·사람·선물 상자·팬, 장소 카드 |
| `src/games.js` | 실기 미니게임 |
| `src/story.js` | 대화 에피소드·이벤트 |
| `build.py` | `src/`를 합쳐 `index.html` 생성 |

## 빌드
```
python3 build.py
```

## 비주얼 (concept_modern/)
현재 비주얼은 `concept_modern/`의 모던 케이팝 소녀 컨셉을 따릅니다. (README_가이드.md 참고)
- 색·폰트·버튼 모양: `src/shell.html` 맨 아래 `:root` 변수 (`--pink`, `--cream`, `--fh` 등)
- 주인공: 옷차림에 따라 3장 중 하나로 표시 (`src/art.js`의 `meOutfit()`)
  - `img/me_practice.webp` 연습복 (트랙 팬츠 등) · `img/me_hoodie.webp` 후디+스커트 (스커트·원피스) · `img/me_daily.webp` 후디+와이드 데님 (연청 데님)
  - 연습실·헬스장 일정에서는 연습복, 숙소 일정에서는 일상복으로 자동 전환
- NPC: `ART.npc`에 그림이 있으면 사용(현재 A&R 팀장 서윤 = `npc_manager`, 카페 다온 = `npc_cafe`), 없으면 이름이 적힌 파스텔 프로필 카드
- 배경: `img/env_*.webp`(거리·연습실 건물·기획사 건물), `img/bg_*.webp`(숙소·연습실 안·카페 안)
- 캐릭터 이미지는 원본에서 배경을 잘라낸 컷아웃(webp, 투명 배경)입니다. 원본은 `concept_modern/`
- `me_daily.webp`는 노출을 줄이기 위해 배 부분에 흰 이너 티를 덧그렸습니다.

### 걷는 마을 (concept_map/)
- 거리는 왼쪽부터 우리 집 → 아카데미 → 헬스장 → 카페 → 쇼핑몰 → 영어 학원 → 방송국 순서 (`STREET`)
- 건물 그림 `img/bd_A~G.webp`, 하늘 `img/map_sky.webp`, 걷는 주인공 `img/sd_*_1/2.webp`, NPC SD `img/sd_harin/woojin/arteam/cafe.webp`
- 건물 높이 `BH`, 간판 위치 `SIGN`, 걷는 속도 `WALK_SPEED` — 모두 `src/map.js` 맨 위
- 간판 글자는 게임이 단계별 이름으로 얹음 (`BLABEL`)
- 조작: ← → 걷기, ↑/스페이스 들어가기·말 걸기 (휴대폰은 ◀ ▶ A 버튼, 건물·사람을 눌러도 그쪽으로 걸어감)

### 그림 추가하는 법
1. `img/`에 webp(또는 png) 파일을 넣는다 — 캐릭터는 배경이 투명한 전신 그림이 가장 잘 어울립니다.
2. `src/art.js`의 표에 경로를 적는다
   - NPC: `ART.npc`에 `harin:'img/npc_harin.webp'`처럼 (키 이름은 `src/core.js`의 `CAST` 참고)
   - 주인공 새 의상: `ART.me`에 추가하고 `meOutfit()`에서 어떤 옷일 때 쓸지 정한다
3. `python3 build.py`

### 아직 그림이 없는 것 (추가하면 좋은 목록)
- NPC SD(마을용): 지유, 채원, 레나, 미경쌤, 레오쌤, 할머니, 서아, 고PD, 엄마, 박기자, 소라, 강 코치, 제니, 마이크, 에밀리
- NPC 일러스트(대화용): 위 인물 + 하린, 우진 매니저
- 주인공: 무대 의상(데뷔·1위·시상식), 표정(웃음·놀람·지침)
- 장소: 완공된 방송국 건물(데뷔 후용), 강남·상암·LA 거리 건물, 헬스장·쇼핑몰 내부, 무대
- 주인공 SD: 후디+청바지 걷기 2번째 프레임

`concept/`는 이전에 쓰던 데뷔 이후 컨셉 이미지(현재 게임에서는 사용하지 않음)입니다.
