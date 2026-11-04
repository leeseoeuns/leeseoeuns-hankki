/* 레시피 · 요리 모드 · 냉털 · 피드 · 나의 주방 */
(function(){
const HK = window.HK, S = HK.S, SCR = HK.SCREENS, ic = HK.ic, won = HK.won;
const R = id => HK.RECIPES[id] || HK.RECIPES.pakkapao;

/* ===== 05 레시피 ===== */
SCR.C1 = { render:p=>{ const r=R(p.id); const saved=S.saved.includes(r.id);
  return `<div class="bar">${HK.backBtn(true)}<div class="row g8"><button class="ib dark" data-act="share">${ic('share')}</button><button class="ib dark" data-act="saveR" data-id="${r.id}" style="${saved?'color:var(--lime)':''}">${ic('bookmark')}</button></div></div>
  <div class="scroll" style="padding-bottom:120px">${HK.photo(r.img,280,0)}
  <div class="pad" style="margin-top:-28px;position:relative"><div class="card" style="padding:22px 22px 20px">
    <div class="cap or">${r.fridge?'냉털 레시피':'THAILAND · BKK'}</div><div class="h1 mt4">${r.title}</div><div class="s">${r.sub}</div>
    <div class="row g8 mt12">${[r.time,r.level,r.serve].map(x=>`<span class="pill soft">${x}</span>`).join('')}</div></div>
  ${r.kit?`<div class="row sp mt24"><div class="h2">키트에서</div><span class="xs">양은 키트 양 기준판으로</span></div><div class="card mt12" style="padding:2px 18px">${r.kit.map(([n,a,f])=>`<div class="lrow"><span class="sb7 f1">${n}</span><span class="sb7" style="color:var(--g)">${a}</span>${f==='pinch'?`<button class="ib" style="width:28px;height:28px;margin-left:8px" data-act="pinch">?</button>`:''}</div>`).join('')}</div>`:''}
  <div class="h2 mt24">${r.kit?'집에서':'필요한 재료'}</div><div class="card mt12" style="padding:2px 18px">${r.home.map(([n,a,f])=>`<div class="lrow"><span class="sb7 f1">${n}</span><span class="sb7" style="color:var(--g)">${a}</span>${f==='swap'?`<button class="pill or" style="margin-left:8px" data-act="swap">없어요?</button>`:''}</div>`).join('')}</div>
  <div class="h2 mt24">순서 ${r.steps.length}단계</div>${r.steps.map((s,i)=>`<div class="row g12 mt12" style="align-items:flex-start"><span class="pill" style="width:26px;justify-content:center;padding:0">${i+1}</span><div class="f1"><div class="sb7">${s.t.replace('\n',' ')}</div><div class="xs">${s.amt}</div></div></div>`).join('')}
  <div style="display:flex;justify-content:flex-end">${HK.chick('recipe',96,'bob')}</div></div></div>
  <div class="bot dock">${HK.btn('요리 시작하기',`data-go="C2?id=${r.id}"`)}<button class="link" style="margin-top:8px" data-act="toMemo" data-id="${r.id}">장보기 메모에 담기</button></div>`; } };
HK.ACT.saveR = t=>{ const id=t.dataset.id; const had=S.saved.includes(id); S.saved = had?S.saved.filter(x=>x!==id):[...S.saved,id]; HK.save(); t.style.color=had?'':'var(--lime)'; HK.toast(had?'저장을 취소했어요':'저장한 레시피에 담았어요','bookmark'); };
HK.ACT.share = ()=>HK.sheet(`<div class="h2">공유하기</div><div class="card ln row g12 mt16" style="padding:12px">${HK.photo('assets/img/pakkapao.jpg',56,12,'width:56px;flex:none')}<div><div class="sb7">팟카파오 무 레시피</div><div class="xs">한 끼 여권 · 15분 · 쉬움</div></div></div><div class="row mt16" style="justify-content:space-around">${[['link','링크 복사'],['comment','메시지'],['image','이미지 저장'],['more','더 보기']].map(([i,l])=>`<button style="text-align:center" data-act="copied"><div class="ico" style="margin:0 auto;border-radius:24px;width:48px;height:48px">${ic(i==='link'?'share':i)}</div><div class="xs mt4">${l}</div></button>`).join('')}</div>`);
HK.ACT.copied = ()=>{ HK.closeOverlay(); HK.toast('링크를 복사했어요','check'); };
HK.ACT.pinch = ()=>HK.modal(`${HK.chick('taste',90,'bob','margin:-70px 0 0')}<div class="h2 mt8">한 꼬집은 이만큼!</div><div class="s mt8">100원 동전을 얇게 덮는 양이에요 (약 0.5g)</div>
  <div class="card ln mt16" style="padding:4px 16px">${[['한 꼬집','100원 동전을 얇게 덮는 양'],['파스타 1인분','500원 동전 굵기 다발'],['고기 100g','신용카드 크기 · 두께 1cm'],['물 1컵','종이컵 가득 (180ml)']].map(([a,b])=>`<div class="lrow"><span class="sb7" style="width:96px">${a}</span><span class="xs">${b}</span></div>`).join('')}</div><div class="mt16">${HK.btn('알겠어요','data-close')}</div>`);
HK.ACT.swap = ()=>HK.sheet(`<div class="h2">마늘이 없다면?</div><div class="s mt4">이걸로 바꿔도 맛이 거의 같아요</div>
  ${[['마늘 가루 1/2작은술','향은 조금 약해요'],['냉동 다진 마늘 1큰술','칼질 없이 바로']].map(([a,b])=>`<div class="card ln mt12 row g12 tap" style="padding:14px 16px" data-act="swapped"><div class="f1"><div class="sb7">${a}</div><div class="xs">${b}</div></div>${ic('next',16)}</div>`).join('')}`);
HK.ACT.swapped = ()=>{ HK.closeOverlay(); HK.toast('마늘 가루로 바꿨어요','check'); };
HK.ACT.toMemo = t=>{ const r=R(t.dataset.id); HK.sheet(`<div class="h2">장보기 메모에 담기</div><div class="s mt4">${r.title}에 필요한데 없는 재료를 골라요</div>
  <div class="mt12" id="memoPick">${r.home.map(([n,a],i)=>`<div class="lrow tap" data-act="mp"><span class="check ${i===1?'on':''}">${ic('check')}</span><span class="sb7 f1">${n}</span><span class="xs">${a}</span></div>`).join('')}</div>
  <div class="row sp mt16"><span class="sb7">장 보는 날</span><span class="pill soft">${ic('calendar',12)} 11월 6일 (금)</span></div><div class="mt16">${HK.btn('메모에 담기',`data-act="memoAdd" data-id="${r.id}"`)}</div>`); };
HK.ACT.mp = t=>t.querySelector('.check').classList.toggle('on');
HK.ACT.memoAdd = t=>{ const r=R(t.dataset.id); document.querySelectorAll('#memoPick .lrow').forEach((row,i)=>{ if(row.querySelector('.check.on')) S.memo.push({id:'m'+Date.now()+i,t:r.home[i][0]+' '+r.home[i][1],from:r.title,done:false}); }); HK.save(); HK.closeOverlay(); HK.toast('장보기 메모에 담았어요','calendar'); };

/* ===== 06 요리 모드 ===== */
SCR.C2 = { cls:'white', render:p=>{ const r=R(p.id); const prep=r.prep||[['재료 꺼내 두기','필요한 재료를 한곳에 모아요'],['칼 · 도마 · 팬 꺼내기',''],['밥 데우기','전자레인지 2분']];
  return `<div class="bar" style="background:#fff">${HK.backBtn(false,'close')}<span></span></div><div class="scroll" style="padding-bottom:120px"><div class="top"></div><div class="pad">
  <div class="cap">READY · 요리 전 준비</div><div class="h1 mt4">먼저 재료를\n꺼내 둘까요?</div><div class="s mt8">꺼내 두면 요리하다 멈추지 않아요</div>
  <div class="mt16" id="prep">${prep.map(([t,s,a],i)=>`<div class="lrow tap" data-act="prepT"><span class="check ${i===0?'on':''}">${ic('check')}</span><div class="f1"><div class="sb7">${t}</div>${s?`<div class="xs" ${a==='thaw'?'style="color:var(--or);font-weight:700" data-go="G1"':''}>${s}</div>`:''}</div></div>`).join('')}</div>
  <div class="row sp mt16"><span class="xs" id="prepN" style="font-weight:700;color:var(--g)">1 / ${prep.length} 준비됨</span>${HK.chick('knife',110,'bob')}</div></div></div>
  <div class="bot">${HK.btn('준비 끝, 시작하기',`data-go="CS?id=${r.id}&s=0" data-mode="replace"`)}</div>`; } };
HK.ACT.prepT = (t,e)=>{ if(e.target.closest('[data-go]')) return; t.querySelector('.check').classList.toggle('on'); const all=document.querySelectorAll('#prep .check'); const on=document.querySelectorAll('#prep .check.on'); HK.$('#prepN').textContent=`${on.length} / ${all.length} 준비됨`; };

/* 단계 화면 (공통) */
SCR.CS = { cls:'white', render:p=>{ const r=R(p.id), i=+p.s||0, st=r.steps[i], n=r.steps.length;
  const last = !!st.last; const bg = last?'var(--g)':'#fff', fg = last?'#fff':'var(--tx)';
  return `<div style="position:absolute;inset:0;background:${bg};color:${fg};transition:background .3s"></div>
  <div class="bar"><button class="ib ${last?'dark':''}" data-act="quitCook">${ic('close')}</button><div class="steps-bar" style="width:260px;margin-bottom:20px">${r.steps.map((_,k)=>`<i class="${k<=i?'on':''}" style="${last?'background:'+(k<=i?'var(--lime)':'rgba(255,255,255,.2)'):''}"></i>`).join('')}</div></div>
  <div class="scroll" style="color:${fg}" data-act="${st.timer?'':'tapNext'}"><div class="top"></div><div class="pad">
  <div class="cap ${last?'lime':''}">STEP ${i+1} / ${n}${last?' · LAST':''}</div>
  <div class="h1 mt8">${st.t.replace(/(\S+)(과|를|을)/, `<span style="color:${last?'var(--lime)':'var(--g)'}">$1</span>$2`)}</div>
  <div class="b mt12 pre" style="color:${last?'var(--lime2)':'var(--tx2)'}">${st.d}</div>
  ${st.amt?`<span class="pill ${last?'lime':'soft'} mt16" style="height:32px;padding:0 12px">${ic('tag',14)} ${st.amt}</span>`:''}
  ${st.timer?`<div class="card ln mt24" style="padding:24px;text-align:center;background:#F7F9F7"><div class="timer" id="tm">${fmt(st.timer)}</div><div class="progress mt16"><i id="tmBar" style="width:0%"></i></div>
     <div class="row g8 mt16"><button class="btn or" style="flex:1" data-act="timerGo" data-sec="${st.timer}" id="tmBtn">${ic('play',18)}<span style="margin-left:6px">타이머 시작</span></button></div><div class="xs mt12">내 속도대로 해도 괜찮아요</div></div>`:''}
  ${st.img?`<div class="ph mt24" style="height:250px;background-image:url(${st.img})"></div>`:''}
  ${!st.timer&&!last?`<div class="xs" style="text-align:center;margin-top:20px">화면 아무 곳이나 톡 누르면 다음 단계</div>`:''}
  </div></div>
  <div style="position:absolute;right:${st.img?6:24}px;bottom:${last?110:104}px;z-index:15">${HK.chick(st.chick||'cook',st.img?110:120,last?'hop':'bob')}</div>
  <div class="bot row g8">${i>0?`<button class="btn s" style="width:100px;flex:none;${last?'background:transparent;color:#fff;border-color:rgba(255,255,255,.3)':''}" data-act="stepPrev">이전</button>`:''}
   ${last?HK.btn('완성했어요!','data-act="finish"','l'):HK.btn('다음 단계','data-act="stepNext"','p')}</div>`; },
  unmount:()=>{ clearInterval(HK._tm); } };
function fmt(s){ return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }
HK.ACT.tapNext = (t,e)=>{ if(e.target.closest('button,.chick,[data-go]')) return; HK.ACT.stepNext(); };
HK.ACT.stepNext = ()=>{ const c=HK.cur(); const r=R(c.params.id); const i=+c.params.s; if(i<r.steps.length-1) HK.go('CS',{id:r.id,s:i+1},'push'); };
HK.ACT.stepPrev = ()=>HK.back();
HK.ACT.quitCook = ()=>HK.modal(`${HK.chick('curious',90,'sway','margin:-70px 0 0')}<div class="h2 mt8">요리를 그만할까요?</div><div class="s mt8">지금까지 한 단계는 기억해 둘게요</div><div class="mt16">${HK.btn('계속 요리하기','data-close')}</div><button class="link" data-act="quitYes">그만하기</button>`);
HK.ACT.quitYes = ()=>{ HK.closeOverlay(); clearInterval(HK._tm); setTimeout(()=>HK.go('home',{},'root'),200); };
HK.ACT.timerGo = t=>{
  const total=+t.dataset.sec; const demo=Math.min(total,8); // 체험 버전: 실제 시간 대신 빠르게
  if(t.dataset.run==='1'){ clearInterval(HK._tm); t.dataset.run='0'; t.innerHTML=ic('play',18)+'<span style="margin-left:6px">이어서</span>'; return; }
  t.dataset.run='1'; t.innerHTML=ic('pause',18)+'<span style="margin-left:6px">잠깐 멈추기</span>';
  let left = +(t.dataset.left||total); const step = total/demo/10;
  clearInterval(HK._tm);
  HK._tm = setInterval(()=>{ left=Math.max(0,left-step); t.dataset.left=left; const tm=HK.$('#tm'), bar=HK.$('#tmBar'); if(!tm){clearInterval(HK._tm);return;}
    tm.textContent=fmt(Math.ceil(left)); bar.style.width=((1-left/total)*100)+'%';
    if(left<=0){ clearInterval(HK._tm); t.dataset.run='0'; t.dataset.left=total; t.innerHTML=ic('refresh',18)+'<span style="margin-left:6px">다시</span>';
      HK.modal(`<div style="text-align:center">${HK.chick('taste',110,'hop','margin:-80px auto 0')}<div class="cap or mt8">TIME!</div><div class="h2 mt4">${fmt(total)} 끝났어요</div><div class="s mt8">색이 하얗게 바뀌었나요?\n살짝 맛보고 다음으로 가요</div><div class="mt16">${HK.btn('다음 단계','data-act="tmNext"')}</div><button class="link" data-close>조금 더 할게요</button></div>`);
      if(navigator.vibrate) navigator.vibrate(200); }
  },100);
};
HK.ACT.tmNext = ()=>{ HK.closeOverlay(); setTimeout(HK.ACT.stepNext,250); };
HK.ACT.finish = ()=>{ const c=HK.cur(); const r=R(c.params.id); const code=r.code; const first=!S.stamps[code]||r.id!=='pakkapao';
  S.cooked++; if(!S.stamps[code]) S.stamps[code]='04 NOV 26'; HK.save();
  HK.modal(`<div style="text-align:center"><div class="cap or">STAMP</div><div class="h2 mt4">${HK.kit(code).name} 도장 쾅!</div>
    <div style="height:150px;display:grid;place-items:center;margin-top:8px">${HK.stamp(code,{size:120,anim:true,date:S.stamps[code]})}</div>
    <div class="row g8" style="justify-content:center">${HK.chick('stamp',90,'hop')}<div class="s" style="text-align:left">요리 여권에\n도장을 찍었어요</div></div>
    <div class="mt16">${HK.btn('완성 사진 보기',`data-act="toDone" data-id="${r.id}"`)}</div></div>`);
};
HK.ACT.toDone = t=>{ HK.closeOverlay(); setTimeout(()=>HK.go('C7',{id:t.dataset.id},'fade'),200); };

SCR.C7 = { render:p=>{ const r=R(p.id); const k=HK.kit(r.code);
  return `<div class="bar">${HK.backBtn(true,'close')}<span></span></div><div class="scroll" style="padding-bottom:110px">${HK.photo(r.img,360,0)}
  <div style="position:absolute;left:24px;top:236px">${HK.chick('photo',112,'bob')}</div>
  <div style="position:absolute;right:28px;top:300px">${HK.stamp(r.code,{size:96,date:S.stamps[r.code]||'04 NOV 26',anim:true})}</div>
  <div class="pad mt24"><div class="cap">COMPLETE</div><div class="h1 mt4">${r.title} 완성!</div><div class="s">세라의 ${S.cooked}번째 요리 여행이에요</div>
  <div class="row g8 mt16">${[['18분','걸렸어요'],[r.fridge?'냉털':'1 / 3',r.fridge?'남은 재료로':k.name+' 레시피'],['5인분 중 2','키트 사용']].map(([a,b])=>`<div class="card f1" style="padding:12px 14px"><div class="bb">${a}</div><div class="xs">${b}</div></div>`).join('')}</div>
  <div class="card mt16" style="padding:4px 18px"><div class="lrow tap" data-tab="fridge"><span style="color:var(--g)">${ic('fridge')}</span><div class="f1"><div class="sb7">남은 재료로 냉털 레시피 보기</div><div class="xs">양배추 · 대파가 남았어요</div></div>${ic('next',16)}</div>
  <div class="lrow tap" data-act="soon"><span style="color:var(--g)">${ic('bookmark')}</span><div class="f1"><div class="sb7">다음 레시피: 똠얌꿍</div><div class="xs">같은 키트로 바로 만들 수 있어요</div></div>${ic('next',16)}</div></div></div></div>
  <div class="bot">${HK.btn('피드에 올리기',`data-go="E2A?id=${r.id}"`)}</div>`; } };

SCR.G1 = { render:()=>`<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll"><div class="top"></div><div class="pad">
  <div class="cap or">BEGINNER GUIDE</div><div class="h1 mt4">얼어 있는 고기,\n이렇게 녹여요</div><div class="s mt8">키트 가이드북에도 같은 내용이 들어 있어요</div>
  ${[['냉장 해동','요리 전날 밤 냉장실로 옮겨 두기','8–12시간 · 가장 안전해요'],['찬물 해동','지퍼백에 담아 찬물에 담그기','30분–1시간 · 물은 30분마다 갈기'],['전자레인지','해동 모드로 조금씩 나눠 돌리기','3–5분 · 바로 요리하기']].map(([a,b,c],i)=>`<div class="card mt12 row g12" style="padding:16px 18px;align-items:flex-start"><span class="pill" style="width:26px;justify-content:center;padding:0">${i+1}</span><div><div class="sb7">${a}</div><div class="s">${b}</div><div class="xs" style="color:var(--g);font-weight:700">${c}</div></div></div>`).join('')}
  <div class="note mt16"><b>하지 마세요</b> · 실온에 오래 두거나, 녹인 고기를 다시 얼리기</div>
  <div class="row mt16" style="justify-content:flex-end">${HK.chick('recipe',100,'bob')}</div>
  <div class="mt16">${HK.btn('요리로 돌아가기','data-back','o',false)}</div><div style="height:40px"></div></div></div>` };

/* ===== 07 냉털 (체험 버전: 4가지 레시피만) ===== */
SCR.fridge = { tab:'fridge', render:()=>{ const sel=S.fridge;
  return `<div class="scroll" style="padding-bottom:180px"><div class="top-s"></div><div class="pad">
  <div class="cap mt16">FRIDGE</div><div class="h1 mt4">냉장고에 뭐가 남았나요?</div>
  <div class="row g8 mt16"><input class="field f1" id="fIn" placeholder="재료 직접 입력 (예: 참치캔)" enterkeyhint="done"><button class="ib" style="width:52px;height:52px;border-radius:12px;background:var(--g);color:var(--lime);border:0" data-act="fAdd">${ic('plus')}</button></div>
  <div class="note mt12">${ic('info',14,'style="vertical-align:-3px;width:14px;height:14px"')} 체험 버전이에요. <b>${HK.FRIDGE_ALLOWED.join(' · ')}</b>로 4가지 레시피를 찾을 수 있어요.</div>
  ${HK.FRIDGE_CATS.map(([c,list])=>`<div class="sb7 mt24">${c}</div><div class="chips mt8">${list.map(x=>{const ok=HK.FRIDGE_ALLOWED.includes(x), on=sel.includes(x);return `<button class="chip ${on?'on':''} ${ok?'':'lock'}" data-act="fT" data-x="${x}">${on?ic('check',14):''}${x}</button>`;}).join('')}</div>`).join('')}
  ${sel.filter(x=>!HK.FRIDGE_CATS.some(([,l])=>l.includes(x))).length?`<div class="sb7 mt24">직접 입력</div><div class="chips mt8">${sel.filter(x=>!HK.FRIDGE_CATS.some(([,l])=>l.includes(x))).map(x=>`<button class="chip on" data-act="fT" data-x="${x}">${ic('check',14)}${x}</button>`).join('')}</div>`:''}
  <div class="row mt16" style="justify-content:flex-end">${HK.chick('fridge',96,'peek')}</div></div></div>
  <div class="bot" style="bottom:100px">${HK.btn('이걸로 요리 찾기 · '+sel.length+'개 선택','data-act="fFind" '+(sel.length?'':'disabled'))}</div>`; } };
HK.ACT.fT = t=>{ const x=t.dataset.x; if(!HK.FRIDGE_ALLOWED.includes(x)){ HK.toast('체험 버전에서는 고를 수 없는 재료예요','info',1800); return; } S.fridge = S.fridge.includes(x)?S.fridge.filter(y=>y!==x):[...S.fridge,x]; HK.save(); HK.rerender(); };
HK.ACT.fAdd = ()=>{ const v=(HK.$('#fIn').value||'').trim().replace(/\s/g,''); if(!v) return;
  const hit = HK.FRIDGE_ALLOWED.find(a=>a.replace(/\s/g,'')===v || (v.length>=2 && a.includes(v)));
  if(!hit){ HK.toast(`'${v}'는 체험 버전에서 찾을 수 없어요`,'info',2000); return; }
  if(!S.fridge.includes(hit)) S.fridge.push(hit); HK.save(); HK.rerender(); };
HK.ACT.fFind = ()=>HK.go('D2');
document.addEventListener('keydown',e=>{ if(e.key!=='Enter') return; if(e.target.id==='fIn') HK.ACT.fAdd(); else if(e.target.id==='mIn') HK.ACT.memoNewOk(); else if(e.target.id==='cIn'){ const b=document.querySelector('[data-act="cSend"]'); if(b) HK.ACT.cSend(b); } });

SCR.D2 = { render:()=>{ const sel=S.fridge;
  const res = HK.FRIDGE_RECIPES.map(id=>{const r=HK.RECIPES[id]; const have=r.need.filter(n=>sel.includes(n)); return {r,have,miss:r.need.filter(n=>!sel.includes(n))};}).filter(x=>x.have.length).sort((a,b)=>a.miss.length-b.miss.length||b.have.length-a.have.length);
  if(!res.length) return `<div class="bar bg">${HK.backBtn()}<span></span></div><div class="pad" style="padding-top:180px;text-align:center">${HK.chick('curious',130,'sway','margin:0 auto')}<div class="h2 mt16">이 재료로는 아직 못 찾았어요</div><div class="s mt8">양배추 · 대파 · 달걀 · 참치캔 중에서 골라 보세요</div><div class="mt24">${HK.btn('재료 다시 고르기','data-back','o',false)}</div></div>`;
  const best=res[0], rest=res.slice(1);
  return `<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll" style="padding-bottom:120px"><div class="top"></div><div class="pad">
  <div class="cap">${sel.join(' · ')}</div><div class="h1 mt4">이걸로 만들 수 있어요</div>
  <div class="ticket g mt16 tap" data-go="C1?id=${best.r.id}" style="padding:20px"><div class="row g16" style="gap:16px">${HK.photo(best.r.img,96,16,'width:96px;flex:none')}<div><div class="cap lime">${best.miss.length?'거의 다 있어요':'BEST MATCH'}</div><div class="h2 mt4">${best.r.title}</div><div class="xs" style="color:var(--lime2)">${best.r.time} · ${best.r.level}</div><span class="pill lime mt8">있는 재료 ${best.have.length} / ${best.r.need.length}</span></div></div>
   <div class="perf" style="top:150px"></div><div class="notch" style="left:-12px;top:138px"></div><div class="notch" style="right:-12px;top:138px"></div><div class="sb7" style="margin-top:44px">${best.miss.length?best.miss.join(' · ')+'만 있으면 바로 만들 수 있어요':'냉장고 재료만으로 바로 만들 수 있어요'}</div></div>
  ${rest.length?`<div class="row sp mt24" style="align-items:flex-end"><div class="h2" style="padding-bottom:6px">하나만 더 있으면 돼요</div>${HK.chick('basket',80,'bob')}</div>`:`<div class="row mt16" style="justify-content:flex-end">${HK.chick('basket',90,'bob')}</div>`}
  ${rest.map(x=>`<div class="card mt12 row g12 tap" data-go="C1?id=${x.r.id}" style="padding:14px 16px">${HK.photo(x.r.img,48,12,'width:48px;flex:none')}<div class="f1"><div class="sb7">${x.r.title}</div><div class="xs" style="color:${x.miss.length?'var(--or)':'var(--g)'};font-weight:700">${x.miss.length?x.miss.join(' · ')+'만 있으면 돼요':'바로 만들 수 있어요'}</div></div>${x.miss.length?`<button class="chip" style="height:32px;font-size:12px;font-weight:700" data-act="memoMiss" data-m="${x.miss.join(',')}" data-f="${x.r.title}">${ic('plus',12)}메모</button>`:''}</div>`).join('')}
  </div></div>`; } };
HK.ACT.memoMiss = (t,e)=>{ e.stopPropagation(); t.dataset.m.split(',').forEach(m=>S.memo.push({id:'m'+Date.now()+m,t:m,from:'냉털 · '+t.dataset.f,done:false})); HK.save(); t.outerHTML=`<span class="pill soft">${ic('check',12)}담음</span>`; HK.toast('장보기 메모에 담았어요','calendar'); };

/* ===== 08 피드 ===== */
const allPosts = () => [...S.myPosts, ...HK.POSTS];
SCR.feed = { tab:'feed', render:p=>{ const cat=p.cat||'전체', sort=p.sort||'인기순';
  let list = allPosts().filter(x=>cat==='전체'||x.cat===cat||(cat==='레시피만'&&x.recipe));
  if(sort==='최신순') list=list; else if(sort==='좋아요순'||sort==='인기순') list=[...list].sort((a,b)=>b.likes-a.likes+(sort==='인기순'?b.cmt-a.cmt:0));
  return `<div class="bar bg" style="height:168px;flex-direction:column;align-items:stretch;justify-content:flex-end;padding:0 24px 8px"><div class="row sp"><div class="h1">요리 피드</div><button class="ib" data-go="S1">${ic('search')}</button></div>
   <div class="row g8 mt12"><button class="chip" data-act="sortSheet">${ic('sort',14)}${sort}</button><div class="hscroll f1" style="margin-right:-24px">${['전체','베이킹','냉털','10분 간단','도시락','레시피만'].map(c=>`<button class="chip ${c===cat?'on':''}" data-act="feedCat" data-c="${c}">${c}</button>`).join('')}</div></div></div>
  <div class="scroll" style="padding-bottom:120px"><div style="height:184px"></div><div class="pad"><div class="mason">${list.map(x=>{const pp=HK.PEOPLE[x.who]||{};return `<div class="card tap fade-up" data-go="E1D?id=${x.id}" style="overflow:hidden">${HK.photo(x.img,x.h,0)}
    <div style="position:absolute;left:10px;top:10px" class="row g4">${x.recipe?'<span class="pill">레시피</span>':''}</div><span class="pill soft" style="position:absolute;right:10px;top:10px;background:#fff">${x.code}</span>
    <div style="padding:10px 12px 12px"><div class="sb7 ellip">${x.title}</div><div class="row g4 mt4">${HK.avatar(x.who,18)}<span class="xs ellip">${pp.name}</span></div>
    <div class="row g8 mt8 xs"><span class="row g4" style="color:${S.liked.includes(x.id)?'var(--or)':''}">${ic('heart',12)}${x.likes+(S.liked.includes(x.id)?1:0)}</span><span class="row g4">${ic('comment',12)}${x.cmt+((S.comments[x.id]||[]).length)}</span></div></div></div>`;}).join('')}</div></div></div>
  <button class="fab" data-act="upload">${ic('plus',18)}올리기</button>`; } };
HK.ACT.feedCat = t=>{ const c=HK.cur(); c.params.cat=t.dataset.c; HK.rerender(); };
HK.ACT.sortSheet = ()=>HK.sheet(`<div class="h2">정렬</div>${['인기순','좋아요순','최신순'].map(s=>`<div class="lrow tap" data-act="sortSet" data-s="${s}"><span class="sb7 f1">${s}</span>${(HK.cur().params.sort||'인기순')===s?`<span style="color:var(--g)">${ic('check')}</span>`:''}</div>`).join('')}`);
HK.ACT.sortSet = t=>{ HK.closeOverlay(); const c=HK.cur(); c.params.sort=t.dataset.s; setTimeout(HK.rerender,200); };
HK.ACT.upload = ()=>HK.sheet(`<div class="h2">무엇을 올릴까요?</div>
  <div class="card ln mt16 row g12 tap" style="padding:16px" data-act="upGo" data-to="E2A"><div class="ico">${ic('camera')}</div><div class="f1"><div class="sb7">오늘 만든 요리</div><div class="xs">사진과 글로 가볍게 기록해요</div></div>${ic('next',16)}</div>
  <div class="card ln mt8 row g12 tap" style="padding:16px" data-act="upGo" data-to="E2B"><div class="ico">${ic('edit')}</div><div class="f1"><div class="sb7">레시피 만들기</div><div class="xs">단계별로 자세히 나눠요 · 사진 권장</div></div>${ic('next',16)}</div>
  <div class="xs mt16" style="text-align:center">오늘 만든 요리에도 나중에 레시피를 붙일 수 있어요</div>`);
HK.ACT.upGo = t=>{ HK.closeOverlay(); setTimeout(()=>HK.go(t.dataset.to),200); };

SCR.E1D = { render:p=>{ const x=allPosts().find(y=>y.id===p.id)||HK.POSTS[0]; const pp=HK.PEOPLE[x.who]||{}; const liked=S.liked.includes(x.id); const cm=[...(x.who==='minji'?[['sera','이거 어떻게 만들었어요? 레시피 공유해 주세요!'],['minji','바질 대신 깻잎 넣어도 맛있어요']]:[]),...(S.comments[x.id]||[]).map(c=>['sera',c])];
  return `<div class="bar bg">${HK.backBtn()}<button class="ib" data-act="more">${ic('more')}</button></div><div class="scroll" style="padding-bottom:100px"><div class="top"></div><div class="pad">
  <div class="row g12">${HK.avatar(x.who,44)}<div class="f1 tap" ${x.who==='minji'?'data-go="CP"':''}><div class="sb7">${pp.name}</div><div class="xs">${pp.lv}</div></div>${x.who!=='sera'?`<button class="chip ${S.follows.includes(x.who)?'on':''}" data-act="follow" data-w="${x.who}" style="height:34px">${S.follows.includes(x.who)?ic('check',14)+'동행 중':ic('plus',14)+'동행하기'}</button>`:''}</div>
  <div class="mt16">${HK.photo(x.img,300)}</div>
  <div class="h2 mt16">${x.title}</div><div class="b mt8 pre">${x.body}</div><div class="row g8 wrap mt8">${(x.tags||[]).map(t=>`<span class="xs" style="color:var(--g);font-weight:700">${t}</span>`).join('')}</div>
  ${x.rid?`<div class="card ln mt16 row g12 tap" style="padding:14px 16px" data-go="C1?id=${x.rid}"><div class="ico">${ic('bookmark')}</div><div class="f1 sb7">${pp.name.replace('요리하는 ','')}의 레시피 보기 · ${R(x.rid).steps.length}단계</div>${ic('next',16)}</div>`:''}
  <div class="row g16 mt16" style="gap:20px"><button class="row g4 sb7" data-act="like" data-id="${x.id}" style="color:${liked?'var(--or)':''}">${ic('heart',22,liked?'style="fill:var(--or)"':'')}${x.likes+(liked?1:0)}</button><span class="row g4 sb7">${ic('comment',22)}${cm.length||x.cmt}</span><button class="row g4 sb7" data-act="share">${ic('share',22)}공유</button></div>
  <div class="div mt16"></div><div class="h2 mt16">댓글</div>
  ${cm.map(([w,c])=>`<div class="row g12 mt12" style="align-items:flex-start">${HK.avatar(w,32)}<div class="f1"><div class="sb7">${HK.PEOPLE[w].name}</div><div class="s" style="color:var(--tx)">${c}</div></div></div>`).join('')||'<div class="xs mt8">첫 댓글을 남겨 보세요</div>'}
  <div class="row g8 mt16 wrap">${['레시피 공유해 주세요!','맛있어 보여요','저도 해 볼게요'].map(q=>`<button class="chip" style="height:32px;font-size:12px" data-act="qc" data-q="${q}" data-id="${x.id}">${q}</button>`).join('')}</div></div></div>
  <div class="bot dock row g8"><input class="field f1" id="cIn" placeholder="댓글 달기..."><button class="ib" style="background:var(--g);color:var(--lime);border:0" data-act="cSend" data-id="${x.id}">${ic('arrow')}</button></div>`; } };
HK.ACT.like = t=>{ const id=t.dataset.id; S.liked = S.liked.includes(id)?S.liked.filter(x=>x!==id):[...S.liked,id]; HK.save(); HK.rerender(); };
HK.ACT.follow = t=>{ const w=t.dataset.w; const on=S.follows.includes(w); if(on){ HK.modal(`<div class="h2">${HK.PEOPLE[w].name}와\n동행을 끝낼까요?</div><div class="s mt8">새 요리 알림이 더 이상 오지 않아요</div><div class="mt16">${HK.btn('동행 계속하기','data-close')}</div><button class="link" data-act="unfollow" data-w="${w}">동행 끝내기</button>`); return; } S.follows.push(w); HK.save(); HK.rerender(); HK.toast('동행을 시작했어요','users'); };
HK.ACT.unfollow = t=>{ S.follows=S.follows.filter(x=>x!==t.dataset.w); HK.save(); HK.closeOverlay(); setTimeout(HK.rerender,200); };
HK.ACT.qc = t=>{ (S.comments[t.dataset.id]=S.comments[t.dataset.id]||[]).push(t.dataset.q); HK.save(); HK.rerender(); };
HK.ACT.cSend = t=>{ const v=HK.$('#cIn').value.trim(); if(!v) return; (S.comments[t.dataset.id]=S.comments[t.dataset.id]||[]).push(v); HK.save(); HK.rerender(); };
HK.ACT.more = ()=>HK.sheet(`${[['bookmark','저장하기'],['share','공유하기'],['info','신고하기']].map(([i,l])=>`<div class="lrow tap" data-act="copied"><span>${ic(i)}</span><span class="sb7">${l}</span></div>`).join('')}`);

SCR.E2A = { render:p=>{ const r=p.id?R(p.id):null;
  return `<div class="bar bg">${HK.backBtn(false,'close')}<span class="sb7" style="margin-bottom:14px">오늘 만든 요리</span><span style="width:44px"></span></div><div class="scroll" style="padding-bottom:110px"><div class="top"></div><div class="pad">
  <div class="row g8">${r?`<div class="ph r12" style="width:96px;height:96px;flex:none;background-image:url(${r.img})"></div>`:''}<button class="card ln" style="width:96px;height:96px;display:grid;place-items:center;color:var(--tx2)" data-act="addPhoto"><div>${ic('camera',22)}<div class="xs">${r?'1':'0'} / 10</div></div></button></div>
  <div class="sb7 mt24">제목</div><input class="field mt8" id="pT" value="${r?r.title+' 첫 도전 성공!':''}" placeholder="무엇을 만들었나요?">
  <div class="sb7 mt16">내용</div><textarea class="field mt8" id="pB" placeholder="만들면서 느낀 점을 남겨요">${r?'키트 소스 덕분에 처음 해 봤는데\n생각보다 쉬웠어요!':''}</textarea>
  <div class="sb7 mt16">나라 · 카테고리</div><div class="chips mt8"><span class="chip on">${ic('check',14)}${r?r.code:'BKK'}</span>${['10분 간단','냉털','도시락','베이킹'].map((c,i)=>`<button class="chip ${i===0?'on':''}" data-act="tgl">${c}</button>`).join('')}</div>
  <div class="sb7 mt16">태그</div><div class="chips mt8"><span class="chip on">#${r?r.title.replace(/\s/g,''):'첫요리'}</span>${['#자취요리','#15분','#키트요리'].map(c=>`<button class="chip" data-act="tgl">${c}</button>`).join('')}</div>
  <div class="row g12 mt16">${HK.chick('photo',90,'bob')}<span class="xs">사진은 없어도 올릴 수 있어요</span></div></div></div>
  <div class="bot">${HK.btn('피드에 올리기',`data-act="postIt" data-id="${r?r.id:''}"`)}</div>`; } };
HK.ACT.tgl = t=>t.classList.toggle('on');
HK.ACT.addPhoto = ()=>HK.toast('체험 버전에서는 사진을 고를 수 없어요','image');
HK.ACT.postIt = t=>{ const r=t.dataset.id?R(t.dataset.id):null; S.myPosts.unshift({id:'my'+Date.now(),who:'sera',title:HK.$('#pT').value||'오늘 만든 요리',body:HK.$('#pB').value,code:r?r.code:'BKK',img:r?r.img:'',h:150,likes:0,cmt:0,cat:'10분 간단',tags:['#첫요리'],rid:r?r.id:null}); HK.save(); HK.go('feed',{sort:'최신순'},'fade'); setTimeout(()=>HK.toast('피드에 올렸어요','check'),350); };

SCR.E2B = { render:()=>`<div class="bar bg">${HK.backBtn(false,'close')}<span class="sb7" style="margin-bottom:14px">레시피 만들기</span><span style="width:44px"></span></div><div class="scroll" style="padding-bottom:110px"><div class="top"></div><div class="pad">
  <div class="sb7">레시피 이름</div><input class="field mt8" value="팟카파오 무 (키트 버전)">
  <div class="sb7 mt16">재료</div><input class="field mt8" value="돼지고기 200g · 마늘 3쪽 · 피시소스 1큰술">
  <div class="sb7 mt24">단계</div>
  ${[['팬에 기름을 두르고\n마늘과 고추를 볶아요','assets/img/step-garlic.jpg'],['고기를 넣고 3분 볶아요',''],['바질을 넣고 불을 꺼요','assets/img/step-basil.jpg']].map(([s,img],i)=>`<div class="card ln mt8 row g12" style="padding:12px;align-items:flex-start"><span class="pill" style="width:26px;justify-content:center;padding:0">${i+1}</span><div class="f1 s pre" style="color:var(--tx)">${s}</div>${img?`<div class="ph r12" style="width:72px;height:72px;flex:none;background-image:url(${img})"></div>`:`<button class="card ln" style="width:72px;height:72px;display:grid;place-items:center;color:var(--tx3)">${ic('camera')}</button>`}</div>`).join('')}
  <button class="card ln mt8" style="width:100%;height:52px;border-style:dashed;color:var(--g);font-weight:700">${ic('plus',16)} 단계 추가</button></div></div>
  <div class="bot">${HK.btn('레시피 올리기','data-act="recipeUp"')}</div>` };
HK.ACT.recipeUp = ()=>HK.modal(`${HK.chick('curious',90,'sway','margin:-70px 0 0')}<div class="h2 mt8">2단계에 사진이 없어요</div><div class="s mt8">사진이 있으면 따라 하기 쉬워요.\n그래도 글만으로 올릴 수 있어요.</div><div class="mt16">${HK.btn('사진 추가하기','data-close')}</div><button class="link" data-act="recipeUpYes">글만으로 올리기</button>`);
HK.ACT.recipeUpYes = ()=>{ HK.closeOverlay(); setTimeout(()=>{ HK.go('feed',{},'fade'); setTimeout(()=>HK.toast('레시피를 올렸어요','check'),350); },200); };

SCR.S1 = { render:()=>`<div class="bar bg">${HK.backBtn()}<input class="field f1" style="margin:0 0 0 12px;height:44px;padding:0 16px;border-radius:999px" placeholder="요리, 재료, 나라 검색" id="sIn"></div><div class="scroll"><div class="top"></div><div class="pad">
  <div class="sb7">최근 검색</div><div class="chips mt8">${['팟카파오','마들렌','냉털'].map(s=>`<span class="chip">${s}</span>`).join('')}</div>
  <div class="sb7 mt24">지금 많이 찾는</div>${[['p3','오븐 없이 마들렌','빵순이 · 레시피 · PAR','assets/img/madeleine-lemon.jpg'],['p4','10분 규동','자취 3년 차 · TYO','assets/img/gyudon.jpg'],['p6','버터치킨 첫 도전','향신료 덕후 · DEL','assets/img/butter-chicken.jpg']].map(([id,t,s2,im],i)=>`<div class="lrow tap" data-go="E1D?id=${id}"><span class="sb7" style="width:14px;color:var(--g)">${i+1}</span>${HK.photo(im,48,12,'width:48px;flex:none')}<div class="f1"><div class="sb7">${t}</div><div class="xs">${s2}</div></div></div>`).join('')}
  <div class="lrow tap" data-go="K2?code=PAR"><span class="sb7" style="width:14px;color:var(--g)">4</span>${HK.photo('assets/img/madeleine.jpg',48,12,'width:48px;flex:none')}<div class="f1"><div class="sb7">프랑스 키트 · 마들렌</div><div class="xs">키트 레시피 · 16,900원</div></div></div>
  <div class="sb7 mt24">추천 레시피</div>${['pakkapao','cabbagetuna','okonomiyaki','eggrice','kimchistew'].map(id=>{const r=R(id);return `<div class="lrow tap" data-go="C1?id=${id}">${HK.photo(r.img,48,12,'width:48px;flex:none')}<div class="f1"><div class="sb7">${r.title}</div><div class="xs">${r.sub}</div></div></div>`;}).join('')}</div></div>` };

/* ===== 09 나의 주방 ===== */
SCR.kitchen = { tab:'kitchen', render:()=>{ const memoN=S.memo.filter(m=>!m.done).length;
  return `<div class="scroll" style="padding-bottom:120px"><div class="top-s"></div><div class="pad"><div class="row sp mt16"><div><div class="cap">MY KITCHEN</div><div class="h1 mt4">나의 주방</div></div><button class="ib" data-go="SET">${ic('settings')}</button></div>
  <div class="card g mt16" style="padding:20px"><div class="row g16" style="gap:16px">${HK.avatar('sera',64)}<div><div class="h2">이세라</div><span class="pill lime mt4">LV.1 요리 병아리</span></div></div>
   <div class="row mt16" style="justify-content:space-between">${[['요리',S.cooked+'번'],['도장',Object.keys(S.stamps).length+' / 9'],['동행',S.follows.length+'명']].map(([a,b])=>`<div><div class="xs" style="color:var(--lime2)">${a}</div><div class="bb">${b}</div></div>`).join('')}</div></div>
  <div class="row sp mt24"><div class="h2">진행 중인 키트</div><span class="xs">옆으로 넘겨 보세요</span></div>
  <div class="hscroll mt12">${[['BKK','태국','레시피 1 / 3','리필 필요','or','K2?code=BKK'],['TYO','일본','배송 중 · 11/5 도착','배송 중','','K7'],['SEL','한국 · 장','레시피 0 / 3','시작 전','soft','K2?code=SEL']].map(([c,n,s,b,cl,g])=>`<div class="card tap" style="width:200px;flex:none;padding:16px" data-go="${g}"><div class="row sp"><span style="color:var(--g)">${HK.lm(c,28)}</span><span class="pill ${cl}" ${cl==='soft'?'style="background:#F0F2F0;color:var(--tx2)"':''}>${b}</span></div><div class="cap mt12">${c}</div><div class="sb7">${n}</div><div class="xs">${s}</div></div>`).join('')}</div>
  <div class="card mt24" style="padding:4px 18px">${[['calendar','장보기 메모',`${memoN}개 · 11.6 (금)`,'E4'],['bookmark','저장한 레시피',S.saved.length+'개','E5'],['camera','내가 올린 요리',(S.myPosts.length+1)+'개','E6'],['users','동행 셰프',S.follows.length+'명 · 새 글 2','E7'],['card','주문 내역 · 쿠폰','쿠폰 1장 · 리필 20%','K7']].map(([i,a,b,g])=>`<div class="lrow tap" data-go="${g}"><div class="ico">${ic(i)}</div><div class="f1"><div class="sb7">${a}</div><div class="xs">${b}</div></div>${ic('next',16)}</div>`).join('')}</div>
  <div class="row mt16" style="justify-content:flex-end">${HK.chick('cook',100,'bob')}</div></div></div>`; } };

SCR.E4 = { render:()=>{ const days=['일','월','화','수','목','금','토'];
  return `<div class="bar bg">${HK.backBtn()}<button class="ib" data-act="memoSet">${ic('calendar')}</button></div><div class="scroll" style="padding-bottom:40px"><div class="top"></div><div class="pad">
  <div class="row sp" style="align-items:flex-end"><div class="h1">장보기 메모</div><div style="margin-top:-30px">${HK.chick('basket',76,'bob')}</div></div>
  <div class="card mt8" style="padding:16px"><div class="row sp"><span class="bb">2026년 11월</span><span class="row g8" style="color:var(--g)">${ic('back',18)}${ic('next',18)}</span></div>
   <div class="cal mt12">${days.map((d,i)=>`<span class="hd ${i===0?'sun':''}">${d}</span>`).join('')}${Array.from({length:30},(_,i)=>{const d=i+1;const dow=(d-1)%7;return `<span class="${dow===0?'sun':''} ${d===4?'today':''} ${d===6?'mk':''} ${[13,20].includes(d)?'dotm':''}">${d}</span>`;}).join('')}</div></div>
  <div class="row sp mt24"><div class="h2">11월 6일 (금)</div><span class="pill">마트 가는 날 · 매주</span></div>
  <div class="card mt12" style="padding:4px 18px" id="memo">${S.memo.map(m=>`<div class="lrow tap" data-act="memoT" data-id="${m.id}"><span class="check ${m.done?'on':''}">${ic('check')}</span><div class="f1"><div class="sb7 ${m.done?'strike':''}">${m.t}</div><div class="xs">${m.from}</div></div></div>`).join('')}</div>
  <button class="card ln mt12" style="width:100%;height:52px;border-style:dashed;border-width:1.5px;color:var(--g);font-weight:700" data-act="memoNew">${ic('plus',16)} 재료 추가</button>
  <button class="link" data-act="memoClear" style="color:var(--tx2)">다 산 재료 지우기</button></div></div>`; } };
HK.ACT.memoT = t=>{ const m=S.memo.find(x=>x.id===t.dataset.id); m.done=!m.done; HK.save(); HK.rerender(); };
HK.ACT.memoNew = ()=>{ HK.sheet(`<div class="h2">재료 추가</div><div class="s mt4">살 재료와 양을 적어 주세요</div><input class="field mt16" id="mIn" placeholder="예: 양파 1개" enterkeyhint="done"><div class="mt16">${HK.btn('메모에 담기','data-act="memoNewOk"')}</div>`,{mount:el=>setTimeout(()=>{const i=el.querySelector('#mIn'); if(i) i.focus();},320)}); };
HK.ACT.memoNewOk = ()=>{ const i=HK.$('#mIn'); const v=i?i.value.trim():''; if(!v){ HK.toast('재료 이름을 적어 주세요','info'); return; } S.memo.push({id:'m'+Date.now(),t:v,from:'직접 입력',done:false}); HK.save(); HK.closeOverlay(); setTimeout(HK.rerender,250); };
HK.ACT.memoClear = ()=>{ S.memo=S.memo.filter(m=>!m.done); HK.save(); HK.rerender(); HK.toast('다 산 재료를 지웠어요','trash'); };
HK.ACT.memoSet = ()=>HK.sheet(`<div class="h2">장 보는 날</div><div class="s mt4">알림을 보내 드릴게요</div><div class="chips mt16">${['일','월','화','수','목','금','토'].map(d=>`<button class="chip ${d==='금'?'on':''}" data-act="tgl">${d}</button>`).join('')}</div><div class="row sp mt16"><span class="sb7">매주 반복</span><span class="pill">켜짐</span></div><div class="row sp mt12"><span class="sb7">알림 시간</span><span class="sb7" style="color:var(--g)">오전 10:00</span></div><div class="mt24">${HK.btn('저장하기','data-close')}</div>`);

SCR.E5 = { render:()=>`<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll"><div class="top"></div><div class="pad"><div class="h1">저장한 레시피</div>
  ${S.saved.length?S.saved.map((id,i)=>{const r=R(id);return `<div class="card row g12 tap" style="margin-top:${i?12:16}px;padding:12px 16px" data-go="C1?id=${id}">${HK.photo(r.img,60,12,'width:60px;flex:none')}<div class="f1"><div class="sb7">${r.title}</div><div class="xs">${r.time} · ${r.level}</div></div>${ic('next',16)}</div>`;}).join(''):`<div class="s mt16">아직 저장한 레시피가 없어요</div>`}</div></div>` };
SCR.E6 = { render:()=>`<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll"><div class="top"></div><div class="pad"><div class="h1">세라의 요리 일지</div>
  <div class="grid2 mt16">${[...S.myPosts,HK.POSTS[1]].map(x=>`<div class="card tap" style="overflow:hidden" data-go="E1D?id=${x.id}">${HK.photo(x.img,126,0)}<div style="padding:10px 12px"><div class="sb7 ellip">${x.title}</div><div class="xs">${x.code}</div></div></div>`).join('')}</div></div></div>` };
SCR.E7 = { render:()=>`<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll"><div class="top"></div><div class="pad"><div class="h1">동행 셰프</div><div class="s mt4">"동행"한 셰프의 새 요리와 레시피가 피드 맨 위에 떠요</div>
  ${['minji','bread','self3','fridgeking'].map(w=>{const pp=HK.PEOPLE[w];const on=S.follows.includes(w);return `<div class="card mt12 row g12" style="padding:14px 16px"><div class="tap" ${w==='minji'?'data-go="CP"':''}>${HK.avatar(w,48)}</div><div class="f1"><div class="sb7">${pp.name}</div><div class="xs">${pp.lv}</div></div><button class="chip ${on?'':'on'}" data-act="follow" data-w="${w}" style="height:34px">${on?ic('check',14)+'동행 중':ic('plus',14)+'동행하기'}</button></div>`;}).join('')}
  <div class="h2 mt32">이런 셰프는 어때요?</div>
  <div class="card g mt12 row g12" style="padding:16px">${HK.avatar('halmoni',52)}<div class="f1"><div class="sb7">방콕 할머니 손맛</div><div class="xs" style="color:var(--lime2)">세계 셰프 · #태국 #정통</div></div><button class="chip ${S.follows.includes('halmoni')?'':''}" style="height:34px;background:var(--lime);border:0;color:var(--g);font-weight:700" data-act="follow" data-w="halmoni">${S.follows.includes('halmoni')?ic('check',14)+'동행 중':ic('plus',14)+'동행하기'}</button></div>
  <div class="xs mt16">동행 = 구독. 여행을 함께 떠나는 사람이라는 뜻이에요</div></div></div>` };
SCR.CP = { render:()=>{ const pp=HK.PEOPLE.minji; const on=S.follows.includes('minji');
  return `<div class="bar bg">${HK.backBtn()}<button class="ib" data-act="more">${ic('more')}</button></div><div class="scroll"><div class="top"></div><div class="pad">
  <div class="card g" style="padding:20px"><div class="row g16" style="gap:16px">${HK.avatar('minji',64)}<div><div class="h2">${pp.name}</div><span class="pill lime mt4">LV.2 ${pp.lv}</span></div></div>
   <div class="row mt16" style="justify-content:space-between">${[['요리',pp.cook+'번'],['도장',pp.stamps+' / 9'],['동행',pp.follow+'명']].map(([a,b])=>`<div><div class="xs" style="color:var(--lime2)">${a}</div><div class="bb">${b}</div></div>`).join('')}</div></div>
  <button class="btn ${on?'s':'p'} mt12" style="justify-content:center" data-act="follow" data-w="minji">${on?ic('check',16)+' 동행 중':ic('plus',16)+' 동행하기'}</button>
  <div class="seg mt24"><button>요리 18</button><button class="on">레시피 13</button></div>
  ${[['pakkapao','BKK · 15분 · 4단계',128],['','BKK · 10분 · 3단계',96,'10분 똠얌 라면','assets/img/tomyum-ramen.jpg'],['','SEL · 10분 · 3단계',74,'간장 달걀밥 업그레이드','assets/img/soy-egg-rice.jpg']].map(([id,s,l,t,im])=>`<div class="card mt12 row g12 tap" style="padding:12px 16px" ${id?`data-go="C1?id=${id}"`:'data-act="soon"'}>${HK.photo(id?R(id).img:im,60,12,'width:60px;flex:none')}<div class="f1"><div class="sb7">${t||R(id).title}</div><div class="xs">${s}</div><div class="xs row g4" style="color:var(--or);font-weight:700">${ic('heart',12)}${l}</div></div></div>`).join('')}<div style="height:40px"></div></div></div>`; } };
SCR.SET = { render:()=>`<div class="bar bg">${HK.backBtn()}<span></span></div><div class="scroll"><div class="top"></div><div class="pad"><div class="h1">설정</div>
  <div class="card" style="margin-top:18px;padding:4px 18px">${['내 입맛 (맵기 · 빼는 재료)','배송지 관리','알림','결제 수단'].map(s=>`<div class="lrow"><span class="sb7 f1">${s}</span>${ic('next',16)}</div>`).join('')}</div>
  <div class="card mt16" style="padding:4px 18px"><div class="lrow tap" data-act="resetAll"><span class="sb7 f1" style="color:var(--or)">체험 처음부터 다시 하기</span>${ic('refresh',16)}</div></div></div></div>` };
HK.ACT.resetAll = ()=>HK.reset();
})();
