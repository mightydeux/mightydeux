/* ============ 유틸 ============ */
const $=s=>document.querySelector(s);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=(a,b)=>a+Math.random()*(b-a);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function sleep(ms){return new Promise(r=>setTimeout(r,FAST?Math.min(ms,60):ms))}
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2000)}

/* ============ 데이터 ============ */
const LBL={vocal:'보컬',dance:'댄스',visual:'비주얼',mind:'인성',body:'체력',diet:'식단관리',social:'대인관계',english:'외국어',interview:'인터뷰',variety:'예능감',fame:'팬덤',stress:'스트레스',money:'자금'};
const COLOR={vocal:'#ff5a96',dance:'#3aa0f0',visual:'#f0b400',mind:'#3ab85a',body:'#f07a3a',diet:'#8ac03a',social:'#a070e0',english:'#20b0a0',interview:'#d070d0',variety:'#f09030'};
const AGENCIES=[
 {id:'haeon',name:'HAIVE 레이블즈',short:'HAIVE',tag:'멀티 레이블 · 트렌디한 콘셉트',pref:'bright',desc:'산하 레이블마다 색이 뚜렷하고, 데뷔 전부터 세계관과 티저를 함께 짠다. "자기만의 분위기"를 본다.\n\n📋 실기: 카메라 테스트 + K-POP 상식 필기\n👗 선호 코디: 하이틴',w:{vocal:.22,dance:.22,visual:.3,social:.13,mind:.13},th:60,sign:'HAIVE',games:['camera','quiz']},
 {id:'blueprint',name:'JYB 엔터테인먼트',short:'JYB',tag:'박 대표 직접 피드백 · 인성 최우선',pref:'pure',desc:'박 대표가 오디션장에 직접 들어와 "공기 섞어서, 말하듯이 노래해 봐"라고 주문한다. 실력만큼 태도를 엄격하게 본다.\n\n📋 실기: 롱톤 호흡 + 인터뷰 면접\n👗 선호 코디: 청순·단정',w:{vocal:.35,dance:.2,visual:.1,mind:.25,social:.1},th:62,sign:'JYB',games:['longtone','interview']},
 {id:'sw',name:'SW 엔터테인먼트',short:'SW',tag:'아이돌 명가 · 비주얼과 칼군무',pref:'pure',desc:'긴 연습생 기간과 체계적인 트레이닝으로 유명한 아이돌 명가. 카메라 테스트에서 비주얼과 춤선을 꼼꼼히 본다.\n\n📋 실기: 화보 촬영 + 댄스 실기\n👗 선호 코디: 청순',w:{vocal:.2,dance:.33,visual:.32,diet:.15},th:62,sign:'SW ENT.',games:['photo','ddr']},
 {id:'noir',name:'YJ 엔터테인먼트',short:'YJ',tag:'힙합·퍼포먼스 · 실력파',pref:'charisma',desc:'"잘하는 애들만 데뷔시킨다"는 힙합 명가. 대신 데뷔 일정이 자주 밀리기로 악명 높다.\n\n📋 실기: 안무 순서 외우기 + 노래 실기\n👗 선호 코디: 걸크러시',w:{vocal:.4,dance:.45,mind:.15},th:76,sign:'YJ ENT.',games:['memo','pitch']},
];
const WARDROBE={
 top:[
  {id:'t0',name:'회색 오버핏 후드',st:0,price:0,vis:0,tag:'',v:{type:'hoodie',c1:'#b9bdc7',c2:'#8f94a0',logo:'TRAINEE'}},
  {id:'t1',name:'화이트 반팔 티',st:0,price:80,vis:2,tag:'pure',v:{type:'tee',c1:'#ffffff',c2:'#dcdce4',logo:'DREAM'}},
  {id:'t2',name:'블랙 후드',st:0,price:120,vis:3,tag:'charisma',v:{type:'hoodie',c1:'#2e2e36',c2:'#18181e',logo:'NO LIMIT'}},
  {id:'t3',name:'핑크 가디건',st:1,price:180,vis:5,tag:'pure',v:{type:'cardigan',c1:'#ffb6cf',c2:'#ffffff'}},
  {id:'t4',name:'데님 재킷',st:1,price:240,vis:6,tag:'bright',v:{type:'jacket',c1:'#6a8ac8',c2:'#ffffff'}},
  {id:'t5',name:'올블랙 티',st:2,price:260,vis:8,tag:'charisma',v:{type:'tee',c1:'#26262e',c2:'#3c3c48',logo:'EVAL'}},
  {id:'t6',name:'청순 화이트 원피스',st:3,price:450,vis:12,tag:'pure',dress:true,v:{type:'dress',c1:'#ffffff',c2:'#e8e0ff'}},
  {id:'t7',name:'옐로 하이틴 재킷',st:3,price:450,vis:12,tag:'bright',v:{type:'jacket',c1:'#ffd36e',c2:'#ffffff'}},
  {id:'t8',name:'무대용 핑크 재킷',st:4,price:700,vis:16,tag:'bright',v:{type:'jacket',c1:'#ff5c95',c2:'#ffffff'}},
  {id:'t9',name:'블랙 레더 재킷',st:4,price:800,vis:17,tag:'charisma',v:{type:'jacket',c1:'#1c1c22',c2:'#ff3d6e'}},
  {id:'t20',sig:1,name:'스톤웨이브 연습생 저지',st:99,price:0,vis:3,tag:'charisma',v:{type:'tee',c1:'#2a2a32',c2:'#44444e',logo:'STONEWAVE'}},
  {id:'t21',sig:1,name:'사옥 트레이닝 셋업',st:99,price:0,vis:6,tag:'',v:{type:'hoodie',c1:'#2c3a6a',c2:'#1a2448',logo:'TRAINEE 02'}},
  {id:'t22',sig:1,name:'데뷔조 화이트 셋업',st:99,price:0,vis:10,tag:'pure',v:{type:'jacket',c1:'#ffffff',c2:'#c9b6ff'}},
  {id:'t23',sig:1,name:'데뷔 무대 드레스',st:99,price:0,vis:14,tag:'bright',dress:true,v:{type:'dress',c1:'#ff9ec7',c2:'#ffd6e6',rib:'#ffffff'}},
  {id:'t24',sig:1,name:'1위 앵콜 골드 재킷',st:99,price:0,vis:18,tag:'bright',v:{type:'jacket',c1:'#ffd36e',c2:'#ffffff'}},
  {id:'t25',sig:1,name:'시상식 블랙 롱드레스',st:99,price:0,vis:24,tag:'charisma',dress:true,v:{type:'dress',c1:'#2a2a36',c2:'#3a3a4a',long:true,rib:'#e8c46a'}},
  {id:'t26',sig:1,name:'월드투어 실버 스테이지룩',st:99,price:0,vis:28,tag:'charisma',v:{type:'jacket',c1:'#d8dce8',c2:'#ff3d6e'}},
  {id:'t10',name:'시상식 롱 드레스',st:5,price:1500,vis:24,tag:'pure',dress:true,v:{type:'dress',c1:'#e6ecff',c2:'#c9d6ff',long:true,rib:'#9ab8ff'}},
 ],
 bot:[
  {id:'b0',name:'트랙 팬츠 (흰 줄)',st:0,price:0,vis:0,tag:'',v:{type:'pants',c:'#2a2c38',stripe:'#ffffff'}},
  {id:'b1',name:'그레이 조거 팬츠',st:0,price:60,vis:2,tag:'pure',v:{type:'pants',c:'#9a9ea8'}},
  {id:'b2',name:'연청 데님',st:1,price:140,vis:4,tag:'bright',v:{type:'pants',c:'#7b9fd8'}},
  {id:'b3',name:'블랙 트랙 팬츠 (골드 줄)',st:2,price:220,vis:6,tag:'charisma',v:{type:'pants',c:'#18181f',stripe:'#e2bd62'}},
  {id:'b4',name:'화이트 플리츠 스커트',st:2,price:260,vis:7,tag:'pure',v:{type:'skirt',c:'#fff4f8'}},
  {id:'b5',name:'옐로 체크 스커트',st:3,price:380,vis:9,tag:'bright',v:{type:'skirt',c:'#ffd36e'}},
  {id:'b6',name:'블랙 숏팬츠 + 부츠',st:4,price:650,vis:12,tag:'charisma',v:{type:'shorts',c:'#2a2a30',boot:'#1c1c22'}},
 ],
 shoe:[
  {id:'s0',name:'흰 운동화',st:0,price:0,vis:0,tag:'',v:'#ffffff'},
  {id:'s1',name:'핑크 운동화',st:0,price:50,vis:1,tag:'bright',v:'#ff9ec7'},
  {id:'s2',name:'블랙 청키 스니커즈',st:1,price:120,vis:3,tag:'charisma',v:'#1c1c22'},
  {id:'s3',name:'라일락 메리제인',st:2,price:200,vis:4,tag:'pure',v:'#c9b6ff'},
  {id:'s4',name:'골드 무대 슈즈',st:4,price:500,vis:7,tag:'bright',v:'#ffd36e'},
 ],
 hair:[
  {id:'h0',name:'흑발 생머리',st:0,price:0,vis:0,tag:'',v:{hair:'long',hc:'#2b2030',hh:'#6a5578'}},
  {id:'h1',name:'초코 브라운 웨이브',st:0,price:100,vis:2,tag:'bright',v:{hair:'wave',hc:'#6a4030',hh:'#b08060'}},
  {id:'h2',name:'하이 포니테일',st:1,price:150,vis:3,tag:'charisma',v:{hair:'pony',hc:'#2b2030',hh:'#6a5578'}},
  {id:'h3',name:'단발 보브',st:2,price:220,vis:4,tag:'pure',v:{hair:'bob',hc:'#3a2a30',hh:'#7a6070'}},
  {id:'h4',name:'애쉬 핑크 롱',st:3,price:400,vis:7,tag:'bright',v:{hair:'long',hc:'#e8a8c0',hh:'#fff0f6'}},
  {id:'h5',name:'블루블랙 트윈테일',st:3,price:400,vis:7,tag:'charisma',v:{hair:'twin',hc:'#1a2040',hh:'#5a6aa0'}},
  {id:'h6',name:'플래티넘 블론드 웨이브',st:5,price:1000,vis:11,tag:'pure',v:{hair:'wave',hc:'#f0e0b0',hh:'#ffffff'}},
 ],
 acc:[
  {id:'a0',name:'흰 리본 핀',st:0,price:0,vis:0,tag:'',v:'ribbon'},
  {id:'a1',name:'핑크 머리띠',st:0,price:60,vis:2,tag:'bright',v:'headband'},
  {id:'a2',name:'블랙 볼캡',st:1,price:150,vis:4,tag:'charisma',v:'cap'},
  {id:'a3',name:'별 헤어핀',st:2,price:220,vis:5,tag:'bright',v:'pin'},
  {id:'a4',name:'레드 베레모',st:3,price:350,vis:7,tag:'charisma',v:'beret'},
  {id:'a5',name:'크리스털 티아라',st:5,price:1200,vis:12,tag:'pure',v:'tiara'},
 ],
};
const GEAR={
 mic:{lbl:'마이크',ic:'🎤',st:4,list:[{name:'회사 기본 유선 마이크',price:0,v:0,d:'무대 점수 +0'},{name:'커스텀 인이어 + 핸드마이크',price:600,v:8,d:'라이브 안정감 ↑ · 무대 점수 +8'},{name:'하이엔드 무선 시스템',price:1800,v:16,d:'음향 사고 0% · 무대 점수 +16'}]},
 fx:{lbl:'무대 연출',ic:'✨',st:4,list:[{name:'기본 조명',price:0,v:0,d:'무대 점수 +0'},{name:'LED 백월 + 무빙라이트',price:900,v:8,d:'직캠 화제성 ↑ · 무대 점수 +8'},{name:'불꽃·리프트·와이어 연출',price:2400,v:16,d:'"레전드 무대" · 무대 점수 +16'}]},
 comp:{lbl:'작곡가',ic:'🎼',st:3,list:[{name:'회사 내부 작곡팀',price:0,v:0,d:'팬덤 획득 +0%'},{name:'히트메이커 작곡가 팀',price:1200,v:.3,d:'음원 차트 화력 · 팬덤 획득 +30%'},{name:'해외 송캠프 프로듀서',price:3000,v:.6,d:'글로벌 사운드 · 팬덤 +60% (외국어 50 필요)',req:50}]},
};
const ITEMS=[
 {id:'vita',name:'비타민 음료',price:30,ic:'🧃',d:'스트레스 -12',fx:{stress:-12}},
 {id:'ginseng',name:'홍삼 스틱 한 박스',price:90,ic:'🌿',d:'체력 +4 · 스트레스 -6',fx:{body:4,stress:-6}},
 {id:'meal',name:'트레이너 식단 도시락 (1주)',price:70,ic:'🍱',d:'식단관리 +4 · 체력 +1',fx:{diet:4,body:1}},
 {id:'book',name:'원어민 회화 교재',price:60,ic:'📘',d:'외국어 +3',fx:{english:3}},
];
const ACTS=[
 {id:'breath',name:'호흡·발성 기초',s:[0,1],c0:30,eff:{vocal:4,stress:5},anim:'sing',prop:['🎤','🎶','🎵'],fl:['복식호흡으로 "스-" 소리를 30초 유지했다!','거울 앞에서 입모양과 공명 위치를 잡았다.'],npc:'mikyung'},
 {id:'hightone',name:'고음·라이브 트레이닝',s:[1,3],eff:{vocal:6,body:-1,stress:8},anim:'sing',prop:['🎤','🔥','🎶'],fl:['러닝머신 위에서 뛰며 라이브! 숨이 턱까지 찼다.','후렴 고음을 흔들림 없이 3번 연속 성공!']},
 {id:'cover',name:'선배곡 커버 녹음',s:[1,3],eff:{vocal:4,visual:1,stress:5},anim:'sing',prop:['🎧','💿','🎶'],fl:['선배 그룹 발라드를 커버 녹음했다. "감정선은 좋아."','녹음실 첫 경험. 헤드폰 속 내 목소리가 낯설다.']},
 {id:'theory',name:'K-POP 이론 수업 (퀴즈)',s:[0,1],c0:20,eff:{interview:2,variety:2,stress:2},anim:'rest',prop:['📝','💡','❓'],fl:['K-POP 역사와 업계 용어를 배웠다.'],quiz:true},
 {id:'stamina',name:'체력 훈련 (러닝·서킷)',s:[0,1],eff:{body:6,dance:1,diet:1,stress:5},anim:'dance',prop:['👟','💦','🏃'],fl:['한강 5km 러닝 완주!','버피·스쿼트 서킷 3세트. 다리가 후들거린다.']},
 {id:'flex',name:'유연성 스트레칭',s:[0,3],c0:20,eff:{dance:2,body:2,stress:1},anim:'rest',prop:['🧘','✨','💫'],fl:['다리 찢기가 어제보다 2cm 더 내려갔다.','폼롤러로 굳은 근육을 풀었다.']},
 {id:'copy',name:'선배 그룹 안무 모사',s:[0,3],c0:30,eff:{dance:6,stress:7},anim:'dance',prop:['💃','📹','⚡'],fl:['데뷔 7년 차 선배 그룹 타이틀곡을 0.5배속으로 따라 했다.','직캠을 프레임 단위로 끊어 보며 손끝 각도까지 맞췄다.'],npc:'leo'},
 {id:'formation',name:'칼군무 동선 맞추기',s:[2,5],eff:{dance:4,social:3,stress:6},team:1,anim:'dance',prop:['👯','📐','⚡'],fl:['바닥 테이프 위치를 외우고 5명 동선을 맞췄다.','"하나, 둘, 셋에 고개!" 각이 맞기 시작했다.']},
 {id:'diet',name:'균형 식단 관리',s:[0,5],eff:{diet:5,visual:1,body:1,stress:3},anim:'rest',prop:['🥗','🍎','💧'],fl:['영양사 식단대로 세 끼를 챙겼다. 컨디션 업!','야식 대신 따뜻한 차. 붓기가 빠졌다.']},
 {id:'skin',name:'피부·헤어 관리',s:[0,5],c:60,eff:{visual:5,stress:-3},anim:'rest',prop:['💄','✨','🪞'],fl:['피부 관리 후 거울 속 내가 반짝인다!','헤어 컬러 테스트를 받았다.']},
 {id:'camera',name:'카메라 테스트·표정 연기',s:[1,3],eff:{visual:4,variety:1,stress:4},anim:'sing',prop:['📸','🎬','✨'],fl:['카메라 렌즈를 사람 눈처럼 보는 연습!','엔딩 요정 표정 10종 세트 완성.']},
 {id:'diary',name:'연습일지 쓰기',s:[0,3],eff:{mind:5,stress:-2},anim:'rest',prop:['📔','✏️','💭'],fl:['오늘 받은 피드백을 연습일지에 꼼꼼히 적었다.','지난달 일지를 다시 읽었다. 꽤 많이 왔다.']},
 {id:'dinner',name:'동기들과 저녁',s:[0,1],c:20,eff:{social:5,stress:-8},anim:'rest',prop:['🍜','🍢','😆'],fl:['떡볶이를 먹으며 서로의 꿈 이야기를 나눴다.','편의점 앞에서 컵라면. 동기들이 좀 더 가까워졌다.'],npc:'harin'},
 {id:'senior',name:'선배에게 조언 구하기',s:[2,3],eff:{mind:3,social:3,vocal:1,dance:1},anim:'rest',prop:['💬','⭐','📒'],fl:['선배: "평가 때 실수해도 표정은 끝까지 지켜."','선배가 연습생 시절 연습일지를 보여줬다.']},
 {id:'english',name:'영어 공부',s:[0,3],c:20,eff:{english:5,stress:4},anim:'rest',prop:['📚','🔤','🌎'],fl:['미드 한 편을 자막 없이 봤다. 절반은 알아들었다!','팝송 가사로 발음 연습.']},
 {id:'engpro',name:'원어민 영어 레슨',s:[3,7],c:120,eff:{english:9,stress:5},anim:'sing',prop:['🗽','💬','🌎'],fl:['원어민 선생님과 해외 팬 라이브 상황극!','미국 라디오 인터뷰 예상 질문 20개를 연습했다.']},
 {id:'mediatr',name:'미디어 트레이닝 (인터뷰)',s:[3,5],eff:{interview:6,mind:1,stress:4},anim:'sing',prop:['🎙️','📺','💡'],fl:['곤란한 질문에 웃으며 답하는 법을 배웠다.','"데뷔 소감"을 15초 안에 정리하는 연습.']},
 {id:'varprep',name:'예능 개인기 준비',s:[3,5],eff:{variety:5,stress:3},anim:'dance',prop:['🤣','🎭','✨'],fl:['성대모사 개인기 완성! 매니저가 빵 터졌다.','리액션 연습: 크게, 빠르게, 진심으로.']},
 {id:'musicshow',name:'음악방송 출연',s:[4,5],eff:{fame:24,money:150,stress:10,body:-2},team:1,anim:'dance',prop:['📺','🎆','💖'],fl:['새벽 4시 사전녹화. 팬들의 응원법이 들렸다!','생방송 무대. 엔딩 요정 클로즈업 성공!']},
 {id:'fansign',name:'팬사인회',s:[4,7],eff:{fame:14,money:100,social:2,stress:6},team:1,anim:'sing',prop:['✍️','💌','💖'],fl:['팬이 써 온 편지를 받고 울컥했다.','한 명 한 명 눈을 맞추며 이름을 불러줬다.']},
 {id:'variety',name:'예능 프로그램 출연',s:[4,5],eff:{fame:20,variety:5,money:200,stress:8},team:1,anim:'dance',vc:1,prop:['🤣','🏃','📺'],fl:['아이돌 체육대회 계주에서 1등!','관찰 예능에서 숙소 생활이 공개됐다.']},
 {id:'content',name:'자체 콘텐츠·브이로그',s:[4,7],eff:{fame:10,social:2,visual:1,money:60,stress:3},team:1,anim:'sing',prop:['🎥','📱','💕'],fl:['숙소 브이로그 조회수 100만!','자체 예능 촬영. "케미 맛집"이라는 댓글.']},
 {id:'radio',name:'라디오·매거진 인터뷰',s:[4,5],eff:{fame:12,interview:3,money:80,stress:5},team:1,anim:'sing',prop:['📻','📰','🎙️'],fl:['라디오 라이브 코너에서 무반주 라이브!','패션 매거진 화보 인터뷰를 했다.']},
 {id:'ustour',name:'북미 프로모션·투어',s:[6,7],eff:{fame:34,english:3,money:400,stress:12},team:1,anim:'dance',prop:['🇺🇸','🎆','🎤'],fl:['LA 공연장. 떼창이 한국어로 들렸다!','뉴욕 전광판에 우리 얼굴이!']},
 {id:'usshow',name:'미국 토크쇼·라디오',s:[6,7],eff:{fame:28,english:2,interview:2,money:250,stress:8},team:1,anim:'sing',prop:['📺','🗽','😂'],fl:['심야 토크쇼에서 영어 농담! 객석이 웃었다.','미국 라디오 스튜디오에서 라이브.']},
 {id:'prolesson',name:'전속 보컬 디렉터 레슨',s:[2,3],eff:{vocal:7,stress:7},anim:'sing',prop:['🎤','🎼','✨'],fl:['"공기 반, 소리 반!" 디렉터님의 피드백이 날카롭다.','한 소절을 스무 번 다시 불렀다. 마지막 테이크에서 박수가 나왔다!']},
 {id:'evalreh',name:'월말평가 리허설',s:[2,2],eff:{vocal:3,dance:4,stress:8},anim:'dance',prop:['📋','💃','⏱️'],fl:['실제 평가장처럼 카메라 세팅을 하고 리허설했다.','트레이너들 앞에서 미리 한 번. 다리가 후들거렸다.']},
 {id:'record',name:'데뷔곡 가이드 녹음',s:[3,3],eff:{vocal:6,stress:6},anim:'sing',prop:['🎧','💿','🎶'],fl:['데뷔곡 첫 녹음! 내 파트가 정해졌다.','PD님: "그 숨소리 살리자. 그게 너야."']},
 {id:'shoot',name:'콘셉트 포토 촬영',s:[3,3],eff:{visual:6,variety:1,stress:4},anim:'sing',prop:['📸','💡','🎀'],fl:['데뷔 콘셉트 포토 촬영! 플래시가 쏟아졌다.','티저 사진 A컷이 나왔다. 실장님이 엄지를 들었다.']},
 {id:'pt',name:'1:1 PT 트레이닝',s:[2,7],eff:{body:7,dance:1,diet:2,stress:6},anim:'dance',prop:['🏋️','💦','🔥'],fl:['코치님: "하나만 더!" 그 말을 열 번 들었다.','코어 운동 후 춤 동작이 훨씬 안정됐다.']},
 {id:'yasik',name:'멤버들과 야식 타임',s:[2,7],c:30,eff:{social:5,stress:-10},anim:'rest',prop:['🍗','🍜','😆'],fl:['숙소 거실에서 치킨 파티. 다들 웃다가 울었다.','야식 먹으며 데뷔 후 하고 싶은 것 리스트를 만들었다.']},
 {id:'vlive',name:'팬 라이브 방송',s:[4,5],eff:{fame:16,social:2,variety:2,stress:4},anim:'sing',team:1,prop:['📱','💬','💖'],fl:['숙소에서 깜짝 라이브! 동시 접속자 10만 명!','팬들 댓글 읽어주다가 시간 가는 줄 몰랐다.']},
 {id:'comebackprep',name:'컴백 안무 연습',s:[4,5],eff:{dance:6,social:2,stress:8},anim:'dance',team:1,prop:['💃','🔁','⚡'],fl:['새 안무 시안 첫날. 동선이 꼬여서 다 같이 웃었다.','칼군무가 맞아떨어진 순간, 다 같이 소리를 질렀다.']},
 {id:'vocaldir',name:'녹음실 보컬 디렉팅',s:[4,7],eff:{vocal:6,stress:6},anim:'sing',prop:['🎙️','🎚️','🎶'],fl:['새 앨범 수록곡 녹음. 애드리브 파트를 따냈다!','디렉터: "그 고음, 그대로 앨범에 간다."']},
 {id:'magazine',name:'패션 매거진 화보',s:[4,7],eff:{fame:14,visual:3,money:160,stress:5},anim:'sing',prop:['📸','👗','✨'],fl:['패션 매거진 커버 촬영! 포토그래퍼가 감탄했다.','화보 인터뷰에서 데뷔 비하인드를 이야기했다.']},
 {id:'cf',name:'광고 촬영',s:[5,7],eff:{fame:18,visual:2,money:400,stress:7},anim:'sing',prop:['🎬','💄','🪙'],fl:['음료 광고 촬영. 같은 대사를 서른 번 했다.','첫 단독 광고! 지하철역에 걸린다고 한다.']},
 {id:'songcamp',name:'LA 송캠프 작업',s:[6,7],eff:{vocal:4,english:3,fame:10,stress:6},anim:'sing',prop:['🎹','🌴','🎶'],fl:['해외 작곡가들과 송캠프. 내 멜로디가 채택됐다!','영어 가사를 직접 고쳐 썼다.']},
 {id:'usdance',name:'현지 안무가 워크숍',s:[6,7],eff:{dance:6,english:2,stress:6},anim:'dance',team:1,prop:['🕺','🇺🇸','⚡'],fl:['LA 유명 안무가의 워크숍. 그루브가 다르다!','"Your energy is crazy!" 칭찬을 들었다.']},
 {id:'usradio',name:'미국 라디오 투어',s:[6,7],eff:{fame:22,english:3,interview:2,money:200,stress:8},anim:'sing',team:1,prop:['📻','🗽','🎤'],fl:['뉴욕 라디오 생방송. 영어 농담이 먹혔다!','DJ: "K-pop queens in the house!"']},
 {id:'usfan',name:'미국 팬 이벤트',s:[6,7],eff:{fame:20,social:3,money:150,stress:5},anim:'sing',team:1,prop:['💌','🇺🇸','💖'],fl:['LA 팬 이벤트. 팬들이 한국어로 응원법을 외쳤다!','미국 팬이 직접 만든 응원봉을 선물했다.']},
 {id:'beach',name:'산타모니카 해변 산책',s:[6,7],eff:{stress:-28,mind:2},anim:'rest',prop:['🌴','🌊','🍦'],fl:['노을 지는 해변. 아무 생각 없이 걸었다.','멤버들과 젤라토를 먹으며 파도를 봤다.']},
 {id:'rest',name:'푹 쉬기',s:[0,7],eff:{stress:-22,body:1},anim:'rest',prop:['😴','💤','🛏️'],fl:['하루 종일 푹 잤다.','좋아하는 드라마를 몰아봤다.']},
 {id:'family',name:'가족과 저녁',s:[0,1],eff:{stress:-28,mind:2},anim:'rest',prop:['🍲','👪','💕'],fl:['엄마가 해준 김치찌개. 역시 집밥!','동생이 내 연습 영상을 학교에 자랑했다고 한다.'],npc:'mom'},
 {id:'home',name:'본가 다녀오기',s:[2,5],eff:{stress:-30,mind:2},anim:'rest',prop:['🏠','🍲','💕'],fl:['엄마가 해준 김치찌개. 눈물이 날 뻔했다.','오랜만에 내 방 침대. 꿀잠.'],npc:'mom'},
 {id:'parttime',name:'카페 아르바이트',s:[0,1],eff:{money:120,stress:8,mind:1},anim:'rest',prop:['☕','🪙','🧁'],fl:['주말 카페 알바. 손님 응대도 연습이다.','알바비로 레슨비를 보탰다!']},
];
const STAGES=[
 {name:'아카데미 수강생',goal:'소형 기획사 오디션',months:6,place:'서교동 K-아카데미',hint:'실기: 노래 + 댄스',
  intro:'서교동의 한 실용음악·댄스 아카데미. 같은 반 수강생 절반은 이미 오디션 경험자다.\n\n6개월 뒤 스톤웨이브 엔터 정기 오디션이 목표!'},
 {name:'소형 기획사 연습생',goal:'대형 기획사 오디션',months:8,place:'스톤웨이브 엔터 · B1 연습실',hint:'회사마다 실기·선호 코디가 다르다',
  intro:'스톤웨이브 엔터테인먼트. 직원 열두 명의 작은 회사, 연습실은 지하 1층.\n\n8개월 뒤 대형 기획사 공개 오디션. 이제 레슨비는 회사가 낸다.'},
 {name:'대형 기획사 연습생',goal:'최종 데뷔조 합류',months:8,place:'',hint:'두 달마다 월말평가 · 최종: 댄스+노래+카메라',
  intro:'{ag} 연습생이 되었다! 연습생 동기만 30명.\n\n두 달마다 월말평가가 있고, 8개월 뒤 최종 데뷔조 5인이 결정된다.'},
 {name:'데뷔조',goal:'데뷔 쇼케이스',months:6,place:'데뷔조 숙소 & 연습실',hint:'실기: 라이브 + 인터뷰 · 데뷔 콘셉트 코디 보너스',
  intro:'최종 데뷔조 합류! 숙소 생활 시작.\n\n쇼케이스까지 6개월. 노래와 춤뿐 아니라 인터뷰, 예능, 카메라 앞의 모습까지 준비해야 한다.\n\n💰 회사 데뷔 준비 지원금 +800G\n🔓 미디어 트레이닝·예능 준비·원어민 레슨 · 작곡가 계약'},
 {name:'신인 걸그룹',goal:'음악방송 1위',months:6,place:'음악방송 〈M카운트업〉',hint:'팬덤 + 무대 점수 · 실기: 댄스 + 카메라',
  intro:'{grp} 데뷔!\n\n목표는 음악방송 1위. 데뷔 후부터는 팬덤이 곧 성적이다.\n\n💰 데뷔 축하금 +800G · 매달 정산금 지급 시작\n🔓 방송국 오픈 · 마이크·무대 연출'},
 {name:'대세 걸그룹',goal:'연말 시상식 수상',months:6,place:'연말 시상식 시즌',hint:'팬덤·무대·인터뷰·인성 · 예능이냐 미국이냐',
  intro:'첫 1위 이후 섭외가 쏟아진다.\n\n연말 시상식까지 6개월. 예능에 집중할지, 무대와 외국어에 집중할지에 따라 앞으로의 길이 달라진다.'},
 {name:'미국 진출',goal:'Hot 100 진입',months:6,place:'Los Angeles',hint:'외국어·무대·팬덤·작곡가',
  intro:'미국 대형 레이블과 파트너십 체결!\n\nLA 스튜디오에서 첫 영어 싱글을 녹음한다. 목표는 Hot 100 진입.\n\n🔓 북미 프로모션·미국 토크쇼'},
 {name:'글로벌 스타',goal:'페스티벌 헤드라이너',months:6,place:'World Tour',hint:'모든 것의 총합',
  intro:'Hot 100 진입 이후 북미 투어가 매진됐다.\n\n마지막 목표: 사막의 대형 음악 페스티벌 헤드라이너 무대.'},
];
const ENDINGS={
 e_student:{t:'평범한 고등학생',g:'NORMAL',d:'오디션의 벽은 높았다.\n하지만 아카데미에서 배운 노래는 학교 축제 무대에서 반짝였고, 친구들은 아직도 그날 무대를 이야기한다.'},
 e_music:{t:'실용음악과 입시생',g:'NORMAL',d:'아이돌 오디션은 떨어졌지만 보컬 실력은 진짜였다.\n미경쌤의 추천으로 실용음악과 입시를 준비하기 시작했다.'},
 e_smallco:{t:'중소의 기적은 오지 않았다',g:'BAD',d:'대형 기획사 오디션에서 끝내 떨어졌다.\n스톤웨이브 엔터에서 5인조로 데뷔했지만 음악방송 출연조차 쉽지 않았다. 2년 뒤, 조용한 활동 종료 공지.'},
 e_actor:{t:'배우로 전향',g:'NORMAL',d:'데뷔조 문턱에서 탈락했다.\n하지만 카메라 테스트 영상을 본 배우 매니지먼트에서 연락이 왔다. 2년 뒤, 청춘 드라마의 서브 주연으로 얼굴을 알렸다.'},
 e_trainer:{t:'보컬 트레이너',g:'NORMAL',d:'데뷔조에는 들지 못했다.\n몇 년 뒤, 서교동 아카데미로 돌아와 보컬 트레이너가 되었다. 미경쌤 옆자리에서.'},
 e_survival:{t:'서바이벌 프로그램 재도전',g:'BAD',d:'쇼케이스 직전, 데뷔조가 재편되며 탈락했다.\n1년 뒤, 오디션 서바이벌 프로그램에 다시 지원했다. 이야기는 여기서 끝나지 않을지도.'},
 e_disband:{t:'1위 없는 7년',g:'BAD',d:'음악방송 1위 트로피는 끝내 오지 않았다.\n그래도 7년 동안 곁을 지킨 팬들이 있었다. 계약 만료와 함께 그룹은 각자의 길을 걷는다.'},
 e_midtier:{t:'꾸준한 중견 걸그룹',g:'GOOD',d:'시상식 트로피는 놓쳤지만, 매 컴백마다 1위 후보에 오르는 탄탄한 그룹이 되었다.\n"믿고 듣는 그룹"이라는 수식어가 붙었다.'},
 e_burnout:{t:'잠시 멈춤',g:'BAD',d:'쉬지 않고 달린 몸과 마음이 결국 신호를 보냈다.\n"건강상의 이유로 당분간 활동을 중단한다"는 공지. 쉬는 것도 실력이라는 걸, 너무 늦게 알았다.'},
 e_scandal:{t:'사생활 논란',g:'BAD',d:'어울리는 밤이 잦아졌고, 결국 생방송 지각과 사진 유출로 이어졌다.\n논란은 그룹 전체의 활동 중단으로 번졌다.'},
 e_kicked:{t:'연습생 방출',g:'BAD',d:'몰래 외출과 비밀 계정이 반복되며 회사의 신뢰를 잃었다.\n계약 해지 통보. 출입증을 반납하던 날, 거울 속 내가 낯설었다.'},
 e_variety:{t:'국민 예능돌',g:'GOOD+',d:'연말 시상식 수상과 함께 예능 신인상까지!\n고은성 PD의 〈놀라운 주말〉 고정, 광고 10개. 미국 대신 한국에서 "모르는 사람이 없는" 아이돌이 되었다.'},
 e_korea:{t:'국민 걸그룹',g:'GREAT',d:'연말 시상식 수상! 음원 차트 올킬과 함께 "국민 걸그룹"이라는 이름을 얻었다.\n미국 레이블의 러브콜도 있었지만, 외국어 준비가 부족해 다음 기회로 미뤘다.'},
 e_uspartial:{t:'미국 도전기, 그리고 귀환',g:'GOOD',d:'Hot 100의 벽은 생각보다 높았다.\n하지만 북미 투어에서 만난 팬들은 진짜였다. 한국으로 돌아와 발표한 앨범은 커리어 하이를 찍었다.'},
 e_usgood:{t:'Hot 100에 이름을 새기다',g:'GREAT',d:'헤드라이너는 다음 해로 미뤄졌지만, Hot 100에 이름을 올린 K-팝 걸그룹이 되었다.\n그룹의 이름이 미국 라디오에서 흘러나온다.'},
 e_world:{t:'월드 스타',g:'LEGEND',d:'사막의 페스티벌 헤드라이너 무대, 수만 명의 떼창.\n그리고 미국 음악 시상식 무대에서, 서교동 아카데미 첫날을 떠올렸다.\n\n"Thank you… and 엄마, 나 해냈어."'},
};
const CAST={
 harin:{name:'서하린',role:'아카데미 동기 · 부산 출신 댄서',look:{hair:'pony',hc:'#4a3026',hh:'#8a6450',eye:'#9a6a3a',top:{type:'tee',c1:'#ffffff',logo:'BUSAN'},expr:'happy'}},
 jiyu:{name:'강지유',role:'라이벌 · 엄마가 90년대 가수',look:{hair:'wave',hc:'#9a6a4a',hh:'#e0b090',eye:'#7a5a9a',top:{type:'jacket',c1:'#26262e',c2:'#ffffff'},expr:'smug'}},
 chaewon:{name:'민채원',role:'천재 보컬 · 무대 공포증',look:{hair:'bob',hc:'#1c1824',hh:'#5a5476',eye:'#4a6a9a',top:{type:'hoodie',c1:'#d9dce4',c2:'#b4b8c4'},expr:'shy'}},
 rena:{name:'미나토 레나',role:'오사카 출신 연습생',look:{hair:'twin',hc:'#2c2234',hh:'#6a5a7a',eye:'#7a3a3a',top:{type:'tee',c1:'#f4f4f4',logo:'OSAKA'},expr:'happy'}},
 mikyung:{name:'윤미경 쌤',role:'아카데미 보컬 선생님',look:{hair:'bob',hc:'#3a2826',hh:'#6a5048',eye:'#5a3a2a',glasses:true,top:{type:'cardigan',c1:'#d8c6ae',c2:'#ffffff'},expr:'normal'}},
 leo:{name:'레오 쌤',role:'아카데미 댄스 선생님',look:{hair:'short',hc:'#1a1a1a',hh:'#555555',eye:'#3a2a20',male:true,top:{type:'hoodie',c1:'#2a2a2e',c2:'#18181c'},expr:'smile'}},
 granny:{name:'언덕길 할머니',role:'아카데미 가는 길에서 만난 분',look:{hair:'bun',hc:'#cfcacc',hh:'#ffffff',eye:'#5a4a40',glasses:true,old:true,top:{type:'cardigan',c1:'#b97a5e',c2:'#f2e6d8'},expr:'smile'}},
 woojin:{name:'정우진 매니저',role:'스톤웨이브 매니저',look:{hair:'short',hc:'#2a2420',hh:'#5a5048',eye:'#3a2a20',male:true,top:{type:'jacket',c1:'#2c3a5a',c2:'#ffffff'},expr:'smile'}},
 seoa:{name:'원서아',role:'최정상 걸그룹 EIVE 센터',look:{hair:'long',hc:'#e2c2b0',hh:'#ffffff',eye:'#b05a7a',acc:'pin',top:{type:'jacket',c1:'#ffffff',c2:'#ffd6e6'},expr:'smile'}},
 pd:{name:'고은성 PD',role:'예능 〈놀라운 주말〉 PD',look:{hair:'short',hc:'#3a3030',hh:'#6a5a5a',eye:'#3a2a20',male:true,glasses:true,top:{type:'hoodie',c1:'#6a7a5a',c2:'#4a5a3e'},expr:'smile'}},
 mom:{name:'엄마',role:'가족',look:{hair:'bob',hc:'#4a3428',hh:'#7a6458',eye:'#5a3a2a',top:{type:'cardigan',c1:'#9ab0c8',c2:'#ffffff'},expr:'smile'}},
 reporter:{name:'연예부 박기자',role:'연예 매체 기자',look:{hair:'bob',hc:'#2a2a30',hh:'#5a5a6a',eye:'#3a3a4a',glasses:true,top:{type:'jacket',c1:'#5a5a6a',c2:'#ffffff'},expr:'normal'}},
 fanmaster:{name:'팬카페 매니저 소라',role:'공식 팬카페 운영자',look:{hair:'pony',hc:'#c06a8a',hh:'#f0b0c8',eye:'#7a3a5a',top:{type:'hoodie',c1:'#ffb6cf',c2:'#ff8fb0',logo:'FAN'},expr:'happy'}},
 trainer:{name:'강 코치',role:'회사 전속 트레이너',look:{hair:'short',hc:'#1a1a1a',hh:'#4a4a4a',eye:'#3a2a20',male:true,top:{type:'tee',c1:'#1c1c22',logo:'COACH'},expr:'normal'}},
 jenny:{name:'LA 코디 제니',role:'LA 현지 코디네이터',look:{hair:'wave',hc:'#e8c070',hh:'#fff0c0',eye:'#4a6a9a',top:{type:'jacket',c1:'#e84a5a',c2:'#ffffff'},expr:'happy'}},
 mike:{name:'프로듀서 마이크',role:'LA 히트곡 프로듀서',look:{hair:'short',hc:'#3a2a1a',hh:'#6a5a4a',eye:'#3a2a20',male:true,acc:'cap',top:{type:'hoodie',c1:'#4a6a9a',c2:'#2a4a7a',logo:'LA'},expr:'smile'}},
 emily:{name:'미국 팬 에밀리',role:'LA 팬클럽 회원',look:{hair:'twin',hc:'#f0d090',hh:'#fff4d0',eye:'#3a7a5a',top:{type:'tee',c1:'#ffffff',logo:'I♥KPOP'},expr:'happy'}},
 arteam:{name:'A&R 팀장 서윤',role:'기획사 A&R 팀장 · 컴백 기획 담당',look:{hair:'bob',hc:'#2a2026',hh:'#5a4a50',eye:'#4a3a30',top:{type:'cardigan',c1:'#e8dcc4',c2:'#9aa0b8'},expr:'smile'}},
 cafe:{name:'봄날 카페 다온',role:'방송국 앞 카페 사장님',look:{hair:'pony',hc:'#6a4030',hh:'#a07a60',eye:'#6a4a3a',top:{type:'hoodie',c1:'#2a3050',c2:'#6a7a5a'},expr:'happy'}},
 trainee:{name:'동기 보미',role:'',look:{hair:'pony',hc:'#6a4a3a',hh:'#9a7a6a',eye:'#6a4a3a',top:{type:'hoodie',c1:'#b9bdc7',c2:'#8f94a0'},expr:'normal'}},
};
const MAINCAST=['harin','jiyu','chaewon','rena','mikyung','leo','granny','woojin','seoa','pd','trainer','reporter','fanmaster','jenny','mike','emily','arteam','cafe'];
for(const k in CAST)CAST[k].look.who=k;
const ALLOW=[100,130,180,180,0,0,0,0], SETTLE=[0,0,0,0,250,400,600,800];

