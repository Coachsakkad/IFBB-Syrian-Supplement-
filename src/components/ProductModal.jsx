import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { ShoppingCart, Star, X } from 'lucide-react'

export default function ProductModal({ product, isOpen, setIsOpen, addToCart }) {
  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">تفاصيل المنتج</h2>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Product Image */}
          <div className={`h-64 ${product.image} rounded-lg flex items-center justify-center mb-6`}>
            <div className="text-white text-center p-4">
              <h3 className="font-bold text-2xl mb-2">{product.brand}</h3>
              <p className="text-lg opacity-90">{product.name.substring(0, 50)}...</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {product.brand}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.5 (125 تقييم)</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="text-3xl font-bold text-green-600">
              {product.price === 'غير متوفر' ? 'السعر غير متوفر' : product.price}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">وصف المنتج</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'وصف المنتج غير متوفر حالياً. يرجى التواصل معنا للحصول على مزيد من المعلومات حول هذا المنتج.'}
              </p>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-2">المميزات</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• منتج أصلي 100%</li>
                <li>• جودة عالية مضمونة</li>
                <li>• توصيل سريع</li>
                <li>• ضمان الاستبدال</li>
              </ul>
            </div>

            <Separator />

            {/* Category */}
            {product.category && (
              <div>
                <h3 className="text-lg font-semibold mb-2">الفئة</h3>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="pt-4">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                onClick={() => {
                  addToCart(product)
                  setIsOpen(false)
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                إضافة للسلة
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

