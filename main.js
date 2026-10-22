const S=SITE,$=s=>document.querySelector(s),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const ini=S.prenom1[0]+"&"+S.prenom2[0];
const words=t=>t.split(' ').map((w,i)=>`<span class=w><span style="--i:${i}">${w}</span></span>`).join(' ');
const sec=(id,k,t,b)=>`<section id="${id}"><p class="k rv">${k}</p><h2 class="ti">${words(t)}</h2>${b}</section>`;
const q=encodeURIComponent(`${S.lieu}, ${S.adresse}, ${S.ville}`);
document.title=`Mariage de ${S.prenom1} & ${S.prenom2}`;
$('#seal').textContent=ini;
$('#card').innerHTML=`<small>Vous êtes invités</small><b>${S.prenom1}</b><small>&</small><b>${S.prenom2}</b>`;
const d=t=>`style="transition-delay:${t}s"`;
$('#site').innerHTML=`
<header class="hero" style="--img:url(${S.photoAccueil})">
 <p class="k rv" ${d(.2)}>${S.surtitre}</p>
 <h1 class="nm rv" ${d(.6)}><span>${S.prenom1}</span><em>&amp;</em><span>${S.prenom2}</span></h1>
 <p class="wel rv" ${d(1)}>${S.accueil}</p>
 <p class="k rv" ${d(1.3)} style="color:#e0a98f;transition-delay:1.3s">${S.dateTexte}</p>
 <div class="cd rv" id="cd" ${d(1.6)}></div>
</header>
${sec('histoire','Notre histoire','Comment tout a commencé',`<div class="tl" id="tl"><i></i>${S.histoire.map(e=>`<div class="ev rv"><p class="k">${e[0]}</p><h3>${e[1]}</h3><p>${e[2]}</p></div>`).join('')}</div>`)}
${sec('galerie','Galerie','Quelques souvenirs',`<div class="gal">${S.galerie.map((p,i)=>`<div class="ph rv"><img src="${p}" alt="Photo ${i+1} des mariés" loading="lazy"></div>`).join('')}</div>`)}
${sec('programme','Le programme','Le déroulé de la journée',S.programme.map(p=>`<div class="row rv"><b>${p[0]}</b><div><h3>${p[1]}</h3><p>${p[2]}</p></div></div>`).join(''))}
${sec('lieu','Le lieu','Où nous retrouver',`<p class="rv"><b>${S.lieu}</b><br>${S.adresse}<br>${S.ville}</p><iframe class="rv" loading="lazy" title="Carte" src="https://www.google.com/maps?q=${q}&output=embed"></iframe><a class="btn o rv" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${q}">Ouvrir l’itinéraire</a>`)}
${sec('tenue','Tenue','Le dress code',`<p class="rv">${S.dresscode}</p><div class="dots rv">${S.couleurs.map(c=>`<div><span style="background:${c[1]}"></span><small>${c[0]}</small></div>`).join('')}</div>`)}
<section id="rsvp"><div class="box"><p class="k rv">Confirmer ma présence</p><h2 class="ti">${words('Serez-vous des nôtres ?')}</h2><p class="rv">Merci de nous répondre avant le <b>${S.rsvpDate}</b>.</p><a class="btn rv" style="margin-top:26px" target="_blank" rel="noopener" href="${S.rsvpLien}">Répondre à l’invitation</a></div></section>
<footer><p class="k rv">${S.merci}</p><b class="rv">${ini.replace('&',' & ')}</b><p class="k rv">${S.hashtag}</p></footer>`;
// Compte à rebours
const target=new Date(S.dateISO).getTime();
function cd(){let s=Math.max(0,Math.floor((target-Date.now())/1000));
 const v=[[s/86400,'jours'],[s%86400/3600,'heures'],[s%3600/60,'minutes'],[s%60,'secondes']];
 $('#cd').innerHTML=s||Date.now()<target?v.map(x=>`<div><b>${String(Math.floor(x[0])).padStart(2,'0')}</b><small>${x[1]}</small></div>`).join(''):'<span class="k">C’est le grand jour</span>'}
cd();setInterval(cd,1000);
// Apparitions et parallaxe
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
const imgs=[...document.querySelectorAll('.ph img')],tl=$('#tl');let busy=false;
function tick(){busy=false;const H=innerHeight;
 imgs.forEach(im=>{const r=im.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>H)return;
  const dd=(r.top+r.height/2-H/2)/H,m=r.height*.1;im.style.transform=`translate3d(0,${Math.max(-m,Math.min(m,-dd*r.height*.2))}px,0)`});
 const r=tl.getBoundingClientRect();tl.style.setProperty('--p',Math.max(0,Math.min(1,(H*.65-r.top)/r.height)))}
if(reduce)tl.style.setProperty('--p',1);
else addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(tick)}},{passive:true});
// Ouverture de l'enveloppe
$('#go').onclick=()=>{$('#ov').classList.add('open');
 setTimeout(()=>{$('#ov').classList.add('gone');$('#site').classList.add('on');document.body.classList.remove('lock');scrollTo(0,0);
  document.querySelectorAll('.rv,.ti').forEach(el=>io.observe(el));if(!reduce)tick()},reduce?200:3600);
 setTimeout(()=>$('#ov').remove(),reduce?600:5200)};
