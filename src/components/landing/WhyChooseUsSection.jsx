import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Award, DollarSign } from 'lucide-react';

const BENEFITS = [
  {
    icon: Award,
    title: 'Rasa Autentik Jawa',
    description: 'Resep turun temurun dengan bumbu dan rempah pilihan terbaik'
  },
  {
    icon: CheckCircle,
    title: 'Bahan Berkualitas',
    description: 'Menggunakan bahan-bahan segar dan berkualitas tinggi setiap hari'
  },
  {
    icon: Clock,
    title: 'Pengiriman Tepat Waktu',
    description: 'Jaminan pengiriman dan pelayanan yang cepat dan tepat waktu'
  },
  {
    icon: DollarSign,
    title: 'Harga Terjangkau',
    description: 'Kualitas premium dengan harga yang ramah di kantong'
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img 
                src="/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png"
                alt="Restoran RejaFood"
                className="w-full h-64 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl"></div>
              
              {/* Floating stats */}
              <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-muted-foreground">Pelanggan Puas</div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">15+</div>
                  <div className="text-xs text-muted-foreground">Menu Pilihan</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
              Kenapa Memilih <span className="text-primary">Kami?</span>
            </h2>
            
            <div className="space-y-6">
              {BENEFITS.map((benefit, index) => (
                <Card key={index} className="border-accent/20 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <benefit.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;