/* ==========================================================================
   CLAUDIA ATELIER - CORE JS
   Lógica e Interatividade Premium (Carrinho, Carrossel, Modais, Filtros)
   ========================================================================== */

// 1. DADOS DOS PRODUTOS (Catálogo Premium)
const PRODUCTS = [
    {
        id: 1,
        title: "Body Ouro Imperial",
        category: "carnaval",
        price: 429.90,
        badge: "",
        image: "assets/carnaval_item_1.jpg",
        imageHover: "assets/carnaval_item_1.jpg",
        desc: "Body exclusivo de alta costura confeccionado em lycra cirré dourada com tiras transpassadas feitas à mão, aplicações de pedrarias e franjas de \"bordados\" e vidrilhos. Acompanha adereço de cabeça combinando em penas artificiais amarelas. Uma peça soberana para brilhar na avenida.",
        sizes: ["P", "M", "G"]
    },
    {
        id: 2,
        title: "Body Futurista",
        category: "carnaval",
        price: 489.90,
        badge: "",
        image: "assets/carnaval_item_2.jpg",
        imageHover: "assets/carnaval_item_2.jpg",
        desc: "Body futurista de luxo estruturado com ombreiras de asas metálicas prateadas e bustiê decorado artesanalmente com detalhes espelhados circulares. Forro em poliamida premium de alta compressão para perfeita modelagem no corpo.",
        sizes: ["P", "M", "G"]
    },
    {
        id: 3,
        title: "Vestido feito a mão",
        category: "carnaval",
        price: 389.90,
        originalPrice: 450.00,
        badge: "",
        image: "assets/carnaval_item_3.png",
        imageHover: "assets/carnaval_item_3.png",
        desc: "Body exclusivo de alta costura com tiras transpassadas nas cores verde e rosa, com \"bordados\" manuais brilhantes e franjas de plumas. Perfeito para rainhas de bateria e passistas representarem o samba com leveza e movimento.",
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 4,
        title: "Kaftan Imperial",
        category: "afro",
        price: 520.00,
        badge: "",
        image: "assets/hero_banner_afro.png",
        imageHover: "assets/hero_banner_afro.png",
        desc: "Peça icônica com corte amplo imperial. Confeccionada em viscose de alta gramatura com estampas geométricas exclusivas em tons de vermelho, amarelo e verde floresta. Um visual de moda afro luxuoso e marcante.",
        sizes: ["U"]
    },
    {
        id: 5,
        title: "Vestido Rendado Lavanda Sob Medida",
        category: "casamento",
        price: 750.00,
        badge: "custom",
        image: "assets/casamento_15anos.jpg",
        imageHover: "assets/casamento_15anos.jpg",
        desc: "Vestido de festa exclusivo confeccionado sob medida com renda floral lavanda e base nude. Perfeito para madrinhas, mães de noivos e debutantes que buscam elegância e sofisticação clássica.",
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 6,
        title: "Vestido Cinza Imperial com Fenda",
        category: "casamento",
        price: 820.00,
        badge: "custom",
        image: "assets/casamento_15anos_2.jpg",
        imageHover: "assets/casamento_15anos_2.jpg",
        desc: "Vestido de alta costura em cetim cinza imperial estruturado com busto rendado e fenda lateral marcante. Uma criação sob medida perfeita para eventos de destaque e debutantes.",
        sizes: ["P", "M", "G", "GG"]
    }
];

// 2. ESTADO DA APLICAÇÃO (Carrinho e Produto Selecionado)
let cart = JSON.parse(localStorage.getItem('claudia_atelier_cart')) || [];
let selectedProduct = null;
let selectedSize = 'M';
let selectedQty = 1;

