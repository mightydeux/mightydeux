/* ============ 효과음 (8비트 신스) ============ */
let AC=null, MUTE=false;
function audio(){if(MUTE)return null;try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function tone(f,d=.08,type='square',vol=.06,delay=0){const a=audio();if(!a)return;const t=a.currentTime+delay;const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.02)}
const SFX={
 blip:()=>tone(880,.03,'square',.025),
 sel:()=>tone(660,.05),
 ok:()=>{tone(784,.06);tone(1046,.08,'square',.06,.06)},
 step:()=>tone(140,.03,'triangle',.04),
 door:()=>{tone(392,.07);tone(523,.07,'square',.06,.07);tone(659,.1,'square',.06,.14)},
 up:()=>{[523,659,784,1046].forEach((f,i)=>tone(f,.09,'square',.06,i*.07))},
 big:()=>{[523,659,784,1046,1318].forEach((f,i)=>tone(f,.12,'square',.07,i*.08));tone(1568,.35,'triangle',.08,.42)},
 fan:()=>{[392,523,659,784,659,784,1046].forEach((f,i)=>tone(f,.13,'square',.06,i*.11))},
 coin:()=>{tone(988,.05);tone(1318,.12,'square',.05,.05)},
 miss:()=>{tone(220,.12,'sawtooth',.05);tone(165,.18,'sawtooth',.05,.1)},
 hit:()=>tone(1200,.04,'square',.05),
 tap:()=>tone(500+Math.random()*400,.03,'square',.04),
};
function shake(el,big){el=el||$('#app');el.classList.remove('shk','shk2');void el.offsetWidth;el.classList.add(big?'shk2':'shk');setTimeout(()=>el.classList.remove('shk','shk2'),500)}
function flash(color='#fff'){const d=document.createElement('div');d.className='flash';d.style.background=color;document.body.appendChild(d);setTimeout(()=>d.remove(),450)}
function burst(host,emojis=['✨','💖','⭐'],n=14){host=host||$('#scene');const r=host.getBoundingClientRect();for(let i=0;i<n;i++){const p=document.createElement('div');p.className='ptc';p.textContent=pick(emojis);p.style.left=(r.left+r.width/2)+'px';p.style.top=(r.top+r.height*.45)+'px';const a=Math.random()*Math.PI*2,d=60+Math.random()*110;p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d-40+'px');document.body.appendChild(p);setTimeout(()=>p.remove(),1100)}}
function floatText(txt,color='#ffd36e',host){host=host||$('#scene');const r=host.getBoundingClientRect();const d=document.createElement('div');d.className='ftxt';d.textContent=txt;d.style.color=color;d.style.left=(r.left+r.width/2)+'px';d.style.top=(r.top+r.height*.35)+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1300)}
function coins(amount){if(amount<=0)return;SFX.coin();floatText(`+${amount} G`,'#ffd36e',$('#hdr'));const r=$('#hMoney').getBoundingClientRect();for(let i=0;i<Math.min(8,2+amount/60);i++){const c=document.createElement('div');c.className='coin';c.textContent='🪙';c.style.left=(r.left+Math.random()*40)+'px';c.style.top=(r.top+30+Math.random()*30)+'px';c.style.animationDelay=(i*.06)+'s';document.body.appendChild(c);setTimeout(()=>c.remove(),1100)}}

/* ============ 포켓몬식 텍스트 박스 (장면 위) ============ */
function pkText(lines,host){
 host=host||$('#scene');
 return new Promise(res=>{
  let box=host.querySelector('.pkt'); if(!box){box=document.createElement('div');box.className='pkt';host.appendChild(box)}
  let li=0;
  const show=()=>{const full=lines[li];let i=0,typing=true;box.innerHTML='<span></span><b class="pkn">▼</b>';const sp=box.querySelector('span');const nx=box.querySelector('.pkn');nx.style.visibility='hidden';
   const step=()=>{if(!typing)return;i+=2;sp.textContent=full.slice(0,i);if(i%6===0)SFX.blip();if(i>=full.length){typing=false;nx.style.visibility='visible';return}setTimeout(step,FAST?6:20)};step();
   box.onclick=e=>{e.stopPropagation();if(typing){typing=false;sp.textContent=full;nx.style.visibility='visible';return}li++;if(li<lines.length)show();else{box.remove();res()}};
   const tm=setTimeout(()=>{if(!box.isConnected)return;typing=false;box.onclick({stopPropagation(){}})},AUTO?(FAST?250:900):Math.max(2200,full.length*70));
   const oc=box.onclick;box.onclick=e=>{clearTimeout(tm);oc(e)};
  };show();
 });
}
let FAST=false, AUTO=false;

