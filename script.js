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
  "Kameja Ukuran: XL",
  "Kameja Ukuran : XL",
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
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Sweater ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Kameja ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Hoodie ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Baju Oversize ukuran : XL",
  "Azzaro Most Wanted adalah parfum dengan aroma spicy amber yang hangat dan maskulin, cocok untuk pria yang percaya diri dan berani tampil beda.",
  
  "LV Imagination menghadirkan kesegaran citrus dengan sentuhan teh hitam dan amber, menciptakan aroma yang modern, segar, dan imajinatif.",
  
  "Dior Sauvage memadukan kesegaran bergamot dengan kekuatan ambroxan, menghasilkan wangi maskulin yang kuat dan bebas.",
  
  "Acqua di Gio menawarkan aroma laut yang bersih dengan citrus yang ringan, sempurna untuk keseharian yang segar dan menenangkan.",
  
  "Mercedes-Benz for Men memancarkan aroma woody spicy yang elegan, mencerminkan karakter pria modern yang berkelas.",
  
  "Invictus dari Paco Rabanne adalah aroma kemenangan dengan perpaduan laut, grapefruit, dan kayu yang memberikan kesan energik dan segar.",
  
  "Le Male Elixir memiliki aroma manis dan intens dengan kombinasi vanila, tonka, dan kayu, menghadirkan kesan hangat dan memikat.",
  
  "Dior Fahrenheit adalah parfum klasik dengan perpaduan floral dan woody, menciptakan kesan hangat, elegan, dan tahan lama.",
  
  "Kilian Angel's Share menampilkan aroma gourmand yang mewah dari kayu manis, cognac, dan vanila dengan kesan eksklusif dan hangat.",
  
  "Eros warna biru membawa aroma mint segar dengan vanila manis yang menggoda dan cocok untuk suasana penuh percaya diri.",
  
  "Cocktail Intense adalah kombinasi buah tropis dan rempah hangat yang berani, cocok untuk kamu yang suka tampil beda dan intens.",
  
  "Initio Oud for Greatness menghadirkan aroma oud murni yang kuat dengan sentuhan lavender dan saffron, memberi kesan berwibawa dan eksklusif.",
  
  "Hugo Boss Bottled Oud adalah perpaduan oud dan rempah yang klasik, memberikan kesan maskulin dan elegan sepanjang hari.",
  
  "LV Les Sables Roses adalah aroma mawar oriental dengan sentuhan oud, menghadirkan keharuman yang mewah dan memikat.",
  
  "212 VIP Men menawarkan aroma segar dan spicy dengan nuansa vodka dan kulit, cocok untuk acara malam dan gaya hidup urban.",
  
  "212 Forever Young menyuguhkan aroma fruity yang ringan dan menyenangkan, cocok untuk kamu yang berjiwa muda dan penuh semangat.",
  
  "Latafa Khamrah memiliki aroma manis dan hangat dari kayu manis, vanila, dan buah kering, menciptakan wangi yang nyaman dan tahan lama.",
  
  "Kilian Apple Brandy memadukan aroma apel segar dan kayu ek dengan nuansa brandy hangat, memberikan kesan eksotis dan unik.",
"motor",
"motor",
"mobil",
"mobil",
"motor",
"bugati",
"mobil",
"mobil",
"mobil",
"mobil",
"mobil",
 "senjata", "mobil", "mobil", "senjata", "mobil", "senjata", "mobil", "mobil", "mobil", "mobil", "mobil","senjata","pistol","senjata","mobil","senjata","senjata","rumah","rumah","rumah","mobil","mobil","rumah","rumah","rumah","rumah","rumah","kursi gaming","kursi gaming","kursi gaming","hp","hp",
 "mousepad,mouse,keyboard","hp","hp","hp","hp","udang goreng","udang goreng",
 "nasi udang goreng","nasi udang goreng","ayam goreng","ayam goreng",
 "udang goreng","sop","nasi daging","nasi daging","mie ramen","mie ramen","nasi goreng","nasi goreng","nasi ayam","donat","donat","donat","donat","donat","donat gula","burger","pizza","pizza","pizza","pizza","pizza","pizza","pizza","burger","pizza","burger","burger","burger,ayam,kentang","burger","rumah 2 lantai","rumah 2 lantai","motor","motor","motor","motor","pisau","katana","katana dan pisau",
 
 "Kismet Angel adalah parfum manis dengan aroma vanilla dan caramel yang mewah, cocok untuk suasana malam yang elegan.",
  
  "When Soul Gets High menghadirkan aroma unik dengan nuansa resin dan herbal, menciptakan kesan misterius dan mendalam.",
  
  "Stronger With You menampilkan wangi manis spicy dengan sentuhan chestnut dan vanilla, cocok untuk pria romantis dan modern.",
  
  "Azzaro Most Wanted adalah parfum maskulin dengan aroma spicy amber yang hangat dan memikat sepanjang hari.",
  
  "Dior Homme Intense memiliki komposisi floral woody dengan iris yang halus dan aroma elegan yang tahan lama.",
  
  "LV Nuit de Feu menawarkan aroma oud yang dalam dan smoky dengan karakter mewah dan penuh wibawa.",
  
  "LV Pur Oud adalah parfum dengan konsentrasi oud murni, aroma tajam dan eksklusif yang cocok untuk penyuka wangi oriental kuat.",
  
  "Creed Aventus memadukan nanas, bergamot, dan musk dalam aroma ikonik yang segar dan berkelas.",
  
  "OPPO A18 hadir dengan layar besar, baterai tahan lama, dan desain stylish, cocok untuk kebutuhan harian yang praktis.",
  
    "Valentino Born in Roma menyuguhkan aroma modern floral dan woody dengan karakter feminin, berani, dan elegan.",

    "ukuran : XL","ukuran : XL",

     "Samsung Galaxy A14 memiliki layar Full HD+ 6.6 inci, baterai 5000mAh, dan performa stabil untuk penggunaan harian.",
  
  "OPPO A3s hadir dengan layar 6.2 inci, baterai besar 4230mAh, dan desain ramping, cocok untuk kebutuhan ringan sehari-hari.",
  
  "Redmi 5A adalah smartphone entry-level dengan layar 5 inci, baterai 3000mAh, dan performa cukup untuk chatting dan media sosial.",

  "ukuran : XL",
  
 "PC Gaming seharga 10 juta, dirakit dengan spesifikasi mumpuni untuk game AAA dan multitasking berat.",
  
  "Mouse wireless ergonomis dengan konektivitas stabil, cocok untuk kerja maupun gaming ringan.",
  
  "PC Gaming seharga 9 juta dengan performa solid untuk game kompetitif dan editing ringan.",
  
  "Monitor 27 inci beresolusi tinggi, ideal untuk kerja produktif, editing, atau bermain game.",
  
  "Android TV 50 inci dengan dukungan smart features, cocok untuk hiburan rumah dan streaming 4K.",
  
  "Monitor 27 inci dengan panel IPS dan refresh rate tinggi, cocok untuk multitasking atau gaming.",
  
  "Monitor 27 inci dengan desain ramping dan port lengkap, pas untuk keperluan kantor maupun multimedia.",
  
  "Monitor 32 inci dengan tampilan luas dan tajam, nyaman untuk editing, desain, atau setup kerja profesional.",

  "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "floridina", "kopi", "minyak goreng", "sari roti", "oreo", "lays", "mobil", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL", "ukuran : XL",
 "ukuran : XL", "ukuran : XL",

 "motor","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","motor","ukuran : XL","ukuran : XL","motor","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","ukuran : XL","motor",
  
];

