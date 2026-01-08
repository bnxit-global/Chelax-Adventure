import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-foreground rounded-[2.5rem] p-1 shadow-2xl overflow-hidden relative group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all duration-700"></div>
          
          <div className="bg-foreground rounded-[2.4rem] p-8 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            <div className="lg:w-1/2">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary mb-6 border border-white/10">
                 <Sparkles size={14} />
                 <span className="text-[0.65rem] font-bold uppercase tracking-wider text-white/90">Exclusive Access</span>
               </div>
               <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-tight">Craving travel <br/><span className="text-primary italic">inspiration?</span></h2>
               <p className="text-white/60 text-lg leading-relaxed max-w-md">
                 Join our tribe of globetrotters. Get virtual journeys, juicy travel stories, and seasoned tips delivered monthly.
               </p>
            </div>

            <div className="lg:w-1/2 w-full max-w-md">
              {status === 'success' ? (
                <div className="bg-primary/20 border border-primary/30 p-8 rounded-3xl text-center animate-fade-in-up">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/40">
                    <CheckCircle2 className="text-white" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">You're in the Tribe!</h3>
                  <p className="text-white/60">Watch your inbox for a dose of magic soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group/input">
                    <input 
                      type="email" 
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg placeholder:text-white/30"
                      required
                    />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-focus-within/input:scale-x-100 transition-transform"></div>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white font-bold py-5 rounded-2xl hover:bg-white hover:text-foreground transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20 hover:shadow-none transform active:scale-[0.98]"
                  >
                    Join the Tribe <Send size={18} />
                  </button>
                  <p className="text-center text-white/40 text-[0.65rem] uppercase tracking-widest font-medium">
                    No spam. Just soul-stirring adventures.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;