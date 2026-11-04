const WHATSAPP_NUMBER = "912132881"; // CAMBIA ESTE NÚMERO por tu WhatsApp con código de país.

const products = [
  {id:1,name:"Akuma Ramones Rock",category:"Bandas de Rock",price:25,image:"assets/products/0.11.jpg",description:"Polo negro de estética oscura, minimalista y urbana. Ideal para combinar con cualquier outfit."},
  {id:2,name:"Akuma Slipknot Rock",category:"Bandas de Rock",price:25,image:"assets/products/0.2.jpg",description:"Diseño inspirado en la energía de los protagonistas del rock. Una pieza llamativa para tu colección."},
  {id:3,name:"Akuma Red hot Chilepepers",category:"Bandas de Rock",price:25,image:"assets/products/0.3.jpg",description:"Estética manga en alto contraste, pensada para un look limpio y oscuro de la mejor banda de rock."},
  {id:4,name:"Akuma ACDC Rock",category:"Bandas de Rock",price:25,image:"assets/products/0.4.jpg",description:"Edición con acentos rojos y una presencia más agresiva. Perfecto para destacar."},
  {id:5,name:"Akuma Gorillaz rock",category:"Bandas de Rock",price:25,image:"assets/products/0.5.jpg",description:"Gorillaz polo urbano con inspiración nocturna y una de la mejores bandas de rock."},
  {id:6,name:"Akuma Led-zeppelin rock",category:"Bandas de Rock",price:25,image:"assets/products/0.6.JPG",description:"Diseño inspirado en la estética oni, con una composición intensa y moderna."},
  {id:7,name:"Akuma Irom Made rock",category:"Bandas de Rock",price:25,image:"assets/products/0.7.jpg",description:"Gráfica tipo panel de manga para quienes prefieren una estética monocromática."},
  {id:8,name:"Moreno Locaso",category:"Bandas de Rock",price:25,image:"assets/products/0.8.jpg",description:"Edición premium con identidad morada y detalles de alto contraste."},
  {id:9,name:"Akuma Rengoku",category:"Anime",price:25,image:"assets/products/0.10.jpg",description:"Edición premium con identidad de rengoku y detalles de alto contraste."},
  {id:10,name:"Akuma los pilares",category:"Anime",price:25,image:"assets/products/0.12.jpg",description:"Edición premium con identidad de los pilares y detalles de alto contraste."},
  {id:11,name:"Akuma Broly",category:"Anime",price:25,image:"assets/products/0.13.jpg",description:"Edición premium con el guerrero legendario broly y detalles de alto contraste."},
  {id:12,name:"Akuma Satoru gojo",category:"Anime",price:25,image:"assets/products/0.14.jpg",description:"Edición premium con el hechicero satoru gojo y detalles de alto contraste."},
  {id:13,name:"Akuma One Piece Zoro",category:"Anime",price:25,image:"assets/products/0.16.jpg",description:"Edición premium Anime Naruto Shippuden y detalles de alto contraste."},
  {id:14,name:"Akuma Luffy niño",category:"Anime",price:25,image:"assets/products/0.17.jpg",description:"Edición premium Anime El rey de los piratas y detalles de alto contraste."},
  {id:15,name:"Akuma One Piece",category:"Anime",price:25,image:"assets/products/0.18.jpg",description:"Edición premium Anime One Piece y detalles de alto contraste."},
  {id:16,name:"Akuma Tanjiro",category:"Anime",price:25,image:"assets/products/0.19.jpg",description:"Edición premium Anime Tanjiro Kamado y detalles de alto contraste."},
  {id:17,name:"Akuma Gear 5",category:"Anime",price:25,image:"assets/products/0.21.jpg",description:"Edición premium Anime Gear 5 y detalles de alto contraste."},
  {id:18,name:"Akuma thundercats",category:"Anime",price:25,image:"assets/products/0.20.jpg",description:"Edición premium Anime thundercats y detalles de alto contraste."},
  {id:19,name:"Akuma Pilar Aire",category:"Anime",price:25,image:"assets/products/0.22.jpg",description:"Edición premium Anime pilar de aire y detalles de alto contraste."}
]; 

