/* ============ 비주얼노벨 엔진 ============ */
const subT=t=>!S?t:t.replace(/\{name\}/g,S.name).replace(/\{grp\}/g,S.group||'우리 팀').replace(/\{ag\}/g,agObj()?agObj().name:'회사').replace(/\{rival\}/g,rivalCo());
function vnPortrait(who,expr){
 const p=$('#vnPort'), nm=$('#vnName');
 if(!who){p.innerHTML='';nm.style.display='none';return}
 nm.style.display='block';
 if(who==='me'){p.className='r pop';p.innerHTML=portrait('me',expr);nm.textContent=S.name;nm.className='vnName r';return}
 const c=CAST[who];
 if(c){S.met[who]=1;p.className='l pop';p.innerHTML=portrait(who,expr);nm.textContent=c.name;nm.className='vnName';}
 else{p.innerHTML='';nm.textContent=who;nm.className='vnName'}
}
function vnSay(who,text,expr){
 return new Promise(res=>{
  vnPortrait(who,expr);
  const el=$('#vnText'); el.className=who?'':'nar'; $('#vnCh').innerHTML=''; $('#vnNext').style.display='none';
  const full=subT(text); let i=0, typing=true;
  const step=()=>{if(!typing)return;i+=2;el.textContent=full.slice(0,i);if(i%6===0)SFX.blip();if(i>=full.length){typing=false;$('#vnNext').style.display='block';return}setTimeout(step,FAST?6:22)};
  step();
  const box=$('#vn');
  const click=()=>{if(typing){typing=false;el.textContent=full;$('#vnNext').style.display='block';return}box.onclick=null;keyHandler=null;res()};
  box.onclick=click; keyHandler=(e,d)=>{if(d&&(e.code==='Space'||e.code==='Enter'||e.code==='KeyZ')){e.preventDefault();click()}};
 });
}
function vnChoose(opts){
 return new Promise(res=>{
  $('#vnNext').style.display='none'; $('#vn').onclick=null;
  $('#vnCh').innerHTML=opts.map((o,i)=>`<button data-i="${i}">▶ ${subT(o)}</button>`).join('');
  $('#vnCh').querySelectorAll('button').forEach(b=>b.onclick=e=>{e.stopPropagation();SFX.sel();$('#vnCh').innerHTML='';res(+b.dataset.i)});
 });
}
function effToast(d,aff,sty){
 const parts=Object.entries(d||{}).filter(([k,v])=>v&&k!=='money').map(([k,v])=>`${LBL[k]}${v>0?'+':''}${v}`);
 for(const [k,v] of Object.entries(aff||{})) if(v) parts.push(`${v>0?'💗':'💔'}${CAST[k].name.replace(' 쌤','쌤')}${v>0?'+':''}${v}`);
 for(const [k,v] of Object.entries(sty||{})) if(v) parts.push(`🎨${CONCEPT[k]}+${v}`);
 if(parts.length){toast(parts.join(' · '));SFX.up()}
}
// 선택지: O(텍스트, 능력치, 호감도, 성향, 다음대사, 조건)
const O=(t,e,a,s,n,c)=>({t,e,a,s,n,c});
async function runScript(nodes){
 for(const n of nodes||[]){
  if(S.ended) return;
  if(Array.isArray(n)) await vnSay(n[0],n[1],n[2]);
  else if(n.c){
   const opts=n.c.map(o=>Array.isArray(o)?O(o[0],o[1],o[2],o[5],o[3],o[4]):o).filter(o=>!o.c||o.c());
   const i=await vnChoose(opts.map(o=>o.t)); const o=opts[i];
   const d=o.e?apply(o.e):{}; if(o.a) for(const k in o.a) S.aff[k]=(S.aff[k]||0)+o.a[k];
   if(o.s) for(const k in o.s) S.style[k]+=o.s[k];
   effToast(d,o.a,o.s); render();
   if(o.n) await runScript(o.n);
  } else if(n.ask){
   const order=shuffle(n.opts.map((t,i)=>({t,i})));
   const i=await vnChoose(order.map(o=>o.t)); const good=order[i].i===0;
   if(good){SFX.up();burst($('#vnBox'),['⭕','✨'],8);const d=apply(n.ok||{});effToast(d,n.okA);if(n.okA)for(const k in n.okA)S.aff[k]+=n.okA[k];await runScript(n.okL||[])}
   else{SFX.miss();shake($('#vnBox'));const d=apply(n.ng||{});effToast(d);await runScript(n.ngL||[])}
   render();
  } else if(n.pop){$('#vn').classList.add('dim');await cutscene(n.pop,n);$('#vn').classList.remove('dim')}
  else if(n.quiz){$('#vn').classList.add('dim');const ok=await quizMini(n.quiz);$('#vn').classList.remove('dim');const d={};for(const k in (n.per||{}))d[k]=n.per[k]*ok;const r=apply(d);effToast(r,n.perA&&ok>=2?n.perA:null);if(n.perA&&ok>=2)for(const k in n.perA)S.aff[k]+=n.perA[k];await runScript(n.after?n.after(ok):[])}
  else if(n.f){const r=await n.f(); if(r) await runScript(r);}
 }
}
async function playEp(ep){
 if(!ep) return;
 if(ep.id) S.done[ep.id]=1;
 $('#vnText').textContent='';$('#vnPort').innerHTML='';$('#vnCh').innerHTML='';$('#vnName').style.display='none';
 const t=$('#vnTitle'); t.innerHTML=`💬 ${subT(ep.title)}${ep.place?`<small>📍 ${subT(ep.place)}</small>`:''}`; t.style.display='block';
 $('#vn').classList.add('show');SFX.door();
 await runScript(ep.script);
 $('#vn').classList.remove('show'); t.style.display='none'; keyHandler=null; render();
}
const fx=(d,txt)=>({f:()=>{const r=apply(d);effToast(r);return txt?[['',txt]]:null}});
const setF=(k,v=true)=>({f:()=>{S.flags[k]=v}});

