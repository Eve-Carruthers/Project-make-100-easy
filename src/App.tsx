import React, { useState, useEffect, useRef, useMemo, memo, createContext, useContext } from 'react';
import {
  Brain, Layout, ChevronRight, ChevronLeft, X,
  Clock, Zap, Award, Loader2, Sparkles,
  ShieldCheck, Mic, Play, Square,
  Calendar, GraduationCap, Mail, Radio, Target, FileText, CheckCircle2, XCircle, ArrowRight, Activity, Shuffle
} from 'lucide-react';
import CauseCraftGame from './components/CauseCraftGame';
import { DocumentData, MindMapNode, QuizItem, UserStats } from './types';

/**
 * ---------------------------------------------------------------------
 * 1. LANDING PAGE COMPONENT
 * ---------------------------------------------------------------------
 */

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles: {x: number, y: number, dx: number, dy: number, size: number, alpha: number}[] = [];
    const particleCount = Math.min(100, (width * height) / 15000); 

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    animate();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const LandingPage = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-hidden flex flex-col font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
      <ParticleBackground />

      <nav className="relative z-10 flex justify-between items-center p-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <Brain className="w-6 h-6 text-indigo-300" />
          </div>
          <span className="text-xl font-bold tracking-tight">NeuroMap AI</span>
        </div>
        <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors" onClick={onEnter}>Sign In</button>
      </nav>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto mt-[-4rem]">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs font-medium text-indigo-200 tracking-wide uppercase">v4.0 Complete Edition</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          Master Any Subject <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            In Half The Time.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Transform static PDFs and topics into interactive mind maps, adaptive flashcards, and personalized lesson plans using advanced AI.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <button 
            onClick={onEnter}
            className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="flex items-center gap-2">
              Launch Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          {[
            { icon: Brain, title: "Cognitive Mapping", desc: "Recursive knowledge graphs generated instantly." },
            { icon: Zap, title: "Smart Revision", desc: "SM-2 spaced repetition algorithms built-in." },
            { icon: Calendar, title: "Curriculum Gantt", desc: "Turn lesson plans into timelines automatically." }
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-left group">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/**
 * ---------------------------------------------------------------------
 * 2. MAIN APPLICATION 
 * ---------------------------------------------------------------------
 */

const apiKey = ""; // Injected by runtime environment (e.g. import.meta.env.VITE_GEMINI_API_KEY)
const STORAGE_KEY = "NEUROMAP_FINAL_DATA";

// --- Toast Context ---
interface Toast { id: string; type: 'success' | 'error'; message: string; }
const ToastContext = createContext<{ addToast: (t: Omit<Toast, 'id'>) => void }>({ addToast: () => {} });
const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = (t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36);
    setToasts(p => [...p, { ...t, id }]);
    setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 3000);
  };
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`p-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-right fade-in duration-300 pointer-events-auto ${t.type === 'error' ? 'bg-red-50 border-red-100 text-red-900' : 'bg-slate-900 border-slate-800 text-white'}`}>
            {t.type === 'error' ? <XCircle className="w-5 h-5"/> : <CheckCircle2 className="w-5 h-5 text-green-400"/>}
            <span className="font-bold text-sm">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
const useToast = () => useContext(ToastContext);

// --- AI Service ---
const cleanJsonString = (str: string) => str.replace(/```json/g, '').replace(/```/g, '').trim();
const callGemini = async (prompt: string, systemPrompt: string = "", retries = 2): Promise<any> => {
  if (!navigator.onLine) throw new Error("Offline");
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: systemPrompt }] } }),
        }
      );
      if (!response.ok) throw new Error("API Error");
      const result = await response.json();
      return JSON.parse(cleanJsonString(result.candidates?.[0]?.content?.parts?.[0]?.text || "{}"));
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
};

// --- Tool Components ---