// 3. SELETORES DOM
const dom = {
    header: document.getElementById('main-header'),
    announcements: document.querySelectorAll('.announcement-item'),
    slideContainer: document.getElementById('slide-container'),
    slides: document.querySelectorAll('.hero-slide'),
    prevSlideBtn: document.getElementById('prev-slide'),
    nextSlideBtn: document.getElementById('next-slide'),
    dots: document.querySelectorAll('.slider-dot'),
    productsGrid: document.getElementById('products-grid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    mobileMenuBtn: document.getElementById('mobile-menu-toggle'),
    navMenu: document.getElementById('nav-menu'),
    
    // Carrinho Drawer
    cartToggle: document.getElementById('cart-toggle'),
    cartClose: document.getElementById('cart-close'),
    cartOverlay: document.getElementById('cart-overlay'),
    cartPanel: document.getElementById('cart-drawer-panel'),
    cartCounter: document.getElementById('cart-counter'),
    cartItemsList: document.getElementById('cart-items-list'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartTotal: document.getElementById('cart-total'),
    shippingMessage: document.getElementById('shipping-message'),
    shippingBarFill: document.getElementById('shipping-bar-fill'),
    btnCheckout: document.getElementById('btn-cart-checkout'),
    
    // Modal Quick View
    quickviewModal: document.getElementById('quickview-modal'),
    modalClose: document.getElementById('modal-close'),
    modalImg: document.getElementById('modal-img'),
    modalCat: document.getElementById('modal-cat'),
    modalTitle: document.getElementById('modal-title'),
    modalPrice: document.getElementById('modal-price'),
    modalDesc: document.getElementById('modal-desc'),
    modalSizesContainer: document.getElementById('modal-sizes-container'),
    modalQtyMinus: document.getElementById('modal-qty-minus'),
    modalQtyPlus: document.getElementById('modal-qty-plus'),
    modalQtyVal: document.getElementById('modal-qty-val'),
    modalAddToCart: document.getElementById('modal-add-to-cart'),
    
    // Formulários
    bookingForm: document.getElementById('booking-form'),
    formSuccess: document.getElementById('form-success'),
    btnSubmitForm: document.getElementById('btn-submit-form'),
    newsletterForm: document.getElementById('newsletter-form'),
    newsletterSuccess: document.getElementById('newsletter-success-msg'),
    
    // Toast Container
    toastContainer: document.getElementById('toast-container')
};

// ==========================================================================
// 4. LÓGICA E INICIALIZAÇÃO DE COMPONENTES
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initHeaderSticky();
    initAnnouncements();
    initHeroSlider();
    renderProducts('all');
    initProductsFilter();
    initCart();
    initQuickView();
    initForms();
    initMobileMenu();
    updateCartUI();
});

// A. HEADER ADESIVO (STICKY EFFECT)
function initHeaderSticky() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            dom.header.classList.add('sticky');
        } else {
            dom.header.classList.remove('sticky');
        }
    });
}

// B. BARRA DE ANÚNCIOS ROTATIVA
function initAnnouncements() {
    let current = 0;
    setInterval(() => {
        dom.announcements[current].classList.remove('active');
        current = (current + 1) % dom.announcements.length;
        dom.announcements[current].classList.add('active');
    }, 4000);
}

