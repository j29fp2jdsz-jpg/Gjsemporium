const menu=document.querySelector('.menu-button');
const nav=document.querySelector('#site-nav');
menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
nav?.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
});

document.querySelectorAll('[data-showcase-carousel]').forEach(carousel=>{
  const slides=[...carousel.querySelectorAll('.carousel-slide')];
  const prev=carousel.querySelector('.carousel-prev');
  const next=carousel.querySelector('.carousel-next');
  const dotsWrap=carousel.querySelector('.carousel-dots');
  let index=0;
  let timer=null;
  let startX=null;

  if(slides.length<2)return;

  slides.forEach((_,i)=>{
    const dot=document.createElement('button');
    dot.type='button';
    dot.className='carousel-dot';
    dot.setAttribute('aria-label',`Show image ${i+1}`);
    dot.addEventListener('click',()=>{
      show(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });

  const dots=[...dotsWrap.querySelectorAll('.carousel-dot')];

  function show(newIndex){
    index=(newIndex+slides.length)%slides.length;
    slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===index));
    dots.forEach((dot,i)=>dot.classList.toggle('is-active',i===index));
  }

  function advance(){show(index+1);}
  function restart(){
    clearInterval(timer);
    timer=setInterval(advance,4200);
  }

  prev?.addEventListener('click',()=>{show(index-1);restart();});
  next?.addEventListener('click',()=>{show(index+1);restart();});

  const viewport=carousel.querySelector('.carousel-viewport');
  viewport?.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;},{passive:true});
  viewport?.addEventListener('touchend',e=>{
    if(startX===null)return;
    const delta=e.changedTouches[0].clientX-startX;
    if(Math.abs(delta)>45)show(index+(delta<0?1:-1));
    startX=null;
    restart();
  },{passive:true});

  carousel.addEventListener('mouseenter',()=>clearInterval(timer));
  carousel.addEventListener('mouseleave',restart);

  show(0);
  restart();
});
