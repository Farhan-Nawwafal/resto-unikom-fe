import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Mobile: Image first */}
          <div className="lg:hidden order-1">
            <div className="relative">
              <img 
                src="/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png"
                alt="Makanan Jawa RejaFood"
                className="w-full h-48 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-tight mb-6">
              Discover
              <br />
              <span className="text-primary">Restaurant &</span>
              <br />
              <span className="text-accent">Delicious Food</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl">
              Nikmati cita rasa autentik masakan Jawa dengan sentuhan modern di RejaFood. 
              Setiap hidangan dibuat dengan bahan berkualitas tinggi dan resep tradisional 
              yang telah diwariskan turun-temurun.
            </p>
            
            <Button 
              size="default"
              className="bg-primary hover:bg-primary/90 text-base px-6 py-3 rounded-xl"
            >
              Order Now
            </Button>
          </div>

          {/* Desktop: Image */}
          <div className="hidden lg:block order-1 lg:order-2">
            <div className="relative">
              <img 
                src="/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png"
                alt="Makanan Jawa RejaFood"
                className="w-full h-72 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl"></div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold">
                ⭐ 4.8/5
              </div>
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
                #1 Restoran Jawa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;