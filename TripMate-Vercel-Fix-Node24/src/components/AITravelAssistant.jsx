import React, { useState, useRef, useEffect } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  Bot, Send, Sparkles, User, Check, ArrowRight, 
  HelpCircle, Zap, RefreshCw, ThumbsUp 
} from 'lucide-react';

export default function AITravelAssistant() {
  const { currentTrip, mutateTripByAI, showToast } = useTrip();
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello! I'm your TripMate AI copilot. I've analyzed your upcoming trip from **${currentTrip.from}** to **${currentTrip.to}** (${currentTrip.overview?.distance} km, ${currentTrip.days} days). How can I assist you with routes, lunch stops, budget optimization, or itinerary adjustments?`,
      action: null,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "Where should I stop for lunch?",
    "Suggest a hotel after 400 km",
    "Make Day 2 less tiring",
    "Suggest a cheaper itinerary",
    "Make this trip suitable for children",
    "What should I pack for this trip?"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      generateAIResponse(query);
      setIsTyping(false);
    }, 700);
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    let replyText = "";
    let action = null;

    if (q.includes("lunch") || q.includes("food") || q.includes("eat")) {
      const rest = currentTrip.restaurants?.[0] || { name: "Highway Oasis", approxCost: "₹250/person", popularDishes: ["Thali", "Tea"] };
      replyText = `Based on your route timing, you will reach the midway marker around 1:00 PM - 1:30 PM. I recommend stopping at **${rest.name}** (${rest.cuisine || 'Highway Family Restaurant'}). They have verified clean washrooms, spacious parking, and top-rated dishes like ${rest.popularDishes ? rest.popularDishes.slice(0, 2).join(', ') : 'fresh thali'}.`;
    } else if (q.includes("less tiring") || q.includes("reduce driving") || q.includes("relax")) {
      replyText = `I've optimized Day 2 to reduce driving and pace out activities. I moved the morning wake-up to 9:00 AM, shifted outdoor sightseeing to the late afternoon breeze, and added a tranquil poolside/spa siesta.`;
      action = {
        label: "Apply Relaxed Pace to Itinerary",
        type: "REDUCE_DRIVE_PACE"
      };
    } else if (q.includes("cheaper") || q.includes("budget") || q.includes("save money")) {
      replyText = `To reduce your total trip cost, I've switched to standard boutique homestays (saving ~₹1,200/night) and prioritized authentic highway family dhabas over fine dining. This lowers your estimated trip budget by approximately 22%!`;
      action = {
        label: "Apply Cheaper Budget Alternatives",
        type: "CHEAPER_BUDGET"
      };
    } else if (q.includes("child") || q.includes("kid") || q.includes("family")) {
      replyText = `I have adjusted the route stops for family comfort: added a clean rest break with a play area every 160 km, recommended child-friendly beaches/gardens with calm waters, and filtered hotels with dedicated kids' pools and baby cots.`;
      action = {
        label: "Optimize Trip for Family & Kids",
        type: "FAMILY_FRIENDLY"
      };
    } else if (q.includes("hotel") && (q.includes("400") || q.includes("500") || q.includes("midway"))) {
      replyText = `Around the 400-500 km mark, the best overnight transit halt is **Kolhapur / Hubballi**. I recommend **Hotel Opal** or **Hotel Sayaji**, which offer secure gated parking, EV charging, 24/7 room service, and early 6:00 AM breakfast for road trippers.`;
    } else if (q.includes("pack") || q.includes("carry")) {
      replyText = `For this ${currentTrip.days}-day trip to ${currentTrip.to}, here are the top 5 essentials you must not forget:\n1. Active FASTag with minimum ₹1,000 balance\n2. Portable tyre inflator & spare wheel check\n3. High-SPF sunscreen & polarized driving sunglasses\n4. Electrolyte/ORS hydration sachets & motion sickness pills\n5. Offline downloaded maps for patchy ghat areas.`;
    } else {
      replyText = `Great question! For your journey between **${currentTrip.from}** and **${currentTrip.to}**, the highway infrastructure is currently smooth with FASTag tolling. The optimal departure time is **${currentTrip.overview?.suggestedDeparture}** to avoid urban bottlenecks. Let me know if you would like me to adjust driving times, hotels, or meal stops!`;
    }

    const aiMsg = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: replyText,
      action: action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
  };

  const executeAction = (action) => {
    if (!action) return;
    mutateTripByAI(action.type);
    setMessages(prev => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'ai',
        text: `✅ Done! I have updated your active itinerary and calculations according to your request.`,
        action: null,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[650px]">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-brand-500 text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
              TripMate AI Copilot
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-400">Context-aware route & travel intelligence</p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `reset-${Date.now()}`,
                sender: 'ai',
                text: `Trip context refreshed for **${currentTrip.title}**. What would you like to explore or customize?`,
                action: null,
                timestamp: 'Just now'
              }
            ]);
            showToast("Chat reset", 'info');
          }}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Reset Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                m.sender === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-brand-100 text-brand-800 border border-brand-200'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl p-4 text-xs md:text-sm shadow-sm space-y-2 ${
                m.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-tr-none'
                  : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {m.text}
              </div>

              {m.action && (
                <div className="pt-2">
                  <button
                    onClick={() => executeAction(m.action)}
                    className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {m.action.label}
                  </button>
                </div>
              )}

              <div
                className={`text-[10px] text-right font-medium ${
                  m.sender === 'user' ? 'text-brand-200' : 'text-slate-400'
                }`}
              >
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Chips */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/60 overflow-x-auto scrollbar-none flex items-center gap-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-brand-600" /> Prompts:
        </span>
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium whitespace-nowrap transition shadow-2xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI anything about your trip or request changes..."
          className="flex-1 px-4 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold transition shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