/* ============ 스탯 상승 박스 ============ */
function statBox(before,delta,title){
 return new Promise(res=>{
  const keys=Object.keys(delta).filter(k=>delta[k]&&k!=='money');
  if(!keys.length){res();return}
  const anyBig=keys.some(k=>k!=='stress'&&delta[k]>=6);
  const ov=document.createElement('div');ov.className='sbox';
  const ups=keys.filter(k=>!['stress','fame'].includes(k)&&gradeOfStat(before[k])!==gradeOfStat(before[k]+delta[k])&&delta[k]>0);
  ov.innerHTML=`<div class="sbt">${title||'능력치 변화!'}</div>`+keys.map(k=>{const d=delta[k],good=k==='stress'?d<0:d>0;return `<div class="sbr"><span>${LBL[k]}</span><span class="sbv" data-k="${k}">${before[k]}</span><span class="sbd ${good?'g':'b'}">${d>0?'+':''}${d}</span></div>`}).join('')+ups.map(k=>`<div class="gup">🔺 ${LBL[k]} 등급 UP! ${gradeOfStat(before[k])} → <b>${gradeOfStat(before[k]+delta[k])}</b></div>`).join('')+`<div class="pkn" style="text-align:right">▼</div>`;
  if(ups.length){setTimeout(()=>{SFX.fan();shake($('#scene'));burst(null,['🔺','⭐','✨'],16)},300)}
  $('#scene').appendChild(ov);
  anyBig?SFX.big():SFX.up();
  if(anyBig){burst(null,['⭐','✨','💖'],12)}
  ov.querySelectorAll('.sbv').forEach(el=>{const k=el.dataset.k,a=before[k],b=a+delta[k];let t=0;const iv=setInterval(()=>{t++;el.textContent=Math.round(a+(b-a)*t/10);if(t>=10)clearInterval(iv)},40)});
  const close=()=>{ov.remove();res()};
  ov.onclick=e=>{e.stopPropagation();close()};
  const tm=setTimeout(()=>{if(ov.isConnected)close()},AUTO?(FAST?200:1200):2600);
  ov.onclick=e=>{e.stopPropagation();clearTimeout(tm);close()};
 });
}

/* ============ 연타 찬스 ============ */
function qte(label){
 return new Promise(res=>{
  const ov=document.createElement('div');ov.className='qte';
  ov.innerHTML=`<div class="qt1">🔥 집중 찬스!</div><div class="qt2">${label}<br>버튼을 마구 연타하세요!</div><button class="qbtn" id="qb">연타!</button><div class="qbar"><i id="qbi"></i></div><div class="qcnt" id="qc">0</div>`;
  $('#scene').appendChild(ov);
  let n=0,t0=null;const dur=2.6;
  const btn=ov.querySelector('#qb');
  btn.onpointerdown=e=>{e.preventDefault();e.stopPropagation();if(!t0)t0=performance.now();n++;SFX.tap();ov.querySelector('#qc').textContent=n;btn.style.transform=`scale(${.92+Math.random()*.1}) rotate(${(Math.random()-.5)*8}deg)`;if(n%5===0)burst(ov,['🔥','💦','✨'],4)};
  const start=performance.now();
  const tick=()=>{const e=((t0||start)===start&&!t0?0:(performance.now()-(t0||start))/1000);const el=(performance.now()-start)/1000;
   ov.querySelector('#qbi').style.width=Math.max(0,100-(t0?(performance.now()-t0)/1000:0)/dur*100)+'%';
   if((t0&&(performance.now()-t0)/1000>=dur)||(!t0&&el>4)){ov.remove();res(n);return}requestAnimationFrame(tick)};tick();
  if(AUTO){n=12;setTimeout(()=>{ov.remove();res(n)},50)}
 });
}

