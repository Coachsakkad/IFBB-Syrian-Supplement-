import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function Cart({ cart, setCart, isOpen, setIsOpen }) {
  // تحديث كمية المنتج
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // إزالة منتج من السلة
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // حساب الإجمالي
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
      return total + (price * item.quantity)
    }, 0)
  }

  // حساب عدد العناصر
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">عربة التسوق</h2>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              ✕
            </Button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">عربة التسوق فارغة</p>
              <Button 
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                متابعة التسوق
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 ${item.image} rounded-lg flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                          {item.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs mb-2">
                          {item.brand}
                        </Badge>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm font-bold text-green-600 mt-2">
                          {item.price === 'غير متوفر' ? 'السعر غير متوفر' : item.price}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">عدد العناصر:</span>
                  <span className="text-lg">{totalItems}</span>
                </div>
                
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>الإجمالي:</span>
                  <span className="text-green-600">
                    {calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'غير محدد'}
                  </span>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                  إتمام الطلب
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  متابعة التسوق
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