/* ============ 메인 스토리 ============ */
const EPI={
'0_0':{title:'첫 수업',place:'K-아카데미 3층 보컬 강의실',script:[
 ['','서교동 K-아카데미 3층. 낡은 피아노와 방음벽, 그리고 열두 명의 낯선 얼굴.'],
 ['mikyung','자, 오늘부터 보컬 맡은 윤미경이에요. 다들 왜 왔는지는 알죠?'],
 ['mikyung','데뷔하고 싶어서. 근데 미리 말해둘게. 여기서 데뷔까지 가는 애는 1년에 한두 명이야.','normal'],
 ['harin','(속닥) 와… 첫날부터 무섭다. 나 서하린! 부산에서 올라왔어. 너는 어떤 가수 되고 싶어?','happy'],
 {c:[
  O('"무대에서 한 번 보면 잊을 수 없는, 강렬한 가수!"',{dance:1},{harin:1},{charisma:2},[['harin','오, 카리스마파구나! 멋있다.','surprise']]),
  O('"노래 한 소절로 사람 마음을 울리는 가수."',{vocal:1},{harin:1},{pure:2},[['harin','와, 감성파네. 나 그런 거 약한데.','smile']]),
  O('"보기만 해도 기분 좋아지는, 에너지 넘치는 가수!"',{social:1},{harin:2},{bright:2},[['harin','완전 나랑 같네! 우리 잘 맞겠다!','happy']]),
 ]},
 ['mikyung','거기 둘, 수다는 쉬는 시간에. …{name}, 마침 잘됐네. 하나 물어볼게.','normal'],
 {ask:true,opts:['"배(아랫배)로 숨을 채워요."','"가슴을 크게 부풀려요."','"어깨를 들어 올리며 마셔요."'],ok:{vocal:3},okA:{mikyung:1},okL:[['mikyung','정답. 복식호흡. 첫날부터 아는 애는 드물어.','smile']],ng:{vocal:1},ngL:[['mikyung','아니야. 숨은 배로. 어깨가 올라가면 소리가 떠. 다음 시간까지 연습해 와.','normal']]},
]},
'0_1':{title:'K-POP 퀴즈 대결',place:'아카데미 휴게실',script:[
 ['harin','{name}! 쉬는 시간에 K-POP 퀴즈 대결 하자! 진 사람이 바나나우유 사기!','happy'],
 ['jiyu','…유치하긴. 근데 나도 껴도 돼? 바나나우유 좋아하거든.','smug'],
 ['','처음 보는 아이였다. 거울 앞 맨 앞줄에서 숨도 안 차던 그 아이. 강지유.'],
 {quiz:3,per:{variety:1,interview:1},perA:{harin:1,jiyu:1},after:ok=>ok>=2?[['jiyu','…제법인데? 이번엔 내가 산다.','smile'],['harin','와 지유가 웃었어!','surprise']]:[['jiyu','훗. 바나나우유 두 개.','smug'],['harin','다음엔 꼭 이긴다!','sad']]},
 ['leo','헤이! 퀴즈 열기 좋다! 그 열정 그대로 댄스실로 가자고~','happy'],
 ['leo','난 댄스 담당 레오. 그나저나 {name}, 하나만 물어보자. 8카운트에서 "앤(and)"은 언제야?','smile'],
 {ask:true,opts:['"박자와 박자 사이, 반 박자요."','"8번째 박자 끝이요."','"음악이 멈추는 순간이요."'],ok:{dance:3},okA:{leo:1},okL:[['leo','정답! 춤은 그 반 박자에서 갈린다.','happy']],ng:{dance:1},ngL:[['leo','땡~ "원 앤 투"의 "앤"은 박자 사이 반 박자야. 오늘부터 몸에 새기자!','smile']]},
]},
'0_2':{title:'밤 9시의 노래',place:'불 꺼진 아카데미 연습실',script:[
 ['','레슨이 끝난 밤 9시. 불 꺼진 연습실에서 누군가 노래하고 있었다.'],
 ['','숨이 멎을 만큼 맑은 목소리. 그런데 문이 열리는 소리에 노래가 뚝 끊겼다.'],
 ['chaewon','아… 죄송해요. 아무도 없는 줄 알고…','shy'],
 ['chaewon','…사람들 앞에 서면 목이 잠겨요. 숨이 안 쉬어져요.','sad'],
 {c:[
  O('"매일 밤 같이 남아서 연습하자. 관객 1명부터 시작!"',{stress:5,vocal:1},{chaewon:3},{pure:1},[['chaewon','…정말요? 매일요? (작게 웃는다)','smile'],['','그날부터 밤 9시는 둘만의 작은 공연 시간이 되었다.']]),
  O('"네 노래 녹음해서 들려줘도 돼? 진짜 좋아서."',{social:1},{chaewon:1},{bright:1},[['chaewon','녹음은… 조금 부끄럽지만, 괜찮아요.','shy']]),
  O('"떨리면 떨리는 대로 부르는 것도 멋있어. 그게 너만의 색이야."',{mind:1},{chaewon:2},{charisma:1},[['chaewon','…떨리는 대로. 그런 생각은 못 해봤어요.','surprise']]),
 ]},
]},
'0_3':{title:'언덕길의 할머니',place:'아카데미 가는 언덕길',script:[
 ['','아카데미 가는 언덕길. 장바구니 두 개를 든 할머니가 계단 앞에서 멈춰 서 있다.'],
 ['granny','아이고… 이놈의 계단은 해마다 길어지는 것 같네.','tired'],
 ['','레슨 시작까지 10분. 오늘은 미경쌤 수업이다.'],
 {c:[
  O('장바구니를 들어드린다 (레슨에 늦는다)',{mind:3,stress:3},{granny:2,mikyung:-1},null,[{pop:'granny',cap:'"아이고, 고마워라. 학생 이름이 뭐야?"\n"{name}이요!"\n"{name}… 할미가 기억해 둘게. 꼭 텔레비전에서 보자."'},['','레슨에는 5분 늦었다. 미경쌤의 눈초리가 따가웠다.']]),
  O('택시를 불러드리고 뛰어간다 (택시비 20G)',{money:-20,vocal:1},{granny:1},null,[['granny','아이고, 학생 돈을… 고마워. 꼭 잘될 거야!','happy']]),
  O('목례만 하고 레슨에 늦지 않게 뛰어간다',{vocal:2},{mikyung:1},null,[['','레슨에는 딱 맞춰 도착했다. 미경쌤이 고개를 끄덕였다.']]),
 ]},
]},
'0_5':{title:'오디션 전날',place:'편의점 앞 파라솔',script:[
 ['','오디션 전날 밤. 편의점 앞 파라솔 테이블, 바나나우유 두 개.'],
 ['harin','내일이다… {name}, 내일 무슨 곡 할 거야?','normal'],
 {c:[
  O('"애절한 발라드. 목소리로 승부할래."',{vocal:2},{harin:1},{pure:2},[['harin','네 목소리면 심사위원 울겠다.','smile']]),
  O('"걸크러시 댄스곡. 첫 3초에 시선 뺏을 거야."',{dance:2},{harin:1},{charisma:2},[['harin','와, 그 눈빛 벌써 무섭다.','surprise']]),
  O('"신나는 곡! 보는 사람이 웃게 만들고 싶어."',{social:2},{harin:2},{bright:2},[['harin','역시 너답다! 나도 같이 신나겠다.','happy']]),
 ]},
 {f:()=>S.aff.chaewon>=2?[{pop:'chat',from:'민채원',msgs:[['','내일… 저도 오디션 지원했어요.'],['','{name} 덕분이에요. 고마워요.'],['me','진짜?! 같이 붙자!! 🔥']],cap:'채원에게서 문자가 왔다.'}]:null},
 {pop:'chat',from:'윤미경 쌤',msgs:[['','내일은 잘하려고 하지 말고, 연습한 만큼만 해.'],['','그거면 충분해.'],['me','네 쌤! 꼭 붙을게요 💪']],cap:'미경쌤의 응원 문자'},
]},
'1_0':{title:'스톤웨이브 첫 출근',place:'스톤웨이브 엔터 · 상가 4층 사무실',script:[
 ['','스톤웨이브 엔터테인먼트. 상가 건물 4층 사무실, 지하 1층 연습실.'],
 ['woojin','어서 와요. 매니저 정우진이에요. 직원이 열두 명이라 나는 매니저 겸 운전 겸… 뭐, 다 해.','happy'],
 ['harin','{name}!! 나도 붙었어! 우리 또 같은 회사야!','happy'],
 {f:()=>S.aff.chaewon>=2?(S.flags.chaewon=true,[['chaewon','저… 저도요. 오디션장에서 처음으로 목이 안 잠겼어요.','shy']]):(S.flags.chaewonQuit=true,[['','채원은 오디션장에 오지 않았다. 아카데미도 그만뒀다고 했다.']])},
 ['woojin','솔직히 말할게. 우리 회사에서 바로 데뷔는 어려워. 대신 대형 기획사 오디션까지 확실히 밀어줄게.','normal'],
 ['woojin','그 전에 퀴즈 하나. 음악방송 사전녹화는 보통 언제 할까?','smile'],
 {ask:true,opts:['"방송 당일 새벽~아침이요."','"방송 일주일 전이요."','"방송 끝난 다음 날이요."'],ok:{interview:2,mind:1},okA:{woojin:1},okL:[['woojin','오, 정답. 새벽 4시 기상은 기본이야. 지금부터 몸에 익혀 둬.','happy']],ng:{stress:2},ngL:[['woojin','땡. 당일 새벽부터야. 아이돌의 하루는 해 뜨기 전에 시작해.','normal']]},
]},
'1_2':{title:'지유의 소식',place:'B1 연습실 구석',script:[
 ['harin','야야 이거 봐. 강지유, SW 엔터 연습생 됐대. 회사 공식 SNS에 떴어.','surprise'],
 {pop:'sns',user:'swmedia_official',expr:'smug',cap:'SW 엔터 공식 계정에 지유의 연습생 프로필이 올라왔다.',tag:'#SW_NEW_TRAINEE',cm:['비주얼 뭐야…','엄마가 가수였대!','데뷔 언제 해요?'],look:'jiyu'},
 {c:[
  O('축하 메시지를 보낸다',{mind:1},{jiyu:2},null,[['jiyu','(답장) …ㅇㅇ 고마워. 너도 빨리 올라와.','normal']]),
  O('조용히 연습실 불을 다시 켠다',{dance:2,stress:3},{},{charisma:1},[['','…지기 싫다.']]),
  O('"우린 우리 속도로 가자!" 하린과 하이파이브',{stress:-4},{harin:1},{bright:1},[['harin','그래! 우리 속도로!','happy']]),
 ]},
]},
'1_4':{title:'막차',place:'밤 11시 40분, 2호선',script:[
 ['','막차 지하철. 하린과 나란히 앉아 꾸벅꾸벅 졸고 있었다.'],
 ['harin','{name}… 나 가끔 무서워. 고향 친구들은 다 대학 얘기하는데, 나만 여기 있는 거.','sad'],
 {c:[
  O('"나도 무서워. 그러니까 같이 가자. 끝까지."',{social:1},{harin:2},{pure:1},[['harin','…응. 끝까지.','smile']]),
  O('"무서운 건 잘하고 싶어서야. 내일 아침 러닝 같이 하자."',{body:2},{harin:1},{charisma:1},[['harin','하… 너 진짜 독하다. 좋아.','happy']]),
  O('"주말에 부산 바다 보러 가자! 기분 전환!"',{stress:-8,money:-40},{harin:2},{bright:1},[['harin','진짜?! 우리 엄마 회 사준대!','happy']]),
 ]},
]},
'1_6':{title:'미경쌤의 특강',place:'B1 연습실',script:[
 ['mikyung','오랜만. 실장님한테 부탁받아서 특강 왔어.','smile'],
 ['mikyung','그리고… 나 이번 대형 기획사 공개 오디션에 외부 보컬 심사위원으로 들어가. 봐주는 건 없어.','normal'],
 ['mikyung','대신 질문 하나. 노래할 때 "공명"을 가장 잘 느낄 수 있는 곳은?','normal'],
 {ask:true,opts:['"코와 얼굴 앞쪽(마스크 부분)이요."','"발끝이요."','"등 뒤쪽이요."'],ok:{vocal:3},okA:{mikyung:1},okL:[['mikyung','맞아. 소리를 얼굴 앞에 걸어. 많이 컸네.','happy']],ng:{vocal:1},ngL:[['mikyung','아니야. 코와 광대 쪽, 얼굴 앞에서 울려야 해. 다시 해 보자.','normal']]},
 {c:[
  O('자신 있는 고음 파트를 부른다',{vocal:2},{mikyung:1},{charisma:1},[['mikyung','고음은 좋아. 근데 중음이 네 진짜 무기야.','smile']]),
  O('약점인 저음 파트를 부른다',{vocal:3,stress:4},{mikyung:2},{pure:1},[['mikyung','약한 걸 먼저 보여주는 애는 드물어.','happy']]),
 ]},
]},
'2_0':{title:'30명의 연습생',place:'{ag} 연습생 대기실',script:[
 ['','{ag} 연습생 대기실. 30명의 눈이 일제히 문 쪽을 봤다.'],
 {f:()=>S.aff.harin>=3?(S.flags.harinTeam=true,[['harin','(손 흔들며) {name}! 나도 여기 붙었어! 네가 여기 지원한다길래 따라왔지!','happy']]):(S.flags.harinOther=true,[['','하린은 다른 대형 기획사로 갔다. 단톡방엔 "꼭 무대에서 만나자!"라는 메시지가 남아 있었다.']])},
 {f:()=>S.flags.chaewon&&S.aff.chaewon>=3?(S.flags.chaewonTeam=true,[['chaewon','저도… 왔어요. 이번엔 노래 끝까지 불렀어요.','smile']]):null},
 {pop:'meet',who:'rena',cap:'오사카에서 온 연습생, 미나토 레나.'},
 ['rena','안녕하세요! 미나토 레나예요. 한국어… 아직 조금 이상해요.','happy'],
 {c:[
  O('"반가워! 한국어는 내가 도와줄게."',{social:2},{rena:2},{pure:1},[['rena','진짜요?! 그럼 저는 영어랑 일본어 알려줄게요!','happy']]),
  O('"日本語、少しできるよ! (일본어 조금 해!)"',{english:2},{rena:2},{bright:1},[['rena','えー! 발음 좋아요!','surprise']]),
  O('"여기선 다 라이벌이야. 그래도 잘 지내자."',{dance:1},{rena:1},{charisma:1},[['rena','…쿨하다. 좋아요, 라이벌!','smug']]),
 ]},
]},
'2_2':{title:'새벽 2시의 오코노미야키',place:'연습실 구석',script:[
 ['','평가 전날 새벽 2시. 연습실 구석에서 레나가 휴대폰을 보며 울고 있었다.'],
 ['rena','엄마가… 오코노미야키 사진 보냈어요. 바보 같죠.','sad'],
 {c:[
  O('"편의점 가자! 비슷한 거라도 먹자."',{stress:-5,diet:-1},{rena:2},{bright:1},[['rena','…한국 편의점은 최고예요.','smile']]),
  O('"내일 평가 끝나고 같이 만들자. 지금은 한 번만 더 맞춰 보자."',{dance:2,stress:3},{rena:1},{charisma:1},[['rena','…네! 같이 하면 안 무서워요.','smile']]),
  O('말없이 옆에 앉아 있어 준다',{mind:2},{rena:2},{pure:1},[['rena','…{name}은 좋은 사람이에요.','smile']]),
 ]},
]},
'2_4':{title:'빈자리',place:'연습생 대기실',script:[
 ['','월말평가 다음 날, 연습생 한 명의 자리가 비어 있었다. 2년 차 연습생 수아.'],
 ['trainee','수아 언니 계약 해지래… 어제 평가 끝나고 바로.','sad'],
 {c:[
  O('수아에게 응원 메시지를 보낸다',{mind:2,stress:2},{},{pure:1},[{pop:'chat',from:'수아 언니',msgs:[['me','언니… 그동안 고마웠어요.'],['','고마워. 나 대신 꼭 데뷔해. 진짜로.']],cap:''}]),
  O('수아 언니의 연습일지를 빌려 읽는다',{vocal:2,dance:1},{},{charisma:1},[['','빼곡한 피드백. "나는 왜 표정이 늦을까."… 이 페이지를 잊지 않기로 했다.']]),
  O('동기들을 모아 다 같이 떡볶이를 먹는다',{social:3,stress:-5},{trainee:1},{bright:1},[['trainee','…고마워. 혼자였으면 울었을 거야.','sad']]),
 ]},
]},
'2_6':{title:'지유와 재회',place:'방송사 연습생 합동 쇼케이스 리허설',script:[
 {f:()=>S.agency==='sw'?[['jiyu','…왔네. 여기까지.','smug'],['jiyu','같은 회사라도 봐주는 거 없어. 데뷔조 자리는 다섯 개야.','normal']]:[['','SW 엔터 대기실에서 지유가 나왔다.'],['jiyu','…{ag}? 생각보다 빨리 올라왔네.','smug']]},
 {c:[
  O('"바나나우유 빚 아직 안 갚았다?"',{stress:-4},{jiyu:2},{bright:1},[['jiyu','…그걸 아직도 기억해? (피식 웃는다)','smile']]),
  O('"이번엔 내가 이길 거야."',{dance:2,stress:3},{jiyu:1},{charisma:2},[['jiyu','좋아. 그 말, 무대에서 확인할게.','smug']]),
  O('"네 무대 보고 많이 배웠어. 진심이야."',{mind:2},{jiyu:2},{pure:1},[['jiyu','……갑자기 그러면 할 말 없잖아.','shy']]),
 ]},
]},
'3_0':{title:'데뷔조 첫 회의',place:'데뷔조 숙소 거실',script:[
 ['woojin','다들 안녕. …놀랐지? 나 {ag}로 이직했어. 오늘부터 너희 팀 매니저야.','happy'],
 {f:()=>[['',`데뷔조 멤버: ${teamNames().join(', ')}`]]},
 ['woojin','6개월 뒤 쇼케이스. 오늘은 데뷔 콘셉트 회의야. 회사는 너희 의견을 듣고 싶대.','normal'],
 {c:[
  O('"청순하고 맑은 콘셉트. 목소리가 먼저 들리는 팀이요."',{vocal:2},{},{pure:3},[{f:()=>{S.concept='pure'}},['woojin','"청순". 흰 원피스, 맑은 보컬. 대표님이 좋아하시겠다.','smile']]),
  O('"걸크러시. 첫 무대부터 압도하는 팀이요."',{dance:2},{},{charisma:3},[{f:()=>{S.concept='charisma'}},['woojin','"걸크러시". 블랙, 칼군무. 강렬하다!','surprise']]),
  O('"하이틴! 보기만 해도 신나는 팀이요."',{social:2},{},{bright:3},[{f:()=>{S.concept='bright'}},['woojin','"하이틴". 컬러풀, 에너지. 챌린지각이다!','happy']]),
 ]},
 {f:()=>[['',`🎨 데뷔 콘셉트: ${CONCEPT[S.concept]} — 데뷔곡 "${CONCEPT_SONG[S.concept]}"\n(쇼케이스에서 콘셉트에 맞는 코디를 입으면 보너스!)`]]},
]},
'3_1':{title:'레오쌤의 귀환',place:'{ag} 안무 연습실',script:[
 ['','안무 미팅 날. 안무가 소개에 익숙한 이름이 있었다.'],
 {pop:'meet',who:'leo',cap:'"헤이, {name}! 기억하지? 이번 데뷔곡 안무, 내가 짰다."'},
 ['leo','아카데미 때 네 표정 보고 생각했지. 저 애 데뷔하면 내가 안무 짠다고.','smile'],
 ['leo','킬링 파트 동작, 두 가지 버전이 있어. 네가 골라.','normal'],
 {c:[
  O('난이도 높은 버전 (멋있지만 실수 위험)',{dance:4,stress:6},{leo:1},{charisma:1},[['leo','역시! 대신 실수하면 바로 티 난다?','happy']]),
  O('표정이 잘 보이는 버전 (카메라 친화)',{visual:3,dance:1},{leo:1},{pure:1},[['leo','영리한데? 엔딩 요정 노리는구나.','smile']]),
  O('팬들이 따라 하기 쉬운 버전 (챌린지용)',{variety:2,dance:2},{leo:1},{bright:1},[['leo','챌린지 터지겠다! 좋아.','happy']]),
 ]},
]},
'3_3':{title:'리더 정하기',place:'데뷔조 숙소 거실',script:[
 ['woojin','리더를 정해야 해. 회사는 너희끼리 정하라네.','normal'],
 {f:()=>S.flags.harinTeam?[['harin','난 {name} 추천! 아카데미 때부터 제일 독했어.','happy']]:[['rena','저는 {name} 좋아요! 제일 많이 챙겨줬어요.','happy']]},
 {c:[
  O('"제가 해볼게요." (책임감 ↑, 스트레스 ↑)',{mind:3,social:2,stress:6},{},{charisma:1},[setF('leader'),['woojin','좋아. 리더는 책임지는 자리야.','smile']]),
  O('"저는 실력에 집중하고 싶어요. 다른 멤버를 추천할게요."',{vocal:2,dance:2},{harin:1,rena:1},{pure:1},[['woojin','그것도 팀을 위한 선택이지.','smile']]),
 ]},
]},
'3_4':{title:'그룹명 회의',place:'{ag} 회의실',script:[
 ['woojin','회사에서 그룹명 후보를 받는대. 너희가 낸 이름이 채택될 수도 있어.','smile'],
 {f:async()=>{await dialog({title:'우리 그룹의 이름은?',body:'데뷔 후 평생 불릴 이름. 신중하게!',input:'VELVA',choices:['이 이름으로 제출!']});S.group=lastInput||'VELVA';return [['woojin',`"${S.group}"… 좋다. 대표님도 마음에 들어 하실 거야.`,'happy']]}},
]},
'4_0':{title:'대기실 인사',place:'음악방송 〈M카운트업〉 대기실 복도',script:[
 ['','데뷔 첫 음악방송. 앨범 CD를 한 아름 안고 복도에 섰다. 선배 대기실 인사 돌기.'],
 {c:[
  O('모든 대기실을 빠짐없이 돈다',{mind:2,social:2,body:-2},{seoa:1},{pure:1},[{pop:'meet',who:'seoa',cap:'"어, {grp}? 데뷔 축하해요. 무대 기대할게요."\nEIVE 원서아. 화면보다 훨씬 빛났다.'}]),
  O('리허설 동선을 한 번 더 맞춘다',{dance:2},{},{charisma:1},[['woojin','…인사도 실력이야. 다음엔 꼭 가자.','normal']]),
  O('대기실 비하인드 영상을 찍는다',{fame:15,variety:1},{},{bright:1},[{pop:'sns',user:'official',cap:'데뷔 첫 음방 비하인드 업로드!',cm:['신인 맞아? 너무 귀여워','대기실 브이로그 더 줘요','첫 음방 축하해!!'],tag:'#데뷔 #첫음방'}]),
 ]},
]},
'4_1':{title:'ÉCLAT 데뷔',place:'음악방송 사전녹화장',script:[
 {f:()=>[['',`같은 주, ${rivalCo()}의 신인 걸그룹 ÉCLAT(에끌라)가 데뷔했다. 센터는 강지유.`]]},
 ['jiyu','{grp}. 같은 주 데뷔네. 1위 후보에서 만나자.','smug'],
 {c:[
  O('"선의의 경쟁 하자!"',{mind:1},{jiyu:2},{pure:1},[['jiyu','…선의는 모르겠고, 경쟁은 할게.','smile']]),
  O('"우리가 이길 거야."',{dance:1},{jiyu:1},{charisma:1},[['jiyu','그래야 재밌지.','smug']]),
  O('"같이 챌린지 찍을래? 화제 되겠다!"',{fame:20},{jiyu:1},{bright:1},[['jiyu','…라이벌이랑 챌린지라니. 재밌겠네.','smile'],{pop:'sns',cap:'라이벌 그룹 센터 투샷 챌린지가 화제!',cm:['이 조합 뭐야ㅠㅠ','아카데미 동기였대!','라이벌 서사 미쳤다'],tag:'#챌린지'}]),
 ]},
]},
'4_2':{title:'예능 녹화장의 PD',place:'〈놀라운 주말〉 녹화장',script:[
 ['','예능 첫 녹화. 메인 PD가 대기실로 직접 찾아왔다.'],
 ['pd','안녕하세요, 〈놀라운 주말〉 고은성 PD입니다. 혹시… {name} 씨?','normal'],
 {f:()=>S.aff.granny>=2?(S.flags.grannyReveal=true,[
  ['pd','저희 어머니가 TV 보시다가 소리를 지르셨어요. "저 학생이 할미 장바구니 들어준 애야!"','happy'],
  {pop:'granny',cap:'…아카데미 언덕길의 그 할머니!\n"{name}아! 할미가 텔레비전에서 보자고 했지? 아이고 장하다!"'},
  ['pd','어머니가 꼭 섭외하라고 성화셔서요. 하하. 다음 달 특집 고정 게스트, 어떠세요?','smile'],
  {f:()=>{const r=apply({variety:5,fame:30});S.varietyCount++;effToast(r);S.aff.granny++;return [['','💗 언덕길의 인연이 예능 섭외로 돌아왔다!']]}}]):[['pd','리액션이 좋다는 얘기 들었어요. 오늘 잘 부탁해요.','smile']]},
 {c:[
  O('몸 개그도 불사한다',{variety:3,fame:10},{pd:1},{bright:2},[['pd','하하! 신인이 이렇게 몸을 던지다니!','happy']]),
  O('차분한 리액션으로 반전 매력',{interview:2},{pd:1},{pure:1},[['pd','오, 묘한 매력이 있네요.','smile']]),
  O('승부욕을 불태운다',{dance:1,fame:8},{pd:1},{charisma:2},[['pd','눈빛 봐! 이거 그림 나온다!','surprise']]),
 ]},
]},
'4_4':{title:'1위 후보 대기실',place:'〈M카운트업〉 생방송 직전',script:[
 ['','이번 주 1위 후보: {grp} vs ÉCLAT.'],
 ['jiyu','…떨리지? 나도야. 처음 말하는 건데.','normal'],
 {c:[
  O('"끝나고 누가 이기든 떡볶이 먹자."',{stress:-5},{jiyu:2},{bright:1},[['jiyu','…아카데미 때 하린이가 맨날 하던 말이네. 좋아.','smile']]),
  O('"오늘은 우리 거야."',{stress:2,dance:1},{jiyu:1},{charisma:1},[['jiyu','…그래. 그래야 내 라이벌이지.','smug']]),
  O('"떨리는 건 진심이라서야. 우리 둘 다."',{mind:2},{jiyu:2},{pure:1},[['jiyu','…너 가끔 미경쌤처럼 말해.','smile']]),
 ]},
]},
'4_3':{title:'첫 컴백 회의',place:'{ag} A&R 회의실',script:[
 ['arteam','안녕하세요, A&R 팀장 서윤이에요. 첫 컴백 데모가 세 곡 들어왔어요. 타이틀은 여러분이 골라 보세요.','smile'],
 {c:[
  O('🎻 감성 발라드 댄스 "새벽 세 시의 편지" (보컬 강조)',{vocal:3},{},{pure:2},[{f:()=>comeback('새벽 세 시의 편지','vocal')}]),
  O('🔥 강렬한 퍼포먼스곡 "BURN" (댄스 강조)',{dance:3},{},{charisma:2},[{f:()=>comeback('BURN','dance')}]),
  O('🍭 중독성 챌린지곡 "젤리팝" (화제성 강조)',{variety:3},{},{bright:2},[{f:()=>comeback('젤리팝','variety')}]),
 ]},
]},
'5_3':{title:'정규 1집 타이틀곡',place:'{ag} A&R 회의실',script:[
 ['arteam','정규 1집이에요. 이번 타이틀이 연말 시상식을 좌우할 거예요. 신중하게!','normal'],
 {c:[
  O('🌙 웅장한 콘셉트곡 "MOONRISE" (무대 강조)',{dance:2,vocal:2},{},{charisma:2},[{f:()=>comeback('MOONRISE','dance')}]),
  O('🌸 대중픽 청량곡 "봄의 끝에서" (음원 강조)',{vocal:3},{},{pure:2},[{f:()=>comeback('봄의 끝에서','vocal')}]),
  O('🎉 파티 댄스곡 "SUPER STAR" (화제성 강조)',{variety:3},{},{bright:2},[{f:()=>comeback('SUPER STAR','variety')}]),
 ]},
]},
'5_0':{title:'스케줄 지옥',place:'숙소 거실, 새벽 1시',script:[
 ['','하루 수면 3시간. 숙소 거실에 날 선 말이 오갔다.'],
 {f:()=>S.flags.harinTeam&&S.flags.chaewonTeam?[['harin','채원아, 너 오늘 리허설 또 늦었잖아!','sad'],['chaewon','…잠을 못 잤어요. 미안해요.','sad']]:[['rena','다들… 조금 쉬어요. 너무 날카로워요.','sad']]},
 {c:[
  O('매니저에게 하루 휴식을 요청한다',{stress:-15,fame:-10},{woojin:1},{pure:1},[['woojin','…알았어. 스케줄 하나 뺄게. 대신 팬들한테 미안한 건 감수하자.','normal']]),
  O('다 같이 라면 먹으며 속마음 터놓기',{social:4,stress:-6},{harin:1,rena:1,chaewon:1},{bright:1},[['','라면 다섯 개. 웃다 보니 다들 울고 있었다.']]),
  O('"지금이 기회야. 버티자." 리더로서 다잡는다',{mind:2,stress:6,fame:15},{},{charisma:2},[['rena','…네. 버텨요, 우리.','normal']]),
 ]},
]},
'5_2':{title:'갈림길',place:'{ag} 회의실',script:[
 ['pd','{name} 씨, 〈놀라운 주말〉 고정 멤버 제안 드리고 싶어요. 1년 계약.','happy'],
 ['woojin','그리고… 비공식이지만 미국 레이블 쪽에서도 문의가 왔어. 둘 다 할 시간은 없어.','normal'],
 {c:[
  O('예능 고정을 수락한다 (한국 예능 루트)',{variety:8,fame:40,money:500},{pd:2},{bright:1},[{f:()=>{S.varietyCount+=4;S.flags.varietyRoute=true;S.flags.usRoute=false}},['pd','최고! 국민 예능돌 만들어 드릴게요.','happy']]),
  O('정중히 거절하고 외국어·무대에 집중한다 (미국 루트)',{english:6,mind:1},{},{charisma:1},[{f:()=>{S.flags.usRoute=true;S.flags.varietyRoute=false}},['woojin','좋아. 그럼 영어 레슨 시간 늘린다.','smile']]),
  O('아직 결정하지 않는다 (활동 결과에 맡긴다)',{},{},null,[['woojin','시상식 전까지 성적 보고 자연스럽게 정해지겠지.','normal']]),
 ]},
]},
'5_4':{title:'시상식 리허설',place:'골든 레코드 어워즈 백스테이지',script:[
 {f:()=>S.aff.jiyu>=3?[['jiyu','{name}. …아카데미 때 퀴즈 대결 기억나? 사실 그때부터 너 신경 쓰였어. 라이벌로.','normal'],['me','…그거 칭찬이지?','happy'],['jiyu','몰라. 시상식 끝나고 떡볶이나 먹자.','smile'],setF('jiyuFriend')]:[['','리허설 무대 뒤, ÉCLAT의 지유가 말없이 지나갔다.']]},
 ['seoa','{grp} 후배님들! 오늘 무대 같이 하는 거 알죠? 긴장하지 마요.','smile'],
 {c:[
  O('"선배님 무대 보면서 꿈 키웠어요!"',{mind:2,stress:-5},{seoa:2},{pure:1},[['seoa','에이, 이제 같은 무대인데요 뭐. 같이 빛나요.','happy']]),
  O('"오늘은 선배님도 긴장하셔야 할 거예요!"',{dance:2},{seoa:1},{charisma:1},[['seoa','오~ 패기 좋다! 기대할게요.','surprise']]),
  O('"선배님, 같이 셀카 한 장만…!"',{fame:20},{seoa:1},{bright:1},[{pop:'sns',user:'eive_seoa',cap:'원서아 선배의 SNS에 같이 찍은 셀카가 올라왔다!',cm:['선후배 투샷 미쳤다','서아가 직접 올림ㅠㅠ','{grp} 누구야? 입덕'],tag:'#선후배'}]),
 ]},
]},
'6_0':{title:'LA 첫날',place:'LA 국제공항',script:[
 ['','LA 공항. 시차 16시간, 낯선 공기.'],
 ['rena','{name}! 여기서는 제가 통역사예요. 헤헤.','happy'],
 ['rena','퀴즈! 입국 심사관이 "What\'s the purpose of your visit?"라고 물으면?','smile'],
 {ask:true,opts:['"For work. We\'re performing here."','"I\'m fine, thank you."','"Yes, I am a visit."'],ok:{english:3},okA:{rena:1},okL:[['rena','완벽해요! 이제 통역 필요 없겠다~','happy']],ng:{english:1},ngL:[['rena','앗… 방문 목적을 묻는 거예요. "For work!" 이렇게!','smile']]},
]},
'6_2':{title:'프로듀서 미팅',place:'할리우드의 한 녹음 스튜디오',script:[
 ['','그래미 수상 경력의 프로듀서가 의자를 돌렸다.'],
 ['프로듀서','So… what kind of song do you want to make in America?'],
 {c:[
  O('"A song about chasing dreams — our story."',{english:2,interview:2},{},{pure:1},[['프로듀서','Heartfelt. I like it.']]),
  O('"Something powerful. A song that hits hard on stage."',{english:2,dance:2},{},{charisma:1},[['프로듀서','Now we\'re talking. Let\'s make it loud.']]),
  O('"A fun summer song everyone can dance to!"',{english:2,variety:2},{},{bright:1},[['프로듀서','A summer hit? Love it.']]),
 ]},
 {f:()=>S.aff.mikyung>=3?[{pop:'chat',from:'윤미경 쌤',msgs:[['','LA 보컬 코치한테 너 얘기 해놨어. 내 제자라고.'],['','기죽지 마!'],['me','쌤ㅠㅠㅠ 감사해요!!']],cap:'미경쌤의 소개로 현지 보컬 코칭을 받게 됐다! (보컬 +4)'},fx({vocal:4},null)]:null},
]},
'7_1':{title:'투어 버스',place:'북미 투어 버스, 새벽 3시',script:[
 ['','투어 버스 안. 다들 잠들었다.'],
 {f:()=>S.flags.harinTeam?[['harin','(작게) {name}, 안 자? …우리 편의점 앞에서 바나나우유 먹던 거 기억나?','smile'],['me','응. 붙든 떨어지든 떡볶이.','happy'],['harin','여기까지 올 줄은 몰랐지.','happy']]:[{pop:'chat',from:'서하린',msgs:[['','미국에서 너 영상 봤어!!'],['','나도 다음 달 컴백! 꼭 같이 무대 서자!'],['me','하린아ㅠㅠ 보고 싶다!']],cap:''}]},
 {pop:'chat',from:'레오 쌤',msgs:[['','헤이 월드스타! 엔딩 요정 눈빛 잊지 마!'],['me','쌤 덕분이에요 🙏']],cap:'선생님들의 응원 메시지'},
 {c:[O('답장을 쓰고 잠든다',{stress:-10,mind:2},{leo:1,mikyung:1},null,[])]},
]},
};
for(const k in EPI) EPI[k].id=k;
async function comeback(song,k){
 S.lastSong=song;
 const power=S.fame*.06+perf()*.35+statVal(k)*.25+GEAR.comp.list[S.comp].v*40;
 const rank=clamp(Math.round(80-power*.55),1,80);
 const gain=Math.round(40+Math.max(0,60-rank)*3);
 await cutscene('stage',{head:`${S.group} — "${song}"`,cap:`컴백 쇼케이스! 신곡 "${song}" 첫 무대.`});
 await cutscene('chart',{song,from:99,to:Math.min(9,Math.max(1,Math.ceil(rank/9))),cap:`발매 첫날 실시간 차트 ${rank}위${rank<=10?'! TOP 10 진입!':''}\n초동 판매량 ${(gain*1200).toLocaleString()}장 · 팬덤 +${gain}`});
 apply({fame:gain});render();
 return [['woojin',rank<=10?'대박이다…! 다음엔 진짜 1위 가자!':'괜찮아. 이 노래로 우리 팬들이 확실히 늘었어.',rank<=10?'happy':'smile']];
}
function storyFor(){const k=`${S.stage}_${S.mi}`;return EPI[k]&&!S.done[k]?EPI[k]:null}

