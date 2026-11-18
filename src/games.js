/* ============ 실기 미니게임 ============ */
const mgBox=()=>$('#mgbox');
function mgShow(){$('#mg').classList.add('show')}
function mgHide(){$('#mg').classList.remove('show')}
function mgIntro(title,how,sub){return new Promise(res=>{mgBox().innerHTML=`${sub?`<div style="text-align:center;font-size:12px;color:var(--mute)">${sub}</div>`:''}<h3>${title}</h3><p class="how">${how}</p><button class="tap" id="go">시작!</button>`;mgShow();$('#go').onclick=()=>res()})}
function gradeOf(s){return s>=90?'S':s>=75?'A':s>=55?'B':s>=35?'C':'D'}
function mgResult(title,score,note){return new Promise(res=>{mgBox().innerHTML=`<h3>${title}</h3><div class="grade">${gradeOf(score)}</div><p style="text-align:center;font-family:Jua;font-size:20px;margin:6px 0">${score}점</p>${note?`<p class="how" style="text-align:center">${note}</p>`:''}<button class="tap" id="ok">확인</button>`;$('#ok').onclick=()=>res()})}
let keyHandler=null;
document.addEventListener('keydown',e=>{if(keyHandler)keyHandler(e,true)});
document.addEventListener('keyup',e=>{if(keyHandler)keyHandler(e,false)});

/* 1. 박자 감각 (타이밍 탭) */
async function gTap(sub){
 await mgIntro('🎵 박자 감각 테스트','커서가 노란 영역에 올 때 TAP!\n실력이 오를수록 영역이 넓어져요.',sub);
 return new Promise(res=>{
  const R=6;let r=0,total=0;const skill=(S.vocal+S.dance)/2;const zw=clamp(10+skill/18,10,22),cw=zw*.38;
  mgBox().innerHTML=`<h3>🎵 박자 감각 테스트</h3><div class="track"><div class="zone" id="zn"></div><div class="core" id="cr"></div><div class="cursor" id="cs"></div></div><div class="judge" id="jg"></div><button class="tap" id="tapb">♪ TAP</button><div class="beats" id="bt">${'<i></i>'.repeat(R)}</div>`;
  let zs,pos=0,dir=1,speed,last=performance.now(),run=true,lock=false;
  const newZone=()=>{zs=rnd(15,85-zw);$('#zn').style.left=zs+'%';$('#zn').style.width=zw+'%';$('#cr').style.left=(zs+zw/2-cw/2)+'%';$('#cr').style.width=cw+'%';speed=60+r*14;pos=dir>0?0:100};
  newZone();
  const loop=t=>{if(!run)return;const dt=Math.min(.05,(t-last)/1000);last=t;if(!lock){pos+=dir*speed*dt;if(pos>100){pos=100;dir=-1}if(pos<0){pos=0;dir=1}}$('#cs').style.left=pos+'%';requestAnimationFrame(loop)};
  requestAnimationFrame(loop);
  const hit=async()=>{if(lock)return;lock=true;const c=zs+zw/2,d=Math.abs(pos-c);let j,sc,cl;
   if(d<=cw/2){j='PERFECT!';sc=100;cl='p'}else if(d<=zw/2){j='GOOD';sc=65;cl='g'}else{j='MISS';sc=0;cl='m'}
   total+=sc;$('#jg').textContent=j;$('#jg').style.color=cl==='p'?'#ffd36e':cl==='g'?'#ff7eb6':'#888';$('#bt').children[r].className=cl;r++;
   await sleep(450);$('#jg').textContent='';
   if(r>=R){run=false;keyHandler=null;res(Math.round(total/R));return}newZone();lock=false};
  $('#tapb').onclick=hit; keyHandler=(e,down)=>{if(down&&e.code==='Space'){e.preventDefault();hit()}};
 });
}

