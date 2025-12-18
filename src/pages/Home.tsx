import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import { EventCarousel } from "@/components/home/EventCarousel";
import { RoomsList } from "../components/home/DebateRoomsList";
// import { FloatingRewardButton } from "@/components/RewardWheel";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, User } from "lucide-react"; // Adicionei User para o caso logado
// import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// Remova o .ts do final do import
import { getAddressFromCoordinates } from "../services/AdressService";

interface HomeProps {
  nickname: string;
}

export const Home = ({ nickname }: HomeProps) => {
  const navigate = useNavigate();
  const [currentCity, setCurrentCity] = useState<string>("Localizando...");


  const [userLogged, setUserLogged] = useState<boolean>(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  useEffect(() => {
    if (userLogged) {

    }


  }, []);

  const goOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-center text-sm font-medium">
        <span className="bg-white text-indigo-600 py-0.5 px-2 rounded text-xs font-bold uppercase mr-3">
          BETA
        </span>
        <span>Estamos em fase de testes. <a href="#" className="underline hover:text-indigo-200">Dê seu feedback!</a></span>
      </div>

      {/* Header */}
      <div className="bg-gradient-primary p-6 pb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary-foreground">
              Olá, {nickname || "Visitante"}! 👋
            </h1>
            <p className="text-primary-foreground/90 mt-1 flex items-center gap-1">
              Veja o que está acontecendo ao seu redor
            </p>
          </div>

          {!userLogged ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="bg-white/25 hover:bg-white/40 text-white rounded-full flex items-center gap-2 px-6 transition-all"
              >
                <LogIn className="h-4 w-4" />
                <span className="font-bold">Logar</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/create-account")}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Criar Conta
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/create-room")}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Criar Sala
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => goOut()}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Sair
              </Button>



            </>
          )}
        </div>
      </div>

      {/* Resto do componente igual... */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-card rounded-2xl shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-lg">Eventos em Destaque</h2>
          {/*<EventCarousel />*/}
        </div>
      </div>

      <div className="px-6">
        <Tabs defaultValue="debates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="debates">Salas de Debate</TabsTrigger>
            <TabsTrigger value="events">Eventos Próximos</TabsTrigger>
          </TabsList>

          <TabsContent value="debates" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Conversas ativas</h3>
              <RoomsList />
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Próximos eventos</h3>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};