// C. CAROUSEL BANNER HERO
function initHeroSlider() {
    let currentSlide = 0;
    const slideCount = dom.slides.length;
    let slideInterval;

    function showSlide(index) {
        // Correção de limites
        if (index >= slideCount) currentSlide = 0;
        else if (index < 0) currentSlide = slideCount - 1;
        else currentSlide = index;

        // Mover contêiner físico
        dom.slideContainer.style.transform = `translateX(-${currentSlide * 33.3333}%)`;
        
        // Atualizar classes ativas nos slides
        dom.slides.forEach((slide, i) => {
            if (i === currentSlide) slide.classList.add('active-slide');
            else slide.classList.remove('active-slide');
        });

        // Atualizar dots
        dom.dots.forEach((dot, i) => {
            if (i === currentSlide) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoplay() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoplay() {
        clearInterval(slideInterval);
    }

    // Ouvintes de eventos
    dom.nextSlideBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    dom.prevSlideBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    dom.dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Pausar ao passar o mouse
    const heroSection = document.getElementById('home');
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);

    // Inicialização do autoplay
    startAutoplay();
}

// D. RENDERIZAR PRODUTOS E FILTRO
function renderProducts(filter = 'all') {
    dom.productsGrid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === filter);

    if (filtered.length === 0) {
        let msg = "Nossa nova coleção estará disponível em breve. Aguarde!";
        if (filter === 'afro') msg = "Nossa nova coleção de Moda Afro estará disponível em breve. Aguarde!";
        else if (filter === 'carnaval') msg = "Nossa nova coleção de Carnaval estará disponível em breve. Aguarde!";
        else if (filter === 'casamento') msg = "Nossa coleção de Casamento e 15 Anos sob medida estará disponível em breve. Agende seu atendimento!";
        dom.productsGrid.innerHTML = `<p class="cart-empty-message" style="grid-column: 1/-1; padding: 4rem 0; font-size: 0.95rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-light); text-align: center;">${msg}</p>`;
        return;
    }

    filtered.forEach(p => {
        const hasDiscount = p.originalPrice ? true : false;
        
        // Criar elemento do card de produto
        const card = document.createElement('article');
        card.className = 'product-card';
        card.style.animation = 'slideUpFadeIn 0.5s ease forwards';
        
        let badgeHtml = '';
        if (p.badge === 'new') badgeHtml = `<span class="product-badge badge-new">Novo</span>`;
        else if (p.badge === 'exclusive') badgeHtml = `<span class="product-badge badge-exclusive">Exclusivo</span>`;
        else if (p.badge === 'custom') badgeHtml = `<span class="product-badge badge-custom">Sob Medida</span>`;

        const sizeString = p.sizes.join(', ');

        card.innerHTML = `
            <div class="product-image-container">
                ${badgeHtml}
                <img src="${p.image}" alt="${p.title}" class="product-img">
                <img src="${p.imageHover}" alt="${p.title} - Detalhe" class="product-img img-hover">
                <div class="product-actions">
                    <button class="btn-quick-buy" data-id="${p.id}">Espiar Peça</button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${p.category === 'afro' ? 'Moda Afro' : (p.category === 'casamento' ? 'Casamento & 15 Anos' : 'Carnaval')}</div>
                <h3 class="product-title">${p.title}</h3>
                <div class="product-price">A Combinar</div>
                <div class="product-details-hover">Tamanhos: ${sizeString}</div>
            </div>
        `;
        
        dom.productsGrid.appendChild(card);
    });

    // Reatribuir ouvintes para botões "Espiar Peça" recém-criados
    document.querySelectorAll('.btn-quick-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            openQuickView(id);
        });
    });
}

function initProductsFilter() {
    dom.filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover classe ativa anterior
            dom.filterBtns.forEach(b => b.classList.remove('active'));
            // Adicionar ativa ao atual
            e.target.classList.add('active');
            
            const filter = e.target.dataset.filter;
            
            // Suave transição visual no Grid
            dom.productsGrid.style.opacity = 0;
            setTimeout(() => {
                renderProducts(filter);
                dom.productsGrid.style.opacity = 1;
            }, 200);
        });
    });

    // Clicar nos links de categorias na seção de Inspirações
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter;
            
            // Ativa o botão de filtro correspondente
            dom.filterBtns.forEach(b => {
                if (b.dataset.filter === filter) {
                    b.click();
                }
            });
            
            // Rola suave até a seção de produtos
            document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// E. CARRINHO DE COMPRAS GAVETA (CART DRAWER)
function initCart() {
    // Abrir carrinho
    dom.cartToggle.addEventListener('click', openCart);
    
    // Fechar carrinho
    dom.cartClose.addEventListener('click', closeCart);
    dom.cartOverlay.addEventListener('click', (e) => {
        if (e.target === dom.cartOverlay) closeCart();
    });

    // Ação do Checkout (Link Direto WhatsApp)
    dom.btnCheckout.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast("Sua sacola está vazia!");
            return;
        }
        
        let message = "Olá Claudia Atelier! Gostaria de consultar o valor e combinar a confecção das seguintes peças:\n\n";
        cart.forEach(item => {
            message += `- ${item.title} (Tamanho: ${item.size}) x${item.qty}\n`;
        });
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5521964312922?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        showToast("Redirecionando para o WhatsApp...");
        cart = [];
        saveCart();
        updateCartUI();
        closeCart();
    });
}

function openCart() {
    dom.cartOverlay.classList.add('active');
    dom.cartPanel.classList.add('active');
    document.body.style.overflow = 'hidden'; // impede scroll de fundo
}

