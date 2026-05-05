"use client";

import { useState } from "react";
import { Send, Sparkles, Wand2, RefreshCw } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState("");

  const handleTransform = async (action: string) => {
    if (!input) return;
    
    setLoading(true);
    setActiveAction(action);
    setResult("");

    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, action: action }),
      });

      const data = await response.json();
      // Adjusting based on n8n's output structure
      setResult(data.output || data.text || "No response from agent.");
    } catch (error) {
      setResult("Error connecting to the AI agent.");
    } finally {
      setLoading(false);
      setActiveAction("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Agentic Transformer
          </h1>
          <p className="text-slate-400 text-lg">Powered by n8n & AI Agents</p>
        </div>

        {/* Input Area */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 text-lg resize-none placeholder:text-slate-600"
            rows={6}
            placeholder="Paste text or a URL here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => handleTransform("summarize")}
              disabled={loading}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/50 text-blue-400 hover:bg-blue-600/20 transition-all disabled:opacity-50"
            >
              <Sparkles size={18} /> Summarize
            </button>
            <button
              onClick={() => handleTransform("tweet")}
              disabled={loading}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-600/20 transition-all disabled:opacity-50"
            >
              <Send size={18} /> Tweet Style
            </button>
            <button
              onClick={() => handleTransform("rewrite")}
              disabled={loading}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/50 text-purple-400 hover:bg-purple-600/20 transition-all disabled:opacity-50"
            >
              <Wand2 size={18} /> Simplify
            </button>
          </div>
        </div>

        {/* Result Area */}
        {(loading || result) && (
          <div className="bg-slate-900/80 border border-blue-500/30 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
                Agent Output {activeAction && `• ${activeAction}`}
              </span>
              {loading && <RefreshCw className="animate-spin text-blue-400" size={16} />}
            </div>
            
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {loading ? "Agent is processing your request..." : result}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}