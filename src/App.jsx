import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ShoppingCart, Search, Star, Menu, X, Play, TrendingUp, Award, Users, ArrowRight } from 'lucide-react'
import Cart from './components/Cart.jsx'
import ProductModal from './components/ProductModal.jsx'
import BrandBundles from './components/BrandBundles.jsx'
import './App.css'
import productsData from './assets/products.json'

// مكون الصفحة الرئيسية
function HomePage({ cart, setCart, addToCart }) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // تحميل المنتجات وإضافة معرف فريد لكل منتج
    const productsWithId = productsData.map((product, index) => ({
      ...product,
      id: index + 1,
      brand: getBrandFromName(product.name),
      category: product.category || 'منتجات أخرى',
      image: getPlaceholderImage(product.name)
    }))
    setProducts(productsWithId)
    setFilteredProducts(productsWithId.slice(0, 12)) // عرض أول 12 منتج فقط في الصفحة الرئيسية
  }, [])

  // استخراج اسم العلامة التجارية من اسم المنتج
  const getBrandFromName = (name) => {
    if (name.includes('ISO100') || name.includes('Elite') || name.includes('Super Mass') || name.includes('Energyze')) return 'Dymatize'
    if (name.includes('CREATINE PEPTIDE') || name.includes('Nitro-Tech') || name.includes('EuphoriQ') || name.includes('Clear Muscle')) return 'MuscleTech'
    if (name.includes('Olimp')) return 'Olimp'
    if (name.includes('RED REX') || name.includes('BIG')) return 'Big Ramy Labs'
    if (name.includes('LEVRONE')) return 'Kevin Levrone'
    if (name.includes('100 %') || name.includes('Power') || name.includes('Body Attack')) return 'Body Attack'
    return 'غير محدد'
  }

  // إنشاء صورة مؤقتة للمنتج
  const getPlaceholderImage = (name) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']
    const colorIndex = name.length % colors.length
    return colors[colorIndex]
  }

  // فلترة المنتجات حسب البحث والفئة
  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    setFilteredProducts(filtered.slice(0, 12))
  }, [searchTerm, selectedCategory, products])

  // الحصول على الفئات الفريدة
  const categories = ['all', ...new Set(products.map(product => product.category))]

  // حساب إجمالي عدد العناصر في السلة
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  // فتح نافذة تفاصيل المنتج
  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  // معلومات الشركات للعرض في الصفحة الرئيسية
  const brands = [
    {
      name: 'Dymatize',
      slug: 'dymatize',
      description: 'شركة رائدة في صناعة البروتين عالي الجودة',
      image: '/src/assets/llLS06d9AjF8.jpg',
      color: 'from-blue-600 to-blue-800',
      products: products.filter(p => getBrandFromName(p.name) === 'Dymatize').length
    },
    {
      name: 'MuscleTech',
      slug: 'muscletech',
      description: 'علامة تجارية مبتكرة مع أكثر من 20 عاماً من الخبرة',
      image: '/src/assets/W94WbpXG8pNp.jpg',
      color: 'from-purple-600 to-purple-800',
      products: products.filter(p => getBrandFromName(p.name) === 'MuscleTech').length
    },
    {
      name: 'Optimum Nutrition',
      slug: 'optimum-nutrition',
      description: 'الشركة الأكثر ثقة في عالم المكملات الغذائية',
      image: '/src/assets/ozChZdp10lFv.jpg',
      color: 'from-yellow-600 to-orange-600',
      products: products.filter(p => getBrandFromName(p.name).includes('Optimum')).length
    },
    {
      name: 'Body Attack',
      slug: 'body-attack',
      description: 'شركة ألمانية متخصصة في المكملات الطبيعية',
      image: '/src/assets/lktJYdOt9P6W.jpg',
      color: 'from-red-600 to-red-800',
      products: products.filter(p => getBrandFromName(p.name) === 'Body Attack').length
    },
    {
      name: 'Big Ramy Labs',
      slug: 'big-ramy-labs',
      description: 'علامة تجارية مصرية تحمل اسم بطل العالم',
      image: '/src/assets/ozyh6ce8fpUF.jpg',
      color: 'from-amber-600 to-amber-800',
      products: products.filter(p => getBrandFromName(p.name) === 'Big Ramy Labs').length
    },
    {
      name: 'Kevin Levrone',
      slug: 'kevin-levrone',
      description: 'مكملات بتوقيع أسطورة كمال الأجسام',
      image: '/src/assets/Dzzem2mpXqb3.jpg',
      color: 'from-indigo-600 to-indigo-800',
      products: products.filter(p => getBrandFromName(p.name) === 'Kevin Levrone').length
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                IFBB Syrian Supplements House
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="البحث عن المنتجات..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="البحث عن المنتجات..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="w-full relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              السلة ({cartItemsCount})
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section with Video Background */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                أفضل المكملات الغذائية لكمال الأجسام
              </h2>
              <p className="text-xl mb-8 opacity-90">
                اكتشف مجموعة واسعة من المنتجات عالية الجودة من أشهر العلامات التجارية العالمية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-green-800 hover:bg-gray-100 rounded-full px-8">
                  تسوق الآن
                  <ArrowRight className="h-5 w-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                  <Play className="h-5 w-5 mr-2" />
                  شاهد الفيديو
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-black/20 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/src/assets/p2zWSgGBfkMA.jpg" 
                  alt="IFBB Syrian Supplements House"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100+</h3>
              <p className="text-gray-600">منتج عالي الجودة</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">7</h3>
              <p className="text-gray-600">علامة تجارية عالمية</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">عميل راضٍ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">تسوق حسب العلامة التجارية</h2>
            <p className="text-xl text-gray-600">اختر من أفضل العلامات التجارية العالمية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map(brand => (
              <Card 
                key={brand.slug} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => navigate(`/brand/${brand.slug}`)}
              >
                <div className={`h-48 bg-gradient-to-r ${brand.color} relative overflow-hidden`}>
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{brand.name}</h3>
                      <Badge className="bg-white/20 text-white">
                        {brand.products} منتج
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{brand.description}</p>
                  <Button className="w-full rounded-full group-hover:bg-green-700">
                    تصفح المنتجات
                    <ArrowRight className="h-4 w-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">المنتجات المميزة</h2>
            <p className="text-gray-600">اكتشف أحدث وأفضل المنتجات</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category === 'all' ? 'جميع المنتجات' : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  <div 
                    className={`h-48 ${product.image} rounded-t-lg flex items-center justify-center cursor-pointer relative overflow-hidden`}
                    onClick={() => openProductModal(product)}
                  >
                    <div className="text-white text-center p-4 z-10">
                      <h3 className="font-bold text-lg mb-2">{product.brand}</h3>
                      <p className="text-sm opacity-90">{product.name.substring(0, 30)}...</p>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {product.description || 'وصف المنتج غير متوفر'}
                  </CardDescription>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{product.brand}</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {product.price === 'غير متوفر' ? 'السعر غير متوفر' : product.price}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full rounded-full bg-green-600 hover:bg-green-700 group-hover:scale-105 transition-transform"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    إضافة للسلة
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لم يتم العثور على منتجات تطابق البحث</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">IFBB Syrian Supplements House</h3>
              <p className="text-gray-400">
                متجرك الموثوق للمكملات الغذائية عالية الجودة لكمال الأجسام واللياقة البدنية
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">الرئيسية</a></li>
                <li><a href="#" className="hover:text-white">المنتجات</a></li>
                <li><a href="#" className="hover:text-white">من نحن</a></li>
                <li><a href="#" className="hover:text-white">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
              <p className="text-gray-400">
                للاستفسارات والطلبات<br />
                Instagram: @ifbb_syrian_supplements_house
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IFBB Syrian Supplements House. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Cart Component */}
      <Cart 
        cart={cart}
        setCart={setCart}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
        addToCart={addToCart}
      />
    </div>
  )
}

// التطبيق الرئيسي مع التوجيه
function App() {
  const [cart, setCart] = useState([])

  // إضافة منتج إلى السلة
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage cart={cart} setCart={setCart} addToCart={addToCart} />} 
        />
        <Route 
          path="/brand/:brandName" 
          element={<BrandBundles addToCart={addToCart} />} 
        />
      </Routes>
    </Router>
  )
}

export default App

