const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const fmt=n=>n.toLocaleString('ru-RU').replace(/\u00a0/g,' ');
const norm=s=>s.toLowerCase().replace(/[‘’`ʻʼ]/g,"'").trim();
const nplate=s=>s.replace(/[\s-]/g,'').toUpperCase();
const showPlate=p=>p.replace(/^(\d{2})([A-Z])(\d{3})([A-Z]{2})$/,'$1 $2 $3 $4');
function carSVG(c,t,spin){const suv=t==='suv',top=suv?28:34;
return `<svg viewBox="0 0 240 120" aria-hidden="true"><ellipse cx="120" cy="108" rx="105" ry="7" fill="#0006"/>
<path d="M14 90V74Q14 66 24 64L50 58Q62 ${top} 96 ${top}H${suv?168:150}Q186 ${top+3} 196 58L220 66Q228 70 228 80V90Z" fill="${c}"/>
<path d="M64 58Q74 ${top+8} 98 ${top+8}H118V58ZM124 58V${top+8}H150Q166 ${top+10} 176 58Z" fill="#bfe9ff" opacity=".85"/>
<rect x="220" y="70" width="8" height="6" rx="2" fill="#ffe27a"/><rect x="12" y="72" width="6" height="6" rx="2" fill="#ff3b3b"/>
${[60,182].map(x=>`<circle cx="${x}" cy="90" r="18" fill="#10131c"/><g class="${spin?'spin':''}"><circle cx="${x}" cy="90" r="10" fill="#b8c0d4"/><path d="M${x} 82V98M${x-8} 90H${x+8}" stroke="#10131c" stroke-width="3"/></g>`).join('')}</svg>`}
const regions=["Toshkent","Samarqand","Buxoro","Andijon","Farg‘ona","Namangan","Qashqadaryo","Xorazm","Navoiy","Jizzax"];
const cars=[
{n:"Chevrolet Gentra",y:2021,p:14500,c:"#c9ccd1",pl:"01A777AA",r:"Toshkent",t:"sedan",km:48000,own:"A*** K."},
{n:"Chevrolet Malibu 2",y:2022,p:28500,c:"#27406e",pl:"01B123CC",r:"Toshkent",t:"sedan",km:30000,own:"S*** R."},
{n:"Chevrolet Cobalt",y:2020,p:11500,c:"#e9ecf2",pl:"30C456DA",r:"Samarqand",t:"sedan",km:72000,own:"B*** T."},
{n:"Kia K5",y:2021,p:33000,c:"#b3262f",pl:"10D789EB",r:"Buxoro",t:"sedan",km:41000,own:"D*** M."},
{n:"Hyundai Sonata",y:2019,p:24000,c:"#566074",pl:"70E321FA",r:"Andijon",t:"sedan",km:88000,own:"J*** N."},
{n:"Chevrolet Tracker",y:2023,p:22500,c:"#d58a14",pl:"01F555GG",r:"Toshkent",t:"suv",km:15000,own:"O*** H."},
{n:"BYD Song Plus",y:2023,p:31500,c:"#1c8f7a",pl:"60G900HH",r:"Farg‘ona",t:"suv",km:12000,own:"Z*** Q."},
{n:"Toyota Camry",y:2020,p:36500,c:"#16181f",pl:"90H111JJ",r:"Namangan",t:"sedan",km:65000,own:"U*** L."}];
const parts=[
{n:"Dvigatel (motor) to‘liq komplekt",c:"Dvigatel",p:12500000},{n:"Silindrlar bloki",c:"Dvigatel",p:3800000},{n:"Silindr kallagi (GBC)",c:"Dvigatel",p:2100000},{n:"Porshen komplekti (4 dona)",c:"Dvigatel",p:1450000},{n:"Porshen halqalari",c:"Dvigatel",p:380000},{n:"Shatun komplekti",c:"Dvigatel",p:920000},{n:"Tirsakli val",c:"Dvigatel",p:2300000},{n:"Taqsimlash vali (raspredval)",c:"Dvigatel",p:1150000},{n:"Klapan komplekti",c:"Dvigatel",p:640000},{n:"Vaqt kamari (GRM) komplekti",c:"Dvigatel",p:540000},{n:"Zanjir (tsep) GRM komplekti",c:"Dvigatel",p:780000},{n:"Kallak prokladkasi",c:"Dvigatel",p:150000},{n:"Moy poddoni",c:"Dvigatel",p:320000},{n:"Moy nasosi",c:"Dvigatel",p:460000},{n:"Dvigatel moyi 5W-30 (4 l)",c:"Dvigatel",p:285000},{n:"Svecha to‘plami (4 dona)",c:"Dvigatel",p:120000},{n:"Dvigatel yostig‘i (opora)",c:"Dvigatel",p:210000},{n:"Ventilyator kamari (remen)",c:"Dvigatel",p:90000},
{n:"Radiator",c:"Sovutish",p:650000},{n:"Termostat",c:"Sovutish",p:95000},{n:"Suv nasosi (pompa)",c:"Sovutish",p:240000},{n:"Radiator ventilyatori",c:"Sovutish",p:420000},{n:"Antifriz (5 l)",c:"Sovutish",p:110000},{n:"Kengaytirish bachogi",c:"Sovutish",p:130000},{n:"Pechka radiatori",c:"Sovutish",p:310000},
{n:"Yoqilg‘i nasosi",c:"Yoqilg‘i",p:520000},{n:"Forsunka (inyektor)",c:"Yoqilg‘i",p:260000},{n:"Yoqilg‘i filtri",c:"Yoqilg‘i",p:85000},{n:"Drossel zaslonkasi",c:"Yoqilg‘i",p:480000},{n:"Benzin baki",c:"Yoqilg‘i",p:900000},
{n:"Uzatmalar qutisi (korobka)",c:"Transmissiya",p:6500000},{n:"Debriyaj komplekti",c:"Transmissiya",p:980000},{n:"Debriyaj diski",c:"Transmissiya",p:450000},{n:"Shrus (tashqi)",c:"Transmissiya",p:330000},{n:"Shrus (ichki)",c:"Transmissiya",p:390000},{n:"Yarim o‘q",c:"Transmissiya",p:610000},{n:"Kardan val",c:"Transmissiya",p:1250000},{n:"Korobka moyi (1 l)",c:"Transmissiya",p:95000},
{n:"Tormoz kolodkasi (old)",c:"Tormoz",p:210000},{n:"Tormoz kolodkasi (orqa)",c:"Tormoz",p:170000},{n:"Tormoz diski (juft)",c:"Tormoz",p:480000},{n:"Tormoz barabani",c:"Tormoz",p:350000},{n:"Asosiy tormoz silindri",c:"Tormoz",p:420000},{n:"Tormoz shlangi",c:"Tormoz",p:90000},{n:"Tormoz suyuqligi",c:"Tormoz",p:60000},{n:"ABS datchigi",c:"Tormoz",p:350000},
{n:"Akkumulyator 60 Ah",c:"Elektr",p:790000},{n:"Akkumulyator 75 Ah",c:"Elektr",p:950000},{n:"Generator",c:"Elektr",p:920000},{n:"Starter",c:"Elektr",p:680000},{n:"Alanga g‘altagi (katushka)",c:"Elektr",p:250000},{n:"Lambda-zond (kislorod datchigi)",c:"Elektr",p:380000},{n:"Old chiroq (far)",c:"Elektr",p:650000},{n:"Orqa chiroq",c:"Elektr",p:380000},{n:"Lampa to‘plami (juft)",c:"Elektr",p:70000},{n:"Saqlagichlar to‘plami",c:"Elektr",p:40000},{n:"Signal (klakson)",c:"Elektr",p:80000},{n:"Shisha ko‘targich motori",c:"Elektr",p:290000},
{n:"Moy filtri",c:"Filtr",p:45000},{n:"Havo filtri",c:"Filtr",p:65000},{n:"Salon filtri",c:"Filtr",p:55000},{n:"Yoqilg‘i filtri (nozik)",c:"Filtr",p:70000},
{n:"Amortizator old (juft)",c:"Yurish",p:760000},{n:"Amortizator orqa (juft)",c:"Yurish",p:620000},{n:"Prujina (juft)",c:"Yurish",p:450000},{n:"Sharovoy opora",c:"Yurish",p:130000},{n:"Stabilizator tyagasi",c:"Yurish",p:75000},{n:"Rul uchi",c:"Yurish",p:160000},{n:"Rul tyagasi",c:"Yurish",p:210000},{n:"Rul reykasi",c:"Yurish",p:1800000},{n:"G‘ildirak podshipnigi",c:"Yurish",p:160000},{n:"Richag (rychag) sayrentbloki",c:"Yurish",p:140000},{n:"Gidrousilitel nasosi",c:"Yurish",p:1100000},
{n:"Glushitel (orqa)",c:"Egzoz",p:420000},{n:"Rezonator",c:"Egzoz",p:360000},{n:"Katalizator",c:"Egzoz",p:1650000},{n:"Kollektor prokladkasi",c:"Egzoz",p:60000},
{n:"Yozgi shina 15 dyuym (dona)",c:"G‘ildirak",p:650000},{n:"Qishki shina 15 dyuym (dona)",c:"G‘ildirak",p:720000},{n:"Disk (quyma) 15 dyuym",c:"G‘ildirak",p:900000},{n:"Disk (po‘lat) 15 dyuym",c:"G‘ildirak",p:380000},{n:"Balon kaliti",c:"G‘ildirak",p:50000},{n:"G‘ildirak boltlari",c:"G‘ildirak",p:70000},
{n:"Old bamper",c:"Kuzov",p:450000},{n:"Orqa bamper",c:"Kuzov",p:420000},{n:"Kapot",c:"Kuzov",p:900000},{n:"Eshik",c:"Kuzov",p:1350000},{n:"Qanot (krыlo)",c:"Kuzov",p:520000},{n:"Yon oyna ko‘zgusi",c:"Kuzov",p:190000},{n:"Old shisha (lobovoy)",c:"Kuzov",p:950000},{n:"Bagaj qopqog‘i",c:"Kuzov",p:1100000},{n:"Eshik tutqichi",c:"Kuzov",p:80000},
{n:"Rul g‘ildiragi",c:"Salon",p:420000},{n:"O‘rindiq qoplamasi",c:"Salon",p:380000},{n:"Polga kovrik (to‘plam)",c:"Salon",p:160000},{n:"Salon ko‘zgusi",c:"Salon",p:60000},{n:"Konditsioner kompressori",c:"Salon",p:1750000},{n:"Konditsioner gazi (freon)",c:"Salon",p:180000},{n:"Shift pedal to‘plami",c:"Salon",p:110000},
];
const ico={Dvigatel:'⚙️',Sovutish:'❄️','Yoqilg‘i':'⛽',Transmissiya:'🔧',Tormoz:'🛑',Elektr:'⚡',Filtr:'🧪',Yurish:'🛞',Egzoz:'💨','G‘ildirak':'⭕',Kuzov:'🚗',Salon:'🪑'};
const probs=[
{t:"Dvigatel qizib ketyapti",k:["qiz","qizib","haroratga","kaynab","qaynab","issiq"],cause:"Antifriz yetishmaydi, termostat yoki radiator ishdan chiqqan.",fix:"Antifriz sathini tekshiring, termostatni almashtiring, radiator oqmayotganini ko‘ring.",cost:"150 000 – 700 000 so‘m",p:["Termostat","Radiator"]},
{t:"Tormoz g‘ichirlaydi",k:["tormoz","g'ich","gich","chiyil","shovqin"],cause:"Kolodkalar yeyilgan yoki disk notekis bo‘lib qolgan.",fix:"Kolodkalarni almashtiring, disk holatini tekshiring, tormoz suyuqligini yangilang.",cost:"200 000 – 700 000 so‘m",p:["Tormoz kolodkasi","Tormoz disk","Tormoz suyuqligi"]},
{t:"Mashina o‘t olmayapti",k:["o't ol","ot ol","start","yurmayd","ishga tush","tiqilla"],cause:"Akkumulyator o‘tirib qolgan, starter yoki svechalar nosoz.",fix:"Akkumulyator kuchlanishini o‘lchang (12.4 V dan past bo‘lmasin), starter va svechalarni tekshiring.",cost:"120 000 – 900 000 so‘m",p:["Akkumulyator","Starter","Svecha"]},
{t:"Dvigatel titraydi, tebranadi",k:["titra","tebran","silkin","notekis","troit"],cause:"Svechalar yoki yoqilg‘i filtri bilan muammo, havo filtri bo‘kib qolgan.",fix:"Svechalarni va filtrlarni almashtiring, yoqilg‘i sifatini tekshiring.",cost:"120 000 – 350 000 so‘m",p:["Svecha","Yoqilg‘i filtri","Havo filtri"]},
{t:"Yoqilg‘i ko‘p sarflanyapti",k:["yoqilg'i","benzin","gaz","sarf","ko'p yey","ko'p ich"],cause:"Havo filtri iflos, svechalar eskirgan yoki shinalarda bosim past.",fix:"Havo filtri va svechalarni almashtiring, shina bosimini tekshiring.",cost:"100 000 – 300 000 so‘m",p:["Havo filtri","Svecha"]},
{t:"Akkumulyator tez zaryadsizlanadi",k:["akkumulyator","akum","zaryad","o'tirib","o'chib qol"],cause:"Generator yaxshi zaryadlamayapti yoki akkumulyator eskirgan.",fix:"Generator kuchlanishi 13.8–14.5 V bo‘lishi kerak. Past bo‘lsa generator tuzatiladi.",cost:"150 000 – 950 000 so‘m",p:["Akkumulyator","Generator"]},
{t:"Rul bilan yurganda taqillaydi",k:["taq","taqill","tuk","rul","yurish","chuqur","amortizator"],cause:"Amortizator, sharovoy yoki stabilizator tyagasi yeyilgan.",fix:"Yurish qismini ko‘tarib tekshiring, yeyilgan detallarni almashtiring.",cost:"150 000 – 900 000 so‘m",p:["Amortizator","Sharovoy","Stabilizator"]},
{t:"Moy lampochkasi yonyapti",k:["moy","lampochka","yonyapti","bosim"],cause:"Moy sathi past yoki moy filtri/nasosda muammo.",fix:"Mashinani to‘xtating, moy sathini tekshiring, kerak bo‘lsa moy va filtrni almashtiring.",cost:"150 000 – 400 000 so‘m",p:["Dvigatel moyi","Moy filtri"]},
{t:"Old chiroq yonmayapti",k:["chiroq","faralar","yorug","lampa"],cause:"Lampa kuygan yoki saqlagich (predoxranitel) uzilgan.",fix:"Lampani almashtiring, saqlagichni tekshiring.",cost:"20 000 – 80 000 so‘m",p:["Old chiroq"]}];
// background cars
const lane=$('#lane');[['#ffb020',16,0],['#4fd8ff',22,-8],['#e9ecf2',28,-17]].forEach(([c,d,dl],i)=>{const e=document.createElement('div');e.className='dr';e.style.animationDuration=d+'s';e.style.animationDelay=dl+'s';e.innerHTML=carSVG(c,i==1?'suv':'sedan',1);lane.append(e)});
$('#heroCar').innerHTML=carSVG('#ffb020','sedan',1);
$('#mq').innerHTML=[...Array(2)].map(()=>['Chevrolet','Kia','Hyundai','Toyota','BYD','Ravon','Daewoo','Nexia'].map(x=>`<span>${x}</span>`).join('')).join('');
$('#regs').innerHTML=regions.map(r=>`<option value="${r}">`).join('');
// router
function route(){const h=location.hash.slice(1)||'home';const id=$('#'+h)?h:'home';
$$('.page').forEach(p=>p.classList.toggle('on',p.id===id));$$('nav a').forEach(a=>a.classList.toggle('on',a.hash==='#'+id));
$('#menu').classList.remove('open');scrollTo(0,0);setTimeout(watch,50)}
addEventListener('hashchange',route);$('#burger').onclick=()=>$('#menu').classList.toggle('open');
// scroll effects
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');const n=e.target.querySelector('[data-n]');if(n&&!n.done){n.done=1;count(n)}io.unobserve(e.target)}}),{threshold:.15});
function watch(){$$('.page.on .rv:not(.in)').forEach(e=>io.observe(e))}
function count(n){const to=+n.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1500);n.textContent=fmt(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(f)})(t0)}
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;$('#prog').style.width=(scrollY/m*100||0)+'%';document.body.style.setProperty('--sy',scrollY);$('.city').style.transform=`translateY(${scrollY*.08}px)`},{passive:true});
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('on'),2200)};
// find car
const pal=['#c9ccd1','#27406e','#b3262f','#16181f','#566074','#1c8f7a','#d58a14','#e9ecf2'];
const models=`Chevrolet|Matiz|h|3500|7500
Chevrolet|Spark|h|6500|10500
Chevrolet|Nexia 3|s|7000|11500
Chevrolet|Cobalt|s|9500|14500
Chevrolet|Gentra|s|11000|16500
Chevrolet|Lacetti|s|6500|11000
Chevrolet|Malibu 2|s|24000|31000
Chevrolet|Onix|s|12500|16000
Chevrolet|Tracker|v|19500|25000
Chevrolet|Captiva|v|24000|33000
Chevrolet|Equinox|v|26000|35000
Chevrolet|Damas|h|6500|10000
Chevrolet|Labo|h|7500|10500
Ravon|Nexia R3|s|6500|10000
Ravon|R4|s|7500|10500
Daewoo|Nexia|s|3500|7500
Daewoo|Matiz|h|2500|5500
Kia|Rio|s|13000|18000
Kia|K5|s|28000|38000
Kia|Seltos|v|23000|30000
Kia|Sportage|v|29000|38000
Kia|Sorento|v|36000|50000
Kia|Carnival|v|42000|58000
Hyundai|Accent|s|11000|16000
Hyundai|Elantra|s|19000|26000
Hyundai|Sonata|s|23000|34000
Hyundai|Creta|v|22000|29000
Hyundai|Tucson|v|29000|40000
Hyundai|Santa Fe|v|38000|52000
Toyota|Corolla|s|19000|27000
Toyota|Camry|s|30000|42000
Toyota|RAV4|v|33000|45000
Toyota|Land Cruiser|v|65000|110000
BYD|Chazor|s|21000|27000
BYD|Qin Plus|s|19000|25000
BYD|Han|s|36000|48000
BYD|Song Plus|v|28000|36000
Chery|Arrizo 8|s|22000|28000
Chery|Tiggo 7 Pro|v|23000|30000
Haval|Jolion|v|20000|26000
Haval|H6|v|26000|34000
Lada|Granta|s|8500|12000
Lada|Vesta|s|11000|15000
Mercedes-Benz|E-Class|s|45000|80000
BMW|5 Series|s|42000|75000
Lexus|LX|v|95000|150000`.split('\n').map((l,i)=>{const[b,m,t,a,z]=l.split('|');return{b,m,t:t==='v'?'suv':'sedan',a:+a,z:+z,c:pal[i%8]}});
regions.push('Surxondaryo','Sirdaryo','Qoraqalpog‘iston');$('#regs').innerHTML=regions.map(r=>`<option value="${r}">`).join('');
const mine=()=>{try{return JSON.parse(localStorage.getItem('avtoyol_cars')||'[]')}catch(e){return[]}};
const gl=q=>'https://www.google.com/search?q='+encodeURIComponent(q);
const pic=c=>c.img?`<img src="${c.img}" alt="${c.n}">`:`<div class="float">${carSVG(c.c,c.t,0)}</div>`;
const card=c=>`<article class="item pop">${pic(c)}<h3>${c.n}, ${c.y}</h3><div class="price">$${fmt(c.p)}</div><span class="tag">${c.r}</span><span class="tag">${fmt(c.km)} km</span>${c.pl?`<span class="tag">${showPlate(c.pl)}</span>`:''}${c.tel?`<p>Tel: ${c.tel}</p>`:''}${c.u?`<button class="chip" data-del="${c.id}">E‘lonni o‘chirish</button>`:''}</article>`;
const mcard=(m,a)=>`<article class="item pop">${`<div class="float">${carSVG(m.c,m.t,0)}</div>`}<h3>${m.b} ${m.m}</h3><div class="price">$${fmt(m.a)} – $${fmt(m.z)}</div><span class="tag">taxminiy bozor narxi</span><p style="margin:.6rem 0"><a class="btn" target="_blank" rel="noopener" href="${gl('site:avtoelon.uz '+m.b+' '+m.m+' '+a)}">Avtoelon’da qidirish</a></p><a class="tag" target="_blank" rel="noopener" href="${gl('site:olx.uz '+m.b+' '+m.m+' '+a)}">OLX’da qidirish</a></article>`;
function runFind(){const q=norm($('#q').value),a=norm($('#addr').value).replace(/ ?(shahri|viloyati)/,''),pm=+$('#pmax').value||0,ym=+$('#ymin').value||0,pl=nplate($('#plate').value),out=$('#fres'),all=[...mine(),...cars];
if(pl){const c=all.find(x=>x.pl===pl);out.innerHTML=c?`<article class="item big pop">${pic(c)}<div><div class="plate">${showPlate(c.pl)}</div><h3>${c.n}, ${c.y}</h3><div class="price">$${fmt(c.p)}</div><p>Manzil: ${c.r}<br>Probeg: ${fmt(c.km)} km<br>${c.u?'E‘lon egasi tel: '+c.tel:'Egasi: '+c.own+'<br>Texnik ko‘rik: o‘tgan<br>Jarimalar: yo‘q'}</p></div></article>`:`<p class="empty">«${showPlate(pl)}» raqamli mashina bazamizda yo‘q. Bazada faqat saytga qo‘shilgan e‘lonlar bor. Raqamni tekshiring yoki mashinani «E‘lon qo‘shish» orqali kiriting.</p>`;$('#fcount').textContent='';return}
const L=all.filter(c=>(!q||norm(c.n).includes(q))&&(!a||norm(c.r).includes(a))&&(!pm||c.p<=pm)&&(!ym||c.y>=ym));
const Mo=models.filter(m=>(!q||norm(m.b+' '+m.m).includes(q))&&(!pm||m.a<=pm));
$('#fcount').textContent=`${L.length} ta e‘lon va ${Mo.length} ta model topildi`;
out.innerHTML=(L.length?`<h3 class="gh">E‘lonlar (${L.length})</h3>`+L.map(card).join(''):'<p class="empty">Bu shartlar bo‘yicha e‘lon yo‘q. Narx yoki yilni o‘zgartirib ko‘ring yoki pastdagi modellar bo‘yicha tashqi saytlarda qidiring.</p>')+(Mo.length?`<h3 class="gh">O‘zbekiston bozoridagi modellar (${Mo.length}) va narx oralig‘i</h3>`+Mo.map(m=>mcard(m,$('#addr').value)).join(''):'')}
$('#ff').onsubmit=e=>{e.preventDefault();runFind()};
$('#fres').onclick=e=>{const d=e.target.dataset.del;if(d){localStorage.setItem('avtoyol_cars',JSON.stringify(mine().filter(c=>String(c.id)!==d)));runFind();toast('E‘lon o‘chirildi')}};
$('#af').onsubmit=async e=>{e.preventDefault();let img='';const f=$('#ai').files[0];
if(f)img=await new Promise(r=>{const i=new Image();i.onload=()=>{const k=Math.min(1,640/i.width),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL('image/jpeg',.7))};i.onerror=()=>r('');i.src=URL.createObjectURL(f)});
const c={id:Date.now(),u:1,n:$('#an').value,y:+$('#ay').value,p:+$('#ap').value,r:$('#ar').value,km:+$('#ak').value,pl:nplate($('#al').value),tel:$('#at').value,t:$('#aty').value,c:$('#ac').value,img};
try{localStorage.setItem('avtoyol_cars',JSON.stringify([c,...mine()]))}catch(x){c.img='';localStorage.setItem('avtoyol_cars',JSON.stringify([c,...mine()]));toast('Rasm katta, rasmsiz saqlandi')}
$('#am').textContent='E‘loningiz joylandi! «Mashina topish» sahifasida ko‘rinadi.';$('#af').reset();runFind();toast('E‘lon joylandi')};
runFind();
// parts
let cat='Hammasi';const cats=['Hammasi',...new Set(parts.map(p=>p.c))];
function drawParts(){const q=norm($('#ps').value);$('#cats').innerHTML=cats.map(c=>`<button class="cat ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('');
const l=parts.filter(p=>(cat==='Hammasi'||p.c===cat)&&norm(p.n).includes(q));
$('#pgrid').innerHTML=l.length?l.map(p=>`<article class="item"><span class="tag">${ico[p.c]||""} ${p.c}</span><h3>${p.n}</h3><div class="price">${fmt(p.p)} so‘m</div><button class="btn" data-b="${p.n}">Savatga qo‘shish</button></article>`).join(''):'<p class="empty">Zapchast topilmadi.</p>'}
$('#ps').oninput=drawParts;$('#cats').onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;drawParts()}};
$('#pgrid').onclick=e=>{if(e.target.dataset.b)toast(e.target.dataset.b+' savatga qo‘shildi')};drawParts();
// problems
$('#chips').innerHTML=probs.map((p,i)=>`<button class="chip" data-i="${i}">${p.t}</button>`).join('');
const show=l=>{$('#pres').innerHTML=l.length?l.map(p=>`<article class="item"><h3>${p.t}</h3><p><b>Sabab:</b> ${p.cause}</p><p><b>Yechim:</b> ${p.fix}</p><div class="price">${p.cost}</div>${p.p.map(n=>`<span class="tag">${n}</span>`).join('')}<p style="margin-top:.8rem"><a class="btn" href="#parts" onclick="setTimeout(()=>{$('#ps').value='${norm(p.p[0].split(' ')[0])}';drawParts()},80)">Zapchastlarni ko‘rish</a></p></article>`).join(''):'<p class="empty">Aniq mos nosozlik topilmadi. Boshqacha yozib ko‘ring: nima eshityapsiz, qachon bo‘ladi, qaysi qismda?</p>'};
$('#pf').onsubmit=e=>{e.preventDefault();const q=norm($('#pt').value);const l=probs.map(p=>({p,s:p.k.filter(k=>q.includes(k)).length})).filter(x=>x.s).sort((a,b)=>b.s-a.s).map(x=>x.p);show(l)};
$('#chips').onclick=e=>{if(e.target.dataset.i)show([probs[e.target.dataset.i]])};
// register
$('#rf').onsubmit=e=>{e.preventDefault();localStorage.setItem('avtoyol_user',JSON.stringify({n:$('#rn').value,p:$('#rp').value}));$('#rm').textContent=`Xush kelibsiz, ${$('#rn').value}! Ro‘yxatdan o‘tdingiz.`;toast('Ro‘yxatdan o‘tdingiz')};
route();