/* ============ 상태 ============ */
let S=null, busy=false;
function newGame(name){
 S={name,age:14,year:2027,month:3,day:1,stage:0,mi:0,monthsLeft:6,retry:0,money:300,
  vocal:10,dance:10,visual:15,mind:20,body:15,diet:15,social:15,english:5,interview:0,variety:5,fame:0,stress:10,
  tempt:0,burnout:0,varietyCount:0,agency:null,group:null,position:null,concept:null,
  wear:{top:'t0',bot:'b0',shoe:'s0',acc:'a0',hair:'h0'},owned:['t0','b0','s0','a0','h0'],skills:[],badges:[],mm:null,mic:0,fx:0,comp:0,slots:[null,null,null],seen:{},evalRank:null,fameMark:0,
  aff:Object.fromEntries(Object.keys(CAST).map(k=>[k,0])),style:{pure:0,charisma:0,bright:0},met:{},done:{},flags:{},quizSeen:[]};
}
const effVis=()=>S.visual+wearVis();
const perf=()=>Math.round((S.vocal+S.dance)/2*.7+effVis()*.3+GEAR.mic.list[S.mic].v+GEAR.fx.list[S.fx].v);
const agObj=()=>AGENCIES.find(a=>a.id===S.agency);
function statVal(k){return k==='visual'?effVis():S[k]}
function agScore(ag,mg){let s=0;for(const k in ag.w)s+=ag.w[k]*statVal(k);return s+mg*.12+coordi()[ag.pref]*2}
const rivalCo=()=>S.agency==='sw'?'같은 회사 SW 엔터':'SW 엔터';
function teamNames(){const t=[S.name,'미나토 레나'];if(S.flags.harinTeam)t.push('서하린');if(S.flags.chaewonTeam)t.push('민채원');for(const f of ['한유이','송다은','진세아']){if(t.length>=5)break;if(f!==S.name)t.push(f)}return t}
function topStyle(){const s=S.style;return Object.keys(s).reduce((a,b)=>s[a]>=s[b]?a:b)}
const SKILLS=[
 {id:'live',name:'흔들림 없는 라이브',icon:'🎤',k:'vocal',v:50,d:'노래·롱톤 실기 +5',g:['pitch','longtone']},
 {id:'hinote',name:'3단 고음',icon:'🎶',k:'vocal',v:100,d:'노래·롱톤 실기 +5',g:['pitch','longtone']},
 {id:'wave',name:'칼각 웨이브',icon:'💃',k:'dance',v:50,d:'댄스·안무 실기 +5',g:['ddr','memo']},
 {id:'free',name:'프리스타일 마스터',icon:'🔥',k:'dance',v:100,d:'댄스·안무 실기 +5',g:['ddr','memo']},
 {id:'fairy',name:'엔딩 요정',icon:'🧚',k:'visual',v:60,d:'카메라·화보 실기 +5',g:['camera','photo']},
 {id:'aura',name:'센터 아우라',icon:'👑',k:'visual',v:110,d:'카메라·화보 실기 +5',g:['camera','photo']},
 {id:'talk',name:'센스 있는 답변',icon:'💬',k:'interview',v:40,d:'인터뷰 면접 +5',g:['interview']},
 {id:'eng',name:'프리토킹',icon:'🗽',k:'english',v:60,d:'영어 인터뷰 +8',g:['interview_en'],b:8},
 {id:'react',name:'리액션 장인',icon:'🤣',k:'variety',v:40,d:'예능 출연 팬덤 +20%'},
 {id:'mental',name:'강철 멘탈',icon:'🛡️',k:'mind',v:60,d:'스트레스 증가 -20%'},
 {id:'stamina',name:'강철 체력',icon:'🦾',k:'body',v:60,d:'지쳤을 때 효율 저하 감소'},
 {id:'quiz',name:'K-POP 박사',icon:'🎓',k:'interview',v:20,d:'상식 필기 +5',g:['quiz']},
];
const BADGES=[['🪨','스톤웨이브 연습생','linear-gradient(135deg,#d8d8e8,#8a8aa8)'],['🏢','대형 기획사 입성','linear-gradient(135deg,#9ad7ff,#3a7ad8)'],['🌟','데뷔조 선발','linear-gradient(135deg,#ffe9a8,#ffb03a)'],['🎤','데뷔','linear-gradient(135deg,#ffb6cf,#d9457f)'],['🏆','첫 1위','linear-gradient(135deg,#fff3a0,#e8b020)'],['👑','시상식 수상','linear-gradient(135deg,#f0e0ff,#a070e0)'],['🇺🇸','Hot 100','linear-gradient(135deg,#a8e8ff,#ff7a9a)'],['🌍','월드 스타','linear-gradient(135deg,#9be59b,#3aa0f0)']];
function skillBonus(g){return SKILLS.filter(s=>S.skills.includes(s.id)&&s.g&&s.g.includes(g)).reduce((a,s)=>a+(s.b||5),0)}
async function checkSkills(){for(const sk of SKILLS){if(!S.skills.includes(sk.id)&&S[sk.k]>=sk.v){S.skills.push(sk.id);await skillPop(sk)}}}
const TRAIN={prolesson:['pitch','longtone'],vocaldir:['pitch','longtone'],record:['longtone'],songcamp:['pitch'],evalreh:['ddr','memo'],comebackprep:['memo','ddr'],usdance:['ddr','memo'],shoot:['photo'],magazine:['photo'],cf:['photo'],breath:['pitch','longtone'],hightone:['pitch','longtone'],cover:['longtone'],copy:['ddr','memo'],formation:['memo','ddr'],camera:['photo'],skin:['photo'],mediatr:['interview'],engpro:['interview_en'],varprep:['camera'],musicshow:['ddr','camera'],fansign:['photo']};
function trainGame(id){return TRAIN[id]?pick(TRAIN[id]):null}
const FILLER_LOOK={'한유이':{hair:'bob',hc:'#5a3a2a',hh:'#9a7a6a',eye:'#7a4a2a'},'송다은':{hair:'wave',hc:'#2a2030',hh:'#6a5a7a',eye:'#5a3a6a'},'진세아':{hair:'pony',hc:'#8a5a3a',hh:'#c09a7a',eye:'#6a4a3a'}};
function teamLooks(){
 const w=lookFromWear(S.wear);const uni={top:w.top,bot:w.bot,shoe:w.shoe,acc:'none',mic:S.stage>=4};
 return teamNames().slice(1).map(nm=>{const ck=Object.keys(CAST).find(k=>CAST[k].name===nm);const L=ck?CAST[ck].look:FILLER_LOOK[nm]||FILLER_LOOK['한유이'];return {hair:L.hair,hc:L.hc,hh:L.hh,eye:L.eye,...uni,who:ck||null,tm:nm}});
}
function showTeam(on,anim){const t=$('#team');if(!on){t.innerHTML='';return}const L=teamLooks();t.innerHTML=L.map((l,i)=>`<div class="tm t${i} a-${anim}" style="animation-delay:${i*.08}s">${girl({...l,bust:true})}<small>${l.tm||''}</small></div>`).join('')}
const CONCERTS=[{f:250,name:'첫 팬미팅',venue:'블루스퀘어 홀',seats:1700,lv:1},{f:650,name:'첫 단독 콘서트',venue:'올림픽홀',seats:3000,lv:2},{f:1200,name:'체조경기장 콘서트',venue:'KSPO DOME',seats:15000,lv:3},{f:2000,name:'스타디움 콘서트',venue:'잠실 올림픽주경기장',seats:60000,lv:4}];
async function checkConcert(){
 if(S.stage<4) return;
 S.concerts=S.concerts||[];
 const cc=CONCERTS.find(x=>S.fame>=x.f&&!S.concerts.includes(x.name));
 if(!cc) return;
 S.concerts.push(cc.name);
 await cutscene('concert',{...cc,cap:`🎉 ${cc.name} 개최! 「${cc.venue}」 ${cc.seats.toLocaleString()}석 전석 매진!`});
 const i=await dialog({speaker:cc.venue,title:'🎤 앵콜 무대!',body:`관객들이 "${S.group}!"을 연호한다. 앵콜곡은?`,choices:[['데뷔곡을 다 같이 떼창으로','팬덤 ↑↑'],['멤버들과 장난스러운 커버 무대','예능감 ↑ · 대인관계 ↑'],['팬들을 위한 자작 발라드','인성 ↑ · 보컬 ↑']]});
 const eff=[{fame:30+cc.lv*20},{variety:4,social:4,fame:15},{mind:4,vocal:3,fame:15}][i];
 const r=apply(eff);effToast(r);
 await cutscene(pick(['sns','youtube','news']),{head:`${S.group}, ${cc.name} 성료… "${cc.seats.toLocaleString()}명의 떼창"`,body:'공연 직후 SNS 실시간 트렌드 1위.',title:`[4K] ${S.group} ${cc.name} 앵콜 직캠`,cap:'공연 후기가 쏟아진다!',cm:['울면서 봄…','떼창 소리 미쳤다','다음 콘서트 무조건 간다'],tag:'#'+cc.name.replace(/ /g,'')});
}
const REACT={
 musicshow:{t:'youtube',title:()=>`[페이스캠] ${S.group} ${S.name} 직캠 4K`,cm:['표정 연기 미쳤다','이 직캠만 100번 봄','엔딩요정 레전드']},
 variety:{t:'community',title:()=>`〈놀라운 주말〉 ${S.name} 예능감 실화냐ㅋㅋㅋ`,cm:['ㄹㅇ 웃겨서 숨 넘어감','예능 고정 가자','신인인데 리액션 장인']},
 fansign:{t:'sns',cap:'팬사인회 후기가 올라왔다!',cm:['눈 맞춰 줘서 심장 멈춤','이름 불러 줬어ㅠㅠ','최애 갱신']},
 content:{t:'youtube',title:()=>`[${S.group} LOG] 숙소 브이로그 EP.${Math.floor(Math.random()*20+3)}`,cm:['케미 맛집','멤버들 너무 귀엽다','다음 편 언제 나와요']},
 radio:{t:'news',head:()=>`${S.group} ${S.name}, 라디오 무반주 라이브로 실력 입증`,body:'청취자 게시판이 응원 글로 가득 찼다.'},
 magazine:{t:'news',head:()=>`[화보] ${S.name}, 청량과 시크를 오가는 반전 매력`,body:'매거진 측 "역대급 결과물"'},
 cf:{t:'community',title:()=>`${S.name} 광고 보고 그 음료 품절됨ㅋㅋ`,cm:['편의점 3곳 돌았다','광고 장인','이 조합 미쳤다']},
 vlive:{t:'sns',cap:'라이브 방송 캡처가 퍼지고 있다!',cm:['잠옷 라이브 최고','목소리 힐링','매일 와 줘요']},
 ustour:{t:'news',head:()=>`${S.group}, 북미 투어 전석 매진… "K-팝 새 역사"`,body:'현지 매체들도 앞다퉈 보도했다.'},
 usshow:{t:'youtube',title:()=>`${S.group} on The Jimmy Show — Full Interview`,cm:['Her English is so good!','Instant stan','KING-sized talent']},
 usradio:{t:'community',title:()=>`미국 라디오에서 ${S.group} 노래 나옴ㅠㅠ 실화?`,cm:['국뽕 차오른다','현지 반응 미쳤음','빌보드 가자']},
 usfan:{t:'sns',cap:'미국 팬 이벤트 영상이 트렌드에!',cm:['They sang in Korean!!','Best fan event ever','LA loves you']},
 comebackprep:{t:'community',title:()=>`${S.group} 컴백 안무 연습 영상 유출(?) 각 미쳤음`,cm:['칼군무 실화','기대된다','티저 언제']},
};
async function reaction(id){const r=REACT[id];if(!r)return;const o={cap:r.cap||'반응이 뜨겁다!',cm:r.cm,title:r.title&&r.title(),head:r.head&&r.head(),body:r.body,views:Math.floor(rnd(30,900))*1000+Math.floor(rnd(0,999))};await cutscene(r.t,o)}
const CONCEPT_SONG={pure:'첫눈의 약속',charisma:'NO LIMIT',bright:'하이틴 다이어리'};
const CHECK=[
 {score:mg=>S.vocal*.4+S.dance*.4+effVis()*.1+S.mind*.1+mg*.12, th:()=>38},
 {score:mg=>Math.max(...AGENCIES.map(a=>agScore(a,mg)/a.th))*100, th:()=>100},
 {score:mg=>(S.vocal+S.dance)*.3+effVis()*.15+S.mind*.1+S.social*.1+S.diet*.05+mg*.1, th:()=>S.agency==='noir'?98:92},
 {score:mg=>(S.vocal+S.dance+effVis())/3*.7+(S.interview+S.variety)/2*.1+S.mind*.1+S.social*.1+mg*.12+coordi()[S.concept||topStyle()]*3, th:()=>98},
 {score:mg=>S.fame*.5+perf()*.8+mg*.15, th:()=>290},
 {score:mg=>S.fame*.4+perf()*.8+S.interview*.2+S.mind*.2+mg*.1, th:()=>430},
 {score:mg=>S.english*.4+S.fame*.12+perf()*.4+GEAR.comp.list[S.comp].v*100+mg*.1, th:()=>270},
 {score:mg=>S.english*.3+S.fame*.12+perf()*.45+S.interview*.2+mg*.12, th:()=>340},
];

