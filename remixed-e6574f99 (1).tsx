import React, { useState, useEffect } from 'react';
import { ShoppingCart, Home, Search, User, Menu, ChevronLeft, ChevronRight, Plus, Minus, X, Bell, MapPin, Instagram, Facebook, Mail } from 'lucide-react';

const TechCaseStore = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Todo', icon: '📱' },
    { id: 'cases', name: 'Carcasas', icon: '🛡️' },
    { id: 'protectors', name: 'Protectores', icon: '🔒' },
    { id: 'headphones', name: 'Audífonos', icon: '🎧' },
    { id: 'chargers', name: 'Cargadores', icon: '🔌' },
  ];

  const products = [
    { 
      id: 1, 
      name: 'Carcasa Transparente Premium', 
      category: 'cases', 
      price: 2500, 
      image: 'https://images.unsplash.com/photo-1585490895728-4e0d4e17d68a?w=400&h=400&fit=crop',
      description: 'Protección máxima con diseño elegante. Material TPU de alta calidad resistente a impactos.' 
    },
    { 
      id: 2, 
      name: 'Protector de Pantalla 9H', 
      category: 'protectors', 
      price: 1500, 
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
      description: 'Cristal templado con dureza 9H. Instalación fácil y sin burbujas. Protección total.' 
    },
    { 
      id: 3, 
      name: 'Audífonos Bluetooth Pro', 
      category: 'headphones', 
      price: 8900, 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      description: 'Sonido Hi-Fi con cancelación de ruido activa. Batería de 20 horas de reproducción.' 
    },
    { 
      id: 4, 
      name: 'Cargador Rápido 65W', 
      category: 'chargers', 
      price: 4500, 
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
      description: 'Carga ultrarrápida para todos tus dispositivos. Certificado y seguro con protección.' 
    },
    { 
      id: 5, 
      name: 'Carcasa con Anillo Soporte', 
      category: 'cases', 
      price: 3200, 
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
      description: 'Soporte integrado 360° con anillo magnético. Diseño antideslizante premium.' 
    },
    { 
      id: 6, 
      name: 'Cable USB-C Premium 2M', 
      category: 'chargers', 
      price: 1800, 
      image: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?w=400&h=400&fit=crop',
      description: 'Cable reforzado de 2 metros. Transferencia de datos rápida y carga veloz.' 
    },
    { 
      id: 7, 
      name: 'Audífonos In-Ear Sport', 
      category: 'headphones', 
      price: 5500, 
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      description: 'Resistentes al agua IPX7. Ideal para deportes con ajuste ergonómico perfecto.' 
    },
    { 
      id: 8, 
      name: 'Protector de Cámara Ultra', 
      category: 'protectors', 
      price: 1200, 
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
      description: 'Protección específica para lentes. No afecta la calidad de imagen ni el flash.' 
    },
  ];

  const slides = [
    { title: 'Nueva Colección', subtitle: 'Accesorios Premium 2024', bg: 'from-orange-400 to-rose-400' },
    { title: 'Ofertas Especiales', subtitle: 'Hasta 40% de descuento', bg: 'from-rose-400 to-pink-400' },
    { title: 'Envío Gratis', subtitle: 'En compras mayores a $5000', bg: 'from-amber-400 to-orange-400' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (method) => {
    // Simulación de login
    console.log(`Iniciando sesión con ${method}`);
    setIsLoggedIn(true);
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const filteredProducts = products.filter(p => 
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // LOGIN VIEW
  const LoginView = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-rose-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-300 to-rose-300 flex items-center justify-center shadow-2xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TechCase</h1>
          <p className="text-gray-600 text-lg">Accesorios Premium para tu Móvil</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={() => handleLogin('normal')}
            className="w-full bg-gradient-to-r from-orange-400 to-rose-400 text-white py-4 rounded-xl hover:shadow-xl transition-all font-bold text-lg"
          >
            LOGIN
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-semibold">O continúa con</span>
            </div>
          </div>

          <button
            onClick={() => handleLogin('Google')}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-3 group"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google</span>
          </button>

          <button
            onClick={() => handleLogin('Facebook')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-3"
          >
            <Facebook className="w-6 h-6" fill="white" />
            <span>Facebook</span>
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          ¿No tienes cuenta? <button onClick={() => handleLogin('new')} className="text-orange-500 font-semibold hover:underline">Regístrate aquí</button>
        </p>
      </div>
    </div>
  );

  // HOME VIEW
  const HomeView = () => (
    <div className="space-y-6 pb-20">
      {/* Slider */}
      <div className="relative h-64 overflow-hidden rounded-3xl mx-4 mt-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out`}
            style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
          >
            <div className={`h-full w-full bg-gradient-to-br ${slide.bg} flex flex-col items-center justify-center text-white p-8`}>
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}
        
        <button
          onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Categorías</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.filter(c => c.id !== 'all').map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentView('catalog');
              }}
              className="bg-gradient-to-br from-orange-300 to-rose-300 rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-lg"
            >
              <div className="text-5xl mb-2">{cat.icon}</div>
              <div className="text-white font-semibold text-lg">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Destacados</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );

  // CATALOG VIEW
  const CatalogView = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-orange-200 to-rose-200 p-6 rounded-b-3xl mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="mb-4 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3 shadow-lg">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-gray-700"
          />
        </div>
      </div>

      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No se encontraron productos
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // PRODUCT CARD
  const ProductCard = ({ product }) => (
    <div
      onClick={() => {
        setSelectedProduct(product);
        setCurrentView('product');
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-1 text-sm line-clamp-2">{product.name}</h4>
        <p className="text-rose-500 font-bold text-lg mb-2">${product.price.toLocaleString()}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full bg-gradient-to-r from-orange-400 to-rose-400 text-white py-2 rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          COMPRAR
        </button>
      </div>
    </div>
  );

  // PRODUCT DETAIL VIEW
  const ProductDetailView = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-orange-200 to-rose-200 p-6 rounded-b-3xl mb-6">
        <button
          onClick={() => setCurrentView('catalog')}
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img 
            src={selectedProduct?.image} 
            alt={selectedProduct?.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct?.name}</h2>
          <p className="text-4xl font-bold text-rose-500 mb-4">${selectedProduct?.price.toLocaleString()}</p>
          <p className="text-gray-600 leading-relaxed">{selectedProduct?.description}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              addToCart(selectedProduct);
              setCurrentView('cart');
            }}
            className="w-full bg-gradient-to-r from-orange-400 to-rose-400 text-white py-4 rounded-2xl hover:shadow-xl transition-all font-bold text-lg"
          >
            Agregar al Carrito
          </button>
          
          <button
            onClick={() => setCurrentView('catalog')}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl hover:bg-gray-200 transition-all font-semibold"
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );

  // CART VIEW
  const CartView = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-orange-200 to-rose-200 p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('catalog')}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Carrito</h2>
          <div className="w-6" />
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12 px-6">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-lg mb-6">Tu carrito está vacío</p>
          <button
            onClick={() => setCurrentView('catalog')}
            className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all font-semibold"
          >
            Ir a Comprar
          </button>
        </div>
      ) : (
        <div className="px-6 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex gap-4">
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-rose-500 font-bold">${item.price.toLocaleString()}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-gray-100 p-1 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-gray-100 p-1 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">${getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Envío</span>
              <span className="font-semibold">Gratis</span>
            </div>
            <div className="border-t border-gray-300 pt-3 flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span className="text-rose-500">${getTotalPrice().toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('checkout')}
            className="w-full bg-gradient-to-r from-orange-400 to-rose-400 text-white py-4 rounded-2xl hover:shadow-xl transition-all font-bold text-lg"
          >
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );

  // CHECKOUT VIEW
  const CheckoutView = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-orange-200 to-rose-200 p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('cart')}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Confirmar Compra</h2>
          <div className="w-6" />
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Resumen del Pedido</h3>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-gray-600">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-semibold">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-rose-500">${getTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Información de Entrega</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Dirección de entrega"
              rows="3"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-rose-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          onClick={() => {
            alert('¡Compra realizada con éxito! Total: $' + getTotalPrice().toLocaleString());
            setCart([]);
            setCurrentView('home');
          }}
          className="w-full bg-gradient-to-r from-orange-400 to-rose-400 text-white py-4 rounded-2xl hover:shadow-xl transition-all font-bold text-lg"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );

  // PROFILE VIEW
  const ProfileView = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-orange-200 to-rose-200 p-8 rounded-b-3xl mb-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center mb-4 shadow-xl">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">TechCase</h2>
          <p className="text-gray-600">Usuario</p>
        </div>
      </div>

      <div className="px-6 space-y-4">
        <button className="w-full bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all">
          <div className="bg-gradient-to-br from-orange-300 to-rose-300 p-3 rounded-xl">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <span className="font-semibold text-gray-800">Notificaciones</span>
        </button>

        <button className="w-full bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all">
          <div className="bg-gradient-to-br from-orange-300 to-rose-300 p-3 rounded-xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="font-semibold text-gray-800">Ubicación</span>
        </button>

        <button className="w-full bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all">
          <div className="bg-gradient-to-br from-orange-300 to-rose-300 p-3 rounded-xl">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <span className="font-semibold text-gray-800">Mis Compras</span>
        </button>

        <div className="pt-6">
          <h3 className="text-gray-600 font-semibold mb-4 px-2">Síguenos</h3>
          <div className="space-y-3">
            <button className="w-full bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all">
              <Instagram className="w-6 h-6 text-pink-500" />
              <span className="font-semibold text-gray-800">Instagram</span>
            </button>

            <button className="w-full bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all">
              <Facebook className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-gray-800">Facebook</span>
            </button>

            <button className="w-full bg-white rounded-2xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all">
              <Mail className="w-6 h-6 text-gray-500" />
              <span className="font-semibold text-gray-800">Email</span>
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setIsLoggedIn(false);
            setCart([]);
          }}
          className="w-full bg-gradient-to-r from-red-400 to-red-500 text-white py-4 rounded-2xl hover:shadow-xl transition-all font-bold mt-6"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );

  // Render login or main app
  if (!isLoggedIn) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-300 to-rose-300 text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-40">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <h1 className="text-2xl font-bold">TechCase</h1>
        
        <button
          onClick={() => setCurrentView('profile')}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <User className="w-6 h-6" />
        </button>
      </div>

      {/* Side Menu */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="bg-white w-64 h-full shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800">TechCase</p>
                <p className="text-sm text-gray-500">Usuario</p>
              </div>
            </div>

            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentView('catalog');
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-100 hover:to-rose-100 transition-all text-gray-700 font-semibold"
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        {currentView === 'home' && <HomeView />}
        {currentView === 'catalog' && <CatalogView />}
        {currentView === 'product' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'profile' && <ProfileView />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-30">
        <div className="max-w-md mx-auto flex items-center justify-around p-4">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'home' ? 'text-rose-500' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-semibold">Inicio</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('catalog');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'catalog' ? 'text-rose-500' : 'text-gray-400'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-semibold">Buscar</span>
          </button>

          <button
            onClick={() => setCurrentView('cart')}
            className="relative"
          >
            <div className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'cart' ? 'text-rose-500' : 'text-gray-400'
            }`}>
              <ShoppingCart className="w-6 h-6" />
              <span className="text-xs font-semibold">Carrito</span>
            </div>
            {getTotalItems() > 0 && (
              <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {getTotalItems()}
              </div>
            )}
          </button>

          <button
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'profile' ? 'text-rose-500' : 'text-gray-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-semibold">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechCaseStore;