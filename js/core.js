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
  stamps:{THA:'03 NOV 26'}, onboarded:false, fridge:['양배추','대파','달걀','참치캔'], comments:{} };
let S;
try { S = Object.assign({}, DEF, JSON.parse(localStorage.getItem('hk-state-v2')||'{}')); } catch(e){ S = Object.assign({}, DEF); }
HK.S = S;
HK.save = () => { try { localStorage.setItem('hk-state-v2', JSON.stringify(S)); } catch(e){} };
HK.reset = () => { try { localStorage.removeItem('hk-state-v2'); } catch(e){} try { history.replaceState(null,'','#A1'); } catch(e){} location.reload(); };

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
HK.wm = (h=30, color='currentColor') => `<svg class="wordmark" role="img" aria-label="한 끼 여권" viewBox="0 0 158 40" style="height:${(h*40/31).toFixed(1)}px;margin-top:-${(h*9/31).toFixed(1)}px;width:auto;display:block;fill:${color}"><path d="M8.855 27.3228C6.00833 27.3228 3.815 26.6344 2.275 25.2578C0.758333 23.8811 0 22.1428 0 20.0428C0 17.9894 0.758333 16.3094 2.275 15.0028C3.815 13.6961 6.00833 13.0428 8.855 13.0428C11.7017 13.0428 13.8717 13.6961 15.365 15.0028C16.8817 16.3094 17.64 17.9894 17.64 20.0428C17.64 22.1428 16.8817 23.8811 15.365 25.2578C13.8483 26.6344 11.6783 27.3228 8.855 27.3228ZM0.14 10.9428H6.02V8.94775H12.32L11.725 10.9428H17.78V12.4128H0.14V10.9428ZM8.855 26.0628C10.0217 26.0628 10.955 25.5028 11.655 24.3828C12.3783 23.2394 12.74 21.7928 12.74 20.0428C12.74 18.3628 12.3783 16.9861 11.655 15.9128C10.955 14.8161 10.0217 14.2678 8.855 14.2678C7.64167 14.2678 6.69667 14.8044 6.02 15.8778C5.34333 16.9511 5.005 18.3394 5.005 20.0428C5.005 21.8161 5.34333 23.2628 6.02 24.3828C6.72 25.5028 7.665 26.0628 8.855 26.0628ZM7.63 37.6128C16.87 37.6128 24.5233 36.7261 30.59 34.9528L29.19 39.1528H0.14V37.6128H1.68V30.8928H0.14V29.3528H9.17V30.8928H7.63V37.6128ZM29.47 10.8028V12.5178H27.65L27.615 19.7278H29.995L30.415 17.8378H31.71V23.4028H30.415L29.995 21.4778H27.615L27.58 28.6878H29.4V30.4028H19.775V28.6878H21.665V12.5178H19.775V10.8028H29.47Z"/><path d="M64.8605 10.8028V38.8028H59.2605V12.3778H56.7405L56.8105 38.8028H49.8455V37.9628H51.2105V12.3428H49.9155L47.7105 13.6028V10.8028H64.8605ZM77.4605 10.8028H67.7655V12.5178H69.6555V37.4378H67.7655V39.1528H77.3905V37.4378H75.5705V12.5178H77.4605V10.8028Z"/><path d="M108.056 35.0578C106.586 37.9044 104.544 39.3278 101.931 39.3278C99.3176 39.3278 97.2759 37.9044 95.8059 35.0578C94.3359 32.2111 93.6009 28.6411 93.6009 24.3478C93.6009 20.1478 94.3243 16.7528 95.7709 14.1628C97.2409 11.5728 99.2943 10.2778 101.931 10.2778C104.568 10.2778 106.609 11.5728 108.056 14.1628C109.526 16.7528 110.261 20.1478 110.261 24.3478C110.261 28.6411 109.526 32.2111 108.056 35.0578ZM101.931 37.4728C102.374 37.4728 102.818 36.9244 103.261 35.8278C103.704 34.7311 104.078 33.1561 104.381 31.1028C104.684 29.0261 104.836 26.7861 104.836 24.3828C104.836 22.0728 104.684 19.9611 104.381 18.0478C104.101 16.1111 103.739 14.6411 103.296 13.6378C102.853 12.6344 102.398 12.1328 101.931 12.1328C101.184 12.1328 100.508 13.2994 99.9009 15.6328C99.3176 17.9661 99.0259 20.8828 99.0259 24.3828C99.0259 27.9761 99.3176 31.0561 99.9009 33.6228C100.508 36.1894 101.184 37.4728 101.931 37.4728ZM117.016 27.7078H113.726L113.201 29.6328H112.186V24.0678H113.201L113.726 25.9578H117.016V19.3778H113.726L113.201 21.3028H112.186V15.7378H113.201L113.726 17.6278H117.016L116.981 12.5178H115.161V10.8028H124.506V12.5178H122.616V37.0878H124.506V38.8028H115.231V37.0878H117.051L117.016 27.7078Z"/><path d="M137.146 20.2528V12.3428H130.286L127.556 13.7078V10.8028H144.321V12.3428H143.096V18.7128H144.321V20.2528H137.146ZM135.046 37.6128C144.286 37.6128 151.94 36.7261 158.006 34.9528L156.606 39.1528H127.556V37.6128H129.096V30.8928H127.556V29.3528H136.586V30.8928H135.046V37.6128ZM139.911 24.5228V26.4478H141.381V27.4628H132.806V26.4478H134.311V24.5228H129.621L128.081 25.7828V22.9828H147.331V25.7828L145.791 24.5928L139.911 24.5228ZM148.136 16.9278L147.611 15.0378H146.561V20.6028H147.611L148.136 18.6778H151.076V29.1078H149.186V30.8228H157.761V29.1078H156.011V12.5178H157.831V10.8028H149.186V12.5178H151.076V16.9278H148.136Z"/><ellipse cx="24.5075" cy="5.57917" rx="3.98042" ry="5.57917"/><rect x="68.1606" y="5.78967" width="2.38168" height="5.72392"/><rect x="71.4502" y="5.78967" width="2.38168" height="5.72392"/><rect x="74.7399" y="5.78967" width="2.38168" height="5.72392"/></svg>`;
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
HK.STAMP_ART = '<circle cx="110" cy="110" r="102" stroke="currentColor" stroke-width="6"/><circle cx="110" cy="110" r="89" stroke="currentColor" stroke-width="2" stroke-dasharray="8 6"/><rect x="89.2148" y="50.4492" width="2.91796" height="7.0154" transform="rotate(-40.6071 89.2148 50.4492)" fill="currentColor"/><rect x="92.248" y="47.8516" width="2.91796" height="7.0154" transform="rotate(-40.6071 92.248 47.8516)" fill="currentColor"/><rect x="95.2793" y="45.2539" width="2.91796" height="7.0154" transform="rotate(-40.6071 95.2793 45.2539)" fill="currentColor"/><path d="M101.524 47.2864L92.498 55.0244L93.8669 56.621L95.6264 55.1126L115.516 78.3126L113.757 79.821L115.125 81.4177L124.086 73.7355L122.717 72.1389L121.023 73.5915L101.133 50.3915L102.893 48.883L101.524 47.2864Z" fill="currentColor"/><ellipse cx="122.193" cy="47.0901" rx="4.87765" ry="6.83891" transform="rotate(41.9514 122.193 47.0901)" fill="currentColor"/><path d="M122.686 55.3695L113.844 47.4219L112.438 48.986L114.162 50.5353L93.7329 73.2623L92.0093 71.7129L90.6034 73.277L99.3813 81.1673L100.787 79.6032L99.1274 78.1112L119.556 55.3842L121.28 56.9336L122.686 55.3695Z" fill="currentColor"/><path d="M88.0587 160.378C87.0754 160.378 86.3178 160.141 85.7858 159.665C85.2619 159.19 85 158.589 85 157.864C85 157.154 85.2619 156.574 85.7858 156.123C86.3178 155.671 87.0754 155.446 88.0587 155.446C89.042 155.446 89.7916 155.671 90.3074 156.123C90.8313 156.574 91.0932 157.154 91.0932 157.864C91.0932 158.589 90.8313 159.19 90.3074 159.665C89.7835 160.141 89.0339 160.378 88.0587 160.378ZM85.0484 154.72H87.0794V154.031H89.2556L89.0501 154.72H91.1416V155.228H85.0484V154.72ZM88.0587 159.943C88.4617 159.943 88.7841 159.75 89.0259 159.363C89.2757 158.968 89.4007 158.468 89.4007 157.864C89.4007 157.283 89.2757 156.808 89.0259 156.437C88.7841 156.058 88.4617 155.869 88.0587 155.869C87.6396 155.869 87.3132 156.054 87.0794 156.425C86.8457 156.796 86.7288 157.275 86.7288 157.864C86.7288 158.476 86.8457 158.976 87.0794 159.363C87.3212 159.75 87.6476 159.943 88.0587 159.943ZM87.6356 163.933C90.8272 163.933 93.4709 163.626 95.5664 163.014L95.0828 164.465H85.0484V163.933H85.5803V161.612H85.0484V161.08H88.1675V161.612H87.6356V163.933ZM95.1795 154.672V155.264H94.5509L94.5388 157.755H95.3609L95.506 157.102H95.9533V159.024H95.506L95.3609 158.359H94.5388L94.5267 160.85H95.1554V161.442H91.8307V160.85H92.4835V155.264H91.8307V154.672H95.1795Z" fill="currentColor"/><path d="M107.404 154.672V164.344H105.47V155.216H104.599L104.623 164.344H102.218V164.054H102.689V155.204H102.242L101.48 155.639V154.672H107.404ZM111.756 154.672H108.408V155.264H109.06V163.872H108.408V164.465H111.732V163.872H111.104V155.264H111.756V154.672Z" fill="currentColor"/><path d="M122.325 163.05C121.817 164.033 121.112 164.525 120.209 164.525C119.306 164.525 118.601 164.033 118.093 163.05C117.586 162.067 117.332 160.834 117.332 159.351C117.332 157.9 117.582 156.727 118.081 155.833C118.589 154.938 119.298 154.491 120.209 154.491C121.12 154.491 121.825 154.938 122.325 155.833C122.832 156.727 123.086 157.9 123.086 159.351C123.086 160.834 122.832 162.067 122.325 163.05ZM120.209 163.884C120.362 163.884 120.515 163.695 120.668 163.316C120.822 162.937 120.951 162.393 121.055 161.684C121.16 160.967 121.212 160.193 121.212 159.363C121.212 158.565 121.16 157.835 121.055 157.175C120.959 156.506 120.834 155.998 120.681 155.651C120.527 155.305 120.37 155.131 120.209 155.131C119.951 155.131 119.717 155.534 119.508 156.34C119.306 157.146 119.206 158.154 119.206 159.363C119.206 160.604 119.306 161.668 119.508 162.554C119.717 163.441 119.951 163.884 120.209 163.884ZM125.42 160.511H124.283L124.102 161.176H123.751V159.254H124.102L124.283 159.907H125.42V157.634H124.283L124.102 158.299H123.751V156.377H124.102L124.283 157.029H125.42L125.408 155.264H124.779V154.672H128.007V155.264H127.354V163.751H128.007V164.344H124.803V163.751H125.432L125.42 160.511Z" fill="currentColor"/><path d="M132.373 157.936V155.204H130.004L129.061 155.675V154.672H134.852V155.204H134.428V157.404H134.852V157.936H132.373ZM131.648 163.933C134.839 163.933 137.483 163.626 139.579 163.014L139.095 164.465H129.061V163.933H129.593V161.612H129.061V161.08H132.18V161.612H131.648V163.933ZM133.328 159.411V160.076H133.836V160.427H130.874V160.076H131.394V159.411H129.774L129.242 159.846V158.879H135.891V159.846L135.359 159.435L133.328 159.411ZM136.169 156.788L135.988 156.135H135.625V158.057H135.988L136.169 157.392H137.185V160.995H136.532V161.587H139.494V160.995H138.89V155.264H139.518V154.672H136.532V155.264H137.185V156.788H136.169Z" fill="currentColor"/><ellipse cx="93.4657" cy="152.868" rx="1.37492" ry="1.92716" fill="currentColor"/><rect x="108.544" y="152.94" width="0.822679" height="1.97716" fill="currentColor"/><rect x="109.681" y="152.94" width="0.822679" height="1.97716" fill="currentColor"/><rect x="110.816" y="152.94" width="0.822679" height="1.97716" fill="currentColor"/><line x1="10.4043" y1="92.25" x2="212.875" y2="92.25" stroke="currentColor"/><line x1="10.4043" y1="144.016" x2="212.875" y2="144.016" stroke="currentColor"/>';
HK.stamp = (code, o={}) => {
  const k = HK.kit(code); const sz = o.size||96;
  if(o.empty) return `<div class="stamp empty" style="width:${sz}px;height:${sz}px"><div class="ring"></div><div>${HK.lm(code, sz*.28)}<div class="code" style="font-size:${sz*.16}px">${code}</div></div></div>`;
  /* 수저 뽀뽀 아이콘 + 나라 이름 + 한 끼 여권 로고 (Figma 디자인 기준 v3 · 도장) */
  const col = o.color || (['THA','KOR','VNM','MEX','FRA'].includes(code)?'var(--or)':'var(--g)');
  const en = (k.city||'').split(' · ')[0];
  return `<div class="stamp v4 ${o.anim?'stamp-in':''}" style="width:${sz}px;height:${sz}px;color:${col};transform:rotate(${o.rot??-10}deg)"><svg viewBox="0 0 220 220" fill="none" aria-hidden="true">${HK.STAMP_ART}</svg><div class="nm" style="font-size:${(sz*30.8/220).toFixed(2)}px">${en}</div></div>`;
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
