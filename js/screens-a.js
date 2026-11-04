/* 시작하기 · 홈 · 키트 주문 · 여권 · 선물 */
(function(){
const HK = window.HK, S = HK.S, SCR = HK.SCREENS, ic = HK.ic, won = HK.won;

/* ===== 01 시작하기 ===== */
SCR.A1 = { cls:'dark', darkBar:true,
  render:()=>`<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center">
    <div>${HK.chick('main',150,'hop','margin:0 auto')}
    <div class="h1 mt24" style="color:var(--lime);font-size:28px;letter-spacing:.1em">한 끼 여권</div>
    <div class="cap lime mt8" style="letter-spacing:.2em">ONE MEAL PASSPORT</div></div></div>
    <div class="xs" style="position:absolute;bottom:56px;left:0;right:0;text-align:center;color:rgba(255,255,255,.6)">요리 초보의 첫 세계 요리</div>`,
  mount:el=>HK.later(el,()=>HK.go('A2',{},'fade'),1400) };

const onboard = (n, cap, title, desc, visual, next, last) => ({
  render:()=>`<div class="bar"><span>${n>1?HK.backBtn():'<span></span>'}</span><button class="link" style="margin:0 0 10px" data-act="skipOnboard">건너뛰기</button></div>
    <div style="position:absolute;top:120px;left:24px;right:24px;height:340px">${visual}</div>
    <div class="pad" style="position:absolute;top:500px;left:0;right:0">
      <div class="cap">HOW TO ${String(n).padStart(2,'0')} / 03</div>
      <div class="h1 mt12">${title}</div><div class="s mt12 pre">${desc}</div></div>
    <div class="bot"><button class="btn p" data-act="obNext" id="obBtn"><span>${last?'시작하기':'다음'}</span><span class="arr" style="font-size:14px;font-weight:700"><span class="cnt-num">5</span></span></button></div>`,
  mount:el=>HK.autoBtn(el,'#obBtn',5000,()=>HK.go(next,{},'fade')), next });
HK.ACT.obNext = ()=>{ const c=HK.cur(); HK.go(SCR[c.name].next,{},'fade'); };
HK.ACT.skipOnboard = ()=>HK.go('A3',{},'fade');

SCR.A2 = onboard(1,'','향신료는\n딱 한 번 쓸 만큼만','다 못 쓰고 버리는 향신료 대신,\n한 끼에 필요한 만큼만 키트에 담았어요.',
 `<div class="card" style="height:100%;padding:24px;display:flex;flex-direction:column;justify-content:space-between">
   <div class="cap">한 통 대신 한 끼</div>
   <div class="row g12" style="align-items:flex-end">
     <div style="text-align:center;flex:1"><div style="width:72px;height:120px;border-radius:14px;background:#E3E8E4;margin:0 auto;position:relative"><div style="position:absolute;left:0;right:0;bottom:0;height:85%;border-radius:0 0 14px 14px;background:#C9D2CB"></div></div><div class="sb7 mt12">마트 한 통</div><div class="xs">500ml · 몇 달씩 남아요</div></div>
     <div style="color:var(--g)">${ic('arrow',28)}</div>
     <div style="text-align:center;flex:1"><div style="width:44px;height:64px;border-radius:10px;background:var(--g);margin:0 auto;position:relative"><div style="position:absolute;left:8px;right:8px;top:10px;height:8px;border-radius:4px;background:var(--lime)"></div></div><div class="sb7 mt12">키트 한 끼</div><div class="xs">30ml · 딱 한 번</div></div>
     ${HK.chick('taste',110,'bob')}
   </div><span class="pill soft" style="align-self:flex-start">5인분 이내 · 소량</span></div>`,'A2b');
SCR.A2b = onboard(2,'','QR 하나면\n레시피가 열려요','키트 속 여권 카드의 QR을 찍으면\n그 나라 레시피와 대체 재료가 바로 보여요.',
 `<div class="card g" style="height:100%;display:grid;place-items:center"><div style="text-align:center"><div class="qr" style="width:160px;height:160px"><i></i><i></i><i></i><i></i><div style="position:absolute;inset:34px;display:grid;place-items:center;color:var(--lime)">${ic('qr',72)}</div></div><div class="row g8 mt24" style="justify-content:center">${HK.chick('wave',90,'sway')}<span class="pill lime">BKK 레시피 열림</span></div></div></div>`,'A2c');
SCR.A2c = onboard(3,'','요리를 끝내면\n그 나라 도장이 쾅','9개 나라 도장을 모두 모으면\n원하는 키트 하나를 선물로 드려요.',
 `<div class="card" style="height:100%;padding:20px;position:relative;overflow:hidden"><div class="cap">MY PASSPORT</div><div class="h2 mt4">세라의 요리 여권</div>
   <div class="row g8 mt16">${HK.stamp('BKK',{size:76,date:'03 NOV 26'})}${HK.stamp('TYO',{size:70,date:'12 NOV 26',rot:6})}</div>
   <div class="row g8 mt8">${HK.stamp('SEL',{empty:true,size:60})}${HK.stamp('ROM',{empty:true,size:60})}</div>
   <span class="pill or" style="position:absolute;left:20px;bottom:20px">${ic('gift',14)} 9개국 완성하면 키트 1개 선물</span>
   <div style="position:absolute;right:12px;bottom:12px">${HK.chick('trophy',130,'hop')}</div></div>`,'A3',true);

SCR.A3 = { render:()=>`<div class="scroll"><div class="top"></div><div class="pad">
   <div class="ticket g" style="padding:24px;height:300px"><div class="cap lime">BOARDING PASS</div>
     <div class="row sp mt24"><div><div class="xs" style="color:var(--lime2)">FROM</div><div style="font-size:28px;font-weight:700">HOME</div></div>${ic('arrow',28)}<div style="text-align:right"><div class="xs" style="color:var(--lime2)">TO</div><div style="font-size:28px;font-weight:700;color:var(--lime)">BKK</div></div></div>
     <div class="perf" style="top:190px"></div><div class="notch" style="left:-12px;top:178px"></div><div class="notch" style="right:-12px;top:178px"></div>
     <div class="row sp" style="margin-top:58px"><div><div class="xs" style="color:var(--lime2)">PASSENGER</div><div class="bb">이세라</div></div><div><div class="xs" style="color:var(--lime2)">SEAT</div><div class="bb">1인분</div></div><div><div class="xs" style="color:var(--lime2)">GATE</div><div class="bb">키트 QR</div></div></div></div>
   <div class="h1 mt32">키트 QR을 찍으면\n요리 여행이 시작돼요</div>
   <div style="position:absolute;right:28px;top:470px">${HK.chick('travel',120,'bob')}</div></div></div>
   <div class="bot">${HK.btn('키트 QR 찍기','data-go="A4" data-mode="fade"')}<button class="link" data-act="lookAround">키트 없이 둘러보기</button></div>` };
HK.ACT.lookAround = ()=>{ S.onboarded=true; HK.save(); HK.go('home',{},'root'); };

SCR.A4 = { cls:'dark', darkBar:true,
  render:()=>`<div class="bar">${HK.backBtn(true,'close')}<span></span></div>
   <div style="position:absolute;top:180px;left:0;right:0;text-align:center"><div class="h2">키트 속 QR을 비춰 주세요</div><div class="s mt8" style="color:rgba(255,255,255,.6)">네모 칸 안에 맞추면 자동으로 인식해요</div>
   <div class="qr mt40"><i></i><i></i><i></i><i></i><div class="scan"></div></div></div>
   <div class="bot"><button class="btn s" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.3)">코드 직접 입력</button></div>`,
  mount:el=>HK.later(el,()=>{
    HK.modal(`<div style="text-align:center">${HK.chick('box',120,'hop','margin:-80px auto 0')}<div class="cap mt12">SCAN OK</div><div class="h2 mt4">태국 키트를 찾았어요!</div><div class="s mt8">BKK · 팟카파오 무 외 2가지 레시피</div>
     <div class="mt24">${HK.btn('여권 받기','data-act="toA5"')}</div></div>`);
  },1600) };
HK.ACT.toA5 = ()=>{ HK.closeOverlay(); setTimeout(()=>HK.go('A5',{},'fade'),150); };

SCR.A5 = { render:()=>`<div class="scroll"><div class="top-s"></div><div class="pad">
   <div class="card g" style="padding:22px 24px;height:230px"><div class="cap lime">PASSPORT · NO.001</div><div style="font-size:28px;font-weight:700;margin-top:8px">THAILAND</div><div class="xs" style="color:var(--lime2)">태국 · 방콕</div>
     <div style="position:absolute;right:20px;top:36px;color:var(--lime)">${HK.stamp('BKK',{size:96,color:'var(--lime)',date:'03 NOV 26',anim:true})}</div>
     <div class="row g24" style="position:absolute;left:24px;bottom:22px;gap:40px"><div><div class="cap lime">RECIPES</div><div class="h2">3</div></div><div><div class="cap lime">SPICES</div><div class="h2">7</div></div><div><div class="cap lime">SERVINGS</div><div class="h2">5인분</div></div></div></div>
   <div class="h2 mt24">태국 여권이 도착했어요!</div><div class="s mt4">키트에 들어 있는 재료예요</div>
   <div class="chips mt12">${HK.kit('BKK').items.map(([n,a])=>`<span class="chip">${n} <b style="font-size:12px;color:var(--g)">${a}</b></span>`).join('')}</div>
   <div style="position:absolute;right:40px;top:560px">${HK.chick('wave',110,'sway')}</div></div></div>
   <div class="bot"><button class="btn p" data-act="toHome" id="a5Btn"><span>홈으로 가기</span><span class="arr" style="font-size:14px"><span class="cnt-num">5</span></span></button><button class="link" data-act="toRecipeFirst">태국 레시피 먼저 보기</button></div>`,
  mount:el=>HK.autoBtn(el,'#a5Btn',5000,()=>HK.ACT.toHome()) };
HK.ACT.toHome = ()=>{ S.onboarded=true; HK.save(); HK.go('home',{},'root'); };
HK.ACT.toRecipeFirst = ()=>{ S.onboarded=true; HK.save(); HK.go('home',{},'root'); setTimeout(()=>HK.go('B3',{code:'BKK'}),350); };

/* ===== 02 홈 ===== */
SCR.home = { tab:'home',
  render:()=>{ const cartN = S.cart.reduce((a,c)=>a+c.qty,0); const st = Object.keys(S.stamps).length; const tyo = HK.kit('TYO');
  return `<div class="bar bg" style="height:132px;align-items:flex-start;padding-top:62px"><div style="padding-left:4px"><div class="s">세라님, 반가워요</div><div class="h1">태국 여행 중이에요</div></div>
     <div class="row g8"><button class="ib" data-go="K4" aria-label="장바구니">${ic('cart')}${cartN?`<span class="cnt">${cartN}</span>`:''}</button><button class="ib" data-act="noti" aria-label="알림">${ic('bell')}<span class="dot"></span></button></div></div>
   <div class="scroll" style="padding-bottom:120px"><div style="height:152px"></div><div class="pad">
   <div class="ticket g tap" data-go="K2?code=TYO" style="height:464px;overflow:hidden">
     <div class="wm" style="position:absolute;right:-18px;top:-8px;opacity:.4;color:var(--lime);pointer-events:none">${HK.lm('TYO',190)}</div>
     <div class="row sp" style="position:absolute;left:24px;right:24px;top:24px"><span class="cap lime">다음 여행지 · 이번 주 추천</span><button class="cap row g4" style="color:var(--lime)" data-go="K1">전체 보기${ic('next',12)}</button></div>
     <div style="position:absolute;left:21px;top:48px;font-size:64px;font-weight:700;color:var(--lime);line-height:1.1">TYO</div>
     <div class="row sp" style="position:absolute;left:24px;right:24px;top:136px"><div class="h2">일본 키트</div><div class="h2">${won(tyo.price)}</div></div>
     <div class="s" style="position:absolute;left:24px;top:168px;color:var(--lime2)">${tyo.recipes.join(' · ')}</div>
     <div class="hscroll" style="position:absolute;left:0;right:0;top:214px;margin:0;padding:0 24px">${HK.KITS.map(k=>`<button class="chip" style="height:28px;font-size:12px;font-weight:700;background:${k.code==='TYO'?'var(--lime)':'rgba(255,255,255,.1)'};color:${k.code==='TYO'?'var(--g)':'#fff'};border:0;flex:none" data-go="K2?code=${k.code}">${S.stamps[k.code]?ic('check',12):''}${k.code}</button>`).join('')}</div>
     <div class="perf" style="top:284px"></div><div class="notch" style="left:-12px;top:272px"></div><div class="notch" style="right:-12px;top:272px"></div>
     ${[[24,'PASSENGER','이세라'],[134,'SEAT','5인분 이내'],[244,'GATE','TYO']].map(([x,l,v])=>`<div style="position:absolute;left:${x}px;top:308px"><div class="xs" style="color:var(--lime2)">${l}</div><div class="bb" style="margin-top:3px">${v}</div></div>`).join('')}
     <div style="position:absolute;left:24px;right:24px;top:384px">${HK.btn('일본 키트 주문하기','data-act="quickTYO"','l')}</div></div>

   <div class="card mt16 tap row g12" data-go="K6" style="padding:18px 16px;height:80px;gap:10px"><div class="ico" style="background:#FFF0E8;color:var(--or);width:44px;height:44px;flex:none">${ic('box')}</div><div class="f1" style="min-width:0"><div class="bb ellip" style="letter-spacing:-.03em">태국 소스가 거의 떨어졌어요</div><div class="xs ellip" style="margin-top:2px">요리 3번 완료 · 피시소스 외 2가지 리필</div></div><span class="pill or" style="height:33px;padding:0 10px;flex:none">6,900원</span></div>

   <div class="card mt16 tap" data-go="C1?id=pakkapao" style="overflow:hidden">
     ${HK.photo('assets/img/pakkapao.jpg',160,0)}
     <div style="position:absolute;left:16px;top:58px">${HK.chick('bowl',108,'bob')}</div>
     <div style="position:absolute;right:16px;top:96px;color:var(--or)">${HK.stamp('BKK',{size:64,date:'NOV 26'})}</div>
     <div style="padding:18px 20px 16px"><div class="cap or">NOW TRAVELING · BKK</div><div class="h2" style="margin-top:5px">오늘은 팟카파오 무 어때요?</div><div class="s" style="margin-top:4px">15분 · 쉬움 · 키트 재료가 다 있어요</div>
     <div class="row g12" style="margin-top:14px"><span class="xs" style="font-weight:700;color:var(--g)">태국 레시피 1 / 3</span><div class="progress f1"><i style="width:33%"></i></div></div>
     <div style="margin:20px -4px 0" data-go="C2?id=pakkapao">${HK.btn('요리 시작하기','','p')}</div></div></div>

   <div class="row sp mt32"><div class="h2">이번 주 인기 레시피</div><button class="xs" style="font-weight:700;color:var(--g)" data-tab="feed">더 보기</button></div>
   <div class="hscroll mt12">${[['PAR','오븐 없이 마들렌',231,'assets/img/madeleine-lemon.jpg',3],['BKK','팟카파오 무 성공!',128,'assets/img/pakkapao.jpg',1],['TYO','10분 규동',89,'assets/img/gyudon.jpg',4],['SEL','양배추 참치덮밥',64,'assets/img/cabbage-tuna.jpg',2]].map(([c,t,l,img,pi])=>`<div class="card tap" style="width:160px;flex:none;overflow:hidden" data-go="E1D?id=p${pi}">${HK.photo(img,120,0)}<span class="pill soft" style="position:absolute;left:10px;top:10px;background:#fff">${c}</span><div style="padding:10px 12px 12px"><div class="sb7 ellip">${t}</div><div class="xs row g4 mt4" style="color:var(--or)">${ic('heart',12)}${l}</div></div></div>`).join('')}</div>

   <div class="card mt24 tap" data-tab="fridge" style="padding:20px;overflow:hidden"><div class="cap">${ic('fridge',14)} 냉털 코너</div><div class="h2 mt8">양배추 반 통이\n3일째 남아 있어요</div>
     <div class="chips mt12"><span class="chip" style="height:30px;font-size:12px">양배추 참치덮밥</span><span class="chip" style="height:30px;font-size:12px;color:var(--or)">부침가루만 있으면 OK</span></div>
     <div style="position:absolute;right:12px;top:16px">${HK.chick('fridge',110,'peek')}</div></div>

   <div class="card mt16 tap" data-tab="passport" style="padding:20px"><div class="row sp"><div class="cap">${ic('passport',14)} 내 요리 여권</div><span class="xs" style="font-weight:700;color:var(--or)">2개 더 모으면 리필 20% 쿠폰</span></div>
     <div class="bb mt8">도장 ${st} / 9</div><div class="row g8 mt12">${HK.KITS.map(k=>S.stamps[k.code]?HK.stamp(k.code,{size:30,rot:-8}):`<div style="width:30px;height:30px;border-radius:15px;border:1.5px dashed rgba(17,17,17,.2)"></div>`).join('')}</div></div>

   <div class="card g mt16 tap" data-go="K2?code=PAR" style="padding:22px 20px;height:150px;overflow:hidden"><div class="cap lime">NEW · 베이킹 시리즈</div><div class="h2 mt8">오븐 없이 만드는\n마들렌 키트</div><div class="xs mt8" style="color:var(--lime2)">프랑스 · 16,900원</div>
     <div class="wm" style="position:absolute;right:56px;top:20px;opacity:.4;color:var(--lime)">${HK.lm('PAR',110)}</div><div style="position:absolute;right:10px;bottom:-8px">${HK.chick('baking',120,'sway')}</div></div>

   <div class="h2 mt32">동행 셰프 새 글</div>
   <div class="card mt12 tap row g12" data-go="E1D?id=p1" style="padding:14px 16px">${HK.avatar('minji',40)}<div class="f1"><div class="sb7">요리하는 민지</div><div class="xs ellip">10분 똠얌 라면 레시피를 올렸어요</div></div><span class="xs">방금</span></div>
   <div class="card mt8 tap row g12" data-go="E1D?id=p3" style="padding:14px 16px">${HK.avatar('bread',40)}<div class="f1"><div class="sb7">빵순이</div><div class="xs ellip">오븐 없이 스콘 · 사진 4장</div></div><span class="xs">2시간 전</span></div>
   </div></div>`; } };
HK.ACT.quickTYO = (t,e)=>{ e.stopPropagation(); HK.go('K2',{code:'TYO'}); setTimeout(()=>HK.ACT.openOptions(null,null,'TYO'),400); };
HK.ACT.noti = ()=>HK.sheet(`<div class="h2">알림</div>
  ${[['box','일본 키트가 내일 도착해요','11월 5일 (목) 도착 예정 · 배송 중','K7'],['fridge','양배추가 3일째 남아 있어요','냉털 레시피 4가지를 찾았어요','fridge'],['users','요리하는 민지가 새 레시피를 올렸어요','10분 똠얌 라면 · 방금','E1D?id=p1'],['gift','꼬마 셰프까지 도장 2개','도장 3개를 모으면 리필 20% 쿠폰','B4']].map(([i,t,s,g])=>`<div class="lrow tap" data-act="notiGo" data-to="${g}"><div class="ico">${ic(i)}</div><div class="f1"><div class="sb7">${t}</div><div class="xs">${s}</div></div>${ic('next',16)}</div>`).join('')}`);
HK.ACT.notiGo = t=>{ const to=t.dataset.to; HK.closeOverlay(); setTimeout(()=>{ if(['fridge','feed','passport','kitchen','home'].includes(to)) HK.tab(to); else { const [n,q]=to.split('?'); HK.go(n,q?Object.fromEntries(new URLSearchParams(q)):{}); } },320); };

/* ===== 03 키트 주문 ===== */
SCR.K1 = { render:()=>{ const n=S.cart.reduce((a,c)=>a+c.qty,0), sum=S.cart.reduce((a,c)=>a+c.price*c.qty,0);
  return `<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll" style="padding-bottom:110px"><div class="top"></div><div class="pad">
   <div class="h1">어디로\n떠나 볼까요?</div>
   <div class="hscroll" style="margin-top:24px">${['전체','아시아','유럽','베이킹','매운맛'].map((c,i)=>`<button class="chip ${i?'':'on'}" data-act="k1cat" data-c="${c}">${i?'':ic('check',14)}${c}</button>`).join('')}</div>
   <div style="margin-top:20px" id="k1list">${k1rows('전체')}</div></div></div>
   <div class="bot"><button class="btn k" data-go="K4" ${n?'':'disabled'}><span class="row g8">${ic('cart',18)}장바구니 ${n}개</span><span style="color:var(--lime);font-size:14px">${n?won(sum)+' 보기':'비어 있어요'}</span></button></div>`; } };
function k1rows(cat){
  const asia=['BKK','TYO','SEL','CTU','HAN','DEL'], eu=['ROM','PAR'], hot=['BKK','CTU','DEL','MEX'];
  return HK.KITS.filter(k=>cat==='전체'||(cat==='아시아'&&asia.includes(k.code))||(cat==='유럽'&&eu.includes(k.code))||(cat==='베이킹'&&k.code==='PAR')||(cat==='매운맛'&&hot.includes(k.code))).map(k=>`
   <div class="card tap row g12 fade-up mt12" data-go="K2?code=${k.code}" style="padding:14px 16px;height:84px">
    <div style="width:40px;text-align:center;color:${S.stamps[k.code]?'var(--or)':'var(--g)'}">${HK.lm(k.code,30)}<div class="cap" style="font-size:12px;color:inherit">${k.code}</div></div>
    <div class="f1"><div class="bb">${k.name}</div><div class="xs mt4">${k.sub}</div></div>
    <div style="text-align:right">${k.mine?`<div class="sb7" style="color:var(--or)">리필 6,900원</div><span class="pill or mt4">다 써 가요</span>`:`<div class="sb7">${won(k.price)}</div>${k.badge?`<span class="pill mt4">${k.badge}</span>`:''}`}</div></div>`).join('');
}
HK.ACT.k1cat = t=>{ t.parentNode.querySelectorAll('.chip').forEach(c=>{c.classList.remove('on');c.innerHTML=c.dataset.c;}); t.classList.add('on'); t.innerHTML=ic('check',14)+t.dataset.c; HK.$('#k1list').innerHTML = k1rows(t.dataset.c); };

SCR.K2 = { cls:'', render:p=>{ const k=HK.kit(p.code||'TYO'); const mine=k.mine;
  return `<div class="bar">${HK.backBtn(true)}<button class="ib dark" data-act="wish">${ic('heart')}</button></div>
   <div class="scroll" style="padding-bottom:120px">
   <div style="background:var(--g);color:#fff;padding:120px 24px 28px;position:relative;overflow:hidden">
     <div class="wm" style="position:absolute;right:-10px;top:40px;color:var(--lime);opacity:.4">${HK.lm(k.code,220)}</div>
     <div class="cap lime">${k.city}</div><div style="font-size:44px;font-weight:700;color:var(--lime);line-height:1.1;margin-top:4px">${k.code}</div>
     <div class="h2 mt8">${k.full}</div><div class="xs mt4" style="color:var(--lime2)">${k.recipes.join(' · ')} · 5인분 이내</div>
     ${mine?`<span class="pill lime mt12">${ic('check',12)} 내 키트 · 도장 받음</span>`:''}
     <div style="position:absolute;right:16px;bottom:8px">${HK.chick(k.code==='PAR'?'baking':mine?'cook':'travel',96,'bob')}</div></div>
   <div class="pad mt24">
   ${mine?`<div class="h2">내 키트 남은 양</div><div class="s mt4">요리 3번 했어요 · 다 쓴 것만 소량으로 다시 채울 수 있어요</div>`:`<div class="h2">들어 있는 것</div><div class="s mt4">요리 3가지를 5인분 이내로 만들 수 있는 양이에요</div>`}
   <div class="card mt12" style="padding:4px 18px">${k.items.map(([n,a,s,lv])=>`<div class="lrow"><div class="f1 sb7">${n}</div><div class="sb7" style="color:var(--g);width:56px;text-align:right">${a}</div><div class="xs" style="width:96px;text-align:right;${mine&&lv===0?'color:var(--or);font-weight:700':''}">${s}</div></div>`).join('')}</div>
   ${mine?`<div class="card mt12 tap row g12" data-go="B3?code=BKK" style="padding:16px"><div class="ico">${ic('bookmark')}</div><div class="f1"><div class="sb7">태국 레시피 3개 · 완성 1</div><div class="xs">${k.recipes.join(' · ')}</div></div>${ic('next',16)}</div>`:
   `<div class="h2 mt24">함께 오는 도구</div><div class="chips mt12">${k.tools.map(t=>`<span class="chip">${t}</span>`).join('')}</div>
    <div class="h2 mt24">이 키트로 만드는 요리</div><div class="chips mt12">${k.recipes.map(r=>`<span class="chip">${r}</span>`).join('')}</div>`}
   </div></div>
   <div class="bot dock"><div class="row g12"><div style="width:110px"><div class="xs">${mine?'다 쓴 3가지 리필':'첫 여행 키트'}</div><div class="h2">${won(mine?6900:k.price)}</div></div>
     <div class="f1">${mine?HK.btn('리필하기','data-go="K6"','or',false):HK.btn('옵션 고르기',`data-act="openOptions" data-code="${k.code}"`)}</div></div></div>`; } };
HK.ACT.wish = ()=>HK.toast('찜했어요 · 나의 주방에서 볼 수 있어요','heart');

/* 옵션 시트 */
HK.ACT.openOptions = (t,e,codeArg)=>{
  const code = codeArg || t.dataset.code; const k = HK.kit(code);
  const o = { method:0, spice:1, remove:[], dislike:[] };
  const methods=[['첫 여행 키트','소스 · 향신료 + 도구 4종',k.price],['소스 · 향신료만','도구는 이미 있어요',9900],['매달 새 나라','매달 다른 나라 키트',13900]];
  const draw = sh=>{
    sh.innerHTML = `<div class="grab"></div><div class="row sp"><div class="h2">${k.name} 키트 옵션</div><button class="ib" data-close style="width:36px;height:36px">${ic('close',18)}</button></div>
    <div class="sb7 mt16">받는 방법</div><div class="grid2 mt8">${methods.slice(0,2).map((m,i)=>`<button class="card ${o.method===i?'g':'ln'}" data-o="method" data-v="${i}" style="padding:14px;text-align:left"><div class="sb7">${m[0]}</div><div class="xs" style="${o.method===i?'color:var(--lime2)':''}">${m[1]}</div><div class="sb7 mt8" style="color:${o.method===i?'var(--lime)':'var(--g)'}">${won(m[2])}</div></button>`).join('')}</div>
    <div class="row sp mt24"><span class="sb7">맵기</span><span class="xs">고추는 따로 담아 드려요</span></div><div class="chips mt8">${['안 맵게','보통','맵게'].map((s,i)=>`<button class="chip ${o.spice===i?'on':''}" data-o="spice" data-v="${i}">${o.spice===i?ic('check',14):''}${s}</button>`).join('')}</div>
    <div class="row sp mt24"><span class="sb7">빼고 싶은 재료</span><span class="xs">빼면 대체 재료로 바꿔 넣어요</span></div><div class="chips mt8">${[...new Set(['땅콩','갑각류','생선','대두','밀','참깨','우유','고수','마늘','버섯','파',...o.remove])].map(s=>`<button class="chip ${o.remove.includes(s)?'on':''}" data-o="remove" data-v="${s}">${o.remove.includes(s)?ic('check',14):''}${s}</button>`).join('')}<button class="chip" data-o="custom">${ic('plus',14)}직접 입력</button></div>
    ${o.typing?`<div class="row g8 mt8"><input class="field f1" id="dIn" placeholder="예: 오이" style="height:44px;padding:0 14px" enterkeyhint="done"><button class="chip on" data-o="customOk" style="height:44px">추가</button></div>`:''}
    <div class="mt24">${HK.btn('장바구니 담기 · '+won(methods[o.method][2]),'data-o="add"','p')}</div>`;
  };
  HK.sheet('',{mount:sh=>{ draw(sh); sh.addEventListener('click',ev=>{ const b=ev.target.closest('[data-o]'); if(!b) return; const key=b.dataset.o, v=b.dataset.v;
    if(key==='method'||key==='spice'){ o[key]=+v; draw(sh); }
    else if(key==='remove'){ const had=o.remove.includes(v); o.remove = had?o.remove.filter(x=>x!==v):[...o.remove,v]; draw(sh);
      if(!had && v==='대두' && code!=='SEL') { HK.modal(`${HK.chick('curious',90,'sway','margin:-70px 0 0')}<div class="h2 mt8">대두를 빼면\n이렇게 바뀌어요</div><div class="s mt8">맛은 최대한 비슷하게 맞췄어요</div><div class="card ln mt16" style="padding:12px 16px"><div class="row g8 sb7"><span class="strike">간장 · 미소</span>${ic('next',14)}<span>코코넛 아미노 소스</span></div></div><div class="mt16">${HK.btn('괜찮아요, 담을게요','data-close')}</div><button class="link" data-close>다시 고를게요</button>`); }
    }
    else if(key==='dislike'){ o.dislike = o.dislike.includes(v)?o.dislike.filter(x=>x!==v):[...o.dislike,v]; draw(sh); }
    else if(key==='custom'){ o.typing=!o.typing; draw(sh); const i=sh.querySelector('#dIn'); if(i){ i.focus(); i.addEventListener('keydown',e=>{ if(e.key==='Enter') sh.querySelector('[data-o="customOk"]').click(); }); } }
    else if(key==='customOk'){ const i=sh.querySelector('#dIn'); const v=i?i.value.trim():''; if(v && !o.remove.includes(v)) o.remove.push(v); o.typing=false; draw(sh); }
    else if(key==='add'){ const m=methods[o.method]; const ex=S.cart.find(c=>c.code===code&&c.method===m[0]); if(ex) ex.qty++; else S.cart.push({code,method:m[0],price:m[2],qty:1,opt:[['안 맵게','보통 맵기','맵게'][o.spice],...o.remove.map(r=>r+' 빼기'),...o.dislike.map(r=>r+' 빼기')].join(' · ')}); HK.save(); HK.closeOverlay(); HK.toast('장바구니에 담았어요','cart'); }
  }); }});
};

SCR.K4 = { render:()=>{ const sum=S.cart.reduce((a,c)=>a+c.price*c.qty,0); const ship=sum>=20000||!sum?0:3000;
  return `<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll" style="padding-bottom:120px"><div class="top"></div><div class="pad">
  <div class="h1">장바구니</div>
  ${S.cart.length?`<div class="ticket" style="margin-top:20px;padding:20px 20px 22px"><div class="cap">BOARDING PASS · ${S.cart.length}</div>
   ${S.cart.map((c,i)=>{const k=HK.kit(c.code);return `<div class="row g12 mt16" style="align-items:flex-start"><div style="width:40px;text-align:center;color:var(--g)">${HK.lm(c.code,28)}<div class="cap" style="font-size:12px">${c.code}</div></div><div class="f1"><div class="sb7">${k.name} · ${c.method}</div><div class="xs">${c.opt||''}</div>
     <div class="row g8 mt8"><button class="ib" style="width:28px;height:28px" data-act="qty" data-i="${i}" data-d="-1">${ic('minus',14)}</button><span class="sb7">${c.qty}</span><button class="ib" style="width:28px;height:28px" data-act="qty" data-i="${i}" data-d="1">${ic('plus',14)}</button></div></div><div class="sb7">${won(c.price*c.qty)}</div></div>`;}).join('')}
   <div style="height:20px"></div><div class="div" style="border-top:1.5px dashed rgba(15,59,39,.18);background:none"></div>
   <div class="row sp mt16 s"><span>상품 금액</span><span style="color:var(--tx)">${won(sum)}</span></div><div class="row sp mt8 s"><span>배송비</span><span style="color:var(--tx)">${ship?won(ship):'무료'}</span></div><div class="xs">2만 원 이상 무료 배송</div>
   <div class="row sp mt16"><span class="sb7">결제 금액</span><span class="h2">${won(sum+ship)}</span></div></div>
   <div class="card mt16 row g12 tap" style="padding:14px 16px" data-act="addr"><div class="ico">${ic('pin')}</div><div class="f1"><div class="sb7">배송지</div><div class="xs">서울시 마포구 · 이세라</div></div>${ic('next',16)}</div>
   <div class="card mt8 row g12 tap" style="padding:14px 16px"><div class="ico">${ic('card')}</div><div class="f1"><div class="sb7">결제 수단</div><div class="xs">카드 · 간편결제</div></div>${ic('next',16)}</div>`
  :`<div style="text-align:center;margin-top:80px">${HK.chick('curious',120,'sway','margin:0 auto')}<div class="h2 mt16">장바구니가 비어 있어요</div><div class="s mt8">다음 여행지를 골라 볼까요?</div><div class="mt24">${HK.btn('키트 둘러보기','data-go="K1"','o',false)}</div></div>`}
  </div></div>${S.cart.length?`<div class="bot">${HK.btn(won(sum+ship)+' 결제하기','data-act="pay"')}</div>`:''}`; } };
HK.ACT.qty = t=>{ const c=S.cart[+t.dataset.i]; c.qty+= +t.dataset.d; if(c.qty<1) S.cart.splice(+t.dataset.i,1); HK.save(); HK.rerender(); };
HK.ACT.addr = ()=>HK.sheet(`<div class="h2">배송지</div><div class="card ln mt16" style="padding:16px"><div class="row sp"><span class="sb7">집</span><span class="pill">기본</span></div><div class="s mt4">서울시 마포구 · 이세라 · 010-0000-0000</div></div><div class="card ln mt8" style="padding:16px"><div class="sb7">회사</div><div class="s mt4">이세라 · 평일만</div></div><div class="mt16">${HK.btn('이 주소로 받기','data-close')}</div>`);
HK.ACT.pay = ()=>{ HK.lastOrder = S.cart.map(c=>({...c})); S.cart=[]; HK.save(); HK.go('K5',{},'fade'); };

SCR.K5 = { cls:'dark', darkBar:true, render:()=>{ const o=HK.lastOrder||[{code:'TYO',method:'첫 여행 키트',price:14900,qty:1}];
  return `<div class="scroll"><div style="height:96px"></div><div class="pad" style="text-align:center">${HK.chick('box',150,'hop','margin:0 auto')}
  <div class="h1 mt16">출발 확정!</div><div class="s mt8" style="color:var(--lime2)">11월 6일 (금)에 도착할 예정이에요</div>
  <div class="ticket mt32" style="padding:20px;color:var(--tx);text-align:left"><div class="cap">ORDER NO. 26110401</div>
   ${o.map(c=>`<div class="row sp mt12"><span class="row g12"><b class="cap" style="width:36px">${c.code}</b><span class="sb7">${HK.kit(c.code).name} · ${c.method}</span></span><span class="sb7">${won(c.price*c.qty)}</span></div>`).join('')}
   <div style="height:40px"></div><div class="perf" style="bottom:56px"></div><div class="notch" style="left:-12px;bottom:44px"></div><div class="notch" style="right:-12px;bottom:44px"></div>
   <div class="sb7" style="color:var(--g)">도착하면 여권 카드 QR을 찍어 주세요</div></div></div></div>
  <div class="bot">${HK.btn('주문 내역 보기','data-go="K7"','l')}<button class="link" data-act="toHome">홈으로</button></div>`; } };

SCR.K6 = { render:()=>`<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll" style="padding-bottom:120px"><div class="top"></div><div class="pad">
  <div class="cap or">REFILL · BKK</div><div class="h1 mt4">다 쓴 것만\n조금씩 다시 채워요</div><div class="s" style="margin-top:10px">요리 3번을 했어요. 많이 쓴 재료를 먼저 골라 뒀어요.</div>
  <div class="card mt16" style="padding:4px 18px" id="refill">${[['피시소스 30ml','다 썼어요',2900,1],['굴소스 30g','다 썼어요',2400,1],['타이 고추 2g','조금 남았어요',1600,1],['똠얌 페이스트 40g','넉넉해요',2400,0],['타마린드 30g','넉넉해요',1800,0],['팜슈거 20g','넉넉해요',1200,0],['건조 홀리바질 2g','조금 남았어요',1500,0]].map(([n,s,p,on],i)=>`<div class="lrow tap" data-act="refillT" data-p="${p}"><span class="check ${on?'on':''}">${ic('check')}</span><div class="f1"><div class="sb7">${n}</div><div class="xs" style="${s==='다 썼어요'?'color:var(--or)':''}">${s}</div></div><span class="sb7">${won(p)}</span></div>`).join('')}</div></div></div>
  <div class="bot dock"><div class="row g12"><div style="width:100px"><div class="xs" id="rcnt">3가지 선택</div><div class="h2" id="rsum">6,900원</div></div><div class="f1">${HK.btn('장바구니 담기','data-act="refillAdd"')}</div></div></div>` };
HK.ACT.refillT = t=>{ t.querySelector('.check').classList.toggle('on'); const on=[...document.querySelectorAll('#refill .check.on')].map(c=>+c.closest('[data-p]').dataset.p); HK.$('#rcnt').textContent=on.length+'가지 선택'; HK.$('#rsum').textContent=won(on.reduce((a,b)=>a+b,0)); };
HK.ACT.refillAdd = ()=>{ const on=[...document.querySelectorAll('#refill .check.on')].map(c=>+c.closest('[data-p]').dataset.p); const s=on.reduce((a,b)=>a+b,0); if(!s) return; S.cart.push({code:'BKK',method:'리필',price:s,qty:1,opt:on.length+'가지'}); HK.save(); HK.toast('리필을 장바구니에 담았어요','cart'); setTimeout(()=>HK.back(),700); };

SCR.K7 = { render:()=>`<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll"><div class="top"></div><div class="pad">
  <div class="h1">주문 내역 · 쿠폰</div>
  <div class="card" style="margin-top:18px;padding:18px"><div class="row sp"><span class="cap">11.04 주문</span><span class="pill or">배송 중</span></div><div class="row g12 mt12"><span style="color:var(--g)">${HK.lm('TYO',28)}</span><div class="f1"><div class="sb7">일본 · 첫 여행 키트</div><div class="xs">11월 6일 (금) 도착 예정</div></div><span class="sb7">14,900원</span></div></div>
  <div class="card mt8" style="padding:18px"><div class="row sp"><span class="cap">11.01 주문</span><span class="pill soft">도착</span></div><div class="row g12 mt12"><span style="color:var(--or)">${HK.lm('BKK',28)}</span><div class="f1"><div class="sb7">태국 · 첫 여행 키트</div><div class="xs">11월 3일 (화) 도착</div></div><span class="sb7">14,900원</span></div></div>
  <div class="h2 mt32">쿠폰</div><div class="ticket g mt12" style="padding:18px 20px"><div class="cap lime">COUPON</div><div class="h2 mt4">리필 팩 20% 할인</div><div class="xs mt4" style="color:var(--lime2)">꼬마 셰프가 되면 열려요 · 도장 3개</div></div></div></div>` };

/* ===== 04 여권 · 도장 ===== */
SCR.passport = { tab:'passport', render:()=>{ const n=Object.keys(S.stamps).length;
  return `<div class="scroll" style="padding-bottom:120px"><div class="top-s"></div><div class="pad"><div class="cap mt16">MY PASSPORT</div><div class="h1 mt4">세라의 요리 여권</div>
  <div class="card g mt16 tap" data-go="B4" style="padding:18px 20px"><div class="row sp"><div><div class="cap lime">LEVEL 1</div><div class="bb mt4">요리 병아리</div></div><span class="xs" style="color:var(--lime2)">꼬마 셰프까지 도장 ${3-n}개</span></div><div class="progress mt12"><i style="width:${n/3*100}%"></i></div></div>
  <div class="card mt16" style="padding:20px 12px;display:grid;grid-template-columns:repeat(3,1fr);row-gap:18px">${HK.KITS.map(k=>`<div class="tap" style="display:grid;justify-items:center" data-go="B3?code=${k.code}">${S.stamps[k.code]?HK.stamp(k.code,{size:84,date:S.stamps[k.code]}):HK.stamp(k.code,{empty:true,size:84})}<div class="xs mt8" style="${S.stamps[k.code]?'color:var(--tx);font-weight:700':''}">${k.name.split(' ')[0]}</div></div>`).join('')}</div>
  <div class="card mt16 tap row g12" data-go="B5" style="padding:16px 18px;border:1.5px solid var(--g)"><div class="ico" style="background:var(--g);color:var(--lime)">${ic('gift')}</div><div class="f1"><div class="xs">9개국을 모두 모으면</div><div class="sb7">원하는 키트 1개 선물</div></div><span class="xs">${n} / 9</span></div>
  <div style="display:flex;justify-content:flex-end;margin-top:8px">${HK.chick('stamp',100,'hop')}</div></div></div>`; } };

SCR.B3 = { render:p=>{ const k=HK.kit(p.code||'BKK'); const has=!!S.stamps[k.code]; const rs=k.code==='BKK'?[['팟카파오 무','돼지고기 바질볶음 · 15분','완성','pakkapao'],['똠얌꿍','새우 수프 · 25분','2 / 5단계',''],['팟타이','쌀국수 볶음 · 20분','아직','']]:k.recipes.map(r=>[r,'키트 레시피','아직','']);
  return `<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll"><div class="top"></div><div class="pad">
  <div class="card row g16" style="padding:20px;gap:16px"><div style="color:${has?'var(--or)':'rgba(17,17,17,.3)'}">${has?HK.stamp(k.code,{size:90,date:S.stamps[k.code]}):HK.stamp(k.code,{empty:true,size:90})}</div><div class="f1"><div class="cap or">${k.city}</div><div class="h2">${k.name} 요리</div><div class="xs mt4">${has?'도장 받은 날 · '+S.stamps[k.code]:'아직 도장이 없어요'}</div><div class="xs" style="font-weight:700;color:var(--g)">완성한 요리 ${has?1:0} / 3</div></div></div>
  <div class="h2 mt24">레시피 3개</div>
  ${rs.map(([t,s,st,id])=>`<div class="card mt8 row g12 tap" style="padding:12px 16px" ${id?`data-go="C1?id=${id}"`:'data-act="soon"'}>${HK.photo(id?'assets/img/pakkapao.jpg':'',48,12,'width:48px;flex:none')}<div class="f1"><div class="sb7">${t}</div><div class="xs">${s}</div></div><span class="pill ${st==='완성'?'':st==='아직'?'soft':'or'}" style="${st==='아직'?'background:#F0F2F0;color:var(--tx2)':''}">${st}</span></div>`).join('')}
  ${k.code==='BKK'?`<div class="h2 mt24">내 키트 남은 양</div><div class="chips mt12">${k.items.map(([n,a,s,l])=>`<span class="chip" style="height:30px;font-size:12px">${n} <b style="color:${l===0?'var(--or)':'var(--g)'}">${s}</b></span>`).join('')}</div><div class="mt24">${HK.btn('다 쓴 재료 리필하기 · 6,900원','data-go="K6"','or',false)}</div>`:`<div class="mt24">${HK.btn(k.name+' 키트 보기',`data-go="K2?code=${k.code}"`)}</div>`}
  <div style="height:40px"></div></div></div>`; } };
HK.ACT.soon = ()=>HK.toast('체험 버전에서는 팟카파오 무를 요리할 수 있어요','info',2000);

SCR.B4 = { render:()=>`<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll"><div class="top"></div><div class="pad">
  <div class="h1">도장이 쌓이면\n이렇게 달라져요</div>
  ${HK.LEVELS.map((l,i)=>`<div class="card ${i===0?'g':''}" style="margin-top:${i===0?28:12}px;padding:18px 20px"><div class="row sp"><span class="cap ${i===0?'lime':''}">${l[0]}</span>${i===0?'<span class="pill lime">지금 여기</span>':`<span class="xs">${l[2]}</span>`}</div><div class="bb mt4">${l[1]}</div><div class="xs mt4" style="${i===0?'color:var(--lime2)':''}">${i===0?l[2]+' · ':''}${l[3]}</div>${i===3?`<div style="position:absolute;right:16px;bottom:14px;color:var(--or)">${ic('gift',20)}</div>`:''}</div>`).join('')}
  <div class="row g12 mt24">${HK.chick('stamp',80,'hop')}<div class="s">도장은 레시피 3개 중\n하나만 완성해도 받을 수 있어요</div></div><div style="height:40px"></div></div></div>` };

SCR.B5 = { cls:'dark', darkBar:true, render:()=>`<div class="bar">${HK.backBtn(true)}<span></span></div><div class="scroll"><div style="height:66px"></div><div class="pad" style="text-align:center">
  <div class="cap lime">WORLD CHEF</div><div class="h1 mt4">세계 셰프가 되었어요!</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);row-gap:14px;justify-items:center;margin-top:24px;color:var(--lime)">${HK.KITS.map((k,i)=>`<div style="animation-delay:${i*90}ms" class="stamp-in">${HK.stamp(k.code,{size:84,color:i%2?'var(--or)':'var(--lime)',rot:[-10,6,-4,8,-8,4,-6,10,-2][i]})}</div>`).join('')}</div>
  <div style="position:absolute;right:30px;top:470px">${HK.chick('trophy',130,'hop')}</div>
  <div class="card mt24 row g12" style="padding:18px;color:var(--tx);text-align:left;margin-top:150px"><div class="ico" style="background:var(--or);color:#fff">${ic('gift')}</div><div><div class="xs" style="color:var(--or);font-weight:700">선물이 도착했어요</div><div class="sb7">원하는 키트 1개 무료</div></div></div>
  <div class="mt16">${HK.btn('선물 키트 고르기','data-go="B6"','l')}</div><button class="link" data-go="E2A">여권 자랑하기</button><div style="height:30px"></div></div></div>` };

SCR.B6 = { render:p=>{ const sel=p.sel||'PAR'; const k=HK.kit(sel);
  return `<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll" style="padding-bottom:110px"><div class="top"></div><div class="pad">
  <div class="cap">WORLD CHEF GIFT</div><div class="h1 mt4">선물 받을 키트를\n하나 골라 주세요</div><div class="s" style="margin-top:12px">9개국 도장을 모두 모았어요. 어떤 나라든 1개 무료예요.</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px">${HK.KITS.map(x=>{const on=x.code===sel;return `<button class="card ${on?'g':'ln'}" data-act="giftSel" data-c="${x.code}" style="height:124px;padding:16px 4px 0;text-align:center;transition:background .25s">
    <div style="color:${on?'var(--lime)':'var(--g)'};display:flex;justify-content:center">${HK.lm(x.code,28)}</div><div class="bb mt4" style="color:${on?'var(--lime)':'var(--tx)'}">${x.code}</div><div class="sb7" style="font-size:14px">${x.name.split(' ')[0]}</div><div class="xs" style="${on?'color:var(--lime2)':''}">${x.recipes[0]}</div>
    ${on?`<span style="position:absolute;right:8px;top:8px;width:22px;height:22px;border-radius:11px;background:var(--lime);color:var(--g);display:grid;place-items:center">${ic('check',14)}</span>`:''}</button>`;}).join('')}</div>
  <div class="card ln mt16 row" style="padding:16px 20px"><div class="f1"><div class="xs" style="font-weight:700">선택한 키트</div><div class="bb">${k.full}</div></div><div style="text-align:right"><div class="xs strike">${won(k.price)}</div><div class="h2" style="color:var(--g)">0원</div></div></div></div></div>
  <div class="bot">${HK.btn('이 키트로 받기',`data-go="B6C?code=${sel}"`)}</div>`; } };
HK.ACT.giftSel = t=>{ const c=HK.cur(); c.params.sel=t.dataset.c; HK.rerender(); };

SCR.B6C = { render:p=>{ const k=HK.kit(p.code||'PAR');
  return `<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll" style="padding-bottom:110px"><div class="top"></div><div class="pad">
  <div class="h1">선물 받기</div>
  <div class="card" style="margin-top:20px;padding:22px 24px"><div class="cap">GIFT · WORLD CHEF</div>
   <div class="row g12 mt16" style="align-items:flex-start"><div style="width:40px;color:var(--g);text-align:center">${HK.lm(k.code,32)}<div class="cap" style="font-size:12px">${k.code}</div></div><div><div class="bb">${k.full}</div><div class="xs">${k.recipes.join(' · ')}</div><div class="xs">${k.tools.slice(0,3).join(' · ')}</div></div></div>
   <div class="div mt16"></div><div class="row sp mt16 s"><span>상품 금액</span><span style="color:var(--tx)">${won(k.price)}</span></div><div class="row sp mt8 s"><span>세계 셰프 선물</span><b style="color:var(--g)">-${won(k.price)}</b></div><div class="row sp mt8 s"><span>배송비</span><span style="color:var(--tx)">무료</span></div>
   <div class="div mt16"></div><div class="row sp mt16"><span class="s">결제 금액</span><span class="h2">0원</span></div></div>
  <div class="card mt16 row g12 tap" style="padding:14px 16px" data-act="addr"><div class="ico">${ic('pin')}</div><div class="f1"><div class="sb7">배송지</div><div class="xs">서울시 마포구 · 이세라</div></div>${ic('next',16)}</div>
  <div class="card mt8 row g12" style="padding:14px 16px"><div class="ico">${ic('calendar')}</div><div class="f1"><div class="sb7">받는 날</div><div class="xs">11월 6일 (금) 도착 예정</div></div></div></div></div>
  <div class="bot">${HK.btn('선물 받기',`data-go="B6D?code=${k.code}" data-mode="fade"`)}</div>`; } };

SCR.B6D = { cls:'dark', darkBar:true, render:p=>{ const k=HK.kit(p.code||'PAR');
  return `<div class="scroll"><div style="height:96px"></div><div class="pad" style="text-align:center">${HK.chick('box',150,'hop','margin:0 auto')}
  <div class="h1 mt16">선물 키트가 출발했어요!</div><div class="s mt8" style="color:var(--lime2)">11월 6일 (금)에 도착할 예정이에요</div>
  <div class="ticket mt32" style="padding:20px;color:var(--tx);text-align:left"><div class="cap">GIFT NO. 26110401</div><div class="row sp mt12"><span class="row g12"><b class="cap" style="width:36px">${k.code}</b><span><span class="sb7">${k.full}</span><br><span class="xs">${k.recipes.join(' · ')}</span></span></span><span class="sb7">0원</span></div>
  <div style="height:44px"></div><div class="perf" style="bottom:56px"></div><div class="notch" style="left:-12px;bottom:44px"></div><div class="notch" style="right:-12px;bottom:44px"></div><div class="sb7" style="color:var(--g)">9개국 여행을 마친 세라에게 주는 선물이에요</div></div></div></div>
  <div class="bot"><button class="btn l" data-act="toHome" id="giftBtn"><span>홈으로 가기</span><span class="arr" style="font-size:14px"><span class="cnt-num">5</span></span></button><button class="link" data-go="K7">주문 내역 보기</button></div>`; },
  mount:el=>HK.autoBtn(el,'#giftBtn',5000,()=>HK.ACT.toHome()) };
})();