const TeacherRadar = ({ time }: { time: number }) => (
    <div className="bg-slate-900 text-white p-3 rounded-lg mb-4 flex items-center justify-between shadow-lg ring-1 ring-white/10">
        <div className="flex items-center gap-2">
            <Radio className={`w-4 h-4 ${time > 15 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}/>
            <span className="text-xs font-bold uppercase tracking-wider">Teacher View</span>
        </div>
        <div className="text-xs font-mono">{time}s Active</div>
    </div>
);

const QuizPanel = ({ node, onSave }: { node: MindMapNode, onSave: (s: number, q: QuizItem[]) => void }) => {
    const [quiz, setQuiz] = useState<QuizItem[]>(node.quiz || []);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { addToast } = useToast();

    const generate = async () => {
        setLoading(true);
        try {
            const res = await callGemini(`3 MCQ for "${node.text}"`, "JSON: [{id, question, options:[], correctIndex}]");
            if(Array.isArray(res)) setQuiz(res);
        } catch(e) { addToast({type:'error', message:'Quiz Gen Failed'}); }
        setLoading(false);
    };

    if(loading) return <div className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600"/></div>;
    if(!quiz.length) return (
        <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <GraduationCap className="w-12 h-12 mx-auto text-slate-300 mb-2"/>
            <button onClick={generate} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 shadow-md transition-all">Generate Quiz</button>
        </div>
    );

    return (
        <div className="p-4 space-y-4">
            {quiz.map((q, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border shadow-sm">
                    <p className="font-bold text-sm mb-3 text-slate-800">{i+1}. {q.question}</p>
                    <div className="space-y-2">
                        {q.options.map((o, idx) => (
                            <button key={idx} onClick={() => { if(!submitted) { const n=[...quiz]; n[i].userAnswer=idx; setQuiz(n); }}} 
                                className={`w-full text-left p-3 rounded-lg text-xs border transition-all ${submitted ? (idx===q.correctIndex?'bg-green-100 border-green-500 text-green-800':(q.userAnswer===idx?'bg-red-100 border-red-500 text-red-800':'bg-white text-slate-600 opacity-50')) : (q.userAnswer===idx?'bg-indigo-50 border-indigo-500 text-indigo-700':'bg-white hover:bg-slate-50 text-slate-600')}`}
                            >{o}</button>
                        ))}
                    </div>
                </div>
            ))}
            {!submitted ? <button onClick={() => { setSubmitted(true); onSave(Math.round((quiz.filter(q=>q.userAnswer===q.correctIndex).length/quiz.length)*100), quiz); }} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800">Submit</button>
            : <div className="text-center font-bold text-green-700 bg-green-50 p-3 rounded-xl border border-green-200">Score Saved</div>}
        </div>
    );
};

const VoiceRecorder = ({ onSave, initialAudio }: { onSave: (b64: string) => void, initialAudio?: string }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(initialAudio || null);
    const mediaRef = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);
    const { addToast } = useToast();

    const toggle = async () => {
        if (isRecording) { mediaRef.current?.stop(); setIsRecording(false); } 
        else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRef.current = new MediaRecorder(stream);
                chunks.current = [];
                mediaRef.current.ondataavailable = e => chunks.current.push(e.data);
                mediaRef.current.onstop = () => {
                    const reader = new FileReader();
                    reader.readAsDataURL(new Blob(chunks.current, { type: 'audio/webm' }));
                    reader.onloadend = () => { setAudioUrl(reader.result as string); onSave(reader.result as string); addToast({type:'success', message:'Voice Note Saved'}); };
                };
                mediaRef.current.start(); setIsRecording(true);
            } catch (e) { addToast({type:'error', message:'Mic Denied'}); }
        }
    };

    return (
        <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-xl mt-4 border border-slate-200">
            <button onClick={toggle} className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                {isRecording ? <Square className="w-4 h-4 fill-current"/> : <Mic className="w-4 h-4"/>}
            </button>
            <div className="flex-grow text-xs font-bold text-slate-600">{isRecording ? "Recording..." : audioUrl ? "Voice Note Attached" : "Record Audio Note"}</div>
            {audioUrl && !isRecording && <button onClick={() => new Audio(audioUrl).play()} className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"><Play className="w-4 h-4 fill-current"/></button>}
        </div>
    );
};

const RevisionMode = ({ node, cards, onAddCards, onUpdateCard, onClose }: any) => {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => { const t = setInterval(()=>setTimer(p=>p+1),1000); return ()=>clearInterval(t); }, [index]);

    useEffect(() => {
        if(cards.length > 0) return;
        const gen = async () => {
            setLoading(true);
            try {
                const res = await callGemini(`Gen 3 flashcards for "${node.text}"`, "JSON: [{front, back}]");
                if(Array.isArray(res)) onAddCards(res.map((c:any,i:number)=>({id:`gen-${Date.now()}-${i}`, nodeId:node.id, front:c.front, back:c.back, sm2Data:{interval:0,easeFactor:2.5,step:0,nextReview:new Date().toISOString()}})));
            } catch(e) {}
            setLoading(false);
        };
        gen();
    }, [node.id]);

    const handleGrade = (q: number) => {
        const c = cards[index];
        const next = new Date(); next.setDate(next.getDate() + (q>=3?1:0));
        onUpdateCard({...c, sm2Data:{...c.sm2Data, nextReview:next.toISOString()}});
        if(index<cards.length-1) { setIndex(i=>i+1); setFlipped(false); setTimer(0); } else onClose();
    };

    if(loading) return <div className="p-10 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600"/></div>;
    if(!cards.length) return null;
    const card = cards[index];

    return (
        <div className="flex flex-col h-full p-4">
            <TeacherRadar time={timer} />
            
            <div className="flex-grow relative perspective-1000 cursor-pointer group" onClick={() => !flipped && setFlipped(true)}>
                <div className={`w-full h-full transition-all duration-500 transform preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-100 rounded-2xl p-6 flex items-center justify-center text-center shadow-sm hover:border-indigo-200">
                        <h3 className="font-bold text-xl text-slate-800">{card.front}</h3>
                    </div>
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white">
                        <p className="text-lg">{card.back}</p>
                    </div>
                </div>
            </div>

            {flipped ? (
                <div className="mt-4 space-y-4 animate-in slide-in-from-bottom-4">
                    <VoiceRecorder onSave={(b64)=>onUpdateCard({...card, audioNote:b64})} initialAudio={card.audioNote} />
                    <div className="grid grid-cols-4 gap-2">
                        <button onClick={()=>handleGrade(0)} className="p-2 bg-red-100 text-red-700 rounded-lg font-bold text-xs hover:bg-red-200">Fail</button>
                        <button onClick={()=>handleGrade(3)} className="p-2 bg-amber-100 text-amber-700 rounded-lg font-bold text-xs hover:bg-amber-200">Hard</button>
                        <button onClick={()=>handleGrade(5)} className="p-2 bg-green-100 text-green-700 rounded-lg font-bold text-xs hover:bg-green-200">Easy</button>
                        <button onClick={(e)=>{e.stopPropagation(); const n=new Date(); n.setDate(n.getDate()+1); onUpdateCard({...card, sm2Data:{...card.sm2Data, nextReview:n.toISOString()}}); if(index<cards.length-1){setIndex(i=>i+1); setFlipped(false); setTimer(0);} else onClose();}} className="p-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs flex flex-col items-center hover:bg-slate-200"><Clock className="w-3 h-3"/> Snooze</button>
                    </div>
                </div>
            ) : <div className="text-center text-xs text-slate-400 mt-2 font-medium animate-pulse">Tap card to reveal</div>}
        </div>
    );
};

