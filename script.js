let products = JSON.parse(localStorage.getItem('shopkart') || JSON.stringify([
  { name:"iPhone 13", cat:"mobile", price:35000, img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", seller:"Nivetha - Chennai" },
  { name:"Yamaha FZ Bike", cat:"bike", price:75000, img:"https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400", seller:"Kumar - Madurai" },
  { name:"Nike Shoes", cat:"fashion", price:1800, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", seller:"Priya - Coimbatore" },
  { name:"Wooden Study Table", cat:"home", price:4500, img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400", seller:"Ravi - Trichy" },
  { name:"Samsung Galaxy S21", cat:"mobile", price:22000, img:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", seller:"Divya - Salem" },
  { name:"Leather Jacket", cat:"fashion", price:2500, img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", seller:"Arun - Chennai" }
]));

let cart = [];
let currentFilter = 'all';

function save(){
  localStorage.setItem('shopkart', JSON.stringify(products));
}

function showProducts(list){
  let box = document.getElementById('productList');
  if(list.length === 0){
    box.innerHTML = '<p style="text-align:center">No products found!</p>';
    return;
  }
  box.innerHTML = list.map((p, idx) => {
    let realIndex = products.indexOf(p);
    return `
    <div class="card">
      <button class="del-btn" onclick="deleteProduct(${realIndex})">✖</button>
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>Seller: ${p.seller}</p>
      <div class="price">₹${p.price.toLocaleString('en-IN')}</div>
      <button class="buy-btn-card" onclick="addToCart(${realIndex})">Add to Cart</button>
    </div>
  `}).join('');
}

function filterProduct(cat){
  currentFilter = cat;
  if(cat === 'all') showProducts(products);
  else showProducts(products.filter(p => p.cat === cat));
}

function searchProduct(){
  let q = document.getElementById('search').value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(q));
  if(currentFilter !== 'all') filtered = filtered.filter(p => p.cat === currentFilter);
  showProducts(filtered);
}

function addProduct(){
  let name = document.getElementById('pName').value.trim();
  let price = document.getElementById('pPrice').value;
  let img = document.getElementById('pImg').value.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400';
  let cat = document.getElementById('pCat').value;
  let seller = document.getElementById('pSeller').value.trim() || 'You';

  if(!name || !price){ alert('Please enter Name and Price!'); return; }

  products.unshift({ name, cat, price: parseInt(price), img, seller });
  save();
  showProducts(products);
  alert('Your product posted for sale!');

  document.getElementById('pName').value='';
  document.getElementById('pPrice').value='';
  document.getElementById('pImg').value='';
  document.getElementById('pSeller').value='';
}

function deleteProduct(i){
  if(confirm('Remove this product?')){
    products.splice(i,1);
    save();
    showProducts(products);
  }
}

function addToCart(i){
  cart.push(products[i]);
  document.getElementById('cartCount').innerText = cart.length;
  alert(products[i].name + ' added to cart!');
}

function showCart(){
  document.getElementById('cartBox').style.display='block';
  let div = document.getElementById('cartItems');
  if(cart.length===0){
    div.innerHTML='<p>Cart is empty!</p>';
    document.getElementById('total').innerText='Total: ₹0';
    return;
  }
  div.innerHTML = cart.map((c,i)=>`
    <div class="cart-item"><span>${c.name}</span><span>₹${c.price} <b style="color:red;cursor:pointer" onclick="removeItem(${i})">✖</b></span></div>
  `).join('');
  let total = cart.reduce((s,c)=>s+c.price,0);
  document.getElementById('total').innerText = 'Total: ₹' + total.toLocaleString('en-IN');
}

function removeItem(i){
  cart.splice(i,1);
  document.getElementById('cartCount').innerText = cart.length;
  showCart();
}

function hideCart(){
  document.getElementById('cartBox').style.display='none';
}

function placeOrder(){
  let name = document.getElementById('buyerName').value.trim();
  let addr = document.getElementById('buyerAddress').value.trim();
  if(cart.length===0){ alert('Cart empty!'); return; }
  if(!name || !addr){ alert('Enter Name and Address'); return; }
  document.getElementById('orderMsg').innerText = `Thank you ${name}! Order placed. Seller will contact you soon 🎉`;
  cart=[];
  document.getElementById('cartCount').innerText=0;
  setTimeout(()=>{ hideCart(); }, 3000);
}

showProducts(products);
