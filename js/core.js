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
HK.wm = (h=30, color='currentColor') => `<svg class="wordmark" role="img" aria-label="한 끼 여권" viewBox="0 0 528 154" style="height:${(h*1.6).toFixed(1)}px;width:auto;display:block;color:${color};fill:currentColor"><path d="M468.129 121.618H442.069V108.703H416.355V89.3311H461.095C463.286 83.6809 464.67 78.0308 464.67 75.0327C464.67 70.3051 462.825 67.9989 455.676 67.9989C446.566 67.9989 435.381 68.6907 420.276 70.0744V50.7025C435.036 50.0107 448.757 49.4341 459.596 49.4341C481.62 49.4341 487.501 56.0067 487.501 69.8438C487.501 75.7246 486.233 82.9891 484.273 89.3311H493.958V108.703H468.129V121.618ZM480.006 152.636C445.644 152.636 428.463 145.141 418.085 133.264L433.191 117.236C441.032 127.96 453.831 131.88 480.352 131.88C491.537 131.88 510.448 131.188 524.631 129.343V150.791C511.831 152.175 490.845 152.636 480.006 152.636ZM524.285 123.463H499.147V83.7962H490.73V64.1937H499.147V48.627H524.285V123.463Z"/><path d="M336.099 152.058C313.153 152.058 300.123 134.762 300.123 99.8229C300.123 64.8843 313.153 47.5879 336.099 47.5879C348.553 47.5879 358.124 52.7768 364.12 63.0393H381.531V48.6257H408.052V151.712H381.531V133.608H365.734C359.853 145.947 349.706 152.058 336.099 152.058ZM336.099 128.65C342.211 128.65 345.555 120.924 345.555 99.8229C345.555 78.7213 342.211 70.9956 336.099 70.9956C329.988 70.9956 326.644 78.7213 326.644 99.8229C326.644 120.924 329.988 128.65 336.099 128.65ZM371.384 111.123H381.531V85.5246H371.038C371.615 89.9063 371.845 94.634 371.845 99.8229C371.845 103.859 371.73 107.549 371.384 111.123Z"/><path d="M215.967 149.292H190.138C200.055 119.888 204.898 89.3311 204.898 76.993C204.898 73.8796 203.745 71.9194 200.401 71.8041C198.325 71.8041 195.673 71.6888 192.79 71.8041C191.522 94.6353 185.18 123.924 177.224 149.292H151.74C160.734 127.498 167.538 94.7506 169.267 72.9572C163.041 73.4184 156.929 73.995 151.74 74.5715V51.1638C167.768 49.8954 191.407 49.0882 204.206 49.3188C221.963 49.6647 228.536 56.8139 228.536 73.7643C228.536 91.4066 222.771 125.884 215.967 149.292ZM260.477 151.713H235.339V48.627H260.477V151.713Z"/><path d="M67.5333 152.865C36.6305 152.865 19.6801 146.408 7.91854 135.454L23.2547 118.273C33.4018 128.074 45.6246 132.11 68.6864 132.11C79.8714 132.11 96.8218 131.418 111.005 129.573V151.02C98.2055 152.404 78.3724 152.865 67.5333 152.865ZM40.8969 117.696C19.9107 117.696 7.342 105.127 7.342 91.8669C7.342 86.2167 11.0319 81.1431 14.9524 77.6839C10.8013 77.7992 4.92051 78.3757 1 78.9523V58.7732C11.2625 57.966 28.2129 58.1966 37.207 58.7732L14.9524 35.0122L37.207 25.6465C55.08 35.1018 59.8076 54.3914 59.8076 61.1947C59.8076 66.0377 58.5392 69.2663 52.0819 73.0715H66.7262C70.9926 76.8767 74.3366 83.9106 74.3366 91.8669C74.3366 105.127 62.575 117.696 40.8969 117.696ZM109.045 119.31H82.5235V48.626H109.045V72.9562H116.886V94.519H109.045V119.31ZM32.1334 89.9066C32.1334 94.6343 35.9386 98.0936 41.0122 98.0936C45.8552 98.0936 49.7757 94.1731 49.7757 89.4454C49.7757 85.0636 48.5073 81.9503 43.549 77.2226C36.054 80.6819 32.1334 84.833 32.1334 89.9066Z"/><path d="M234.934 21.8438H240.774V0H244.808V21.8438H250.649V0H255.328V21.8438H261.17V0H265.94V33.6934C265.94 39.2162 261.463 43.6934 255.94 43.6934H239.746C234.223 43.6934 229.746 39.2162 229.746 33.6934V0H234.934V21.8438Z"/><ellipse cx="510.831" cy="22.3535" rx="16.2571" ry="22.3535"/><rect x="506.432" y="40.4141" width="9.49" height="12.2946"/><rect x="243.098" y="40.4141" width="9.49" height="12.2946"/><g fill="none" stroke="currentColor"><path d="M2.53 51.63C2.53 51.63 15.89 52.07 24.19 53.92C31.94 55.65 43.45 60.43 43.45 60.43"/><path stroke-width="0.5" d="M13.53 37.21C13.53 37.21 24.66 46.07 30.9 51.85C36.73 57.24 43.94 65.95 43.94 65.95"/><path stroke-width="2" d="M1.94 55.37C1.94 55.37 16.28 55.48 25.96 56.44C35.64 57.39 43.41 59.71 43.41 59.71"/></g></svg>`;
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
HK.STAMP_ART = '<circle cx="110" cy="110" r="102" stroke="currentColor" stroke-width="6"/><circle cx="110" cy="110" r="89" stroke="currentColor" stroke-width="2" stroke-dasharray="8 6"/><rect x="89.2148" y="50.4492" width="2.91796" height="7.0154" transform="rotate(-40.6071 89.2148 50.4492)" fill="currentColor"/><rect x="92.248" y="47.8516" width="2.91796" height="7.0154" transform="rotate(-40.6071 92.248 47.8516)" fill="currentColor"/><rect x="95.2793" y="45.2539" width="2.91796" height="7.0154" transform="rotate(-40.6071 95.2793 45.2539)" fill="currentColor"/><path d="M101.524 47.2864L92.498 55.0244L93.8669 56.621L95.6264 55.1126L115.516 78.3126L113.757 79.821L115.125 81.4177L124.086 73.7355L122.717 72.1389L121.023 73.5915L101.133 50.3915L102.893 48.883L101.524 47.2864Z" fill="currentColor"/><ellipse cx="122.193" cy="47.0901" rx="4.87765" ry="6.83891" transform="rotate(41.9514 122.193 47.0901)" fill="currentColor"/><path d="M122.686 55.3695L113.844 47.4219L112.438 48.986L114.162 50.5353L93.7329 73.2623L92.0093 71.7129L90.6034 73.277L99.3813 81.1673L100.787 79.6032L99.1274 78.1112L119.556 55.3842L121.28 56.9336L122.686 55.3695Z" fill="currentColor"/><g transform="translate(82.4 148.7) scale(0.1045)" fill="currentColor"><path d="M468.129 121.618H442.069V108.703H416.355V89.3311H461.095C463.286 83.6809 464.67 78.0308 464.67 75.0327C464.67 70.3051 462.825 67.9989 455.676 67.9989C446.566 67.9989 435.381 68.6907 420.276 70.0744V50.7025C435.036 50.0107 448.757 49.4341 459.596 49.4341C481.62 49.4341 487.501 56.0067 487.501 69.8438C487.501 75.7246 486.233 82.9891 484.273 89.3311H493.958V108.703H468.129V121.618ZM480.006 152.636C445.644 152.636 428.463 145.141 418.085 133.264L433.191 117.236C441.032 127.96 453.831 131.88 480.352 131.88C491.537 131.88 510.448 131.188 524.631 129.343V150.791C511.831 152.175 490.845 152.636 480.006 152.636ZM524.285 123.463H499.147V83.7962H490.73V64.1937H499.147V48.627H524.285V123.463Z"/><path d="M336.099 152.058C313.153 152.058 300.123 134.762 300.123 99.8229C300.123 64.8843 313.153 47.5879 336.099 47.5879C348.553 47.5879 358.124 52.7768 364.12 63.0393H381.531V48.6257H408.052V151.712H381.531V133.608H365.734C359.853 145.947 349.706 152.058 336.099 152.058ZM336.099 128.65C342.211 128.65 345.555 120.924 345.555 99.8229C345.555 78.7213 342.211 70.9956 336.099 70.9956C329.988 70.9956 326.644 78.7213 326.644 99.8229C326.644 120.924 329.988 128.65 336.099 128.65ZM371.384 111.123H381.531V85.5246H371.038C371.615 89.9063 371.845 94.634 371.845 99.8229C371.845 103.859 371.73 107.549 371.384 111.123Z"/><path d="M215.967 149.292H190.138C200.055 119.888 204.898 89.3311 204.898 76.993C204.898 73.8796 203.745 71.9194 200.401 71.8041C198.325 71.8041 195.673 71.6888 192.79 71.8041C191.522 94.6353 185.18 123.924 177.224 149.292H151.74C160.734 127.498 167.538 94.7506 169.267 72.9572C163.041 73.4184 156.929 73.995 151.74 74.5715V51.1638C167.768 49.8954 191.407 49.0882 204.206 49.3188C221.963 49.6647 228.536 56.8139 228.536 73.7643C228.536 91.4066 222.771 125.884 215.967 149.292ZM260.477 151.713H235.339V48.627H260.477V151.713Z"/><path d="M67.5333 152.865C36.6305 152.865 19.6801 146.408 7.91854 135.454L23.2547 118.273C33.4018 128.074 45.6246 132.11 68.6864 132.11C79.8714 132.11 96.8218 131.418 111.005 129.573V151.02C98.2055 152.404 78.3724 152.865 67.5333 152.865ZM40.8969 117.696C19.9107 117.696 7.342 105.127 7.342 91.8669C7.342 86.2167 11.0319 81.1431 14.9524 77.6839C10.8013 77.7992 4.92051 78.3757 1 78.9523V58.7732C11.2625 57.966 28.2129 58.1966 37.207 58.7732L14.9524 35.0122L37.207 25.6465C55.08 35.1018 59.8076 54.3914 59.8076 61.1947C59.8076 66.0377 58.5392 69.2663 52.0819 73.0715H66.7262C70.9926 76.8767 74.3366 83.9106 74.3366 91.8669C74.3366 105.127 62.575 117.696 40.8969 117.696ZM109.045 119.31H82.5235V48.626H109.045V72.9562H116.886V94.519H109.045V119.31ZM32.1334 89.9066C32.1334 94.6343 35.9386 98.0936 41.0122 98.0936C45.8552 98.0936 49.7757 94.1731 49.7757 89.4454C49.7757 85.0636 48.5073 81.9503 43.549 77.2226C36.054 80.6819 32.1334 84.833 32.1334 89.9066Z"/><path d="M234.934 21.8438H240.774V0H244.808V21.8438H250.649V0H255.328V21.8438H261.17V0H265.94V33.6934C265.94 39.2162 261.463 43.6934 255.94 43.6934H239.746C234.223 43.6934 229.746 39.2162 229.746 33.6934V0H234.934V21.8438Z"/><ellipse cx="510.831" cy="22.3535" rx="16.2571" ry="22.3535"/><rect x="506.432" y="40.4141" width="9.49" height="12.2946"/><rect x="243.098" y="40.4141" width="9.49" height="12.2946"/><g fill="none" stroke="currentColor"><path d="M2.53 51.63C2.53 51.63 15.89 52.07 24.19 53.92C31.94 55.65 43.45 60.43 43.45 60.43"/><path stroke-width="0.5" d="M13.53 37.21C13.53 37.21 24.66 46.07 30.9 51.85C36.73 57.24 43.94 65.95 43.94 65.95"/><path stroke-width="2" d="M1.94 55.37C1.94 55.37 16.28 55.48 25.96 56.44C35.64 57.39 43.41 59.71 43.41 59.71"/></g></g><line x1="10.4043" y1="92.25" x2="212.875" y2="92.25" stroke="currentColor"/><line x1="10.4043" y1="144.016" x2="212.875" y2="144.016" stroke="currentColor"/>';
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
