/* ============ 캐릭터 일러스트 (SVG) ============ */
let GID=0;
const SK='#fff1e8',SKS='#f6d3c6',LN='#6b4450';
function mix(h,w){const n=parseInt(h.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;const f=c=>Math.round(c+(w>0?(255-c)*w:c*w)).toString(16).padStart(2,'0');return '#'+f(r)+f(g)+f(b)}
function girl(p={}){
 const P=Object.assign({hair:'long',hc:'#2b2030',hh:'#6a5578',eye:'#8a4f7a',expr:'smile',top:{type:'hoodie',c1:'#b9bdc7',c2:'#8f94a0'},bot:{type:'pants',c:'#2a2c38'},shoe:'#ffffff',bust:false,glasses:false,old:false,male:false,mic:false,crown:false},p);
 const id='g'+(++GID), L=`stroke="${LN}" stroke-width="2" stroke-linejoin="round"`, L1=`stroke="${LN}" stroke-width="1.4" stroke-linejoin="round"`;
 const hc=P.hc, hd=mix(hc,-.25);
 const vb=P.bust?'46 42 148 196':'0 38 240 522';
 let s=`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg"><defs>
 <linearGradient id="${id}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1222"/><stop offset=".5" stop-color="${P.eye}"/><stop offset="1" stop-color="${mix(P.eye,.55)}"/></linearGradient>
 <linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(hc,.12)}"/><stop offset="1" stop-color="${hd}"/></linearGradient>
 <clipPath id="${id}a"><ellipse cx="102" cy="144" rx="12.2" ry="12.4"/></clipPath><clipPath id="${id}b"><ellipse cx="138" cy="144" rx="12.2" ry="12.4"/></clipPath></defs>`;
 const HF=`fill="url(#${id}h)"`;
 /* --- 뒷머리 --- */
 const BH={
  long:`M76 100 Q58 210 66 352 Q80 364 98 354 Q100 272 100 206 L140 206 Q140 272 142 354 Q160 364 174 352 Q182 210 164 100 Q120 50 76 100Z`,
  wave:`M76 100 Q56 170 70 228 Q56 282 72 330 Q64 352 86 358 Q100 302 96 252 Q102 222 100 206 L140 206 Q138 222 144 252 Q140 302 154 358 Q176 352 168 330 Q184 282 170 228 Q184 170 164 100 Q120 50 76 100Z`,
  bob:`M76 100 Q62 160 72 200 Q120 214 168 200 Q178 160 164 100 Q120 50 76 100Z`,
  pony:`M78 100 Q72 150 82 182 L158 182 Q168 150 162 100 Q120 52 78 100Z M148 74 Q200 70 194 150 Q192 214 208 266 Q178 250 170 204 Q162 144 150 100Z`,
  twin:`M78 100 Q72 150 82 182 L158 182 Q168 150 162 100 Q120 52 78 100Z M86 128 Q50 172 58 252 Q62 292 50 322 Q86 302 88 252 Q88 192 98 142Z M154 128 Q190 172 182 252 Q178 292 190 322 Q154 302 152 252 Q152 192 142 142Z`,
  short:`M78 104 Q74 140 84 164 L156 164 Q166 140 162 104 Q120 54 78 104Z`,
  bun:`M80 104 Q76 140 86 160 L154 160 Q164 140 160 104 Q120 56 80 104Z`,
 };
 s+=`<path d="${BH[P.hair]}" ${HF} ${L}/>`;
 if(P.hair==='bun') s+=`<circle cx="120" cy="60" r="17" ${HF} ${L}/>`;
 if(P.hair==='pony') s+=`<path d="M146 70 q10 -6 14 6 q-4 10 -14 6z" fill="#ff8fb8" ${L1}/>`;
 if(P.hair==='twin') s+=`<circle cx="90" cy="136" r="5" fill="#ff8fb8" ${L1}/><circle cx="150" cy="136" r="5" fill="#ff8fb8" ${L1}/>`;
 /* --- 하의 --- */
 const B=P.bot||{};
 if(B.type==='pants'){
  s+=`<path d="M80 330 L121 336 L118 528 L82 528Z" fill="${B.c}" ${L}/><path d="M119 336 L160 330 L158 528 L122 528Z" fill="${B.c}" ${L}/>`;
  s+=`<path d="M100 360 Q98 440 102 520 M140 360 Q142 440 138 520" stroke="${mix(B.c,-.25)}" stroke-width="2" fill="none" opacity=".7"/>`;
  if(B.stripe) s+=`<path d="M84 342 L86 524 M156 342 L154 524" stroke="${B.stripe}" stroke-width="3.5"/>`;
 } else if(B.type==='skirt'){
  s+=`<path d="M98 396 L112 396 L111 530 L99 530Z M128 396 L142 396 L141 530 L129 530Z" fill="${SK}" ${L1}/><path d="M98 452 L112 452 L111 530 L99 530Z M128 452 L142 452 L141 530 L129 530Z" fill="#fff" ${L1}/>`;
  s+=`<path d="M82 326 L158 326 L176 402 Q120 414 64 402Z" fill="${B.c}" ${L}/>`+[78,94,110,126,142,158].map(x=>`<path d="M${x+ (x-120)*-.25} 330 L${x+(x-120)*.15} 404" stroke="${mix(B.c,-.18)}" stroke-width="1.6"/>`).join('');
 } else if(B.type==='shorts'){
  s+=`<path d="M96 380 L112 380 L111 470 L99 470Z M128 380 L144 380 L141 470 L129 470Z" fill="${SK}" ${L1}/>`;
  s+=`<path d="M82 326 L158 326 L162 386 L123 388 L120 364 L117 388 L78 386Z" fill="${B.c}" ${L}/>`;
  s+=`<path d="M94 462 L114 462 L114 540 L88 540 Q86 528 94 520Z M126 462 L146 462 L152 520 Q154 528 152 540 L126 540Z" fill="${B.boot||'#1c1c22'}" ${L}/>`;
 }
 if(B.type==='pants'||B.type==='skirt'){
  s+=`<path d="M80 524 L118 524 Q124 542 118 552 L70 552 Q64 538 80 524Z" fill="${P.shoe}" ${L}/><path d="M122 524 L160 524 Q176 538 170 552 L122 552 Q116 542 122 524Z" fill="${P.shoe}" ${L}/><path d="M70 546 L120 546 M120 546 L170 546" stroke="${LN}" stroke-width="1.2"/>`;
 }
 /* --- 상의 --- */
 const T=P.top||{}, c1=T.c1||'#fff', c2=T.c2||mix(c1,-.2);
 const hand=(x,dir)=>`<path d="M${x} 332 Q${x-dir*2} 349 ${x+dir*8} 350 Q${x+dir*17} 347 ${x+dir*16} 334Z" fill="${SK}" ${L1}/>`;
 if(T.type==='hoodie'){
  s+=`<path d="M78 214 Q58 224 54 270 L50 330 Q64 342 80 336 L84 268Z" fill="${c1}" ${L}/><path d="M162 214 Q182 224 186 270 L190 330 Q176 342 160 336 L156 268Z" fill="${c1}" ${L}/>`;
  s+=hand(52,1)+hand(188,-1);
  s+=`<path d="M50 322 Q64 332 82 328 L80 338 Q62 342 50 332Z M190 322 Q176 332 158 328 L160 338 Q178 342 190 332Z" fill="${c2}" ${L1}/>`;
  s+=`<path d="M78 214 Q120 200 162 214 L170 262 L166 340 Q120 350 74 340 L70 262Z" fill="${c1}" ${L}/>`;
  s+=`<path d="M74 330 Q120 340 166 330 L166 344 Q120 354 74 344Z" fill="${c2}" ${L1}/>`;
  s+=`<path d="M88 236 Q94 282 86 328 M152 236 Q146 282 154 328 M62 262 Q68 292 62 318 M178 262 Q172 292 178 318" stroke="${c2}" stroke-width="2.2" fill="none" opacity=".8"/>`;
  s+=`<path d="M92 294 L148 294 L154 326 L86 326Z" fill="none" stroke="${c2}" stroke-width="2"/>`;
  s+=`<path d="M94 206 Q120 232 146 206 Q158 214 147 228 Q120 244 93 228 Q82 214 94 206Z" fill="${c2}" ${L1}/>`;
  s+=`<path d="M112 230 L109 276 M128 230 L131 280" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M107 274 l4 0 l0 8 l-4 0z M129 278 l4 0 l0 8 l-4 0z" fill="#fff" ${L1}/>`;
  if(T.logo) s+=`<text x="120" y="270" font-size="9" text-anchor="middle" fill="${mix(c1,-.35)}" font-family="Jua,sans-serif" letter-spacing="1.5">${T.logo}</text>`;
 } else if(T.type==='tee'||T.type==='shirt'){
  s+=`<path d="M62 262 Q54 300 56 336 L70 338 Q70 300 78 266Z M178 262 Q186 300 184 336 L170 338 Q170 300 162 266Z" fill="${SK}" ${L1}/>`;
  s+=hand(56,1)+hand(184,-1);
  s+=`<path d="M82 212 L60 226 L56 264 L80 268 L88 238Z M158 212 L180 226 L184 264 L160 268 L152 238Z" fill="${c1}" ${L}/>`;
  s+=`<path d="M82 212 Q120 202 158 212 L164 252 L162 336 Q120 344 78 336 L76 252Z" fill="${c1}" ${L}/>`;
  s+=`<path d="M104 209 Q120 224 136 209" fill="none" ${L1}/><path d="M92 250 Q96 296 90 332 M148 250 Q144 296 150 332 M120 300 L118 336" stroke="${c2}" stroke-width="2" fill="none" opacity=".9"/>`;
  if(T.logo) s+=`<text x="120" y="262" font-size="11" text-anchor="middle" fill="${mix(c1,-.4)}" font-family="Jua,sans-serif" letter-spacing="1">${T.logo}</text>`;
 } else if(T.type==='jacket'||T.type==='cardigan'){
  s+=`<path d="M80 214 Q62 224 58 270 L56 328 Q68 338 80 332 L84 268Z M160 214 Q178 224 182 270 L184 328 Q172 338 160 332 L156 268Z" fill="${c1}" ${L}/>`;
  s+=hand(56,1)+hand(184,-1);
  s+=`<path d="M96 208 L144 208 L150 334 L90 334Z" fill="${c2}" ${L1}/>`;
  s+=`<path d="M80 214 Q94 206 104 207 L110 336 Q92 340 74 336 L72 262Z M160 214 Q146 206 136 207 L130 336 Q148 340 166 336 L168 262Z" fill="${c1}" ${L}/>`;
  s+=`<path d="M104 207 L96 244 L108 238Z M136 207 L144 244 L132 238Z" fill="${mix(c1,-.15)}" ${L1}/>`;
  if(T.type==='cardigan') s+=[250,276,302].map(y=>`<circle cx="104" cy="${y}" r="2.2" fill="#fff" ${L1}/>`).join('');
 } else if(T.type==='dress'){
  s+=`<path d="M68 238 Q60 290 62 336 L74 338 Q76 290 84 244Z M172 238 Q180 290 178 336 L166 338 Q164 290 156 244Z" fill="${SK}" ${L1}/>`+hand(60,1)+hand(180,-1);
  const long=T.long;
  s+= long?`<path d="M90 276 Q120 288 150 276 L198 540 Q120 560 42 540Z" fill="${c2}" ${L}/><path d="M104 300 L84 538 M120 300 L120 548 M136 300 L156 538" stroke="${mix(c2,-.12)}" stroke-width="1.6"/>`
   :`<path d="M90 276 Q120 288 150 276 L186 394 Q120 414 54 394Z" fill="${c2}" ${L}/><path d="M56 392 Q72 402 88 398 Q104 408 120 402 Q136 408 152 398 Q168 402 184 392" fill="none" stroke="#fff" stroke-width="3"/>`;
  if(!long) s+=`<path d="M100 404 L112 404 L111 530 L99 530Z M128 404 L140 404 L141 530 L129 530Z" fill="${SK}" ${L1}/><path d="M80 524 L118 524 Q124 542 118 552 L70 552 Q64 538 80 524Z M122 524 L160 524 Q176 538 170 552 L122 552 Q116 542 122 524Z" fill="${P.shoe}" ${L}/>`;
  s+=`<path d="M86 212 Q120 202 154 212 L150 280 Q120 290 90 280Z" fill="${c1}" ${L}/>`;
  s+=`<path d="M86 212 Q62 212 64 238 Q76 250 92 238Z M154 212 Q178 212 176 238 Q164 250 148 238Z" fill="${c1}" ${L}/>`;
  s+=`<path d="M120 280 l-14 -9 l0 18z M120 280 l14 -9 l0 18z" fill="${T.rib||'#ff8fb8'}" ${L1}/><circle cx="120" cy="280" r="4" fill="${T.rib||'#ff8fb8'}" ${L1}/>`;
  s+=`<path d="M104 209 Q120 222 136 209" fill="none" ${L1}/>`;
 }
 /* --- 목 --- */
 s+=`<path d="M110 176 L110 212 Q120 216 130 212 L130 176Z" fill="${SK}" ${L1}/><path d="M110 182 Q120 196 130 182 L130 194 Q120 206 110 194Z" fill="${SKS}"/>`;
 /* --- 얼굴 --- */
 s+=`<path d="M80 112 C80 158 94 178 120 192 C146 178 160 158 160 112 C160 74 80 74 80 112Z" fill="${SK}" ${L}/>`;
 s+=`<path d="M82 116 Q120 134 158 116 L158 126 Q120 144 82 126Z" fill="${SKS}" opacity=".55"/>`;
 // 볼터치
 const shyb=P.expr==='shy'?'.75':'.45';
 s+=`<ellipse cx="94" cy="163" rx="10" ry="5.5" fill="#ff9cb5" opacity="${shyb}"/><ellipse cx="146" cy="163" rx="10" ry="5.5" fill="#ff9cb5" opacity="${shyb}"/>`;
 s+=`<path d="M88 165 l4 -6 M93 165 l4 -6 M98 165 l4 -6 M140 165 l4 -6 M145 165 l4 -6 M150 165 l4 -6" stroke="#f27f9c" stroke-width="1.2" stroke-linecap="round"/>`;
 // 눈
 const ex=P.expr;
 const lash=(cx,cy,d)=>`<path d="M${cx-d*12} ${cy-2} Q${cx-d*2} ${cy-15} ${cx+d*12} ${cy-6} L${cx+d*17} ${cy-11} Q${cx+d*16} ${cy-4} ${cx+d*13} ${cy-2} Q${cx} ${cy-9} ${cx-d*12} ${cy} Z" fill="#2a1a26"/>`;
 const openEye=(cx,d,clip,o={})=>{const cy=142,lx=o.lx||0,ly=o.ly||0,ir=o.small?.72:1;let e=`<ellipse cx="${cx}" cy="${cy+2}" rx="12.2" ry="12.4" fill="#fff"/>`;
  e+=`<g clip-path="url(#${clip})"><ellipse cx="${cx+lx}" cy="${cy+4+ly}" rx="${9.3*ir}" ry="${11.8*ir}" fill="url(#${id}i)"/><ellipse cx="${cx+lx}" cy="${cy+5.5+ly}" rx="${3.6*ir}" ry="${5*ir}" fill="#1a0f1c"/><path d="M${cx-14} ${cy-6} Q${cx} ${cy-2} ${cx+14} ${cy-6} L${cx+14} ${cy-12} L${cx-14} ${cy-12}Z" fill="#000" opacity=".12"/></g>`;
  e+=`<circle cx="${cx+lx-3}" cy="${cy+ly}" r="3.4" fill="#fff"/><circle cx="${cx+lx+3.5}" cy="${cy+9+ly}" r="1.7" fill="#fff"/><circle cx="${cx+lx+4}" cy="${cy-1+ly}" r="1" fill="#fff"/>`;
  if(o.half) e+=`<path d="M${cx-13} ${cy-9} L${cx+13} ${cy-9} L${cx+13} ${cy+1} Q${cx} ${cy-2} ${cx-13} ${cy+1}Z" fill="${SK}"/><path d="M${cx-13} ${cy+1} Q${cx} ${cy-3} ${cx+13} ${cy+1}" stroke="#2a1a26" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
  else e+=lash(cx,cy,d);
  if(!P.male){e+=`<path d="M${cx-d*7} ${cy-14} Q${cx+d*3} ${cy-19} ${cx+d*12} ${cy-12}" stroke="${LN}" stroke-width="1.1" fill="none"/><path d="M${cx-d*8} ${cy+13} Q${cx} ${cy+16} ${cx+d*8} ${cy+12}" stroke="#a06a7a" stroke-width="1.1" fill="none"/>`}
  return e};
 const EW=(cx,str)=>`<g transform="translate(${cx} 144) scale(1.22) translate(${-cx} -144)">${str}</g>`;
 const closedEye=(cx,d)=>`<path d="M${cx-12} ${144} Q${cx} ${132} ${cx+12} ${144}" stroke="#2a1a26" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M${cx+d*12} 144 l${d*4} -3" stroke="#2a1a26" stroke-width="2.4" stroke-linecap="round"/>`;
 let eyes='';
 let eL,eR;
 if(ex==='happy'||P.old&&ex==='smile'){eL=closedEye(102,-1);eR=closedEye(138,1)}
 else if(ex==='wink'){eL=openEye(102,-1,id+'a');eR=closedEye(138,1)}
 else if(ex==='tired'){eL=openEye(102,-1,id+'a',{half:1,ly:2});eR=openEye(138,1,id+'b',{half:1,ly:2})}
 else if(ex==='surprise'){eL=openEye(102,-1,id+'a',{small:1});eR=openEye(138,1,id+'b',{small:1})}
 else if(ex==='shy'){eL=openEye(102,-1,id+'a',{ly:3,lx:-1});eR=openEye(138,1,id+'b',{ly:3,lx:-1})}
 else if(ex==='smug'){eL=openEye(102,-1,id+'a')+`<path d="M89 136 L115 138" stroke="${SK}" stroke-width="5"/><path d="M89 138 Q102 134 115 139" stroke="#2a1a26" stroke-width="3" fill="none" stroke-linecap="round"/>`;eR=openEye(138,1,id+'b')+`<path d="M125 138 L151 136" stroke="${SK}" stroke-width="5"/><path d="M125 139 Q138 134 151 138" stroke="#2a1a26" stroke-width="3" fill="none" stroke-linecap="round"/>`}
 else {eL=openEye(102,-1,id+'a');eR=openEye(138,1,id+'b')}
 eyes=EW(100,eL.replace(/(cx|x|M|L|Q) ?/g,m=>m))+'';
 eyes=`<g transform="translate(-2 0)">${EW(102,eL)}</g><g transform="translate(2 0)">${EW(138,eR)}</g>`;
 s+=eyes.replace(/^/, '');
 // 눈썹
 const bw={normal:[0,0],sad:[-4,2],shy:[-3,1],smug:[2,-2],surprise:[-4,-4],tired:[-2,1],angry:[4,-1]}[ex]||[0,0];
 s+=`<path d="M${92} ${120+bw[0]} Q102 ${116+Math.min(bw[0],bw[1])} 113 ${120+bw[1]}" stroke="${hd}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M127 ${120+bw[1]} Q138 ${116+Math.min(bw[0],bw[1])} 148 ${120+bw[0]}" stroke="${hd}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
 // 코, 입
 s+=`<path d="M121 158 l-1.6 3.4" stroke="#d99a8a" stroke-width="1.6" stroke-linecap="round"/>`;
 const M={
  smile:`<path d="M112 171 Q120 177 128 171" stroke="#b44a66" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  happy:`<path d="M110 168 Q120 182 130 168 Q120 172 110 168Z" fill="#e8607e" stroke="#b44a66" stroke-width="1.6"/><path d="M114 174 Q120 179 126 174 Q120 176 114 174Z" fill="#ffb0c0"/>`,
  wink:`<path d="M110 168 Q120 182 130 168 Q120 172 110 168Z" fill="#e8607e" stroke="#b44a66" stroke-width="1.6"/>`,
  normal:`<path d="M115 172 Q120 174.5 125 172" stroke="#b44a66" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  tired:`<path d="M114 174 Q118 171 121 174 Q124 177 127 174" stroke="#b44a66" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  surprise:`<ellipse cx="120" cy="173" rx="4" ry="5.5" fill="#c94f6d" stroke="#8a3048" stroke-width="1.2"/>`,
  sad:`<path d="M114 175 Q120 170 126 175" stroke="#b44a66" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  shy:`<path d="M116 173 Q120 175 124 173" stroke="#b44a66" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
  smug:`<path d="M113 172 Q122 175 128 167" stroke="#b44a66" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  angry:`<path d="M114 174 L126 174" stroke="#b44a66" stroke-width="2.2" stroke-linecap="round"/>`,
 };
 s+=M[ex]||M.smile;
 if(ex==='tired') s+=`<path d="M156 100 Q163 113 156 118 Q149 113 156 100Z" fill="#a8dcff" ${L1}/>`;
 if(ex==='sad') s+=`<path d="M92 156 Q90 164 94 166 Q97 162 92 156Z" fill="#a8dcff" opacity=".85"/>`;
 if(P.old) s+=`<path d="M86 150 l-6 3 M154 150 l6 3 M110 182 Q120 186 130 182" stroke="#d0a090" stroke-width="1.2" fill="none"/>`;
 /* --- 앞머리 --- */
 if(P.hair==='bob') s+=`<path d="M80 124 Q76 76 120 72 Q164 76 160 124 Q154 112 146 118 L140 106 L131 120 L122 106 L112 120 L103 106 L95 118 Q86 112 80 124Z" ${HF} ${L}/><path d="M80 108 Q68 162 78 200 Q92 190 90 118Z M160 108 Q172 162 162 200 Q148 190 150 118Z" ${HF} ${L}/>`;
 else if(P.hair==='short') s+=`<path d="M80 118 Q78 70 120 66 Q162 70 160 118 Q150 96 138 106 L129 90 L117 106 L106 90 L97 106 Q86 100 80 118Z" ${HF} ${L}/>`;
 else if(P.hair==='bun') s+=`<path d="M82 120 Q80 74 120 70 Q160 74 158 120 Q148 92 120 90 Q92 92 82 120Z" ${HF} ${L}/>`;
 else {
  s+=`<path d="M78 122 Q70 62 120 56 Q170 62 162 122 Q156 96 146 88 Q120 80 94 88 Q84 96 78 122Z" ${HF} ${L}/>`;
  s+=`<path d="M84 96 Q88 112 84 128 Q90 116 94 104 Q96 116 96 128 Q102 114 106 100 Q110 114 114 130 Q118 112 122 98 Q126 114 130 130 Q134 114 138 100 Q142 114 146 128 Q148 114 150 104 Q154 114 156 126 Q158 110 156 96 Q120 72 84 96Z" ${HF}/><path d="M84 96 Q88 112 84 128 Q90 116 94 104 Q96 116 96 128 Q102 114 106 100 Q110 114 114 130 Q118 112 122 98 Q126 114 130 130 Q134 114 138 100 Q142 114 146 128 Q148 114 150 104 Q154 114 156 126 Q158 110 156 96" fill="none" ${L1}/>`;
  s+=`<path d="M100 72 Q97 96 104 118 M120 66 Q123 94 121 122 M140 72 Q143 96 137 116" stroke="${hd}" stroke-width="1.3" fill="none" opacity=".7"/>`;
  if(P.hair==='long'||P.hair==='wave') s+=`<path d="M78 104 Q64 172 70 268 Q84 246 85 204 Q86 152 87 112Z M162 104 Q176 172 170 268 Q156 246 155 204 Q154 152 153 112Z" ${HF} ${L}/><path d="M76 160 Q74 200 78 240 M164 160 Q166 200 162 240" stroke="${P.hh}" stroke-width="2" fill="none" opacity=".6"/>`;
  else s+=`<path d="M82 108 Q72 150 80 186 Q90 166 90 116Z M158 108 Q168 150 160 186 Q150 166 150 116Z" ${HF} ${L}/>`;
 }
 const hy=['bob','short','bun'].includes(P.hair)?8:0;s+=`<path d="M92 ${76+hy} Q106 ${68+hy} 116 ${70+hy} M126 ${70+hy} Q138 ${68+hy} 150 ${78+hy}" stroke="${P.hh}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"/>`;
 /* --- 소품 --- */
 if(P.glasses) s+=`<rect x="88" y="132" width="28" height="22" rx="8" fill="#fff" fill-opacity=".15" stroke="#4a3a3a" stroke-width="2"/><rect x="124" y="132" width="28" height="22" rx="8" fill="#fff" fill-opacity=".15" stroke="#4a3a3a" stroke-width="2"/><path d="M116 140 L124 140" stroke="#4a3a3a" stroke-width="2"/>`;
 if(P.mic) s+=`<path d="M84 150 Q84 176 106 176" stroke="#3a3a44" stroke-width="2.5" fill="none"/><ellipse cx="108" cy="176" rx="3.5" ry="2.6" fill="#3a3a44"/>`;
 if(P.crown) s+=`<path d="M96 70 L102 52 L111 64 L120 48 L129 64 L138 52 L144 70Z" fill="#ffd36e" ${L1}/><circle cx="120" cy="58" r="3" fill="#ff7eb6"/>`;
 const A=P.acc;
 if(A==='ribbon') s+=`<g transform="translate(146 84) rotate(25)"><path d="M0 0 L-9 -6 L-9 6Z M0 0 L9 -6 L9 6Z" fill="#fff" ${L1}/><circle r="2.6" fill="#ff8fb8"/></g>`;
 else if(A==='headband') s+=`<path d="M80 98 Q120 58 160 98" stroke="${LN}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M80 98 Q120 58 160 98" stroke="#ff8fb8" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="138" cy="72" r="5" fill="#fff" ${L1}/>`;
 else if(A==='cap') s+=`<path d="M74 96 Q74 46 120 44 Q166 46 166 96 Q120 84 74 96Z" fill="#1f1f27" ${L}/><path d="M66 98 Q120 80 174 98 Q180 108 170 110 Q120 94 70 110 Q60 108 66 98Z" fill="#2c2c36" ${L}/><text x="120" y="78" font-size="16" text-anchor="middle" fill="#fff" font-family="Jua,sans-serif">K</text>`;
 else if(A==='pin') s+=`<path d="M146 88 l3 7 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1z" fill="#ffd36e" ${L1}/><path d="M92 92 l2 5 l5 1 l-4 3 l1 5 l-4 -2 l-4 2 l1 -5 l-4 -3 l5 -1z" fill="#ff9ec7" ${L1}/>`;
 else if(A==='beret') s+=`<ellipse cx="114" cy="66" rx="44" ry="17" fill="#c0304a" ${L} transform="rotate(-12 114 66)"/><path d="M108 50 l4 -8" stroke="${LN}" stroke-width="3" stroke-linecap="round"/>`;
 else if(A==='tiara') s+=`<path d="M94 76 L100 62 L108 70 L114 56 L120 52 L126 56 L132 70 L140 62 L146 76 Q120 70 94 76Z" fill="#e8f0ff" ${L1}/><circle cx="120" cy="60" r="4" fill="#9ad7ff" ${L1}/><circle cx="104" cy="68" r="2.5" fill="#ff9ec7"/><circle cx="136" cy="68" r="2.5" fill="#ff9ec7"/>`;
 return s+'</svg>';
}