/* ============ 이벤트 컷신 팝업 ============ */
function cutscene(type,o={}){
 return new Promise(res=>{
  const ov=document.createElement('div');ov.className='cut';
  for(const k of ['cap','head','banner','body','user']) if(typeof o[k]==='string') o[k]=subT(o[k]);
  if(o.cm) o.cm=o.cm.map(subT);
  const meBust=girl(playerLook({bust:true,expr:o.expr||'happy',crown:false}));
  const lookImg=(full)=>o.look?girl({...CAST[o.look].look,bust:!full,expr:o.expr||CAST[o.look].look.expr}):girl(playerLook({expr:o.expr||'wink',crown:false,bust:!full}));
  let art='';
  if(type==='fans'){
   const sticks=Array.from({length:36},(_,i)=>`<i style="left:${(i%12)*8.4+2}%;bottom:${Math.floor(i/12)*16+4}%;animation-delay:${(i%5)*.12}s;background:${['#ff7eb6','#ffd36e','#9ed2ff'][i%3]}"></i>`).join('');
   art=`<div class="ct fans"><div class="fstage">${girl(playerLook({expr:'happy',crown:false}))}</div><div class="fbanner">${o.banner||(S.group?S.group+' 사랑해!':S.name+' 화이팅!')}</div><div class="crowd">${sticks}</div><div class="hearts">${'💖'.repeat(6).split('').map((h,i)=>`<b style="left:${10+i*15}%;animation-delay:${i*.2}s">💖</b>`).join('')}</div></div>`;
  } else if(type==='granny'){
   art=`<div class="ct granny"><svg viewBox="0 0 300 200" class="cbg"><rect width="300" height="200" fill="#bfe3ff"/><circle cx="250" cy="40" r="22" fill="#fff3a8"/><path d="M0 150 L300 90 L300 200 L0 200Z" fill="#9ad07a"/>${Array.from({length:8},(_,i)=>`<rect x="${40+i*30}" y="${142-i*7.5}" width="30" height="8" fill="#d8c8a8" stroke="#a89878"/>`).join('')}</svg>
    <div class="cp l">${girl({...CAST.granny.look,bust:true,expr:'happy'})}</div><div class="cp r">${meBust}<span class="bag">🛍️🛍️</span></div><div class="hearts">${[0,1,2,3].map(i=>`<b style="left:${35+i*9}%;animation-delay:${i*.25}s">💗</b>`).join('')}</div></div>`;
  } else if(type==='sns'){
   art=`<div class="ct phone"><div class="ph"><div class="phtop">📷 인스타픽</div><div class="phuser"><span class="av">${o.look?girl({...CAST[o.look].look,bust:true}):meBust}</span><b>${o.user||'fan_'+Math.floor(Math.random()*9000+1000)}</b></div><div class="phimg" style="background:${o.bg||'linear-gradient(135deg,#ffd6e6,#c9b6ff)'}">${lookImg(true)}<span class="phtag">${o.tag||'#직캠 #레전드'}</span></div>
    <div class="phlike">❤️ <b id="likes">0</b> 좋아요</div><div class="phcap">${o.cap||''}</div><div class="phcm">${(o.cm||['ㅠㅠㅠ 이 직캠 미쳤다','표정 연기 무슨 일','입덕했습니다…']).map((c,i)=>`<p style="animation-delay:${.4+i*.45}s"><b>user${Math.floor(Math.random()*900+100)}</b> ${c}</p>`).join('')}</div></div></div>`;
  } else if(type==='news'){
   art=`<div class="ct news"><div class="np"><div class="nh">📰 연예 단독</div><h4>${o.head||''}</h4><div class="nimg">${girl(playerLook({expr:o.expr||'smile',crown:false}))}</div><p>${o.body||''}</p><div class="nv">조회수 <b id="likes">0</b></div></div></div>`;
  } else if(type==='chart'){
   const songs=['봄날의 기억','Midnight Drive','너의 계절','Starlight','HOT SAUCE','달빛 산책','Rewind','첫사랑 다이어리','Blue Wave'];
   const me=o.song||'우리의 노래';
   art=`<div class="ct chart"><div class="chh">🎵 실시간 차트 TOP 10</div><div class="chl" id="chl">${songs.map((s,i)=>`<div class="chr" style="top:${i*10}%"><b>${i+1}</b>${s}</div>`).join('')}<div class="chr me" id="chme" style="top:100%"><b id="chrk">${o.from||87}</b>${me} · ${S.group||S.name}</div></div></div>`;
  } else if(type==='trophy'){
   art=`<div class="ct trophy"><div class="tro">🏆</div><div class="trt">${o.head||'1위'}</div><div class="trm">${girl(playerLook({expr:'happy',crown:false}))}</div>${Array.from({length:30},(_,i)=>`<i class="cf" style="left:${Math.random()*100}%;animation-delay:${Math.random()*1.5}s;background:${['#ffd36e','#ff7eb6','#9ed2ff','#fff'][i%4]}"></i>`).join('')}</div>`;
  } else if(type==='rank'){
   const names=['김서연','이하은','박지민','최유나','정다인','강민지','조예린','윤소희','장하윤','임채아','한지우','오세은','서다현','신예나','권나연','황보람','안지수','송하늘','전유진','홍채린','고은비','문수아','양다빈','손예진','배하람','백소율','허윤아','남궁별','노은채'];
   const rk=o.rank||10;const list=names.slice(0,29);list.splice(rk-1,0,S.name);
   art=`<div class="ct rankb"><div class="rkh">📋 월말평가 결과</div><div class="rkg">${list.map((n,i)=>`<div class="${n===S.name?'me':''}" style="animation-delay:${i*.03}s"><b>${i+1}</b>${n}</div>`).join('')}</div></div>`;
  } else if(type==='chat'){
   art=`<div class="ct chat"><div class="cth">💬 카카톡 · ${o.from||''}</div><div class="ctb">${(o.msgs||[]).map((m,i)=>`<div class="bub ${m[0]==='me'?'me':''}" style="animation-delay:${i*.6}s">${m[1]}</div>`).join('')}</div></div>`;
  } else if(type==='billboard'){
   art=`<div class="ct bill"><svg viewBox="0 0 300 200" class="cbg"><rect width="300" height="200" fill="#2a2a3a"/><rect y="150" width="300" height="50" fill="#4a4a5a"/>${Array.from({length:10},(_,i)=>`<rect x="${i*30}" y="150" width="2" height="50" fill="#666"/>`).join('')}</svg><div class="bframe"><div class="bimg">${girl(playerLook({expr:'smile',crown:false}))}</div><div class="btxt">${o.head||''}</div></div></div>`;
  } else if(type==='stage'){
   art=`<div class="ct stagec"><div class="cur l"></div><div class="cur r"></div><div class="sp1"></div><div class="stm">${girl(playerLook({expr:'happy',crown:false}))}</div><div class="sttx">${o.head||''}</div></div>`;
  } else if(type==='dday'){
   art=`<div class="ct ddayc"><div class="hb"></div><div class="cal"><div class="cm">${S.year}. ${S.month}</div><div class="cd">${o.day||15}</div><div class="stamp">D-DAY</div></div><div class="dtt">${o.head||''}</div><div class="dpl">📍 ${o.place||''}</div><div class="dme">${girl(playerLook({bust:true,expr:'shy',crown:false}))}</div></div>`;
  } else if(type==='pass'||type==='fail'){
   const ok=type==='pass';
   art=`<div class="ct ${ok?'passc':'failc'}">${ok?Array.from({length:34},(_,i)=>`<i class="cf" style="left:${Math.random()*100}%;animation-delay:${Math.random()*1.2}s;background:${['#ffd36e','#ff7eb6','#9ed2ff','#fff'][i%4]}"></i>`).join(''):Array.from({length:30},(_,i)=>`<i class="rain" style="left:${Math.random()*100}%;animation-delay:${Math.random()*1}s"></i>`).join('')}<div class="pme">${girl(playerLook({expr:ok?'happy':'sad',crown:false}))}</div><div class="seal ${ok?'':'grey'}">${ok?'합격':'불합격'}</div><div class="ptt">${o.head||''}</div></div>`;
  } else if(type==='badge'){
   art=`<div class="ct badgec"><div class="rays"></div><div class="bdg" style="background:${o.color||'linear-gradient(135deg,#ffd36e,#ff7eb6)'}">${o.icon||'⭐'}</div><div class="bdt">${o.head||''}</div><div class="bds">${(S.badges||[]).map(b=>`<span>${b.icon}</span>`).join('')}</div></div>`;
  } else if(type==='evolve'){
   const n=o.n||1;
   const wings=n>=4?`<svg class="wings" viewBox="0 0 300 200"><path d="M150 100 C110 40 40 30 10 60 C40 70 50 90 30 110 C60 110 80 120 70 145 C110 130 140 120 150 100Z" fill="#fff" opacity=".9"/><path d="M150 100 C190 40 260 30 290 60 C260 70 250 90 270 110 C240 110 220 120 230 145 C190 130 160 120 150 100Z" fill="#fff" opacity=".9"/></svg>`:'';
   const halo=n>=6?'<div class="halo"></div>':'';
   art=`<div class="ct evo lv${n}"><div class="erays"></div><div class="estars">${Array.from({length:16},(_,i)=>`<b style="left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*2}s">✦</b>`).join('')}</div><div class="echar old">${girl(o.before)}</div><div class="echar new ${o.afterImg?'imgc':''}">${wings}${halo}${o.afterImg?`<img src="${o.afterImg}" alt="">`:girl(o.after)}</div><div class="etxt"><b>✨ 변신 완료! ✨</b><span>STAGE ${n+1} · ${o.head}</span></div></div>`;
  } else if(type==='youtube'){
   art=`<div class="ct yt"><div class="ytbar">▶ <b>YouTube</b></div><div class="ytv">${girl(playerLook({bust:true,expr:'wink',crown:false}))}<span class="ytp">▶</span><span class="ytt">4:12</span><div class="ytprog"><i></i></div></div><div class="yttl">${o.title||''}</div><div class="ytmeta">조회수 <b id="likes">0</b>회 · 👍 ${Math.floor(rnd(20,400))/10}만</div><div class="ytcm">${(o.cm||[]).map((x,i)=>`<p style="animation-delay:${.4+i*.4}s">💬 ${x}</p>`).join('')}</div></div>`;o.likes=o.views||Math.floor(rnd(200000,3000000));
  } else if(type==='community'){
   art=`<div class="ct comm"><div class="cmh">🔥 실시간 인기글 · 아이돌 갤러리</div><div class="cmt">${o.title||''}</div><div class="cmm">조회 <b id="likes">0</b> · 추천 ${Math.floor(rnd(300,3000))}</div><div class="cmb">${girl(playerLook({bust:true,expr:'happy',crown:false}))}</div><div class="cmr">${(o.cm||[]).map((x,i)=>`<p style="animation-delay:${.3+i*.45}s">ㄴ ${x} <small>${Math.floor(rnd(10,900))}</small></p>`).join('')}</div></div>`;o.likes=o.views||Math.floor(rnd(30000,400000));
  } else if(type==='concert'){
   const lv=o.lv||1,n=[30,60,110,180][lv-1];
   const L=teamLooks();
   art=`<div class="ct conc lv${lv}"><div class="cvenue">${o.venue||''} · ${o.name||''}</div><div class="cstage"></div>${lv>=3?'<div class="fw f1"></div><div class="fw f2"></div><div class="fw f3"></div>':''}
    <div class="cband">${L.slice(0,2).map(l=>`<div class="cm2">${girl({...l,expr:'happy'})}</div>`).join('')}<div class="cm2 me">${girl(playerLook({expr:'happy',crown:false}))}</div>${L.slice(2,4).map(l=>`<div class="cm2">${girl({...l,expr:'happy'})}</div>`).join('')}</div>
    <div class="crowd2">${Array.from({length:n},(_,i)=>`<i style="left:${(i*37)%100}%;bottom:${(Math.floor(i/(n/6)))*(36/6)}%;animation-delay:${(i%7)*.1}s;background:${['#ff7eb6','#ffd36e','#9ed2ff','#c9a2ff'][i%4]}"></i>`).join('')}</div>
    <div class="cseat"><b id="likes">0</b> / ${(o.seats||0).toLocaleString()}석</div></div>`;o.likes=o.seats;
  } else if(type==='letter'){
   art=`<div class="ct letter"><div class="paper"><div class="crayon">${girl(playerLook({expr:'happy',crown:false}))}</div><div class="lt">언니 사랑해요 ♥<br>나도 가수 될 거야!</div>${['⭐','💖','🌈','🎵'].map((e,i)=>`<b style="left:${[8,78,12,74][i]}%;top:${[10,12,70,66][i]}%">${e}</b>`).join('')}</div></div>`;
  } else if(type==='meet'){
   const c=CAST[o.who];
   art=`<div class="ct meet" style="background:${o.bg||'linear-gradient(#ffe6f0,#e8e0ff)'}"><div class="cp l">${portrait(o.who,o.expr2)}</div><div class="cp r">${portrait('me',o.expr)}</div><div class="mtag">${c.name}</div></div>`;
  }
  ov.innerHTML=`${art}<div class="ccap">${o.cap||''}</div><div class="ctap">탭하여 계속 ▼</div>`;
  document.body.appendChild(ov);
  if(type==='dday'){heartbeat();}else if(type==='fail'){SFX.miss()}else (type==='fans'||type==='trophy'||type==='stage'||type==='pass'||type==='badge'||type==='concert')?SFX.fan():SFX.ok();
  if(type==='trophy'||type==='stage'||type==='fans'||type==='pass'||type==='badge'||type==='concert') {flash('#fff');}
  if(type==='pass'||type==='dday') setTimeout(()=>shake(ov.querySelector('.ct'),true),type==='pass'?700:1200);
  const lk=ov.querySelector('#likes');if(lk){const tgt=o.likes||Math.floor(rnd(30000,250000));let t=0;const iv=setInterval(()=>{t++;lk.textContent=Math.round(tgt*t/30).toLocaleString();if(t>=30)clearInterval(iv)},40)}
  if(type==='chart'){const me=ov.querySelector('#chme'),rk=ov.querySelector('#chrk');const to=o.to||1;setTimeout(()=>{me.style.top=((to-1)*10)+'%';let r=o.from||87;const iv=setInterval(()=>{r=Math.max(to,r-Math.ceil((r-to)/4)-1);rk.textContent=r;if(r<=to){clearInterval(iv);SFX.big();burst(ov,['🎉','✨','💖'],16)}},90);ov.querySelectorAll('.chr:not(.me)').forEach((el,i)=>{if(i>=to-1)el.style.top=((i+1)*10)+'%'})},600)}
  if(type==='evolve'&&!AUTO){const ct=ov.querySelector('.ct'),oc=ov.querySelector('.old'),nc=ov.querySelector('.new');ct.classList.add('glow');let iv=420,t=0,show=0;
   const flip=()=>{show^=1;oc.style.opacity=show?0:1;nc.style.opacity=show?1:0;tone(300+t*40,.06,'triangle',.06);t++;iv=Math.max(50,iv*.8);if(t<22)setTimeout(flip,iv);else{flash('#fff');ct.classList.remove('glow');ct.classList.add('done');oc.style.opacity=0;nc.style.opacity=1;SFX.big();burst(ct,['✨','💖','⭐','🎀','🌸'],26);shake(ct,true)}};
   setTimeout(flip,700)}
  setTimeout(()=>{ov.onclick=()=>{SFX.sel();ov.remove();res()}},AUTO?0:(type==='evolve'?4200:500));
  if(AUTO) setTimeout(()=>{ov.remove();res()},FAST?50:1500);
 });
}

