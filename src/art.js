/* ============ 일러스트 (concept_modern 스타일) ============
   예전 SVG 캐릭터 생성기를 대체한다. girl(p)는 그대로 HTML 문자열을 돌려주므로
   게임 곳곳의 호출부는 바꾸지 않아도 된다.
   - 주인공: 옷차림에 따라 연습복 / 후디+스커트 / 후디+청바지 3장 중 하나
   - NPC: ART.npc에 이미지가 있으면 그 그림, 없으면 이름이 적힌 파스텔 프로필 카드
   새 그림을 추가하려면 img/에 파일을 넣고 아래 ART 표에 경로만 적으면 된다. */
const ART={
 me:{practice:'img/me_practice.webp',hoodie:'img/me_hoodie.webp',daily:'img/me_daily.webp'},
 npc:{arteam:'img/npc_manager.webp',cafe:'img/npc_cafe.webp'},
};
const ARTBG={env_street:'img/env_street.webp',env_studio:'img/env_studio.webp',env_company:'img/env_company.webp',bg_home:'img/bg_home.webp',bg_practice:'img/bg_practice.webp',bg_cafe:'img/bg_cafe.webp'};
/* 얼굴 위치 (상반신 카드를 자를 때 기준점) */
const FOCUS={'img/me_practice.webp':'50% 1%','img/me_hoodie.webp':'44% 1%','img/me_daily.webp':'50% 1%','img/npc_manager.webp':'50% 1%','img/npc_cafe.webp':'40% 1%'};
function mix(h,w){const n=parseInt(h.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;const f=c=>Math.round(c+(w>0?(255-c)*w:c*w));return '#'+[f(r),f(g),f(b)].map(c=>Math.max(0,Math.min(255,c)).toString(16).padStart(2,'0')).join('')}
/* 지금 입은 옷 → 어떤 그림을 쓸지 */
function meOutfit(w){
 w=w||(S&&S.wear)||{top:'t0',bot:'b0'};
 const t=WARDROBE.top.find(i=>i.id===w.top)||{},b=WARDROBE.bot.find(i=>i.id===w.bot)||{};
 if(t.dress||(b.v&&b.v.type==='skirt'))return 'hoodie';
 if(b.id==='b2')return 'daily';
 return 'practice';
}
const OUTFIT_NAME={practice:'연습복',hoodie:'후디 + 스커트',daily:'후디 + 와이드 데님'};
const PH_PAL=[['#f4a9bf','#fde3ea'],['#c3aee9','#efe7fb'],['#f3bf9c','#fdeee3'],['#9fd3bf','#e6f6ef'],['#a6c4ea','#e6eef9'],['#ecd08c','#fbf3dc']];
function phCard(name,color,bust){
 let h=0;for(const ch of (name||'?'))h=(h*31+ch.charCodeAt(0))%9973;
 const [c1,c2]=PH_PAL[h%PH_PAL.length];
 return `<div class="gi ph ${bust?'bust':'full'}" style="--pc:${c1};--pc2:${c2}"><i class="sil"></i><b>${name||''}</b></div>`;
}
function girl(p){
 p=p||{};const bust=!!p.bust;let src=null,ph=null;
 if(p.who){src=ART.npc[p.who]||null;if(!src)ph=[CAST[p.who]?CAST[p.who].name:'',p.top&&p.top.c1]}
 else if(p.tm){ph=[p.tm,p.top&&p.top.c1||p.hc]}
 else src=ART.me[p.outfit||meOutfit(p.wear)];
 if(!src) return phCard(ph[0],ph[1],bust);
 const mood=p.expr==='sad'||p.expr==='tired'?' sad':'';
 return `<div class="gi ${bust?'bust':'full'}${mood}" style="background-image:url('${src}');${bust?`background-position:${FOCUS[src]||'50% 1%'}`:''}"></div>`;
}
function portrait(who,expr){if(who==='me')return girl({...playerLook(),bust:true,expr});const c=CAST[who];return c?girl({...c.look,who,bust:true,expr}):phCard('?','#ccc',true)}
/* 일정마다 장면 배경 */
function sceneBG(bk){
 const k={A:'bg_practice',B:'bg_practice',C:'bg_cafe',D:'env_street',E:'env_company',F:'bg_home'}[bk];
 if(bk==='G') return `<div class="sbg stagebg"><i></i><i></i><i></i></div>`;
 return `<div class="sbg kb" style="background-image:url('${ARTBG[k||'bg_home']}')"></div>`;
}
/* 일정 종류 → 그 장면에서 입을 옷 */
function actOutfit(bk){return bk==='A'||bk==='B'?'practice':bk==='F'?'daily':null}