/* ============ 그림 ============ */
function playerLook(o={}){const w=S?{...lookFromWear(S.wear),wear:S.wear}:{top:WARDROBE.top[0].v,bot:WARDROBE.bot[0].v,shoe:'#fff',acc:'ribbon'};return {hair:'long',hc:'#2b2030',hh:'#6a5578',eye:'#8a4f7a',...w,mic:S&&S.stage>=4&&S.stage<=5,crown:S&&S.stage>=7,...o}}
function moodExpr(){return S.stress<40?'smile':S.stress<70?'normal':'tired'}
function bldOf(actId){for(const k in BACTS)if(BACTS[k].includes(actId))return k;return 'F'}
function moodInfo(){
 const s=S.stress;
 if(s<40) return {m:'행복',c:'#58c858',d:'기분이 좋고 의욕이 넘칩니다.',g:'지금처럼 훈련 강도를 유지해도 좋아요!'};
 if(s<60) return {m:'보통',c:'#a0a0e0',d:'평소와 같은 컨디션입니다.',g:'중간중간 동기들과 시간을 보내게 해 주세요.'};
 if(s<80) return {m:'지침',c:'#f0b030',d:'피곤이 쌓여 연습 효율이 떨어지고 있어요.',g:'휴식이나 가족과의 시간을 넣어 주세요.'};
 return {m:'위험',c:'#e84848',d:'한계에 가깝습니다. 연습 효과가 절반으로 줄어요.',g:'당장 쉬게 하지 않으면 쓰러질 수 있어요!'};
}
let ACT_OUT=null;
function drawChar(expr,outfit){if(outfit!==undefined)ACT_OUT=outfit;else if(!$('#scene').classList.contains('acting'))ACT_OUT=null;$('#char').innerHTML=girl(playerLook({expr:expr||moodExpr(),outfit:ACT_OUT}))}
function timelineHTML(){
 const total=(S.mi||0)+S.monthsLeft;let cells='';let next=null;
 for(let m=1;m<=total;m++){let ic='',tt='';
  const k=`${S.stage}_${m}`;
  if(m===total){ic='🔥';tt=DDAY[S.stage][0]}
  else if(EPI[k]&&!S.done[k]){ic=/컴백|타이틀/.test(EPI[k].title)?'🎵':'💬';tt=EPI[k].title}
  else if(S.stage===2&&(total-m)%2===0){ic='📋';tt='월말평가'}
  const cur=m===(S.mi||0)+1;
  if(ic&&m>(S.mi||0)&&!next) next={m:m-(S.mi||0),tt,ic};
  cells+=`<div class="tl ${m<=(S.mi||0)?'past':''} ${cur?'now':''}" title="${tt}"><i>${ic||'·'}</i><small>${m}월차</small></div>`}
 const cc=S.stage>=4?CONCERTS.find(x=>!(S.concerts||[]).includes(x.name)):null;
 return `<div class="tline">${cells}</div><div class="tnext">${next?`다음 이벤트: ${next.ic} 「${next.tt}」 ${next.m===1?'<b>이번 달 끝!</b>':`<b>${next.m}개월 후</b>`}`:''}${cc?` · 🎤 ${cc.name}까지 팬덤 <b>${Math.max(0,cc.f-S.fame)}</b>`:''}</div>`;
}
function hpBar(v,max,cls=''){const p=clamp(v/max*100,0,100);const c=cls||(p>50?'#58d058':p>20?'#f8c030':'#f05050');return `<span class="hp"><i style="width:${p}%;background:${c}"></i></span>`}
function render(){
 if(!S) return;
 $('#hName').textContent=S.name+(S.group?` · ${S.group}`:'');
 $('#hStage').textContent=STAGES[S.stage].name+(S.position?` · ${S.position}`:'');
 $('#hDate').textContent=`${S.year}년 ${S.month}월 · ${S.age}세`;
 $('#hMoney').textContent=`${S.money.toLocaleString()} G`;
 if(!$('#scene').classList.contains('acting')){$('#bg').innerHTML=sceneBG('F');drawChar(undefined,null)}
 $('#dayTag').textContent=S.stage>=4?`데뷔 D+${S.day-(S.debutDay||S.day)+1}`:`연습생 D+${S.day}`;
 const mi=moodInfo(); $('#moodTag').innerHTML=`<b style="color:${mi.c}">●</b> ${mi.m}`;
 $('#placeTag').textContent='📍 '+(STAGES[S.stage].place||(agObj()?agObj().name:''));
 ensureMonth();
 const st=STAGES[S.stage], ck=CHECK[S.stage];
 const ratio=clamp(ck.score(55)/ck.th(),0,1.3);
 $('#goal').classList.toggle('urgent',S.monthsLeft<=1);
 $('#goal').innerHTML=(S.monthsLeft<=1?`<div class="urg">🔥 D-DAY 임박! 이번 달이 끝나면 ${DDAY[S.stage][0]}</div>`:'')+(S.mm&&S.mm.mission?`<div class="gm">🎯 미션: ${S.mm.mission.t} (+${S.mm.mission.reward}G)</div>`:'')+timelineHTML()+`<div class="gt"><span>🎯 ${st.goal}</span><b>D-${S.monthsLeft}개월</b></div><div class="gl"><span>합격 예상</span>${hpBar(ratio*100,100,ratio>=1?'#58d058':ratio>=.8?'#f8c030':'#f05050')}<b>${Math.round(ratio*100)}%</b></div><div class="gh">${st.hint}${S.retry?' · ⚠️ 마지막 기회':''}</div>`;
 const keys=['vocal','dance','visual','mind','body','diet','social','english','interview','variety'];
 let h=keys.map(k=>`<div class="st"><span>${LBL[k]}</span><span class="bar"><i style="width:${statVal(k)/2}%;background:${COLOR[k]}"></i></span><b><em class="gr g${gradeOfStat(statVal(k))}">${gradeOfStat(statVal(k))}</em>${statVal(k)}</b></div>`).join('');
 h+=`<div class="st wide"><span>스트레스</span>${hpBar(100-S.stress,100)}<b>${S.stress}</b></div>`;
 if(S.stage>=4) h+=`<div class="st wide"><span>팬덤</span><span class="bar"><i style="width:${Math.min(100,S.fame/25)}%;background:linear-gradient(90deg,#ff7eb6,#a070e0)"></i></span><b>${S.fame}</b></div>`;
 $('#stats').innerHTML=h;
}