/* 2. 노래 실기 (음정 유지) */
async function gPitch(sub){
 await mgIntro('🎤 노래 실기 — 음정 유지','버튼을 꾹 누르면 음이 올라가고, 떼면 내려가요.\n🎤 마이크가 분홍 띠(멜로디) 안에 머물도록 9초 동안 따라가세요!\n\n보컬이 높을수록 띠가 넓어져요.',sub);
 return new Promise(res=>{
  mgBox().innerHTML=`<h3>🎤 음정 유지</h3><div class="pa" id="pa"><div class="lines">${[20,40,60,80].map(y=>`<i style="top:${y}%"></i>`).join('')}</div><div class="band" id="band"></div><div class="dot" id="dot">🎤</div><div class="pg" id="pg"></div></div><div class="judge" id="jg" style="font-size:18px"></div><button class="tap" id="hold">꾹 누르면 ▲ 음이 올라가요</button>`;
  const bh=clamp(18+S.vocal/9,18,36), dur=9, ph=rnd(0,6);
  let y=50,v=0,holding=false,t=0,inT=0,last=performance.now(),run=true;
  const c=t=>50+26*Math.sin(t*1.15+ph)+12*Math.sin(t*2.5+ph*2);
  const down=e=>{e&&e.preventDefault();holding=true}, up=e=>{e&&e.preventDefault();holding=false};
  const hb=$('#hold'),pa=$('#pa');
  for(const el of [hb,pa]){el.addEventListener('pointerdown',down);el.addEventListener('pointerup',up);el.addEventListener('pointerleave',up);el.addEventListener('pointercancel',up)}
  keyHandler=(e,d)=>{if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();holding=d}};
  const loop=now=>{if(!run)return;const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
   v+=(holding?-190:150)*dt; v=clamp(v,-75,75); y=clamp(y+v*dt,3,97); if(y<=3||y>=97)v=0;
   const cc=clamp(c(t),bh/2,100-bh/2), inside=Math.abs(y-cc)<bh/2; if(inside)inT+=dt;
   $('#band').style.top=(cc-bh/2)+'%';$('#band').style.height=bh+'%';$('#dot').style.top=y+'%';$('#dot').className='dot'+(inside?' in':'');
   $('#pg').style.width=(t/dur*100)+'%';$('#jg').textContent=inside?'♪ 좋아요!':'';$('#jg').style.color='#ffd36e';
   if(t>=dur){run=false;keyHandler=null;res(clamp(Math.round(inT/dur*100*1.12),0,100));return}
   requestAnimationFrame(loop)};
  requestAnimationFrame(loop);
 });
}

/* 3. 댄스 실기 (방향 맞추기) */
async function gDDR(sub){
 await mgIntro('💃 댄스 실기 — 방향 맞추기','아래에서 올라오는 화살표가 위쪽 동그라미에 겹칠 때\n같은 방향 버튼을 누르세요! (키보드 방향키도 가능)\n\n댄스가 높을수록 판정이 너그러워져요.',sub);
 return new Promise(res=>{
  const AR=['←','↓','↑','→'],CL=['#ff7eb6','#7ec8ff','#9be59b','#ffd36e'];
  mgBox().innerHTML=`<h3>💃 방향 맞추기</h3><div class="judge" id="jg" style="font-size:20px;height:26px"></div><div class="dd" id="dd">${AR.map((a,i)=>`<div class="ln" id="ln${i}"><div class="tg" id="tg${i}">${a}</div></div>`).join('')}</div><div class="ddb">${AR.map((a,i)=>`<button data-l="${i}" style="background:${CL[i]}55">${a}</button>`).join('')}</div>`;
  const N=14+S.stage*2, iv=Math.max(.36,.6-S.stage*.03), T=1.7, start=performance.now()/1000+.6;
  const notes=[];let tt=0;for(let i=0;i<N;i++){tt+= (Math.random()<.2?iv/2:iv);notes.push({lane:Math.floor(Math.random()*4),hit:tt+T,j:null,el:null})}
  const wP=.075+S.dance/5000, wG=.16+S.dance/2500; let P=0,G=0,combo=0,run=true;
  const dd=$('#dd');
  const judge=(txt,col)=>{$('#jg').textContent=txt;$('#jg').style.color=col};
  const press=l=>{const now=performance.now()/1000-start;$('#tg'+l).classList.add('fl');setTimeout(()=>{const e=$('#tg'+l);e&&e.classList.remove('fl')},100);
   let best=null,bd=9;for(const n of notes){if(n.j||n.lane!==l)continue;const d=Math.abs(now-n.hit);if(d<bd){bd=d;best=n}}
   if(best&&bd<=wG){best.j=bd<=wP?'P':'G';if(best.j==='P'){P++;judge(`PERFECT ${++combo>2?combo+' COMBO':''}`,'#ffd36e')}else{G++;combo++;judge('GOOD','#ff7eb6')}if(best.el){best.el.remove();best.el=null}}};
  mgBox().querySelectorAll('.ddb button').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();press(+b.dataset.l)}));
  const KM={ArrowLeft:0,ArrowDown:1,ArrowUp:2,ArrowRight:3};
  keyHandler=(e,d)=>{if(d&&KM[e.code]!==undefined&&!e.repeat){e.preventDefault();press(KM[e.code])}};
  const loop=()=>{if(!run)return;const now=performance.now()/1000-start;let alive=0;
   for(const n of notes){if(n.j){continue}alive++;const p=(now-(n.hit-T))/T;
    if(p<0)continue;
    if(!n.el){n.el=document.createElement('div');n.el.className='nt';n.el.textContent=AR[n.lane];n.el.style.background=CL[n.lane];$('#ln'+n.lane).appendChild(n.el)}
    n.el.style.top=(100-p*(100-8)+ 0)+'%';
    if(now-n.hit>wG){n.j='M';combo=0;judge('MISS','#888');n.el.style.opacity=.25;const el=n.el;setTimeout(()=>el.remove(),200);n.el=null}}
   if(!alive){run=false;keyHandler=null;setTimeout(()=>res(Math.round((P*100+G*60)/N)),400);return}
   requestAnimationFrame(loop)};
  requestAnimationFrame(loop);
 });
}

