/* ============ 도트 마을 맵 (단계별 테마 4종) ============ */
const MW=16, MH=15, TS=16;
function themeId(){const s=S.stage;return s>=6?'la':s>=4?'broadcast':s>=2?'gangnam':'town'}
const THEMES={
 town:{name:'서교동',style:'house',ground:'g',border:'t',
  blds:{A:[1,1,5,3,3,3,'#e2577f'],B:[10,1,5,3,12,3,'#4a8ad8'],C:[1,6,4,3,2,8,'#e8a23a'],D:[11,6,4,3,12,8,'#b45ad8'],E:[1,10,4,3,2,12,'#3aa87a'],F:[6,10,4,3,7,12,'#d85a3a'],G:[11,10,4,3,12,12,'#5a5a7a']},
  paths:[[1,4,14,4],[1,9,14,9],[1,13,14,13],[5,4,5,13],[10,4,10,13],[7,1,8,3]],
  deco:[[7,6,'F'],[8,6,'F'],[7,7,'F'],[8,7,'F'],[11,5,'v'],[12,5,'v2'],[4,5,'j'],[1,5,'P'],[6,6,'f'],[9,6,'f'],[6,8,'f'],[9,8,'f'],[6,5,'f'],[9,5,'f'],[7,5,'f'],[8,5,'f'],[7,8,'f'],[8,8,'f'],[6,7,'f'],[9,7,'f'],[6,1,'T'],[9,1,'T'],[6,3,'T'],[9,3,'T'],[2,5,'T'],[13,5,'T']],
  pal:{g1:'#88d070',g2:'#70b858',p1:'#ecdca8',p2:'#d8c48c',t1:'#3a9a4a',t2:'#2a7a3a',trunk:'#7a4a2a',w1:'#58a8e8',sky:null}},
 gangnam:{name:'강남 기획사 거리',style:'tower',ground:'p',border:'X',
  blds:{A:[1,1,5,5,3,5,'#3a5ab8'],G:[6,2,2,2,7,3,'#6a6a7a'],B:[9,1,3,3,10,3,'#2a9a9a'],E:[12,1,3,3,13,3,'#7a5ad8'],C:[1,10,4,3,2,12,'#e8a23a'],D:[6,10,4,3,7,12,'#d84a9a'],F:[11,10,4,3,12,12,'#8a6a5a']},
  paths:[],roads:[[1,7,14,8]],cross:[[7,7,8,8]],
  deco:[[1,6,'L'],[6,6,'L'],[10,6,'L'],[14,6,'L'],[1,9,'P'],[14,9,'P'],[3,8,'K'],[12,7,'K2'],[8,1,'P'],[8,3,'L'],[11,5,'P'],[9,5,'n'],[13,6,'j'],[5,6,'v']],
  pal:{g1:'#cfd3dc',g2:'#bfc4cf',p1:'#d8dbe4',p2:'#c4c8d4',r1:'#4a4e5a',r2:'#5a5e6a',t1:'#3a9a4a',t2:'#2a7a3a',trunk:'#5a4a3a',w1:'#58a8e8'}},
 broadcast:{name:'상암 엔터 거리',style:'studio',ground:'p',border:'X',
  blds:{G:[5,1,6,4,8,4,'#7a3ad8'],A:[1,1,3,3,2,3,'#3a5ab8'],B:[12,1,3,3,13,3,'#2a9a9a'],C:[1,7,3,3,2,9,'#e8a23a'],D:[12,7,3,3,13,9,'#d84a9a'],E:[1,11,3,2,2,12,'#7a5ad8'],F:[12,11,3,2,13,12,'#8a6a5a']},
  paths:[],roads:[],
  deco:[[6,8,'V'],[7,8,'V2'],[8,8,'V3'],[9,8,'V4'],[5,11,'Q'],[6,11,'Q2'],[10,11,'L'],[4,8,'y'],[11,8,'y'],[9,11,'j'],[4,5,'L'],[11,5,'L'],[5,6,'P'],[10,6,'P']],
  pal:{g1:'#d8c4a6',g2:'#c8b090',p1:'#e2cfb0',p2:'#cdb594',t1:'#5a9a4a',t2:'#3a7a3a',trunk:'#6a4a3a',w1:'#58a8e8',warm:true}},
 la:{name:'LA 산타모니카',style:'beach',ground:'s',border:'H',
  blds:{A:[1,1,4,3,2,3,'#ff9a7a'],G:[6,1,5,4,8,4,'#ff6a9a'],B:[12,1,3,3,13,3,'#5ac8d8'],C:[1,6,3,3,2,8,'#ffc85a'],D:[12,6,3,3,13,8,'#c88aff'],E:[5,6,3,3,6,8,'#7ad87a'],F:[9,6,3,3,10,8,'#ff8ac8']},
  paths:[[1,4,14,4],[1,9,14,9],[4,4,4,9],[11,4,11,9]],water:[[1,12,14,13]],
  deco:[[1,5,'h'],[14,5,'h'],[6,5,'h'],[3,10,'h'],[12,10,'h'],[7,10,'U'],[9,10,'U2'],[13,10,'k'],[5,11,'h'],[10,11,'h']],
  pal:{g1:'#f0dca0',g2:'#e4cc88',p1:'#c8a878',p2:'#b89868',t1:'#3a8a4a',t2:'#2a6a3a',trunk:'#8a5a3a',w1:'#3ab0e0'}},
};
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
let MAP=null;
function TH(){return THEMES[themeId()]}
function curBLD(){const t=TH();return Object.entries(t.blds).map(([id,b])=>({id,x:b[0],y:b[1],w:b[2],h:b[3],door:[b[4],b[5]],roof:b[6]}))}
function buildGrid(){
 const t=TH();const g=[];
 for(let y=0;y<MH;y++){g.push([]);for(let x=0;x<MW;x++)g[y].push(t.ground)}
 for(let x=0;x<MW;x++){g[0][x]=t.border;g[MH-1][x]=t.border}for(let y=0;y<MH;y++){g[y][0]=t.border;g[y][MW-1]=t.border}
 const rect=(r,c)=>{for(let y=r[1];y<=r[3];y++)for(let x=r[0];x<=r[2];x++)g[y][x]=c};
 (t.paths||[]).forEach(r=>rect(r,'p'));(t.roads||[]).forEach(r=>rect(r,'r'));(t.cross||[]).forEach(r=>rect(r,'c'));(t.water||[]).forEach(r=>rect(r,'w'));
 for(const [x,y,c] of t.deco) g[y][x]=c;
 for(const b of curBLD()) for(let y=b.y;y<b.y+b.h;y++) for(let x=b.x;x<b.x+b.w;x++) g[y][x]='B'+b.id;
 for(const b of curBLD()) g[b.door[1]][b.door[0]]='D'+b.id;
 fixReach(g);
 return g;
}
const WALKC=['g','s','p','f','c','r'];
function reachSet(g,sx,sy){const seen=new Set([sx+','+sy]),q=[[sx,sy]];while(q.length){const [x,y]=q.shift();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k=nx+','+ny;if(seen.has(k)||!g[ny]||g[ny][nx]===undefined)continue;if(WALKC.includes(g[ny][nx])){seen.add(k);q.push([nx,ny])}}}return seen}
function fixReach(g){
 // 모든 건물 문 앞이 서로 이어지도록, 길을 막는 장식물을 치운다
 const fronts=curBLD().filter(b=>!(b.id==='G'&&S.stage<4)||true).map(b=>[b.door[0],b.door[1]+1]);
 for(const [x,y] of fronts) if(!WALKC.includes(g[y][x])) g[y][x]=TH().ground==='s'?'s':'p';
 const ok=()=>{const r=reachSet(g,fronts[0][0],fronts[0][1]);return fronts.every(([x,y])=>r.has(x+','+y))};
 let guard=0;
 while(!ok()&&guard++<40){
  const r=reachSet(g,fronts[0][0],fronts[0][1]);let fixed=false;
  for(let y=1;y<MH-1&&!fixed;y++)for(let x=1;x<MW-1&&!fixed;x++){const c=g[y][x];if(WALKC.includes(c)||c[0]==='B'||c[0]==='D'||c==='w')continue;
   if([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>r.has((x+dx)+','+(y+dy)))){const keep=c;g[y][x]=TH().ground==='s'?'s':'p';const r2=reachSet(g,fronts[0][0],fronts[0][1]);if(r2.size>r.size+1){fixed=true}else g[y][x]=keep}}
  if(!fixed){for(let y=1;y<MH-1;y++)for(let x=1;x<MW-1;x++){const c=g[y][x];if(!WALKC.includes(c)&&c[0]!=='B'&&c[0]!=='D'&&c!=='w'&&!['t','X','H'].includes(c))g[y][x]='p'}break}
 }
}
/* 도트 캐릭터 (16x20) */
const SPR={
 down:[".....kkkkkk.....","...kkhhhhhhkk...","..khhhHHhhhhhk..",".khhhhhhhhhhrrk.",".khhhhhhhhhhhhk.",".khhkssssssskhhk",".khksesssseskhk.",".khksesssseskhk.",".khkbssssssbkhk.","..hhkkssssskkhh.","..hhkccssscckhh.",".hkcccwccwccckh.",".hkcccwccwccckh.",".kscCccccccCcsk.","..kCCCCCCCCCCk..","...kppppppppk...","...kpppkkpppk...","...kpppkkpppk...","..kooookkooook..","..kkkkkkkkkkkk.."],
 up:[".....kkkkkk.....","...kkhhhhhhkk...","..khhhHHhhhhhk..",".khhhhhhhhhhrrk.",".khhhhhhhhhhhhk.",".khhhhhhhhhhhhk.",".khhhhHhhhhhhhk.",".khhhhhhhhhhhhk.",".khhhhhhhhhhhhk.","..khhhhhhhhhhk..","..kchhhhhhhhck..",".kcchhhhhhhhcck.",".kccchhhhhhccck.",".kscccchhccccsk.","..kCCCCCCCCCCk..","...kppppppppk...","...kpppkkpppk...","...kpppkkpppk...","..kooookkooook..","..kkkkkkkkkkkk.."],
 left:[".....kkkkkk.....","...kkhhhhhhkk...","..khhhhhHHhhhk..",".khhhhhhhhhhhrk.",".khhhhhhhhhhhhk.","..kssskhhhhhhhk.",".ksesskhhhhhhhk.",".ksesskhhhhhhhk.",".kbssskhhhhhhhk.","..ksssskhhhhhhk.","...kccsckhhhhk..","...kccccchhhhk..","...kcccccchhk...","...kscccccCk....","...kCCCCCCCk....","....kppppppk....","....kpppppk.....","....kpppppk.....","...koooooook....","...kkkkkkkkk...."],
};
const WALK={
 down:[["...kpppkkpppk...","...kpppk.kppk...","..kooook.kppk...","..kkkkkk.kook..."],["...kpppkkpppk...","...kppk.kpppk...","...kppk.kooook..","...kook.kkkkkk.."]],
 left:[["...kppk.kppk....","..kppk...kppk...","..kook....kook..","..kkkk....kkkk.."],["....kpppppk.....","....kppppk......","....koooook.....","....kkkkkkk....."]],
};
WALK.up=WALK.down;
function sprFrame(dir,f){const d=dir==='right'?'left':dir;let rows=SPR[d].slice();if(f>0){rows.splice(16,4,...WALK[d][f-1])}if(dir==='right')rows=rows.map(r=>r.split('').reverse().join(''));return rows}
function drawSprite(ctx,px,py,dir,f,pal,short,stick){
 const rows=sprFrame(dir,f);
 for(let y=0;y<20;y++){const r=rows[y];for(let x=0;x<16;x++){let c=r[x];if(c==='.')continue;if(short&&y>=9&&(c==='h'||c==='H'))continue;if(short&&c==='r')c='h';const col=pal[c];if(!col)continue;ctx.fillStyle=col;ctx.fillRect(px+x,py+y,1,1)}}
 if(stick){ctx.fillStyle='#2a1a2a';ctx.fillRect(px+14,py+6,1,8);ctx.fillStyle=stick;ctx.fillRect(px+13,py+2,3,5);ctx.fillStyle='#fff';ctx.fillRect(px+14,py+3,1,2)}
}
function playerPal(){const t=wearItem('top').v,b=wearItem('bot'),h=wearItem('hair').v;const top=t.c1||'#c0c4cc';return {k:'#2a1a2a',h:h.hc,H:h.hh,s:'#ffe2cf',e:'#2a1a2a',b:'#ff9fb0',w:'#ffffff',c:top,C:mix(top,-.25),p:b.v&&b.v.c?b.v.c:mix(top,-.2),o:wearItem('shoe').v,r:'#ff7eb6'}}
function npcPal(L){const top=(L.top&&L.top.c1)||'#ddd';return {k:'#2a1a2a',h:L.hc,H:L.hh||mix(L.hc,.3),s:'#ffe2cf',e:'#2a1a2a',b:'#ff9fb0',w:'#ffffff',c:top,C:mix(top,-.25),p:'#3a3c4a',o:'#ffffff',r:L.hair==='pony'||L.hair==='twin'?'#ff8fb8':L.hc}}