/* ============ 다이얼로그 (포켓몬 박스) ============ */
let lastInput='';
function dialog({title,body,choices=['확인'],speaker,chips,input,html}){
 return new Promise(res=>{
  const box=$('#dbox');
  box.innerHTML=(speaker?`<div class="sp">${speaker}</div>`:'')+(title?`<h3>${title}</h3>`:'')+(body?`<p>${body}</p>`:'')+(html||'')+
   (chips?`<div class="chips">${chips}</div>`:'')+(input!==undefined?`<input id="dIn" maxlength="10" value="${input}">`:'')+
   `<div class="dbtns">${choices.map((c,i)=>{const [a,b]=Array.isArray(c)?c:[c];return `<button data-i="${i}">▶ ${a}${b?`<small>${b}</small>`:''}</button>`}).join('')}</div>`;
  $('#dlg').classList.add('show');SFX.ok();
  box.querySelectorAll('.dbtns button').forEach(b=>b.onclick=()=>{SFX.sel();if(input!==undefined)lastInput=($('#dIn').value||'').trim();$('#dlg').classList.remove('show');res(+b.dataset.i)});
 });
}
function deltaChips(d){return Object.entries(d).filter(([k,v])=>v).map(([k,v])=>{const good=k==='stress'?v<0:v>0;return `<span class="chip ${good?'up':'dn'}">${LBL[k]} ${v>0?'+':''}${v}</span>`}).join('')}
function apply(d){
 const out={};
 for(const [k,v0] of Object.entries(d||{})){
  const v=Math.round(v0); if(!v) continue;
  const before=S[k];
  if(k==='stress') S[k]=clamp(S[k]+v,0,100);
  else if(k==='money'||k==='fame') S[k]=Math.max(0,S[k]+v);
  else S[k]=clamp(S[k]+v,0,200);
  out[k]=S[k]-before;
 }
 if(out.money>0) coins(out.money);
 return out;
}