function closeCart() {
    dom.cartOverlay.classList.remove('active');
    dom.cartPanel.classList.remove('active');
    document.body.style.overflow = '';
}

function saveCart() {
    localStorage.setItem('claudia_atelier_cart', JSON.stringify(cart));
}

function addToCart(id, size, qty) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    // Verificar se já existe combinação de produto + tamanho no carrinho
    const existingIndex = cart.findIndex(item => item.id === id && item.size === size);

    if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            size: size,
            qty: qty
        });
    }

    saveCart();
    updateCartUI();
    showToast(`"${product.title}" (${size}) adicionado à sacola!`);
}

function removeFromCart(id, size) {
    cart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart();
    updateCartUI();
    showToast("Item removido do carrinho.");
}

function changeQty(id, size, delta) {
    const item = cart.find(item => item.id === id && item.size === size);
    if (!item) return;

    item.qty += delta;
    
    if (item.qty <= 0) {
        removeFromCart(id, size);
    } else {
        saveCart();
        updateCartUI();
    }
}

function updateCartUI() {
    // 1. Contador no ícone do header
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    dom.cartCounter.textContent = totalItems;

    // 2. Renderizar itens no drawer
    dom.cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        dom.cartItemsList.innerHTML = `
            <div class="cart-empty-message">
                <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; margin-bottom: 1rem; color: var(--color-border);"></i>
                <p>Sua sacola está vazia.</p>
                <p style="font-size: 0.8rem; margin-top: 0.5rem;">Explore nossas coleções e encontre peças exclusivas.</p>
            </div>
        `;
        dom.cartSubtotal.textContent = "A Combinar";
        dom.cartTotal.textContent = "A Combinar";
        dom.shippingMessage.textContent = "Adicione itens para combinar frete e prazo";
        dom.shippingBarFill.style.width = "0%";
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <div>
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-meta">Tamanho: ${item.size}</div>
                    <div class="cart-item-price">A Combinar</div>
                </div>
                <div class="cart-qty-ctrl">
                    <button class="cart-qty-btn item-minus" data-id="${item.id}" data-size="${item.size}"><i class="fa-solid fa-minus"></i></button>
                    <span class="cart-qty-num">${item.qty}</span>
                    <button class="cart-qty-btn item-plus" data-id="${item.id}" data-size="${item.size}"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size}" aria-label="Remover item"><i class="fa-solid fa-trash-can"></i></button>
        `;
        
        dom.cartItemsList.appendChild(itemElement);
    });

    // 3. Ouvintes de quantidade e remoção na UI renderizada
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            const size = btn.dataset.size;
            removeFromCart(id, size);
        });
    });

    document.querySelectorAll('.item-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            changeQty(parseInt(btn.dataset.id), btn.dataset.size, -1);
        });
    });

    document.querySelectorAll('.item-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            changeQty(parseInt(btn.dataset.id), btn.dataset.size, 1);
        });
    });

    // 4. Subtotal e Frete (Todos sob consulta / A Combinar)
    dom.cartSubtotal.textContent = "A Combinar";
    document.getElementById('cart-shipping-value').textContent = "A Combinar";
    dom.cartTotal.textContent = "A Combinar";
    dom.shippingMessage.innerHTML = `<i class="fa-solid fa-truck" style="color: var(--color-yellow);"></i> Frete e prazo de entrega a combinar com o atelier`;
    dom.shippingBarFill.style.width = "100%";
}

// F. MODAL DE VISUALIZAÇÃO RÁPIDA (QUICK VIEW)
function initQuickView() {
    dom.modalClose.addEventListener('click', closeQuickView);
    dom.quickviewModal.addEventListener('click', (e) => {
        if (e.target === dom.quickviewModal) closeQuickView();
    });

    // Quantidade dentro do modal
    dom.modalQtyMinus.addEventListener('click', () => {
        if (selectedQty > 1) {
            selectedQty--;
            dom.modalQtyVal.textContent = selectedQty;
        }
    });

    dom.modalQtyPlus.addEventListener('click', () => {
        selectedQty++;
        dom.modalQtyVal.textContent = selectedQty;
    });

    // Ouvintes de tamanho dentro do modal
    dom.modalSizesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('size-option')) {
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
            e.target.classList.add('active');
            selectedSize = e.target.dataset.size;
        }
    });

    // Adicionar à sacola a partir do modal
    dom.modalAddToCart.addEventListener('click', () => {
        if (selectedProduct) {
            addToCart(selectedProduct.id, selectedSize, selectedQty);
            closeQuickView();
            setTimeout(openCart, 300); // Abre o carrinho após fechar o modal
        }
    });

    // Fechar ao pressionar ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQuickView();
            closeCart();
        }
    });
}

function openQuickView(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    selectedProduct = product;
    selectedQty = 1;
    dom.modalQtyVal.textContent = selectedQty;

    // Preencher modal
    dom.modalImg.src = product.image;
    dom.modalImg.alt = product.title;
    dom.modalCat.textContent = product.category === 'afro' ? 'Moda Afro' : (product.category === 'casamento' ? 'Casamento & 15 Anos' : 'Carnaval');
    dom.modalTitle.textContent = product.title;
    dom.modalPrice.textContent = "A Combinar";
    dom.modalDesc.textContent = product.desc;

    // Configurar Tamanhos
    dom.modalSizesContainer.innerHTML = '';
    
    product.sizes.forEach((sz, idx) => {
        const btn = document.createElement('button');
        btn.className = `size-option ${idx === 0 ? 'active' : ''}`;
        btn.dataset.size = sz;
        btn.textContent = sz;
        dom.modalSizesContainer.appendChild(btn);
        
        if (idx === 0) selectedSize = sz; // Define padrão inicial
    });

    dom.quickviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    dom.quickviewModal.classList.remove('active');
    document.body.style.overflow = '';
}

// G. FORMULÁRIOS E NEWSLETTER
function initForms() {
    // 1. Formulário de agendamento Atelier
    dom.bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        dom.btnSubmitForm.disabled = true;
        dom.btnSubmitForm.textContent = "Enviando solicitação...";

        const formData = new FormData(dom.bookingForm);

        fetch("https://n8n.inforoza.com.br/webhook/a00fb24b-bec6-47ee-a880-af7a81c26477", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                dom.btnSubmitForm.style.display = 'none';
                dom.formSuccess.style.display = 'block';
                
                showToast("Orçamento de alta costura solicitado!");
                dom.bookingForm.reset();
                
                // Resetar formulário na tela após alguns segundos
                setTimeout(() => {
                    dom.btnSubmitForm.style.display = 'block';
                    dom.btnSubmitForm.disabled = false;
                    dom.btnSubmitForm.textContent = "Enviar Solicitação";
                    dom.formSuccess.style.display = 'none';
                }, 6000);
            } else {
                response.json().then(data => {
                    if (data && data.errors) {
                        showToast("Erro: " + data.errors.map(err => err.message).join(", "));
                    } else {
                        showToast("Ocorreu um erro ao enviar. Tente novamente.");
                    }
                    dom.btnSubmitForm.disabled = false;
                    dom.btnSubmitForm.textContent = "Enviar Solicitação";
                });
            }
        })
        .catch(error => {
            showToast("Erro de rede. Verifique sua conexão.");
            dom.btnSubmitForm.disabled = false;
            dom.btnSubmitForm.textContent = "Enviar Solicitação";
        });
    });

    // 2. Formulário Newsletter
    dom.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value;
        if (!email) return;

        dom.newsletterForm.style.display = 'none';
        dom.newsletterSuccess.style.display = 'block';
        
        showToast("Inscrição na newsletter realizada!");
    });
}

// H. MENU MOBILE
function initMobileMenu() {
    dom.mobileMenuBtn.addEventListener('click', () => {
        dom.mobileMenuBtn.classList.toggle('active');
        dom.navMenu.classList.toggle('active');
    });

    // Fechar menu quando um link for clicado
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            dom.mobileMenuBtn.classList.remove('active');
            dom.navMenu.classList.remove('active');
            
            // Remover ativo dos outros e adicionar ao atual
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// I. NOTIFICAÇÕES TOAST
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid fa-bell"></i>
        <span>${message}</span>
    `;
    
    dom.toastContainer.appendChild(toast);
    
    // Remover o toast após 4 segundos
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}
