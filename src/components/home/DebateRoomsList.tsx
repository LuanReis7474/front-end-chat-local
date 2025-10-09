import { useState } from "react";
import { DebateRoomCard } from "@/components/DebateRoomCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const debateRooms = [
  {
    id: 1,
    title: "Novidades na feira do bairro",
    participants: 12,
    distance: "500m",
    lastMessage: "Alguém sabe se terá frutas orgânicas?",
  },
  {
    id: 2,
    title: "Problemas com iluminação pública",
    participants: 8,
    distance: "300m",
    lastMessage: "Vou entrar em contato com a prefeitura",
  },
  {
    id: 3,
    title: "Organização da corrida comunitária",
    participants: 15,
    distance: "1.2km",
    lastMessage: "Precisamos de voluntários para água",
  },
  {
    id: 4,
    title: "Adoção responsável de pets",
    participants: 24,
    distance: "800m",
    lastMessage: "Tem foto dos gatinhos disponíveis?",
  },
  {
    id: 5,
    title: "Trânsito na Av. Principal",
    participants: 6,
    distance: "450m",
    lastMessage: "Está engarrafado desde as 8h",
  },
];

export const DebateRoomsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = debateRooms.filter((room) =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar salas por tema..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="space-y-3">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <DebateRoomCard 
              key={room.id}
              id={room.id}
              title={room.title}
              participants={room.participants}
              distance={room.distance}
              lastMessage={room.lastMessage}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Nenhuma sala encontrada
          </p>
        )}
      </div>
    </div>
  );
};
