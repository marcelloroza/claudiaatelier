/* ==========================================================================
   CLAUDIA ATELIER - CORE JS
   Lógica e Interatividade Premium (Carrinho, Carrossel, Modais, Filtros)
   ========================================================================== */

// 1. DADOS DOS PRODUTOS (Catálogo Premium)
const PRODUCTS = [
    {
        id: 1,
        title: "Vestido Sol de Oxum",
        category: "afro",
        price: 489.90,
        originalPrice: 599.90,
        badge: "exclusive",
        image: "assets/hero_banner_afro.png",
        imageHover: "assets/about_atelier.png",
        desc: "Um tributo à divindade da beleza e riqueza. Confeccionado em crepe de seda fluído na cor amarelo sol, com drapeado grego sofisticado e aplicações de bordados manuais dourados no decote. Peça com axé, movimento e acabamento de alfaiataria fina.",
        sizes: ["P", "M", "G"]
    },
    {
        id: 2,
        title: "Body Purpurina Ouro & Carmim",
        category: "carnaval",
        price: 349.90,
        badge: "new",
        image: "assets/hero_banner_carnaval.png",
        imageHover: "assets/about_atelier.png",
        desc: "Body luxuoso revestido em paetê holográfico de alta densidade nas cores carmim e ouro. Possui forro ultra macio que garante conforto ao dançar, sustentação anatômica no busto e detalhes de franjas nos ombros para um efeito dinâmico na avenida.",
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 3,
        title: "Kaftan Imperial Dandara",
        category: "afro",
        price: 520.00,
        badge: "custom",
        image: "assets/hero_banner_afro.png",
        imageHover: "assets/about_atelier.png",
        desc: "Peça icônica com corte amplo imperial, inspirada na realeza angolana. Confeccionada em viscose de alta gramatura com estampas geométricas exclusivas em tons de vermelho, amarelo e verde floresta. Um visual afro-chic luxuoso e marcante.",
        sizes: ["U"]
    },
    {
        id: 4,
        title: "Coroa de Yemanjá Luxo",
        category: "acessorios",
        price: 189.90,
        originalPrice: 220.00,
        badge: "exclusive",
        image: "assets/hero_banner_carnaval.png",
        imageHover: "assets/about_atelier.png",
        desc: "Tiara e coroa com design autoral banhado a ouro, ornamentada com pérolas cultivadas, conchas naturais polidas e búzios. Estrutura leve e confortável, ideal para finalizar looks de Carnaval de luxo ou ensaios fotográficos conceituais.",
        sizes: ["U"]
    },
    {
        id: 5,
        title: "Conjunto Algodão Ancestral",
        category: "afro",
        price: 399.90,
        badge: "",
        image: "assets/about_atelier.png",
        imageHover: "assets/hero_banner_afro.png",
        desc: "Conjunto duas peças contendo cropped estruturado com amarração nas costas e calça pantalona de cintura alta. Feito em linho misto ecológico nas cores marrom chocolate e off-white, com detalhes de bordado geométrico feito à mão.",
        sizes: ["P", "M", "G"]
    },
    {
        id: 6,
        title: "Saia Plumas Confete & Brilho",
        category: "carnaval",
        price: 279.90,
        badge: "new",
        image: "assets/hero_banner_carnaval.png",
        imageHover: "assets/hero_banner_afro.png",
        desc: "Saia envelope com babados de paetês multicoloridos e acabamento em plumas sintéticas premium na barra. Fechamento ajustável na cintura. Traz o balanço, cor e irreverência clássicos do carnaval carioca em alto estilo.",
        sizes: ["P", "M", "G"]
    },
    {
        id: 7,
        title: "Brincos Cascata Búzios Realeza",
        category: "acessorios",
        price: 98.00,
        badge: "custom",
        image: "assets/about_atelier.png",
        imageHover: "assets/hero_banner_carnaval.png",
        desc: "Brincos de cascata maxi feitos com base em metal escovado dourado, pedrarias vermelhas e búzios naturais envoltos em fios de ouro. Leves, marcantes e repletos de simbolismo afro-brasileiro.",
        sizes: ["U"]
    },
    {
        id: 8,
        title: "Corset Renda & Paetês Bahia",
        category: "carnaval",
        price: 249.90,
        originalPrice: 299.90,
        badge: "",
        image: "assets/hero_banner_carnaval.png",
        imageHover: "assets/about_atelier.png",
        desc: "Corset com barbatanas flexíveis para modelagem perfeita da silhueta, coberto por renda preta premium sobreposta a paetês dourados e vermelhos. Possui fechamento ajustável por ilhós nas costas.",
        sizes: ["P", "M", "G"]
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
        dom.productsGrid.innerHTML = '<p class="cart-empty-message">Nenhum produto cadastrado nesta categoria.</p>';
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
                <div class="product-category">${p.category === 'afro' ? 'Moda Afro-Chic' : p.category === 'carnaval' ? 'Carnaval de Luxo' : 'Acessórios'}</div>
                <h3 class="product-title">${p.title}</h3>
                <div class="product-price">
                    ${hasDiscount ? `<span>R$ ${p.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                    R$ ${p.price.toFixed(2).replace('.', ',')}
                </div>
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

    // Ação do Checkout (Apenas Simulado)
    dom.btnCheckout.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast("Sua sacola está vazia!");
            return;
        }
        showToast("Encaminhando para pagamento seguro... Obrigado por comprar no Atelier!");
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
        dom.cartSubtotal.textContent = "R$ 0,00";
        dom.cartTotal.textContent = "R$ 0,00";
        dom.shippingMessage.textContent = "Adicione itens para calcular o Frete Grátis";
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
                    <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
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

    // 4. Subtotal e Frete Grátis
    dom.cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    
    const freeShippingThreshold = 399.00;
    if (subtotal >= freeShippingThreshold) {
        dom.shippingMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--color-green);"></i> Parabéns! Você ganhou <strong>Frete Grátis</strong>`;
        dom.shippingBarFill.style.width = "100%";
        dom.cartTotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        document.getElementById('cart-shipping-value').textContent = "Grátis";
    } else {
        const remaining = freeShippingThreshold - subtotal;
        dom.shippingMessage.innerHTML = `Faltam R$ ${remaining.toFixed(2).replace('.', ',')} para ganhar <strong>Frete Grátis</strong>`;
        
        const percentage = (subtotal / freeShippingThreshold) * 100;
        dom.shippingBarFill.style.width = `${percentage}%`;
        
        const shippingCost = 25.00; // Frete Simulado
        const total = subtotal + shippingCost;
        document.getElementById('cart-shipping-value').textContent = `R$ ${shippingCost.toFixed(2).replace('.', ',')}`;
        dom.cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
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
    dom.modalCat.textContent = product.category === 'afro' ? 'Moda Afro-Chic' : product.category === 'carnaval' ? 'Carnaval de Luxo' : 'Acessórios';
    dom.modalTitle.textContent = product.title;
    dom.modalPrice.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
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
        
        // Simular envio
        dom.btnSubmitForm.disabled = true;
        dom.btnSubmitForm.textContent = "Processando solicitação...";

        setTimeout(() => {
            dom.btnSubmitForm.style.display = 'none';
            dom.formSuccess.style.display = 'block';
            
            showToast("Orçamento de alta costura solicitado!");
            
            // Resetar formulário após alguns segundos
            setTimeout(() => {
                dom.bookingForm.reset();
                dom.btnSubmitForm.style.display = 'block';
                dom.btnSubmitForm.disabled = false;
                dom.btnSubmitForm.textContent = "Enviar Solicitação";
                dom.formSuccess.style.display = 'none';
            }, 6000);

        }, 1500);
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
