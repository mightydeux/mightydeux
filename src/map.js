/* ============ 마을 화면 (일러스트) ============
   예전 도트 타일맵을 대체한다. 배경 일러스트 위에 오늘 만날 사람·선물 상자·팬을 띄우고,
   아래 장소 카드를 누르면 그 건물의 일정 목록이 열린다. (게임 로직은 그대로) */
function themeId(){const s=S.stage;return s>=6?'la':s>=4?'broadcast':s>=2?'gangnam':'town'}
const THEMES={
 town:{name:'서교동',bg:'env_street',tint:'day'},
 gangnam:{name:'강남 기획사 거리',bg:'env_company',tint:'dusk'},
 broadcast:{name:'상암 엔터 거리',bg:'env_street',tint:'evening'},
 la:{name:'LA 산타모니카',bg:'env_street',tint:'sunny'},
};
const BICON={A:'🎤',B:'🏃‍♀️',C:'☕',D:'🛍️',E:'📚',F:'🏠',G:'📺'};
const BLABEL={
 A:s=>['K-아카데미','스톤웨이브 B1',agName()+' 사옥',agName()+' 사옥',agName()+' 연습실',agName()+' 연습실','LA 레코딩 스튜디오','투어 리허설장'][s],
 B:s=>['동네 헬스장','한강 러닝 코스','필라테스 센터','필라테스 센터','PT 짐','PT 짐','머슬 비치 짐','호텔 짐'][s],
 C:s=>['분식집·카페','분식집·카페','샐러드 카페','샐러드 카페','방송국 구내식당','방송국 구내식당','LA 다이너','케이터링'][s],
 D:s=>['쇼핑몰·뷰티','쇼핑몰·뷰티','청담 뷰티숍','청담 뷰티숍','청담 숍·쇼룸','청담 숍·쇼룸','로데오 숍','로데오 숍'][s],
 E:s=>['영어 학원','영어 학원','어학원','미디어 트레이닝룸','미디어룸','미디어룸','LA 어학원','미디어룸'][s],
 F:s=>['우리 집','우리 집','연습생 숙소','데뷔조 숙소','숙소','숙소','LA 호텔','투어 호텔'][s],
 G:s=>s<4?'🚧 공사 중':['M 방송국','M 방송국','LA 방송국','코칠라 공연장'][s-4],
};
function agName(){const a=agObj();return a?a.short:'회사'}
const BACTS={A:['breath','hightone','cover','copy','formation','theory','senior','prolesson','evalreh','record','comebackprep','vocaldir','songcamp','usdance'],B:['stamina','flex','pt'],C:['diet','dinner','parttime','yasik'],D:['skin','camera','shoot','magazine','cf'],E:['english','engpro','mediatr','varprep'],F:['rest','family','home','diary','vlive','beach'],G:['musicshow','fansign','variety','content','radio','ustour','usshow','usradio','usfan']};
const BFREE={D:[['shop','🛍️ 옷가게·장비 상점']],F:[['wardrobe','👗 옷장 (옷·헤어)'],['save','💾 저장하기']]};
/* 건물에 들어갔을 때 보여 줄 일러스트 */
function bldArt(id){const s=S.stage;return ({A:s<2?'env_studio':'env_company',B:'env_studio',C:'bg_cafe',D:'env_street',E:'env_company',F:'bg_home',G:'env_company'})[id]}
let MAP=null;
function TH(){return THEMES[themeId()]}
function bldIds(){return ['A','B','C','D','E','F','G']}
function ensureMonth(){
 const key=`${S.year}-${S.month}-${S.stage}`;
 if(S.mm&&S.mm.key===key) return;
 const POOL={0:['harin','chaewon','mikyung','leo','granny','mom'],1:['harin','chaewon','mikyung','leo','woojin','granny'],2:['rena','harin','jiyu','trainer','seoa','trainee'],3:['rena','harin','chaewon','woojin','trainer','seoa'],4:['cafe','arteam','pd','reporter','fanmaster','jiyu','seoa','woojin'],5:['cafe','arteam','pd','reporter','fanmaster','jiyu','seoa'],6:['jenny','mike','emily','rena'],7:['jenny','mike','emily','rena','woojin']};
 const okNpc=k=>!(k==='chaewon'&&(S.flags.chaewonQuit||(S.stage>=2&&!S.flags.chaewonTeam)))&&!(k==='harin'&&S.stage>=2&&!S.flags.harinTeam&&S.stage!==2);
 const skey=`${S.stage}_${(S.mi||0)+1}`;let storyK=null;
 if(EPI[skey]&&!S.done[skey]){for(const nd of EPI[skey].script){if(Array.isArray(nd)&&CAST[nd[0]]){storyK=nd[0];break}if(nd&&nd.pop==='meet'&&nd.who){storyK=nd.who;break}}}
 const cands=shuffle(POOL[S.stage].filter(okNpc).filter(k=>k!==storyK));
 const want=(storyK?[[storyK,skey]]:[]).concat(cands.slice(0,3).map(k=>[k,null]));
 const xs=shuffle([14,36,58,80]);
 const npcs=want.map(([k,story],i)=>({k,story,talked:false,x:xs[i],y:54+Math.floor(Math.random()*8)}));
 const items=Array.from({length:S.stage>=4?3:2},(_,i)=>({got:false,x:12+i*30+Math.floor(Math.random()*14),y:24+Math.floor(Math.random()*14)}));
 const fans=S.stage>=4?Math.min(30,2+Math.floor(S.fame/60)):0;
 const opened=['A','B','C','D','E','F'].concat(S.stage>=4?['G']:[]);
 const hot=shuffle(opened).slice(0,S.stage>=2?2:1);
 S.mm={key,npcs,items,fans,hot,cheered:false,talked:[],picked:0,mission:makeMission(cands.filter(k=>S.met[k]))};
}
const VOCAL=['breath','hightone','cover','prolesson','vocaldir','record','songcamp'],DANCE=['copy','formation','stamina','flex','pt','comebackprep','usdance','evalreh'];
function makeMission(cands){
 const t=[
  {t:'⭐ 핫스팟 건물에서 일정 1회',k:'hot',n:1},
  {t:'🎁 마을에서 선물 상자 2개 줍기',k:'pick',n:2},
  {t:'🎤 보컬 계열 일정 2회',k:'vocal',n:2},
  {t:'💃 댄스 계열 일정 2회',k:'dance',n:2},
  {t:'😌 이번 달을 스트레스 50 이하로 마치기',k:'calm',n:1},
 ];
 if(cands.length) t.push({t:'💬 마을에서 아는 사람 2명과 대화하기',k:'talk',n:2});
 const m=pick(t);m.reward=Math.round(80+S.stage*70);return m;
}
function missionDone(){
 const m=S.mm&&S.mm.mission;if(!m)return false;const sl=S.mm.lastSlots||[];
 if(m.k==='hot') return sl.some(id=>S.mm.hot.includes(bldOf(id)));
 if(m.k==='pick') return S.mm.picked>=2;
 if(m.k==='vocal') return sl.filter(id=>VOCAL.includes(id)).length>=2;
 if(m.k==='dance') return sl.filter(id=>DANCE.includes(id)).length>=2;
 if(m.k==='calm') return S.stress<=50;
 if(m.k==='talk') return S.mm.talked.length>=2;
}
function townHTML(){
 const t=TH(),mm=S.mm;
 const day=S.stage>=4?`데뷔 D+${S.day-(S.debutDay||S.day)+1}`:`연습생 D+${S.day}`;
 return `<div class="tbg" style="background-image:url('${ARTBG[t.bg]}')"></div><div class="tshade ${t.tint}"></div>
 <div class="ttop"><span>📍 ${t.name}</span><small>${S.month}월 · ${day}</small></div>
 ${mm.items.map((it,i)=>it.got?'':`<button class="tgift" style="left:${it.x}%;top:${it.y}%" onclick="tapGift(${i})" aria-label="선물 상자">🎁</button>`).join('')}
 ${mm.npcs.map((n,i)=>`<button class="tnpc ${n.story&&!S.done[n.story]?'story':''} ${n.talked?'done':''}" style="left:${n.x}%;top:${n.y}%" onclick="tapNpc(${i})"><span class="tav">${portrait(n.k)}</span><b>${CAST[n.k].name}</b>${n.story&&!S.done[n.story]?'<i class="tbang">!</i>':n.talked?'':'<i class="ttalk">💬</i>'}</button>`).join('')}
 ${mm.fans&&!mm.cheered?`<button class="tfans" onclick="tapFans()">💖 팬 ${mm.fans}명이 기다리고 있어요 · 인사하기</button>`:''}`;
}
function placesHTML(){
 const st=S.stage,hot=S.mm.hot;
 return bldIds().map(id=>{const lock=id==='G'&&st<4;const n=S.slots.filter(a=>a&&bldOf(a)===id).length;
  return `<button class="place ${hot.includes(id)?'hot':''} ${lock?'lock':''}" onclick="enterBuilding('${id}')"><span class="pic">${BICON[id]}</span><b>${lock?'방송국 (공사 중)':BLABEL[id](st)}</b><small>${lock?'데뷔 후 오픈':hot.includes(id)?'⭐ 핫스팟 · 효과 1.5배':n?`📌 ${n}개 선택됨`:id==='F'?'옷장 · 저장':'일정 보기'}</small></button>`}).join('');
}
function redrawTown(){if(!MAP||!MAP.on)return;$('#town').innerHTML=townHTML();$('#places').innerHTML=placesHTML()}
function tapGift(i){if(!MAP||MAP.busy)return;const it=S.mm.items[i];if(!it||it.got)return;it.got=true;S.mm.picked++;pickupItem();redrawTown()}
function tapNpc(i){if(!MAP||MAP.busy)return;const n=S.mm.npcs[i];if(n)talkNPC(n)}
function tapFans(){if(!MAP||MAP.busy||S.mm.cheered)return;S.mm.cheered=true;SFX.fan();const g=Math.round(4+S.fame/120);apply({fame:g,stress:-5});burst($('#mapwrap'),['💖','✨','🎀'],16);floatText(`꺄아~! ${S.name}!!`,'#ff7eb6',$('#mapwrap'));toast(`💖 팬들이 환호했다! 팬덤 +${g} · 스트레스 -5`);render();redrawTown()}
function pickupItem(){
 const st=S.stage;const r=Math.random();let lines,eff={};
 const unowned=Object.entries(WARDROBE).flatMap(([c,l])=>l.filter(i=>!S.owned.includes(i.id)&&i.st<=st&&i.price<=600).map(i=>[c,i]));
 if(r<.12&&unowned.length){const [c,i]=pick(unowned);S.owned.push(i.id);lines=[`🎁 선물 상자를 열었다!`,`✨ 레어! [${i.name}]을(를) 얻었다! (옷장에서 입을 수 있어요)`];SFX.big();burst($('#mapwrap'),['🎁','✨','💖'],14)}
 else if(r<.45){const g=Math.round(40+st*35+Math.random()*40);eff={money:g};lines=['🎁 선물 상자를 열었다!',`💰 ${g}G가 들어 있었다!`]}
 else if(r<.75){const k=pick(['vocal','dance','visual','english','mind']);eff={[k]:2};lines=['🎁 선물 상자를 열었다!',`📒 비법 노트 발견! ${LBL[k]} +2`]}
 else {eff={stress:-10};lines=['🎁 선물 상자를 열었다!','🧃 비타민 음료! 스트레스 -10']}
 SFX.ok();apply(eff);render();mapSay(lines);
}
function stepOut(){}
function mapSay(lines){MAP.busy=true;return pkText(lines,$('#mapwrap')).then(()=>{MAP.busy=false})}
const NPCTALK={
 harin:[{s:[0,1],t:'오늘도 옥상에서 연습할 거야? 나도 낄래!',e:{dance:1}},{s:[0,1],t:'우리 꼭 같은 팀 하자!',e:{mind:1}},{s:[2,3],t:'월말평가 끝나면 떡볶이! 약속!',e:{stress:-4}},{s:[2,3],t:'나 요즘 웨이브 연습 중! 봐 줄래?',q:{ask:'하린의 웨이브를 봐 줄까?',o:[['같이 춘다',{dance:2,stress:2},'"오~ 너 많이 늘었다!"'],['폰으로 찍어 준다',{social:1},'"각도 장인 인정!"']]}}],
 chaewon:[{s:[0,1],t:'아, 안녕하세요… 오늘 날씨 좋네요.',e:{vocal:1}},{s:[3,3],t:'데뷔곡 제 파트… 한 번 들어 줄래요?',e:{vocal:2}}],
 mikyung:[{s:[0,1],t:'숨은 아래로, 소리는 앞으로. 잊지 마.',e:{vocal:1}},{s:[0,1],t:'요즘 목 관리 잘하고 있니? 따뜻한 물 자주 마셔.',e:{body:1}}],
 leo:[{s:[0,1],t:'헤이! 눈빛! 카메라 어딨다고?',e:{visual:1}},{s:[0,1],t:'어깨 힘 빼. 춤은 힘이 아니라 리듬이야.',e:{dance:1}}],
 granny:[{s:[0,1],t:'어이구 학생, 오늘도 연습 가? 이거 먹고 가.',e:{stress:-4}}],
 mom:[{s:[0,1],t:'반찬 냉장고에 넣어놨어. 꼭 챙겨 먹어!',e:{diet:1,stress:-2}}],
 woojin:[{s:[1,1],t:'스케줄 체크 잘하고 있지? 무리하지 마.',e:{stress:-3}},{s:[3,5],t:'다음 주 스케줄표 나왔다. 각오해!',e:{mind:1}},{s:[4,5],t:'요즘 반응 진짜 좋아. 회사 분위기 최고야.',e:{stress:-3}},{s:[7,7],t:'여기까지 오다니… 나 울 것 같다.',e:{mind:2}}],
 rena:[{s:[2,3],t:'한국어 단어 퀴즈 내 줄래요? 헤헤.',e:{english:1}},{s:[2,3],t:'편의점 신상 먹어봤어요? 완전 맛있어요!',e:{stress:-3}},{s:[4,5],t:'일본 팬들이 우리 무대 보고 울었대요!',e:{fame:3}},{s:[6,7],t:'LA 햇살 최고! 여기서 MV 찍고 싶어요!',e:{stress:-4}}],
 jiyu:[{s:[2,3],t:'…뭐야, 쳐다보지 마.',e:{dance:1}},{s:[4,5],t:'…다음 컴백 언제야? 딱히 궁금한 건 아니고.',q:{ask:'지유에게 뭐라고 할까?',o:[['"비밀~ 근데 너보다 먼저야!"',{stress:-2},'"…흥. 기대는 해 줄게."'],['"같은 주에 하자. 정면승부."',{dance:2},'"좋아. 각오해."']]}}],
 seoa:[{s:[2,3],t:'힘들면 거울 말고 연습일지 봐. 얼마나 왔는지 보여.',e:{mind:1}},{s:[4,5],t:'어, 후배님! 오늘 무대 잘 봤어요. 표정 좋더라.',e:{visual:1}},{s:[4,5],t:'선배로서 하나만. 잘될 때일수록 잠 챙겨요.',e:{stress:-4}}],
 trainer:[{s:[2,3],t:'자세 좋아졌네. 오늘은 코어 추가다!',e:{body:2,stress:2}},{s:[2,3],t:'컨디션 체크! 어제 몇 시간 잤어?',q:{ask:'강 코치에게 솔직하게 말할까?',o:[['"3시간이요…"',{stress:-6},'"오늘 PT는 스트레칭 위주로 간다."'],['"푹 잤어요!" (거짓말)',{body:2,stress:4},'"좋아, 그럼 강도 올린다!"']]}}],
 trainee:[{s:[2,3],t:'이번 월말평가 곡 뭐야? 나 진짜 떨려…',e:{social:1}}],
 pd:[{s:[4,5],t:'다음 주 특집에 게스트 어때요?',q:{ask:'〈놀라운 주말〉 특집 게스트 제안!',o:[['출연한다',{variety:3,fame:10,stress:5},'"좋아요! 대본 보내 드릴게요."'],['컴백 준비로 정중히 거절',{mind:1},'"아쉽네요. 다음에 꼭!"']]}}],
 reporter:[{s:[4,5],t:'연예부 박기자예요. 단독 인터뷰 가능할까요?',q:{ask:'단독 인터뷰를 할까?',o:[['응한다',{fame:15,interview:2,stress:4},'"내일 아침 헤드라인 기대하세요!"'],['회사를 통해 달라고 한다',{mind:1},'"역시 프로네요. 연락드릴게요."']]}},{s:[4,5],t:'요즘 직캠 반응이 심상치 않던데요?',e:{fame:5}}],
 fanmaster:[{s:[4,7],t:'팬카페 매니저 소라예요! 다음 서포트 뭐가 좋아요?',q:{ask:'팬들의 서포트, 뭐가 좋을까?',o:[['커피차',{stress:-8},'"커피차 출동! ☕"'],['도시락차',{body:2,diet:1},'"건강 도시락으로 준비할게요!"'],['"마음만으로 충분해요!"',{mind:2},'"…역시 우리 아티스트 ㅠㅠ"']]}},{s:[4,7],t:'팬카페 회원 수 또 늘었어요! 축하해요!',e:{fame:5}}],
 jenny:[{s:[6,7],t:'Hi! LA 코디 제니예요. 오늘 저녁 뭐 먹을래요?',q:{ask:'LA에서의 저녁은?',o:[['타코 트럭!',{stress:-6},'"Good choice! 최고의 타코 데려갈게요."'],['연습실로 직행',{dance:2,stress:3},'"Wow, so professional!"']]}},{s:[6,7],t:'다음 주 토크쇼 의상 피팅 있어요!',e:{visual:2}}],
 mike:[{s:[6,7],t:"Yo! I've got a new demo. Wanna hear?",q:{ask:'마이크의 데모를 들어 볼까?',o:[['"Of course!"',{vocal:2,english:1},'"See? This is your song."'],['"Next time, sorry!"',{stress:-3},'"No worries, superstar."']]}}],
 arteam:[{s:[4,7],t:'다음 앨범 콘셉트 회의 자료예요. 의견 하나만 줄래요?',q:{ask:'서윤 팀장이 콘셉트 의견을 묻는다',o:[['"청량한 여름 콘셉트!"',{social:2},'"좋아요, 레퍼런스 모아 볼게요."'],['"다크하고 강렬하게!"',{dance:2},'"오, 무대가 그려지네요."'],['"팬들 의견을 먼저 들어 봐요"',{mind:2,fame:5},'"역시 팬 생각부터네요. 설문 돌릴게요!"']]}},{s:[4,7],t:'이번 주 음원 성적 좋아요. 컨디션 관리만 잘해 줘요.',e:{stress:-3}}],
 cafe:[{s:[4,5],t:'어서 오세요~ 봄날 카페예요! 오늘의 추천은 딸기 라떼!',e:{stress:-8}},{s:[4,5],t:'저기… 사인 한 장 카페 벽에 붙여도 될까요?',q:{ask:'카페 사장님이 사인을 부탁한다',o:[['기꺼이 사인해 준다',{fame:6,mind:1},'"우와! 가게 보물 1호예요!"'],['멤버들 사인까지 받아다 준다',{fame:10,social:2},'"세상에… 평생 간직할게요!"']]}}],
 emily:[{s:[6,7],t:'OMG it\'s really you!! Can I get a selfie?',q:{ask:'에밀리가 셀카를 부탁한다!',o:[['"Sure! 💕"',{fame:12},'"I\'m gonna frame this!"'],['사인을 해 준다',{mind:1,fame:5},'"Best day of my life!!"']]}}],
};
async function talkNPC(n){
 const c=CAST[n.k];S.met[n.k]=1;
 if(n.story&&!S.done[n.story]){MAP.busy=true;const k=n.story;await playEp(EPI[k]);n.story=null;n.talked=true;MAP.busy=false;renderSlots();redrawTown();return}
 if(n.talked){await mapSay([`${c.name}: "${pick(['또 보네!','오늘도 화이팅!','이따 봐!'])}"`]);return}
 n.talked=true;S.mm.talked.push(n.k);
 const opts=(NPCTALK[n.k]||[]).filter(x=>S.stage>=x.s[0]&&S.stage<=x.s[1]);
 const L=opts.length?pick(opts):{t:'안녕!',e:{stress:-1}};
 redrawTown();
 await mapSay([`${c.name}: "${L.t}"`]);
 if(L.q){MAP.busy=true;const i=await pkChoice(L.q.ask,L.q.o.map(o=>o[0]),n.k);const o=L.q.o[i];const r=apply(o[1]);await mapSay([`${c.name}: ${o[2]}`]);effToast(r)}
 else{const r=apply(L.e||{});effToast(r)}
 S.aff[n.k]=(S.aff[n.k]||0)+.5;render();renderSlots();redrawTown();
}
function sheetHead(title,art,sub){return `<div class="bmart" ${art?`style="background-image:url('${ARTBG[art]}')"`:''}><div class="bmh">${title}</div>${sub||''}</div>`}
function enterBuilding(id){
 if(!MAP||MAP.busy) return;
 const st=S.stage;
 if(id==='G'&&st<4){mapSay(['🚧 공사 중이다. "M 방송국 신축 · 오픈 예정"','(데뷔 후에 갈 수 있을 것 같다.)']);return}
 MAP.busy=true;SFX.door();
 const acts=BACTS[id].map(a=>ACTS.find(x=>x.id===a)).filter(a=>a&&st>=a.s[0]&&st<=a.s[1]);
 const free=(BFREE[id]||[]);
 const used=S.slots.reduce((s,i)=>s+(i?costOf(ACTS.find(a=>a.id===i)):0),0), left=S.money-used;
 const full=!S.slots.includes(null);const hot=S.mm.hot.includes(id);
 const box=$('#bmenu');
 box.innerHTML=sheetHead(`${BICON[id]} ${BLABEL[id](st)}`,bldArt(id),hot?'<div class="bmhot">⭐ 이번 달 핫스팟! 효과 1.5배</div>':'')+`<div class="bml">${acts.map(a=>{const cost=costOf(a);const cnt=S.slots.filter(x=>x===a.id).length;const dis=cost>left||full||cnt>=2;const tg=TRAIN[a.id];return `<button class="pkopt" data-a="${a.id}" ${dis?'disabled':''}><b>${a.name}${a.npc?' 💬':''}${tg?' 🎯':''}</b><small>${effText(a)}${cost?` · 💰${cost}G`:''}${cnt>=2?' · 이번 달 2회 완료':''}</small></button>`}).join('')}
  ${free.map(([k,l])=>`<button class="pkopt free" data-f="${k}"><b>${l}</b></button>`).join('')}<button class="pkopt out" data-f="out"><b>↩ 나가기</b></button></div>${full?'<div class="bmn">이번 달 일정이 다 찼어요!</div>':''}`;
 box.classList.add('show');
 box.querySelectorAll('.pkopt').forEach(b=>b.onclick=async()=>{
  SFX.sel();
  if(b.dataset.a){const i=S.slots.indexOf(null);S.slots[i]=b.dataset.a;box.classList.remove('show');renderSlots();redrawTown();MAP.busy=false;floatText(`📌 ${ACTS.find(a=>a.id===b.dataset.a).name}`,'#fff',$('#mapwrap'));if(!S.slots.includes(null))setTimeout(askStart,350);return}
  const f=b.dataset.f;
  if(f==='out'){box.classList.remove('show');MAP.busy=false;return}
  if(f==='shop'){box.classList.remove('show');openShop(()=>{MAP.busy=false;redrawTown()})}
  if(f==='wardrobe'){box.classList.remove('show');openWardrobe(()=>{MAP.busy=false;redrawTown()})}
  if(f==='save'){save();toast('💾 저장했어요!');box.classList.remove('show');MAP.busy=false}
 });
}
function renderSlots(){
 const m=S.mm&&S.mm.mission;
 $('#slotbar').innerHTML=(m?`<div class="msn">🎯 이번 달 미션: ${m.t} <b>(+${m.reward}G)</b></div>`:'')+['1~10일','11~20일','21~말일'].map((l,i)=>{const a=S.slots[i]&&ACTS.find(x=>x.id===S.slots[i]);return `<div class="sl ${a?'on':''}" onclick="unslotMap(${i})"><small>${l}</small><b>${a?a.name:'—'}</b></div>`}).join('')+`<button class="sl go" ${S.slots.includes(null)?'disabled':''} onclick="askStart()">▶ 시작</button>`;
}
function unslotMap(i){if(!S.slots[i])return;SFX.sel();S.slots[i]=null;renderSlots();redrawTown()}
async function askStart(){
 if(S.slots.includes(null)||(MAP&&MAP.busy)) return;
 MAP.busy=true;
 const i=await pkChoice('이번 달 일정을 시작할까?',['▶ 시작한다','아직 아니야']);
 MAP.busy=false;
 if(i===0){closeMap();runMonth()}
}
function pkChoice(q,opts,who){
 return new Promise(res=>{
  const box=$('#bmenu');box.innerHTML=`<div class="bmq">${who?`<span class="bmav">${portrait(who)}</span>`:''}<div class="bmh">${q}</div></div><div class="bml">${opts.map((o,i)=>`<button class="pkopt" data-i="${i}"><b>${o}</b></button>`).join('')}</div>`;box.classList.add('show');
  box.querySelectorAll('.pkopt').forEach(b=>b.onclick=()=>{SFX.sel();box.classList.remove('show');res(+b.dataset.i)});
 });
}
function openMap(){
 if(busy||!S) return;
 SFX.door();ensureMonth();MAP={on:true,busy:false,key:S.mm.key};
 document.body.classList.add('onmap');
 $('#town').innerHTML=townHTML();$('#places').innerHTML=placesHTML();renderSlots();
 window.scrollTo(0,0);
 if(!S.seen['tip_'+themeId()]){S.seen['tip_'+themeId()]=1;const tips={
  town:['아래 장소 카드를 누르면 그곳에서 할 일정을 고를 수 있어!','🎁 선물 상자를 눌러 열어 보고, 사람을 눌러 말을 걸어 봐. ❗ 표시는 중요한 이야기야.','⭐ 표시 장소는 이번 달 핫스팟! 효과가 1.5배야.'],
  gangnam:['✨ 강남 기획사 거리에 왔다! 유리 빌딩 사이로 회사 사옥이 보인다.','이제부터는 회사 사옥이 연습실이야. 핫스팟과 미션을 노려 보자!'],
  broadcast:['🎆 상암 방송가! 방송국 앞엔 팬들이 응원봉을 들고 기다리고 있다!','💖 팬들에게 인사하면 힘이 나. 방송국 카드도 열렸어!'],
  la:['🌴 LA 산타모니카! 바닷바람이 기분 좋다.','코칠라 무대를 향해, 마지막 스퍼트!']}[themeId()];mapSay(tips)}
}
function closeMap(){if(MAP){MAP.on=false}document.body.classList.remove('onmap');$('#bmenu').classList.remove('show')}
document.addEventListener('keydown',e=>{if(!MAP||!MAP.on||keyHandler||$('#sheetOv').classList.contains('show'))return;if(e.code==='KeyX'||e.code==='Escape'){actB()}});