let cart = JSON.parse(localStorage.getItem("akuma_cart") || "[]");
let favorites = JSON.parse(localStorage.getItem("akuma_favorites") || "[]");
let currentProduct = null;
let modalQty = 1;
let selectedSize = "M";
let selectedColor = "Negro";
let activeCategory = "Todos";

const $ = id => document.getElementById(id);
const money = n => `S/ ${Number(n).toFixed(2)}`;

function save(){
  localStorage.setItem("akuma_cart", JSON.stringify(cart));
  localStorage.setItem("akuma_favorites", JSON.stringify(favorites));
  updateCounts();
}

function updateCounts(){
  $("cartCount").textContent = cart.reduce((s,i)=>s+i.qty,0);
  $("favCount").textContent = favorites.length;
}

function toast(msg){
  const t=$("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.classList.remove("show"),2200);
}

function renderProducts(){
  const query=$("searchInput").value.trim().toLowerCase();
  const list=products.filter(p=>{
    const categoryOk=activeCategory==="Todos" || p.category===activeCategory;
    const text=(p.name+" "+p.category+" "+p.description).toLowerCase();
    return categoryOk && text.includes(query);
  });
  $("productGrid").innerHTML=list.map(p=>{
    const liked=favorites.includes(p.id) ? "liked" : "";
    return `<article class="product-card">
      <button class="fav-card ${liked}" data-fav="${p.id}" aria-label="Favorito">${liked?"♥":"♡"}</button>
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="quick-view"><button data-view="${p.id}">VER PRODUCTO</button></div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category.toUpperCase()}</div>
        <h3>${p.name}</h3>
        <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="mini-add" data-add="${p.id}" title="Agregar">+</button></div>
      </div>
    </article>`;
  }).join("");
  $("emptyState").classList.toggle("hidden", list.length>0);
}

function openProduct(id){
  currentProduct=products.find(p=>p.id===Number(id));
  modalQty=1; selectedSize="M"; selectedColor="Negro";
  $("modalImage").src=currentProduct.image;
  $("modalImage").alt=currentProduct.name;
  $("modalCategory").textContent=currentProduct.category.toUpperCase();
  $("modalName").textContent=currentProduct.name;
  $("modalPrice").textContent=money(currentProduct.price);
  $("modalDescription").textContent=currentProduct.description;
  $("modalQty").textContent=modalQty;
  document.querySelectorAll("#sizeOptions button").forEach(b=>b.classList.toggle("selected",b.dataset.size==="M"));
  document.querySelectorAll("#colorOptions .color-dot").forEach(b=>b.classList.toggle("selected",b.dataset.color==="Negro"));
  $("modalFavBtn").classList.toggle("liked",favorites.includes(currentProduct.id));
  $("modalFavBtn").textContent=favorites.includes(currentProduct.id)?"♥":"♡";
  $("productModal").classList.remove("hidden");
}

function addToCart(product, qty=1, size="M", color="Negro"){
  const found=cart.find(i=>i.id===product.id && i.size===size && i.color===color);
  if(found) found.qty+=qty;
  else cart.push({id:product.id,name:product.name,price:product.price,image:product.image,qty,size,color});
  save(); toast(`${product.name} agregado al carrito`);
}

function renderCart(){
  const items=$("cartItems");
  $("cartEmpty").classList.toggle("hidden",cart.length!==0);
  $("cartFooter").classList.toggle("hidden",cart.length===0);
  items.innerHTML=cart.map((i,index)=>`
    <div class="cart-item">
      <img src="${i.image}" alt="${i.name}">
      <div>
        <h4>${i.name}</h4>
        <p>Talla ${i.size} • ${i.color}</p>
        <strong>${money(i.price*i.qty)}</strong>
        <div class="cart-item-actions">
          <button data-cart-minus="${index}">−</button><span>${i.qty}</span><button data-cart-plus="${index}">+</button>
          <button class="remove-item" data-cart-remove="${index}">×</button>
        </div>
      </div>
      <div></div>
    </div>`).join("");
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  $("cartTotal").textContent=money(total);
}

function openCart(){renderCart();$("cartBackdrop").classList.remove("hidden");$("cartDrawer").classList.add("open")}
function closeCart(){$("cartBackdrop").classList.add("hidden");$("cartDrawer").classList.remove("open")}

function toggleFavorite(id){
  id=Number(id);
  if(favorites.includes(id)) favorites=favorites.filter(x=>x!==id);
  else favorites.push(id);
  save(); renderProducts();
}

function checkout(){
  if(!cart.length){toast("Tu carrito está vacío");return}
  const lines=cart.map(i=>`• ${i.name} | Talla ${i.size} | ${i.color} | x${i.qty} | ${money(i.price*i.qty)}`);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const text=`Hola AKUMA STORE 👋%0AQuiero realizar este pedido:%0A%0A${lines.join("%0A")}%0A%0ATotal: ${money(total)}%0A%0ANombre:%0ADirección/distrito:%0A`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,"_blank");
}

