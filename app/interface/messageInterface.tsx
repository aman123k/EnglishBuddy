export interface Message {
  id?: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  conversationId?: string;
  translatedContent?: string;
}

export interface UtilitySidebarProps {
  isOpen?: boolean;
  title: string;
  yourWords?: string;
  translatedWords?: string;
  description?: string;
}