function heartbeat(){for(let i=0;i<4;i++){tone(70,.12,'sine',.25,i*.7);tone(60,.14,'sine',.22,i*.7+.18)}}
function skillPop(sk){
 return new Promise(res=>{
  const d=document.createElement('div');d.className='skp';d.innerHTML=`<div class="skt">✨ NEW SKILL ✨</div><div class="ski">${sk.icon}</div><div class="skn">${sk.name}</div><div class="skd">${sk.d}</div>`;
  document.body.appendChild(d);SFX.big();flash('#ffd36e');burst(d,['✨','⭐','💫'],14);
  const close=()=>{d.remove();res()};d.onclick=close;setTimeout(()=>{if(d.isConnected)close()},AUTO?(FAST?50:400):2600);
 });
}
const GRADES=[[0,'F'],[20,'E'],[40,'D'],[60,'C'],[90,'B'],[120,'A'],[160,'S']];
function gradeOfStat(v){let g='F';for(const [t,n] of GRADES)if(v>=t)g=n;return g}

/* 스페이스·엔터로 창 즉시 닫기 */
document.addEventListener('keydown',e=>{
 if(!(e.code==='Space'||e.code==='Enter'))return;
 if(document.activeElement&&document.activeElement.tagName==='INPUT')return;
 if($('#vn').classList.contains('show')&&!$('#vn').classList.contains('dim'))return;
 if($('#mg').classList.contains('show'))return;
 const sk=document.querySelector('.skp');if(sk){e.preventDefault();e.stopImmediatePropagation();sk.click();return}
 const ct=[...document.querySelectorAll('.cut')].pop();if(ct){e.preventDefault();e.stopImmediatePropagation();if(ct.onclick)ct.click();return}
 const sb=document.querySelector('.sbox');if(sb){e.preventDefault();e.stopImmediatePropagation();sb.click();return}
 if($('#dlg').classList.contains('show')){const bs=$('#dbox').querySelectorAll('.dbtns button');if(bs.length===1&&!$('#dIn')){e.preventDefault();e.stopImmediatePropagation();bs[0].click()}return}
 const pk=[...document.querySelectorAll('.pkt')].pop();if(pk){e.preventDefault();e.stopImmediatePropagation();pk.click();return}
},true);
