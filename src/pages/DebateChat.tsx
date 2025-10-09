import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { toast } from "sonner";

interface Message {
  id: number;
  author: string;
  message: string;
  time: string;
  isOwn: boolean;
}

const mockDebateRooms = {
  "1": {
    title: "Novidades na feira do bairro",
    participants: 12,
    messages: [
      { id: 1, author: "Maria S.", message: "Alguém sabe se terá frutas orgânicas?", time: "14:23", isOwn: false },
      { id: 2, author: "João P.", message: "Sim! Confirmaram verduras e frutas orgânicas", time: "14:25", isOwn: false },
      { id: 3, author: "Ana L.", message: "Ótimo! Vou levar sacolas reutilizáveis", time: "14:27", isOwn: false },
    ]
  },
  "2": {
    title: "Problemas com iluminação pública",
    participants: 8,
    messages: [
      { id: 1, author: "Carlos M.", message: "A Rua das Flores está sem luz há 3 dias", time: "10:15", isOwn: false },
      { id: 2, author: "Rita S.", message: "Vou entrar em contato com a prefeitura", time: "10:20", isOwn: false },
    ]
  },
};

export const DebateChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nickname = localStorage.getItem("redondeza_nickname") || "Você";
  const isModerator = localStorage.getItem("redondeza_moderator") === "true";
  
  const room = mockDebateRooms[id as keyof typeof mockDebateRooms];
  const [messages, setMessages] = useState<Message[]>(room?.messages || []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!room) {
    return null;
  }

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      author: nickname,
      message,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
    toast.success("Mensagem enviada!");
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    toast.success("Mensagem deletada");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-lg text-primary-foreground">{room.title}</h1>
          <div className="flex items-center gap-1 text-sm text-primary-foreground/80">
            <Users className="h-4 w-4" />
            <span>{room.participants} participantes</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            id={msg.id}
            author={msg.author}
            message={msg.message}
            time={msg.time}
            isOwn={msg.isOwn}
            isModerator={isModerator}
            onDelete={handleDeleteMessage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
