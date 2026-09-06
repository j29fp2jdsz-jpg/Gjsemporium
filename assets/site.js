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

const products={
  'coffee-table':{
    title:'Coffin coffee tables',
    image:'assets/coffin-coffee-table.webp',
    alt:'Black coffin-shaped open coffee table with gold fittings',
    description:'A striking, practical centrepiece built from a coffin and finished to suit the room it is made for.',
    features:['Choice of colour and finish','Open shelving or alternative storage layouts','Handles, legs and fittings selected for the design','Dimensions discussed before work begins']
  },
  shelving:{
    title:'Coffin display shelving',
    image:'assets/coffin-shelving.webp',
    alt:'Black, red and grey coffin display shelving',
    description:'A full-height coffin transformed into statement shelving for collectables, curiosities, plants or personal displays.',
    features:['Interior and exterior colours chosen with you','Shelf spacing planned around what you want to display','Lighting and decorative details can be discussed','Freestanding designs made for individual spaces']
  },
  ottoman:{
    title:'Coffin ottomans & storage',
    image:'assets/coffin-ottoman.webp',
    alt:'Black coffin ottoman with gold handles and hairpin legs',
    description:'Hidden storage with unmistakable character, made with an upholstered or solid top and finished as a useful piece of furniture.',
    features:['Upholstered or solid top options','Choice of fabric, colour and fittings','Useful internal storage','Leg height and overall finish tailored to order']
  }
};
const productDialog=document.querySelector('.product-dialog');
document.querySelectorAll('.order-card').forEach(card=>card.addEventListener('click',()=>{
  const product=products[card.dataset.product];
  if(!product||!productDialog)return;
  const image=productDialog.querySelector('.product-image');
  image.src=product.image;image.alt=product.alt;
  productDialog.querySelector('#product-title').textContent=product.title;
  productDialog.querySelector('.product-description').textContent=product.description;
  productDialog.querySelector('.product-features').innerHTML=product.features.map(feature=>`<li>${feature}</li>`).join('');
  productDialog.showModal();
}));
productDialog?.querySelector('.dialog-close')?.addEventListener('click',()=>productDialog.close());
productDialog?.addEventListener('click',event=>{if(event.target===productDialog)productDialog.close();});
productDialog?.querySelector('.product-enquiry')?.addEventListener('click',()=>productDialog.close());
