/* 한 끼 여권 · 라우터, 상태, 공통 컴포넌트 */
(function(){
const HK = window.HK;
const $ = (s, r=document) => r.querySelector(s);
HK.$ = $;

/* ---------- 상태 (브라우저에만 저장) ---------- */
const DEF = { cart:[], memo:[
  {id:'m1',t:'마늘 3쪽',from:'팟카파오 무',done:false},
  {id:'m2',t:'달걀 2개',from:'팟카파오 무',done:true},
  {id:'m3',t:'부침가루 1봉',from:'냉털 · 오코노미야키',done:false}],
  saved:['pakkapao','cabbagetuna'], follows:['minji','bread','self3','fridgeking'], liked:[], myPosts:[], cooked:12,
  stamps:{BKK:'03 NOV 26'}, onboarded:false, fridge:['양배추','대파','달걀','참치캔'], comments:{} };
let S;
try { S = Object.assign({}, DEF, JSON.parse(localStorage.getItem('hk-state')||'{}')); } catch(e){ S = Object.assign({}, DEF); }
HK.S = S;
HK.save = () => { try { localStorage.setItem('hk-state', JSON.stringify(S)); } catch(e){} };
HK.reset = () => { try { localStorage.removeItem('hk-state'); } catch(e){} try { history.replaceState(null,'','#A1'); } catch(e){} location.reload(); };

/* ---------- 아이콘 ---------- */
const P = {
  back:'M15 18l-6-6 6-6', close:'M18 6L6 18M6 6l12 12', next:'M9 18l6-6-6-6', arrow:'M5 12h14M13 6l6 6-6 6',
  cart:'M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6.2M9 21h.01M18 21h.01',
  bell:'M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
  home:'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  passport:'M5 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5zM12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 17h6',
  fridge:'M6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM5 10h14M9 5v2M9 13v3',
  feed:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  pot:'M4 10h16v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3zM2 10h20M9 6c0-1 1-2 3-2s3 1 3 2',
  check:'M5 12.5l4.5 4.5L19 7.5', plus:'M12 5v14M5 12h14', minus:'M5 12h14',
  heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z',
  comment:'M21 12a8 8 0 0 1-11.7 7.1L3 21l1.9-6.3A8 8 0 1 1 21 12z',
  share:'M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13',
  bookmark:'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
  search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  calendar:'M4 5h16v16H4zM16 3v4M8 3v4M4 10h16',
  gift:'M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z',
  box:'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
  timer:'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 10v4l2 2M9 2h6',
  camera:'M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  edit:'M4 20h4L19 9l-4-4L4 16zM14 6l4 4', users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  filter:'M3 5h18M6 12h12M10 19h4', sort:'M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4',
  tag:'M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8zM7 7h.01',
  pin:'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  card:'M2 6h20v12H2zM2 10h20', more:'M5 12h.01M12 12h.01M19 12h.01', image:'M3 3h18v18H3zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
  refresh:'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5', play:'M6 4l14 8-14 8z', pause:'M7 4h3v16H7zM14 4h3v16h-3z', spark:'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01', qr:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4',
  trash:'M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15', settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'
};
HK.ic = (n, size, extra='') => `<svg class="i" ${size?`style="width:${size}px;height:${size}px"`:''} viewBox="0 0 24 24" ${extra}><path d="${P[n]||''}"/></svg>`;
HK.lm = (code, size=30, color='currentColor') => `<svg class="lm" style="width:${size}px;height:${size}px;color:${color}" viewBox="0 0 30 30"><path d="${HK.LM[code]}"/></svg>`;
HK.won = n => n.toLocaleString('ko-KR') + '원';

/* ---------- 병아리 ---------- */
const POSES = ['main','wave','cook','travel','fridge','cheer','curious','pan','knife','taste','plating','bowl','timer','baking','box','stamp','basket','photo','recipe','trophy'];
const HAPPY = ['cheer','wave','main','trophy','taste'];
HK.chick = (pose, h, motion='bob', style='') => {
  const d = (Math.random()*1.2).toFixed(2);
  return `<div class="chick m-${motion}" data-chick="${pose}" style="height:${h}px;width:${Math.round(h*0.78)}px;animation-delay:-${d}s;${style}"><img src="assets/chick/${pose}.webp" alt="병아리 ${pose}" draggable="false"></div>`;
};
/* 누르면 통통 튀고, 가끔 포즈를 바꿨다가 돌아와요 */
document.addEventListener('click', e => {
  const c = e.target.closest('.chick'); if(!c) return;
  e.stopImmediatePropagation();
  const img = c.querySelector('img'); const base = c.dataset.chick;
  c.classList.remove('boing'); void c.offsetWidth; c.classList.add('boing');
  const alt = HAPPY.filter(p => p!==base)[Math.floor(Math.random()*4)];
  img.style.opacity = 0;
  setTimeout(()=>{ img.src = `assets/chick/${alt}.webp`; img.style.opacity = 1; }, 160);
  clearTimeout(c._t);
  c._t = setTimeout(()=>{ img.style.opacity = 0; setTimeout(()=>{ img.src=`assets/chick/${base}.webp`; img.style.opacity=1; },200); }, 1600);
}, true);
/* 미리 불러오기 */
HK.preload = () => POSES.forEach(p => { const i = new Image(); i.src = `assets/chick/${p}.webp`; });

/* ---------- 공통 조각 ---------- */
HK.sb = dark => `<div class="sb ${dark?'dark':''}"><span>9:41</span><span class="r"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2" width="3" height="10" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><span class="bat"></span></span></div>`;
HK.backBtn = (dark, icon='back') => `<button class="ib ${dark?'dark':''}" data-back aria-label="뒤로">${HK.ic(icon)}</button>`;
HK.btn = (label, attrs='', type='p', arrow=true) => `<button class="btn ${type}" ${attrs}><span>${label}</span>${arrow&&'plk'.includes(type)?`<span class="arr">${HK.ic('next',18)}</span>`:''}</button>`;
HK.stamp = (code, o={}) => {
  const k = HK.kit(code); const sz = o.size||96; const col = o.color || (['BKK','SEL','HAN','MEX','PAR'].includes(code)?'var(--or)':'var(--g)');
  if(o.empty) return `<div class="stamp empty" style="width:${sz}px;height:${sz}px"><div class="ring"></div><div>${HK.lm(code, sz*.28)}<div class="code" style="font-size:${sz*.16}px">${code}</div></div></div>`;
  const sq = ['TYO','ROM','DEL'].includes(code);
  return `<div class="stamp ${sq?'sq':''} ${o.anim?'stamp-in':''}" style="width:${sq?sz*1.2:sz}px;height:${sz}px;color:${col};transform:rotate(${o.rot??-10}deg)"><div class="ring"></div><div class="ring2"></div><div>${HK.lm(code, sz*.3)}<div class="code" style="font-size:${sz*.19}px">${code}</div><div class="date" style="font-size:${Math.max(8,sz*.09)}px">${o.date||'2026'}</div></div></div>`;
};
HK.avatar = (who, size=40) => { const p = HK.PEOPLE[who]||{}; return `<div class="av" style="width:${size}px;height:${size}px;${p.img?`background-image:url(${p.img})`:''}"></div>`; };
HK.photo = (img, h, r=20, extra='') => `<div class="ph ${img?'':'empty'}" style="height:${h}px;border-radius:${r}px;${img?`background-image:url(${img})`:''};${extra}"></div>`;

HK.tabbar = act => {
  const T = [['home','home','홈'],['passport','passport','여권'],['fridge','fridge','냉털'],['feed','feed','피드'],['kitchen','pot','주방']];
  return `<nav class="tabbar">${T.map(([k,i,l])=>`<button class="${act===k?'on':''}" data-tab="${k}">${HK.ic(i)}<span>${l}</span></button>`).join('')}</nav>`;
};

/* ---------- 라우터 ---------- */
const stack = []; // {name, params, el}
HK.stack = stack;
const SCR = HK.SCREENS = {};
let busy = false;
function build(name, params){
  const def = SCR[name]; if(!def){ console.warn('no screen', name); return null; }
  const el = document.createElement('section');
  el.className = 'scr ' + (def.cls||'');
  el.dataset.name = name;
  el.innerHTML = def.render(params||{}) + (def.tab? HK.tabbar(def.tab):'' ) + HK.sb(def.darkBar);
  return el;
}
function mount(el, name, params){ const def = SCR[name]; if(def.mount) def.mount(el, params||{}); }
function unmount(item){ const def = SCR[item.name]; if(def && def.unmount) def.unmount(item.el); clearTimers(item.el); }
function clearTimers(el){ (el._timers||[]).forEach(t=>{clearTimeout(t);clearInterval(t);}); el._timers=[]; }
HK.later = (el, fn, ms) => { el._timers = el._timers||[]; const t=setTimeout(fn, ms); el._timers.push(t); return t; };
HK.every = (el, fn, ms) => { el._timers = el._timers||[]; const t=setInterval(fn, ms); el._timers.push(t); return t; };

HK.go = (name, params={}, mode='push') => {
  if(busy) return; closeOverlays(true);
  const root = $('.stack'); const el = build(name, params); if(!el) return;
  const prev = stack[stack.length-1];
  if(mode==='replace' || mode==='fade' || mode==='root'){
    if(mode==='root' || mode==='fade'){ while(stack.length){ const it = stack.pop(); unmount(it); if(it!==prev) it.el.remove(); } }
    else if(prev){ stack.pop(); unmount(prev); }
    root.appendChild(el); stack.push({name, params, el});
    el.classList.add('in-fade'); busy = true;
    setTimeout(()=>{ if(prev) prev.el.remove(); el.classList.remove('in-fade'); busy=false; }, 300);
    mount(el, name, params); syncHash(); return;
  }
  root.appendChild(el); stack.push({name, params, el});
  if(prev){ busy = true; el.classList.add('in-push'); prev.el.classList.add('out-push');
    setTimeout(()=>{ prev.el.classList.remove('out-push'); prev.el.style.visibility='hidden'; el.classList.remove('in-push'); busy=false; }, 300); }
  mount(el, name, params); syncHash();
};
HK.back = () => {
  if(busy) return; if(closeOverlays()) return;
  if(stack.length<2){ HK.go('home',{},'root'); return; }
  const cur = stack.pop(); const prev = stack[stack.length-1];
  unmount(cur); prev.el.style.visibility=''; busy = true;
  cur.el.classList.add('out-pop'); prev.el.classList.add('in-pop');
  setTimeout(()=>{ cur.el.remove(); prev.el.classList.remove('in-pop'); busy=false; const d=SCR[prev.name]; if(d.refresh) d.refresh(prev.el, prev.params); }, 300);
  syncHash();
};
HK.tab = name => { const cur = stack[stack.length-1]; if(cur && cur.name===name && stack.length===1) return; HK.go(name, {}, 'fade'); };
HK.cur = () => stack[stack.length-1];
HK.rerender = () => { const c = HK.cur(); if(!c) return; const scrollEl = c.el.querySelector('.scroll'); const y = scrollEl?scrollEl.scrollTop:0; clearTimers(c.el);
  const def = SCR[c.name]; c.el.innerHTML = def.render(c.params||{}) + (def.tab?HK.tabbar(def.tab):'') + HK.sb(def.darkBar); mount(c.el, c.name, c.params); const s2=c.el.querySelector('.scroll'); if(s2) s2.scrollTop=y; };
function syncHash(){ const c = HK.cur(); if(!c) return; const q = Object.keys(c.params||{}).length? '?'+new URLSearchParams(c.params).toString():''; try { history.replaceState(null,'','#'+c.name+q); } catch(e){} }

/* ---------- 겹치는 창 ---------- */
const overlays = [];
function closeOverlays(instant){
  if(!overlays.length) return false;
  const o = overlays.pop(); const ph = $('.phone');
  if(instant){ o.forEach(n=>n.remove()); return true; }
  o.forEach(n=>n.classList.add('out')); setTimeout(()=>o.forEach(n=>n.remove()), 300);
  return true;
}
HK.closeOverlay = () => closeOverlays();
HK.sheet = (html, opt={}) => {
  const ph = $('.phone'); const dim = document.createElement('div'); dim.className='dim'; dim.addEventListener('click', ()=>closeOverlays());
  const sh = document.createElement('div'); sh.className = opt.modal? 'modal':'sheet'; sh.innerHTML = (opt.modal?'':'<div class="grab"></div>') + html;
  ph.appendChild(dim); ph.appendChild(sh); overlays.push([dim, sh]);
  if(opt.mount) opt.mount(sh);
  return sh;
};
HK.modal = (html, opt={}) => HK.sheet(html, Object.assign({modal:true}, opt));
HK.toast = (msg, icon='check', ms=1600) => {
  const ph = $('.phone'); ph.querySelectorAll('.toast').forEach(t=>t.remove());
  const t = document.createElement('div'); t.className='toast'; t.innerHTML = HK.ic(icon,18)+msg; ph.appendChild(t);
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),300); }, ms);
};

