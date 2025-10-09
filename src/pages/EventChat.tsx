import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
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

const mockEvents = {
  "1": {
    title: "Feira Orgânica do Bairro",
    date: "Sábado",
    time: "08:00",
    location: "Praça Central",
    distance: "500m",
    interested: 42,
    messages: [
      { id: 1, author: "Pedro A.", message: "Alguém vai levar as crianças?", time: "09:15", isOwn: false },
      { id: 2, author: "Laura M.", message: "Sim! Vai ter atividades para elas", time: "09:18", isOwn: false },
      { id: 3, author: "Bruno K.", message: "Que horas chegam lá?", time: "09:20", isOwn: false },
    ]
  },
  "4": {
    title: "Grupo de Leitura - Ficção Nacional",
    date: "Quinta",
    time: "18:30",
    location: "Biblioteca Pública",
    distance: "650m",
    interested: 15,
    messages: [
      { id: 1, author: "Camila R.", message: "Qual livro vamos discutir?", time: "16:30", isOwn: false },
      { id: 2, author: "Rafael T.", message: "Capitães da Areia, do Jorge Amado", time: "16:35", isOwn: false },
    ]
  },
};

export const EventChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nickname = localStorage.getItem("redondeza_nickname") || "Você";
  const isModerator = localStorage.getItem("redondeza_moderator") === "true";
  
  const event = mockEvents[id as keyof typeof mockEvents];
  const [messages, setMessages] = useState<Message[]>(event?.messages || []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!event) {
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
      <div className="bg-gradient-primary p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg text-primary-foreground flex-1">{event.title}</h1>
        </div>
        <div className="space-y-1 text-sm text-primary-foreground/90 ml-12">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{event.date} às {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location} • {event.distance}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{event.interested} interessados</span>
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
      <ChatInput onSendMessage={handleSendMessage} placeholder="Converse sobre o evento..." />
    </div>
  );
};
