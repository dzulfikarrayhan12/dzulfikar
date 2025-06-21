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


   const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('closeSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  });
  
  // ========================
  // TOGGLE VISIBILITAS PASSWORD
  // ========================
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eyeIcon');

  togglePassword?.addEventListener('click', () => {
    if (!passwordInput) return;
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    eyeIcon.className = type === 'password' ? 'ri-eye-line text-xl' : 'ri-eye-off-line text-xl';
  });

  // ========================
  // MODAL LOGIN / REGISTER
  // ========================
  const loginModal = document.getElementById('loginModal');
  const toggleBtn = document.getElementById('toggleBtn');
  const modalTitle = document.getElementById('modalTitle');
  const emailInput = document.getElementById('email');
  const emailContainer = document.getElementById('emailContainer');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const submitBtn = document.getElementById('submitBtn');
  const userBtn = document.getElementById('userBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const typedEl = document.getElementById('typed');

  let isRegister = false;
  const texts = {
    login: 'silahkan daftar jika belum punya akun',
    register: 'silahkan login jika sudah punya akun'
  };

  // Efek teks ketik
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

  // Toggle antar form login dan register
  toggleBtn?.addEventListener('click', () => {
    isRegister = !isRegister;
    modalTitle.textContent = isRegister ? 'Register' : 'Login';
    emailContainer.classList.toggle('hidden', !isRegister);
    confirmPasswordInput?.classList.toggle('hidden', !isRegister);
    submitBtn.querySelector('i').className = isRegister ? 'ri-user-add-line' : 'ri-login-box-line';
    submitBtn.querySelector('span').textContent = isRegister ? 'Register' : 'Login';
    toggleBtn.textContent = isRegister ? 'Login' : 'Register';
    emailInput.required = isRegister;
    typeText(isRegister ? texts.register : texts.login);
  });

  userBtn?.addEventListener('click', () => {
    loginModal?.classList.remove('hidden');
    loginModal?.classList.add('flex');
    typeText(texts.login);
  });

  closeModalBtn?.addEventListener('click', () => {
    loginModal?.classList.add('hidden');
    loginModal?.classList.remove('flex');
    isRegister = false;
    modalTitle.textContent = 'Login';
    emailContainer.classList.add('hidden');
    confirmPasswordInput?.classList.add('hidden');
    submitBtn.querySelector('i').className = 'ri-login-box-line';
    submitBtn.querySelector('span').textContent = 'Login';
    toggleBtn.textContent = 'Register';
    emailInput.required = false;
  });

  // ========================
  // HANDLE SUBMIT FORM LOGIN / REGISTER
  // ========================
  const authForm = document.getElementById('authForm');
  authForm?.addEventListener('submit', e => {
    e.preventDefault();

    const username = authForm.username.value.trim();
    const password = authForm.password.value;
    const email = authForm.email.value.trim();
    const confirmPassword = authForm.confirmPassword.value;

    if (!username || !password || (isRegister && (!email || password !== confirmPassword))) {
      alert("Pastikan semua data terisi dan password sesuai.");
      return;
    }

    alert(isRegister ? `Register berhasil untuk user: ${username}, email: ${email}` : `Login berhasil untuk user: ${username}`);
    authForm.reset();
  });

  const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegisterBtn = document.getElementById('switchToRegisterBtn');
const switchToLoginBtn = document.getElementById('switchToLoginBtn'); // pastikan ini ada di form register

switchToRegisterBtn.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

switchToLoginBtn.addEventListener('click', () => {
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});


  // ========================
  // PRODUK & KERANJANG
  // ========================
const container = document.getElementById('product-container');
const cartCount = document.getElementById('cart-count');

// Produk Deskripsi (65 Item)
const descriptions = [
  "BAJU OVERSIZE WASHED\nUKURAN: XL",
  "BAJU OVERSIZE PUTIH 420\nUKURAN: XL",
  "BAHAN ORGANIC, PANJANG 1 1/4\nORIGINAL IMPOR",
  "HOODIE\nUKURAN: XL",
  "HOODIE\nUKURAN: XL",
  "BAJU CHAMCINA SO FREE\nUKURAN: XL",
  "HOODIE KUNING POLOS\nUKURAN: XL",
  "HOODIE MERAH POLOS\nUKURAN: XL",
  "HOODIE HIJAU POLOS\nUKURAN: XL",
  "HOODIE HITAM POLOS\nUKURAN: XL",
  "BACARDI SUPERIOR\nRum putih legendaris asal Karibia. Rasa ringan dan halus, cocok untuk koktail klasik.",
  "HEINEKEN\nBir lager asal Belanda, warna keemasan, rasa seimbang dan segar.",
  "CORONA EXTRA\nBir ringan dari Meksiko. Diminum dengan irisan jeruk nipis, cocok untuk suasana santai.",
  "BAILEYS\nLikuer krim Irlandia yang manis dan lembut, rasa cokelat dan vanilla.",
  "CAMPARI\nAperitif merah khas Italia, rasa pahit dengan aroma herbal kompleks.",
  "JOHNNIE WALKER RED LABEL\nBlended whisky tajam, smoky, dan berani.",
  "JACK DANIEL’S OLD NO. 7\nWhiskey Tennessee lembut dengan aroma khas arang maple.",
  "VODKA\nMinuman netral, bersih dan fleksibel untuk semua jenis koktail.",
  "SMIRNOFF NO. 21\nVodka bersih, disuling 3 kali dan disaring 10 kali.",
  "ANGGUR MERAH\nMinuman fermentasi anggur, rasa kaya dan aroma rempah.",
  "ROKOK SURYA\nTembakau lokal berkualitas, rasa kuat dan aroma khas.",
  "PLAYSTATION 4 (PS4)\nKonsol game Sony generasi ke-8 dengan grafis tajam.",
  "PLAYSTATION 5 (PS5)\nKonsol next-gen, grafis 4K dan loading super cepat.",
  "IPAD PRO\nTablet premium Apple dengan layar retina dan Apple Pencil.",
  "LAPTOP ASUS ROG\nLaptop gaming ekstrem dengan performa tinggi dan pendinginan canggih.",
  "LA PURPLE\nRokok rasa anggur dengan aroma segar dan aftertaste manis.",
  "Mie Samyang.",
  "pembersih lantai.",
  "super pell",
  "tisue",
  "vixal",
  "biskuit regal",
  "susu frisianflag",
  "rinso",
  "susu frisianflag cocopandan",
  "molto",
  "susu ultra",
  "kopi good day",
  "shampoe pantene",
  "pepsodent herbal",
  "meses ceres",
  "pepsodent",
  "deterjen daia lemon",
  "indomie rendang",
  "sambal abc",
  "indomie aceh",
  "gulaku",
  "bimoli",
  "kecap bango",
  "garam",
  "sari gandum",
  "chocolatos",
  "kokokrunch",
  "chocolatos dark",
  "kitkat",
  "pringles spicy",
  "doritos",
  "pepsi",
  "coca cola",
  "monster energy",
  "aqua",
  "minyak kayu putih",
  "tolak angin",
  "le minerale",
  "sprite",
  "hpsamsung",
  "hpvivo",
  "hpvivo",
  "hpvivo",
  "hpvivo",
  "hpvivo",
  "hpvivo",
  "hpvivo",
  "hpvivo",
  "hpvivo",
  "hpvivo",
  "hpvivo",

];

// Harga Produk (65 Item)
const prices = [
  300000, 250000, 50000, 500000, 350000, 120000, 150000, 180000, 120000, 200000, // 1–10
  290000, 36000, 65000, 200000, 699000, 319000, 469000, 294000, 230000, 75000,   // 11–20
  30000, 3500000, 7000000, 15500000, 18000000, 35000, 10000, 18000, 20000,    // 21–30
  15000, 25000, 10000, 16000, 12000, 16000, 10000, 8000, 5000,        // 31–39
  18000, 19000, 12000, 19000, 15000, 5000, 8000, 5000, 30000,        // 40–48
  26000, 6000, 5000, 10000, 15000, 30000, 18000, 10000, 15000,        // 49–57
  10000, 30000, 30000, 35000, 10000, 8000, 2000, 8000, 10000, 45000, 50000, 
  50000,  50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000,50000,50000, 50000, 50000, 50000, 50000, 50000, 50000,  50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000,  50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000,             // 58–65
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
  for (let i = 1; i <= 1000; i++) {
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
    button.className = 'mt-auto bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2 relative';
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