/* 4. 카메라 테스트 */
const FACES=[['smile','청순한 미소','😊'],['wink','윙크','😉'],['surprise','깜짝 놀란 표정','😮'],['smug','카리스마 눈빛','😏'],['sad','애절한 표정','🥺'],['happy','활짝 웃기','😆']];
async function gCamera(sub){
 await mgIntro('📸 카메라 테스트','두 가지 미션이 섞여 나와요.\n\n🔴 빨간불 카메라 찾기 — 음방에서 지금 찍고 있는 카메라(빨간불)를 빨리 찾아 터치!\n🎭 표정 연기 — 디렉터가 말한 표정을 골라 터치!\n\n빠를수록 점수가 높아요.',sub);
 const R=8; let total=0;
 for(let r=0;r<R;r++){
  const face=Math.random()<.4;
  total+= face? await camFace(r,R): await camRed(r,R);
 }
 return Math.round(total/R);
}
function camRed(r,R){return new Promise(res=>{
 mgBox().innerHTML=`<h3>📸 빨간불 카메라 찾기 (${r+1}/${R})</h3><div class="prompt" id="pr">대기…</div><div class="tbar"><i id="tb2" style="width:100%"></i></div><div class="cams">${Array.from({length:6},(_,i)=>`<button data-i="${i}">🎥<i></i></button>`).join('')}</div><div class="judge" id="jg"></div>`;
 const target=Math.floor(Math.random()*6), limit=Math.max(.9,1.6-S.stage*.06); let lit=false,t0=0,done=false;
 const finish=s=>{if(done)return;done=true;$('#jg').textContent=s>=80?'PERFECT!':s>0?'GOOD':'MISS';$('#jg').style.color=s>=80?'#ffd36e':s>0?'#ff7eb6':'#888';setTimeout(()=>res(s),450)};
 setTimeout(()=>{if(done)return;lit=true;t0=performance.now();mgBox().querySelectorAll('.cams button')[target].classList.add('on');$('#pr').textContent='지금!';
  const tick=()=>{if(done)return;const e=(performance.now()-t0)/1000;$('#tb2').style.width=Math.max(0,100-e/limit*100)+'%';if(e>limit){finish(0);return}requestAnimationFrame(tick)};tick()},rnd(400,1000));
 mgBox().querySelectorAll('.cams button').forEach(b=>b.onclick=()=>{if(!lit)return;const e=(performance.now()-t0)/1000;finish(+b.dataset.i===target?Math.round(100-e/limit*40):0)});
})}
function camFace(r,R){return new Promise(res=>{
 const opts=shuffle(FACES).slice(0,3), ans=pick(opts), limit=2.6;
 mgBox().innerHTML=`<h3>🎭 표정 연기 (${r+1}/${R})</h3><div class="prompt">디렉터: "${ans[1]}!"</div><div class="tbar"><i id="tb2" style="width:100%"></i></div><div class="faces">${opts.map((o,i)=>`<button data-i="${i}"><span class="fem">${o[2]}</span></button>`).join('')}</div><div class="judge" id="jg"></div>`;
 const t0=performance.now();let done=false;
 const finish=s=>{if(done)return;done=true;$('#jg').textContent=s>=80?'PERFECT!':s>0?'GOOD':'MISS';$('#jg').style.color=s>=80?'#ffd36e':s>0?'#ff7eb6':'#888';setTimeout(()=>res(s),450)};
 const tick=()=>{if(done)return;const e=(performance.now()-t0)/1000;$('#tb2').style.width=Math.max(0,100-e/limit*100)+'%';if(e>limit){finish(0);return}requestAnimationFrame(tick)};tick();
 mgBox().querySelectorAll('.faces button').forEach(b=>b.onclick=()=>{const e=(performance.now()-t0)/1000;finish(opts[+b.dataset.i]===ans?Math.round(100-e/limit*35):0)});
})}

