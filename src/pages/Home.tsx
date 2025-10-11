import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCarousel } from "@/components/home/EventCarousel";
import { EventsList } from "@/components/home/EventsList";
import { DebateRoomsList } from "@/components/home/DebateRoomsList";
import { FloatingRewardButton } from "@/components/RewardWheel";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

interface HomeProps {
  nickname: string;
}

export const Home = ({ nickname }: HomeProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 pb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary-foreground">
              Olá, {nickname}! 👋
            </h1>
            <p className="text-primary-foreground/90 mt-1">
              Veja o que está acontecendo ao seu redor
            </p>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => toast.info("Funcionalidade de criar conta em breve!")}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Criar Conta
          </Button>
        </div>
      </div>

      {/* Featured Events Carousel */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-card rounded-2xl shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-lg">Eventos em Destaque</h2>
          <EventCarousel />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="px-6">
        <Tabs defaultValue="debates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="debates">Salas de Debate</TabsTrigger>
            <TabsTrigger value="events">Eventos Próximos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="debates" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Conversas ativas</h3>
              <p className="text-sm text-muted-foreground">
                Participe das discussões na sua região
              </p>
            </div>
            <DebateRoomsList />
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Próximos eventos</h3>
              <p className="text-sm text-muted-foreground">
                Descubra o que vai rolar perto de você
              </p>
            </div>
            <EventsList />
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Reward Button */}
      <FloatingRewardButton />
    </div>
  );
};
