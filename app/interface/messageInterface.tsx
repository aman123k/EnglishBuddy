export interface Message {
  _id?: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
  conversationId?: string;
  translatedContent?: string;
  conversationMode?: string;
}

export interface UtilitySidebarProps {
  isOpen?: boolean;
  title: string;
  yourWords?: string;
  translatedWords?: string;
  description?: string;
}