/* 5. K-POP 상식 필기 */
const QUIZ=[
 ['음악방송에서 1위를 하면 받는 것은?',['트로피','금메달','상장','꽃다발만'],'e'],
 ['아이돌이 새 앨범으로 다시 활동을 시작하는 것을 뭐라고 할까?',['컴백','리턴','데뷔','쇼케이스'],'e'],
 ['무대 마지막에 카메라가 한 멤버를 클로즈업하는 장면을 부르는 말은?',['엔딩 요정','킬링 파트','하이라이트','센터 샷'],'e'],
 ['특정 멤버 한 명만 따라가며 찍은 무대 영상을 뭐라고 할까?',['직캠','풀캠','비하인드','티저'],'e'],
 ['데뷔 전 회사에서 노래와 춤을 훈련받는 사람을 뭐라고 할까?',['연습생','수습생','지망생','인턴'],'e'],
 ['그룹에서 나이가 가장 어린 멤버를 부르는 말은?',['막내','맏내','아기','신입'],'e'],
 ['팬들이 줄을 서서 사인을 받고 아이돌과 짧게 대화하는 행사는?',['팬사인회','쇼케이스','콘서트','팬미팅 투어'],'e'],
 ['연습생들이 매달 보는 실력 평가를 흔히 뭐라고 할까?',['월말평가','중간고사','리허설','오디션'],'e'],
 ['콘서트에서 팬들이 흔드는 공식 응원 도구는?',['응원봉','야광 팔찌','탬버린','깃발'],'e'],
 ['노래에서 가장 인상적이고 귀에 꽂히는 구간을 부르는 말은?',['킬링 파트','브릿지','인트로','아웃트로'],'e'],
 ['앨범 발매 직후 기자·팬 앞에서 처음 무대를 공개하는 행사는?',['쇼케이스','팬미팅','시상식','리허설'],'e'],
 ['음원 사이트 실시간 차트 1위를 모두 차지하는 것을 뭐라고 할까?',['올킬','퍼펙트','그랜드슬램','싹쓸이 차트'],'e'],
 ['팬들이 노래 중간에 멤버 이름 등을 박자에 맞춰 외치는 것은?',['응원법','떼창','팬송','챈트 배틀'],'e'],
 ['데뷔나 컴백 전에 공개하는 짧은 홍보 사진·영상은?',['티저','트레일러 컷','프리뷰','스포일러'],'e'],
 ['K-POP의 "K"는 무엇을 뜻할까?',['Korea(한국)','King(왕)','Kids(어린이)','Kiss(키스)'],'e'],
 ['춤을 가장 잘해 퍼포먼스를 이끄는 멤버의 포지션은?',['메인댄서','메인래퍼','리드보컬','비주얼'],'e'],
 ['음악방송 1위 후 다시 한 번 부르는 무대를 뭐라고 할까?',['앵콜 무대','커튼콜','엔딩 무대','보너스 무대'],'e'],
 ['KBS의 대표 음악방송은?',['뮤직뱅크','인기가요','쇼! 음악중심','엠카운트다운'],'e'],
 ['SBS의 대표 음악방송은?',['인기가요','뮤직뱅크','쇼! 음악중심','엠카운트다운'],'e'],
 ['MBC의 대표 음악방송은?',['쇼! 음악중심','인기가요','뮤직뱅크','엠카운트다운'],'e'],
 ['Mnet의 대표 음악방송은?',['엠카운트다운','뮤직뱅크','인기가요','쇼! 음악중심'],'e'],
 ['방탄소년단(BTS)의 팬덤 이름은?',['ARMY','BLINK','ONCE','MY'],'e'],
 ['블랙핑크의 팬덤 이름은?',['BLINK','ARMY','ONCE','CARAT'],'e'],
 ['트와이스의 팬덤 이름은?',['ONCE','BLINK','ARMY','MY'],'e'],
 ['싸이의 "강남스타일"은 몇 년에 발표됐을까?',['2012년','2009년','2015년','2018년'],'e'],
 ['블랙핑크의 멤버는 몇 명일까?',['4명','5명','3명','6명'],'e'],
 ['트와이스의 멤버는 몇 명일까?',['9명','7명','8명','5명'],'e'],
 ['"Gee"로 유명한 걸그룹은?',['소녀시대','원더걸스','카라','2NE1'],'e'],
 ['"뚜두뚜두(DDU-DU DDU-DU)"를 부른 그룹은?',['블랙핑크','트와이스','레드벨벳','에스파'],'e'],
 ['"TT"로 유명한 걸그룹은?',['트와이스','블랙핑크','여자친구','마마무'],'e'],
 ['"Next Level"을 부른 그룹은?',['에스파','아이브','르세라핌','뉴진스'],'e'],
 ['"LOVE DIVE"를 부른 그룹은?',['아이브','에스파','뉴진스','르세라핌'],'e'],
 ['"Hype Boy"를 부른 그룹은?',['뉴진스','아이브','에스파','르세라핌'],'e'],
 ['"봄날"을 부른 그룹은?',['방탄소년단','세븐틴','엑소','빅뱅'],'e'],
 ['방탄소년단의 "Dynamite"는 어떤 언어로 부른 곡일까?',['영어','한국어','일본어','스페인어'],'e'],
 ['아이유의 "3단 고음"으로 유명한 곡은?',['좋은 날','밤편지','팔레트','Blueming'],'e'],
 ['유튜브 사상 최초로 조회수 10억 회를 돌파한 뮤직비디오는?',['싸이 "강남스타일"','저스틴 비버 "Baby"','BTS "Dynamite"','블랙핑크 "뚜두뚜두"'],'m'],
 ['K-팝 그룹 최초로 빌보드 Hot 100 1위를 한 곡은?',['BTS "Dynamite"','싸이 "강남스타일"','BTS "Butter"','블랙핑크 "Pink Venom"'],'m'],
 ['소녀시대의 데뷔곡은?',['다시 만난 세계','Gee','소원을 말해봐','훗'],'m'],
 ['아이브(IVE)의 데뷔곡은?',['ELEVEN','LOVE DIVE','After LIKE','I AM'],'m'],
 ['에스파의 데뷔곡은?',['Black Mamba','Next Level','Savage','Spicy'],'m'],
 ['르세라핌의 데뷔곡은?',['FEARLESS','ANTIFRAGILE','UNFORGIVEN','EASY'],'m'],
 ['트와이스의 데뷔곡은?',['우아하게(Like OOH-AHH)','TT','CHEER UP','FANCY'],'m'],
 ['방탄소년단의 데뷔곡은?',['No More Dream','봄날','DNA','불타오르네'],'m'],
 ['원더걸스 "Tell Me"가 발표된 해는?',['2007년','2004년','2010년','2013년'],'m'],
 ['소녀시대 "Gee"가 발표된 해는?',['2009년','2007년','2011년','2014년'],'m'],
 ['블랙핑크가 데뷔한 해는?',['2016년','2014년','2018년','2012년'],'m'],
 ['뉴진스가 데뷔한 해는?',['2022년','2019년','2020년','2024년'],'m'],
 ['세븐틴의 멤버는 몇 명일까?',['13명','7명','9명','11명'],'m'],
 ['세븐틴의 팬덤 이름은?',['CARAT','ARMY','ONCE','EXO-L'],'m'],
 ['에스파의 팬덤 이름은?',['MY','BLINK','DIVE','ONCE'],'m'],
 ['뉴진스의 팬덤 이름은?',['버니즈','피어나','다이브','마이'],'m'],
 ['마마무의 팬덤 이름은?',['무무','원스','캐럿','버니즈'],'m'],
 ['트와이스의 소속사는?',['JYP 엔터테인먼트','SM 엔터테인먼트','YG 엔터테인먼트','하이브'],'m'],
 ['엑소(EXO)의 소속사는?',['SM 엔터테인먼트','JYP 엔터테인먼트','YG 엔터테인먼트','스타쉽'],'m'],
 ['빅뱅과 블랙핑크의 소속사는?',['YG 엔터테인먼트','SM 엔터테인먼트','JYP 엔터테인먼트','큐브'],'m'],
 ['아이브의 소속사는?',['스타쉽 엔터테인먼트','JYP 엔터테인먼트','SM 엔터테인먼트','YG 엔터테인먼트'],'m'],
 ['방탄소년단이 데뷔할 때 소속사 이름은? (지금의 하이브)',['빅히트 엔터테인먼트','빅플래닛','하이라인','빅스타'],'m'],
 ['SBS 〈인기가요〉는 무슨 요일에 방송될까?',['일요일','금요일','토요일','목요일'],'m'],
 ['KBS 〈뮤직뱅크〉는 무슨 요일에 방송될까?',['금요일','일요일','수요일','월요일'],'m'],
 ['Mnet 〈엠카운트다운〉은 무슨 요일에 방송될까?',['목요일','토요일','일요일','화요일'],'m'],
 ['2019년 K-팝 걸그룹 최초로 미국 코첼라 무대에 선 그룹은?',['블랙핑크','트와이스','레드벨벳','마마무'],'m'],
 ['무대에서 반주만 있는 음원을 MR이라고 한다. 목소리까지 녹음된 음원은?',['AR','VR','LR','BR'],'m'],
];
function quizPool(n){
 const early=S&&S.stage<=1;
 let pool=QUIZ.filter(q=>!(S&&S.quizSeen.includes(q[0])));
 if(pool.length<n){if(S)S.quizSeen=[];pool=QUIZ.slice()}
 const easy=shuffle(pool.filter(q=>q[2]==='e')), mid=shuffle(pool.filter(q=>q[2]==='m'));
 const ne=early?Math.ceil(n*.7):Math.ceil(n*.4);
 const out=shuffle([...easy.slice(0,ne),...mid.slice(0,n-ne)]).slice(0,n);
 if(S) out.forEach(q=>S.quizSeen.push(q[0]));
 return out;
}
async function askQuiz(qs,head){
 let ok=0;
 for(let i=0;i<qs.length;i++){
  const [q,opts,df]=qs[i], correct=opts[0], sh=shuffle(opts);
  const r=await new Promise(res=>{
   mgBox().innerHTML=`<h3>${head} ${i+1} / ${qs.length} <small style="font-size:12px;color:${df==='e'?'#9be59b':'#ffd36e'}">${df==='e'?'쉬움':'보통'}</small></h3><p style="font-size:16px;line-height:1.5">${q}</p><div class="tbar"><i id="tb2" style="width:100%"></i></div><div class="qopts">${sh.map(o=>`<button>${o}</button>`).join('')}</div><div class="judge" id="qj"></div>`;
   mgShow();
   const t0=performance.now();let done=false;
   const end=(btn)=>{if(done)return;done=true;const good=btn&&btn.textContent===correct;mgBox().querySelectorAll('.qopts button').forEach(b=>{if(b.textContent===correct)b.classList.add('ok')});if(btn&&!good)btn.classList.add('no');
    $('#qj').textContent=good?'⭕ 정답!':'❌ 땡!';$('#qj').style.color=good?'#9be59b':'#ff8fa5';good?(SFX.up(),burst(mgBox(),['⭕','✨','💯'],8)):(SFX.miss(),shake(mgBox()));setTimeout(()=>res(good),AUTO?10:1000)};
   const tick=()=>{if(done)return;const e=(performance.now()-t0)/1000;const el=$('#tb2');if(el)el.style.width=Math.max(0,100-e/12*100)+'%';if(e>12){end(null);return}requestAnimationFrame(tick)};tick();
   mgBox().querySelectorAll('.qopts button').forEach(b=>b.onclick=()=>end(b));
   if(AUTO) setTimeout(()=>end(mgBox().querySelectorAll('.qopts button')[0]),5);
  });
  if(r) ok++;
 }
 return ok;
}
async function gQuiz(sub){
 await mgIntro('📝 K-POP 상식 필기','K-POP과 아이돌 업계 상식 5문제!\n문제당 12초 안에 고르세요.',sub);
 const ok=await askQuiz(quizPool(5),'📝 문제');
 return ok*20;
}
async function quizMini(n){
 const ok=await askQuiz(quizPool(n),'💡 K-POP 퀴즈');
 mgHide();
 return ok;
}

