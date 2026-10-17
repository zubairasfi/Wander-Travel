import React, { useState, useRef, useEffect } from 'react';
import { X, Send, BotMessageSquare, Sparkles, User, RefreshCw } from 'lucide-react';
import { TripPlan, ChatMessage } from '../types/travel';

interface AiConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TripPlan | null;
}

export const AiConciergeDrawer: React.FC<AiConciergeDrawerProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or re-initialize welcome message when trip changes
  useEffect(() => {
    if (trip) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `Hello! I'm your personal AI Concierge for **${trip.destination}**.\n\nI can help you navigate local transit, recommend hidden spots, suggest what to wear for the weather, translate dietary requirements, or adjust your daily schedule.\n\nWhat can I assist you with today?`,
          timestamp: Date.now(),
          suggestions: [
            'What local dishes must I try?',
            'Best photography spots for sunset?',
            'How do I buy transit tickets?',
            'Any common scams to avoid?',
          ],
        },
      ]);
    } else {
      setMessages([
        {
          id: 'welcome_general',
          role: 'assistant',
          content: `Hi there! I'm your AI Travel Concierge. Tell me where you are thinking of traveling or pick one of the sample trips to get started!`,
          timestamp: Date.now(),
          suggestions: [
            'Best destinations for couples in spring?',
            'Where to travel for amazing street food?',
            'Plan a 5-day nature trip',
          ],
        },
      ]);
    }
  }, [trip?.id]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          tripContext: trip,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (data.success) {
        const assistantMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: Date.now(),
          suggestions: data.suggestions || [],
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: 'assistant',
            content: `I ran into a temporary issue: ${data.error || 'Please try again in a moment.'}`,
            timestamp: Date.now(),
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: `Network connection error. Please try asking again.`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col no-print animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center font-bold">
            <BotMessageSquare className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">AI Travel Concierge</h3>
            <p className="text-[11px] text-teal-400">
              {trip ? `Assisting with ${trip.destination}` : 'Global Travel Guide'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[90%]">
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                {/* Simple rendering with markdown newline support */}
                {msg.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Suggestions Chips */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                {msg.suggestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => sendMessage(sug)}
                    disabled={loading}
                    className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-900/90 hover:bg-teal-500/15 hover:border-teal-500/40 border border-slate-800 text-slate-300 hover:text-teal-300 transition-all text-left"
                  >
                    ✦ {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-teal-400 p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>AI Concierge is typing advice...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <form onSubmit={handleFormSubmit} className="p-3 border-t border-slate-800 bg-slate-900/40">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about food, metro, weather, evening spots..."
            disabled={loading}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-teal-500 text-slate-950 hover:brightness-110 active:scale-95 disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
