import React, { useState, useEffect, useRef } from 'react';
import '../styles/theme.css';

// --- Types ---
interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  type: 'text' | 'illustration' | 'quiz';
  content?: any;
}

// --- Animated Illustration Component ---
const KnowledgeIllustration = ({ type }: { type: string }) => {
  // This is a simplified version of the "self-drawing SVG" logic
  return (
    <div className="glass-panel" style={{
      padding: '20px',
      marginTop: '10px',
      borderLeft: '4px solid var(--neon-cyan)',
      animation: 'fadeIn 0.8s ease-out'
    }}>
      <svg viewBox="0 0 200 100" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--neon-purple)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'var(--neon-cyan)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Animated Path: Simulation of a concept flow */}
        <path
          d="M 20 50 Q 50 20 80 50 T 140 50"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="3"
          strokeDasharray="200"
          strokeDashoffset="200"
          style={{
            animation: 'drawPath 3s ease-in-out forwards',
          }}
        />
        <circle cx="20" cy="50" r="4" fill="var(--neon-cyan)" />
        <circle cx="140" cy="50" r="4" fill="var(--neon-purple)" />
        <text x="100" y="40" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">
          Conceptual Flow
        </text>
      </svg>
      <style>{`
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

const TutorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'tutor',
      text: "Hello! I'm your Nexus Tutor. I've analyzed your materials and I'm ready to dive into 'Async JavaScript'. Shall we start with a simple analogy?",
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response with a "Nexus" feel
    setTimeout(() => {
      const tutorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: "Exactly! Think of Async as ordering coffee: you don't stand still at the counter; you take a buzzer and do other things until the coffee is ready. Look at this flow:",
        type: 'illustration'
      };
      setMessages(prev => [...prev, tutorMsg]);
    }, 1000);
  };

  return (
    <div className="nexus-chat-container" style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: 'var(--bg-deep-space)',
      color: 'var(--text-primary)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Left Sidebar - Course Context (Image 4/6 inspired) */}
      <div className="chat-sidebar" style={{
        width: '300px',
        borderRight: '1px solid var(--glass-border)',
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="glass-panel" style={{ padding: '15px' }}>
          <h4 className="neon-text-cyan" style={{ margin: '0 0 10px 0' }}>Current Module</h4>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>Async JavaScript</p>
          <div style={{
            width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px', marginTop: '10px', overflow: 'hidden'
          }}>
            <div style={{ width: '45%', height: '100%', background: 'var(--neon-cyan)' }} />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '15px', flexGrow: 1 }}>
          <h4 className="neon-text-cyan" style={{ margin: '0 0 10px 0' }}>Nexus Memory</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>📄 Event Loop.md</div>
            <div style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>📄 Promises.md</div>
            <div style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>📄 Callbacks.md</div>
          </div>
        </div>
      </div>

      {/* Main Chat Area (Image 5 inspired) */}
      <div className="chat-main" style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(45deg, var(--neon-purple), var(--neon-cyan))',
              boxShadow: '0 0 15px var(--neon-cyan)'
            }} />
            <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Nexus Tutor <span style={{ fontSize: '0.7rem', color: 'var(--neon-green)', marginLeft: '10px' }}>● ONLINE</span></h2>
          </div>
          <button className="glass-panel" style={{
            padding: '8px 16px',
            background: 'transparent',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.8rem',
            border: '1px solid var(--glass-border)'
          }}>
            End Session
          </button>
        </div>

        {/* Messages Feed */}
        <div ref={scrollRef} style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          scrollbarWidth: 'none'
        }}>
          {messages.map(msg => (
            <div key={msg.id} className={`msg-wrapper ${msg.sender === 'user' ? 'user-msg' : 'tutor-msg'}`} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              animation: 'fadeIn 0.4s ease-out'
            }}>
              <div className="glass-panel" style={{
                padding: '12px 18px',
                maxWidth: '70%',
                borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                backgroundColor: msg.sender === 'user' ? 'var(--neon-purple)' : 'var(--bg-surface)',
                color: 'white',
                border: msg.sender === 'tutor' ? '1px solid var(--glass-border)' : 'none',
                boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(188, 19, 254, 0.3)' : 'none'
              }}>
                {msg.text}
              </div>
              {msg.type === 'illustration' && <KnowledgeIllustration type="flow" />}
            </div>
          ))}
        </div>

        {/* Input Area (Image 5 "Ask anything" style) */}
        <div style={{
          padding: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div className="glass-panel" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px 20px',
            width: '80%',
            maxWidth: '800px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--glass-border)'
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your tutor anything..."
              style={{
                flexGrow: 1,
                background: 'transparent',
                border: 'none',
                color: 'white',
                padding: '15px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              className="neon-border-cyan"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--neon-cyan)',
                cursor: 'pointer',
                fontSize: '1.5rem',
                padding: '0 10px'
              }}
            >
              ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorChat;
