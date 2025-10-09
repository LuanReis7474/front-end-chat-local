import { DebateRoomCard } from "@/components/DebateRoomCard";

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
  return (
    <div className="space-y-3">
      {debateRooms.map((room) => (
        <DebateRoomCard 
          key={room.id}
          id={room.id}
          title={room.title}
          participants={room.participants}
          distance={room.distance}
          lastMessage={room.lastMessage}
        />
      ))}
    </div>
  );
};
