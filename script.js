document.addEventListener("DOMContentLoaded", function () {
  // ========================
  // SEMBUNYIKAN ELEMEN #han-part SAAT SCROLL DAN MUNCUL LAGI SETELAH 1 DETIK
  // ========================
  const hanPart = document.getElementById('han-part');
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    if (!hanPart) return;
    hanPart.classList.add('hidden');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      hanPart.classList.remove('hidden');
    }, 1000);
  });


// TOGGLE PASSWORD VISIBILITY
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const parent = input.parentElement;
  if (!parent) return;

  const icon = parent.querySelector('i.ri-eye-line, i.ri-eye-off-line');
  if (!icon) return;

  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';

  icon.className = isPassword
    ? 'ri-eye-off-line absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 cursor-pointer'
    : 'ri-eye-line absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 cursor-pointer';
}

// SIDEBAR TOGGLE
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeSidebar = document.getElementById('closeSidebar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.remove('-translate-x-full');
  sidebarOverlay.classList.remove('hidden');
});

closeSidebar.addEventListener('click', () => {
  sidebar.classList.add('-translate-x-full');
  sidebarOverlay.classList.add('hidden');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.add('-translate-x-full');
  sidebarOverlay.classList.add('hidden');
});

// MODAL LOGIN / REGISTER
const loginModal = document.getElementById('loginModal');
const userBtn = document.getElementById('userBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegisterBtn = document.getElementById('switchToRegisterBtn');
const switchToLoginBtn = document.getElementById('switchToLoginBtn');
const typedEl = document.getElementById('typed');

let isRegister = false;

const texts = {
  login: 'Silahkan daftar jika belum punya akun',
  register: 'Silahkan login jika sudah punya akun'
};

// Efek ketik loop
let typingInterval;
let resetTimeout;
let i = 0;
function typeText(text) {
  if (!typedEl) return;
  clearInterval(typingInterval);
  clearTimeout(resetTimeout);
  i = 0;
  typedEl.textContent = '';
  typingInterval = setInterval(() => {
    if (i < text.length) {
      typedEl.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      resetTimeout = setTimeout(() => {
        typedEl.textContent = '';
        i = 0;
        typeText(text);
      }, 3500);
    }
  }, 90);
}

// Buka modal login
userBtn.addEventListener('click', () => {
  loginModal.classList.remove('hidden');
  loginModal.classList.add('flex');
  isRegister = false;
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
  typeText(texts.login);
});

// Tutup modal
closeModalBtn.addEventListener('click', () => {
  loginModal.classList.add('hidden');
  loginModal.classList.remove('flex');
  loginForm.reset();
  registerForm.reset();
  typedEl.textContent = '';
});

// Switch ke register
switchToRegisterBtn.addEventListener('click', () => {
  isRegister = true;
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
  typeText(texts.register);
});

// Switch ke login
switchToLoginBtn.addEventListener('click', () => {
  isRegister = false;
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  typeText(texts.login);
});

// Handle login form submit
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value;

  if (!username || !password) {
    alert('Isi username dan password');
    return;
  }

  alert(`Login berhasil: ${username}`);
  loginModal.classList.add('hidden');
  loginModal.classList.remove('flex');
  loginForm.reset();
});

// Handle register form submit
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = registerForm.username.value.trim();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value;
  const confirmPassword = registerForm.confirmPassword.value;

  if (!username || !email || !password || !confirmPassword) {
    alert('Lengkapi semua data');
    return;
  }

  if (password !== confirmPassword) {
    alert('Password tidak sama');
    return;
  }

  alert(`Register berhasil: ${username}, email: ${email}`);
  loginModal.classList.add('hidden');
  loginModal.classList.remove('flex');
  registerForm.reset();
});

  // ========================
  // TOGGLE VISIBILITAS PASSWORD
  // ========================


  // ========================
  // PRODUK & KERANJANG
  // ========================
const container = document.getElementById('product-container');
const cartCount = document.getElementById('cart-count');

// Produk Deskripsi (65 Item)
const descriptions = [
  "Ukuran: XL",
  "Ukuran : XL",
  "Ukuran :XL",
  "UKURAN: XL",
  "UKURAN: XL",
  "UKURAN: XL",
  "UKURAN: XL",
  "UKURAN: XL",
  "UKURAN: XL",
  "UKURAN: XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "UKURAN:XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "UKURAN:XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "ukuran : XL",
  "UKURAN:XL",

    "UKURAN:XL",
    "UKURAN:XL",
  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",
  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",
   "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
"UKURAN:XL",
 "UKURAN:XL", "UKURAN:XL", "UKURAN:XL", "UKURAN:XL", "UKURAN:XL", "UKURAN:XL", "UKURAN:XL", "UKURAN:XL", "UKURAN:XL", "UKURAN:XL", "UKURAN:XL","UKURAN:XL","UKURAN:XL",
  "UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL",
 "UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL",
 "UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL",
 "UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL",
 
 "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
    "UKURAN:XL",

    "UKURAN:XL","UKURAN:XL",

     "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",

  "UKURAN:XL",
  
 "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  
  "UKURAN:XL",
  "UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL",
  "UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL","UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",  "UKURAN:XL",
    "UKURAN:XL",  "UKURAN:XL",
  
  

 
];

