import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot, Map, Calendar, DollarSign, Compass, Copy, Check, ChevronRight } from 'lucide-react';
import { sendMessageToGemini, generateItinerary } from '../services/geminiService';
import { ChatMessage, TripPreferences } from '../types';

const POPULAR_DESTINATIONS = [
  'Santorini, Greece', 'Bali, Indonesia', 'Amalfi Coast, Italy', 
  'Paris, France', 'Tokyo, Japan', 'Tulum, Mexico', 
  'Maldives', 'Swiss Alps', 'Cape Town, South Africa', 
  'Bora Bora, French Polynesia', 'Barcelona, Spain', 'Kyoto, Japan'
];

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'wizard'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  
  // Wizard State
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 'Moderate',
    travelStyle: 'Relaxing',
    interests: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem('chelax_trip_preferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) { console.error("Failed to load preferences", e); }
    }
    
    // Initial welcome message if no history
    if (messages.length === 0) {
      setMessages([{ 
        role: 'model', 
        text: 'Welcome to your premium travel concierge. I am here to design your next masterpiece of a journey. Would you like to chat, or should we use the Trip Wizard?', 
        timestamp: new Date() 
      }]);
    }
  }, []);

  // Save persistence
  useEffect(() => {
    localStorage.setItem('chelax_trip_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, mode]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const historyForApi = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const responseText = await sendMessageToGemini(historyForApi, userMessage.text);
    
    const botMessage: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMode('chat');
    setIsLoading(true);

    setMessages(prev => [...prev, { 
        role: 'user', 
        text: `Designing a ${preferences.travelStyle} escape to ${preferences.destination} (${preferences.startDate} - ${preferences.endDate}).`, 
        timestamp: new Date() 
    }]);

    const itinerary = await generateItinerary(preferences);

    setMessages(prev => [...prev, { 
        role: 'model', 
        text: itinerary, 
        timestamp: new Date(),
        isItinerary: true
    }]);
    
    setIsLoading(false);
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDestinations = POPULAR_DESTINATIONS.filter(d => 
    d.toLowerCase().includes(preferences.destination.toLowerCase())
  ).slice(0, 4);

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 flex items-center gap-2 group ${
            isOpen ? 'bg-zinc-950 text-white rotate-90 scale-90' : 'bg-primary text-white scale-100 shadow-primary/40'
        }`}
      >
        {isOpen ? <X size={24} /> : <><Sparkles size={24} className="animate-pulse text-white" /><span className="hidden md:inline font-bold text-sm tracking-widest uppercase ml-1">AI Concierge</span></>}
      </button>

      {/* Main Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-[95vw] md:w-[480px] max-h-[750px] h-[85vh] bg-background rounded-3xl shadow-2xl z-50 flex flex-col border border-border overflow-hidden animate-fade-in-up font-sans ring-1 ring-black/5">
          
          {/* Header */}
          <div className="bg-zinc-950 p-6 flex justify-between items-center text-white border-b border-white/10">
             <div className="flex items-center gap-4">
                 <div className="bg-primary/20 p-2.5 rounded-xl backdrop-blur-md border border-primary/30">
                    <Bot size={22} className="text-primary" />
                 </div>
                 <div>
                     <h3 className="font-bold text-lg tracking-tight leading-none">Chelax AI</h3>
                     <p className="text-[0.65rem] opacity-50 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online Concierge
                     </p>
                 </div>
             </div>
             <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                <button 
                  onClick={() => setMode('chat')} 
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'chat' ? 'bg-white text-zinc-950 shadow-lg' : 'text-white/50 hover:text-white'}`}
                >
                  Chat
                </button>
                <button 
                  onClick={() => setMode('wizard')} 
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'wizard' ? 'bg-white text-zinc-950 shadow-lg' : 'text-white/50 hover:text-white'}`}
                >
                  Trip Wizard
                </button>
             </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col bg-muted/20 relative">
            
            {/* CHAT MODE */}
            {mode === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-zinc-950 text-white' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                           {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                       </div>
                       <div className={`group relative max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed whitespace-pre-wrap shadow-sm transition-all duration-300 border ${
                          msg.role === 'user' 
                          ? 'bg-zinc-950 text-white rounded-tr-none border-zinc-800' 
                          : 'bg-white text-foreground border-border rounded-tl-none hover:shadow-md'
                       }`}>
                          {msg.text}
                          
                          {/* Share/Copy Itinerary Button */}
                          {msg.isItinerary && (
                            <button 
                              onClick={() => handleCopy(msg.text, idx)}
                              className="absolute -bottom-10 right-0 p-2 bg-white rounded-full border border-border shadow-md text-muted-foreground hover:text-primary transition-all flex items-center gap-2 px-4 group/copy"
                            >
                              <span className="text-[0.65rem] font-bold uppercase tracking-widest">{copiedId === idx ? 'Copied!' : 'Share Itinerary'}</span>
                              {copiedId === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                          )}
                       </div>
                    </div>
                  ))}
                  {isLoading && (
                     <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 animate-pulse">
                             <Bot size={18} />
                         </div>
                         <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-none border border-border shadow-sm flex items-center gap-1.5">
                             <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                             <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-150"></span>
                             <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-300"></span>
                         </div>
                     </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSendChat} className="p-6 bg-background border-t border-border">
                  <div className="relative group">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about destinations, packing, or booking..."
                      className="w-full pl-6 pr-14 py-4 rounded-2xl border border-input bg-muted/30 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                    />
                    <button 
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-3 top-3 p-2 bg-zinc-950 text-white rounded-xl hover:bg-primary disabled:opacity-30 transition-all shadow-lg active:scale-95"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* WIZARD MODE */}
            {mode === 'wizard' && (
              <div className="flex-1 overflow-y-auto p-8 animate-fade-in-up">
                  <div className="mb-10 text-center">
                    <h4 className="font-serif text-3xl font-bold text-foreground mb-2">Trip Wizard</h4>
                    <p className="text-muted-foreground text-sm font-medium">Fine-tune your escape with our AI engine.</p>
                  </div>

                  <form onSubmit={handleWizardSubmit} className="space-y-6 pb-6">
                      <div className="space-y-3 relative">
                          <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                             <Map size={14} className="text-primary" /> Destination
                          </label>
                          <input 
                            type="text" 
                            placeholder="Where are we going?"
                            className="w-full p-4 rounded-xl border border-input bg-background focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-semibold"
                            value={preferences.destination}
                            onFocus={() => setShowAutocomplete(true)}
                            onChange={(e) => {
                              setPreferences({...preferences, destination: e.target.value});
                              setShowAutocomplete(true);
                            }}
                          />
                          {showAutocomplete && preferences.destination && filteredDestinations.length > 0 && (
                            <div className="absolute z-50 w-full top-[100%] mt-2 bg-white border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                              {filteredDestinations.map(d => (
                                <button 
                                  key={d}
                                  type="button"
                                  onClick={() => {
                                    setPreferences({...preferences, destination: d});
                                    setShowAutocomplete(false);
                                  }}
                                  className="w-full text-left px-5 py-3 hover:bg-primary/5 text-sm font-medium text-foreground flex items-center justify-between group/item"
                                >
                                  {d} <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </button>
                              ))}
                            </div>
                          )}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <Calendar size={14} className="text-primary" /> Start Date
                            </label>
                            <input 
                                type="date" 
                                className="w-full p-4 rounded-xl border border-input bg-background focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-semibold appearance-none"
                                value={preferences.startDate}
                                onChange={(e) => setPreferences({...preferences, startDate: e.target.value})}
                                required
                            />
                        </div>
                        <div className="space-y-3">
                             <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <Calendar size={14} className="text-primary" /> End Date
                            </label>
                            <input 
                                type="date" 
                                className="w-full p-4 rounded-xl border border-input bg-background focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-semibold appearance-none"
                                value={preferences.endDate}
                                onChange={(e) => setPreferences({...preferences, endDate: e.target.value})}
                                required
                            />
                        </div>
                      </div>

                      <div className="space-y-3">
                          <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                             <DollarSign size={14} className="text-primary" /> Investment Level
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                              {['Budget', 'Moderate', 'Luxury', 'Ultra-Luxury'].map((level) => (
                                  <button
                                    key={level}
                                    type="button"
                                    onClick={() => setPreferences({...preferences, budget: level as any})}
                                    className={`py-3 px-2 text-[0.65rem] font-bold uppercase tracking-widest rounded-xl border transition-all ${
                                        preferences.budget === level 
                                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg scale-95' 
                                        : 'bg-white border-input text-foreground hover:bg-muted'
                                    }`}
                                  >
                                      {level}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div className="space-y-3">
                          <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                             <Sparkles size={14} className="text-primary" /> Interests & Vibes
                          </label>
                          <textarea 
                            placeholder="e.g. Michelin dining, private hikes, sunset sails..."
                            className="w-full p-4 rounded-xl border border-input bg-background focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-semibold min-h-[100px] resize-none"
                            value={preferences.interests}
                            onChange={(e) => setPreferences({...preferences, interests: e.target.value})}
                          />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-2xl shadow-primary/20 hover:bg-zinc-950 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-6 text-sm uppercase tracking-widest"
                      >
                         <Sparkles size={18} /> Craft Itinerary
                      </button>
                  </form>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;