/* ============ 시간 연출 ============ */
async function timeBanner(big,small,ms=1600){
 const tb=$('#tb'); tb.querySelector('.b').textContent=big; tb.querySelector('.s').textContent=small||'';
 tb.classList.remove('go'); void tb.offsetWidth; tb.classList.add('go'); SFX.blip(); await sleep(ms);
}
const SEASON=m=>m>=3&&m<=5?'🌸 봄':m>=6&&m<=8?'☀️ 여름':m>=9&&m<=11?'🍂 가을':'❄️ 겨울';
const ORD=['첫째','둘째','셋째'];

/* ============ 스케줄 (목록식 보조) ============ */
const costOf=a=>(a.c||0)+(S.stage===0?(a.c0||0):0);
function effText(a){return Object.entries(a.eff).map(([k,v])=>`${LBL[k]}${v>0?'▲':'▼'}`).join(' ')}
function openList(){
 const used=S.slots.reduce((s,id)=>s+(id?costOf(ACTS.find(a=>a.id===id)):0),0);
 const left=S.money-used;
 const avail=ACTS.filter(a=>S.stage>=a.s[0]&&S.stage<=a.s[1]);
 $('#sheet').innerHTML=`<h2>📋 목록에서 고르기 <button class="x" onclick="closeSheet()">✕</button></h2><div style="font-size:12px;color:#6a5a7a;margin-bottom:6px">남은 자금 ${left}G · 고르면 맵의 일정 칸에 들어가요</div>
  <div class="acts">${avail.map(a=>{const cost=costOf(a);return `<button class="act" ${cost>left||!S.slots.includes(null)||S.slots.filter(x=>x===a.id).length>=2?'disabled':''} onclick="listPick('${a.id}')"><b>${a.name}${a.npc?' 💬':''}</b><span class="e">${effText(a)}</span>${cost?`<span class="c">💰 ${cost}G</span>`:''}<span class="c">📍 ${BLABEL[bldOf(a.id)](S.stage)}</span></button>`}).join('')}</div>`;
 $('#sheetOv').classList.add('show');
}
function listPick(id){const i=S.slots.indexOf(null);if(i<0)return;S.slots[i]=id;SFX.sel();renderSlots();closeSheet();if(!S.slots.includes(null))setTimeout(askStart,300)}
function closeSheet(){$('#sheetOv').classList.remove('show')}