function drawTile(ctx,x,y,c,T,tick){
 {const X=x*TS,Y=y*TS,R=(a,b,w,h,col)=>{ctx.fillStyle=col;ctx.fillRect(X+a,Y+b,w,h)};const gr=()=>{if(themeId()==='town'){R(0,0,16,16,T.g1);R(3,4,1,2,T.g2);R(11,10,1,2,T.g2)}else{R(0,0,16,16,T.p1);R(0,0,16,1,T.p2);R(0,0,1,16,T.p2)}};
 if(c==='F'){R(0,0,16,16,'#c8c0b0');R(1,1,14,14,T.w1);const o=(tick>>3)%8;R((o+2)%12+1,5,3,1,'#bfe8ff');R((o+7)%12+1,10,3,1,'#bfe8ff');if((x+y)%2===0){R(6,2,4,6,'#e8f6ff');R(7,0,2,3,'#ffffff')}return}
 if(c[0]==='v'){gr();R(3,0,10,16,'#2a1a2a');R(4,1,8,14,c==='v2'?'#3a8ad8':'#e84a5a');R(5,2,6,6,'#bfe6ff');for(let i=0;i<3;i++)R(5+i*2,3,1,4,['#ffd34d','#9be59b','#ff7eb6'][i]);R(5,10,6,2,'#222');return}
 if(c==='j'){gr();R(4,4,8,11,'#2a1a2a');R(5,5,6,9,'#6a8a6a');R(4,3,8,2,'#4a6a4a');return}
 if(c==='y'){gr();R(7,6,1,10,'#888');R(3,0,5,6,'#ff7eb6');R(8,1,5,6,'#ffd36e');R(5,4,5,5,'#9ed2ff');return}
 if(c==='k'){gr();R(0,2,16,4,'#e84a5a');for(let i=0;i<16;i+=4)R(i,2,2,4,'#fff');R(1,6,2,8,'#8a5a3a');R(13,6,2,8,'#8a5a3a');R(0,10,16,5,'#c8945a');return}}
 const X=x*TS,Y=y*TS,R=(a,b,w,h,col)=>{ctx.fillStyle=col;ctx.fillRect(X+a,Y+b,w,h)};
 const ground=()=>{R(0,0,16,16,T.g1);R(3,4,1,2,T.g2);R(4,3,1,1,T.g2);R(11,10,1,2,T.g2);R(12,9,1,1,T.g2)};
 const path=()=>{R(0,0,16,16,T.p1);R(0,0,16,1,T.p2);R(0,0,1,16,T.p2);R(7,7,1,1,T.p2)};
 switch(c[0]){
 case 'g':case 's':ground();break;
 case 'p':path();break;
 case 'r':R(0,0,16,16,T.r1||'#4a4e5a');if(y%2===0)R(4,15,8,1,'#d8d8a0');break;
 case 'c':R(0,0,16,16,T.r1||'#4a4e5a');for(let i=0;i<16;i+=4)R(i,1,2,14,'#f4f4f4');break;
 case 'f':ground();['#ff5a7a','#fff','#ffd34d'].forEach((col,i)=>{const fx=3+i*5,fy=4+((i*7)%8)+((tick>>4)%2&&i===1?1:0);R(fx,fy,2,2,col);R(fx,fy+2,1,2,'#2a7a3a')});break;
 case 'w':R(0,0,16,16,T.w1);{const o=(tick>>3)%8;R((o+2)%14,4,3,1,'#bfe8ff');R((o+8)%14,11,3,1,'#bfe8ff')}if(themeId()==='la'&&MAP.g[y-1]&&MAP.g[y-1][x]!=='w'){R(0,0,16,3,'#e8f8ff')}break;
 case 't':case 'T':ground();R(6,11,4,5,T.trunk);R(1,3,14,9,T.t2);R(3,1,10,12,T.t2);R(3,2,9,7,T.t1);R(2,4,11,5,T.t1);R(5,3,3,2,'#5aba5a');break;
 case 'h':case 'H':ground();R(7,5,2,11,T.trunk);R(2,3,12,3,'#3a9a4a');R(5,1,6,2,'#3a9a4a');R(1,5,3,2,'#2a7a3a');R(12,5,3,2,'#2a7a3a');R(6,5,4,2,'#8a6a3a');break;
 case 'X':R(0,0,16,16,themeId()==='broadcast'?'#9a6a56':'#5a6278');for(let i=0;i<3;i++)for(let j=0;j<3;j++)R(2+i*5,2+j*5,3,3,(tick>>5)%3===(i+j)%3?'#ffe08a':(themeId()==='broadcast'?'#c89a7a':'#7a8298'));break;
 case 'L':path();R(7,2,2,14,'#3a3a44');R(5,1,6,2,'#3a3a44');R(5,3,6,2,T.night?'#fff3a0':'#e8e8e8');if(T.night){ctx.fillStyle='rgba(255,240,160,.18)';ctx.fillRect(X-8,Y+4,32,16)}break;
 case 'P':path();R(2,8,12,8,'#8a6a4a');R(3,2,10,8,'#3a9a4a');R(4,1,8,2,'#5aba5a');break;
 case 'K':path();R(0,4,16,10,'#e84a5a');R(2,5,5,4,'#bfe6ff');R(9,5,5,4,'#bfe6ff');R(2,13,3,3,'#222');R(11,13,3,3,'#222');break;
 case 'n':path();R(1,2,14,10,'#2a2040');R(2,3,12,8,(tick>>4)%2?'#ff4fa0':'#ff8fc8');break;
 case 'U':ground();R(1,9,14,2,'#c84a4a');R(7,3,2,8,'#eee');R(2,3,12,2,(x%2)?'#ff7eb6':'#5ac8ff');break;
 case 'Q':path();R(0,4,16,10,'#ffd34d');R(1,6,7,5,'#fff');R(9,6,6,5,'#7a4a2a');R(2,13,3,3,'#222');R(11,13,3,3,'#222');if((tick>>5)%2)R(10,1,4,3,'#fff');break;
 case 'V':path();R(0,0,16,16,'#222');R(1,1,15,14,(tick>>4)%2?'#ff7eb6':'#ff9ec8');break;
 default:ground();
 }
}
function drawBuilding(ctx,b){
 const X=b.x*TS,Y=b.y*TS,W=b.w*TS,H=b.h*TS,st=TH().style;
 const locked=b.id==='G'&&S.stage<4;const R=(a,c,w,h,col)=>{ctx.fillStyle=col;ctx.fillRect(a,c,w,h)};
 const dx=(b.door[0]-b.x)*TS+X;
 if(st==='house'){
  R(X+1,Y+12,W-2,H-12,'#fdf3dc');R(X+1,Y+H-1,W-2,1,'#2a1a2a');R(X,Y+12,1,H-12,'#2a1a2a');R(X+W-1,Y+12,1,H-12,'#2a1a2a');
  R(X,Y+2,W,14,b.roof);ctx.fillStyle=mix(b.roof,-.25);for(let i=0;i<W;i+=4)ctx.fillRect(X+i,Y+2,2,14);
  R(X,Y+2,W,2,mix(b.roof,.35));R(X,Y+1,W,1,'#2a1a2a');R(X,Y+16,W,1,'#2a1a2a');
  for(let i=0;i<b.w;i++){if(X+i*TS===dx)continue;R(X+i*TS+3,Y+22,10,9,'#2a1a2a');R(X+i*TS+4,Y+23,8,7,'#8ad0ff');R(X+i*TS+4,Y+23,3,2,'#d8f0ff')}
 } else if(st==='tower'){
  R(X,Y,W,H,'#2a1a2a');R(X+1,Y+1,W-2,H-2,mix(b.roof,-.1));
  for(let yy=Y+4;yy<Y+H-12;yy+=6)for(let xx=X+3;xx<X+W-4;xx+=6){R(xx,yy,4,4,(xx+yy)%3?'#a8d8ff':'#e8f6ff')}
  R(X+1,Y+H-12,W-2,4,b.roof);R(X+2,Y+1,W-4,2,mix(b.roof,.4));
  if(b.id==='A'){ctx.fillStyle='#fff';ctx.fillRect(X+W/2-14,Y+H-24,28,8);ctx.fillStyle=b.roof;ctx.font='bold 7px sans-serif';ctx.textAlign='center';ctx.fillText(agName().slice(0,7),X+W/2,Y+H-18)}
 } else if(st==='studio'){
  R(X,Y+6,W,H-6,'#2a1a2a');R(X+1,Y+7,W-2,H-8,mix(b.roof,-.35));
  R(X+1,Y+7,W-2,3,b.roof);
  for(let xx=X+3;xx<X+W-4;xx+=5){R(xx,Y+14,3,H-28,'#ffd0f0');}
  if(b.id==='G'){R(X+W/2-1,Y-14,2,20,'#ccc');R(X+W/2-6,Y-14,12,3,'#ff4f8f');ctx.fillStyle=(MAP.tick>>4)%2?'#ff3060':'#ffd34d';ctx.fillRect(X+W/2-1,Y-16,2,2)}
  ctx.strokeStyle=(MAP.tick>>4)%2?'#ff7eb6':'#9ed2ff';ctx.lineWidth=1;ctx.strokeRect(X+1.5,Y+7.5,W-3,H-9);
 } else {
  R(X,Y+4,W,H-4,'#2a1a2a');R(X+1,Y+5,W-2,H-6,'#fff8ee');
  for(let i=0;i<W;i+=6){R(X+i,Y+4,3,6,b.roof);R(X+i+3,Y+4,3,6,'#ffffff')}
  for(let i=0;i<b.w;i++){if(X+i*TS===dx)continue;R(X+i*TS+3,Y+16,10,8,'#8ae0ff')}
 }
 R(dx+3,Y+H-14,10,14,'#2a1a2a');R(dx+4,Y+H-13,8,13,locked?'#888':st==='tower'?'#bfe6ff':st==='studio'?'#ffd34d':'#8a5a3a');R(dx+10,Y+H-7,1,2,'#ffd34d');
 if(locked){for(let i=0;i<W;i+=6){R(X+i,Y+H-4,3,2,'#ffd34d')}}
}