const MindMapCanvas = memo(({ data, onNodeClick, onOpenGame }: { data: MindMapNode, onNodeClick: (n: MindMapNode) => void; onOpenGame?: (n: MindMapNode) => void }) => {
    const layout = useMemo(() => {
        const pos: Record<string, {x:number, y:number}> = {};
        let cy = 0;
        const traverse = (n: MindMapNode, d: number): number => {
            if(!n.children?.length) { pos[n.id] = {x: 50+d*280, y: cy}; cy += 100; return cy; }
            const ys: number[] = n.children.map(c => traverse(c, d+1));
            const y: number = (Math.min(...ys)+Math.max(...ys))/2;
            pos[n.id] = {x: 50+d*280, y};
            return y;
        };
        traverse(data, 0);
        return pos;
    }, [data]);
    const find = (n: MindMapNode, id: string): MindMapNode|null => { if(n.id===id)return n; if(n.children)for(const c of n.children){const f=find(c,id);if(f)return f;} return null; };

    return (
        <div className="w-full h-full bg-slate-50 overflow-auto relative cursor-grab active:cursor-grabbing">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            <svg width="4000" height="4000" className="absolute pointer-events-none">
                {Object.keys(layout).map(src => {
                    const n = find(data, src); if(!n?.children) return null;
                    return n.children.map(c => {
                        const s=layout[src], t=layout[c.id]; if(!t) return null;
                        return <path key={`${src}-${c.id}`} d={`M ${s.x+240} ${s.y+40} C ${s.x+280} ${s.y+40}, ${t.x-40} ${t.y+40}, ${t.x} ${t.y+40}`} stroke="#cbd5e1" strokeWidth="2" fill="none"/>;
                    });
                })}
            </svg>
            {Object.entries(layout).map(([id, p]) => {
                const n = find(data, id); if(!n) return null;
                return (
                    <div key={id} onClick={() => onNodeClick(n)} className="absolute w-64 p-4 bg-white rounded-xl border-2 border-slate-100 hover:border-indigo-400 shadow-sm cursor-pointer transition-all hover:scale-105 relative" style={{left: p.x, top: p.y}}>
                         <div className="flex justify-between mb-2">
                             <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">{n.type}</span>
                             {n.quizScore!==undefined && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold flex items-center gap-1"><Award className="w-3 h-3"/> {n.quizScore}%</span>}
                        </div>
                        <div className="font-bold text-sm text-slate-800 line-clamp-2">{n.text}</div>
                        {onOpenGame && n.type !== 'root' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onOpenGame(n); }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-white hover:bg-amber-500"
                            title="Play CauseCraft"
                            aria-label="Play CauseCraft"
                          >
                            <Shuffle className="w-3 h-3" />
                          </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
});

const TimelineView = ({ data, onNodeClick }: { data: MindMapNode, onNodeClick: (n: MindMapNode) => void }) => {
    return (
        <div className="flex h-full overflow-x-auto gap-4 p-6 bg-slate-100">
            {data.children?.map((col, i) => (
                <div key={col.id} className="min-w-[280px] flex flex-col h-full">
                    <div className="bg-white p-4 rounded-t-xl font-bold border-b-2 border-indigo-500 shadow-sm sticky top-0 z-10 flex justify-between items-center">
                        <span>{col.targetDate || `Week ${i+1}`}</span>
                        <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{col.children?.length || 0} items</span>
                    </div>
                    <div className="bg-slate-50 flex-grow rounded-b-xl p-3 space-y-3 overflow-y-auto border border-slate-200">
                        {col.children?.map(item => (
                            <div key={item.id} onClick={() => onNodeClick(item)} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group">
                                <div className="text-sm font-bold text-slate-800">{item.text}</div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex gap-1">{[...Array(item.bloomLevel||1)].map((_,k)=><div key={k} className="w-1.5 h-1.5 rounded-full bg-indigo-400"/>)}</div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const NodeDetailPanel = ({ node, cards, onAddCards, onUpdateCard, onUpdateNode, onClose }: any) => {
    const [tab, setTab] = useState<'study' | 'quiz'>('study');
    return (
        <div className="flex flex-col h-full bg-white border-l shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold truncate w-64 text-slate-800">{node.text}</h3>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5"/></button>
            </div>
            <div className="flex border-b">
                <button onClick={() => setTab('study')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${tab==='study'?'border-indigo-600 text-indigo-600':'border-transparent text-slate-500 hover:text-slate-700'}`}>Study</button>
                <button onClick={() => setTab('quiz')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${tab==='quiz'?'border-indigo-600 text-indigo-600':'border-transparent text-slate-500 hover:text-slate-700'}`}>Assessment</button>
            </div>
            <div className="flex-grow overflow-y-auto bg-slate-50/50">
                {tab === 'study' ? <RevisionMode node={node} cards={cards} onAddCards={onAddCards} onUpdateCard={onUpdateCard} onClose={onClose}/> : <QuizPanel node={node} onSave={(s, q) => onUpdateNode({...node, quizScore:s, quiz:q})}/>}
            </div>
        </div>
    );
};

const GeneratorModal = ({ isOpen, onClose, onComplete }: any) => {
    const [mode, setMode] = useState('topic');
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const handleGen = async () => {
        if(!input.trim()) return;
        setLoading(true);
        try {
            const prompt = mode === 'curriculum' 
                ? `Create Semester Plan. Root=Course. Children=Weeks(targetDate=YYYY-MM-DD). Grandchildren=Topics.`
                : `Create Mind Map. Root=Topic. Children=Subtopics.`;
            const data = await callGemini(`Input: "${input}"`, `${prompt} Output JSON: { "title": "...", "root": { "text": "...", "children": [] } }`);
            const hydrate = (n: any): any => ({ ...n, id: Math.random().toString(36).substr(2,9), isExpanded: true, children: n.children?.map(hydrate) });
            onComplete({ id: `doc-${Date.now()}`, title: data.title || input, type: mode==='topic'?'mindmap':'curriculum', uploadDate: new Date().toISOString(), lastModified: new Date().toISOString(), cards: [], tree: hydrate(data.root) });
            addToast({type:'success', message:'Project Generated'});
        } catch(e) { addToast({type:'error', message:'Gen Failed'}); }
        setLoading(false);
    };

    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative animate-in zoom-in-95 duration-200">
                {loading && <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10 rounded-2xl"><Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2"/><p className="font-bold text-slate-700">Synthesizing...</p></div>}
                <div className="flex justify-between mb-4"><h2 className="text-xl font-bold">New Project</h2><button onClick={onClose}><X className="w-5 h-5"/></button></div>
                <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                    <button onClick={() => setMode('topic')} className={`flex-1 py-2 text-sm font-bold rounded ${mode==='topic'?'bg-white shadow text-indigo-600':'text-slate-500'}`}>Mind Map</button>
                    <button onClick={() => setMode('curriculum')} className={`flex-1 py-2 text-sm font-bold rounded ${mode==='curriculum'?'bg-white shadow text-indigo-600':'text-slate-500'}`}>Timeline</button>
                </div>
                <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-24 border rounded-xl p-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Enter topic or curriculum text..."/>
                <button onClick={handleGen} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Generate</button>
            </div>
        </div>
    );
};

// --- APP CONTROLLER ---
export default function NeuroMapApp() {
    const [view, setView] = useState<'landing' | 'app'>('landing');
    const [docs, setDocs] = useState<DocumentData[]>(() => { try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); }catch(e){return [];} });
    const [userStats] = useState<UserStats>({ shields: 5, streak: 3, totalReviews: 142, archetype: 'Sprinter' });
    const [currentDoc, setCurrentDoc] = useState<DocumentData | null>(null);
    const [activeNode, setActiveNode] = useState<MindMapNode | null>(null);
    const [docView, setDocView] = useState<'map' | 'timeline'>('map');
    const [modal, setModal] = useState<'gen' | 'digest' | null>(null);
    const [showGame, setShowGame] = useState(false);
    const [gameSeed, setGameSeed] = useState<MindMapNode[]>([]);

    useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(docs)), [docs]);
    const updateDoc = (d: DocumentData) => { setCurrentDoc(d); setDocs(prev => prev.map(x => x.id === d.id ? d : x)); };

    const flattenNodes = (node: MindMapNode | null): MindMapNode[] => node ? [node, ...(node.children?.flatMap(flattenNodes) || [])] : [];
    const findParent = (node: MindMapNode, targetId: string): MindMapNode | null => {
        if (node.children?.some(c => c.id === targetId)) return node;
        for (const child of node.children || []) {
            const found = findParent(child, targetId);
            if (found) return found;
        }
        return null;
    };

    const openCauseCraft = (node: MindMapNode) => {
        if (!currentDoc) return;
        const parent = findParent(currentDoc.tree, node.id);
        const sibling = parent?.children?.find(c => c.id !== node.id);
        const flat = flattenNodes(currentDoc.tree).filter(n => n.type !== 'root');
        const fallback = flat.find(n => n.id !== node.id);
        const seeds = sibling ? [node, sibling] : fallback ? [node, fallback] : [node];
        setGameSeed(seeds);
        setShowGame(true);
    };

    if (view === 'landing') return <LandingPage onEnter={() => setView('app')} />;

    return (
        <ToastProvider>
            <div className="h-screen flex bg-slate-50 font-sans text-slate-900">
                {/* Sidebar */}
                <div className="w-20 bg-slate-900 flex flex-col items-center py-6 gap-6 shadow-xl z-20">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4"><Brain className="text-white w-7 h-7" /></div>
                    <button onClick={() => setCurrentDoc(null)} className={`p-3 rounded-xl ${!currentDoc ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}><Layout/></button>
                    <button onClick={() => setModal('digest')} className="p-3 text-slate-400 hover:text-white mt-auto" title="Parent Digest"><Mail/></button>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col h-full overflow-hidden">
                    {!currentDoc ? (
                        <div className="p-10 overflow-y-auto">
                            <header className="flex justify-between items-center mb-10">
                                <div><h1 className="text-4xl font-bold">Dashboard</h1><p className="text-slate-500">NeuroMap AI v4.0</p></div>
                                <button onClick={() => setModal('gen')} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl font-bold flex gap-3 hover:scale-105 transition-transform"><Sparkles/> New Project</button>
                            </header>

                            <div className="grid grid-cols-3 gap-6 mb-10">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><ShieldCheck className="w-8 h-8"/></div>
                                    <div><div className="text-2xl font-bold">{userStats.shields} Shields</div><div className="text-xs text-slate-500">Streak Protection</div></div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Target className="w-8 h-8"/></div>
                                    <div><div className="text-2xl font-bold">{userStats.archetype}</div><div className="text-xs text-slate-500">Learning Style</div></div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Activity className="w-8 h-8"/></div>
                                    <div><div className="text-2xl font-bold">{userStats.totalReviews}</div><div className="text-xs text-slate-500">Total Reviews</div></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {docs.map(d => (
                                    <div key={d.id} onClick={() => setCurrentDoc(d)} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl cursor-pointer hover:border-indigo-100 transition-all group">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${d.type==='curriculum'?'bg-purple-50 text-purple-600':'bg-indigo-50 text-indigo-600'}`}>{d.type==='curriculum'?<Calendar/>:<FileText/>}</div>
                                        <h3 className="text-xl font-bold mb-2">{d.title}</h3>
                                        <p className="text-slate-500 text-sm">Edited {new Date(d.lastModified).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setCurrentDoc(null)} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft/></button>
                                    <h2 className="font-bold">{currentDoc.title}</h2>
                                    {currentDoc.type === 'curriculum' && (
                                        <div className="flex bg-slate-100 p-1 rounded-lg ml-4">
                                            <button onClick={() => setDocView('map')} className={`px-3 py-1 text-xs font-bold rounded ${docView==='map'?'bg-white shadow':'text-slate-500'}`}>Map</button>
                                            <button onClick={() => setDocView('timeline')} className={`px-3 py-1 text-xs font-bold rounded ${docView==='timeline'?'bg-white shadow':'text-slate-500'}`}>Timeline</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-grow relative bg-slate-50 overflow-hidden">
                                {docView === 'map' ? <MindMapCanvas data={currentDoc.tree} onNodeClick={n=>n.type!=='root'&&setActiveNode(n)} onOpenGame={openCauseCraft}/>
                                : <TimelineView data={currentDoc.tree} onNodeClick={n=>n.type!=='root'&&setActiveNode(n)}/>}
                                
                                <div className={`absolute top-0 right-0 w-[480px] h-full bg-white shadow-2xl transition-transform duration-300 z-30 ${activeNode ? 'translate-x-0' : 'translate-x-full'}`}>
                                    {activeNode && (
                                        <NodeDetailPanel 
                                            node={activeNode} 
                                            cards={currentDoc.cards.filter(c => c.nodeId === activeNode?.id)}
                                            onAddCards={(cs:any) => updateDoc({...currentDoc, cards: [...currentDoc.cards, ...cs]})}
                                            onUpdateCard={(c:any) => updateDoc({...currentDoc, cards: currentDoc.cards.map(x=>x.id===c.id?c:x)})}
                                            onUpdateNode={(n:any) => {
                                                const traverse=(p:MindMapNode):MindMapNode=>p.id===n.id?n:{...p,children:p.children?.map(traverse)};
                                                updateDoc({...currentDoc, tree: traverse(currentDoc.tree)}); setActiveNode(n);
                                            }}
                                            onClose={() => setActiveNode(null)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <GeneratorModal isOpen={modal === 'gen'} onClose={() => setModal(null)} onComplete={(d:any) => { setDocs([d, ...docs]); setCurrentDoc(d); setModal(null); }} />
                {showGame && <CauseCraftGame nodes={gameSeed} callGemini={callGemini} onClose={() => setShowGame(false)} />}
            </div>
        </ToastProvider>
    );
}