/* ============ 일상 에피소드 ============ */
const DAILY=[
 {id:'r_conv',s:[0,3],title:'자정의 편의점',place:'아카데미 앞 편의점',script:[
  ['','밤 12시, 늘 가는 편의점. 사장님이 삼각김밥을 찍다 말고 쳐다본다.'],
  ['편의점 사장님','학생, 매일 이 시간에 오네. 뭐 하는 사람이야?'],
  {c:[O('"가수 준비해요!"',{stress:-6},{},{bright:1},[['편의점 사장님','그래? 그럼 이건 서비스. 유명해지면 사인 한 장 붙여줘. (바나나우유)']]),
      O('"…그냥 학생이에요." 조용히 웃는다',{mind:1},{},{pure:1},[['편의점 사장님','뭔진 몰라도 힘내. 얼굴이 반쪽이야.']]),
      O('삼각김밥 대신 샐러드를 집는다',{diet:2},{},{charisma:1},[['편의점 사장님','오, 자기관리 하는구나. 프로네.']])]},
 ]},
 {id:'r_taxi',s:[0,3],title:'심야 택시',place:'연습 끝난 새벽 1시',script:[
  ['택시 기사님','혹시 연습생이에요? 이 동네서 이 시간에 타는 학생들은 다 그렇더라고.'],
  ['택시 기사님','우리 딸도 가수가 꿈이었는데… 지금은 회사 다녀요. 행복하대요.'],
  {c:[O('"따님도 멋있는 분이시네요."',{mind:2},{},{pure:1},[['택시 기사님','허허, 고마워요. 학생도 어떤 길이든 행복하길.']]),
      O('"저는 꼭 끝까지 가볼 거예요."',{stress:-3},{},{charisma:1},[['택시 기사님','그래요, 응원할게. 나중에 TV에서 찾아볼게요.']]),
      O('라디오에서 나오는 노래를 같이 흥얼거린다',{vocal:1,stress:-2},{},{bright:1},[['택시 기사님','오~ 목소리 좋네! 데뷔하면 꼭 틀어줄게.']])]},
 ]},
 {id:'r_school',s:[0,2],title:'오랜만의 등교',place:'고등학교 교실',script:[
  ['친구 민지','{name}! 너 요즘 학교 왜 이렇게 빠져? 애들이 너 연예인 한다고 소문났어.'],
  {c:[O('"아직 아무것도 아니야. 그냥 열심히 하는 중!"',{social:1},{},{pure:1},[['친구 민지','헐 대박. 데뷔하면 내가 사인 1호다?']]),
      O('반 애들 앞에서 춤 한 소절 보여준다',{dance:1,fame:0,stress:-4},{},{bright:2},[['','교실이 함성으로 뒤집혔다. 담임 선생님까지 박수를 쳤다.']]),
      O('수학 숙제를 같이 하자고 한다',{mind:2,stress:-3},{},{pure:1},[['','오랜만에 평범한 고등학생이 된 것 같았다.']])]},
 ]},
 {id:'r_guard',s:[1,3],title:'경비 아저씨',place:'회사 건물 1층 경비실',script:[
  ['경비 아저씨','또 마지막이네. 이 건물에서 마지막까지 남는 애들이 결국 데뷔하더라. 20년 경비 서면서 본 거야.'],
  {c:[O('"진짜요? 그럼 저도요?"',{stress:-4},{},{bright:1},[['경비 아저씨','허허, 그건 네가 보여줘야지. 자, 귤 하나 가져가.']]),
      O('"아저씨, 오늘은 제가 커피 살게요."',{money:-10,mind:2},{},{pure:1},[['경비 아저씨','허허, 이런 애는 처음이네. 잘될 거야.']]),
      O('꾸벅 인사하고 한 시간 더 연습하러 간다',{dance:2,stress:3},{},{charisma:1},[])]},
 ]},
 {id:'r_granny2',s:[1,3],c:()=>S.aff.granny>=2,title:'할머니의 식혜',place:'아카데미 언덕길',script:[
  {pop:'granny',cap:'"어머, 그때 그 학생! {name} 맞지? 할미가 식혜 만들었어."'},
  {c:[O('"할머니 덕분에 힘이 나요!"',{stress:-10},{granny:1},null,[['granny','우리 아들한테도 자랑했어. 방송국 다니는 아들. 꼭 성공해!','happy']]),
      O('식혜 답례로 노래 한 소절을 불러드린다',{vocal:1,stress:-6},{granny:1},{pure:1},[['granny','아이고 고와라. 우리 손녀 같네.','happy']])]},
 ]},
 {id:'r_mom',s:[0,3],npc:'mom',title:'엄마의 도시락',place:'연습실 앞',script:[
  ['mom','{name}아, 엄마 앞에 왔어. 잠깐 나올 수 있어?','smile'],
  ['','엄마 손에는 보온 도시락이 들려 있었다. 계란말이, 멸치볶음, 그리고 좋아하는 소시지.'],
  {c:[O('다 먹는다. 엄마 밥이 최고!',{stress:-12,diet:-1},{},{bright:1},[]),
      O('"엄마 나 식단 중이야…" 반만 먹는다',{diet:2,stress:-4},{},{charisma:1},[['mom','…그래, 나머지는 매니저님 드려.','smile']]),
      O('동기들이랑 나눠 먹는다',{social:3,stress:-6},{harin:1},{pure:1},[['harin','어머니 계란말이 진짜 맛있어요!!','happy']])]},
 ]},
 {id:'r_stylist',s:[3,7],title:'헤어 컬러 회의',place:'청담동 헤어숍',script:[
  ['스타일리스트 소연','{name} 씨, 이번 활동 헤어 컬러 직접 골라 볼래요?'],
  {c:[O('청순한 흑발 유지',{visual:2},{},{pure:2},[['스타일리스트 소연','역시 그게 시그니처죠.']]),
      O('과감한 애쉬 핑크',{visual:3,fame:10},{},{bright:2},[['스타일리스트 소연','첫 변신! 화제 되겠다.']]),
      O('시크한 블루 블랙',{visual:3},{},{charisma:2},[['스타일리스트 소연','눈빛이랑 딱이다. 걸크러시 완성.']])]},
 ]},
 {id:'r_kidfan',s:[4,7],title:'일곱 살 팬',place:'팬사인회',script:[
  ['','팬사인회 마지막 순서. 엄마 손을 잡은 일곱 살 꼬마가 그림을 내밀었다.'],
  {pop:'letter',cap:'크레파스로 그린 그림 속에서, 내가 무대 위에서 웃고 있었다.\n"언니처럼 될 거예요!"'},
  {c:[O('"언니보다 훨씬 멋진 가수 될 거야!"',{mind:3,stress:-10},{},{pure:1},[]),
      O('꼬마랑 같이 포인트 안무를 춘다',{fame:15,stress:-8},{},{bright:2},[{pop:'sns',cap:'꼬마 팬과의 안무 영상이 퍼졌다!',cm:['천사 아니냐고ㅠㅠ','팬서비스 레전드','이래서 입덕함'],tag:'#팬사인회'}])]},
 ]},
 {id:'r_subway',s:[4,7],title:'지하철에서',place:'휴일의 2호선',script:[
  ['','모자를 눌러쓰고 지하철을 탔는데, 맞은편 학생이 휴대폰과 나를 번갈아 본다.'],
  ['학생','저… 혹시 {grp} {name}…?'],
  {c:[O('조용히 웃으며 고개를 끄덕인다',{fame:5,mind:1},{},{pure:1},[['학생','(작게) 꺄… 응원해요! 사진은 안 찍을게요!']]),
      O('손가락으로 "쉿" 하고 윙크',{fame:8},{},{bright:1},[['','학생이 두 손으로 입을 막고 엄지를 들어 보였다.']]),
      O('"응원 고마워요. 조심히 가요." 담담하게',{mind:1},{},{charisma:1},[['학생','(…쿨하다. 더 좋아졌어.)']])]},
 ]},
 {id:'r_river',s:[1,3],c:()=>S.aff.harin>=2,npc:'harin',title:'한강 라면',place:'한강 공원',script:[
  ['harin','{name}, 오늘 연습 끝나고 한강 갈래? 라면 끓여 먹자!','happy'],
  {c:[O('간다!',{stress:-12,social:2},{harin:1},{bright:1},[['harin','나 꿈이 하나 더 생겼어. 너랑 같은 팀으로 데뷔하는 거.','smile']]),
      O('"개인 연습 끝나고 늦게 합류할게."',{vocal:1,dance:1,stress:-4},{harin:1},{charisma:1},[['harin','라면 불기 전에 와라!','happy']]),
      O('"라면 대신 한강 러닝 어때?"',{body:3,stress:-3},{harin:1},{pure:1},[['harin','…너 진짜 독하다. 콜!','happy']])]},
 ]},
 {id:'r_cwsong',s:[1,3],c:()=>S.flags.chaewon&&!S.flags.chaewonQuit,title:'채원의 자작곡',place:'작은 녹음 부스',script:[
  ['chaewon','{name}… 이거 제가 쓴 노래예요. 처음 들려주는 거예요.','shy'],
  {c:[O('"이거 언젠가 같이 부르자."',{vocal:1},{chaewon:2},{pure:1},[['chaewon','…정말요? 약속해요.','smile']]),
      O('"후렴에 랩 파트 넣으면 어때?"',{variety:1},{chaewon:1},{charisma:1},[['chaewon','랩…? 생각 못 했는데, 재밌겠다.','surprise']]),
      O('"편곡 밝게 바꾸면 대박날 듯!"',{social:1},{chaewon:1},{bright:1},[['chaewon','밝게… 해볼게요!','happy']])]},
 ]},
 {id:'r_rena',s:[2,7],c:()=>S.aff.rena>=1,title:'레나의 오야코동',place:'숙소 부엌',script:[
  ['rena','오늘 제가 일본 가정식 만들었어요! 오야코동!','happy'],
  {c:[O('맛있게 먹고 레시피를 물어본다',{stress:-8,english:1},{rena:1},{bright:1},[['rena','다음엔 같이 만들어요!','happy']]),
      O('일본어로 "おいしい!"',{english:2},{rena:2},null,[['rena','すごい! 발음 최고!','surprise']]),
      O('식단 중이라 조금만 먹는다',{diet:2},{},{charisma:1},[['rena','괜찮아요! 남은 건 매니저님 거!','smile']])]},
 ]},
 {id:'r_leo',s:[0,1],npc:'leo',title:'레오쌤의 원포인트',place:'댄스 연습실',script:[
  ['leo','{name}, 너 춤출 때 시선이 자꾸 바닥으로 가. 거울 말고 카메라를 봐. 상상의 카메라.','normal'],
  {c:[O('"상상의 카메라… 해볼게요!"',{visual:2},{leo:1},{pure:1},[['leo','그거야! 방금 눈빛, 엔딩 요정 눈빛이다.','happy']]),
      O('"동작부터 완벽하게 하고 싶어요."',{dance:2},{leo:1},{charisma:1},[['leo','좋아, 그것도 맞아. 대신 표정은 나중에 꼭 챙겨.','smile']])]},
 ]},
 {id:'r_mk2',s:[0,1],npc:'mikyung',c:()=>S.aff.mikyung>=1,title:'미경쌤의 옛날 이야기',place:'아카데미 복도',script:[
  ['mikyung','나도 옛날에 데뷔조였어. 데뷔 한 달 전에 팀이 엎어졌지.','normal'],
  ['mikyung','그래서 가르치는 거야. 너희는 그런 일 겪어도 무너지지 않게.','smile'],
  {c:[O('"쌤 노래, 한 번만 들려주세요."',{vocal:2},{mikyung:2},{pure:1},[['','미경쌤의 노래는… 아카데미 복도를 조용하게 만들었다.']]),
      O('"그럼 저는 무너지지 않을게요. 약속해요."',{mind:2},{mikyung:1},{charisma:1},[['mikyung','…말은 잘해. 가서 발성이나 해.','happy']])]},
 ]},
 {id:'r_harin_dance',s:[0,2],npc:'harin',title:'하린의 비밀 연습',place:'옥상',script:[
  ['harin','앗, 들켰다! 부산에서는 바닷가에서 연습했거든. 여기선 옥상이 바다야.','happy'],
  {c:[O('"나도 같이 할래!"',{dance:2},{harin:1},{bright:1},[['harin','좋아! 웨이브 알려줄게!','happy']]),
      O('휴대폰으로 하린 춤을 찍어준다',{social:1},{harin:1},{pure:1},[['harin','오~ 각도 장인!','happy']]),
      O('"배틀 하자. 진 사람이 아이스크림!"',{dance:2,stress:-3},{harin:1},{charisma:1},[['harin','콜! 각오해라!','smug']])]},
 ]},
 {id:'r_woojin',s:[1,1],title:'매니저의 떡볶이',place:'스톤웨이브 사무실',script:[
  ['woojin','다들 고생했다. 오늘은 내가 쏜다! 떡볶이 시켰어.','happy'],
  ['woojin','…사실 우리 회사 사정이 좀 어려워. 그래도 너희한테 들어가는 돈은 안 줄일 거야.','normal'],
  {c:[O('"매니저님, 저희가 꼭 보답할게요."',{mind:2},{woojin:2},{pure:1},[]),
      O('"그럼 오늘 떡볶이는 제가 반 낼게요!"',{money:-20},{woojin:2},{bright:1},[['woojin','하하, 됐어. 마음만 받을게.','happy']])]},
 ]},
 {id:'r_theory_q',s:[0,1],title:'쉬는 시간 퀴즈',place:'아카데미 휴게실',script:[
  ['harin','{name}! 오늘도 K-POP 퀴즈 한 판? 이번엔 내가 이긴다!','happy'],
  {quiz:3,per:{variety:1,stress:-1},perA:{harin:1},after:ok=>ok>=2?[['harin','으아 또 졌다! 너 덕질 장인이지?','sad']]:[['harin','앗싸 내가 이겼다! 바나나우유!','happy']]},
 ]},
 {id:'r_quiz_bus',s:[2,3],title:'이동 중 퀴즈',place:'회사 승합차 안',script:[
  ['woojin','심심하지? 이동하는 동안 퀴즈! 맞히면 오늘 간식 내가 쏜다.','happy'],
  {quiz:3,per:{interview:1},perA:{woojin:1},after:ok=>ok>=2?[['woojin','오, 이 정도면 퀴즈 예능 나가도 되겠다!','surprise'],fx({stress:-5},null)]:[['woojin','하하, 공부 좀 하자!','smile']]},
 ]},
];
function randomPool(){
 const ok=e=>!S.done[e.id]&&S.stage>=e.s[0]&&S.stage<=e.s[1]&&(!e.c||e.c());
 const pool=DAILY.filter(ok);
 const linked=S.slots.filter(Boolean).map(id=>ACTS.find(a=>a.id===id).npc).filter(Boolean);
 const pri=pool.filter(e=>e.npc&&linked.includes(e.npc));
 return pri.length?pri:pool;
}

