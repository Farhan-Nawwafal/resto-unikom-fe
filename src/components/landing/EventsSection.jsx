import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const EVENTS = [
  {
    id: 1,
    title: 'Diskon Ramadhan',
    description: 'Nikmati diskon hingga 30% untuk paket buka puasa spesial dengan menu tradisional Jawa',
    image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    badge: 'PROMO',
    date: '15 Mar - 15 Apr 2024',
    time: '17:00 - 21:00',
    location: 'Semua Cabang'
  },
  {
    id: 2,
    title: 'Malam Kuliner Jawa',
    description: 'Event spesial dengan live musik gamelan dan buffet menu khas Jawa yang otentik',
    image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    badge: 'LIMITED',
    date: '25 Januari 2024',
    time: '19:00 - 23:00',
    location: 'Cabang Utama'
  },
  {
    id: 3,
    title: 'Live Gamelan Night',
    description: 'Menikmati santap malam dengan alunan musik gamelan tradisional setiap weekend',
    image: '/lovable-uploads/028a8a1f-9d32-4868-9bc0-713bcfdad760.png',
    badge: 'WEEKLY',
    date: 'Setiap Weekend',
    time: '20:00 - 22:00',
    location: 'Cabang Malioboro'
  }
];

const EventsSection = () => {
  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'PROMO':
        return 'bg-primary text-primary-foreground';
      case 'LIMITED':
        return 'bg-destructive text-destructive-foreground';
      case 'WEEKLY':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Event Spesial & <span className="text-primary">Promo</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Jangan lewatkan berbagai event menarik dan promo spesial yang kami tawarkan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map((event) => (
            <Card key={event.id} className="overflow-hidden border-accent/20 hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getBadgeColor(event.badge)}>
                    {event.badge}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-playfair text-foreground">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {event.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar size={16} className="text-primary" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock size={16} className="text-primary" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin size={16} className="text-primary" />
                    <span>{event.location}</span>
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

export default EventsSection;