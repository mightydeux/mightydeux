/* ============ 옷장 · 상점 (드래그해서 입히기) ============ */
const CONCEPT={pure:'청순',charisma:'걸크러시',bright:'하이틴'};
/* 옷 카드 썸네일: 아이템 색 + 아이콘 */
function swatch(cat,it){
 const v=it.v;let c='#f4dfe6',e='✨';
 if(cat==='hair'){c=v.hc;e='💇‍♀️'}
 else if(cat==='top'){c=v.c1;e={hoodie:'🧥',tee:'👕',jacket:'🧥',cardigan:'🧶',dress:'👗'}[v.type]||'👕'}
 else if(cat==='bot'){c=v.c;e={pants:'👖',skirt:'🎀',shorts:'🩳'}[v.type]||'👖'}
 else if(cat==='shoe'){c=v;e=it.id==='s3'?'🥿':it.id==='s4'?'👠':'👟'}
 else if(cat==='acc'){e={ribbon:'🎀',headband:'🌸',cap:'🧢',pin:'⭐',beret:'🧶',tiara:'👑'}[v]||'🎀';c='#ffe3ec'}
 return `<span class="swc" style="background:${c}"></span><span class="swe">${e}</span>`;
}
const CATN={hair:'헤어',top:'상의',bot:'하의',shoe:'신발',acc:'액세서리'};
function wearItem(cat){return WARDROBE[cat].find(i=>i.id===S.wear[cat])||WARDROBE[cat][0]}
function lookFromWear(w){const t=WARDROBE.top.find(i=>i.id===w.top),b=WARDROBE.bot.find(i=>i.id===w.bot),sh=WARDROBE.shoe.find(i=>i.id===w.shoe),a=WARDROBE.acc.find(i=>i.id===w.acc),h=WARDROBE.hair.find(i=>i.id===(w.hair||'h0'));return {top:t.v,bot:t.dress?{type:'none'}:b.v,shoe:sh.v,acc:a.v,...h.v}}
function wearVis(w){w=w||S.wear;return ['top','bot','shoe','acc','hair'].reduce((s,c)=>{const it=WARDROBE[c].find(i=>i.id===w[c]);if(c==='bot'&&WARDROBE.top.find(i=>i.id===w.top).dress)return s;return s+(it?it.vis:0)},0)}
function coordi(w){w=w||S.wear;const n={pure:0,charisma:0,bright:0};for(const c of ['top','bot','shoe','acc','hair']){const it=WARDROBE[c].find(i=>i.id===w[c]);if(c==='bot'&&WARDROBE.top.find(i=>i.id===w.top).dress)continue;if(it&&it.tag)n[it.tag]++}return n}
function coordiText(w){const n=coordi(w);return Object.entries(n).filter(([k,v])=>v).map(([k,v])=>`${CONCEPT[k]} ${v}`).join(' · ')||'콘셉트 없음'}
let DR={mode:'wardrobe',cat:'top',prev:null,onClose:null};
function openWardrobe(cb){DR={mode:'wardrobe',cat:DR.cat||'top',prev:{...S.wear},onClose:cb};drawDress()}
function openShop(cb){DR={mode:'shop',cat:DR.cat||'top',prev:{...S.wear},onClose:cb||null};drawDress()}
function drawDress(){
 const ov=$('#dress'); const w=DR.prev; const shop=DR.mode==='shop';
 const tabs=shop?['hair','top','bot','shoe','acc','gear','item']:['hair','top','bot','shoe','acc'];
 const tl={...CATN,gear:'장비',item:'소모품'};
 let list='';
 if(DR.cat==='gear'){
  for(const k of ['comp','mic','fx']){const g=GEAR[k];list+=`<div class="dcat">${g.ic} ${g.lbl}${S.stage<g.st?` · 🔒 ${STAGES[g.st].name}부터`:''}</div>`+g.list.map((it,i)=>{const own=S[k]>=i,lock=S.stage<g.st||(it.req&&S.english<it.req);return `<div class="gitem ${lock&&!own?'lock':''}"><div><b>${it.name}</b><small>${it.d}</small></div>${own?`<button disabled>${S[k]===i?'사용 중':'보유'}</button>`:`<button ${lock||S.money<it.price||i!==S[k]+1?'disabled':''} onclick="buyGear('${k}',${i})">${it.price}G</button>`}</div>`}).join('')}
 } else if(DR.cat==='item'){
  list=ITEMS.map(it=>`<div class="gitem"><div><b>${it.ic} ${it.name}</b><small>${it.d}</small></div><button ${S.money<it.price?'disabled':''} onclick="buyItem('${it.id}')">${it.price}G</button></div>`).join('');
 } else {
  const items=WARDROBE[DR.cat].filter(it=>shop?(!it.sig||S.owned.includes(it.id)):S.owned.includes(it.id));
  list=`<div class="dgrid">${items.map(it=>{const own=S.owned.includes(it.id),lock=it.st>S.stage,on=w[DR.cat]===it.id;const pv={...w,[DR.cat]:it.id};if((DR.cat==='bot'||DR.cat==='shoe')&&WARDROBE.top.find(x=>x.id===w.top).dress)pv.top='t0';
   return `<div class="dcard ${on?'on':''} ${lock?'lock':''}" data-id="${it.id}"><div class="dimg">${lock?'<span class="lk">🔒</span>':swatch(DR.cat,it)}</div><b>${it.name}</b><small>${it.tag?CONCEPT[it.tag]+' · ':''}비주얼+${it.vis}</small>${lock?`<small class="pr">${(STAGES[it.st]||{name:'특별'}).name}부터</small>`:shop&&!own?`<button class="buy" onclick="event.stopPropagation();buyWear('${DR.cat}','${it.id}')" ${S.money<it.price?'disabled':''}>${it.price}G 구매</button>`:`<small class="pr">${on?'착용 중':'보유'}</small>`}</div>`}).join('')}</div>`;
 }
 const look=playerLook({...lookFromWear(w),wear:w,expr:'happy'});
 ov.innerHTML=`<div class="dwrap"><div class="dhead"><b>${shop?'🛍️ 옷가게·장비 상점':'👗 옷장'}</b><span>💰 ${S.money.toLocaleString()} G</span><button class="x" onclick="closeDress()">✕</button></div>
  <div class="dstage" id="dzone"><div class="dmirror"></div><div class="dchar" id="dchar">${girl(look)}</div><div class="dinfo">✨ 비주얼 +${wearVis(w)}<br><small>${coordiText(w)}</small><br><small>👀 ${OUTFIT_NAME[meOutfit(w)]} 스타일</small></div><div class="dhint">${shop?'옷을 끌어다 입혀 보고, 마음에 들면 구매!':'옷을 캐릭터에게 끌어다 놓으면 입혀져요'}</div></div>
  <div class="dtabs">${tabs.map(t=>`<button class="${DR.cat===t?'on':''}" onclick="DR.cat='${t}';drawDress()">${tl[t]}</button>`).join('')}</div>
  <div class="dlist">${(DR.cat==='bot'||DR.cat==='shoe')&&WARDROBE.top.find(x=>x.id===w.top).dress&&DR.cat==='bot'?'<div class="dnote">👗 원피스를 입은 상태예요. 하의를 입히면 상의가 원피스 대신 다른 상의로 바뀌어요.</div>':''}${list}</div>
  ${!shop?`<button class="big" onclick="applyWear()">이대로 입기 ✔</button>`:`<button class="big" onclick="applyWear()">${JSON.stringify(w)!==JSON.stringify(S.wear)&&canWear(w)?'입어 본 옷으로 갈아입고 나가기':'나가기'}</button>`}</div>`;
 ov.classList.add('show');
 ov.querySelectorAll('.dcard:not(.lock)').forEach(card=>dragify(card));
}
function canWear(w){return ['top','bot','shoe','acc','hair'].every(c=>S.owned.includes(w[c]))}
function dragify(card){
 const id=card.dataset.id;let ghost=null,sx=0,sy=0,moved=false;
 card.onpointerdown=e=>{if(e.target.classList.contains('buy'))return;e.preventDefault();sx=e.clientX;sy=e.clientY;moved=false;
  ghost=card.querySelector('.dimg').cloneNode(true);ghost.className='ghost';ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';document.body.appendChild(ghost);
  const mv=ev=>{if(Math.hypot(ev.clientX-sx,ev.clientY-sy)>6)moved=true;ghost.style.left=ev.clientX+'px';ghost.style.top=ev.clientY+'px';const z=$('#dzone').getBoundingClientRect();$('#dzone').classList.toggle('hov',ev.clientX>z.left&&ev.clientX<z.right&&ev.clientY>z.top&&ev.clientY<z.bottom)};
  const up=ev=>{document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',up);ghost.remove();$('#dzone').classList.remove('hov');
   const z=$('#dzone').getBoundingClientRect();const inside=ev.clientX>z.left&&ev.clientX<z.right&&ev.clientY>z.top&&ev.clientY<z.bottom;
   if(inside||!moved) tryOn(id)};
  document.addEventListener('pointermove',mv);document.addEventListener('pointerup',up)};
}
function tryOn(id){
 const cat=DR.cat;const before=wearVis(DR.prev);DR.prev={...DR.prev,[cat]:id};
 if(cat==='bot'&&WARDROBE.top.find(x=>x.id===DR.prev.top).dress){const alt=WARDROBE.top.filter(t=>!t.dress&&S.owned.includes(t.id)).sort((a,b)=>b.vis-a.vis)[0];DR.prev.top=alt?alt.id:'t0'}
 drawDress();SFX.ok();const ch=$('#dchar');ch.classList.add('pop');burst(ch,['✨','💖','⭐','🎀'],12);
 const d=wearVis(DR.prev)-before;if(d)floatText(`비주얼 ${d>0?'+':''}${d}`,'#ff7eb6',ch);
}
function buyWear(cat,id){const it=WARDROBE[cat].find(i=>i.id===id);if(S.money<it.price)return;S.money-=it.price;S.owned.push(id);SFX.coin();toast(`${it.name} 구매!`);DR.prev={...DR.prev,[cat]:id};render();drawDress();burst($('#dchar'),['💖','✨','🛍️'],10)}
function buyGear(k,i){const it=GEAR[k].list[i];if(S.money<it.price)return;S.money-=it.price;S[k]=i;SFX.big();toast(`${it.name} 확보!`);save();render();drawDress()}
function buyItem(id){const it=ITEMS.find(x=>x.id===id);if(S.money<it.price)return;S.money-=it.price;const r=apply(it.fx);SFX.up();toast(Object.entries(r).map(([k,v])=>`${LBL[k]}${v>0?'+':''}${v}`).join(' ')||'효과 없음');save();render();drawDress()}
function applyWear(){if(canWear(DR.prev)){S.wear={...DR.prev}}closeDress();toast('👗 '+coordiText());save();render()}
function closeDress(){$('#dress').classList.remove('show');render();const cb=DR.onClose;DR.onClose=null;if(cb)cb()}