/* ============ 한 달 진행 ============ */
function doAct(a,mult=1){
 let m=(1+S.stage*.08)*mult;
 if(S.stress>=80) m*=.5; else if(S.stress>=60) m*=.78;
 const d={}; const cost=costOf(a); if(cost) d.money=-cost;
 for(const [k,v] of Object.entries(a.eff)){
  let x=v;
  if(k==='fame') x=v*(a.vc&&S.skills.includes('react')?1.2:1)*(1+S.stage*.08)*mult*rnd(.8,1.2)*(1+GEAR.comp.list[S.comp].v)*(.55+perf()/220);
  else if(k==='money') x=v*(1+S.stage*.1)*(mult>1?1.2:1);
  else if(k==='stress') x=v>0?v*rnd(.8,1.2)*(S.skills.includes('mental')?.8:1):v;
  else if(v>0){x=v*m*rnd(.8,1.2); if(k==='dance'&&S.body<S.dance*.45)x*=.7; if(k==='vocal'&&S.body<S.vocal*.35)x*=.8;}
  x=Math.round(x); if(!x&&v) x=v>0?1:-1;
  d[k]=(d[k]||0)+x;
 }
 if(a.vc) S.varietyCount++;
 return apply(d);
}
function setProps(list){$('#props').innerHTML=(list||[]).map((p,i)=>`<b style="left:${[12,76,40][i%3]}%;top:${[18,24,8][i%3]}%;animation-delay:${i*.3}s">${p}</b>`).join('')}
async function runMonth(){
 if(busy) return; busy=true; closeSheet(); closeMap();
 document.body.classList.add('running');
 const startDays=[1,11,21];
 await timeBanner(`${S.month}월`,`${S.year}년 · ${SEASON(S.month)}`,1500);
 const sc=$('#scene'),sc0=sc;
 let reacted=false;ensureMonth();const trainIdx=S.slots.findIndex(id=>TRAIN[id]);
 if(S.monthsLeft===1) await timeBanner('⚠️ D-DAY 직전',`다음 달: ${['스톤웨이브 오디션','대형 기획사 오디션','데뷔조 최종 평가','데뷔 쇼케이스','1위 결정전','연말 시상식','미국 데뷔','헤드라이너 무대'][S.stage]}`,1700);
 for(let i=0;i<3;i++){
  const a=ACTS.find(x=>x.id===S.slots[i]);
  await timeBanner(`${S.month}월 ${startDays[i]}일`,`${ORD[i]} 열흘 · ${a.name}`,1300);
  sc.classList.add('acting');setProps(a.prop);
  const bk=bldOf(a.id);
  $('#bg').innerHTML=sceneBG(bk);$('#char').className='a-'+a.anim;drawChar(a.anim==='rest'?'happy':'smile',actOutfit(bk));showTeam(a.team&&S.stage>=3,a.anim);
  if(a.anim==='sing') addNotes();
  $('#actTag').style.display='block';
  const d0=S.day;
  for(let t=0;t<10;t+=2){S.day=d0+t;$('#actTag').textContent=`${a.name} · D+${S.stage>=4?S.day-(S.debutDay||S.day)+1:S.day}`;await sleep(90)}
  S.day=d0+10;
  await pkText([pick(a.fl)]);
  let mult=1,tag='';
  const hot=S.mm&&S.mm.hot.includes(bldOf(a.id));if(hot){mult*=1.5;floatText('⭐ 핫스팟 1.5배!','#ffd36e')}
  const tg=!FAST&&S.flags.train!==false&&i===trainIdx?trainGame(a.id):null;
  if(a.quiz){const n=await quizMini(3);mult*=.6+n*.35;tag=n===3?'퀴즈 만점!':`퀴즈 ${n}/3`}
  else if(tg){await pkText(['🎯 집중 훈련! 실기 결과에 따라 효과가 달라져요.']);const sc=await runTests([tg],'집중 훈련');const m2=.6+sc/100*1.1;mult*=m2;tag=sc>=85?'🎯 훈련 대성공!':sc>=55?'🎯 훈련 성공':'🎯 훈련 아쉬움';if(sc>=85){flash('#ffd36e');shake(sc0)}}
  else if(a.anim!=='rest'&&Math.random()<.28){const n=await qte(a.name);mult*=1+Math.min(n,22)/28;tag=n>=16?'불꽃 집중!':n>=8?'집중 성공!':'';if(n>=16){flash('#ffd36e');shake(sc0)}}
  const roll=Math.random();
  if(a.anim!=='rest'&&roll<(S.stress<60?.12:.05)){mult*=1.5;tag='✨ 대성공! ✨';flash('#fff');shake(sc0,true);burst(sc0,['⭐','✨','💯'],18);if($('#char').innerHTML)drawChar('happy')}
  else if(a.anim!=='rest'&&roll>(S.stress>=60?.82:.93)){mult*=.6;tag='앗, 실수…';SFX.miss();shake(sc0);if($('#char').innerHTML)drawChar('sad')}
  const before={...S};const r=doAct(a,mult);
  await statBox(before,r,tag||a.name);
  render();await checkSkills();
  if(REACT[a.id]&&!reacted&&Math.random()<.45){reacted=true;await reaction(a.id)}
 }
 sc.classList.remove('acting');setProps([]);showTeam(false);$('#actTag').style.display='none';$('#char').className='';render();
 S.mm.lastSlots=S.slots.slice();
 if(missionDone()){const m=S.mm.mission;await cutscene('chat',{from:'이번 달 미션',msgs:[['',`🎯 ${m.t}`],['','✅ 미션 달성!'],['',`보상: ${m.reward}G + 스트레스 -5`]],cap:''});apply({money:m.reward,stress:-5})}
 S.slots=[null,null,null];
 const inc=S.stage<=3?ALLOW[S.stage]:SETTLE[S.stage];
 if(inc){apply({money:inc});toast(S.stage<=3?`💰 이번 달 용돈 +${inc}G`:`💰 이번 달 정산금 +${inc}G`)}
 S.month++; if(S.month>12){S.month=1;S.year++;} if(S.month===3) S.age++;
 S.monthsLeft--; S.mi++;
 render();
 await checkConcert();
 if(S.stage>=4&&S.fame>=S.fameMark+300){S.fameMark=S.fame;await cutscene('fans',{cap:`팬덤이 쑥쑥 자라고 있다!\n응원봉 물결 속에서 "${S.group}!" 함성이 울린다. (팬덤 ${S.fame})`})}
 const over=await afterMonth();
 document.body.classList.remove('running');
 busy=false;
 if(!over){save();render()}
}
function addNotes(){const sc=$('#scene');for(let i=0;i<4;i++){const n=document.createElement('div');n.className='notes';n.textContent=pick(['♪','♫','♬']);n.style.left=(25+Math.random()*50)+'%';n.style.top='30%';n.style.animationDelay=(i*.3)+'s';n.style.color=pick(['#ff7eb6','#ffd36e','#9ed2ff']);sc.appendChild(n);setTimeout(()=>n.remove(),2600)}}
async function afterMonth(){
 if(S.stress>=100){
  S.burnout++; S.stress=55; S.body=Math.max(0,S.body-8);
  if(S.burnout>=3){await ending('e_burnout');return true;}
  shake(null,true);SFX.miss();
  await dialog({speaker:'매니저',title:'연습 중 쓰러졌다…',body:`무리한 스케줄로 연습실 바닥에 주저앉았다. 병원에서 링거를 맞고 돌아왔다.\n\n⚠️ 번아웃 경고 ${S.burnout}/3 — 세 번이면 활동이 중단됩니다.`});
 }
 let eps=0;
 const story=storyFor();
 if(story){await playEp(story);eps++; if(S.ended) return true;}
 const pool=randomPool();
 if(pool.length&&Math.random()<(eps?.4:.8)){await playEp(pick(pool));eps++; if(S.ended) return true;}
 if(eps<2&&Math.random()<.35){const ev=eventPool(); if(ev.length){await playEp(pick(ev)); if(S.ended) return true;}}
 if(S.stage===2 && S.monthsLeft>0 && S.monthsLeft%2===0) await monthlyEval();
 if(S.monthsLeft<=0) return await stageCheck();
 return false;
}

/* ============ 단계 평가 ============ */
const judgeLine=()=>{const ks=['vocal','dance','visual','mind'];const lo=ks.reduce((a,b)=>statVal(a)<statVal(b)?a:b);const hi=ks.reduce((a,b)=>statVal(a)>statVal(b)?a:b);
 const good={vocal:'음색이 좋네요. 기억에 남아요.',dance:'춤선이 깔끔해요. 기본기가 있네.',visual:'카메라를 잘 받는 얼굴이에요.',mind:'태도가 정말 좋아요.'};
 const bad={vocal:'호흡이 흔들려요. 고음에서 소리가 얇아지고.',dance:'박자는 맞는데 디테일이 부족해요.',visual:'아직 카메라 앞에서 표정이 굳어 있어요.',mind:'실력보다 태도가 먼저예요.'};
 return `👍 ${good[hi]}\n👎 ${bad[lo]}`};
