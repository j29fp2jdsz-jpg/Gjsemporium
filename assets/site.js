const menu=document.querySelector('.menu-button');
const nav=document.querySelector('#site-nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
nav?.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');});
const dialog=document.querySelector('.lightbox');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{
  const source=item.querySelector('img');dialog.querySelector('img').src=source.src;dialog.querySelector('img').alt=source.alt;dialog.querySelector('p').textContent=item.dataset.title;dialog.showModal();
}));
dialog.querySelector('button')?.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
