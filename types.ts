export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  url: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}