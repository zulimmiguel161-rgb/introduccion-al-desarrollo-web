
const lessons = [
  {
    id:1, icon:'🏷️', label:'Etiquetas',
    title:'¿Qué es una etiqueta HTML?',
    desc:'Las etiquetas son como cajas mágicas 📦. Cada cosa que ves en una página está dentro de una caja. Una caja empieza con <etiqueta> y termina con </etiqueta>.',
    hint:'Prueba a cambiar el texto dentro de <h1> y <p>. ¡Lo que escribas aparecerá en tu página!',
    html:'<h1>¡Mi primera página!</h1>\n<p>Hola, me llamo Ana.</p>\n<p>Tengo 8 años.</p>',
    css:'body {\n  font-family: sans-serif;\n  padding: 20px;\n}',
    check:(h)=>h.includes('<h1>')&&h.includes('<p>'),
    win:'¡Perfecto! Ya sabes usar etiquetas. ¡Las cajas mágicas funcionan!'
  },
  {
    id:2, icon:'🎨', label:'Colores',
    title:'¡Ponle color con CSS!',
    desc:'CSS es como la pintura 🎨 de las páginas web. Con "color" cambias el texto y con "background" cambias el fondo.',
    hint:'Prueba: color: red; o color: blue; — también puedes usar color: #FF6B9D; para colores especiales.',
    html:'<h1>¡Mi título colorido!</h1>\n<p>Este texto tiene color.</p>',
    css:'body {\n  font-family: sans-serif;\n  padding: 20px;\n  background: lightyellow;\n}\nh1 {\n  color: purple;\n}\np {\n  color: green;\n}',
    check:(_,c)=>c.includes('color')&&(c.includes('red')||c.includes('blue')||c.includes('purple')||c.includes('pink')||c.includes('#')),
    win:'¡Increíble artista! Tus colores se ven geniales.'
  },
  {
    id:3, icon:'📦', label:'Cajas',
    title:'Las cajas de contenido',
    desc:'Con <div> creas una caja 📦. Puedes darle espacio interior con "padding" y un borde con "border". ¡Como una caja de regalo!',
    hint:'El "padding" es el relleno dentro de la caja. Prueba: border: 3px solid red; para ver el borde.',
    html:'<div class="caja">\n  <h2>Soy una caja</h2>\n  <p>Tengo bordes y espacio.</p>\n</div>',
    css:'body {\n  font-family: sans-serif;\n  padding: 20px;\n  background: #f0f0f0;\n}\n.caja {\n  background: white;\n  padding: 20px;\n  border: 3px solid purple;\n  border-radius: 12px;\n  width: 250px;\n}',
    check:(h,c)=>h.includes('<div')&&c.includes('padding')&&c.includes('border'),
    win:'¡Tu caja es perfecta! Ya entiendes cómo funciona el espacio en CSS.'
  },
  {
    id:4, icon:'🔘', label:'Botones',
    title:'¡Haz un botón!',
    desc:'Con <button> creas un botón 🔘. Puedes hacerlo grande y colorido con CSS. El "border-radius" le da bordes redondeados.',
    hint:'Para que el cursor cambie al pasar por el botón usa: cursor: pointer; en el CSS.',
    html:'<h2>¡Mi super botón!</h2>\n<button class="btn">Haz clic aquí</button>',
    css:'body {\n  font-family: sans-serif;\n  padding: 20px;\n}\n.btn {\n  background: #6C63FF;\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 25px;\n  font-size: 16px;\n  cursor: pointer;\n}',
    check:(h,c)=>h.includes('<button')&&c.includes('background')&&c.includes('border-radius'),
    win:'¡WOW! Ese botón se ve profesional. ¡Eres un desarrollador de verdad!'
  },
  {
    id:5, icon:'🖼️', label:'Imágenes',
    title:'Agrega una imagen',
    desc:'Con <img> pones una imagen 🖼️. Necesitas decirle de dónde viene con "src=". El "alt" describe la imagen con palabras.',
    hint:'Puedes cambiar el tamaño con: width: 200px; en el CSS de tu imagen.',
    html:'<h2>Mi imagen favorita</h2>\n<img src="https://picsum.photos/200/150"\n     alt="Una foto bonita"\n     class="foto">\n<p>¡Qué bonita foto!</p>',
    css:'body {\n  font-family: sans-serif;\n  padding: 20px;\n}\n.foto {\n  border-radius: 12px;\n  border: 4px solid #6C63FF;\n  display: block;\n}',
    check:(h)=>h.includes('<img')&&h.includes('src='),
    win:'¡Increíble! Ya sabes poner imágenes. ¡Tu página empieza a verse como una de verdad!'
  }
];

let currentLesson=0, doneLessons=new Set(), stars=0, currentTab='html';
let htmlCode=lessons.map(l=>l.html);
let cssCode=lessons.map(l=>l.css);

function initLessons(){
  const nav=document.getElementById('lesson-nav');
  nav.innerHTML='';
  lessons.forEach((l,i)=>{
    const pill=document.createElement('div');
    pill.className='lesson-pill '+(i===currentLesson?'active':doneLessons.has(i)?'done':'locked');
    pill.textContent=l.icon+' '+l.label;
    pill.onclick=()=>{if(i<=currentLesson||doneLessons.has(i))loadLesson(i);};
    nav.appendChild(pill);
  });
}