/* 6. 인터뷰 면접 */
const INTV=[
 ['"데뷔 소감 한마디 부탁드려요!"',['"오래 기다려준 가족과 팬분들께 감사드리고, 무대로 보답하겠습니다!"','"음… 그냥 떨려요. 잘 모르겠어요."','"당연히 1위 할 거라 생각해요."']],
 ['"연습생 기간 중 가장 힘들었던 순간은?"',['"월말평가에서 순위가 떨어졌을 때요. 그래도 동기들 덕분에 버텼어요."','"너무 많아서 말 못 하겠어요, 하하."','"회사가 너무 심하게 굴렸어요."']],
 ['"멤버 중 가장 의지되는 사람은?"',['"다 의지되지만, 오늘은 늘 먼저 챙겨주는 멤버한테 고맙다고 말하고 싶어요!"','"저 자신이요!"','"음… 딱히 없어요."']],
 ['"라이벌로 생각하는 그룹이 있나요?"',['"어제의 저희가 라이벌이에요. 매일 어제보다 나아지는 게 목표예요."','"ÉCLAT요. 꼭 이기고 싶어요."','"다 별로라 없어요."']],
 ['"악성 댓글을 보면 어떤가요?"',['"속상하지만, 응원해주시는 분들 목소리에 더 귀 기울이려고 해요."','"안 봐요. 신경 안 써요."','"다 고소할 거예요."']],
 ['"수상 소감 부탁드립니다!"',['"팬분들, 멤버들, 그리고 저를 처음 가르쳐주신 선생님들께 감사드립니다!"','"와… 진짜요? (울음)"','"받을 줄 알았어요."']],
 ['"이번 앨범에서 가장 자신 있는 부분은?"',['"멤버 다섯 명의 목소리가 하나로 모이는 후렴이요. 꼭 라이브로 들어주세요!"','"전부 다요!"','"제 파트만 들으시면 돼요."']],
 ['"요즘 가장 하고 싶은 것은?"',['"팬분들 직접 만나서 감사하다고 말하는 거요. 팬사인회 기대하고 있어요!"','"자고 싶어요… 진짜로요."','"휴가요. 일 너무 많아요."']],
];
const INTV_EN=[
 ['"Welcome to the show! How does it feel to be in LA?"',['"It\'s a dream come true. Thank you so much for having us!"','"Yes. LA. Good."','"Too hot. I want to go home."']],
 ['"What\'s the meaning behind your new single?"',['"It\'s about chasing your dream even when no one believes in you."','"It\'s… a song. About love, maybe?"','"Ask my company. I don\'t know."']],
 ['"Any message for your American fans?"',['"We love you! Thank you for singing along in Korean!"','"Thank you. Bye-bye."','"Buy our album, okay?"']],
 ['"Who is your role model?"',['"The seniors who opened the way for K-pop, and my first vocal teacher in Seoul."','"Um… everyone?"','"Myself, of course."']],
 ['"How do you handle the pressure?"',['"I lean on my members, and I remind myself why I started."','"I just eat a lot."','"Pressure? I don\'t feel any."']],
];
async function gInterview(sub,en){
 const pool=en?INTV_EN:INTV, statv=en?S.english:S.interview;
 await mgIntro(en?'🇺🇸 영어 인터뷰':'🎙️ 인터뷰 면접',(en?'미국 토크쇼 진행자의 질문에 가장 좋은 영어 답변을 고르세요.':'기자·심사위원의 질문에 가장 좋은 답변을 고르세요.')+'\n\n'+(statv>=40?'⭐ 트레이닝 덕분에 모범 답안 힌트가 보여요!':'💡 '+(en?'외국어':'인터뷰')+' 40 이상이면 힌트가 보여요.'),sub);
 const qs=shuffle(pool).slice(0,3);let total=0;
 for(let i=0;i<qs.length;i++){
  const [q,ans]=qs[i];const sc=[100,50,0];const order=shuffle([0,1,2]);
  const r=await new Promise(res=>{
   mgBox().innerHTML=`<h3>${en?'🇺🇸':'🎙️'} 질문 ${i+1} / 3</h3><p style="font-size:16px;line-height:1.5">${q}</p><div class="tbar"><i id="tb2" style="width:100%"></i></div><div class="qopts">${order.map(k=>`<button data-k="${k}">${statv>=40&&k===0?'<span class="star">⭐ </span>':''}${ans[k]}</button>`).join('')}</div>`;
   const t0=performance.now();let done=false;const lim=15;
   const end=b=>{if(done)return;done=true;const k=b?+b.dataset.k:2;mgBox().querySelectorAll('.qopts button').forEach(x=>{if(+x.dataset.k===0)x.classList.add('ok')});if(b&&k!==0)b.classList.add('no');setTimeout(()=>res(sc[k]),900)};
   const tick=()=>{if(done)return;const e=(performance.now()-t0)/1000;$('#tb2').style.width=Math.max(0,100-e/lim*100)+'%';if(e>lim){end(null);return}requestAnimationFrame(tick)};tick();
   mgBox().querySelectorAll('.qopts button').forEach(b=>b.onclick=()=>end(b));
  });
  total+=r;
 }
 return clamp(Math.round(total/3+statv/10),0,100);
}


