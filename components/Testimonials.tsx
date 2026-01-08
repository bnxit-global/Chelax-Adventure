import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Client Love</h2>
            <div className="flex justify-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />)}
            </div>
        </div>

        <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/5 backdrop-blur-md p-10 md:p-14 rounded-3xl border border-white/10 shadow-2xl">
                <Quote className="absolute top-10 left-10 w-12 h-12 text-primary/40 -z-10 transform -scale-x-100" />
                
                <p className="font-serif text-xl md:text-3xl italic leading-relaxed text-center mb-10 text-white/90">
                    "Chelsea carefully listened to our interests and every activity, location, restaurant was perfect for us. 
                    I can say it was truly a trip of a lifetime."
                </p>
                
                <div className="flex items-center justify-center gap-4 border-t border-white/10 pt-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center font-bold text-white text-xl shadow-lg">A</div>
                    <div>
                        <p className="font-bold text-lg">Ava C.</p>
                        <p className="text-sm text-white/50">Honeymoon in Maldives</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;