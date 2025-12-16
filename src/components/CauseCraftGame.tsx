import { DragEvent, useMemo, useState } from 'react';
import { Plus, Shuffle, X } from 'lucide-react';
import { CausalNode, LinkType, MindMapNode } from '../types';

type GeminiCaller = (prompt: string, systemPrompt?: string, retries?: number) => Promise<any>;

const BUCKETS: { id: LinkType; label: string; color: string }[] = [
  { id: 'cause', label: 'A causes B', color: 'bg-rose-500' },
  { id: 'correlate', label: 'A correlates with B', color: 'bg-amber-500' },
  { id: 'spurious', label: 'A and B only seem linked', color: 'bg-slate-500' },
];

interface CauseCraftGameProps {
  nodes: MindMapNode[];
  callGemini: GeminiCaller;
  onClose: () => void;
}

export default function CauseCraftGame({ nodes, callGemini, onClose }: CauseCraftGameProps) {
  const [inventory, setInventory] = useState<CausalNode[]>([]);
  const [board, setBoard] = useState<CausalNode[]>([]);
  const [score, setScore] = useState(0);
  const [dragged, setDragged] = useState<CausalNode | null>(null);
  const [busy, setBusy] = useState(false);

  const availableSeeds = useMemo(() => nodes.filter(Boolean).slice(0, 10), [nodes]);

  const pullStarters = () => {
    if (availableSeeds.length < 2) return;
    const shuf = [...availableSeeds].sort(() => Math.random() - 0.5);
    const [a, b] = shuf;
    fuse(a, b);
  };

  const fuse = async (a: MindMapNode, b: MindMapNode) => {
    setBusy(true);
    const prompt = `You are a causal-reasoning engine.
We fuse two concepts into a third that links them causally, correlatively, or spuriously.
Return JSON only:
{
  "text": "short name",
  "emoji": "single emoji",
  "type": "cause" | "correlate" | "spurious",
  "explanation": "one sentence"
}`;
    const user = `Fuse "${a.text}" + "${b.text}"`;
    try {
      const res = await callGemini(user, prompt);
      if (res?.text && res?.emoji && res?.type) {
        const fused: CausalNode = {
          id: `fuse-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          text: res.text,
          emoji: res.emoji,
          type: res.type,
          parents: [a.id, b.id],
        };
        setInventory((inv) => [fused, ...inv]);
      }
    } finally {
      setBusy(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, bucket: LinkType) => {
    e.preventDefault();
    if (!dragged) return;
    if (dragged.type === bucket) {
      setScore((s) => s + 10);
      setBoard((b) => [dragged, ...b]);
    } else {
      setScore((s) => Math.max(0, s - 5));
    }
    setInventory((inv) => inv.filter((n) => n.id !== dragged.id));
    setDragged(null);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[700px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shuffle className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold">CauseCraft Game</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">Score: {score}</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg"
              aria-label="Close CauseCraft"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inventory */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-4">
          <button
            onClick={pullStarters}
            disabled={busy || availableSeeds.length < 2}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Fuse Random
          </button>
          <div className="flex gap-2 overflow-x-auto">
            {inventory.map((n) => (
              <div
                key={n.id}
                draggable
                onDragStart={() => setDragged(n)}
                className="px-3 py-2 bg-slate-100 rounded-lg cursor-move flex items-center gap-2 whitespace-nowrap"
              >
                <span className="text-xl" aria-hidden>{n.emoji}</span>
                <span className="text-sm font-semibold">{n.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buckets */}
        <div className="flex-1 grid grid-cols-3 gap-4 p-6">
          {BUCKETS.map((b) => (
            <div
              key={b.id!}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, b.id)}
              className={`${b.color} bg-opacity-20 border-2 border-dashed border-opacity-50 rounded-2xl flex flex-col items-center justify-center p-4 transition-all hover:bg-opacity-30`}
            >
              <div className={`${b.color} text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                {b.label}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {board
                  .filter((n) => n.type === b.id)
                  .map((n) => (
                    <div key={n.id} className="bg-white rounded-lg px-3 py-2 shadow flex items-center gap-2">
                      <span className="text-lg" aria-hidden>{n.emoji}</span>
                      <span className="text-xs">{n.text}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="p-3 text-center text-slate-500 text-xs border-t border-slate-200">
          Drag a new block into the bucket that best describes how the two original ideas are linked.
        </div>
      </div>
    </div>
  );
}
