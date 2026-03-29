import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, Heart, Minus, Plus, ShoppingCart, Truck, 
  Star, CheckCircle2, Lock, ShieldCheck, Zap, ChevronLeft, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { useCarrinho } from '@/context/CarrinhoContext';

// Keep existing UI section components imports
import ProductTabs from '@/components/product/ProductTabs';
import BenefitsSection from '@/components/product/BenefitsSection';
import SocialProofSection from '@/components/product/SocialProofSection';
import TrustSection from '@/components/product/TrustSection';
import FAQSection from '@/components/product/FAQSection';

export default function ProductDetailPage() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { fetchProductBySlug, fetchProductsByCategory } = useProducts();
  const { adicionarAoCarrinho } = useCarrinho();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [cep, setCep] = useState('');
  const [isCalculatingCep, setIsCalculatingCep] = useState(false);
  const [shippingResult, setShippingResult] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setActiveImage(0);
    
    let isMounted = true;
    setLoading(true);
    
    // Quick mock for fallback if no DB hooked up since useProducts relies on supabase
    // we use ID or slug. If useProducts fails, we handle gracefully.
    const loadData = async () => {
      try {
        const data = await fetchProductBySlug(slug || id);
        if (!isMounted) return;
        if (!data) {
           navigate('/produtos');
           return;
        }
        setProduct(data);
        
        const rel = await fetchProductsByCategory(data.category_id, data.id, 4);
        if (isMounted) setRelated(rel || []);
      } catch (err) {
        console.error("No DB connected:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    loadData();

    return () => { isMounted = false; };
  }, [slug, id, fetchProductBySlug, fetchProductsByCategory, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-bold text-muted-foreground">Carregando produto...</p>
      </div>
    );
  }

  if (!product) return null;

  const images = product.images_gallery || [product.image_url || product.image];
  const discountPrice = product.discount_percentage > 0 
    ? product.price * (1 - product.discount_percentage / 100) 
    : product.price;

  const handleQtyChange = (val) => {
    const newQty = quantity + val;
    if (newQty >= 1 && newQty <= Math.min(10, product.stock_quantity || 10)) setQuantity(newQty);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    adicionarAoCarrinho(product, quantity);
    toast({
      title: "Adicionado ao Carrinho! 🛒",
      description: `${quantity}x ${product.name} adicionado com sucesso.`,
    });
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleCalculateShipping = () => {
    if (cep.length < 8) {
      toast({ title: "CEP Inválido", description: "Digite um CEP válido com 8 dígitos.", variant: "destructive" });
      return;
    }
    setIsCalculatingCep(true);
    setTimeout(() => {
      setShippingResult([
        { method: 'SEDEX', days: '1-2 dias úteis', price: 25.00 },
        { method: 'PAC', days: '5-7 dias úteis', price: 15.00 }
      ]);
      setIsCalculatingCep(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-[12px] sm:text-[14px] text-[#666666] mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar font-medium">
          <Link to="/" className="hover:text-primary cursor-pointer transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1.5 flex-shrink-0" />
          <Link to="/produtos" className="hover:text-primary cursor-pointer transition-colors">Produtos</Link>
          <ChevronRight className="w-4 h-4 mx-1.5 flex-shrink-0" />
          <span className="text-foreground font-bold">{product.name}</span>
        </nav>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-4">
            <div className="relative w-full aspect-square md:h-[600px] md:w-[600px] rounded-[12px] overflow-hidden bg-muted border group shadow-sm mx-auto">
              {product.discount_percentage > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                    Promoção
                  </span>
                </div>
              )}
              
              <img 
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 cursor-zoom-in group-hover:scale-[2] origin-center bg-white"
              />

              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage(prev => (prev - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={() => setActiveImage(prev => (prev + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar justify-center lg:justify-start">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-[12px] overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === idx ? 'border-primary scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover bg-white" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
            
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-primary tracking-wider uppercase">{product.category || product.rs_categories?.name}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-3 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-lg text-muted-foreground font-medium mb-6">
              {product.description_short || product.shortDescription}
            </p>
            
            {/* Ratings */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating || 5) ? 'fill-current' : 'text-muted stroke-muted-foreground'}`} />)}
                </div>
                <span className="font-bold text-lg">{Number(product.rating || 5).toFixed(1)}/5</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-muted/30 p-6 sm:p-8 rounded-[12px] border mb-8 relative overflow-hidden">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <span className="text-4xl sm:text-[40px] font-poppins font-black text-primary leading-none">
                  R$ {discountPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-foreground">Quantidade</span>
                  <div className="flex items-center border-2 border-border rounded-[12px] h-14 w-36 bg-background overflow-hidden">
                    <button onClick={() => handleQtyChange(-1)} className="w-12 text-muted-foreground hover:bg-muted hover:text-foreground h-full flex items-center justify-center transition-colors">
                      <Minus className="w-5 h-5" />
                    </button>
                    <input 
                      type="text" 
                      value={quantity} 
                      readOnly 
                      className="w-full text-center font-bold text-lg bg-transparent border-none focus:ring-0 text-foreground p-0 m-0"
                    />
                    <button onClick={() => handleQtyChange(1)} className="w-12 text-muted-foreground hover:bg-muted hover:text-foreground h-full flex items-center justify-center transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-row gap-3 w-full">
                  <motion.button 
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAddToCart}
                    className="flex-1 h-14 bg-primary hover:bg-primary/90 text-white font-bold text-[16px] sm:text-[18px] rounded-[12px] shadow-lg hover-shadow flex items-center justify-center transition-colors relative overflow-hidden"
                  >
                    {isAdding ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center">
                        <CheckCircle2 className="w-6 h-6 mr-2" /> Adicionado!
                      </motion.div>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6 mr-2" /> Adicionar ao Carrinho
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <ProductTabs />
        <BenefitsSection />

      </div>
    </div>
  );
}