function failEnding(){switch(S.stage){case 0:return S.vocal>40&&S.vocal>=S.dance?'e_music':'e_student';case 1:return 'e_smallco';case 2:return effVis()>=Math.max(S.vocal,S.dance)*.75?'e_actor':'e_trainer';case 3:return 'e_survival';case 4:return 'e_disband';case 5:return 'e_midtier';case 6:return 'e_uspartial';default:return 'e_usgood'}}
function scoreLine(sc,th,mg,extra){return `\n\n📊 실기 ${mg}점${extra||''} · 총점 ${Math.round(sc)} / 합격선 ${Math.round(th)}`}
async function fail(msg){
 await cutscene('fail',{head:'이번엔… 아쉽게도',cap:''});
 if(!S.retry){S.retry=1;S.monthsLeft=3;await dialog({title:'불합격…',body:msg+'\n\n🔁 3개월 뒤 마지막 기회가 있다. 약점을 보완하자.'});save();render();return false;}
 await ending(failEnding()); return true;
}
async function nextStage(n,extra){
 if(n>0){await passCut(['','오디션 합격!','대형 기획사 합격!','데뷔조 확정!','데뷔 성공!','첫 1위!','시상식 수상!','Hot 100 진입!'][n]);await evolve(n);await giveBadge(n-1)}
 S.stage=n;S.retry=0;S.mi=0;S.monthsLeft=STAGES[n].months+(extra||0);S.slots=[null,null,null];
 if(n===3) apply({money:800});
 if(n===4){S.debutDay=S.day;apply({money:800})}
 MAP=null;render();
 await timeBanner(`STAGE ${n+1}`,STAGES[n].name,1800);
 const intro=STAGES[n].intro.replace('{ag}',agObj()?agObj().name:'').replace('{grp}',S.group||'');
 await dialog({speaker:`STAGE ${n+1}`,title:STAGES[n].name,body:intro});
 const k=`${n}_0`; if(EPI[k]&&!S.done[k]) await playEp(EPI[k]);
 save();render();
}
const DDAY=[['스톤웨이브 엔터 정기 오디션','스톤웨이브 엔터 4층'],['대형 기획사 공개 오디션','공개 오디션장'],['데뷔조 최종 평가','대표 평가실'],['데뷔 쇼케이스','블루스퀘어 홀'],['M카운트업 1위 결정전','M 방송국 공개홀'],['골든 레코드 어워즈','고척 스카이돔'],['미국 데뷔 주간','Los Angeles'],['코칠라 헤드라이너','코칠라 메인 스테이지']];
async function ddayIntro(n){
 render();
 await cutscene('dday',{head:DDAY[n][0],place:DDAY[n][1],day:[15,22,28,7,13,30,18,20][n],cap:`오늘은 결전의 날.\n${DDAY[n][0]}`});
 const msgs=[];
 if(S.aff.harin>=2) msgs.push(['','하린: 떨지 마! 붙든 떨어지든 떡볶이! 🔥']);
 if(S.aff.mikyung>=1&&n<=2) msgs.push(['','미경쌤: 연습한 만큼만 해. 그거면 돼.']);
 if(S.aff.rena>=2) msgs.push(['','레나: ファイト! 화이팅!!']);
 if(S.stage>=4&&S.fame>0) msgs.push(['','팬카페: 오늘 현장 응원 갑니다!! 💖']);
 msgs.push(['','엄마: 우리 딸 최고! 밥 꼭 먹고 가 ❤️']);
 msgs.push(['me','고마워요… 다녀올게요!']);
 await cutscene('chat',{from:'응원 메시지 '+(msgs.length-1)+'개',msgs,cap:''});
}
const SIG=[null,'t20','t21','t22','t23','t24','t25','t26'];
async function evolve(n){
 const o0=meOutfit({...S.wear});const before=playerLook({expr:'normal',outfit:o0});
 const it=WARDROBE.top.find(i=>i.id===SIG[n]);
 if(it&&!S.owned.includes(it.id))S.owned.push(it.id);
 if(it)S.wear.top=it.id;
 const prevStage=S.stage;S.stage=n;
 const cyc=['practice','daily','hoodie'];let o1=meOutfit(S.wear);if(o1===o0)o1=cyc[(cyc.indexOf(o0)+1)%3];const after=playerLook({expr:'happy',outfit:o1});
 S.stage=prevStage;
 await cutscene('evolve',{before,after,n,head:STAGES[n].name,item:it?it.name:'',cap:`✨ ${S.name}, 「${STAGES[n].name}」 단계로 성장! ✨${it?`\n🎁 기념 의상 [${it.name}] 획득! (비주얼 +${it.vis})`:''}`});
}
async function passCut(head){await cutscene('pass',{head,cap:''})}
async function giveBadge(i){if(!S.badges)S.badges=[];if(S.badges.some(b=>b.icon===BADGES[i][0]))return;S.badges.push({icon:BADGES[i][0],name:BADGES[i][1]});await cutscene('badge',{icon:BADGES[i][0],color:BADGES[i][2],head:`뱃지 획득! 「${BADGES[i][1]}」`,cap:`${S.badges.length} / 8 뱃지`})}
async function stageCheck(){
 const n=S.stage;
 await ddayIntro(n);
 if(n===0){
  await dialog({speaker:'스톤웨이브 엔터 정기 오디션',title:'오디션 당일',body:'번호표 47번. 심사위원 세 명이 무표정하게 앉아 있다.\n"자유곡 1절, 그리고 자유 안무 보여주세요."'});
  const mg=await runTests(['pitch','ddr'],'스톤웨이브 오디션');
  const sc=CHECK[0].score(mg),th=CHECK[0].th();
  if(sc>=th){await cutscene('chat',{from:'스톤웨이브 엔터',msgs:[['','[스톤웨이브 엔터] 안녕하세요, 오디션 결과 안내드립니다.'],['','최종 합격을 축하드립니다! 🎉 다음 주 월요일 회사로 방문해 주세요.'],['me','헉!!!!! 감사합니다!!!!']],cap:'합격 문자가 왔다!'});
   await dialog({speaker:'심사위원',title:'🎉 합격!',body:judgeLine()+scoreLine(sc,th,mg)});await nextStage(1);return false;}
  return await fail(`심사위원: ${judgeLine()}`+scoreLine(sc,th,mg));
 }
 if(n===1){
  const i=await dialog({title:'어느 회사 오디션을 볼까?',body:'대형 기획사 공개 오디션 시즌. 한 곳만 지원할 수 있다.\n(괄호 안은 지금 코디 기준 예상 적합도)',choices:AGENCIES.map(a=>[`${a.name} (${Math.round(agScore(a,55)/a.th*100)}%)`,`${a.tag} · 선호 코디: ${CONCEPT[a.pref]}`])});
  const ag=AGENCIES[i];
  await dialog({speaker:ag.name,title:'공개 오디션장',body:ag.desc+`\n\n지금 내 코디: ${coordiText()} (선호 코디 ${coordi()[ag.pref]}개 일치 → +${coordi()[ag.pref]*2})`});
  let bonus=0;
  if(S.aff.mikyung>=3){bonus=6;await playEp({title:'심사위원석',place:ag.name+' 오디션장',script:[['','심사위원석 맨 끝자리에 익숙한 얼굴이 있었다. 윤미경 쌤.'],['mikyung','(눈이 마주치자 아주 살짝 고개를 끄덕인다)','smile'],['','💗 긴장이 조금 풀렸다. (미경쌤과의 인연 보너스 +6)']]});}
  const mg=await runTests(ag.games,ag.name+' 오디션');
  const sc=agScore(ag,mg)+bonus;
  if(sc>=ag.th){S.agency=ag.id;await cutscene('news',{head:`${ag.name}, 올해 공개 오디션 최종 합격자 발표`,body:`경쟁률 3,200 : 1. 합격자 명단에 "${S.name}"이라는 이름이 있었다.`,cap:'대형 기획사 합격!'});
   await dialog({speaker:ag.name,title:'🎉 최종 합격!',body:judgeLine()+`\n\n"${ag.name} 연습생이 된 걸 환영해요."`+scoreLine(sc,ag.th,mg,` · 코디 +${coordi()[ag.pref]*2}`)});await nextStage(2);return false;}
  return await fail(`${ag.name} 심사위원: ${judgeLine()}`+scoreLine(sc,ag.th,mg));
 }
 if(n===2){
  await dialog({speaker:agObj().name,title:'최종 데뷔조 선발 평가',body:'연습생 30명 중 단 5명. 대표 프로듀서와 전 임원이 지켜보는 최종 평가.'});
  const mg=await runTests(['ddr','pitch','camera'],'데뷔조 최종 평가');
  const sc=CHECK[2].score(mg),th=CHECK[2].th();
  if(sc>=th){const delay=S.agency==='noir'?2:0;
   await cutscene('rank',{rank:clamp(Math.round(6-(sc-th)/4),1,5),cap:'데뷔조 최종 5인 안에 들었다!'});
   await dialog({speaker:'대표 프로듀서',title:'🎉 데뷔조 확정!',body:judgeLine()+`\n\n"너 데뷔조야. 이제부터가 진짜 시작이다."${delay?'\n\n(YJ답게… 데뷔 일정이 2개월 밀렸다.)':''}`+scoreLine(sc,th,mg)});
   await nextStage(3,delay);return false;}
  return await fail(`대표 프로듀서: ${judgeLine()}`+scoreLine(sc,th,mg));
 }
 if(n===3){
  if(!S.group){await dialog({title:'그룹명 결정',body:'드디어 데뷔 쇼케이스! 우리 그룹의 이름은?',input:'VELVA',choices:['이 이름으로 데뷔!']});S.group=lastInput||'VELVA';}
  if(!S.concept) S.concept=topStyle();
  const cands=[['메인보컬',S.vocal],['메인댄서',S.dance],['센터·비주얼',effVis()],['분위기 메이커',S.variety*1.3]];
  let pos=cands.reduce((a,b)=>a[1]>=b[1]?a:b)[0]; if(S.flags.leader) pos='리더 · '+pos; S.position=pos;
  await cutscene('stage',{head:`${S.group} — "${CONCEPT_SONG[S.concept]}"`,cap:`데뷔 쇼케이스! 콘셉트: ${CONCEPT[S.concept]}\n멤버: ${teamNames().join(' · ')}\n${S.name} — ${S.position}`});
  const cb=coordi()[S.concept]*3, lb=S.aff.leo>=3?5:0;
  const mg=await runTests(['pitch','interview'],'데뷔 쇼케이스');
  const sc=CHECK[3].score(mg)+lb,th=CHECK[3].th();
  if(sc>=th){await cutscene('news',{head:`"${S.group}, 괴물 신인의 탄생" — 데뷔곡 "${CONCEPT_SONG[S.concept]}"`,body:`${S.position} ${S.name}의 라이브가 화제. 쇼케이스 영상 조회수 하루 만에 300만.${lb?' 레오 안무가의 데뷔 안무도 화제.':''}`,cap:'데뷔 성공!'});
   await dialog({title:'🎉 데뷔!',body:`"${CONCEPT_SONG[S.concept]}"로 데뷔했다!`+scoreLine(sc,th,mg,` · 콘셉트 코디 +${cb}${lb?' · 레오쌤 +5':''}`)});await nextStage(4);return false;}
  return await fail('회사: "아직 완성도가 부족하다. 데뷔를 연기한다."'+scoreLine(sc,th,mg,` · 콘셉트 코디 +${cb}`));
 }
 if(n===4){
  await dialog({speaker:'음악방송 M카운트업',title:'1위 후보!',body:`이번 주 1위 후보: ${S.group} vs ÉCLAT(에끌라)\n점수: 음원 + 음반 + 팬 투표 + 방송 점수.`});
  const mg=await runTests(['ddr','camera'],'생방송 무대');
  const sc=CHECK[4].score(mg),th=CHECK[4].th();
  if(sc>=th){await cutscene('chart',{song:CONCEPT_SONG[S.concept||'pure'],from:64,to:1,cap:'음원 차트 1위!'});await cutscene('trophy',{head:'M카운트업 1위',cap:`"이번 주 1위는… ${S.group}!"\n멤버들이 서로 부둥켜안았다. 앵콜 무대는 눈물 때문에 반밖에 못 불렀다.${S.aff.jiyu>=3?'\n무대 옆에서 지유가 작게 박수를 치고 있었다.':''}`});
   await dialog({title:'🏆 데뷔 첫 1위!',body:'첫 1위의 순간.'+scoreLine(sc,th,mg)});await nextStage(5);return false;}
  return await fail('ÉCLAT에 밀려 2위. 점수 차는 1,200점이었다.\n"다음 컴백 때 다시 도전하자."'+scoreLine(sc,th,mg));
 }
 if(n===5){
  await dialog({speaker:'골든 레코드 어워즈',title:'연말 시상식',body:'레드카펫을 지나 아티스트석에 앉았다. 맞은편에 EIVE 선배들이 손을 흔든다.'});
  const mg=await runTests(['ddr','interview'],'시상식 무대 & 수상 소감');
  const sc=CHECK[5].score(mg),th=CHECK[5].th();
  if(sc>=th){
   const daesang=sc>=th*1.18;
   await cutscene('trophy',{head:daesang?'대상 — 올해의 아티스트':'본상 수상',cap:`"${S.group}!"\n"연습실 거울 앞에서 매일 상상했던 순간이에요. 미경쌤, 레오쌤, 보고 계세요?"`});
   if(S.flags.varietyRoute||(!S.flags.usRoute&&S.varietyCount>=6&&S.variety>=S.english)){await ending('e_variety');return true;}
   if(S.english>=(S.flags.usRoute?45:55)){await dialog({speaker:'정우진 매니저',title:'미국 대형 레이블의 러브콜',body:`무대와 외국어에 집중한 덕분에, 미국 레이블이 ${S.group}에게 손을 내밀었다.`});await nextStage(6);return false;}
   await ending('e_korea');return true;
  }
  return await fail('본상 후보에 올랐지만 이름은 불리지 않았다.'+scoreLine(sc,th,mg));
 }
 if(n===6){
  await dialog({speaker:'LA',title:'영어 싱글 발매 주',body:'미국 라디오, 스트리밍, 토크쇼. 모든 게 첫 경험이다.'});
  const mg=await runTests(['interview_en','pitch'],'미국 데뷔 프로모션');
  const sc=CHECK[6].score(mg),th=CHECK[6].th();
  if(sc>=th){const rk=clamp(Math.round(100-(sc-th)*1.2),12,96);await cutscene('chart',{song:'Dreamer (English ver.)',from:100,to:Math.min(9,Math.ceil(rk/10)),cap:`Hot 100 ${rk}위 진입!\n한국 팬들이 새벽에 단체로 환호했다.`});await nextStage(7);return false;}
  return await fail('차트 진입 실패. "현지 프로모션이 더 필요해."'+scoreLine(sc,th,mg));
 }
 if(n===7){
  await dialog({speaker:'코칠라 페스티벌',title:'헤드라이너 무대',body:'해가 지는 사막, 수만 명의 관객. 무대 뒤에서 멤버들과 손을 맞잡았다.'});
  const mg=await runTests(['ddr','pitch'],'페스티벌 헤드라이너');
  const sc=CHECK[7].score(mg);
  if(sc>=CHECK[7].th()){await giveBadge(7)}
  if(sc>=CHECK[7].th()) await cutscene('fans',{banner:'WE LOVE '+S.group,cap:'수만 명의 떼창. 사막의 밤하늘에 응원봉이 별처럼 빛났다.'});
  await ending(sc>=CHECK[7].th()?'e_world':'e_usgood'); return true;
 }
 return false;
}
async function monthlyEval(){
 const g=pick(['ddr','pitch','camera','quiz','tap']);
 await dialog({speaker:`${agObj().name} · 월말평가`,title:'월말평가',body:`이번 달 평가 종목: ${GAMES[g].name}`});
 const mg=await runTests([g],'월말평가');
 const sc=CHECK[2].score(mg);
 const rank=clamp(Math.round(30-(sc-45)/2.4),1,30); const prev=S.evalRank; S.evalRank=rank;
 await cutscene('rank',{rank,cap:`연습생 30명 중 ${rank}위 ${prev?(prev>rank?`▲${prev-rank}`:prev<rank?`▼${rank-prev}`:'-'):''}\n대표 프로듀서: ${rank<=5?'"이대로면 데뷔조 가능성 충분해."':rank<=12?'"나쁘지 않아. 하지만 데뷔조는 상위 5명이야."':'"이 순위면 다음 평가가 위험해."'}`});
}