// Harga Produk (65 Item)
const prices = [
  500000,500000,380000,700000,850000,720000,150000,180000, 120000,200000, 
  890000,836000, 450000, 900000, 699000, 419000, 659000, 794000, 1430000, 1750000,
  500000, 750000, 700000, 555000, 780000, 675000, 760000, 800000, 1000000,  
  1000000, 1000000, 1000000, 1000000, 
  1000000, 1000000, 1000000, 1000000, 
  1000000, 1000000, 1000000, 1000000,   
  1000000, 1000000, 1000000, 1000000, 
  1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000,   
1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 
 
          
];


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("checkout")) || [];
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  if (cartCount) {
    cartCount.textContent = totalQty > 0 ? totalQty : '';
    cartCount.style.display = totalQty > 0 ? "flex" : "none";
  }
}

if (container) {
  container.innerHTML = '';
  for (let i = 1; i <= 428; i++) {
    const productDiv = document.createElement('div');
    productDiv.className = 'bg-white p-4 rounded-lg shadow flex flex-col';

    const img = document.createElement('img');
    img.src = `images/${i}.jpg`;
    img.alt = `Produk ${i}`;
    img.className = 'w-full h-[420px] object-contain rounded-md mb-2 bg-white';

    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold mb-1';
    title.textContent = `Produk ${i}`;

    const desc = document.createElement('p');
    desc.className = 'text-gray-600 text-sm mb-2';
    desc.innerHTML = descriptions[(i - 1) % descriptions.length].replace(/\n/g, "<br>");

    const price = document.createElement('div');
    price.className = 'text-black-500 font-bold mb-4';
    price.textContent = 'Rp' + prices[i - 1].toLocaleString('id-ID');

    const button = document.createElement('button');
   
   button.className = 'mt-auto bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2 relative';
button.innerHTML = '<i class="ri-box-3-line absolute left-4"></i><span>Tambah ke Keranjang</span>';


    button.addEventListener('click', () => {
      const item = {
        title: title.textContent,
        desc: desc.innerText, // penting! agar teks <br> dihitung 2 baris
        price: price.textContent,
        image: img.src,
        qty: 1
      };
      const cart = JSON.parse(localStorage.getItem("checkout")) || [];
      const existing = cart.find(p => p.title === item.title);
      existing ? existing.qty += 1 : cart.push(item);
      localStorage.setItem("checkout", JSON.stringify(cart));
      updateCartCount();
    });

    productDiv.append(img, title, desc, price, button);
    container.appendChild(productDiv);
  }
}

updateCartCount();