// Harga Produk (65 Item)
const prices = [
  300000,250000,50000,500000,350000,120000,150000,180000, 120000,200000, 
  290000,36000, 65000, 200000, 699000, 319000, 469000, 294000, 230000, 75000,
  30000, 3500000, 7000000, 15500000, 18000000, 35000, 10000, 18000, 20000,    
  15000, 25000, 10000, 16000, 12000, 16000, 10000, 8000, 5000,        
  18000, 19000, 12000, 19000, 15000, 5000, 8000, 5000, 30000,        
  26000, 6000, 5000, 10000, 15000, 30000, 18000, 10000, 15000,       
  10000, 30000, 30000, 35000, 10000, 8000, 2000, 8000, 10000, 1000000, 600000, 
  1000000,  600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 500000, 1000000, 1000000, 1000000, 1000000, 1000000, 600000, 600000, 600000, 600000, 600000, 1000000, 300000, 600000, 300000, 600000, 300000, 600000, 300000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 600000, 500000, 600000, 300000, 300000, 300000, 300000, 50000,300000,300000, 300000, 300000, 300000, 1000000, 1000000, 300000,  300000, 300000, 300000, 1000000, 1000000, 1000000, 1000000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 450000, 350000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 400000, 300000, 400000, 300000, 300000, 300000, 300000, 300000, 300000, 300000, 300000,
  
  1500000, 
  5900000, 3100000, 2000000,5600000, 1700000,2000000,1500000,2000000,
1800000,300000,420000,1200000,7200000,1500000,1100000,550000, 4200000,
79000000,85000000,180000000,213000000,
87000000,39000000000,1200000000,3000000000,
150000000,190000000,140000000,150000000,
10000000000,13900000,6900000,11850000000,
57000000,17000000000,20000000000,35000000000,4000000000,46000000000,
60000000,15000000,80000000,20000000000,
30000000,67000000,15000000000,20000000000,
80000000000,20000000000,18000000000,45000000000,20000000000,50000000000,
20000000000,89000000000,1000000,
1000000,1000000,1200000,
800000,459000,650000,1400000,2500000,
1800000, 
  300000, 150000, 250000, 250000, 150000, 150000, 150000, 120000, 150000, 150000, 170000, 150000, 120000, 150000, 70000, 150000, 110000, 150000,90000, 50000, 120000, 180000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 120000, 80000, 50000, 50000, 140000, 90000, 
  15000000000, 18000000000, 18000000, 20000000,22000000,
55000000,450000, 1000000,1500000,
390000,450000,1800000,2100000,2800000,1200000,32000000,
7000000,2100000,2400000,
  1000000, 450000, 2600000, 890000, 1100000, 350000, 10050000, 150000, 9000000, 
  1400000, 5000000, 2500000, 2500000, 2800000,
  1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000,
   1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 2000000,
    1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 500000, 1000000,
  500000, 350000, 500000, 300000,
  300000, 300000, 300000, 300000, 300000,
  50000, 50000,
  450000,
    450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,  450000,300000,300000,  450000,  450000,600000,600000,600000,  450000,  450000,
    1000000,   1000000,   1000000,5000,17000,23000,15000,
    8000,10000,3000000000,
    1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000,
     1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000,300000, 1000000,
     350000,300000,450000,
  
  
  
  
  
  66000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 45000000, 1000000, 1000000, 45000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 55000000,
  
  50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000,  50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000,             // 58–65
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
  for (let i = 1; i <= 533; i++) {
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
