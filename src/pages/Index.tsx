import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
}

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'Классическая рубашка',
      price: 4990,
      image: 'https://cdn.poehali.dev/projects/f4469217-2229-4678-ae15-ac00e9716bdd/files/1fad1799-a8a7-46d5-af33-9b9eb6ee949a.jpg',
      category: 'Одежда',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Кожаная сумка',
      price: 8990,
      image: 'https://cdn.poehali.dev/projects/f4469217-2229-4678-ae15-ac00e9716bdd/files/8a12636f-699b-407c-a98a-effe1e200abf.jpg',
      category: 'Аксессуары',
    },
    {
      id: 3,
      name: 'Элегантное пальто',
      price: 12990,
      image: 'https://cdn.poehali.dev/projects/f4469217-2229-4678-ae15-ac00e9716bdd/files/b2d62708-575f-46f6-b14b-cc79e039dbd0.jpg',
      category: 'Одежда',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 4,
      name: 'Дизайнерские очки',
      price: 5990,
      image: 'https://cdn.poehali.dev/projects/f4469217-2229-4678-ae15-ac00e9716bdd/files/8a12636f-699b-407c-a98a-effe1e200abf.jpg',
      category: 'Аксессуары',
    },
    {
      id: 5,
      name: 'Трикотажный свитер',
      price: 6490,
      image: 'https://cdn.poehali.dev/projects/f4469217-2229-4678-ae15-ac00e9716bdd/files/1fad1799-a8a7-46d5-af33-9b9eb6ee949a.jpg',
      category: 'Одежда',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 6,
      name: 'Кожаный ремень',
      price: 2990,
      image: 'https://cdn.poehali.dev/projects/f4469217-2229-4678-ae15-ac00e9716bdd/files/8a12636f-699b-407c-a98a-effe1e200abf.jpg',
      category: 'Аксессуары',
    },
  ];

  const addToCart = (product: Product, size?: string) => {
    const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size }]);
    }
  };

  const removeFromCart = (productId: number, size?: string) => {
    setCart(cart.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: number, quantity: number, size?: string) => {
    if (quantity === 0) {
      removeFromCart(productId, size);
    } else {
      setCart(cart.map(item => 
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shirt" size={28} className="text-primary" />
              <span className="text-2xl font-bold">STYLE</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'home' ? 'text-primary' : 'text-foreground'}`}
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('catalog')} 
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'catalog' ? 'text-primary' : 'text-foreground'}`}
              >
                Каталог
              </button>
              <button 
                onClick={() => scrollToSection('delivery')} 
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'delivery' ? 'text-primary' : 'text-foreground'}`}
              >
                Доставка
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'faq' ? 'text-primary' : 'text-foreground'}`}
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contacts')} 
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'contacts' ? 'text-primary' : 'text-foreground'}`}
              >
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={`${item.id}-${item.selectedSize}-${index}`} className="flex gap-4 p-4 border rounded-lg">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            {item.selectedSize && (
                              <p className="text-sm text-muted-foreground">Размер: {item.selectedSize}</p>
                            )}
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                              >
                                <Icon name="Minus" size={16} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                              >
                                <Icon name="Plus" size={16} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="ml-auto text-destructive"
                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="font-bold text-xl">{totalAmount.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge variant="secondary" className="w-fit">Новая коллекция 2024</Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Стиль, который вдохновляет
              </h1>
              <p className="text-lg text-muted-foreground">
                Откройте для себя уникальные модели одежды и аксессуаров от ведущих дизайнеров. 
                Качество, элегантность и комфорт в каждой детали.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('catalog')}>
                  Смотреть каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  О бренде
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/f4469217-2229-4678-ae15-ac00e9716bdd/files/b2d62708-575f-46f6-b14b-cc79e039dbd0.jpg" 
                alt="Fashion Collection" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Каталог товаров</h2>
            <p className="text-muted-foreground">Выберите то, что подходит именно вам</p>
          </div>

          <div className="flex gap-4 justify-center mb-8 flex-wrap">
            <Button variant="default">Все</Button>
            <Button variant="outline">Одежда</Button>
            <Button variant="outline">Аксессуары</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 right-4">{product.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">{product.price.toLocaleString('ru-RU')} ₽</p>
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Icon name="ShoppingBag" size={18} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <Sheet open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>{selectedProduct.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <p className="text-3xl font-bold text-primary mb-4">
                  {selectedProduct.price.toLocaleString('ru-RU')} ₽
                </p>
                <Badge variant="secondary">{selectedProduct.category}</Badge>
              </div>
              
              {selectedProduct.sizes && (
                <div>
                  <h4 className="font-semibold mb-3">Выберите размер:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        onClick={() => {
                          addToCart(selectedProduct, size);
                          setSelectedProduct(null);
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {!selectedProduct.sizes && (
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}

      <section id="delivery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Доставка и оплата</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-sm text-muted-foreground">Доставка по Москве в течение 1-2 дней</p>
            </Card>
            <Card className="text-center p-6">
              <Icon name="CreditCard" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Удобная оплата</h3>
              <p className="text-sm text-muted-foreground">Оплата картой или наличными при получении</p>
            </Card>
            <Card className="text-center p-6">
              <Icon name="RefreshCw" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Возврат товара</h3>
              <p className="text-sm text-muted-foreground">Бесплатный возврат в течение 14 дней</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Частые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>Как оформить заказ?</AccordionTrigger>
              <AccordionContent>
                Выберите понравившийся товар, добавьте его в корзину, укажите размер (если требуется) и оформите заказ. 
                Мы свяжемся с вами для подтверждения.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Какие способы оплаты доступны?</AccordionTrigger>
              <AccordionContent>
                Мы принимаем оплату банковскими картами онлайн, а также наличными или картой при получении заказа.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Сколько стоит доставка?</AccordionTrigger>
              <AccordionContent>
                Доставка по Москве в пределах МКАД — бесплатно при заказе от 5000 рублей. 
                За МКАД и в другие города стоимость рассчитывается индивидуально.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Можно ли вернуть товар?</AccordionTrigger>
              <AccordionContent>
                Да, вы можете вернуть товар в течение 14 дней с момента покупки, если он не был в употреблении 
                и сохранены все ярлыки и упаковка.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <Icon name="MapPin" size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Адрес</h3>
              <p className="text-muted-foreground">Москва, ул. Тверская, д. 1</p>
            </div>
            <div>
              <Icon name="Phone" size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Телефон</h3>
              <p className="text-muted-foreground">+7 (495) 123-45-67</p>
            </div>
            <div>
              <Icon name="Mail" size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">info@style-shop.ru</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Shirt" size={24} />
                <span className="text-xl font-bold">STYLE</span>
              </div>
              <p className="text-sm text-muted">
                Интернет-магазин одежды и аксессуаров премиум-класса
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-background transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-background transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <Icon name="Instagram" size={24} className="cursor-pointer hover:text-primary transition-colors" />
                <Icon name="Facebook" size={24} className="cursor-pointer hover:text-primary transition-colors" />
                <Icon name="Twitter" size={24} className="cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-muted pt-8 text-center text-sm text-muted">
            <p>© 2024 STYLE. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