document.getElementById("checkout-btn")?.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("checkout")) || [];
  if (cart.length === 0) return alert("Keranjang kosong.");
  window.location.href = "checkout.html";
});


  // ========================
  // HALAMAN CHECKOUT
  // ========================
  const checkoutList = document.getElementById('checkout-list');
  const totalPriceElement = document.getElementById('total-price');
  let cart = JSON.parse(localStorage.getItem('checkout')) || [];

  function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (parseInt(item.price.replace(/\D/g, '')) || 0) * (item.qty || 1), 0);
    totalPriceElement.textContent = `Rp${total.toLocaleString('id-ID')}`;
  }

  function saveCart() {
    localStorage.setItem('checkout', JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    if (!checkoutList || !totalPriceElement) return;
    checkoutList.innerHTML = '';
    if (cart.length === 0) {
      checkoutList.innerHTML = `<div class="text-center text-gray-500 mt-10">Keranjang kosong.</div>`;
      totalPriceElement.textContent = 'Rp0';
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded-lg shadow flex items-center gap-4';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded" />
        <div class="flex-1">
          <h3 class="text-md font-semibold">${item.title}</h3>
          <p class="text-sm text-gray-500">${item.desc}</p>
          <p class="text-orange-500 font-bold mt-1">${item.price}</p>
          <div class="flex items-center gap-2 mt-2">
            <button class="text-white bg-gray-400 hover:bg-gray-600 px-2 py-1 rounded" onclick="changeQty(${index}, -1)">-</button>
            <span class="px-3">${item.qty || 1}</span>
            <button class="text-white bg-gray-700 hover:bg-gray-900 px-2 py-1 rounded" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700"><i class="ri-delete-bin-line text-xl"></i></button>
      `;
      checkoutList.appendChild(div);
    });
    updateTotal();
  }

  window.changeQty = function (index, delta) {
    if (!cart[index]) return;
    cart[index].qty = (cart[index].qty || 1) + delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    saveCart();
    updateCartCount();
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
  };

  document.getElementById("pay-btn")?.addEventListener("click", () => {
    if (cart.length === 0) return alert("Keranjang kosong.");
    const name = document.getElementById("name")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const method = document.getElementById("payment-method")?.value;
    const note = document.getElementById("note")?.value.trim();

    if (!name || !address || !phone || !method) return alert("Mohon lengkapi semua data pembayaran.");

    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
      items: cart,
      total: totalPriceElement.textContent,
      time: new Date().toLocaleString(),
      status: "Belum Dibayar",
      customer: { name, address, phone, method, note }
    });

    localStorage.setItem("history", JSON.stringify(history));
    localStorage.removeItem("checkout");
    alert("Pesanan berhasil disimpan. Kami akan menghubungi Anda segera.");
    window.location.href = "index.html";
  });

  renderCart();
});

// Jika sudah di halaman checkout.html, render cart dan update count langsung
if (window.location.pathname.includes("checkout.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    // Karena renderCart dan updateCartCount dideklarasikan dalam scope DOMContentLoaded,
    // kita buat fungsi ulang untuk render di sini agar tidak error
    const checkoutList = document.getElementById('checkout-list');
    const totalPriceElement = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('checkout')) || [];

    function updateCartCount() {
      const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      if (cartCount) {
        cartCount.textContent = totalQty > 0 ? totalQty : '';
        cartCount.style.display = totalQty > 0 ? "flex" : "none";
      }
    }

    function updateTotal() {
      let total = 0;
      cart.forEach(item => {
        const price = parseInt(item.price.replace(/\D/g, '')) || 0;
        total += price * (item.qty || 1);
      });
      if (totalPriceElement) {
        totalPriceElement.textContent = `Rp${total.toLocaleString('id-ID')}`;
      }
    }

    function renderCart() {
      if (!checkoutList || !totalPriceElement) return;

      checkoutList.innerHTML = '';
      if (cart.length === 0) {
        checkoutList.innerHTML = `<div class="text-center text-gray-500 mt-10">Keranjang kosong.</div>`;
        totalPriceElement.textContent = 'Rp0';
        return;
      }

      cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'bg-white p-4 rounded-lg shadow flex items-center gap-4';

        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain rounded" />
          <div class="flex-1">
            <h3 class="text-md font-semibold">${item.title}</h3>
            <p class="text-sm text-gray-500">${item.desc}</p>
            <p class="text-orange-500 font-bold mt-1">${item.price}</p>
            <div class="flex items-center gap-2 mt-2">
              <button class="text-white bg-gray-400 hover:bg-gray-600 px-2 py-1 rounded" onclick="changeQty(${index}, -1)">-</button>
              <span class="px-3">${item.qty || 1}</span>
              <button class="text-white bg-gray-700 hover:bg-gray-900 px-2 py-1 rounded" onclick="changeQty(${index}, 1)">+</button>
            </div>
          </div>
          <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700"><i class="ri-delete-bin-line text-xl"></i></button>
        `;
        checkoutList.appendChild(div);
      });

      updateTotal();
    }

    window.changeQty = function (index, delta) {
      if (!cart[index]) return;
      cart[index].qty = (cart[index].qty || 1) + delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem('checkout', JSON.stringify(cart));
      renderCart();
      updateCartCount();
    };

    window.removeItem = function (index) {
      cart.splice(index, 1);
      localStorage.setItem('checkout', JSON.stringify(cart));
      renderCart();
      updateCartCount();
    };

    renderCart();
    updateCartCount();
  });
}

// ========================

window.goBack = function () {
  window.location.href = "index.html";
};

function loadPage(page) {
    fetch(page)
      .then(res => {
        if(!res.ok) throw new Error('Gagal memuat halaman ' + page);
        return res.text();
      })
      .then(html => {
        document.getElementById('content').innerHTML = html;
      })
      .catch(err => {
        document.getElementById('content').innerHTML = `<p style="color:red;">${err.message}</p>`;
      });
  }

  // Fungsi untuk menutup sidebar (sesuaikan dengan logika toggle sidebar kamu)
  function closeSidebar() {
    document.getElementById('sidebar').classList.add('-translate-x-full');
  }

  // Contoh event tombol close sidebar
  document.getElementById('closeSidebar').addEventListener('click', closeSidebar);
