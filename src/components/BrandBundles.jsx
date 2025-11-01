import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ShoppingCart, Search, Star, ArrowLeft, Play } from 'lucide-react'
import productsData from '../assets/products.json'

export default function BrandBundles({ addToCart }) {
  const { brandName } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // معلومات الشركات
  const brandInfo = {
    'dymatize': {
      name: 'Dymatize',
      description: 'شركة رائدة في صناعة المكملات الغذائية عالية الجودة، متخصصة في البروتين والأحماض الأمينية',
      color: 'from-blue-600 to-blue-800',
      logo: '🏆',
      established: '1994',
      specialty: 'ISO100 Whey Protein',
      videoUrl: '/src/assets/llLS06d9AjF8.jpg'
    },
    'muscletech': {
      name: 'MuscleTech',
      description: 'علامة تجارية مبتكرة في مجال المكملات الغذائية مع أكثر من 20 عاماً من الخبرة والبحث العلمي',
      color: 'from-purple-600 to-purple-800',
      logo: '💪',
      established: '1995',
      specialty: 'Nitro-Tech Whey Protein',
      videoUrl: '/src/assets/W94WbpXG8pNp.jpg'
    },
    'optimum-nutrition': {
      name: 'Optimum Nutrition',
      description: 'الشركة الأكثر ثقة في عالم المكملات الغذائية، معروفة بجودتها العالية ونقاوة منتجاتها',
      color: 'from-yellow-600 to-orange-600',
      logo: '⭐',
      established: '1986',
      specialty: 'Gold Standard Whey',
      videoUrl: '/src/assets/ozChZdp10lFv.jpg'
    },
    'body-attack': {
      name: 'Body Attack',
      description: 'شركة ألمانية متخصصة في المكملات الغذائية الطبيعية والعضوية للرياضيين المحترفين',
      color: 'from-red-600 to-red-800',
      logo: '🔥',
      established: '1994',
      specialty: 'Power Protein 90',
      videoUrl: '/src/assets/lktJYdOt9P6W.jpg'
    },
    'olimp': {
      name: 'Olimp',
      description: 'شركة بولندية رائدة في صناعة المكملات الغذائية مع التركيز على الجودة والابتكار',
      color: 'from-green-600 to-green-800',
      logo: '🏅',
      established: '1990',
      specialty: 'Whey Protein Complex',
      videoUrl: '/src/assets/p2zWSgGBfkMA.jpg'
    },
    'big-ramy-labs': {
      name: 'Big Ramy Labs',
      description: 'علامة تجارية مصرية مميزة تحمل اسم بطل العالم في كمال الأجسام بيج رامي',
      color: 'from-amber-600 to-amber-800',
      logo: '👑',
      established: '2020',
      specialty: 'Big Ramy Signature Series',
      videoUrl: '/src/assets/ozyh6ce8fpUF.jpg'
    },
    'kevin-levrone': {
      name: 'Kevin Levrone',
      description: 'مكملات غذائية بتوقيع أسطورة كمال الأجسام كيفين ليفرون، مصممة للأبطال',
      color: 'from-indigo-600 to-indigo-800',
      logo: '🌟',
      established: '2015',
      specialty: 'Levrone Signature Series',
      videoUrl: '/src/assets/Dzzem2mpXqb3.jpg'
    }
  }

  useEffect(() => {
    // تحميل المنتجات وفلترتها حسب الشركة
    const brandProducts = productsData.filter(product => {
      const productBrand = getBrandFromName(product.name).toLowerCase()
      return productBrand === brandName.toLowerCase() || 
             (brandName === 'optimum-nutrition' && (productBrand.includes('optimum') || productBrand.includes('on'))) ||
             (brandName === 'body-attack' && productBrand.includes('body')) ||
             (brandName === 'big-ramy-labs' && (productBrand.includes('big') || productBrand.includes('ramy'))) ||
             (brandName === 'kevin-levrone' && productBrand.includes('levrone'))
    }).map((product, index) => ({
      ...product,
      id: index + 1,
      brand: getBrandFromName(product.name),
      category: product.category || 'منتجات أخرى',
      image: getPlaceholderImage(product.name)
    }))

    setProducts(brandProducts)
    setFilteredProducts(brandProducts)
  }, [brandName])

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

  // فلترة المنتجات حسب البحث
  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const currentBrand = brandInfo[brandName] || {
    name: brandName,
    description: 'مجموعة متميزة من المكملات الغذائية عالية الجودة',
    color: 'from-gray-600 to-gray-800',
    logo: '🏪',
    established: '---',
    specialty: 'منتجات متنوعة'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentBrand.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 mb-6"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للرئيسية
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{currentBrand.logo}</span>
                <h1 className="text-4xl font-bold">{currentBrand.name}</h1>
              </div>
              <p className="text-xl mb-6 opacity-90">
                {currentBrand.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="opacity-75">تأسست في:</span>
                  <div className="font-semibold">{currentBrand.established}</div>
                </div>
                <div>
                  <span className="opacity-75">المنتج المميز:</span>
                  <div className="font-semibold">{currentBrand.specialty}</div>
                </div>
              </div>
            </div>
            
            {/* Brand Video/Image */}
            <div className="relative">
              <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
                <img 
                  src={currentBrand.videoUrl} 
                  alt={`${currentBrand.name} promotional`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                    <Play className="h-6 w-6 mr-2" />
                    مشاهدة الفيديو
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              منتجات {currentBrand.name} ({filteredProducts.length})
            </h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="البحث في المنتجات..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <div className={`h-48 ${product.image} rounded-t-lg flex items-center justify-center`}>
                      <div className="text-white text-center p-4">
                        <h3 className="font-bold text-lg mb-2">{product.brand}</h3>
                        <p className="text-sm opacity-90">{product.name.substring(0, 30)}...</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 line-clamp-2">
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
                      className="w-full rounded-full bg-green-600 hover:bg-green-700"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      إضافة للسلة
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لم يتم العثور على منتجات لهذه الشركة</p>
              <Button 
                className="mt-4"
                onClick={() => navigate('/')}
              >
                العودة للرئيسية
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