function loadLesson(idx){
  currentLesson=idx;
  const l=lessons[idx];
  document.getElementById('l-icon').textContent=l.icon;
  document.getElementById('l-title').textContent='Misión '+l.id+': '+l.title;
  document.getElementById('l-desc').textContent=l.desc;
  currentTab='html';
  document.getElementById('etab-html').classList.add('active');
  document.getElementById('etab-css').classList.remove('active');
  document.getElementById('code-input').value=htmlCode[idx];
  highlight();
  runCode(true);
  document.getElementById('fb-text').textContent='¡Nueva misión! '+l.desc.split('.')[0]+'. ¡Tú puedes!';
  initLessons();
}

function switchETab(tab){
  if(currentTab==='html')htmlCode[currentLesson]=document.getElementById('code-input').value;
  else cssCode[currentLesson]=document.getElementById('code-input').value;
  currentTab=tab;
  document.getElementById('etab-html').classList.toggle('active',tab==='html');
  document.getElementById('etab-css').classList.toggle('active',tab==='css');
  document.getElementById('code-input').value=tab==='html'?htmlCode[currentLesson]:cssCode[currentLesson];
  highlight();
}

function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function highlightHTML(code){
  let r=esc(code);
  r=r.replace(/(&lt;\/?)([\w]+)([^&]*?)(\/?&gt;)/g,(_,open,tag,attrs,close)=>{
    let a=attrs.replace(/([\w-]+)(=)(&quot;[^&]*?&quot;)/g,
      (_,a,eq,v)=>`<span class="t-attr">${a}</span>${eq}<span class="t-val">${v}</span>`);
    return `<span class="t-brace">${open}</span><span class="t-tag">${tag}</span>${a}<span class="t-brace">${close}</span>`;
  });
  return r;
}

function highlightCSS(code){
  let r=esc(code);
  r=r.replace(/([^{}\n]+)\s*(?=\{)/g,m=>`<span class="t-sel">${m}</span>`);
  r=r.replace(/([\w-]+)(\s*:\s*)([^;{}\n]+)(;)/g,
    (_,p,col,val,sc)=>`<span class="t-prop">${p}</span><span class="t-colon">${col}</span><span class="t-cssval">${val}</span><span class="t-colon">${sc}</span>`);
  return r;
}

function highlight(){
  const val=document.getElementById('code-input').value;
  document.getElementById('code-hl').innerHTML=(currentTab==='html'?highlightHTML(val):highlightCSS(val))+'\n';
  syncScroll();
}

function syncScroll(){
  const ta=document.getElementById('code-input');
  const hl=document.getElementById('code-hl');
  hl.scrollTop=ta.scrollTop; hl.scrollLeft=ta.scrollLeft;
}

document.getElementById('code-input').addEventListener('input',()=>{
  if(currentTab==='html')htmlCode[currentLesson]=document.getElementById('code-input').value;
  else cssCode[currentLesson]=document.getElementById('code-input').value;
  highlight();
});
document.getElementById('code-input').addEventListener('scroll',syncScroll);
document.getElementById('code-input').addEventListener('keydown',e=>{
  if(e.key==='Tab'){
    e.preventDefault();
    const ta=e.target,s=ta.selectionStart;
    ta.value=ta.value.slice(0,s)+'  '+ta.value.slice(ta.selectionEnd);
    ta.selectionStart=ta.selectionEnd=s+2;
    highlight();
  }
});

document.getElementById('hint-btn').onclick=()=>{
  document.getElementById('fb-text').textContent='💡 Pista: '+lessons[currentLesson].hint;
};

function runCode(silent){
  if(currentTab==='html')htmlCode[currentLesson]=document.getElementById('code-input').value;
  else cssCode[currentLesson]=document.getElementById('code-input').value;
  const html=htmlCode[currentLesson];
  const css=cssCode[currentLesson];
  const full='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:sans-serif;margin:0;}'+css+'</style></head><body>'+html+'</body></html>';
  const bytes=new TextEncoder().encode(full);
  const blob=new Blob([bytes],{type:'text/html;charset=utf-8'});
  document.getElementById('preview').src=URL.createObjectURL(blob);
  if(silent)return;
  const l=lessons[currentLesson];
  const ok=l.check(html,css);
  if(ok&&!doneLessons.has(currentLesson)){
    doneLessons.add(currentLesson);
    stars+=3;
    document.getElementById('star-count').textContent=stars;
    document.getElementById('fb-text').textContent='🎉 '+l.win+' ¡Ganaste 3 estrellas! ⭐⭐⭐';
    if(currentLesson<lessons.length-1)setTimeout(()=>{currentLesson++;loadLesson(currentLesson);},2400);
  } else if(ok){
    document.getElementById('fb-text').textContent='✅ Ya completaste esta misión. ¡Prueba hacer cambios creativos!';
  } else {
    const msgs=['¡Buen intento! Fíjate bien en la pista 💡','¡Casi! Revisa que tu código tenga todas las partes.','¡Sigue intentando! Los programadores siempre prueban muchas veces 💪'];
    document.getElementById('fb-text').textContent=msgs[Math.floor(Math.random()*msgs.length)];
  }
  initLessons();
}

loadLesson(0);
