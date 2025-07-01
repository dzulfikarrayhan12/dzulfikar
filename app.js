document.addEventListener("DOMContentLoaded", () => {
  // === DOM SELECTORS ===
  const menuToggle = document.getElementById("menu-toggle");
  const cartToggle = document.getElementById("cart-toggle");
  const sidebarMenu = document.getElementById("sidebar-menu");
  const sidebarCart = document.getElementById("sidebar-cart");
  const overlay = document.getElementById("overlay");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const loginBtn = document.getElementById("loginBtn");
  const modal = document.getElementById("loginModal");
  const closeBtn = document.querySelector(".close");

  // === UTILITY FUNCTIONS ===
  function closeAll() {
    sidebarMenu?.classList.remove("open");
    sidebarCart?.classList.remove("open");
    overlay?.classList.remove("active");
  }

  // === EVENT LISTENERS ===
  menuToggle?.addEventListener("click", () => {
    const isOpen = sidebarMenu.classList.contains("open");
    if (isOpen) {
      closeAll();
    } else {
      sidebarMenu.classList.add("open");
      sidebarCart.classList.remove("open");
      overlay.classList.add("active");
    }
  });

  cartToggle?.addEventListener("click", () => {
    const isOpen = sidebarCart.classList.contains("open");
    if (isOpen) {
      closeAll();
    } else {
      sidebarCart.classList.add("open");
      sidebarMenu.classList.remove("open");
      overlay.classList.add("active");
    }
  });

  overlay?.addEventListener("click", () => {
    closeAll();
  });

  // === SIZE BUTTON TOGGLE ===
  document.querySelectorAll(".product-card").forEach((card) => {
    const sizeButtons = card.querySelectorAll(".size-btn");
    sizeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        sizeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
      if (btn.textContent.trim() === "M") {
        btn.classList.add("active");
      }
    });
  });

  // === CART FUNCTIONALITY ===
  let cart = [];

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) cartCountEl.textContent = count;
  }

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(({ id, name, size, price, image, qty }) => {
      totalPrice += price * qty;
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${image}" alt="${name}" />
        <div class="cart-item-info">
          <div>${name}</div>
          <div class="cart-item-size">Size: ${size}</div>
          <div class="cart-item-price">Rp${(price * qty).toLocaleString("id-ID")}</div>
        </div>
        <div class="cart-item-qty" style="font-weight:600; margin-right:10px;">${qty}</div>
        <div class="cart-item-remove" title="Hapus item">&times;</div>
      `;
      itemEl.querySelector(".cart-item-remove").addEventListener("click", () => {
        removeFromCart(id, size);
      });
      cartItemsContainer.appendChild(itemEl);
    });

    cartTotalEl.textContent = "Rp" + totalPrice.toLocaleString("id-ID");
    updateCartCount();
  }

  function addToCart(product) {
    const foundIndex = cart.findIndex((i) => i.id === product.id && i.size === product.size);
    if (foundIndex > -1) {
      cart[foundIndex].qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
  }

  function removeFromCart(id, size) {
    cart = cart.filter((i) => !(i.id === id && i.size === size));
    updateCartUI();
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    const btnAdd = card.querySelector(".add-to-cart-btn");
    btnAdd.addEventListener("click", () => {
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price);
      const image = card.dataset.image;
      const sizeBtn = card.querySelector(".size-btn.active");

      if (!sizeBtn) {
        alert("Pilih ukuran terlebih dahulu!");
        return;
      }

      const size = sizeBtn.textContent.trim();
      addToCart({ id, name, size, price, image });

      // Buka sidebar cart otomatis (jika ingin)
      // sidebarCart.classList.add("open");
      // sidebarMenu.classList.remove("open");
      // overlay.classList.add("active");
    });
  });

  checkoutBtn?.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }
    window.location.href = "checkout.html";
  });

  // === MODAL LOGIN ===
  loginBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // === INITIALIZE ===
  updateCartUI();
});