/* 7. 안무 순서 기억 */
async function gMemo(sub){
 await mgIntro('🧠 안무 순서 외우기','트레이너가 보여주는 안무 동작 순서를 잘 보고,\n똑같은 순서로 따라 누르세요!\n\n라운드마다 동작이 하나씩 늘어나요.',sub);
 const MV=[['👐','손 털기','#ff7eb6'],['🙌','손 올리기','#7ec8ff'],['💃','웨이브','#9be59b'],['🦵','킥','#ffd36e']];
 const R=4;let score=0;
 for(let r=0;r<R;r++){
  const len=3+r, seq=Array.from({length:len},()=>Math.floor(Math.random()*4));
  const ok=await new Promise(async res=>{
   mgBox().innerHTML=`<h3>🧠 라운드 ${r+1} / ${R}</h3><div class="prompt" id="mp">👀 잘 봐!</div><div class="memo">${MV.map((m,i)=>`<button data-i="${i}" style="--c:${m[2]}"><span>${m[0]}</span><small>${m[1]}</small></button>`).join('')}</div><div class="beats" id="mb">${'<i></i>'.repeat(len)}</div>`;
   const bs=[...mgBox().querySelectorAll('.memo button')];bs.forEach(b=>b.disabled=true);
   const spd=Math.max(320,620-S.dance*1.5-r*40);
   await sleep(500);
   for(const i of seq){bs[i].classList.add('lit');tone(330+i*110,.15);await sleep(spd);bs[i].classList.remove('lit');await sleep(140)}
   $('#mp').textContent='▶ 따라 해!';bs.forEach(b=>b.disabled=false);
   let k=0;
   if(AUTO){res(true);return}
   bs.forEach(b=>b.onclick=()=>{const i=+b.dataset.i;b.classList.add('lit');setTimeout(()=>b.classList.remove('lit'),150);tone(330+i*110,.1);
    if(i===seq[k]){$('#mb').children[k].className='p';k++;if(k>=len){$('#mp').textContent='PERFECT!';SFX.up();bs.forEach(x=>x.disabled=true);setTimeout(()=>res(true),500)}}
    else{$('#mb').children[k].className='m';$('#mp').textContent='MISS…';SFX.miss();shake(mgBox());bs.forEach(x=>x.disabled=true);setTimeout(()=>res(k/len),700)}});
  });
  score+= ok===true?1:ok;
 }
 return Math.round(score/R*100);
}
/* 8. 롱톤 호흡 */
async function gLongtone(sub){
 await mgIntro('🫁 롱톤 호흡','버튼을 꾹 누르고 있으면 숨 게이지가 차올라요.\n게이지가 노란 목표 구간에 들어왔을 때 손을 떼세요!\n\n보컬이 높을수록 목표 구간이 넓어져요.',sub);
 const R=4;let total=0;
 for(let r=0;r<R;r++){
  const sc=await new Promise(res=>{
   const zw=clamp(10+S.vocal/14,10,22), z0=rnd(45,88-zw);
   mgBox().innerHTML=`<h3>🫁 롱톤 ${r+1} / ${R}</h3><div class="lt"><div class="ltz" style="bottom:${z0}%;height:${zw}%"></div><div class="ltf" id="ltf"></div></div><div class="judge" id="jg"></div><button class="tap" id="lh">꾹 누르기 🎤</button>`;
   let v=0,hold=false,done=false,last=performance.now();const sp=38+r*10;
   const btn=$('#lh');
   const rel=()=>{if(!hold||done)return;hold=false;done=true;const c=z0+zw/2,d=Math.abs(v-c);const s=d<=zw/2?Math.round(100-d/(zw/2)*30):Math.max(0,Math.round(60-(d-zw/2)*4));
    $('#jg').textContent=s>=85?'PERFECT!':s>=60?'GOOD':'MISS';$('#jg').style.color=s>=85?'#ffd36e':s>=60?'#ff7eb6':'#888';s>=60?SFX.hit():SFX.miss();setTimeout(()=>res(s),600)};
   btn.addEventListener('pointerdown',e=>{e.preventDefault();if(done)return;hold=true;last=performance.now()});btn.addEventListener('pointerup',rel);btn.addEventListener('pointerleave',rel);
   const loop=t=>{if(done)return;const dt=(t-last)/1000;last=t;if(hold){v=Math.min(100,v+sp*dt);if(v>=100){rel();return}}$('#ltf').style.height=v+'%';requestAnimationFrame(loop)};requestAnimationFrame(loop);
   if(AUTO){done=true;res(80)}
  });
  total+=sc;
 }
 return Math.round(total/R);
}
/* 9. 화보 촬영 */
async function gPhoto(sub){
 await mgIntro('📷 화보 촬영','움직이는 뷰파인더가 얼굴 가운데(노란 십자)에 딱 맞을 때\n셔터를 누르세요! 총 5컷.\n\n비주얼이 높을수록 뷰파인더가 천천히 움직여요.',sub);
 return new Promise(res=>{
  const N=5;let shot=0,total=0,t0=performance.now(),run=true;const pics=[];
  mgBox().innerHTML=`<h3>📷 화보 촬영 <span id="pc">0</span>/${N}</h3><div class="photo" id="ph"><div class="pbg">${girl(playerLook({bust:true,expr:'smile',crown:false}))}</div><div class="cross"></div><div class="vf" id="vf"></div><div class="flashp" id="fp"></div></div><div class="judge" id="jg"></div><button class="tap" id="sh">📸 셔터</button><div class="pics" id="pics"></div>`;
  const sp=clamp(1.6-effVis()/200,0.8,1.6);
  let vx=50,vy=50;
  const loop=t=>{if(!run)return;const e=(t-t0)/1000*sp;vx=50+32*Math.sin(e*1.7)+8*Math.sin(e*4.1);vy=45+24*Math.sin(e*2.3+1);const vf=$('#vf');if(vf){vf.style.left=vx+'%';vf.style.top=vy+'%'}requestAnimationFrame(loop)};requestAnimationFrame(loop);
  const shoot=()=>{if(!run)return;const d=Math.hypot(vx-50,vy-45);const s=Math.max(0,Math.round(100-d*3.2));total+=s;shot++;$('#pc').textContent=shot;
   const fp=$('#fp');fp.classList.remove('go');void fp.offsetWidth;fp.classList.add('go');tone(1800,.04,'square',.05);tone(900,.06,'square',.04,.05);
   $('#jg').textContent=s>=85?'인생샷!':s>=55?'괜찮은 컷':'흔들렸다…';$('#jg').style.color=s>=85?'#ffd36e':s>=55?'#ff7eb6':'#888';
   $('#pics').insertAdjacentHTML('beforeend',`<span class="${s>=85?'best':''}">${s>=85?'🌟':s>=55?'📸':'💨'}</span>`);
   if(shot>=N){run=false;setTimeout(()=>res(Math.round(total/N)),700)}};
  $('#sh').onclick=shoot;keyHandler=(e,d)=>{if(d&&e.code==='Space'){e.preventDefault();shoot()}};
  if(AUTO){run=false;res(75)}
 });
}

