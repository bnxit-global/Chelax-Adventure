import React from 'react';
import { Star, CheckCircle, Award, Users, Globe } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div id="about" className="bg-background py-32">
      {/* Why Chelax? */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative group">
             <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
             <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop" 
                  alt="Adventure Awaits" 
                  className="w-full h-full object-cover aspect-square md:aspect-video lg:aspect-square transform group-hover:scale-105 transition-transform duration-700"
                />
             </div>
             
             {/* Badge Overlay */}
             <div className="absolute -bottom-10 -right-6 md:right-10 bg-white p-8 rounded-2xl shadow-2xl z-20 border border-border/50 max-w-xs animate-fade-in-up">
                <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(i => <Star key={i} className="text-yellow-400 fill-current w-4 h-4" />)}
                </div>
                <p className="font-serif text-foreground font-bold text-lg leading-tight mb-1">Voted Tampa’s Best</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Travel Agency 2024</p>
             </div>
          </div>
          
          <div className="lg:w-1/2">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Story</span>
            <h2 className="font-serif text-4xl lg:text-6xl text-foreground mb-8 leading-tight">Travel should be <span className="text-primary italic">effortless.</span></h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Whether you’re dreaming of exploring Europe’s hidden gems, unwinding at a luxury all-inclusive, or setting sail on a small-ship cruise, we craft trips tailored just for you.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
               {[
                 { title: 'Tailored Plans', desc: 'Every detail fits your style.' },
                 { title: 'Global Connections', desc: 'Access to elite partnerships.' },
                 { title: '24/7 Support', desc: 'We are with you every step.' },
                 { title: 'Expert Insight', desc: 'First-hand destination knowledge.' }
               ].map((feat, i) => (
                 <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary">
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{feat.title}</h4>
                      <p className="text-sm text-muted-foreground">{feat.desc}</p>
                    </div>
                 </div>
               ))}
            </div>

            <button className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-primary/20">
              Meet Our Founder <Globe size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Meet Chelsea with modern card style */}
      <section className="mt-40 container mx-auto px-6">
        <div className="bg-muted/30 rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-border/50">
          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
             <div className="lg:w-1/2">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
                 <Award size={14} />
                 <span className="text-[0.65rem] font-bold uppercase tracking-wider">The Visionary</span>
               </div>
               <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-8">Chelsea <span className="font-light">McAdams</span></h2>
               <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p className="italic text-foreground border-l-4 border-primary pl-6 py-2">
                    "I started Chelax Adventures with a simple mission: to help people disconnect from the busy world and reconnect with themselves."
                  </p>
                  <p>
                    With over a decade of travel planning, Chelsea has turned her passion for the globe into an art form. She doesn't just book rooms; she designs moments.
                  </p>
               </div>
               
               <div className="flex gap-12 mt-12 pt-12 border-t border-border/50">
                  <div>
                    <p className="text-3xl font-serif font-bold text-foreground">500+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Trips Planned</p>
                  </div>
                  <div>
                    <p className="text-3xl font-serif font-bold text-foreground">50+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Destinations</p>
                  </div>
                  <div>
                    <p className="text-3xl font-serif font-bold text-foreground">99%</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Happy Clients</p>
                  </div>
               </div>
             </div>

             <div className="lg:w-1/2">
                <div className="relative">
                   <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl transform scale-95 translate-y-4"></div>
                   <img 
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop" 
                      alt="Chelsea Portrait" 
                      className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                   />
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;