'use client';

import { useEffect, useState } from 'react';
import { Send, X } from 'lucide-react';
import { messages, type Locale } from '@/lib/messages';
import { useLocale } from 'next-intl';  

const phoneNumber = '+905344882777'; // WhatsApp numaran
interface WhatsAppWidgetProps {
    service: 'books' | 'poems' | 'bioenergy' | 'biotherapist';
  }
  
  export default function WhatsAppWidget({ service }: WhatsAppWidgetProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [message, setMessage] = useState('');
  
  const currentLocale = useLocale() as Locale;

  useEffect(() => {
    // Service'e özel mesaj kullan, yoksa default mesaj
    const serviceMessage = messages[currentLocale].services[service] || messages[currentLocale].defaultMessage;
    setMessage(serviceMessage);

    
    // 10 saniye sonra widget göster + ses çal
    const timer = setTimeout(() => {
      setVisible(true);
      setExpanded(true);
      setShowBadge(true);
      playPing();
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentLocale, service]);

  const t = messages[currentLocale];

  const playPing = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 1200;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // ignore
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setExpanded(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Floating Button */}
      {!expanded && (
        <div 
          onClick={() => { setExpanded(true); setShowBadge(false); }}
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl cursor-pointer z-50 flex items-center justify-center animate-bounce"
        >
    <svg 
            viewBox="0 0 24 24" 
            width="28" 
            height="28" 
            fill="white"
            className="animate-pulse"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
          </svg>

          {showBadge && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
          )}
        </div>
      )}

      {/* Expanded Widget */}
      {expanded && (
        <div className="fixed bottom-6 right-6 w-[320px] bg-white shadow-2xl border rounded-2xl z-50 animate-slideInFromBottom">
          {/* Header */}
          <div className="bg-green-600 text-white text-center py-3 font-semibold rounded-t-2xl relative">
            {t.header}
            <button onClick={() => setExpanded(false)} className="absolute top-2 right-2 text-white">
              <X size={18} />
            </button>
          </div>

          {/* Agent Info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">👤</span>
            </div>
            <div>
              <span className="text-gray-700 font-medium">{t.helper}</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-3 py-3 border rounded-lg resize-none outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
            />
            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Send size={18} /> {t.button}
            </button>

            <div className="flex gap-2 mt-2">

</div>
          </div>
        </div>
      )}
    </>
  );
}
