import { useEffect, useState } from "react";
import { DebateRoomCard } from "@/components/DebateRoomCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { listRoomsDiscussionNearby } from '../../services/RoomService'; // Removi a tipagem ListRooms pois a resposta é array direto
import { useParams } from "react-router-dom";
import { HttpClientSingleton } from "@/infra/HttpClientSingleton";


export const RoomsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams();

  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado essencial para o seu HTML

  useEffect(() => {
    const fetchRooms = async () => {
      if (!id) return;

      try {
        setIsLoading(true); // Inicia o carregamento

        // Chamada à API
        const response: any = await listRoomsDiscussionNearby(
          HttpClientSingleton.getInstance(),
          Number(id)
        );

        console.log("ROOMS RECEIVED", response);

        // CORREÇÃO CRÍTICA: O response É O ARRAY. Não existe response.rooms.
        if (Array.isArray(response) && response.length > 0) {

          const formattedRooms = response.map((room: any) => ({
            id: room.id,
            title: room.name, // API retorna 'name', Componente usa 'title'
            participants: room.capacity,
            distance: "500m",
            lastMessage: room.description || "Sem descrição"
          }));

          setRooms(formattedRooms);
        } else {
          console.log("Array vazio ou formato inválido");
        }

      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      } finally {
        setIsLoading(false); // Desliga o loading (sucesso ou erro)
      }
    };

    fetchRooms();
  }, [id]);

  // --- SEU BLOCO DE FILTRO E RENDERIZAÇÃO ---

  const filteredRooms = Array.isArray(rooms) ? rooms.filter((room) => {
    // 1. Segurança: Se a sala não tiver título, ignoramos ela para não quebrar
    if (!room || !room.title) return false;

    // 2. Agora é seguro rodar o toLowerCase
    return room.title.toLowerCase().includes(searchQuery.toLowerCase());
  }) : [];

  return (
    <div className="space-y-4">
      {/* Input de Busca */}
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
        {/* 3. Renderização condicional do Loading */}
        {isLoading ? (
          <p className="text-center text-muted-foreground py-8">Carregando salas...</p>
        ) : filteredRooms.length > 0 ? (
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