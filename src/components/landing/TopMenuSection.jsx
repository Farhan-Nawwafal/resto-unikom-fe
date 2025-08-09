import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';

const TOP_MENU_ITEMS = [
  {
    rank: 1,
    name: 'Gudeg Jogja Special',
    description: 'Gudeg tradisional dengan cita rasa autentik, disajikan dengan ayam kampung dan telur pindang',
    image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    rating: 4.9,
    price: 'Rp 28.000'
  },
  {
    rank: 2,
    name: 'Rawon Surabaya',
    description: 'Sup daging sapi dengan kuah hitam khas dan bumbu rempah pilihan',
    image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    rating: 4.8,
    price: 'Rp 32.000'
  },
  {
    rank: 3,
    name: 'Soto Ayam Lamongan',
    description: 'Soto ayam dengan kuah bening segar dan bumbu khas Lamongan',
    image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    rating: 4.7,
    price: 'Rp 25.000'
  }
];

const TopMenuSection = () => {
  return (
    <section id="menu" className="py-16 bg-card/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Top <span className="text-primary">Rekomendasi</span> Menu
            </h2>
            <p className="text-base text-muted-foreground max-w-xl">
              Menu favorit pilihan pelanggan yang paling diminati dan memiliki rating tertinggi
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
          >
            Lihat Selengkapnya 
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOP_MENU_ITEMS.map((item) => (
            <Card key={item.rank} className="overflow-hidden border-accent/20 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 z-10 w-12 h-12 bg-gradient-to-br from-gold to-accent rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-background">{item.rank}</span>
                  </div>
                  
                  {/* Image */}
                  <div className="w-full h-48">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-gold fill-current" />
                    <span className="font-semibold text-gold">{item.rating}</span>
                  </div>
                  
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                    {item.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="text-xl font-bold text-primary">
                      {item.price}
                    </div>
                    
                    <Button className="bg-primary hover:bg-primary/90 group w-full" size="sm">
                      Pesan Sekarang
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopMenuSection;