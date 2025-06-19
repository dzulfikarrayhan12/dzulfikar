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
  "BACARDI SUPERIOR\nRum putih legendaris asal Karibia yang menjadi simbol kesegaran dan keanggunan sejak tahun 1862.\nDisaring hati-hati dan disimpan dalam tong kayu oak selama 1-2 tahun, menghadirkan rasa ringan, bersih, dan halus.\nCocok untuk koktail klasik seperti Mojito, Daiquiri, atau Cuba Libre.",
  "HEINEKEN\nBir lager asal Belanda yang dikenal global sejak tahun 1873.\nWarna keemasan jernih dengan rasa segar, keseimbangan pahit dan manis, pilihan utama penikmat bir dunia.",
  "CORONA EXTRA\nBir pale lager ringan asal Meksiko yang terkenal dengan cita rasa segar dan bersih.\nDisajikan terbaik dengan irisan jeruk nipis di mulut botol, cocok untuk suasana santai, pantai, atau pesta barbekyu.\nDiproduksi sejak tahun 1925 dengan bahan pilihan seperti air murni, malt barley, jagung, dan hop.",
  "BAILEYS\nLikuer krim Irlandia paling terkenal di dunia, memadukan krim susu segar dengan whiskey Irlandia dan sentuhan cokelat serta vanilla.\nDikenal karena tekstur lembut dan rasa manis kaya, menghadirkan kenikmatan elegan di setiap tegukan.",
  "CAMPARI\nMinuman aperitif berwarna merah cerah legendaris, diciptakan di Italia tahun 1860.\nDikenal dengan rasa pahit khas dan aroma herbal kompleks, dibuat dari infusi rahasia lebih dari 60 bahan alami.",
  "JOHNNIE WALKER RED LABEL\nBlended Scotch whisky terkenal dengan rasa kuat, tajam, dan berani.\nDiciptakan untuk dicampur dan dinikmati berbagai gaya, dengan aroma smoky, manis, dan pedas.",
  "JACK DANIEL’S OLD NO. 7\nWhiskey khas Tennessee sejak 1866.\nDibuat dari campuran jagung, barley, dan gandum pilihan, disaring perlahan dengan arang maple untuk rasa lembut dan kaya.",
  "VODKA\nMinuman beralkohol murni disuling dari gandum, jagung, atau kentang.\nMemiliki karakter bersih, netral, dan halus, fleksibel untuk berbagai koktail klasik maupun modern.",
  "SMIRNOFF NO. 21\nVodka terlaris di dunia dengan rasa bersih, halus, dan serbaguna.\nDisuling tiga kali dan disaring sepuluh kali dengan arang aktif, menghasilkan kejernihan dan finish lembut.",
  "ANGGUR MERAH\nMinuman beralkohol yang terbuat dari fermentasi buah anggur merah.\nMemiliki rasa kaya, aroma buah dan rempah yang khas, cocok untuk dinikmati dalam berbagai kesempatan.",
  "ROKOK SURYA\nMerek rokok terkenal di Indonesia dengan rasa khas dan kualitas tembakau yang konsisten.\nPopuler di kalangan perokok karena cita rasa kuat dan aroma yang khas.",
  "PLAYSTATION 4 (PS4)\nKonsol game generasi kedelapan dari Sony.\nMenawarkan grafis tajam dan koleksi game eksklusif yang luas, ideal untuk gamer kasual maupun hardcore.",
  "PLAYSTATION 5 (PS5)\nKonsol game generasi terbaru dengan performa tinggi dan SSD ultra cepat.\nMendukung grafis 4K dan fitur haptic feedback yang membuat pengalaman bermain lebih imersif.",
  "IPAD PRO\nTablet premium dari Apple dengan layar Liquid Retina yang tajam dan prosesor M1.\nCocok untuk kreativitas, produktivitas, dan hiburan dengan dukungan Apple Pencil dan Magic Keyboard.",
  "LAPTOP ASUS ROG\nLaptop gaming andalan dengan spesifikasi tinggi dan desain agresif.\nDilengkapi kartu grafis kuat dan sistem pendingin canggih untuk performa maksimal saat bermain game berat.",
  "LA PURPLE\nRokok dengan rasa unik dan aroma khas buah anggur yang menyegarkan.\nMemberikan sensasi smooth dengan aftertaste manis, populer di kalangan perokok muda dan pencinta rasa berbeda."
];

  
const prices = [
  300000, // BAJU OVERSIZE WASHED
  250000, // BAJU OVERSIZE PUTIH 420
  50000,  // BAHAN ORGANIC
  500000, // HOODIE
  350000, // HOODIE
  120000, // BAJU CHAMCINA
  150000, // HOODIE KUNING
  180000, // HOODIE MERAH
  120000, // HOODIE HIJAU
  200000, // HOODIE HITAM
  290000, // BACARDI
  36000,  // HEINEKEN
  65000,  // CORONA EXTRA
  200000, // BAILEYS
  699000, // CAMPARI
  319000, // JOHNNIE WALKER RED LABEL
  469000, // JACK DANIEL'S
  294000, // VODKA
  230000, // SMIRNOFF
  75000,  // ANGGUR MERAH
  30000,  // ROKOK SURYA
  3500000, // PS4
  7000000, // PS5
  15500000, // iPad Pro
  18000000,  // Laptop ROG
350000 //LA Purple
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
  for (let i = 1; i <= 26; i++) {
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
    button.className = 'mt-auto bg-green-800 hover:bg-green-700 text-black font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2 relative';
    button.innerHTML = '<i class="ri-shopping-cart-line absolute left-4"></i><span>Tambah ke Keranjang</span>';

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

