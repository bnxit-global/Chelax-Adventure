import React from 'react';
import { ServiceItem } from '../types';
import { ArrowRight } from 'lucide-react';

const services: ServiceItem[] = [
  { id: '1', title: 'Caribbean', description: 'Stunning tropical destinations.', image: 'https://picsum.photos/600/800?random=10' },
  { id: '2', title: 'Cruises', description: 'Authentic experiences on crystal waters.', image: 'https://picsum.photos/600/800?random=11' },
  { id: '3', title: 'Europe', description: 'Culture, climate, and culinary wonders.', image: 'https://picsum.photos/600/800?random=12' },
  { id: '4', title: 'Exotic', description: 'Adventures for the wild at heart.', image: 'https://picsum.photos/600/800?random=13' },
  { id: '5', title: 'Weddings', description: 'Say "I do" in paradise.', image: 'https://picsum.photos/600/800?random=14' },
  { id: '6', title: 'Honeymoons', description: 'Celebrate love with tranquility.', image: 'https://picsum.photos/600/800?random=15' },
  { id: '7', title: 'Custom', description: 'Tailored to your unique tastes.', image: 'https://picsum.photos/600/800?random=16' },
  { id: '8', title: 'Groups', description: 'Bring friends and family together.', image: 'https://picsum.photos/600/800?random=17' },
];

const Services: React.FC = () => {
  return (
    <section id="book" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Our Expertise</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Curated Experiences</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From secluded beaches to bustling European streets, we curate the perfect backdrop for your next story with precision and care.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:translate-x-1 transition-transform">
             View All Destinations <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <div 
                key={service.id} 
                className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-border ${
                    idx === 0 || idx === 7 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-[240px]'
                }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className={`font-serif text-white mb-2 ${idx === 0 || idx === 7 ? 'text-3xl' : 'text-xl'}`}>
                    {service.title}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                   Explore <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;