const GAMES={
 tap:{name:'🎵 박자 감각',fn:gTap},
 pitch:{name:'🎤 노래 실기',fn:gPitch},
 ddr:{name:'💃 댄스 실기',fn:gDDR},
 camera:{name:'📸 카메라 테스트',fn:gCamera},
 quiz:{name:'📝 K-POP 상식 필기',fn:gQuiz},
 interview:{name:'🎙️ 인터뷰 면접',fn:s=>gInterview(s,false)},
 interview_en:{name:'🇺🇸 영어 인터뷰',fn:s=>gInterview(s,true)},
 memo:{name:'🧠 안무 순서 외우기',fn:gMemo},
 longtone:{name:'🫁 롱톤 호흡',fn:gLongtone},
 photo:{name:'📷 화보 촬영',fn:gPhoto},
};
async function runTests(list,title){
 let sum=0;
 for(let i=0;i<list.length;i++){
  const g=GAMES[list[i]];
  let sc=await g.fn(`${title} · 실기 ${i+1}/${list.length}`);keyHandler=null;
  const sb=skillBonus(list[i]);if(sb)sc=Math.min(100,sc+sb);
  await mgResult(g.name,sc,sb?`✨ 스킬 보너스 +${sb}`:'');
  sum+=sc;
 }
 mgHide();
 return Math.round(sum/list.length);
}
