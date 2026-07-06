/* ========================================
   DOI SUPPORT PORTAL — SPA ROUTER & APP
   ======================================== */

(function () {
  const VIEWS = {
    HOME: 'view-home',
    CATALOG: 'view-catalog',
    DETAIL: 'view-detail',
    SEARCH: 'view-search',
  };

  const CATEGORIES = {
    estabilizacion: {
      id: 'estabilizacion',
      title: 'Estabilización',
      basePath: 'assets/images/products/estabilizacion/',
      active: true,
    },
    silla: {
      id: 'silla',
      title: 'Silla',
      basePath: 'assets/images/products/silla/',
      active: false,
    },
    banarse: {
      id: 'banarse',
      title: 'Bañarse',
      basePath: 'assets/images/products/banarse/',
      active: false,
    },
    caminar: {
      id: 'caminar',
      title: 'Caminar',
      basePath: 'assets/images/products/caminar/',
      active: false,
    },
    mesas: {
      id: 'mesas',
      title: 'Mesas',
      basePath: 'assets/images/products/mesas/',
      active: false,
    },
  };

  const PRODUCTS = [
    {
      id: 'sitting',
      title: 'Sitting',
      code: 'S200',
      category: 'estabilizacion',
      active: true,
      description: 'Diseñado para mejorar el posicionamiento en sedestación para niños y adolescentes, este asiento moldeado ofrece un control postural óptimo.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20tengo%20una%20consulta%20sobre%20el%20producto%20Sitting%20(S200)',
      tutorial: 'https://www.youtube.com/watch?v=XYnNx3IqQVE',
      storeUrl: 'https://doifamily.com/producto/sitting-m/',
      guiaTecnica: 'docs/S200/sitting-guia-tecnica-S200.pdf',
      guiaPractica: 'docs/S200/Manual-S200.pdf',
      configPieces: ['calzon-pelvico', 'cunas-tronco', 'cuna-cabeza', 'abductor', 'otros-apoyos'],
    },
    {
      id: 'maxxitting',
      title: 'Maxxitting',
      code: 'S300',
      category: 'estabilizacion',
      active: false,
      description: 'Sistema de sedestación avanzado con múltiples ajustes para adolescentes y adultos jóvenes que requieren soporte postural completo.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Maxxitting%20(S300)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/maxxitting-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/maxxitting-guia-practica.pdf',
      configPieces: ['calzon-pelvico', 'cunas-tronco', 'cuna-cabeza', 'abductor', 'otros-apoyos'],
    },
    {
      id: 'bipedestador-mediano',
      title: 'Bipedestador Mediano',
      code: 'P600',
      category: 'estabilizacion',
      active: false,
      description: 'Bipedestador de tamaño mediano que permite mantener la posición de pie con soporte completo para tronco y extremidades.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Bipedestador%20Mediano%20(P600)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/bipedestador-mediano-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/bipedestador-mediano-guia-practica.pdf',
      configPieces: ['calzon-pelvico', 'cunas-tronco', 'cuna-cabeza', 'abductor', 'otros-apoyos'],
    },
    {
      id: 'bipedestador-grande',
      title: 'Bipedestador Grande',
      code: 'P700',
      category: 'estabilizacion',
      active: false,
      description: 'Bipedestador de tamaño grande diseñado para adolescentes y adultos, con ajustes amplios y estructura reforzada.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Bipedestador%20Grande%20(P700)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/bipedestador-grande-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/bipedestador-grande-guia-practica.pdf',
      configPieces: ['calzon-pelvico', 'cunas-tronco', 'cuna-cabeza', 'abductor', 'otros-apoyos'],
    },
    {
      id: 'parador',
      title: 'Parador',
      code: 'P300',
      category: 'estabilizacion',
      active: false,
      description: 'Sistema de bipedestación vertical con mesa de actividades integrada para facilitar la participación en actividades terapéuticas.',
      whatsapp: 'https://wa.me/56999694935?text=Hola%2C%20consulta%20sobre%20Parador%20(P300)',
      tutorial: '#',
      guiaTecnica: 'assets/docs/parador-guia-tecnica.pdf',
      guiaPractica: 'assets/docs/parador-guia-practica.pdf',
      configPieces: ['calzon-pelvico', 'cunas-tronco', 'cuna-cabeza', 'abductor', 'otros-apoyos'],
    },
  ];

  let currentView = VIEWS.HOME;

  function getProductImagePath(product, variant) {
    const cat = CATEGORIES[product.category];
    const file = variant || 'main.png';
    const base = cat ? cat.basePath : 'assets/images/products/';
    return base + product.code + '/' + file;
  }

  function findProductByCode(code) {
    const normalized = code.trim().toUpperCase();
    return PRODUCTS.find((p) => p.code.toUpperCase() === normalized);
  }

  function findProductById(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  function navigateTo(view) {
    document.getElementById(VIEWS.HOME).classList.add('hidden');
    document.getElementById(VIEWS.CATALOG).classList.add('hidden');
    document.getElementById(VIEWS.DETAIL).classList.add('hidden');
    document.getElementById(VIEWS.SEARCH).classList.add('hidden');

    document.getElementById(view).classList.remove('hidden');
    currentView = view;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateHash(view);
  }

  function updateHash(view) {
    const map = {
      [VIEWS.HOME]: '#/',
      [VIEWS.CATALOG]: '#estabilizacion',
      [VIEWS.DETAIL]: '#sitting',
      [VIEWS.SEARCH]: '#buscar',
    };
    const newHash = map[view] || '#/';
    if (window.location.hash !== newHash) {
      history.pushState(null, '', newHash);
    }
  }

  function resolveHash() {
    const hash = window.location.hash.replace('#', '').replace('/', '');
    switch (hash) {
      case 'estabilizacion':
        return VIEWS.CATALOG;
      case 'sitting':
        return VIEWS.DETAIL;
      case 'buscar':
        return VIEWS.SEARCH;
      default:
        return VIEWS.HOME;
    }
  }

  function renderProductCards(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const list = products || PRODUCTS;
    list.forEach((product) => {
      const imgPath = getProductImagePath(product);
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-card__info">
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__code">Código: ${product.code}</p>
        </div>
        <div class="product-card__image">
          <img src="${imgPath}" alt="${product.title}" onerror="this.style.display='none'">
        </div>
        <div class="product-card__actions">
          ${product.active
            ? `<button class="btn-pill btn-pill--active btn-pill--small" data-action="view-product" data-id="${product.id}">VER</button>`
            : `<button class="btn-pill btn-pill--disabled btn-pill--small" disabled>COMING SOON</button>`
          }
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function renderDetail(product) {
    const d = product || PRODUCTS.find((p) => p.id === 'sitting');
    if (!d) return;

    const mainImg = getProductImagePath(d, 'main.png');
    const secondaryImg = getProductImagePath(d, 'secondary.png');
    document.getElementById('detail-title').textContent = d.title;
    document.getElementById('detail-code').textContent = `Código: ${d.code}`;
    document.getElementById('detail-description').textContent = d.description;
    document.getElementById('detail-image').src = mainImg;
    document.getElementById('detail-photo').src = secondaryImg;
    document.getElementById('btn-whatsapp').href = d.whatsapp;
    document.getElementById('btn-guia-tecnica').href = d.guiaTecnica;
    document.getElementById('btn-guia-practica').href = d.guiaPractica;
    document.getElementById('breadcrumb-product').textContent = d.title;

    const storeBtn = document.getElementById('btn-store');
    if (d.storeUrl) {
      storeBtn.href = d.storeUrl;
      storeBtn.classList.remove('hidden');
    } else {
      storeBtn.classList.add('hidden');
    }

    currentProductTutorial = d.tutorial;
    const tutBtn = document.getElementById('btn-tutorial');
    tutBtn.href = d.tutorial;
    tutBtn.removeEventListener('click', launchTutorial);
    tutBtn.addEventListener('click', launchTutorial);
  }

  function navigateToProduct(product) {
    renderDetail(product);
    navigateTo(VIEWS.DETAIL);
  }

  /* ========================================
     SEARCH ENGINE
     ======================================== */

  function searchProducts(query) {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;

    return PRODUCTS.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }

  function renderSearchResults(results, query) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';

    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-empty">
          <svg class="search-empty__icon" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <p class="search-empty__text">No se encontraron productos que coincidan con tu búsqueda.</p>
          <p class="search-empty__hint">Prueba con otro nombre, código de producto o categoría.</p>
          <button class="btn-search-retry" id="btn-search-retry">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Volver a buscar
          </button>
        </div>
      `;
      document.getElementById('btn-search-retry').addEventListener('click', clearSearch);
      return;
    }

    results.forEach((product) => {
      const imgPath = getProductImagePath(product);
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-card__info">
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__code">Código: ${product.code}</p>
          <p class="product-card__category">Categoría: ${CATEGORIES[product.category]?.title || product.category}</p>
        </div>
        <div class="product-card__image">
          <img src="${imgPath}" alt="${product.title}" onerror="this.style.display='none'">
        </div>
        <div class="product-card__actions">
          ${product.active
            ? `<button class="btn-pill btn-pill--active btn-pill--small" data-action="search-view-product" data-id="${product.id}">VER</button>`
            : `<button class="btn-pill btn-pill--disabled btn-pill--small" disabled>COMING SOON</button>`
          }
        </div>
      `;
      container.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  let searchDebounceTimer = null;

  function handleSearchInput(e) {
    const query = e.target.value;
    updateClearButton(query);

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      if (query.trim().length === 0) {
        if (currentView === VIEWS.SEARCH) {
          navigateTo(VIEWS.HOME);
        }
        return;
      }
      /* Live filtering — no navigation, no focus stealing */
    }, 150);
  }

  function executeSearch(query) {
    const q = query.trim();
    if (!q) return;

    const exactMatch = findProductByCode(q);
    if (exactMatch && exactMatch.active) {
      document.getElementById('search-input').blur();
      navigateToProduct(exactMatch);
      return;
    }

    const results = searchProducts(q);
    document.getElementById('search-query-label').textContent = q;
    document.getElementById('search-count').textContent = results.length;
    renderSearchResults(results, q);
    document.getElementById('search-input').blur();
    navigateTo(VIEWS.SEARCH);
  }

  function clearSearch() {
    const input = document.getElementById('search-input');
    input.value = '';
    updateClearButton('');
    if (currentView === VIEWS.SEARCH) {
      navigateTo(VIEWS.HOME);
    }
    input.focus();
  }

  function updateClearButton(value) {
    const btn = document.getElementById('search-clear-btn');
    if (btn) {
      btn.classList.toggle('hidden', !value || value.trim().length === 0);
    }
  }

  /* ========================================
     YOUTUBE DEEP LINK LAUNCHER
     ======================================== */

  let currentProductTutorial = '#';

  function launchTutorial(e) {
    e.preventDefault();
    const url = currentProductTutorial;
    if (!url || url === '#') return;

    const videoId = extractYouTubeId(url);

    if (videoId && isMobileDevice()) {
      const deepLink = 'vnd.youtube:' + videoId;
      const fallbackTimer = setTimeout(() => {
        window.open(url, '_blank', 'noopener');
      }, 800);

      window.addEventListener('blur', function onBlur() {
        clearTimeout(fallbackTimer);
        window.removeEventListener('blur', onBlur);
      }, { once: true });

      window.location.href = deepLink;
    } else {
      window.open(url, '_blank', 'noopener');
    }
  }

  function extractYouTubeId(url) {
    try {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    } catch (_) {
      return null;
    }
  }

  /* ========================================
     QR CAMERA SCANNER (html5-qrcode)
     ======================================== */

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      ('ontouchstart' in window && window.innerWidth < 1024);
  }

  let html5Qr = null;
  let scannerRunning = false;

  function openQRScanner() {
    const overlay = document.getElementById('scanner-modal');
    overlay.classList.remove('hidden');

    if (typeof Html5Qrcode === 'undefined') {
      showToast('Error: librería de escaneo no disponible. Recarga la página.');
      return;
    }

    /* Clean previous instance */
    if (html5Qr) {
      try { if (scannerRunning) html5Qr.stop(); } catch (_) {}
      try { html5Qr.clear(); } catch (_) {}
      html5Qr = null;
      scannerRunning = false;
    }

    const reader = document.getElementById('qr-reader');
    reader.innerHTML = '';

    html5Qr = new Html5Qrcode('qr-reader', { verbose: false });

    html5Qr.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: function (vw, vh) { var s = Math.floor(Math.min(vw, vh) * 0.7); return { width: s, height: s }; } },
      onScanSuccess,
      function () { /* silent scan-in-progress */ }
    ).then(() => {
      scannerRunning = true;
      console.log('QR: Cámara iniciada correctamente');
    }).catch((err) => {
      console.warn('QR: No se pudo iniciar la cámara:', err);
      showToast('No se pudo acceder a la cámara. Usa la entrada manual.');
    });
  }

  function onScanSuccess(decodedText) {
    console.log('QR escaneado:', decodedText);

    closeQRScanner();

    var identifier = parseQRPayload(decodedText);
    resolveScannedIdentifier(identifier);
  }

  function parseQRPayload(raw) {
    var text = (raw || '').trim();

    /* Check if it's a URL with a hash fragment */
    if (text.indexOf('#') !== -1) {
      var hashPart = text.split('#').pop().replace('/', '').trim();
      if (hashPart.length > 0) return hashPart;
    }

    /* Check if it's a URL with a query parameter (e.g., ?code=S200) */
    if (text.indexOf('?') !== -1) {
      try {
        var params = new URLSearchParams(text.split('?').pop());
        var codeParam = params.get('code') || params.get('producto') || params.get('id');
        if (codeParam) return codeParam.trim();
      } catch (_) {}
    }

    /* Raw code or identifier */
    return text;
  }

  function resolveScannedIdentifier(identifier) {
    var id = identifier.toUpperCase();

    /* Try direct product code match (S200, P600, etc.) */
    var product = findProductByCode(id);
    if (product && product.active) {
      showToast('Producto encontrado: ' + product.title);
      navigateToProduct(product);
      return;
    }
    if (product) {
      showToast('Producto ' + product.title + ' reconocido, pero aún no disponible.');
      return;
    }

    /* Try matching by product id slug (sitting, parador, etc.) */
    var bySlug = PRODUCTS.find(function (p) {
      return p.id.toLowerCase() === identifier.toLowerCase();
    });
    if (bySlug && bySlug.active) {
      showToast('Producto encontrado: ' + bySlug.title);
      navigateToProduct(bySlug);
      return;
    }
    if (bySlug) {
      showToast('Producto ' + bySlug.title + ' reconocido, pero aún no disponible.');
      return;
    }

    /* Try matching known hash routes */
    var hashRoutes = { estabilizacion: VIEWS.CATALOG, buscar: VIEWS.SEARCH };
    var route = hashRoutes[identifier.toLowerCase()];
    if (route) {
      navigateTo(route);
      return;
    }

    showToast('Código QR no corresponde a un producto doi registrado.');
  }

  function closeQRScanner() {
    if (html5Qr) {
      if (scannerRunning) {
        html5Qr.stop().then(() => {
          html5Qr.clear();
          html5Qr = null;
          scannerRunning = false;
        }).catch(() => {
          try { html5Qr.clear(); } catch (_) {}
          html5Qr = null;
          scannerRunning = false;
        });
      } else {
        try { html5Qr.clear(); } catch (_) {}
        html5Qr = null;
      }
    }
    document.getElementById('scanner-modal').classList.add('hidden');
    const reader = document.getElementById('qr-reader');
    if (reader) reader.innerHTML = '';
  }

  /* ========================================
     CONFIGURATION MODAL (PASO 2 → PASO 3)
     ======================================== */

  const VISOR_FILE = 'camera-guide-module/camera-visor.html';

  /* data-piece del badge → clave de contexto del visor de cámara.
     Todas las piezas abren el visor local paso a paso. */
  const PIECE_HASH_MAP = {
    'calzon-pelvico': 'calzon',
    'cunas-tronco': 'cunas-tronco',
    'cuna-cabeza': 'cuna-cabeza',
    'abductor': 'abductor',
    'otros-apoyos': 'otros',
    'completa': 'completa',
  };
  let configProductCode = null;

  function openConfigModal() {
    const d = PRODUCTS.find((p) => p.id === 'sitting') || PRODUCTS[0];
    const title = document.getElementById('detail-title').textContent;
    const code = document.getElementById('detail-code').textContent.replace('Código: ', '');
    configProductCode = code;

    document.getElementById('config-product-label').textContent = title + ' — ' + code;
    document.getElementById('config-modal').classList.remove('hidden');
    console.log('[doi] Modal "TIPOS DE CONFIGURACIÓN" abierto → producto:', title, '(' + code + ')');
  }

  function closeConfigModal() {
    document.getElementById('config-modal').classList.add('hidden');
  }

  function launchARView(mode) {
    closeConfigModal();

    var code = configProductCode || 'S200';

    /* Toda pieza abre el visor de cámara local con su hash de contexto.
       Navegación en la misma ventana para que la flecha de volver del
       visor regrese a esta vista de producto. */
    var pieceKey = PIECE_HASH_MAP[mode] || mode || 'abductor';
    var localPath = VISOR_FILE + '#' + code + '/' + pieceKey;
    console.log('[doi] launchARView() → pieza:', mode, '→ visor local:', localPath);
    window.location.href = localPath;
  }

  /* ========================================
     TOAST NOTIFICATIONS
     ======================================== */

  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('toast--hidden');
    toast.classList.add('toast--visible');

    setTimeout(() => {
      toast.classList.remove('toast--visible');
      toast.classList.add('toast--hidden');
    }, 3500);
  }

  /* ========================================
     EVENT LISTENERS
     ======================================== */

  function initEventListeners() {
    const verCategoriaBtn = document.getElementById('btn-ver-categoria');
    if (verCategoriaBtn) {
      verCategoriaBtn.addEventListener('click', () => {
        console.log('[doi] Click en "VER CATEGORÍA" → abriendo catálogo de Estabilización');
        navigateTo(VIEWS.CATALOG);
      });
    } else {
      console.error('[doi] No se encontró el botón #btn-ver-categoria en el DOM');
    }

    document.getElementById('product-grid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="view-product"]');
      if (btn) {
        const product = findProductById(btn.dataset.id);
        navigateToProduct(product || PRODUCTS.find((p) => p.id === 'sitting'));
      }
    });

    document.getElementById('search-results').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="search-view-product"]');
      if (btn) {
        const product = findProductById(btn.dataset.id);
        if (product) navigateToProduct(product);
      }
    });

    document.querySelectorAll('[data-action="go-home"]').forEach((btn) => {
      btn.addEventListener('click', () => navigateTo(VIEWS.HOME));
    });

    document.querySelectorAll('[data-action="go-catalog"]').forEach((btn) => {
      btn.addEventListener('click', () => navigateTo(VIEWS.CATALOG));
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeSearch(searchInput.value);
      }
    });

    document.getElementById('search-clear-btn').addEventListener('click', clearSearch);

    document.getElementById('btn-qr-scanner').addEventListener('click', openQRScanner);

    document.getElementById('scanner-modal-close').addEventListener('click', closeQRScanner);

    document.getElementById('scanner-modal').addEventListener('click', (e) => {
      if (e.target.id === 'scanner-modal') closeQRScanner();
    });

    document.getElementById('btn-config').addEventListener('click', openConfigModal);

    document.getElementById('config-modal-close').addEventListener('click', closeConfigModal);

    document.getElementById('config-modal').addEventListener('click', (e) => {
      if (e.target.id === 'config-modal') closeConfigModal();
    });

    document.getElementById('config-complete').addEventListener('click', () => {
      launchARView('completa');
    });

    document.querySelectorAll('.config-badge').forEach((badge) => {
      badge.addEventListener('click', () => {
        launchARView(badge.dataset.piece);
      });
    });

    document.getElementById('manual-code-submit').addEventListener('click', () => {
      const code = document.getElementById('manual-code-input').value;
      closeQRScanner();
      const product = findProductByCode(code);
      if (product && product.active) {
        navigateToProduct(product);
      } else if (product) {
        showToast('Este producto aún no está disponible. ¡Pronto!');
      } else if (code.trim()) {
        showToast('Código no encontrado. Verifica e intenta nuevamente.');
      }
    });

    document.getElementById('manual-code-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('manual-code-submit').click();
    });

    window.addEventListener('popstate', () => {
      const view = resolveHash();
      if (view !== currentView) {
        document.getElementById(VIEWS.HOME).classList.add('hidden');
        document.getElementById(VIEWS.CATALOG).classList.add('hidden');
        document.getElementById(VIEWS.DETAIL).classList.add('hidden');
        document.getElementById(VIEWS.SEARCH).classList.add('hidden');
        document.getElementById(view).classList.remove('hidden');
        currentView = view;
      }
    });
  }

  /* ========================================
     QR ICON ADAPTIVE DISPLAY
     ======================================== */

  function updateQRIcon() {
    const btn = document.getElementById('btn-qr-scanner');
    if (isMobileDevice()) {
      btn.title = 'Escanear código QR';
      btn.setAttribute('aria-label', 'Escanear código QR del producto');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>`;
    } else {
      btn.title = 'Buscar por código QR';
      btn.setAttribute('aria-label', 'Ingresar código de producto');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>`;
    }
  }

  /* ========================================
     INIT
     ======================================== */

  function init() {
    renderProductCards();
    renderDetail();
    updateQRIcon();
    initEventListeners();

    const startView = resolveHash();
    navigateTo(startView);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
