import { useState, useEffect, useRef } from "react";
import {
  Search, Menu, X, ShoppingBag, Heart, User, ChevronRight,
  ChevronDown, ChevronUp, Star, Globe, CreditCard, Truck,
  RefreshCw, Headphones, LayoutGrid, List, Minus, Plus,
  ArrowRight, Check, Trash2, BarChart2, Settings, Users,
  Tag, Box, TrendingUp, Bell, Mail, Instagram, Facebook,
  Twitter, Package, Lock, MapPin, Filter, FileText, LogOut, Zap
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const img = (id, w = 800, h = 1000) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "p1", name: "Camisa Lino Slim Premium", price: 139, salePrice: 95,
    category: "Camisas", badge: "Oferta",
    colors: ["#F5F0EB", "#111111", "#2C4A3E"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "photo-1596755094514-f87e34085b2c",
    hoverImage: "photo-1503341504253-dff4815485f1",
    description: "Camisa de lino irlandés de primera calidad, corte slim. Confeccionada a mano en nuestros talleres de Lisboa. El complemento esencial del hombre elegante.",
    material: "100% Lino premium irlandés. Lavar a mano o ciclo delicado 30°C.",
    stock: 24, rating: 4.8, reviews: 189,
  },
  {
    id: "p2", name: "Polo Piqué Cotton Premium", price: 79,
    category: "Camisas", badge: "Más vendido",
    colors: ["#1C3528", "#111111", "#F5F0EB"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "photo-1521572163474-6864f9cf17ab",
    hoverImage: "photo-1503341504253-dff4815485f1",
    description: "Polo de piqué 100% algodón egipcio. El balance perfecto entre elegancia casual y comodidad durante todo el día.",
    material: "100% Algodón egipcio 220g/m². Lavable a máquina 30°C.",
    stock: 42, rating: 4.9, reviews: 312,
  },
  {
    id: "p3", name: "Camiseta Essential Supima", price: 55,
    category: "Camisetas", badge: "Más vendido",
    colors: ["#F9F8F5", "#111111", "#E5E2D9"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "photo-1521572163474-6864f9cf17ab",
    hoverImage: "photo-1503341504253-dff4815485f1",
    description: "Camiseta esencial en algodón Supima 190g/m². El básico imprescindible con corte moderno y costuras reforzadas.",
    material: "100% Algodón Supima USA. Lavable a máquina 30°C.",
    stock: 56, rating: 4.9, reviews: 401,
  },
  {
    id: "p4", name: "Jean Slim Dark Wash 12oz", price: 169,
    category: "Pantalones", badge: "Nuevo",
    colors: ["#1A1A2E", "#2D4A22", "#111111"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    image: "photo-1542272604-787c3835535d",
    hoverImage: "photo-1555689502-c4b22d76c56f",
    description: "Jean slim en denim selvage japonés de 12oz. Diseñado para un ajuste perfecto que mejora con el uso y el tiempo.",
    material: "100% Algodón denim selvárgado. Lavar del revés a 30°C.",
    stock: 38, rating: 4.7, reviews: 156,
  },
  {
    id: "p5", name: "Pantalón Chino Slim", price: 129,
    category: "Pantalones", badge: "Nuevo",
    colors: ["#C8B89A", "#1C3528", "#111111"],
    sizes: ["28", "30", "32", "34", "36"],
    image: "photo-1509631179647-0177331693ae",
    hoverImage: "photo-1594938298603-c8148c4b4a7e",
    description: "Pantalón chino slim de sarga de algodón premium. Versátil para look casual o smart-casual.",
    material: "98% Algodón, 2% Elastano. Lavable a máquina 30°C.",
    stock: 33, rating: 4.6, reviews: 98,
  },
  {
    id: "p6", name: "Bomber Cuero Merino", price: 389, salePrice: 269,
    category: "Chaquetas", badge: "Oferta",
    colors: ["#111111", "#1C3528", "#3B2F2F"],
    sizes: ["S", "M", "L", "XL"],
    image: "photo-1591047139829-d91aecb6caea",
    hoverImage: "photo-1539533018257-b70b54e1ab71",
    description: "Bomber artesanal en cuero Merino italiano con forro de lana. El statement piece de temporada para el hombre con criterio.",
    material: "Exterior: Cuero Merino italiano. Forro: 80% Lana, 20% Cachemira.",
    stock: 14, rating: 4.9, reviews: 77,
  },
  {
    id: "p7", name: "Trench Coat Gabardina Premium", price: 459, salePrice: 319,
    category: "Chaquetas", badge: "Oferta",
    colors: ["#C8A882", "#111111"],
    sizes: ["S", "M", "L", "XL"],
    image: "photo-1520975954732-35dd22299614",
    hoverImage: "photo-1591047139829-d91aecb6caea",
    description: "Trench clásico en gabardina de algodón con forro desmontable. Icono de la moda masculina reinventado.",
    material: "100% Algodón Gabardina. Forro desmontable: Viscosa. Limpieza en seco.",
    stock: 11, rating: 5.0, reviews: 44,
  },
  {
    id: "p8", name: "Oxford Cuero Liso Negro", price: 285,
    category: "Zapatos", badge: "Nuevo",
    colors: ["#111111", "#3B2F2F"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    image: "photo-1542291026-7eec264c27ff",
    hoverImage: "photo-1533867617858-e7b97e060509",
    description: "Oxford clásico de cuero liso full-grain italiano. Horma anatómica, suela de cuero. Hecho a mano en Almansa.",
    material: "Upper: Cuero full-grain italiano. Suela: Cuero con puntera de goma.",
    stock: 18, rating: 4.9, reviews: 134,
  },
  {
    id: "p9", name: "Chelsea Boot Cuero Marrón", price: 319,
    category: "Zapatos", badge: "Más vendido",
    colors: ["#6B4226", "#111111"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    image: "photo-1533867617858-e7b97e060509",
    hoverImage: "photo-1542291026-7eec264c27ff",
    description: "Chelsea boot en cuero pullup que envejece con carácter. Elástico lateral, suela de cuero con goma vulcanizada.",
    material: "Upper: Cuero pullup italiano. Suela: Cuero + goma vulcanizada.",
    stock: 22, rating: 4.8, reviews: 201,
  },
  {
    id: "p10", name: "Sneaker Cuero Blanco Minimal", price: 249,
    category: "Zapatos", badge: "Nuevo",
    colors: ["#F9F8F5", "#111111"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    image: "photo-1549298916-b41d501d3772",
    hoverImage: "photo-1542291026-7eec264c27ff",
    description: "Sneaker minimalista en cuero liso italiano. Diseño limpio y atemporal para el hombre que no necesita logos.",
    material: "Upper: Cuero liso italiano. Suela: Goma vulcanizada cupsole.",
    stock: 29, rating: 4.7, reviews: 178,
  },
  {
    id: "p11", name: "Loafer Penny Premium", price: 269,
    category: "Zapatos", badge: "Nuevo",
    colors: ["#111111", "#3B2F2F"],
    sizes: ["40", "41", "42", "43", "44"],
    image: "photo-1614252235316-8c857196f400",
    hoverImage: "photo-1533867617858-e7b97e060509",
    description: "Penny loafer en cuero suave italiano. Corte mocasín con suela de goma flexible. Elegancia sin cordones.",
    material: "Upper: Cuero suave italiano. Suela: Goma natural.",
    stock: 16, rating: 4.8, reviews: 89,
  },
  {
    id: "p12", name: "Reloj Automático Acero", price: 545,
    category: "Accesorios", badge: "Nuevo",
    colors: ["#111111", "#C0A060", "#F9F8F5"],
    sizes: ["Único"],
    image: "photo-1523275335684-37898b6baf30",
    hoverImage: "photo-1612817288484-6f916006741a",
    description: "Reloj automático Swiss Made, caja acero 316L, cristal de zafiro. Movimiento ETA 2824-2. 80h de reserva de marcha.",
    material: "Caja: Acero 316L. Cristal: Zafiro. Correa: Cuero de becerro italiano.",
    stock: 8, rating: 5.0, reviews: 56,
  },
];

const CATEGORIES = [
  { name: "Camisas", image: "photo-1596755094514-f87e34085b2c", count: 18 },
  { name: "Camisetas", image: "photo-1521572163474-6864f9cf17ab", count: 14 },
  { name: "Pantalones", image: "photo-1542272604-787c3835535d", count: 16 },
  { name: "Chaquetas", image: "photo-1591047139829-d91aecb6caea", count: 20 },
  { name: "Zapatos", image: "photo-1542291026-7eec264c27ff", count: 28 },
  { name: "Accesorios", image: "photo-1523275335684-37898b6baf30", count: 22 },
];

const TESTIMONIALS = [
  { name: "Alejandro V.", location: "Madrid", text: "La calidad es brutal. El trench coat es una pieza de inversión real. Material, confección, todo al nivel de firmas que cuestan el doble.", rating: 5, avatar: "photo-1500648767791-00dcc994a43e" },
  { name: "David R.", location: "Barcelona", text: "Los Oxford son increíbles. Cuero premium, horma perfecta. Llevo 2 años con ellos y han mejorado con el tiempo. Esto es comprar bien.", rating: 5, avatar: "photo-1507003211169-0a1dd7228f2d" },
  { name: "Marcos T.", location: "Valencia", text: "AUREL ha redefinido mi forma de vestir. Prendas atemporales, construidas para durar. El bomber de cuero es de otro nivel.", rating: 5, avatar: "photo-1519085360753-af0119f7cbe7" },
  { name: "Pablo S.", location: "Bilbao", text: "El reloj automático superó todas mis expectativas. Movimiento suizo, acabados impecables. Para el hombre que aprecia lo bien hecho.", rating: 5, avatar: "photo-1506794778202-cad84cf45f1d" },
];

const INSTAGRAM_POSTS = [
  "photo-1506794778202-cad84cf45f1d",
  "photo-1519085360753-af0119f7cbe7",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1480455624313-e29b44bbfde1",
  "photo-1544005313-94ddf0286df2",
  "photo-1558769132-cb1aea458c5e",
];

const SALES_DATA = [
  { month: "Ene", ventas: 48 }, { month: "Feb", ventas: 41 },
  { month: "Mar", ventas: 59 }, { month: "Abr", ventas: 65 },
  { month: "May", ventas: 62 }, { month: "Jun", ventas: 78 },
  { month: "Jul", ventas: 89 }, { month: "Ago", ventas: 83 },
  { month: "Sep", ventas: 96 }, { month: "Oct", ventas: 91 },
  { month: "Nov", ventas: 118 }, { month: "Dic", ventas: 142 },
];

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={11} className={i <= Math.round(rating) ? "fill-[#B8963E] stroke-[#B8963E]" : "stroke-[#ccc] fill-none"} />
      ))}
      {count !== undefined && <span className="text-[11px] text-[#999] ml-1">({count})</span>}
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onView, onAddToCart, onToggleWishlist, isWishlisted }) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

  return (
    <div className="group relative cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#E5E2D9]">
        <img
          src={img(hovered ? product.hoverImage : product.image, 600, 800)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 font-medium ${
            product.badge === "Oferta" ? "bg-[#111111] text-white" :
            product.badge === "Nuevo" ? "bg-[#1C3528] text-white" :
            "bg-white text-[#111111]"
          }`}>{product.badge}</span>
        )}
        <button
          onClick={e => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart size={13} className={isWishlisted ? "fill-[#111111] stroke-[#111111]" : "stroke-[#111111] fill-none"} />
        </button>
        <div className={`absolute bottom-0 left-0 right-0 bg-white/97 p-3 transition-transform duration-300 ease-out ${hovered ? "translate-y-0" : "translate-y-full"}`}>
          <div className="flex gap-1 flex-wrap mb-2">
            {product.sizes.slice(0, 5).map(size => (
              <button key={size} onClick={e => { e.stopPropagation(); setSelectedSize(size); }}
                className={`text-[10px] px-2 py-0.5 border transition-colors ${selectedSize === size ? "border-[#111111] bg-[#111111] text-white" : "border-[#111111]/20 text-[#111111] hover:border-[#111111]"}`}>
                {size}
              </button>
            ))}
          </div>
          <button onClick={e => { e.stopPropagation(); onAddToCart(product, selectedSize, product.colors[0]); }}
            className="w-full py-2 bg-[#111111] text-white text-[10px] tracking-widest uppercase hover:bg-[#1C3528] transition-colors">
            Añadir al carrito
          </button>
        </div>
      </div>
      <div className="mt-3" onClick={() => onView(product)}>
        <div className="flex gap-1.5 mb-1.5">
          {product.colors.slice(0, 4).map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-full border border-black/10" style={{ background: c }} />
          ))}
        </div>
        <p className="text-[13px] text-[#111111] font-medium leading-snug">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          {product.salePrice ? (
            <>
              <span className="text-[13px] font-medium text-[#1C3528]">€{product.salePrice}</span>
              <span className="text-[12px] text-[#bbb] line-through">€{product.price}</span>
              <span className="text-[9px] text-white bg-[#111111] px-1 py-0.5">-{discount}%</span>
            </>
          ) : (
            <span className="text-[13px] font-medium text-[#111111]">€{product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection({ onNavigate }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.38}px)` }}>
        <img src={img("photo-1506794778202-cad84cf45f1d", 1920, 1200)} alt="AUREL — Moda Masculina" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
      </div>
      <div className="relative h-full flex items-end pb-24 px-8 md:px-20">
        <div className="max-w-xl">
          <p className="text-white/40 text-[10px] tracking-[0.45em] uppercase mb-5">
            Colección Otoño · Invierno 2025
          </p>
          <h1 className="text-white leading-none mb-6" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 400, letterSpacing: "-0.02em" }}>
            Viste<br /><em>con criterio</em>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-sm" style={{ fontWeight: 300 }}>
            Ropa y calzado de hombre de primera calidad. Construidos para durar. Diseñados para destacar sin esfuerzo.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => onNavigate("catalog")} className="bg-white text-[#111111] px-8 py-3.5 text-[11px] tracking-widest uppercase hover:bg-[#1C3528] hover:text-white transition-colors duration-300">
              Comprar ahora
            </button>
            <button onClick={() => onNavigate("catalog")} className="border border-white/35 text-white px-8 py-3.5 text-[11px] tracking-widest uppercase hover:border-white hover:bg-white/10 transition-all duration-300">
              Ver catálogo
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2">
        <span className="text-white/25 text-[9px] tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        <div className="w-px h-14 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/55 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
