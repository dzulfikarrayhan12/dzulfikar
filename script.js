document.addEventListener("DOMContentLoaded", () => {
  // ======================= [Utility] =======================
  const qs = id => document.getElementById(id);
  const show = el => el?.classList.remove('hidden');
  const hide = el => el?.classList.add('hidden');

  // ==================== [Scroll Hide Show] ====================
  const hanPart = qs('han-part');
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!hanPart) return;
    hanPart.classList.add('hidden');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => hanPart.classList.remove('hidden'), 1000);
  });

  // ==================== [Toggle Password] ====================
  window.togglePassword = function (id) {
    const input = qs(id);
    const icon = input?.parentElement?.querySelector('i');
    if (!input || !icon) return;
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    icon.className = isPw
      ? 'ri-eye-off-line absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 cursor-pointer'
      : 'ri-eye-line absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 cursor-pointer';
  };

  // ==================== [Sidebar Toggle] ====================
  ['menuBtn', 'sidebarOverlay', 'closeSidebar'].forEach(id => {
    qs(id)?.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      sidebarOverlay.classList.toggle('hidden');
    });
  });

  // ==================== [Modal Login/Register] ====================
  const loginModal = qs('loginModal');
  const loginForm = qs('loginForm');
  const registerForm = qs('registerForm');
  const typedEl = qs('typed');
  const texts = {
    login: 'Silahkan daftar jika belum punya akun',
    register: 'Silahkan login jika sudah punya akun'
  };
  let typingInterval, resetTimeout, i = 0;

  function typeText(text) {
    if (!typedEl) return;
    clearInterval(typingInterval); clearTimeout(resetTimeout);
    typedEl.textContent = ''; i = 0;
    typingInterval = setInterval(() => {
      typedEl.textContent += text.charAt(i++);
      if (i === text.length) {
        clearInterval(typingInterval);
        resetTimeout = setTimeout(() => typeText(text), 3500);
      }
    }, 90);
  }

  qs('userBtn')?.addEventListener('click', () => {
    show(loginModal); loginModal.classList.add('flex');
    show(loginForm); hide(registerForm); typeText(texts.login);
  });

  qs('closeModalBtn')?.addEventListener('click', () => {
    hide(loginModal); loginModal.classList.remove('flex');
    loginForm.reset(); registerForm.reset(); typedEl.textContent = '';
  });

  qs('switchToRegisterBtn')?.addEventListener('click', () => {
    hide(loginForm); show(registerForm); typeText(texts.register);
  });

  qs('switchToLoginBtn')?.addEventListener('click', () => {
    show(loginForm); hide(registerForm); typeText(texts.login);
  });

  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const { username, password } = loginForm;
    if (!username.value.trim() || !password.value) return alert('Isi username dan password');
    alert(`Login berhasil: ${username.value}`); hide(loginModal); loginForm.reset();
  });

  registerForm?.addEventListener('submit', e => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = registerForm;
    if (!username.value || !email.value || !password.value || !confirmPassword.value)
      return alert('Lengkapi semua data');
    if (password.value !== confirmPassword.value)
      return alert('Password tidak sama');
    alert(`Register berhasil: ${username.value}`); hide(loginModal); registerForm.reset();
  });

  // ==================== [Produk Generator + Keranjang] ====================
  const container = qs('product-container');
  const cartCount = qs('cart-count');
  const descriptions = ["Kameja Ukuran: XL", "Ukuran :XL", "HOODIE\nUKURAN: XL", "BAJU CHAMCINA SO FREE\nUKURAN: XL"];
  const prices = [500000, 380000, 700000, 720000, 150000, 180000, 120000];

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("checkout") || "[]");
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (cartCount) {
      cartCount.textContent = totalQty ? totalQty : '';
      cartCount.style.display = totalQty ? "flex" : "none";
    }
  }

  if (container) {
    container.innerHTML = '';
    for (let i = 1; i <= 20; i++) {
      const idx = (i - 1) % descriptions.length;
      const priceVal = prices[i % prices.length];
      const productDiv = document.createElement('div');
      productDiv.className = 'bg-white p-4 rounded-lg shadow flex flex-col';
      productDiv.innerHTML = `
        <img src="images/${i}.jpg" class="w-full h-[420px] object-contain rounded-md mb-2 bg-white" alt="Produk ${i}" />
        <h3 class="text-lg font-semibold mb-1">Produk ${i}</h3>
        <p class="text-gray-600 text-sm mb-2">${descriptions[idx].replace(/\n/g, "<br>")}</p>
        <div class="text-black-500 font-bold mb-4">Rp${priceVal.toLocaleString('id-ID')}</div>
        <button class="mt-auto bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2 relative">
          <i class="ri-box-3-line absolute left-4"></i><span>Tambah ke Keranjang</span>
        </button>
      `;
      const btn = productDiv.querySelector('button');
      btn.addEventListener('click', () => {
        const item = {
          title: `Produk ${i}`,
          desc: descriptions[idx],
          price: `Rp${priceVal.toLocaleString('id-ID')}`,
          image: `images/${i}.jpg`,
          qty: 1
        };
        const cart = JSON.parse(localStorage.getItem("checkout") || "[]");
        const existing = cart.find(p => p.title === item.title);
        existing ? existing.qty++ : cart.push(item);
        localStorage.setItem("checkout", JSON.stringify(cart));
        updateCartCount();
      });
      container.appendChild(productDiv);
    }
    updateCartCount();
  }

  // ==================== [Checkout Handler Ringkas] ====================
  if (window.location.pathname.includes("checkout.html")) {
    const checkoutList = qs('checkout-list');
    const totalPriceElement = qs('total-price');
    let cart = JSON.parse(localStorage.getItem('checkout') || '[]');

    function updateTotal() {
      const total = cart.reduce((sum, item) =>
        sum + (parseInt(item.price.replace(/\D/g, '')) || 0) * (item.qty || 1), 0);
      totalPriceElement.textContent = `Rp${total.toLocaleString('id-ID')}`;
    }

    function saveCart() {
      localStorage.setItem('checkout', JSON.stringify(cart));
      renderCart(); updateCartCount();
    }

    window.changeQty = (i, d) => {
      if (!cart[i]) return;
      cart[i].qty = (cart[i].qty || 1) + d;
      if (cart[i].qty <= 0) cart.splice(i, 1);
      saveCart();
    };

    window.removeItem = i => {
      cart.splice(i, 1); saveCart();
    };

    function renderCart() {
      checkoutList.innerHTML = '';
      if (cart.length === 0) {
        checkoutList.innerHTML = `<div class="text-center text-gray-500 mt-10">Keranjang kosong.</div>`;
        totalPriceElement.textContent = 'Rp0'; return;
      }
      cart.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'bg-white p-4 rounded-lg shadow flex items-center gap-4';
        div.innerHTML = `
          <img src="${item.image}" class="w-20 h-20 object-cover rounded" />
          <div class="flex-1">
            <h3 class="text-md font-semibold">${item.title}</h3>
            <p class="text-sm text-gray-500">${item.desc}</p>
            <p class="text-orange-500 font-bold mt-1">${item.price}</p>
            <div class="flex gap-2 mt-2">
              <button onclick="changeQty(${i}, -1)" class="bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded">-</button>
              <span class="px-3">${item.qty}</span>
              <button onclick="changeQty(${i}, 1)" class="bg-gray-700 hover:bg-gray-900 text-white px-2 py-1 rounded">+</button>
            </div>
          </div>
          <button onclick="removeItem(${i})" class="text-red-500 hover:text-red-700"><i class="ri-delete-bin-line text-xl"></i></button>`;
        checkoutList.appendChild(div);
      });
      updateTotal();
    }

    renderCart();
  }

  // ==================== [Checkout Submit] ====================
  qs("pay-btn")?.addEventListener("click", () => {
    const name = qs("name")?.value.trim();
    const address = qs("address")?.value.trim();
    const phone = qs("phone")?.value.trim();
    const method = qs("payment-method")?.value;
    const note = qs("note")?.value.trim();
    if (!name || !address || !phone || !method) return alert("Mohon lengkapi semua data pembayaran.");
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push({
      items: JSON.parse(localStorage.getItem("checkout") || "[]"),
      total: qs("total-price")?.textContent,
      time: new Date().toLocaleString(),
      status: "Belum Dibayar",
      customer: { name, address, phone, method, note }
    });
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.removeItem("checkout");
    alert("Pesanan berhasil disimpan.");
    window.location.href = "index.html";
  });

  // ==================== [Navigation] ====================
  window.goBack = () => (window.location.href = "index.html");
  window.loadPage = page => {
    fetch(page)
      .then(res => res.text())
      .then(html => (qs("content").innerHTML = html))
      .catch(err => (qs("content").innerHTML = `<p style="color:red;">${err.message}</p>`));
  };
});