/* ============ 유혹 · 사건 이벤트 ============ */
async function temptUp(){
 S.tempt++;
 if(S.tempt===2) await playEp({title:'경고',place:'사무실',script:[['woojin','요즘 너 얘기가 회사까지 들려. 한 번만 더 그러면 나도 못 막아줘.','sad'],['','⚠️ 유혹 2/3 — 한 번 더 넘어가면 돌이킬 수 없다.']]});
 if(S.tempt>=3){$('#vn').classList.remove('show');await ending(S.stage>=4?'e_scandal':'e_kicked');}
}
const EVENTS=[
 {c:()=>S.stage<=3,title:'유혹',place:'연습실 복도',script:[
  ['trainee','{name}, 오늘 밤 몰래 나가자. 다들 간대. 하루쯤 괜찮잖아?','happy'],
  {c:[O('따라간다 (스트레스 크게 ↓ · 유혹 +1)',{stress:-25,social:4},{trainee:1},{bright:1},[{f:async()=>{await temptUp()}}]),
      O('연습실에 남는다',{dance:3,social:-2},{},{charisma:1},[['trainee','…쳇, 모범생.','normal']]),
      O('"대신 숙소에서 다 같이 영화 보자!"',{stress:-10,social:2},{trainee:1},{pure:1},[['trainee','…그것도 나쁘지 않네.','smile']])]},
 ]},
 {c:()=>S.stage>=2,title:'비밀 계정',place:'숙소, 새벽',script:[
  ['','친구들이 다 하는 비공개 SNS 계정. 아무도 모르게 일상을 올리고 싶다.'],
  {c:[O('만들어 본다 (스트레스 ↓ · 유혹 +1)',{stress:-12},{},{bright:1},[{f:async()=>{await temptUp()}}]),
      O('대신 연습일지에 일상을 적는다',{mind:2,stress:-4},{},{pure:1},[]),
      O('공식 계정에 올릴 셀카를 고른다',{fame:5,visual:1},{},{charisma:1},[])]},
 ]},
 {c:()=>S.stage>=4,title:'밤샘 모임',place:'음악방송 대기실',script:[
  ['타 그룹 멤버','오늘 다 같이 밤새 놀 건데, 너도 와! 다른 그룹 애들도 와.'],
  ['','내일은 새벽 생방송 리허설이다.'],
  {c:[O('간다 (인맥 ↑ · 유혹 +1)',{stress:-25,social:6,body:-4},{},{bright:1},[{f:async()=>{await temptUp()}}]),
      O('정중히 거절한다',{body:2},{},{pure:1},[]),
      O('1시간만 있다가 먼저 나온다',{social:3,stress:-8},{},{charisma:1},[])]},
 ]},
 {c:()=>S.stage>=2&&(S.seen.lumina||0)<2,title:'EIVE 원서아',place:'회사 로비',script:[
  {f:()=>{S.seen.lumina=(S.seen.lumina||0)+1}},
  {pop:'meet',who:'seoa',cap:'데뷔 6년 차, 업계 최정상 걸그룹 EIVE의 센터 원서아가 지나간다.'},
  {c:[O('용기 내서 인사한다',{mind:2,vocal:2,dance:2,stress:-6},{seoa:2},{pure:1},[['seoa','안녕! 힘들면 거울 말고 연습일지를 봐. 얼마나 왔는지 보이거든.','smile']]),
      O('사인을 부탁한다',{stress:-8},{seoa:1},{bright:1},[['seoa','후배님이 사인을? 하하, 대신 나중에 네 사인도 줘.','happy']]),
      O('그녀의 걸음걸이와 눈빛을 관찰한다',{visual:3},{},{charisma:1},[['','…저게 6년 차의 아우라.']])]},
 ]},
 {c:()=>S.stage<=2,npc:'mom',title:'엄마의 전화',place:'숙소 복도',script:[
  ['mom','밥은 잘 먹고 다니니? 힘들면 언제든 돌아와도 돼.','smile'],
  {c:[O('"걱정 마. 나 꼭 해낼게."',{mind:3,stress:3},{},{charisma:1},[]),
      O('참았던 눈물이 터졌다',{stress:-15},{},{pure:1},[['mom','…울어도 돼. 엄마 여기 있어.','sad']]),
      O('"엄마, 나 오늘 칭찬받았어!" 자랑한다',{stress:-8},{},{bright:1},[['mom','어머 우리 딸! 동네방네 자랑해야겠다!','happy']])]},
 ]},
 {c:()=>S.stage>=1&&S.stage<=3,title:'킬링파트 쟁탈전',place:'연습실',script:[
  ['trainee','{name}… 이번 평가곡 킬링 파트, 이번만 나한테 양보해 주면 안 돼?','sad'],
  {c:[O('양보한다 (팀워크 ↑)',{mind:3,social:4},{trainee:2},{pure:1},[['trainee','…고마워. 이 빚 꼭 갚을게.','happy']]),
      O('실력으로 정하자고 한다 (실력 ↑, 관계 ↓)',{vocal:3,dance:3,social:-3,stress:5},{trainee:-1},{charisma:2},[['trainee','…그래. 평가 때 보자.','normal']]),
      O('"반씩 나눠서 둘 다 살리자!"',{social:2,variety:1},{trainee:1},{bright:1},[['trainee','그런 방법이! 트레이너님한테 같이 말해 보자.','surprise']])]},
 ]},
 {c:()=>S.stage>=4&&S.dance>=100&&!S.seen.fancam,title:'🔥 직캠 역주행',place:'팬카페',script:[
  {f:()=>{S.seen.fancam=1;const g=Math.round(80+S.dance/2+GEAR.fx.list[S.fx].v*5);apply({fame:g});return [{pop:'sns',cap:`한 팬이 찍은 {name}의 음방 직캠이 조회수 500만 돌파! (팬덤 +${g})`,likes:5023411,cm:['이 직캠 미쳤다','표정 연기 무슨 일','입덕했습니다…']},{pop:'fans',cap:'역주행의 기적! 다음 음방 현장에 팬들이 두 배로 늘었다.'}]}},
 ]},
 {c:()=>S.stage>=4,title:'숏폼 챌린지',place:'회사 SNS팀',script:[
  ['SNS팀 매니저','타이틀곡 포인트 안무로 챌린지 찍자! 누구랑 찍을래?'],
  {c:[O('EIVE 선배님께 부탁한다',{fame:35},{seoa:1},{pure:1},[{pop:'sns',cap:'선배와의 챌린지 영상이 터졌다!',cm:['투샷 레전드','EIVE 지원사격!','챌린지 무한반복중'],tag:'#챌린지'}]),
      O('멤버들끼리 웃긴 버전으로',{fame:25,variety:2},{},{bright:2},[{pop:'sns',cap:'멤버들의 엉뚱한 챌린지가 화제!',cm:['ㅋㅋㅋㅋ 미쳤다','이 그룹 예능감 뭐야','중독된다'],tag:'#챌린지'}]),
      O('혼자 칼군무 고난도 버전',{fame:20,dance:2},{},{charisma:2},[{pop:'sns',cap:'고난도 솔로 챌린지에 댄서들도 리액션!',cm:['춤선 미쳤다','이거 따라 할 수 있는 사람?','메인댄서 클라스'],tag:'#챌린지'}])]},
 ]},
 {c:()=>S.stage>=4,title:'악성 루머',place:'익명 커뮤니티',script:[
  ['','근거 없는 루머가 올라왔다. 댓글이 빠르게 늘어난다.'],
  {c:[O('회사에 법적 대응을 맡긴다',{stress:-4,mind:1},{},{pure:1},[]),
      O('직접 SNS로 해명한다 (결과는 운)',{},{},{charisma:1},[{f:()=>{if(Math.random()<.5+S.interview/300){const r=apply({fame:40,stress:4});effToast(r);return [['','진정성 있는 해명에 여론이 돌아섰다!']]}const r=apply({fame:-30,stress:15});effToast(r);return [['','…오히려 논란이 커졌다.']]}}]),
      O('라이브 방송에서 웃으며 근황을 전한다',{fame:10,stress:5},{},{bright:1},[])]},
 ]},
 {c:()=>S.stage>=4&&S.fame>=150&&!S.seen.bday,title:'🎂 생일 서포트',place:'지하철역',script:[
  {f:()=>{S.seen.bday=1}},
  {pop:'billboard',head:'HAPPY {name} DAY ♥',cap:'팬들이 지하철역 광고판에 생일 광고를 걸어줬다!'},
  fx({stress:-15,mind:3},null),
 ]},
 {c:()=>S.stage>=5&&effVis()>=90&&!S.seen.ad,title:'💄 광고 모델 발탁',place:'회사',script:[
  {f:()=>{S.seen.ad=1}},
  ['woojin','{name}! 뷰티 브랜드 단독 모델 계약 들어왔어!','happy'],
  {pop:'billboard',head:'NEW MUSE · {name}',cap:'시내 전광판에 내 얼굴이 걸렸다! (자금 +800, 팬덤 +40)'},
  fx({money:800,fame:40},null),
 ]},
];
function eventPool(){return EVENTS.filter(e=>e.c())}
