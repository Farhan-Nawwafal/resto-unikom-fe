import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sari Dewi',
    avatar: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    rating: 5,
    text: 'Gudeg di RejaFood benar-benar autentik! Rasanya persis seperti buatan nenek saya. Pelayanannya juga sangat ramah dan cepat.',
    location: 'Yogyakarta'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    avatar: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    rating: 5,
    text: 'Rawon Surabayanya mantap sekali! Kuahnya pekat dan daging empuk. Harga juga terjangkau untuk kualitas sebagus ini.',
    location: 'Surabaya'
  },
  {
    id: 3,
    name: 'Maya Putri',
    avatar: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    rating: 4,
    text: 'Tempat favorit untuk makan keluarga. Anak-anak suka dengan soto ayamnya, dan saya suka dengan suasana yang nyaman.',
    location: 'Jakarta'
  },
  {
    id: 4,
    name: 'Ahmad Fauzi',
    avatar: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    rating: 5,
    text: 'Event gamelan night-nya sangat berkesan! Makan sambil mendengarkan musik tradisional, pengalaman yang tak terlupakan.',
    location: 'Semarang'
  },
  {
    id: 5,
    name: 'Rina Handayani',
    avatar: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    rating: 5,
    text: 'Delivery-nya selalu tepat waktu dan makanan masih hangat. RejaFood selalu jadi pilihan pertama untuk catering keluarga.',
    location: 'Bandung'
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-gold fill-current' : 'text-muted stroke-current'
        }`}
      />
    ));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Testimoni <span className="text-primary">Pelanggan</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Dengarkan cerita dari pelanggan setia kami yang telah merasakan kelezatan masakan RejaFood
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 border-accent/20 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="text-center">
                        {/* Avatar */}
                        <div className="relative inline-block mb-6">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-accent/20"
                          />
                        </div>

                        {/* Rating */}
                        <div className="flex justify-center items-center space-x-1 mb-4">
                          {renderStars(testimonial.rating)}
                        </div>

                        {/* Testimonial text */}
                        <blockquote className="text-base md:text-lg text-foreground mb-6 italic leading-relaxed">
                          "{testimonial.text}"
                        </blockquote>

                        {/* Author */}
                        <div className="text-center">
                          <div className="font-semibold text-foreground text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-muted-foreground">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full border-accent/20 hover:bg-accent/10"
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full border-accent/20 hover:bg-accent/10"
          >
            <ChevronRight size={20} />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-muted hover:bg-accent'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;