document.addEventListener("click",e=>{
  const view=e.target.closest("[data-view]"); if(view) openProduct(view.dataset.view);
  const add=e.target.closest("[data-add]"); if(add) addToCart(products.find(p=>p.id===Number(add.dataset.add)));
  const fav=e.target.closest("[data-fav]"); if(fav) toggleFavorite(fav.dataset.fav);

  const filter=e.target.closest(".filter");
  if(filter){
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    filter.classList.add("active"); activeCategory=filter.dataset.category; renderProducts();
  }

  const jump=e.target.closest("[data-jump-category]");
  if(jump){
    activeCategory=jump.dataset.jumpCategory;
    document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.category===activeCategory));
    renderProducts(); $("tienda").scrollIntoView({behavior:"smooth"});
  }

  const size=e.target.closest("#sizeOptions button");
  if(size){selectedSize=size.dataset.size;document.querySelectorAll("#sizeOptions button").forEach(b=>b.classList.toggle("selected",b===size))}
  const color=e.target.closest("#colorOptions .color-dot");
  if(color){selectedColor=color.dataset.color;document.querySelectorAll("#colorOptions .color-dot").forEach(b=>b.classList.toggle("selected",b===color))}
  if(e.target.closest("[data-close]")) $("productModal").classList.add("hidden");
  if(e.target.id==="cartBtn") openCart();
  if(e.target.id==="closeCart" || e.target.id==="cartBackdrop") closeCart();
  if(e.target.id==="goShop"){closeCart();$("tienda").scrollIntoView({behavior:"smooth"})}
  if(e.target.id==="addToCartBtn"){addToCart(currentProduct,modalQty,selectedSize,selectedColor);$("productModal").classList.add("hidden");openCart()}
  if(e.target.id==="modalFavBtn"){toggleFavorite(currentProduct.id);$("modalFavBtn").classList.toggle("liked",favorites.includes(currentProduct.id));$("modalFavBtn").textContent=favorites.includes(currentProduct.id)?"♥":"♡"}
  if(e.target.id==="qtyMinus"){modalQty=Math.max(1,modalQty-1);$("modalQty").textContent=modalQty}
  if(e.target.id==="qtyPlus"){modalQty++;$("modalQty").textContent=modalQty}
  const cm=e.target.closest("[data-cart-minus]"); if(cm){const i=Number(cm.dataset.cartMinus);cart[i].qty=Math.max(1,cart[i].qty-1);save();renderCart()}
  const cp=e.target.closest("[data-cart-plus]"); if(cp){cart[Number(cp.dataset.cartPlus)].qty++;save();renderCart()}
  const cr=e.target.closest("[data-cart-remove]"); if(cr){cart.splice(Number(cr.dataset.cartRemove),1);save();renderCart()}
  if(e.target.id==="checkoutBtn") checkout();
  if(e.target.id==="menuBtn") $("mobileNav").classList.toggle("open");
  if(e.target.id==="favoritesBtn"){activeCategory="Todos";document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.category==="Todos"));$("searchInput").value="";toast(`Tienes ${favorites.length} favorito(s)`)}
});

$("searchInput").addEventListener("input",renderProducts);
$("contactWhatsapp").href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola AKUMA STORE, quiero consultar por sus polos.")}`;
$("year").textContent=new Date().getFullYear();
renderProducts(); updateCounts();
