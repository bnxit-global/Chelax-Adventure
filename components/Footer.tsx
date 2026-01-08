import React from 'react';
import { Instagram, Facebook, Youtube, Twitter, Phone, Mail, ArrowUpRight, Plane } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-zinc-950 text-white pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
           {/* Brand & Mission */}
           <div className="lg:col-span-5 space-y-8">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 text-primary rounded-lg">
                  <Plane size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">CHELAX ADVENTURES</h3>
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] font-medium text-primary leading-none mt-1">Next-Gen Travel Agency</p>
                </div>
             </div>
             <p className="text-white/50 text-lg leading-relaxed max-w-sm">
               We handle every detail of your dream vacation, letting you relax, explore, and savor the world without a worry.
             </p>
             <div className="flex gap-4">
               {[
                 { icon: <Instagram size={18} />, label: 'Instagram' },
                 { icon: <Facebook size={18} />, label: 'Facebook' },
                 { icon: <Youtube size={18} />, label: 'Youtube' },
                 { icon: <Twitter size={18} />, label: 'Twitter' },
               ].map((social, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/10">
                   {social.icon}
                 </a>
               ))}
             </div>
           </div>

           {/* Quick Links */}
           <div className="lg:col-span-2 space-y-6">
             <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Explore</h4>
             <ul className="space-y-4 text-white/50">
               {['About Us', 'Group Trips', 'Destinations', 'Travel Blog', 'FAQ'].map((link) => (
                 <li key={link}>
                   <a href="#" className="hover:text-white transition-colors inline-flex items-center group">
                     {link} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-1 transition-all" />
                   </a>
                 </li>
               ))}
             </ul>
           </div>

           {/* Contact */}
           <div className="lg:col-span-5 space-y-8">
             <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Ready for your escape?</h4>
             <div className="space-y-4">
                <a href="mailto:travel@chelaxadventures.com" className="flex items-center gap-4 text-2xl md:text-3xl font-serif hover:text-primary transition-colors underline decoration-white/20 underline-offset-8 decoration-1 hover:decoration-primary">
                  travel@chelaxadventures.com
                </a>
                <div className="flex flex-col gap-2 pt-4">
                  <div className="flex items-center gap-3 text-white/50 font-medium">
                    <Phone size={16} /> (813) 694-1230
                  </div>
                  <div className="flex items-center gap-3 text-white/50 font-medium">
                    <Mail size={16} /> Contact Support
                  </div>
                </div>
             </div>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[0.65rem] text-white/30 space-y-1 text-center md:text-left">
            <p>©2017 Copyright By CHELAX ADVENTURES. All Rights Reserved.</p>
            <p>FL Seller of Travel No. ST43454 | CA Travel No. 2090937-50</p>
          </div>
          
          <div className="flex gap-8 text-[0.65rem] text-white/30 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;