/* ---------- 공통 클릭 ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-back],[data-tab],[data-act],[data-close]'); if(!t) return;
  if(t.hasAttribute('data-back')) return HK.back();
  if(t.hasAttribute('data-close')) return HK.closeOverlay();
  if(t.dataset.tab) return HK.tab(t.dataset.tab);
  if(t.dataset.go){ const [n,q] = t.dataset.go.split('?'); const p = q? Object.fromEntries(new URLSearchParams(q)) : {}; return HK.go(n, p, t.dataset.mode||'push'); }
  if(t.dataset.act){ const fn = HK.ACT[t.dataset.act]; if(fn) fn(t, e); }
});
HK.ACT = {};

/* ---------- 자동 넘김 버튼 (5초 동안 채워짐) ---------- */
HK.autoBtn = (el, sel, ms, fn) => {
  const b = el.querySelector(sel); if(!b) return;
  const bar = document.createElement('i'); bar.className='prog'; b.prepend(bar);
  const cnt = b.querySelector('.cnt-num');
  bar.animate([{width:'0%'},{width:'100%'}], {duration:ms, easing:'linear', fill:'forwards'});
  let left = Math.round(ms/1000); if(cnt) cnt.textContent = left;
  HK.every(el, ()=>{ left--; if(cnt) cnt.textContent = Math.max(left,0); }, 1000);
  HK.later(el, fn, ms);
};

/* ---------- 시작 ---------- */
HK.start = () => {
  HK.preload();
  const h = location.hash.slice(1);
  if(h){ const [n,q] = h.split('?'); if(SCR[n]){ HK.go(n, q?Object.fromEntries(new URLSearchParams(q)):{}, 'root'); return; } }
  HK.go(S.onboarded? 'home':'A1', {}, 'root');
};
})();
