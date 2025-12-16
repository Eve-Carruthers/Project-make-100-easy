export type NodeType = 'root' | 'topic' | 'subtopic' | 'week';

export type LinkType = 'cause' | 'correlate' | 'spurious' | null;

export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  userAnswer?: number;
}

export interface MindMapNode {
  id: string;
  text: string;
  type: NodeType;
  children?: MindMapNode[];
  bloomLevel?: number;
  targetDate?: string;
  quiz?: QuizItem[];
  quizScore?: number;
  isExpanded?: boolean;
}

export interface RevisionCard {
  id: string;
  nodeId: string;
  front: string;
  back: string;
  audioNote?: string;
  sm2Data: {
    interval: number;
    easeFactor: number;
    step: number;
    nextReview: string;
    lastReviewed?: string;
  };
}

export interface DocumentData {
  id: string;
  title: string;
  type: 'mindmap' | 'curriculum';
  uploadDate: string;
  lastModified: string;
  tree: MindMapNode;
  cards: RevisionCard[];
}

export interface UserStats {
  shields: number;
  streak: number;
  totalReviews: number;
  archetype: 'Sprinter' | 'Steady' | 'Struggler';
}

export interface CausalNode {
  id: string;
  text: string;
  type: 'cause' | 'effect' | 'correlate' | 'spurious';
  emoji: string;
  parents: [string, string];
}