/* 월별 상태 (NPC·선물·핫스팟·미션) */
function walkableFree(x,y){const c=MAP.g[y][x];return ['g','s','p','f','c'].includes(c)}
function doorFronts(){return curBLD().map(b=>[b.door[0],b.door[1]+1])}
function nearDoor(x,y){return doorFronts().some(([a,b])=>Math.abs(a-x)+Math.abs(b-y)<=1)}
function ensureMonth(){
 const key=`${S.year}-${S.month}-${S.stage}`;
 if(S.mm&&S.mm.key===key) return;
 const g=buildGrid();MAP=MAP||{};MAP.g=g;
 const free=[];for(let y=1;y<MH-1;y++)for(let x=1;x<MW-1;x++){if(['g','s','p','f'].includes(g[y][x])&&!nearDoor(x,y)&&!(x===curStart()[0]&&y===curStart()[1]))free.push([x,y])}
 const sp=shuffle(free);
 const POOL={0:['harin','chaewon','mikyung','leo','granny','mom'],1:['harin','chaewon','mikyung','leo','woojin','granny'],2:['rena','harin','jiyu','trainer','seoa','trainee'],3:['rena','harin','chaewon','woojin','trainer','seoa'],4:['cafe','arteam','pd','reporter','fanmaster','jiyu','seoa','woojin'],5:['cafe','arteam','pd','reporter','fanmaster','jiyu','seoa'],6:['jenny','mike','emily','rena'],7:['jenny','mike','emily','rena','woojin']};
 const okNpc=k=>!(k==='chaewon'&&(S.flags.chaewonQuit||(S.stage>=2&&!S.flags.chaewonTeam)))&&!(k==='harin'&&S.stage>=2&&!S.flags.harinTeam&&S.stage!==2);
 const skey=`${S.stage}_${(S.mi||0)+1}`;let storyK=null;
 if(EPI[skey]&&!S.done[skey]){for(const nd of EPI[skey].script){if(Array.isArray(nd)&&CAST[nd[0]]){storyK=nd[0];break}if(nd&&nd.pop==='meet'&&nd.who){storyK=nd.who;break}}}
 const cands=shuffle(POOL[S.stage].filter(okNpc).filter(k=>k!==storyK));
 const fr0=curBLD().map(b=>[b.door[0],b.door[1]+1]),st0=curStart(),tg=g.map(r=>r.slice());
 const safe=(x,y)=>{const before=reachSet(tg,st0[0],st0[1]).size;const keep=tg[y][x];tg[y][x]='Z';const r=reachSet(tg,st0[0],st0[1]);const ok=fr0.every(([a,b])=>r.has(a+','+b))&&r.size>=before-1;if(!ok)tg[y][x]=keep;return ok};
 const npcs=[];const want=(storyK?[[storyK,skey]]:[]).concat(cands.slice(0,3).map(k=>[k,null]));for(const [k,story] of want){while(sp.length){const [x,y]=sp.pop();if(safe(x,y)){npcs.push({k,x,y,dir:'down',talked:false,story});break}}}
 const fans=[];if(S.stage>=4&&S.stage<=7){const n=Math.min(10,2+Math.floor(S.fame/150));const G=curBLD().find(b=>b.id==='G');const around=[];for(let y=G.y+G.h;y<G.y+G.h+4;y++)for(let x=G.x-1;x<=G.x+G.w;x++)if(g[y]&&['p','g','s'].includes(g[y][x])&&!nearDoor(x,y))around.push([x,y]);const fr=fr0;const tmp=tg;
  for(const [x,y] of shuffle(around)){if(fans.length>=n)break;if(safe(x,y))fans.push({x,y,c:pick(['#ff7eb6','#ffd36e','#9ed2ff','#c9a2ff'])})}}
 const rsAll=reachSet(tg,st0[0],st0[1]);const sp2=shuffle(free).filter(([x,y])=>!npcs.some(n=>n.x===x&&n.y===y)&&rsAll.has(x+','+y));const items=sp2.slice(0,S.stage>=4?3:2).map(([x,y])=>({x,y,got:false}));
 const opened=['A','B','C','D','E','F'].concat(S.stage>=4?['G']:[]);
 const hot=shuffle(opened).slice(0,S.stage>=2?2:1);
 S.mm={key,npcs,items,fans,hot,cheered:false,talked:[],picked:0,mission:makeMission(cands.filter(k=>S.met[k]))};
}
function curStart(){const F=curBLD().find(b=>b.id==='F');return [F.door[0],F.door[1]+1]}
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
function mapInit(){
 ensureMonth();
 if(!MAP||MAP.theme!==themeId()||MAP.key!==S.mm.key){const st=curStart();MAP={g:buildGrid(),px:st[0],py:st[1],dir:'down',f:0,step:0,moving:false,ox:0,oy:0,held:null,tick:0,raf:0,theme:themeId(),key:S.mm.key}}
 MAP.g=buildGrid();
}
function blocked(x,y){
 if(x<0||y<0||x>=MW||y>=MH) return true;
 const c=MAP.g[y][x];
 if(!['g','s','p','f','c','r'].includes(c)&&c[0]!=='D') return true;
 if(S.mm.npcs.some(n=>n.x===x&&n.y===y)) return 'npc';
 if(S.mm.fans.some(n=>n.x===x&&n.y===y)) return true;
 return false;
}
const DIRV={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
function tryMove(dir){
 if(MAP.moving||MAP.busy) return;
 MAP.dir=dir;const [dx,dy]=DIRV[dir];const nx=MAP.px+dx,ny=MAP.py+dy;
 const bl=blocked(nx,ny);
 if(bl==='npc'){const n=S.mm.npcs.find(n=>n.x===nx&&n.y===ny);if(MAP.bumpN!==n){MAP.bumpN=n;MAP.held=null;n.dir={up:'down',down:'up',left:'right',right:'left'}[dir];floatText(`💬 탭 또는 A/스페이스로 대화`,'#fff',$('#mapwrap'));SFX.step();return}MAP.bumpN=null;const side=[[dy,dx],[-dy,-dx],[dx,dy]];for(const [sx,sy] of side){const tx=n.x+sx,ty=n.y+sy;if(!blocked(tx,ty)&&!(tx===MAP.px&&ty===MAP.py)&&!doorFronts().some(([a,b])=>a===tx&&b===ty)){n.x=tx;n.y=ty;break}}SFX.step();return}
 if(bl){SFX.step();return}
 MAP.moving=true;MAP.t0=performance.now();MAP.from=[MAP.px,MAP.py];MAP.to=[nx,ny];MAP.step=MAP.step===1?2:1;SFX.step();
}
function mapLoop(now){
 if(!MAP||!MAP.on) return;
 MAP.tick++;
 if(MAP.moving){const k=Math.min(1,(now-MAP.t0)/190);MAP.ox=(MAP.to[0]-MAP.from[0])*k;MAP.oy=(MAP.to[1]-MAP.from[1])*k;MAP.f=k<.75?MAP.step:0;
  if(k>=1){MAP.px=MAP.to[0];MAP.py=MAP.to[1];MAP.ox=MAP.oy=0;MAP.moving=false;MAP.f=0;onStep()}}
 if(!MAP.moving&&MAP.held&&!MAP.busy&&!$('#sheetOv').classList.contains('show')) tryMove(MAP.held);
 drawMap();
 MAP.raf=requestAnimationFrame(mapLoop);
}
function drawMap(){
 const cv=$('#mapc');const ctx=cv.getContext('2d');const T=TH().pal;
 for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const c=MAP.g[y][x];if(c[0]==='B'||c[0]==='D')drawTile(ctx,x,y,TH().ground,T,MAP.tick);else drawTile(ctx,x,y,c,T,MAP.tick)}
 // 전광판
 if(themeId()==='broadcast'){ctx.fillStyle='#111';ctx.fillRect(6*TS,7*TS+4,4*TS,TS+10);ctx.fillStyle=(MAP.tick>>5)%2?'#ff7eb6':'#c9a2ff';ctx.fillRect(6*TS+2,7*TS+6,4*TS-4,TS+6)}
 for(const b of curBLD()) drawBuilding(ctx,b);
 for(const b of curBLD()){if(b.id==='G'&&S.stage<4)continue;if((MAP.tick>>4)%2){ctx.fillStyle='#fff9';ctx.fillRect(b.door[0]*TS+6,(b.door[1]+1)*TS+2,4,2)}}
 for(const it of S.mm.items){if(it.got)continue;const X=it.x*TS,Y=it.y*TS+((MAP.tick>>4)%2);ctx.fillStyle='#2a1a2a';ctx.fillRect(X+3,Y+5,10,9);ctx.fillStyle='#ff7eb6';ctx.fillRect(X+4,Y+6,8,7);ctx.fillStyle='#ffd34d';ctx.fillRect(X+7,Y+5,2,9);ctx.fillRect(X+4,Y+8,8,2);if((MAP.tick>>3)%4===0){ctx.fillStyle='#fff';ctx.fillRect(X+12,Y+2,2,2)}}
 const ents=[...S.mm.npcs.map(n=>({y:n.y,draw:()=>{const c=CAST[n.k];drawSprite(ctx,n.x*TS,n.y*TS-6,n.dir,0,npcPal(c.look),c.look.hair==='short'||c.look.hair==='bob');if(n.story&&!S.done[n.story]){const by=n.y*TS-18-((MAP.tick>>3)%4<2?1:0);ctx.fillStyle='#2a1a2a';ctx.fillRect(n.x*TS+2,by-1,12,11);ctx.fillStyle=(MAP.tick>>4)%2?'#ffd34d':'#fff3a0';ctx.fillRect(n.x*TS+3,by,10,9);ctx.fillStyle='#d02a5a';ctx.fillRect(n.x*TS+7,by+1,2,5);ctx.fillRect(n.x*TS+7,by+7,2,1);ctx.fillStyle='#fff';ctx.fillRect(n.x*TS+4,by+1,1,1)}else if(!n.talked&&(MAP.tick>>5)%2){ctx.fillStyle='#fff';ctx.fillRect(n.x*TS+5,n.y*TS-13,6,6);ctx.fillStyle='#e2577f';ctx.fillRect(n.x*TS+7,n.y*TS-12,2,3);ctx.fillRect(n.x*TS+7,n.y*TS-8,2,1)}}})),
  ...S.mm.fans.map((f,i)=>({y:f.y,draw:()=>{drawSprite(ctx,f.x*TS,f.y*TS-6-(((MAP.tick>>3)+i)%2),'up',0,npcPal({hc:['#3a2a2a','#6a4a3a','#2a2a4a'][i%3],top:{c1:f.c}}),i%2,f.c);if(MAP.cheer&&MAP.tick-MAP.cheer<60){ctx.fillStyle='#ff4f8f';const hy=f.y*TS-14-(MAP.tick-MAP.cheer)/4;ctx.fillRect(f.x*TS+5,hy,2,2);ctx.fillRect(f.x*TS+9,hy,2,2);ctx.fillRect(f.x*TS+5,hy+2,6,2);ctx.fillRect(f.x*TS+6,hy+4,4,1)}}})),
  {y:MAP.py+MAP.oy,draw:()=>{const px=Math.round((MAP.px+MAP.ox)*TS),py=Math.round((MAP.py+MAP.oy)*TS)-6-(MAP.f?1:0);ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(px+3,py+20,10,2);const hs=wearItem('hair').v.hair;drawSprite(ctx,px,py,MAP.dir,MAP.f,playerPal(),hs==='bob')}}];
 ents.sort((a,b)=>a.y-b.y).forEach(e=>e.draw());
 if(TH().pal.night){ctx.fillStyle='rgba(20,10,60,.18)';ctx.fillRect(0,0,MW*TS,MH*TS)}
 if(TH().pal.warm){const gr=ctx.createLinearGradient(0,0,0,MH*TS);gr.addColorStop(0,'rgba(255,190,120,.16)');gr.addColorStop(1,'rgba(255,140,110,.08)');ctx.fillStyle=gr;ctx.fillRect(0,0,MW*TS,MH*TS)}
}
function labelsHTML(){const hot=S.mm.hot;return curBLD().map(b=>`<div class="blbl ${hot.includes(b.id)?'hot':''}" style="left:${(b.x+b.w/2)/MW*100}%;top:${(b.y+.15)/MH*100}%">${hot.includes(b.id)?'⭐ ':''}${BLABEL[b.id](S.stage)}</div>`).join('')+(themeId()==='broadcast'?`<div class="blbl bill" style="left:50%;top:${8.1/MH*100}%">💖 ${S.group||''} 💖</div>`:'')}
function onStep(){
 const c=MAP.g[MAP.py][MAP.px];
 const it=S.mm.items.find(i=>!i.got&&i.x===MAP.px&&i.y===MAP.py);
 if(it){it.got=true;S.mm.picked++;pickupItem();return}
 if(S.mm.fans.length&&!S.mm.cheered&&S.mm.fans.some(f=>Math.abs(f.x-MAP.px)+Math.abs(f.y-MAP.py)<=1)){S.mm.cheered=true;MAP.cheer=MAP.tick;SFX.fan();const g=Math.round(4+S.fame/120);apply({fame:g,stress:-5});floatText(`꺄아~! ${S.name}!!`,'#ff7eb6',$('#mapwrap'));toast(`💖 팬들이 환호했다! 팬덤 +${g} · 스트레스 -5`);render()}
 if(c[0]==='D'){const id=c[1];if(id==='G'&&S.stage<4){mapSay(['🚧 공사 중이다. "M 방송국 신축 — 오픈 예정"','(데뷔 후에 갈 수 있을 것 같다.)']).then(()=>stepOut());return}SFX.door();enterBuilding(id)}
}
function pickupItem(){
 const st=S.stage;const r=Math.random();let lines,eff={};
 const unowned=Object.entries(WARDROBE).flatMap(([c,l])=>l.filter(i=>!S.owned.includes(i.id)&&i.st<=st&&i.price<=600).map(i=>[c,i]));
 if(r<.12&&unowned.length){const [c,i]=pick(unowned);S.owned.push(i.id);lines=[`🎁 선물 상자를 열었다!`,`✨ 레어! [${i.name}]을(를) 얻었다! (옷장에서 입을 수 있어요)`];SFX.big();burst($('#mapwrap'),['🎁','✨','💖'],14)}
 else if(r<.45){const g=Math.round(40+st*35+Math.random()*40);eff={money:g};lines=['🎁 선물 상자를 열었다!',`💰 ${g}G가 들어 있었다!`]}
 else if(r<.75){const k=pick(['vocal','dance','visual','english','mind']);eff={[k]:2};lines=['🎁 선물 상자를 열었다!',`📒 비법 노트 발견! ${LBL[k]} +2`]}
 else {eff={stress:-10};lines=['🎁 선물 상자를 열었다!','🧃 비타민 음료! 스트레스 -10']}
 SFX.ok();apply(eff);render();mapSay(lines);
}
function stepOut(){hideBimg();const b=curBLD().find(b=>b.door[0]===MAP.px&&b.door[1]===MAP.py);if(b){MAP.py=b.door[1]+1;MAP.dir='down'}}
function mapSay(lines){MAP.busy=true;return pkText(lines,$('#mapwrap')).then(()=>{MAP.busy=false})}
function actA(){
 if(!MAP||MAP.busy||MAP.moving) return;
 const [dx,dy]=DIRV[MAP.dir];const tx=MAP.px+dx,ty=MAP.py+dy;
 let n=S.mm.npcs.find(n=>n.x===tx&&n.y===ty);
 if(!n){n=S.mm.npcs.find(q=>Math.abs(q.x-MAP.px)+Math.abs(q.y-MAP.py)===1);if(n){MAP.dir=n.x>MAP.px?'right':n.x<MAP.px?'left':n.y>MAP.py?'down':'up'}}
 if(n){n.dir={up:'down',down:'up',left:'right',right:'left'}[MAP.dir];talkNPC(n);return}
 const c=MAP.g[ty]&&MAP.g[ty][tx];
 if(c&&c[0]==='B'){mapSay([`📍 ${BLABEL[c[1]](S.stage)}`,'(문으로 들어가면 일정을 고를 수 있다.)'])}
 else if(c==='w') mapSay([themeId()==='la'?'태평양이다. 파도 소리가 들린다.':'광장 분수다. 동전을 던지면 소원이 이루어진다는 소문이 있다.'])
 else if(c==='Q') mapSay(['☕ 팬들이 보낸 커피차다! "VELVA 오늘도 화이팅"'.replace('VELVA',S.group||S.name)])
 else if(c&&c[0]==='V') mapSay([`📺 전광판에 ${S.group||S.name}의 뮤직비디오가 나오고 있다!`])
}
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
 if(n.story&&!S.done[n.story]){MAP.busy=true;const k=n.story;await playEp(EPI[k]);n.story=null;n.talked=true;MAP.busy=false;renderSlots();$('#maplbl').innerHTML=labelsHTML();return}
 if(n.talked){await mapSay([`${c.name}: "${pick(['또 보네!','오늘도 화이팅!','이따 봐!'])}"`]);return}
 n.talked=true;S.mm.talked.push(n.k);
 const opts=(NPCTALK[n.k]||[]).filter(x=>S.stage>=x.s[0]&&S.stage<=x.s[1]);
 const L=opts.length?pick(opts):{t:'안녕!',e:{stress:-1}};
 await mapSay([`${c.name}: "${L.t}"`]);
 if(L.q){MAP.busy=true;const i=await pkChoice(L.q.ask,L.q.o.map(o=>o[0]));const o=L.q.o[i];const r=apply(o[1]);await mapSay([`${c.name}: ${o[2]}`]);effToast(r)}
 else{const r=apply(L.e||{});effToast(r)}
 S.aff[n.k]=(S.aff[n.k]||0)+.5;render();renderSlots();
}
function enterBuilding(id){
 MAP.busy=true;MAP.held=null;
 const st=S.stage;
 const acts=BACTS[id].map(a=>ACTS.find(x=>x.id===a)).filter(a=>a&&st>=a.s[0]&&st<=a.s[1]);
 const free=(BFREE[id]||[]);
 const used=S.slots.reduce((s,i)=>s+(i?costOf(ACTS.find(a=>a.id===i)):0),0), left=S.money-used;
 const full=!S.slots.includes(null);const hot=S.mm.hot.includes(id);
 const box=$('#bmenu');
 box.innerHTML=`<div class="bmh">🚪 ${BLABEL[id](st)}</div>${hot?'<div class="bmhot">⭐ 이번 달 핫스팟! 효과 1.5배</div>':''}<div class="bml">${acts.map(a=>{const cost=costOf(a);const cnt=S.slots.filter(x=>x===a.id).length;const dis=cost>left||full||cnt>=2;const tg=TRAIN[a.id];return `<button class="pkopt" data-a="${a.id}" ${dis?'disabled':''}><b>${a.name}${a.npc?' 💬':''}${tg?' 🎯':''}</b><small>${effText(a)}${cost?` · 💰${cost}G`:''}${cnt>=2?' · 이번 달 2회 완료':''}</small></button>`}).join('')}
  ${free.map(([k,l])=>`<button class="pkopt free" data-f="${k}"><b>${l}</b></button>`).join('')}<button class="pkopt out" data-f="out"><b>↩ 나가기</b></button></div>${full?'<div class="bmn">이번 달 일정이 다 찼어요!</div>':''}`;
 box.classList.add('show');showBimg(id);
 box.querySelectorAll('.pkopt').forEach(b=>b.onclick=async()=>{
  SFX.sel();hideBimg();
  if(b.dataset.a){const i=S.slots.indexOf(null);S.slots[i]=b.dataset.a;box.classList.remove('show');stepOut();renderSlots();MAP.busy=false;floatText(`📌 ${ACTS.find(a=>a.id===b.dataset.a).name}`,'#fff',$('#mapwrap'));if(!S.slots.includes(null))setTimeout(askStart,350);return}
  const f=b.dataset.f;
  if(f==='out'){box.classList.remove('show');stepOut();MAP.busy=false;return}
  if(f==='shop'){box.classList.remove('show');openShop(()=>{stepOut();MAP.busy=false})}
  if(f==='wardrobe'){box.classList.remove('show');openWardrobe(()=>{stepOut();MAP.busy=false})}
  if(f==='save'){save();toast('💾 저장했어요!');box.classList.remove('show');stepOut();MAP.busy=false}
 });
}
function renderSlots(){
 const m=S.mm&&S.mm.mission;
 $('#slotbar').innerHTML=(m?`<div class="msn">🎯 이번 달 미션: ${m.t} <b>(+${m.reward}G)</b></div>`:'')+['1~10일','11~20일','21~말일'].map((l,i)=>{const a=S.slots[i]&&ACTS.find(x=>x.id===S.slots[i]);return `<div class="sl ${a?'on':''}" onclick="unslotMap(${i})"><small>${l}</small><b>${a?a.name:'—'}</b></div>`}).join('')+`<button class="sl go" ${S.slots.includes(null)?'disabled':''} onclick="askStart()">▶ 시작</button>`;
 const me=$('#mapme');if(me)me.innerHTML=`<b>${S.name}</b> <span>${moodInfo().m} · 스트레스 ${S.stress}</span><small>내 상태 ▸</small>`;
}
function unslotMap(i){if(!S.slots[i])return;SFX.sel();S.slots[i]=null;renderSlots()}
async function askStart(){
 if(S.slots.includes(null)||(MAP&&MAP.busy)) return;
 MAP.busy=true;
 const i=await pkChoice('이번 달 일정을 시작할까?',['▶ 시작한다','아직 아니야']);
 MAP.busy=false;
 if(i===0){closeMap();runMonth()}
}
function pkChoice(q,opts){
 return new Promise(res=>{
  const box=$('#bmenu');box.innerHTML=`<div class="bmh">${q}</div><div class="bml">${opts.map((o,i)=>`<button class="pkopt" data-i="${i}"><b>${o}</b></button>`).join('')}</div>`;box.classList.add('show');
  box.querySelectorAll('.pkopt').forEach(b=>b.onclick=()=>{SFX.sel();box.classList.remove('show');res(+b.dataset.i)});
 });
}
function openMap(){
 if(busy||!S) return;
 SFX.door();mapInit();MAP.on=true;MAP.busy=false;
 document.body.classList.add('onmap');
 $('#maplbl').innerHTML=labelsHTML();$('#mapname').textContent=`📍 ${TH().name}`;renderSlots();
 MAP.raf=requestAnimationFrame(mapLoop);
 if(!S.seen['tip_'+themeId()]){S.seen['tip_'+themeId()]=1;const tips={
  town:['방향키(십자 버튼)로 걸어서 건물 문으로 들어가면 일정을 고를 수 있어!','🎁 선물 상자를 줍고, ❗ 표시가 있는 사람에게 A 버튼으로 말을 걸어 봐.','⭐ 표시 건물은 이번 달 핫스팟! 효과가 1.5배야.'],
  gangnam:['✨ 강남 기획사 거리에 왔다! 유리 빌딩 사이로 회사 사옥이 보인다.','이제부터는 회사 사옥이 연습실이야. 핫스팟과 미션을 노려 보자!'],
  broadcast:['🎆 상암 방송가! 방송국 앞엔 팬들이 응원봉을 들고 기다리고 있다!','팬들 근처를 지나가면 환호해 줘. 전광판에는 우리 뮤직비디오가!'],
  la:['🌴 LA 산타모니카! 해변을 따라 걸어 보자.','코칠라 무대를 향해, 마지막 스퍼트!']}[themeId()];mapSay(tips)}
}
function closeMap(){if(MAP){MAP.on=false;cancelAnimationFrame(MAP.raf)}document.body.classList.remove('onmap');$('#bmenu').classList.remove('show')}
function padDown(d){if(!MAP||!MAP.on)return;MAP.held=d;tryMove(d)}
function padUp(){if(MAP)MAP.held=null}
document.addEventListener('keydown',e=>{if(!MAP||!MAP.on||keyHandler||$('#sheetOv').classList.contains('show'))return;const m={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right'}[e.code];if(m){e.preventDefault();if(!e.repeat)padDown(m)}else if(e.code==='KeyZ'||e.code==='Enter'||e.code==='Space'){e.preventDefault();actA()}else if(e.code==='KeyX'||e.code==='Escape'){actB()}});
document.addEventListener('keyup',e=>{if(!MAP||!MAP.on)return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyW','KeyS','KeyA','KeyD'].includes(e.code))padUp()});

// 캔버스 탭: 가까운 사람에게 말 걸기
document.addEventListener('DOMContentLoaded',()=>{});
function mapTap(e){
 if(!MAP||!MAP.on||MAP.busy||MAP.moving) return;
 const cv=$('#mapc'),r=cv.getBoundingClientRect();
 const tx=Math.floor((e.clientX-r.left)/r.width*MW),ty=Math.floor((e.clientY-r.top)/r.height*MH);
 const n=S.mm.npcs.find(q=>(q.x===tx&&(q.y===ty||q.y===ty+1))||(q.x===tx&&q.y===ty));
 if(n){const d=Math.abs(n.x-MAP.px)+Math.abs(n.y-MAP.py);if(d<=2){MAP.dir=n.x>MAP.px?'right':n.x<MAP.px?'left':n.y>MAP.py?'down':'up';n.dir={up:'down',down:'up',left:'right',right:'left'}[MAP.dir];talkNPC(n)}else floatText('조금 더 가까이 가 보자!','#fff',$('#mapwrap'))}
}
setTimeout(()=>{const cv=$('#mapc');if(cv)cv.addEventListener('pointerdown',mapTap)},0);

function showBimg(id){if(!(S.stage>=4&&S.stage<=5))return;const src=id==='A'?IMG.agency:id==='B'?IMG.studio:IMG.street;const el=$('#bimg');el.innerHTML=`<img src="${src}" alt="">`;el.classList.add('show')}
function hideBimg(){const el=$('#bimg');if(el)el.classList.remove('show')}
