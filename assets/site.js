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
    title:'Coffin coffee table',
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
    title:'Coffin ottoman / storage',
    image:'assets/coffin-ottoman.webp',
    alt:'Black coffin ottoman with gold handles and hairpin legs',
    description:'Hidden storage with unmistakable character, made with an upholstered or solid top and finished as a useful piece of furniture.',
    features:['Upholstered or solid top options','Choice of fabric, colour and fittings','Useful internal storage','Leg height and overall finish tailored to order']
  },
  bar:{
    title:'Coffin bar / drinks cabinet',
    image:'assets/coffin-shelving.webp',
    alt:'Example coffin furniture by GJ’s Emporium',
    description:'A coffin transformed into a bold home bar or drinks cabinet, designed around the bottles, glasses and accessories you want to store or display.',
    features:['Open shelving or cabinet-style layouts','Bottle and glass storage planned around your collection','Optional lighting and decorative details','Colours, handles and fittings chosen with you']
  },
  cabinet:{
    title:'Coffin display cabinet',
    image:'assets/coffin-coffee-table.webp',
    alt:'Example coffin furniture by GJ’s Emporium',
    description:'A made-to-order coffin display cabinet for collectables, curiosities or statement storage, with the internal layout designed around what you want to showcase.',
    features:['Open or enclosed display options','Custom shelf spacing','Choice of interior and exterior finish','Lighting and hardware can be discussed']
  },
  bespoke:{
    title:'Bespoke coffin build',
    image:'assets/hero-bg.webp',
    alt:'Gothic furniture and curiosities by GJ’s Emporium',
    description:'Have an idea that does not fit a standard category? Garry can work with you on a completely individual coffin-based piece, from a TV unit or bookcase to a bar, cabinet or something new.',
    features:['Start with your idea, room and measurements','Design developed around how you want to use it','Colours, fittings and layout tailored to you','Unusual ideas are absolutely welcome']
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
