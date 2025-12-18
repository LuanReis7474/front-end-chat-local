import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { toast } from "sonner";
import { useUserRole } from "@/hooks/useUserRole";
import { jwtDecode } from "jwt-decode";
import { handleEnterRoom } from "@/services/RoomService";
import { io, Socket } from "socket.io-client";

interface Message {
  id: number;
  author: string;
  message: string;
  time: string;
  isOwn: boolean;
  isModeratorMessage?: boolean;
}

interface TokenPayload {
  sub: string;
  email: string;
  name?: string;
  exp: number;
}

const SOCKET_URL = "http://localhost:3000";

export const DebateChat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const socketRef = useRef<Socket | null>(null);

  const nickname = localStorage.getItem("redondeza_nickname") || "Você";
  const { isModerator } = useUserRole();


  const [messages, setMessages] = useState<Message[]>([]);
  const [datasUser, setDatasUser] = useState<TokenPayload | null>(null);
  const [participantsCount, setParticipantsCount] = useState(0);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && id) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setDatasUser(decoded);

        handleEnterRoom(Number(id), Number(decoded.sub))
          .then((res) => {

          })
          .catch(console.error);


        const newSocket = io(SOCKET_URL);
        socketRef.current = newSocket;

        // Entra no canal da sala
        newSocket.emit("join_room_channel", { roomId: Number(id) });

        // --- LISTENERS (Ouvintes) ---

        // Quando receber uma NOVA MENSAGEM do servidor
        newSocket.on("new_message", (payload: any) => {
          // Mapeia o dado do Back para o formato do Front
          const incomingMsg: Message = {
            id: payload.id,
            message: payload.content,
            time: payload.time,
            // Lógica simples: Se o ID do remetente for igual ao meu token, sou eu.
            isOwn: payload.senderId === Number(decoded.sub),
            author: payload.senderId === Number(decoded.sub) ? "Você" : `Usuário ${payload.senderId}`,
            isModeratorMessage: false
          };

          setMessages((prev) => [...prev, incomingMsg]);
        });

        // Quando alguém entra na sala (Atualiza contador)
        newSocket.on("participant_joined", (data: any) => {
          if (data.count) setParticipantsCount(data.count);
          // Opcional: Mostrar toast "Fulano entrou"
        });

      } catch (error) {
        console.error("Erro ao iniciar chat", error);
      }
    }

    // Cleanup: Desconecta ao sair da tela
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [id]);

  // 2. Scroll Automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // 3. Função de Enviar (Agora via Socket)
  const handleSendMessage = (messageContent: string) => {
    if (!socketRef.current || !datasUser || !id) return;

    // EMITIR evento para o backend
    socketRef.current.emit("send_message", {
      content: messageContent,
      senderId: Number(datasUser.sub),
      roomId: Number(id)
    });

    // IMPORTANTE: Não fazemos setMessages([...]) aqui!
    // Esperamos o evento "new_message" voltar do servidor (no useEffect acima)
    // Isso garante que a mensagem foi salva no banco antes de aparecer.
  };

  const handleDeleteMessage = (messageId: number) => {
    // Para deletar, idealmente você emitiria um evento socket também
    setMessages(messages.filter(msg => msg.id !== messageId));
    toast.success("Mensagem deletada localmente");
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
          <h1 className="font-semibold text-lg text-primary-foreground">
            Chat da Sala {id}
          </h1>
          <div className="flex items-center gap-1 text-sm text-primary-foreground/80">
            <Users className="h-4 w-4" />
            <span>{participantsCount > 0 ? participantsCount : "..."} participantes</span>
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
            isModeratorMessage={msg.isModeratorMessage}
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