function CategoriesSection({ onNavigate }) {
  return (
    <section className="py-20 px-8 md:px-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#999] mb-2">Explorar</p>
          <h2 className="text-4xl text-[#111111] font-normal" style={{ fontFamily: "Playfair Display, serif" }}>Categorías</h2>
        </div>
        <button onClick={() => onNavigate("catalog")} className="hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#111111] hover:text-[#1C3528] transition-colors">
          Ver todo <ArrowRight size={13} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
        {CATEGORIES.map(cat => (
          <div key={cat.name} onClick={() => onNavigate("catalog")} className="group cursor-pointer relative aspect-[2/3] overflow-hidden bg-[#E5E2D9]">
            <img src={img(cat.image, 400, 600)} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white text-[12px] font-medium tracking-wide">{cat.name}</p>
              <p className="text-white/50 text-[10px]">{cat.count} piezas</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FEATURED PRODUCTS ────────────────────────────────────────────────────────
function FeaturedSection({ products, onView, onAddToCart, onToggleWishlist, wishlist }) {
  return (
    <section className="py-20 px-8 md:px-16 bg-[#F9F8F5]">
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#999] mb-2">Selección</p>
        <h2 className="text-4xl text-[#111111] font-normal" style={{ fontFamily: "Playfair Display, serif" }}>Productos Destacados</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onView={onView} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={wishlist.has(p.id)} />
        ))}
      </div>
    </section>
  );
}

// ─── COLLECTION EDITORIAL ─────────────────────────────────────────────────────
function CollectionSection({ onNavigate }) {
  return (
    <section>
      <div className="grid md:grid-cols-2 min-h-[70vh]">
        <div className="relative overflow-hidden">
          <img src={img("photo-1519085360753-af0119f7cbe7", 900, 1000)} alt="Colección editorial masculina" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="bg-[#1C3528] flex items-center justify-center p-12 md:p-20">
          <div className="max-w-sm">
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/40 mb-6">OI 2025</p>
            <h2 className="text-5xl text-white font-normal leading-tight mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Construido<br /><em>para durar</em>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Cada pieza de nuestra colección está pensada para el hombre que invierte bien. Materiales
              seleccionados, confección artesanal, diseño sin tendencias que envejece con elegancia.
            </p>
            <button onClick={() => onNavigate("catalog")} className="flex items-center gap-3 text-[11px] tracking-widest uppercase text-white border-b border-white/35 pb-1 hover:text-white/70 hover:border-white/70 transition-colors">
              Explorar colección <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SHOES SECTION ────────────────────────────────────────────────────────────
function ShoesSection({ products, onView, onAddToCart, onToggleWishlist, wishlist }) {
  const shoes = products.filter(p => p.category === "Zapatos");
  return (
    <section className="py-20 px-8 md:px-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#999] mb-2">Calzado</p>
          <h2 className="text-4xl text-[#111111] font-normal" style={{ fontFamily: "Playfair Display, serif" }}>Zapatos de Hombre</h2>
        </div>
        <button onClick={() => onView(shoes[0])} className="hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#111111] hover:text-[#1C3528] transition-colors">
          Ver todos <ArrowRight size={13} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {shoes.map(p => (
          <ProductCard key={p.id} product={p} onView={onView} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={wishlist.has(p.id)} />
        ))}
      </div>
    </section>
  );
}

// ─── BENEFITS ────────────────────────────────────────────────────────────────
function BenefitsSection() {
  const items = [
    { icon: <Truck size={20} />, title: "Envío Rápido", desc: "Entrega en 24-48h en España. Internacional en 3-5 días." },
    { icon: <Lock size={20} />, title: "Pago Seguro", desc: "Cifrado SSL 256-bit. Múltiples métodos de pago." },
    { icon: <RefreshCw size={20} />, title: "Cambios Fáciles", desc: "30 días para cambios y devoluciones sin preguntas." },
    { icon: <Headphones size={20} />, title: "Soporte 24/7", desc: "Respuesta garantizada en menos de 2 horas." },
  ];
  return (
    <section className="py-14 px-8 md:px-16 border-y border-[#111111]/8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((b, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-3">
            <div className="text-[#1C3528]">{b.icon}</div>
            <p className="text-[12px] font-medium tracking-widest uppercase text-[#111111]">{b.title}</p>
            <p className="text-[11px] text-[#999] leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── BRAND ───────────────────────────────────────────────────────────────────
function BrandSection() {
  return (
    <section className="py-20 px-8 md:px-16">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#999] mb-4">Nuestra filosofía</p>
          <h2 className="text-4xl text-[#111111] font-normal mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            Para el hombre<br /><em>que compra bien</em>
          </h2>
          <p className="text-[#5A5750] text-sm leading-relaxed mb-5">
            Desde 2012, AUREL existe para ofrecer al hombre una alternativa real: prendas y calzado
            de calidad artesanal a precios que tienen sentido. Sin logos innecesarios, sin tendencias efímeras.
          </p>
          <p className="text-[#5A5750] text-sm leading-relaxed mb-10">
            Cada producto lleva el nombre del maestro artesano que lo fabricó. Eso es responsabilidad. Eso es calidad real.
          </p>
          <div className="flex gap-12">
            {[{ val: "12+", lbl: "Años" }, { val: "38k", lbl: "Clientes" }, { val: "96%", lbl: "Satisfacción" }].map(s => (
              <div key={s.lbl}>
                <p className="text-3xl text-[#111111]" style={{ fontFamily: "Playfair Display, serif" }}>{s.val}</p>
                <p className="text-[10px] text-[#999] uppercase tracking-wider mt-1">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-[3/4] overflow-hidden bg-[#E5E2D9]">
            <img src={img("photo-1480455624313-e29b44bbfde1", 500, 700)} alt="Brand lifestyle" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[3/4] overflow-hidden bg-[#E5E2D9] mt-10">
            <img src={img("photo-1507003211169-0a1dd7228f2d", 500, 700)} alt="Brand editorial" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  return (
    <section className="py-20 bg-[#E5E2D9]">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#3A4F3F] mb-2">Opiniones</p>
        <h2 className="text-4xl text-[#111111] font-normal mb-12" style={{ fontFamily: "Playfair Display, serif" }}>Lo que dicen nuestros clientes</h2>
        <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#1C3528]">
          <img src={img(TESTIMONIALS[current].avatar, 100, 100)} alt={TESTIMONIALS[current].name} className="w-full h-full object-cover" />
        </div>
        <StarRating rating={TESTIMONIALS[current].rating} />
        <blockquote className="text-xl italic text-[#111111] mt-6 mb-5 leading-relaxed" style={{ fontFamily: "Playfair Display, serif" }}>
          "{TESTIMONIALS[current].text}"
        </blockquote>
        <p className="text-[13px] font-medium text-[#111111]">{TESTIMONIALS[current].name}</p>
        <p className="text-[11px] text-[#999]">{TESTIMONIALS[current].location}</p>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all duration-300 ${i === current ? "w-8 bg-[#111111]" : "w-1.5 bg-[#111111]/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INSTAGRAM ────────────────────────────────────────────────────────────────
function InstagramSection() {
  return (
    <section className="py-20 px-8 md:px-16">
      <div className="text-center mb-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#999] mb-2">Síguenos</p>
        <h2 className="text-4xl text-[#111111] font-normal mb-1" style={{ fontFamily: "Playfair Display, serif" }}>@aurel.man</h2>
        <p className="text-[12px] text-[#999]">Comparte tu look con #AurelMan</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
        {INSTAGRAM_POSTS.map((photoId, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden bg-[#E5E2D9] cursor-pointer">
            <img src={img(photoId, 300, 300)} alt={`Look ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-center justify-center">
              <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-md mx-auto px-8 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#1C3528] mb-4">Exclusivo</p>
        <h2 className="text-4xl text-white font-normal mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          Únete a la<br /><em>lista AUREL</em>
        </h2>
        <p className="text-white/35 text-[12px] mb-8 leading-relaxed">
          Acceso anticipado a nuevas colecciones, preventa exclusiva y ofertas para miembros. Sin spam.
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-[#4A9060]">
            <Check size={15} /><span className="text-sm tracking-wide">Estás dentro. Bienvenido.</span>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }} className="flex">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com"
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-[12px] focus:outline-none focus:border-[#1C3528] transition-colors"
            />
            <button type="submit" className="bg-[#1C3528] text-white px-5 py-3 text-[10px] tracking-widest uppercase hover:bg-[#2A5040] transition-colors whitespace-nowrap">
              Suscribirse
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ products, onView, onAddToCart, onToggleWishlist, wishlist, onNavigate }) {
  return (
    <div>
      <HeroSection onNavigate={onNavigate} />
      <CategoriesSection onNavigate={onNavigate} />
      <FeaturedSection products={products.slice(0, 8)} onView={onView} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} />
      <CollectionSection onNavigate={onNavigate} />
      <ShoesSection products={products} onView={onView} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} />
      <BenefitsSection />
      <BrandSection />
      <TestimonialsSection />
      <InstagramSection />
      <NewsletterSection />
    </div>
  );
}

// ─── CATALOG ─────────────────────────────────────────────────────────────────
function CatalogPage({ products, onView, onAddToCart, onToggleWishlist, wishlist }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(600);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");

  const cats = ["Todas", "Camisas", "Camisetas", "Pantalones", "Chaquetas", "Zapatos", "Accesorios"];

  const filtered = products.filter(p => {
    if (selectedCategory !== "Todas" && p.category !== selectedCategory) return false;
    if ((p.salePrice ?? p.price) > maxPrice) return false;
    if (selectedSizes.length > 0 && !selectedSizes.some(s => p.sizes.includes(s))) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
    if (sortBy === "price-desc") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const toggleSize = s => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const hasFilters = selectedCategory !== "Todas" || selectedSizes.length > 0 || maxPrice < 600;

  return (
    <div className="min-h-screen pt-16">
      <div className="px-8 md:px-16 py-6 border-b border-[#111111]/8 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl text-[#111111] font-normal" style={{ fontFamily: "Playfair Display, serif" }}>Catálogo</h1>
          <p className="text-[11px] text-[#999]">{sorted.length} productos</p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <button onClick={() => setFilterOpen(o => !o)} className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#111111] hover:text-[#1C3528] transition-colors">
            <Filter size={13} /> Filtros
          </button>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-[12px] border border-[#111111]/15 px-3 py-2 bg-white focus:outline-none">
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor valorados</option>
          </select>
          <div className="flex gap-0.5">
            <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#111111] text-white" : "text-[#aaa] hover:text-[#111111]"}`}><LayoutGrid size={14} /></button>
            <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#111111] text-white" : "text-[#aaa] hover:text-[#111111]"}`}><List size={14} /></button>
          </div>
        </div>
      </div>

      <div className="relative px-8 md:px-16">
        {filterOpen && (
          <aside className="absolute top-0 left-8 z-20 w-64 bg-white shadow-xl border border-[#111111]/10 p-6 rounded-md">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#111111] mb-3">Categoría</p>
              {cats.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left text-[13px] py-1.5 transition-colors ${selectedCategory === cat ? "text-[#111111] font-medium" : "text-[#aaa] hover:text-[#111111]"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#111111] mb-3">Precio máx.</p>
              <input type="range" min={0} max={600} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-full accent-[#1C3528]" />
              <div className="flex justify-between text-[11px] text-[#999] mt-1"><span>€0</span><span>€{maxPrice}</span></div>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#111111] mb-3">Talla</p>
              <div className="flex flex-wrap gap-1">
                {["XS","S","M","L","XL","XXL","40","41","42","43","44","45"].map(s => (
                  <button key={s} onClick={() => toggleSize(s)}
                    className={`text-[10px] px-2 py-1 border transition-colors ${selectedSizes.includes(s) ? "border-[#111111] bg-[#111111] text-white" : "border-[#111111]/20 text-[#111111] hover:border-[#111111]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {hasFilters && (
              <button onClick={() => { setSelectedCategory("Todas"); setSelectedSizes([]); setMaxPrice(600); }} className="text-[11px] text-[#1C3528] underline">
                Limpiar filtros
              </button>
            )}
          </aside>
        )}

        <div className="flex-1 pt-8 pb-20 pl-6">
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Package size={36} className="text-[#ddd] mb-4" />
              <p className="text-[#111111] font-medium mb-1">Sin resultados</p>
              <p className="text-[12px] text-[#999]">Ajusta los filtros para encontrar productos</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {sorted.map(p => <ProductCard key={p.id} product={p} onView={onView} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={wishlist.has(p.id)} />)}
            </div>
          ) : (
            <div className="space-y-0 border-t border-[#111111]/8">
              {sorted.map(p => (
                <div key={p.id} className="flex gap-5 border-b border-[#111111]/8 py-5 hover:bg-[#F9F8F5] transition-colors cursor-pointer" onClick={() => onView(p)}>
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-[#E5E2D9]">
                    <img src={img(p.image, 200, 260)} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#111111]">{p.name}</p>
                    <p className="text-[11px] text-[#999] mt-0.5">{p.category}</p>
                    <StarRating rating={p.rating} count={p.reviews} />
                    <div className="flex items-center gap-2 mt-2">
                      {p.salePrice ? <><span className="text-[13px] font-medium text-[#1C3528]">€{p.salePrice}</span><span className="text-[12px] text-[#bbb] line-through">€{p.price}</span></> : <span className="text-[13px] font-medium">€{p.price}</span>}
                    </div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); onAddToCart(p, p.sizes[0], p.colors[0]); }} className="self-center px-4 py-2 bg-[#111111] text-white text-[10px] tracking-widest uppercase hover:bg-[#1C3528] transition-colors">
                    Añadir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────
function ProductDetailPage({ product, onAddToCart, onToggleWishlist, isWishlisted, onNavigate, related, onView }) {
  const [selSize, setSelSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [selColor, setSelColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [accordion, setAccordion] = useState("desc");
  const [added, setAdded] = useState(false);

  const images = [product.image, product.hoverImage, product.image, product.hoverImage];

  const handleAdd = () => {
    onAddToCart(product, selSize, selColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="px-8 md:px-16 py-4 flex items-center gap-2 text-[11px] text-[#aaa]">
        <button onClick={() => onNavigate("home")} className="hover:text-[#111111] transition-colors">Inicio</button>
        <ChevronRight size={11} />
        <button onClick={() => onNavigate("catalog")} className="hover:text-[#111111] transition-colors">Catálogo</button>
        <ChevronRight size={11} />
        <span className="text-[#111111]">{product.name}</span>
      </div>

      <div className="px-8 md:px-16 grid md:grid-cols-2 gap-10 max-w-6xl">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            {images.map((im, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-14 h-[72px] overflow-hidden border-2 transition-colors ${activeImg === i ? "border-[#111111]" : "border-transparent"}`}>
                <img src={img(im, 120, 170)} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] overflow-hidden bg-[#E5E2D9] relative group">
            <img src={img(images[activeImg], 800, 1000)} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-[10px] tracking-widest uppercase px-2 py-1 ${product.badge === "Nuevo" ? "bg-[#1C3528] text-white" : "bg-[#111111] text-white"}`}>{product.badge}</span>
            )}
          </div>
        </div>

        <div className="py-4">
          <p className="text-[10px] tracking-widest uppercase text-[#999] mb-2">{product.category}</p>
          <h1 className="text-3xl text-[#111111] font-normal mb-3" style={{ fontFamily: "Playfair Display, serif" }}>{product.name}</h1>
          <StarRating rating={product.rating} count={product.reviews} />

          <div className="flex items-center gap-3 mt-4 mb-6">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-medium text-[#1C3528]">€{product.salePrice}</span>
                <span className="text-lg text-[#bbb] line-through">€{product.price}</span>
                <span className="text-[10px] bg-[#111111] text-white px-2 py-1">-{Math.round((1 - product.salePrice / product.price) * 100)}%</span>
              </>
            ) : (
              <span className="text-2xl font-medium">€{product.price}</span>
            )}
          </div>

          <div className="mb-5">
            <p className="text-[10px] tracking-widest uppercase text-[#111111] mb-2">Color</p>
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <button key={i} onClick={() => setSelColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${selColor === c ? "border-[#111111] scale-110" : "border-transparent"}`}
                  style={{ background: c, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)" }}
                />
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] tracking-widest uppercase text-[#111111]">Talla</p>
              <button className="text-[10px] text-[#1C3528] underline">Guía de tallas</button>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelSize(s)}
                  className={`min-w-[38px] px-3 py-2 text-[11px] border transition-all ${selSize === s ? "border-[#111111] bg-[#111111] text-white" : "border-[#111111]/20 text-[#111111] hover:border-[#111111]"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[10px] tracking-widest uppercase text-[#111111] mb-2">Cantidad</p>
            <div className="flex items-center border border-[#111111]/15 w-fit">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#E5E2D9] transition-colors"><Minus size={13} /></button>
              <span className="w-12 text-center text-[13px] font-medium">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#E5E2D9] transition-colors"><Plus size={13} /></button>
            </div>
            <p className="text-[10px] text-[#999] mt-1.5">{product.stock} unidades disponibles</p>
          </div>

          <div className="flex gap-2 mb-3">
            <button onClick={handleAdd}
              className={`flex-1 py-3.5 text-[11px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${added ? "bg-[#1C3528] text-white" : "bg-[#111111] text-white hover:bg-[#1C3528]"}`}>
              {added ? <><Check size={13} /> Añadido</> : "Añadir al carrito"}
            </button>
            <button onClick={() => onToggleWishlist(product.id)}
              className={`w-12 h-12 border flex items-center justify-center transition-all ${isWishlisted ? "border-[#111111] bg-[#111111]" : "border-[#111111]/20 hover:border-[#111111]"}`}>
              <Heart size={15} className={isWishlisted ? "fill-white stroke-white" : "stroke-[#111111] fill-none"} />
            </button>
          </div>
          <button onClick={() => { onAddToCart(product, selSize, selColor); onNavigate("checkout"); }}
            className="w-full py-3.5 border border-[#111111] text-[11px] tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-all duration-300 mb-8">
            Comprar ahora
          </button>

          <div className="border-t border-[#111111]/10">
            {[
              { k: "desc", l: "Descripción", v: product.description },
              { k: "mat", l: "Material & Cuidado", v: product.material },
              { k: "ship", l: "Envío & Devoluciones", v: "Envío gratuito en pedidos superiores a €150. Entrega 24-48h. 30 días para cambios y devoluciones sin coste." },
            ].map(({ k, l, v }) => (
              <div key={k} className="border-b border-[#111111]/10">
                <button onClick={() => setAccordion(accordion === k ? "" : k)} className="w-full flex items-center justify-between py-4 text-[11px] tracking-widest uppercase text-[#111111]">
                  {l} {accordion === k ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
                {accordion === k && <p className="text-[13px] text-[#5A5750] leading-relaxed pb-4">{v}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="px-8 md:px-16 mt-20">
          <h2 className="text-2xl text-[#111111] font-normal mb-8" style={{ fontFamily: "Playfair Display, serif" }}>También te puede gustar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} onView={onView} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={false} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CART SIDEBAR ─────────────────────────────────────────────────────────────
function CartSidebar({ items, isOpen, onClose, onNavigate, onUpdateQty, onRemove }) {
  const [coupon, setCoupon] = useState("");
  const subtotal = items.reduce((sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 7.95;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/35 z-40 backdrop-blur-sm" onClick={onClose} />}
      <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-[#F9F8F5] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#111111]/8">
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} />
            <span className="text-[12px] tracking-widest uppercase font-medium">Carrito ({items.length})</span>
          </div>
          <button onClick={onClose} className="hover:opacity-50 transition-opacity"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={36} className="text-[#ddd] mb-4" />
              <p className="text-[#111111] font-medium mb-1">Tu carrito está vacío</p>
              <p className="text-[11px] text-[#999] mb-6">Añade productos para continuar</p>
              <button onClick={() => { onClose(); onNavigate("catalog"); }} className="text-[11px] tracking-widest uppercase border border-[#111111] px-6 py-2 hover:bg-[#111111] hover:text-white transition-all">
                Ver catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="w-[60px] h-[76px] overflow-hidden bg-[#E5E2D9] flex-shrink-0">
                    <img src={img(item.product.image, 150, 190)} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-[#111111] truncate">{item.product.name}</p>
                    <p className="text-[10px] text-[#999]">{item.size} · {item.product.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#111111]/15">
                        <button onClick={() => onUpdateQty(item.product.id, item.size, item.color, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-[#E5E2D9]"><Minus size={9} /></button>
                        <span className="w-7 text-center text-[11px]">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.product.id, item.size, item.color, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-[#E5E2D9]"><Plus size={9} /></button>
                      </div>
                      <span className="text-[12px] font-medium">€{((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.product.id, item.size, item.color)} className="self-start mt-0.5 hover:opacity-50 transition-opacity">
                    <Trash2 size={13} className="text-[#bbb]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#111111]/8 px-6 py-5 space-y-4">
            <div className="flex">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Código de descuento" className="flex-1 border border-[#111111]/15 px-3 py-2 text-[11px] focus:outline-none bg-white" />
              <button className="bg-[#E5E2D9] px-4 text-[10px] tracking-widest uppercase hover:bg-[#D8D4CB] transition-colors">Aplicar</button>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[12px]"><span className="text-[#999]">Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-[#999]">Envío</span><span className={shipping === 0 ? "text-[#1C3528]" : ""}>{shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}</span></div>
              {subtotal < 150 && <p className="text-[10px] text-[#1C3528]">Añade €{(150 - subtotal).toFixed(0)} más para envío gratis</p>}
              <div className="flex justify-between font-medium border-t border-[#111111]/8 pt-2 text-[14px]">
                <span>Total</span><span>€{(subtotal + shipping).toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => { onClose(); onNavigate("checkout"); }} className="w-full py-3.5 bg-[#111111] text-white text-[11px] tracking-widest uppercase hover:bg-[#1C3528] transition-colors">
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────
function CheckoutPage({ items, onNavigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", postal: "", shipping: "standard", payment: "card", cardNum: "", cardName: "", expiry: "", cvc: "" });
  const [done, setDone] = useState(false);
  const orderId = useRef(`AUR-${Math.floor(Math.random() * 90000 + 10000)}`);

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const subtotal = items.reduce((s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity, 0);
  const shipping = form.shipping === "express" ? 12.95 : subtotal >= 150 ? 0 : 7.95;

  if (done) return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-[#E5E2D9] flex items-center justify-center mx-auto mb-6"><Check size={28} className="text-[#1C3528]" /></div>
        <h1 className="text-3xl text-[#111111] font-normal mb-3" style={{ fontFamily: "Playfair Display, serif" }}>¡Pedido confirmado!</h1>
        <p className="text-[12px] text-[#999] mb-2">Pedido {orderId.current}</p>
        <p className="text-[#5A5750] text-sm mb-8">Recibirás confirmación en {form.email || "tu email"}. Entrega en 24-48h.</p>
        <button onClick={() => onNavigate("home")} className="bg-[#111111] text-white px-8 py-3 text-[11px] tracking-widest uppercase hover:bg-[#1C3528] transition-colors">
          Continuar comprando
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-20 px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl text-[#111111] font-normal mb-8" style={{ fontFamily: "Playfair Display, serif" }}>Checkout</h1>
        <div className="flex items-center gap-0 mb-10">
          {["Envío", "Pago"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${i + 1 <= step ? "text-[#111111]" : "text-[#ccc]"}`}>
                <div className={`w-6 h-6 flex items-center justify-center text-[10px] font-medium ${i + 1 < step ? "bg-[#1C3528] text-white" : i + 1 === step ? "border-2 border-[#111111]" : "border border-[#ccc]"}`}>
                  {i + 1 < step ? <Check size={11} /> : i + 1}
                </div>
                <span className="text-[12px] tracking-wide">{s}</span>
              </div>
              {i < 1 && <div className={`w-20 h-px mx-3 ${step > 1 ? "bg-[#111111]" : "bg-[#e0e0e0]"}`} />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-4">Información de envío</p>
                <div>
                  <label className="text-[10px] tracking-wide uppercase text-[#111111] block mb-1">Nombre completo</label>
                  <input value={form.name} onChange={e => upd("name", e.target.value)} className="w-full border border-[#111111]/15 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#111111] bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ k: "email", l: "Email", t: "email" }, { k: "phone", l: "Teléfono", t: "tel" }].map(f => (
                    <div key={f.k}>
                      <label className="text-[10px] tracking-wide uppercase text-[#111111] block mb-1">{f.l}</label>
                      <input type={f.t} value={form[f.k]} onChange={e => upd(f.k, e.target.value)} className="w-full border border-[#111111]/15 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#111111] bg-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[10px] tracking-wide uppercase text-[#111111] block mb-1">Dirección</label>
                  <input value={form.address} onChange={e => upd("address", e.target.value)} className="w-full border border-[#111111]/15 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#111111] bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ k: "city", l: "Ciudad" }, { k: "postal", l: "Código postal" }].map(f => (
                    <div key={f.k}>
                      <label className="text-[10px] tracking-wide uppercase text-[#111111] block mb-1">{f.l}</label>
                      <input value={form[f.k]} onChange={e => upd(f.k, e.target.value)} className="w-full border border-[#111111]/15 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#111111] bg-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-3">Método de envío</p>
                  {[{ k: "standard", l: "Estándar 24-48h", p: subtotal >= 150 ? "Gratis" : "€7.95" }, { k: "express", l: "Express mismo día", p: "€12.95" }].map(opt => (
                    <label key={opt.k} className={`flex items-center justify-between p-3 border cursor-pointer mb-2 ${form.shipping === opt.k ? "border-[#111111]" : "border-[#111111]/15"}`}>
                      <div className="flex items-center gap-2"><input type="radio" name="ship" value={opt.k} checked={form.shipping === opt.k} onChange={e => upd("shipping", e.target.value)} className="accent-[#1C3528]" /><span className="text-[13px]">{opt.l}</span></div>
                      <span className="text-[12px] font-medium">{opt.p}</span>
                    </label>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="w-full py-3.5 bg-[#111111] text-white text-[11px] tracking-widest uppercase hover:bg-[#1C3528] transition-colors">Continuar al pago</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-4">Método de pago</p>
                {[{ k: "card", l: "Tarjeta crédito / débito", i: <CreditCard size={15} /> }, { k: "paypal", l: "PayPal", i: <Globe size={15} /> }, { k: "bizum", l: "Bizum", i: <Zap size={15} /> }].map(opt => (
                  <label key={opt.k} className={`flex items-center gap-3 p-3 border cursor-pointer ${form.payment === opt.k ? "border-[#111111]" : "border-[#111111]/15"}`}>
                    <input type="radio" name="pay" value={opt.k} checked={form.payment === opt.k} onChange={e => upd("payment", e.target.value)} className="accent-[#1C3528]" />
                    {opt.i}<span className="text-[13px]">{opt.l}</span>
                  </label>
                ))}
                {form.payment === "card" && (
                  <div className="border border-[#111111]/8 p-4 space-y-3 mt-2 bg-white">
                    {[{ k: "cardNum", l: "Número de tarjeta", p: "1234 5678 9012 3456" }, { k: "cardName", l: "Nombre en la tarjeta", p: "NOMBRE APELLIDO" }].map(f => (
                      <div key={f.k}>
                        <label className="text-[10px] tracking-wide uppercase text-[#111111] block mb-1">{f.l}</label>
                        <input value={form[f.k]} onChange={e => upd(f.k, e.target.value)} placeholder={f.p} className="w-full border border-[#111111]/15 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#111111]" />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] tracking-wide uppercase text-[#111111] block mb-1">Vencimiento</label>
                        <input value={form.expiry} onChange={e => upd("expiry", e.target.value)} placeholder="MM/AA" className="w-full border border-[#111111]/15 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#111111]" />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-wide uppercase text-[#111111] block mb-1">CVC</label>
                        <input value={form.cvc} onChange={e => upd("cvc", e.target.value)} placeholder="123" className="w-full border border-[#111111]/15 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#111111]" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[10px] text-[#999]"><Lock size={11} /> Transacción cifrada con SSL 256-bit</div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 border border-[#111111]/20 text-[11px] tracking-widest uppercase hover:border-[#111111] transition-colors">Volver</button>
                  <button onClick={() => setDone(true)} className="flex-1 py-3.5 bg-[#111111] text-white text-[11px] tracking-widest uppercase hover:bg-[#1C3528] transition-colors">Confirmar pedido</button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#E5E2D9] p-5">
            <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-4">Tu pedido</p>
            <div className="space-y-3 mb-5">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-2">
                  <div className="w-10 h-[52px] overflow-hidden bg-white flex-shrink-0">
                    <img src={img(item.product.image, 80, 100)} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-[#111111] truncate">{item.product.name}</p>
                    <p className="text-[10px] text-[#999]">x{item.quantity} · {item.size}</p>
                    <p className="text-[11px] font-medium">€{((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#111111]/10 pt-3 space-y-1.5">
              <div className="flex justify-between text-[12px]"><span className="text-[#999]">Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-[#999]">Envío</span><span>{shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-medium text-[14px] border-t border-[#111111]/10 pt-2"><span>Total</span><span>€{(subtotal + shipping).toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ACCOUNT ─────────────────────────────────────────────────────────────────
function AccountPage({ wishlist, products, onView, onAddToCart, onToggleWishlist }) {
  const [tab, setTab] = useState("profile");
  const tabs = [{ k: "profile", l: "Perfil" }, { k: "orders", l: "Pedidos" }, { k: "wishlist", l: "Favoritos" }, { k: "addresses", l: "Direcciones" }, { k: "settings", l: "Configuración" }];
  const mockOrders = [
    { id: "AUR-38291", date: "15 Jun 2025", status: "Entregado", total: "€389.00", items: 2 },
    { id: "AUR-38144", date: "03 May 2025", status: "En camino", total: "€319.00", items: 1 },
    { id: "AUR-37891", date: "22 Mar 2025", status: "Entregado", total: "€545.00", items: 2 },
  ];
  const wishlisted = products.filter(p => wishlist.has(p.id));

  return (
    <div className="min-h-screen pt-20 pb-20 px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl text-[#111111] font-normal mb-8" style={{ fontFamily: "Playfair Display, serif" }}>Mi cuenta</h1>
        <div className="grid md:grid-cols-4 gap-8">
          <aside className="space-y-0.5">
            {tabs.map(t => (
              <button key={t.k} onClick={() => setTab(t.k)}
                className={`w-full text-left px-4 py-2.5 text-[12px] tracking-wide transition-colors ${tab === t.k ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#E5E2D9]"}`}>
                {t.l}
              </button>
            ))}
            <button className="w-full text-left px-4 py-2.5 text-[12px] text-red-400 hover:bg-red-50 transition-colors mt-4">Cerrar sesión</button>
          </aside>
          <div className="md:col-span-3">
            {tab === "profile" && (
              <div className="space-y-5">
                <div className="flex items-center gap-4 pb-6 border-b border-[#111111]/8">
                  <div className="w-16 h-16 bg-[#E5E2D9] flex items-center justify-center"><User size={22} className="text-[#1C3528]" /></div>
                  <div><p className="font-medium text-[#111111]">Carlos García</p><p className="text-[11px] text-[#999]">Cliente desde 2022 · Miembro Premium</p></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ l: "Nombre", v: "Carlos" }, { l: "Apellidos", v: "García López" }, { l: "Email", v: "carlos@email.com" }, { l: "Teléfono", v: "+34 612 345 678" }].map(f => (
                    <div key={f.l}>
                      <label className="text-[10px] tracking-wide uppercase text-[#111111] block mb-1">{f.l}</label>
                      <input defaultValue={f.v} className="w-full border border-[#111111]/15 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#111111] bg-white" />
                    </div>
                  ))}
                </div>
                <button className="px-6 py-2.5 bg-[#111111] text-white text-[11px] tracking-widest uppercase hover:bg-[#1C3528] transition-colors">Guardar cambios</button>
              </div>
            )}
            {tab === "orders" && (
              <div>
                <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-4">Mis pedidos</p>
                <div className="space-y-2">
                  {mockOrders.map(o => (
                    <div key={o.id} className="border border-[#111111]/8 p-4 flex items-center justify-between hover:bg-[#F9F8F5]">
                      <div><p className="text-[13px] font-medium text-[#111111]">{o.id}</p><p className="text-[11px] text-[#999]">{o.date} · {o.items} artículo{o.items > 1 ? "s" : ""}</p></div>
                      <div className="text-right">
                        <span className={`inline-block text-[10px] tracking-wide uppercase px-2 py-1 mb-1 ${o.status === "Entregado" ? "bg-green-50 text-green-700" : o.status === "En camino" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{o.status}</span>
                        <p className="text-[13px] font-medium">{o.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "wishlist" && (
              <div>
                <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-4">Favoritos ({wishlisted.length})</p>
                {wishlisted.length === 0 ? (
                  <div className="text-center py-12"><Heart size={30} className="text-[#ddd] mx-auto mb-3" /><p className="text-[#999] text-sm">No tienes favoritos todavía</p></div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlisted.map(p => <ProductCard key={p.id} product={p} onView={onView} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={true} />)}
                  </div>
                )}
              </div>
            )}
            {tab === "addresses" && (
              <div>
                <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-4">Mis direcciones</p>
                <div className="border border-[#111111]/8 p-4 flex items-start justify-between">
                  <div><p className="text-[13px] font-medium text-[#111111]">Casa</p><p className="text-[12px] text-[#999] mt-1">Calle Serrano 45, 2ºA<br />28001 Madrid, España</p></div>
                  <span className="text-[10px] bg-[#111111] text-white px-2 py-1">Principal</span>
                </div>
                <button className="mt-3 text-[11px] text-[#1C3528] underline">+ Añadir dirección</button>
              </div>
            )}
            {tab === "settings" && (
              <div>
                <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-4">Notificaciones</p>
                {["Nuevas colecciones y novedades", "SMS de seguimiento de envío", "Newsletter semanal"].map(s => (
                  <div key={s} className="flex items-center justify-between py-3 border-b border-[#111111]/8">
                    <p className="text-[13px] text-[#111111]">{s}</p>
                    <div className="w-10 h-5 bg-[#1C3528] relative cursor-pointer" style={{ borderRadius: 10 }}>
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white" style={{ borderRadius: "50%" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminPage({ onNavigate }) {
  const [sec, setSec] = useState("dashboard");
  const navItems = [
    { k: "dashboard", l: "Dashboard", i: <BarChart2 size={14} /> },
    { k: "products", l: "Productos", i: <Box size={14} /> },
    { k: "orders", l: "Pedidos", i: <Package size={14} /> },
    { k: "customers", l: "Clientes", i: <Users size={14} /> },
    { k: "coupons", l: "Cupones", i: <Tag size={14} /> },
    { k: "reports", l: "Reportes", i: <FileText size={14} /> },
    { k: "settings", l: "Configuración", i: <Settings size={14} /> },
  ];
  const stats = [
    { l: "Ventas totales", v: "€923.847", c: "+14.2%", up: true, i: <TrendingUp size={18} /> },
    { l: "Pedidos", v: "4.291", c: "+9.8%", up: true, i: <Package size={18} /> },
    { l: "Clientes", v: "14.832", c: "+17.1%", up: true, i: <Users size={18} /> },
    { l: "Conversión", v: "4.2%", c: "+0.4%", up: true, i: <BarChart2 size={18} /> },
  ];
  const orders = [
    { id: "AUR-38299", customer: "Sergio Mora", product: "Chelsea Boot Cuero", total: "€319", status: "Enviado", date: "24 Jun" },
    { id: "AUR-38298", customer: "Javier Torres", product: "Trench Coat Premium", total: "€319", status: "Pendiente", date: "23 Jun" },
    { id: "AUR-38297", customer: "Luis Méndez", product: "Jean Slim + Oxford", total: "€454", status: "Entregado", date: "23 Jun" },
    { id: "AUR-38296", customer: "Pablo Sanz", product: "Bomber Cuero Merino", total: "€269", status: "Entregado", date: "22 Jun" },
    { id: "AUR-38295", customer: "Andrés Ruiz", product: "Reloj Automático", total: "€545", status: "Pendiente", date: "22 Jun" },
  ];

  return (
    <div className="min-h-screen flex bg-[#F2F1ED]">
      <aside className="w-52 bg-[#111111] text-white fixed left-0 top-0 bottom-0 flex flex-col z-20">
        <div className="p-5 border-b border-white/10">
          <button onClick={() => onNavigate("home")} className="text-[10px] tracking-widest text-white/30 mb-1 hover:text-white/60 transition-colors">← Tienda</button>
          <p className="text-xl tracking-[0.2em]" style={{ fontFamily: "Playfair Display, serif" }}>AUREL</p>
          <p className="text-[10px] text-white/25 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <button key={item.k} onClick={() => setSec(item.k)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] transition-colors ${sec === item.k ? "bg-[#1C3528] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
              {item.i} {item.l}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-white/30 hover:text-white transition-colors">
            <LogOut size={13} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-52 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl text-[#111111] font-normal capitalize" style={{ fontFamily: "Playfair Display, serif" }}>{sec}</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-[#E5E2D9] transition-colors">
              <Bell size={16} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-[#E5E2D9] flex items-center justify-center"><User size={13} /></div>
          </div>
        </div>

        {sec === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(s => (
                <div key={s.l} className="bg-white border border-[#111111]/8 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#1C3528]">{s.i}</span>
                    <span className={`text-[11px] ${s.up ? "text-green-600" : "text-red-500"}`}>{s.c}</span>
                  </div>
                  <p className="text-2xl text-[#111111]" style={{ fontFamily: "Playfair Display, serif" }}>{s.v}</p>
                  <p className="text-[11px] text-[#999] mt-1">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-[#111111]/8 p-6">
              <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-6">Ventas 2025 (miles €)</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1C3528" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1C3528" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, border: "1px solid rgba(17,17,17,0.1)", borderRadius: 0, boxShadow: "none" }} />
                  <Area type="monotone" dataKey="ventas" stroke="#1C3528" strokeWidth={2} fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white border border-[#111111]/8 p-6">
              <p className="text-[11px] tracking-widest uppercase text-[#111111] mb-4">Pedidos recientes</p>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#111111]/8">
                    {["ID", "Cliente", "Producto", "Total", "Estado", "Fecha"].map(h => (
                      <th key={h} className="text-left text-[10px] tracking-widest uppercase text-[#999] pb-3 font-normal pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-[#111111]/5 hover:bg-[#F9F8F5]">
                      <td className="py-3 text-[12px] font-medium text-[#111111] pr-4">{o.id}</td>
                      <td className="py-3 text-[12px] text-[#111111] pr-4">{o.customer}</td>
                      <td className="py-3 text-[12px] text-[#999] pr-4">{o.product}</td>
                      <td className="py-3 text-[12px] font-medium pr-4">{o.total}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] px-2 py-1 ${o.status === "Entregado" ? "bg-green-50 text-green-700" : o.status === "Enviado" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{o.status}</span>
                      </td>
                      <td className="py-3 text-[12px] text-[#999]">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {sec === "products" && (
          <div className="bg-white border border-[#111111]/8">
            <div className="p-4 border-b border-[#111111]/8 flex items-center justify-between">
              <p className="text-[12px] font-medium">{PRODUCTS.length} productos</p>
              <button className="bg-[#111111] text-white text-[10px] tracking-widest uppercase px-4 py-2 hover:bg-[#1C3528] transition-colors">+ Nuevo producto</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#111111]/8">
                    {["Producto", "Categoría", "Precio", "Stock", "Badge"].map(h => (
                      <th key={h} className="text-left text-[10px] tracking-widest uppercase text-[#999] p-4 font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map(p => (
                    <tr key={p.id} className="border-b border-[#111111]/5 hover:bg-[#F9F8F5]">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-11 overflow-hidden bg-[#E5E2D9] flex-shrink-0">
                            <img src={img(p.image, 70, 90)} alt="" className="w-full h-full object-cover" />
                          </div>
                          <p className="text-[12px] font-medium text-[#111111]">{p.name}</p>
                        </div>
                      </td>
                      <td className="p-4 text-[12px] text-[#999]">{p.category}</td>
                      <td className="p-4 text-[12px]">{p.salePrice ? <span className="text-[#1C3528]">€{p.salePrice}</span> : `€${p.price}`}</td>
                      <td className="p-4"><span className={`text-[10px] px-2 py-1 ${p.stock < 12 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>{p.stock} uds</span></td>
                      <td className="p-4 text-[10px] text-[#999]">{p.badge ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {["orders", "customers", "coupons", "reports", "settings"].includes(sec) && (
          <div className="bg-white border border-[#111111]/8 p-16 text-center">
            <Box size={30} className="text-[#ddd] mx-auto mb-4" />
            <p className="text-[#111111] font-medium mb-1">Sección en desarrollo</p>
            <p className="text-[12px] text-[#999]">Disponible próximamente.</p>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ cartCount, wishlistCount, onNavigate, currentView, onCartOpen, onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { l: "Inicio", v: "home" }, { l: "Camisas", v: "catalog" },
    { l: "Pantalones", v: "catalog" }, { l: "Chaquetas", v: "catalog" },
    { l: "Zapatos", v: "catalog" }, { l: "Accesorios", v: "catalog" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled || currentView !== "home" ? "bg-[#F2F1ED]/97 backdrop-blur-sm border-b border-[#111111]/8 shadow-sm" : "bg-[#F2F1ED]/80 backdrop-blur-sm"}`}>
      <div className="flex items-center justify-between px-5 md:px-12 h-16">
        <button className="md:hidden" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(lk => (
            <button key={lk.l} onClick={() => onNavigate(lk.v)} className="text-[11px] tracking-widest uppercase transition-colors hover:text-[#1C3528] text-[#111111]">
              {lk.l}
            </button>
          ))}
        </nav>
        <button onClick={() => onNavigate("home")} className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl tracking-[0.2em] text-[#111111]" style={{ fontFamily: "Playfair Display, serif" }}>
          AUREL
        </button>
        <div className="flex items-center gap-2">
          <button onClick={onSearchOpen} className="p-2 hover:text-[#1C3528] transition-colors hidden md:flex"><Search size={17} /></button>
          <button className="p-2 hover:text-[#1C3528] transition-colors hidden md:flex"><Globe size={15} /></button>
          <button onClick={() => onNavigate("account")} className="p-2 hover:text-[#1C3528] transition-colors"><User size={17} /></button>
          <button onClick={() => onNavigate("account")} className="relative p-2 hover:text-[#1C3528] transition-colors hidden md:flex">
            <Heart size={17} />
            {wishlistCount > 0 && <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#1C3528] text-white text-[9px] font-bold flex items-center justify-center">{wishlistCount}</span>}
          </button>
          <button onClick={onCartOpen} className="relative p-2 hover:text-[#1C3528] transition-colors">
            <ShoppingBag size={17} />
            {cartCount > 0 && <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#111111] text-white text-[9px] font-bold flex items-center justify-center">{cartCount}</span>}
          </button>
          <button onClick={() => onNavigate("admin")} className="p-2 hover:text-[#1C3528] transition-colors hidden md:flex"><BarChart2 size={15} /></button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[#F2F1ED] border-t border-[#111111]/8 px-6 py-4">
          {links.map(lk => (
            <button key={lk.l} onClick={() => { onNavigate(lk.v); setMobileOpen(false); }} className="block w-full text-left text-[12px] tracking-widest uppercase py-3 border-b border-[#111111]/6 text-[#111111] hover:text-[#1C3528] transition-colors">
              {lk.l}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── SEARCH OVERLAY ───────────────────────────────────────────────────────────
function SearchOverlay({ isOpen, onClose, products, onView }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
    else setQ("");
  }, [isOpen]);

  const results = q.length > 1 ? products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())
  ) : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#F2F1ED]/99 flex flex-col">
      <div className="flex items-center gap-3 px-8 md:px-16 py-5 border-b border-[#111111]/8">
        <Search size={18} className="text-[#bbb]" />
        <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Busca prendas, zapatos..." className="flex-1 text-lg focus:outline-none bg-transparent text-[#111111] placeholder-[#ccc]" />
        <button onClick={onClose} className="hover:opacity-50 transition-opacity ml-2"><X size={20} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-8 md:px-16 py-8">
        {q.length <= 1 ? (
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#999] mb-4">Búsquedas populares</p>
            <div className="flex flex-wrap gap-2">
              {["Chelsea boots", "Trench coat", "Jean slim", "Oxford cuero", "Polo premium"].map(t => (
                <button key={t} onClick={() => setQ(t)} className="border border-[#111111]/15 px-4 py-2 text-[12px] hover:border-[#111111] hover:bg-white transition-colors">{t}</button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="text-[#999] text-sm">Sin resultados para "{q}"</p>
        ) : (
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#999] mb-4">{results.length} resultados</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map(p => (
                <div key={p.id} className="flex gap-3 cursor-pointer group" onClick={() => { onView(p); onClose(); }}>
                  <div className="w-14 h-[68px] overflow-hidden bg-[#E5E2D9] flex-shrink-0">
                    <img src={img(p.image, 100, 130)} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-[#111111]">{p.name}</p>
                    <p className="text-[10px] text-[#999]">{p.category}</p>
                    <p className="text-[12px] font-medium mt-1">€{p.salePrice ?? p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="px-8 md:px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="text-2xl tracking-[0.2em] mb-4" style={{ fontFamily: "Playfair Display, serif" }}>AUREL</p>
          <p className="text-white/28 text-[12px] leading-relaxed mb-6">Moda masculina de primera calidad. Ropa y calzado para el hombre que compra bien.</p>
          <div className="flex gap-3">
            {[<Instagram size={15} />, <Facebook size={15} />, <Twitter size={15} />].map((icon, i) => (
              <button key={i} className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/28 hover:border-[#1C3528] hover:bg-[#1C3528] hover:text-white transition-all">{icon}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-white/28 mb-4">Tienda</p>
          {["Camisas & Polos", "Camisetas", "Pantalones", "Chaquetas", "Zapatos", "Accesorios"].map(l => (
            <button key={l} onClick={() => onNavigate("catalog")} className="block text-[12px] text-white/40 hover:text-white transition-colors py-1">{l}</button>
          ))}
        </div>
        <div>
          <p className="text-[10px] tracking-widests uppercase text-white/28 mb-4">Ayuda</p>
          {["Mi cuenta", "Seguir pedido", "Guía de tallas", "Cuidado prendas", "Devoluciones", "FAQs"].map(l => (
            <button key={l} className="block text-[12px] text-white/40 hover:text-white transition-colors py-1">{l}</button>
          ))}
        </div>
        <div>
          <p className="text-[10px] tracking-widests uppercase text-white/28 mb-4">Contacto</p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-white/40"><Mail size={13} /><span className="text-[12px]">hola@aurel.com</span></div>
            <div className="flex items-start gap-2 text-white/40"><MapPin size={13} className="mt-0.5" /><span className="text-[12px]">Calle Serrano 45<br />28001 Madrid</span></div>
          </div>
          <p className="text-[10px] tracking-widests uppercase text-white/28 mb-2">Métodos de pago</p>
          <div className="flex gap-1.5 flex-wrap">
            {["VISA", "MC", "AMEX", "PYPL", "BZM"].map(m => (
              <span key={m} className="border border-white/10 px-2 py-0.5 text-[9px] text-white/30">{m}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/6 px-8 md:px-16 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-white/20 text-[11px]">© 2025 AUREL. Todos los derechos reservados.</p>
        <div className="flex gap-5">
          {["Privacidad", "Cookies", "Términos"].map(l => (
            <button key={l} className="text-white/20 text-[11px] hover:text-white/45 transition-colors">{l}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = v => { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const viewProduct = product => { setSelectedProduct(product); navigate("product"); };

  const addToCart = (product, size, color) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size && i.color === color);
      if (existing) return prev.map(i => i.product.id === product.id && i.size === size && i.color === color ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, size, color, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const toggleWishlist = id => setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const updateCartQty = (id, size, color, qty) => {
    if (qty <= 0) setCartItems(prev => prev.filter(i => !(i.product.id === id && i.size === size && i.color === color)));
    else setCartItems(prev => prev.map(i => i.product.id === id && i.size === size && i.color === color ? { ...i, quantity: qty } : i));
  };

  const removeFromCart = (id, size, color) =>
    setCartItems(prev => prev.filter(i => !(i.product.id === id && i.size === size && i.color === color)));

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const related = selectedProduct ? PRODUCTS.filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category).slice(0, 4) : [];

  const showHeader = view !== "admin";
  const showFooter = view !== "admin" && view !== "checkout";

  return (
    <div className="min-h-screen" style={{ fontFamily: "Barlow, sans-serif", background: "#F2F1ED", color: "#111111" }}>
      {showHeader && (
        <Header cartCount={cartCount} wishlistCount={wishlist.size} onNavigate={navigate} currentView={view} onCartOpen={() => setCartOpen(true)} onSearchOpen={() => setSearchOpen(true)} />
      )}

      <CartSidebar items={cartItems} isOpen={cartOpen} onClose={() => setCartOpen(false)} onNavigate={navigate} onUpdateQty={updateCartQty} onRemove={removeFromCart} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} products={PRODUCTS} onView={viewProduct} />

      <main>
        {view === "home" && <HomePage products={PRODUCTS} onView={viewProduct} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} onNavigate={navigate} />}
        {view === "catalog" && <CatalogPage products={PRODUCTS} onView={viewProduct} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />}
        {view === "product" && selectedProduct && (
          <ProductDetailPage product={selectedProduct} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlist.has(selectedProduct.id)} onNavigate={navigate} related={related} onView={viewProduct} />
        )}
        {view === "checkout" && <CheckoutPage items={cartItems} onNavigate={navigate} />}
        {view === "account" && <AccountPage wishlist={wishlist} products={PRODUCTS} onView={viewProduct} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />}
        {view === "admin" && <AdminPage onNavigate={navigate} />}
      </main>

      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}