/* ============ 엔딩 ============ */
async function ending(id){
 S.ended=true; closeMap();
 const e=ENDINGS[id]; const gal=store.get('ggm_gallery')||{}; gal[id]=1; store.set('ggm_gallery',gal); store.del('ggm3_save');
 let extra='';
 if(S.concept) extra+=`\n\n🎵 데뷔 콘셉트: ${CONCEPT[S.concept]} — "${CONCEPT_SONG[S.concept]}"`;
 if(S.flags.harinTeam) extra+='\n💗 곁에는 아카데미 첫날 옆자리였던 하린이 있었다.';
 if(S.flags.chaewonTeam) extra+='\n💗 채원의 자작곡은 앨범 수록곡이 되었다.';
 if(S.flags.jiyuFriend) extra+='\n💗 라이벌 지유와는 이제 떡볶이 친구다.';
 if(S.aff.granny>=3) extra+='\n💗 언덕길 할머니는 오늘도 TV 앞에서 손뼉을 치신다.';
 e.g==='BAD'?SFX.miss():SFX.fan();
 $('#endCard').innerHTML=`<div class="grd">ENDING · ${e.g}</div><h1>${e.t}</h1>
  <div class="endchar">${girl(playerLook({expr:e.g==='BAD'?'sad':'happy'}))}</div>
  <div style="font-size:13px;color:#7a5070;text-align:center">${S.name}${S.group?` · ${S.group}`:''}${S.position?` · ${S.position}`:''} · ${S.age}세</div>
  <p>${e.d}${extra}</p>
  <div class="chips" style="justify-content:center">${['vocal','dance','visual','mind','english','variety'].map(k=>`<span class="chip">${LBL[k]} ${statVal(k)}</span>`).join('')}${S.fame?`<span class="chip up">팬덤 ${S.fame}</span>`:''}</div>
  <div style="font-size:12px;color:#7a5070;text-align:center">수집한 엔딩 ${Object.keys(gal).length} / ${Object.keys(ENDINGS).length}</div>
  <button class="tbtn pk" style="width:100%" onclick="location.reload()">처음부터 다시 하기</button>`;
 $('#end').classList.add('show');
}

/* ============ 상태 / 인물 / 도감 ============ */
let stTab='me';
function hearts(v){const n=clamp(Math.round(v),-2,6);return n<0?'💔'.repeat(-n):'♥'.repeat(n)+'<span style="color:#c8c0d8">'+'♡'.repeat(6-n)+'</span>'}
function relText(k){
 const a=S.aff[k];
 const map={harin:S.flags.harinTeam?'같은 팀 멤버':S.flags.harinOther?'다른 회사 친구':'',chaewon:S.flags.chaewonTeam?'같은 팀 메인보컬':S.flags.chaewonQuit?'연락이 끊겼다':'',jiyu:S.flags.jiyuFriend?'라이벌이자 친구':S.stage>=4?'ÉCLAT 센터 · 라이벌':'',woojin:S.stage>=3?'우리 팀 매니저':'',granny:S.flags.grannyReveal?'고은성 PD의 어머니':''};
 return map[k]||(a>=4?'아주 친함':a>=2?'친해지는 중':a<0?'서먹함':'아는 사이');
}
function openStatus(tab){
 if(busy||!S) return; if(tab)stTab=tab; SFX.sel();
 const mi=moodInfo(), ag=agObj();
 let h=`<h2>📋 ${S.name}의 정보 <button class="x" onclick="closeSheet()">✕</button></h2><div class="tabs">${[['me','능력'],['pro','프로필'],['ppl','인물']].map(([k,l])=>`<button class="${stTab===k?'on':''}" onclick="openStatus('${k}')">${l}</button>`).join('')}</div>`;
 if(stTab==='ppl'){
  const met=MAINCAST.filter(k=>S.met[k]);
  h+=met.length?met.map(k=>`<div class="ppl"><div class="pf">${portrait(k)}</div><div><b>${CAST[k].name}</b> <span class="hr">${hearts(S.aff[k])}</span><small>${CAST[k].role}</small><small>👉 ${relText(k)}</small></div></div>`).join(''):'<p>아직 만난 사람이 없어요.</p>';
  h+=`<p class="tip">💡 대화 선택에 따라 호감도가 바뀌고, 호감도 높은 인물은 나중에 팀 동료가 되거나 결정적 순간에 도와줘요.</p>`;
 } else if(stTab==='pro'){
  const st=S.style,tot=Math.max(1,st.pure+st.charisma+st.bright);
  h+=`<div class="kv"><span>단계</span><span>${STAGES[S.stage].name}</span><span>소속</span><span>${ag?ag.name:S.stage>=1?'스톤웨이브 엔터':'K-아카데미 수강생'}</span>
   ${S.group?`<span>그룹</span><span>${S.group} · ${S.position||''}</span><span>멤버</span><span>${teamNames().join(', ')}</span>`:''}
   <span>코디</span><span>${coordiText()} (비주얼 +${wearVis()})</span>
   ${S.stage>=3?`<span>작곡가</span><span>${GEAR.comp.list[S.comp].name}</span>`:''}${S.stage>=4?`<span>무대 점수</span><span>${perf()}</span><span>예능 출연</span><span>${S.varietyCount}회</span>`:''}
   <span>유혹</span><span>${'⚠️'.repeat(S.tempt)||'없음'} (3회 시 엔딩)</span><span>번아웃</span><span>${'🔥'.repeat(S.burnout)||'없음'} (3회 시 엔딩)</span></div>
   <div class="cat">🏅 뱃지 ${(S.badges||[]).length}/8</div><div class="bdgs">${BADGES.map(b=>{const has=(S.badges||[]).some(x=>x.icon===b[0]);return `<span class="${has?'':'no'}" style="background:${has?b[2]:'#ddd'}" title="${b[1]}">${has?b[0]:'?'}</span>`}).join('')}</div>
   <div class="cat">✨ 스킬 ${S.skills.length}/${SKILLS.length}</div>${SKILLS.map(sk=>`<div class="skl ${S.skills.includes(sk.id)?'':'no'}">${sk.icon} <b>${sk.name}</b> <small>${S.skills.includes(sk.id)?sk.d:`${LBL[sk.k]} ${sk.v} 달성 시 해금`}</small></div>`).join('')}
   <div class="cat">🎨 콘셉트 성향 ${S.concept?`(데뷔 콘셉트: ${CONCEPT[S.concept]})`:''}</div>
   ${['pure','charisma','bright'].map(k=>`<div class="st wide"><span>${CONCEPT[k]}</span><span class="bar"><i style="width:${st[k]/tot*100}%;background:${{pure:'#9ad7ff',charisma:'#3a3a4a',bright:'#ffd36e'}[k]}"></i></span><b>${st[k]}</b></div>`).join('')}
   <p class="tip">대화의 선택지가 성향을 만들고, 성향이 데뷔 콘셉트와 곡을 정해요. 콘셉트에 맞는 코디를 입으면 쇼케이스 보너스!</p>`;
  if(S.stage===1) h+=`<div class="cat">대형 기획사 오디션 정보</div>`+AGENCIES.map(a=>`<div class="item"><div class="ic">🏢</div><div><b>${a.name}</b>${a.tag}<br><small>실기: ${a.games.map(g=>GAMES[g].name).join(' + ')} · 선호 코디: ${CONCEPT[a.pref]}</small></div><button disabled>${Math.round(agScore(a,55)/a.th*100)}%</button></div>`).join('');
 } else {
  h+=`<div class="mcard"><div class="mcp">${portrait('me',moodExpr())}</div><div><div class="lbl">현재 상태</div><div class="mood" style="background:${mi.c}">${mi.m}</div><div style="font-size:12.5px">${mi.d}</div><div class="lbl" style="margin-top:6px">지도 방법</div><div style="font-size:12.5px">${mi.g}</div></div></div>
  ${['vocal','dance','visual','mind','body','diet','social','english','interview','variety'].map(k=>`<div class="st wide"><span>${LBL[k]}</span><span class="bar"><i style="width:${statVal(k)/2}%;background:${COLOR[k]}"></i></span><b>${statVal(k)}</b></div>`).join('')}
  <p class="tip">· 데뷔 후 예능을 많이 하면 한국에서 다른 엔딩이 열려요.<br>· 미국 진출은 시상식 수상 + 외국어 55 이상일 때 제안돼요.</p>`;
 }
 $('#sheet').innerHTML=h; $('#sheetOv').classList.add('show');
}
function openGallery(){
 SFX.sel();
 const gal=store.get('ggm_gallery')||{};
 $('#sheet').innerHTML=`<h2>🏆 엔딩 도감 ${Object.keys(gal).length}/${Object.keys(ENDINGS).length}<button class="x" onclick="closeSheet()">✕</button></h2>
 <div class="gal">${Object.entries(ENDINGS).map(([k,e])=>gal[k]?`<div><b>${e.t}</b>${e.g}</div>`:`<div class="lk"><b>???</b>미발견</div>`).join('')}</div>`;
 $('#sheetOv').classList.add('show');
}
$('#sheetOv').onclick=e=>{if(e.target.id==='sheetOv')closeSheet()};
function toggleSound(){MUTE=!MUTE;toast(MUTE?'🔇 소리 끔':'🔊 소리 켬');$('#sndBtn').innerHTML=MUTE?'<span>🔇</span>소리':'<span>🔊</span>소리'}
function toggleTrain(){S.flags.train=S.flags.train===false?true:false;toast(S.flags.train===false?'🎯 집중 훈련 미니게임 끔':'🎯 집중 훈련 미니게임 켬');$('#trainBtn').innerHTML=`<span>🎯</span>훈련 게임 ${S.flags.train===false?'OFF':'ON'}`}
function toggleFast(){FAST=!FAST;toast(FAST?'⏩ 빠르게 진행':'▶ 보통 속도');$('#fastBtn').classList.toggle('on',FAST)}

/* ============ 저장 / 시작 ============ */
function save(){if(S&&!S.ended&&!(S.flags&&S.flags.preview))store.set('ggm3_save',S)}
function title(){
 $('#tChar').innerHTML=girl(playerLook({expr:'happy',mic:false,crown:false}));
 const sv=store.get('ggm3_save');
 $('#tBtns').innerHTML=(sv?`<button class="tbtn pk" onclick="cont()">▶ 이어하기 <small style="font-size:12px">(${sv.name} · ${STAGES[sv.stage].name})</small></button>`:'')+
  `<button class="tbtn ${sv?'':'pk'}" onclick="start()">▶ 새로 시작</button><button class="tbtn" onclick="openGallery()">▶ 엔딩 도감</button><button class="tbtn" onclick="previewDebut()" style="font-size:13px">✨ 데뷔 이후 미리보기 <small>(테스트용)</small></button>`;
 $('#title').classList.add('show');
}
function cont(){audio();S=store.get('ggm3_save');if(!S.wear.hair){S.wear.hair='h0';S.owned.push('h0')}S.skills=S.skills||[];S.badges=S.badges||[];S.mm=null;$('#title').classList.remove('show');render()}
async function previewDebut(){
 audio();SFX.ok();$('#title').classList.remove('show');
 newGame('한유나');
 Object.assign(S,{age:17,year:2030,month:2,stage:3,agency:'haeon',group:'VELVA',concept:'pure',position:'메인보컬',money:1500,
  vocal:62,dance:58,visual:60,mind:50,body:50,diet:45,social:45,english:25,interview:30,variety:25,fame:0,
  style:{pure:8,charisma:2,bright:3},flags:{preview:1}});
 ['t20','t21','t22'].forEach(id=>S.owned.push(id));S.wear.top='t22';
 render();busy=true;
 await dialog({speaker:'미리보기',title:'✨ 데뷔 이후 미리보기',body:'원래는 연습생 시절을 몇 달 동안 거쳐야 데뷔해요.\n테스트용으로 바로 데뷔 장면부터 보여 줄게요.\n(이 플레이는 이어하기에 저장되지 않아요.)'});
 await nextStage(4);
 busy=false;render();
}
async function start(){
 audio();SFX.ok();
 $('#title').classList.remove('show');
 newGame('한유나'); render();
 await dialog({title:'연습생의 이름은?',body:'열네 살 봄. 오늘은 아카데미 첫 수업 날이다.',input:'한유나',choices:['결정']});
 S.name=lastInput||'한유나';
 busy=true;
 await dialog({speaker:'플레이 방법',body:'🗺️ [외출]을 누르면 마을로 나가요. 십자 버튼(방향키)으로 걸어서 건물 문에 들어가면 그곳의 일정을 고를 수 있어요.\n\n📅 한 달 = 열흘 × 3칸. 3칸을 채우면 한 달이 흘러요.\n\n💬 매달 선생님·동기·동네 사람들과 에피소드가 생겨요. 선택이 능력치, 호감도, 콘셉트 성향을 바꿔요.\n\n👗 옷장에서 옷을 끌어다 입혀 코디를 완성하세요. 오디션마다 선호 코디가 달라요!'});
 await nextStage(0);
 busy=false; save(); render();
}
