const products = [
  {name:'Laptop Nova 14',category:'laptops',categoryLabel:'LAPTOPS',code:'LT-014',description:'Ligera, ágil y lista para tu día a día.',price:2199,art:'laptop',badge:'ELECCIÓN PEPE'},
  {name:'Laptop Orbit Pro',category:'laptops',categoryLabel:'LAPTOPS',code:'LT-021',description:'Potencia extra para ideas grandes.',price:3499,art:'laptop blue',badge:'PARA CREAR'},
  {name:'Teclado Pulse RGB',category:'accesorios',categoryLabel:'ACCESORIOS',code:'AC-008',description:'Cada tecla encuentra su ritmo.',price:189,art:'keyboard',badge:'MÁS ELEGIDO'},
  {name:'SSD Flash 1 TB',category:'componentes',categoryLabel:'COMPONENTES',code:'CP-031',description:'Más espacio. Menos tiempo esperando.',price:329,art:'ssd',badge:'UPGRADE'},
  {name:'Audífonos Focus',category:'accesorios',categoryLabel:'ACCESORIOS',code:'AC-012',description:'Tu espacio, tu música, tu concentración.',price:249,art:'headphones',badge:'NUEVO'},
  {name:'Mouse Flux Wireless',category:'accesorios',categoryLabel:'ACCESORIOS',code:'AC-016',description:'Precisión que sigue tu movimiento.',price:119,art:'mouse',badge:'COMPACTO'}
];
const grid=document.getElementById('productGrid'),searchInput=document.getElementById('searchInput'),countEl=document.getElementById('cartCount'),toast=document.getElementById('toast');
let selectedFilter='all',cartCount=0,toastTimer;
const money=value=>`S/ ${value.toLocaleString('es-PE')}.00`;
function artwork(product){switch(product.art.split(' ')[0]){case'laptop':return `<div class="product-art art-laptop ${product.art.split(' ')[1]||''}"><div class="screen"></div><div class="base"></div></div>`;case'keyboard':return '<div class="product-art art-keyboard"><div class="keys"></div><div class="keyboard-glow"></div></div>';case'ssd':return '<div class="product-art art-ssd">1 TB</div>';case'headphones':return '<div class="product-art art-headphones"></div>';default:return '<div class="product-art art-mouse"></div>'}}
function renderProducts(){const query=searchInput.value.trim().toLocaleLowerCase('es');const filtered=products.filter(p=>(selectedFilter==='all'||p.category===selectedFilter)&&`${p.name} ${p.description} ${p.categoryLabel}`.toLocaleLowerCase('es').includes(query));grid.innerHTML=filtered.length?filtered.map((p,i)=>`<article class="product-card"><div class="product-image ${p.category}"><span class="product-label">${p.badge}</span><span class="product-number">0${i+1} / 06</span>${artwork(p)}</div><div class="product-info"><div class="product-topline"><h3>${p.name}</h3><span>${p.code}</span></div><p class="product-description">${p.description}</p><div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="add-button" data-product="${p.name}" aria-label="Agregar ${p.name} al carrito">Agregar <span>+</span></button></div></div></article>`).join(''):'<div class="empty-state">No encontramos ese producto. <a href="#contacto">Pregúntanos por WhatsApp ↗</a></div>'}
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2300)}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');button.classList.add('active');selectedFilter=button.dataset.filter;renderProducts()}));
searchInput.addEventListener('input',renderProducts);
grid.addEventListener('click',event=>{const button=event.target.closest('.add-button');if(!button)return;cartCount++;countEl.textContent=cartCount;showToast(`${button.dataset.product} agregado a tu carrito`)});
document.getElementById('cartButton').addEventListener('click',()=>showToast(cartCount?`Tienes ${cartCount} producto${cartCount===1?'':'s'} en tu carrito. Escríbenos para coordinar tu compra.`:'Tu carrito está esperando una buena idea.'));
const menuToggle=document.getElementById('menuToggle');
menuToggle.addEventListener('click',()=>{const nav=document.querySelector('.main-nav'),open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('.main-nav').classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
renderProducts();
