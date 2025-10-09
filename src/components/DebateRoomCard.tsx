import { MessageCircle, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DebateRoomCardProps {
  title: string;
  participants: number;
  distance: string;
  lastMessage?: string;
  onClick?: () => void;
}

export const DebateRoomCard = ({
  title,
  participants,
  distance,
  lastMessage,
  onClick,
}: DebateRoomCardProps) => {
  return (
    <Card
      className="cursor-pointer transition-all hover:scale-[1.01] hover:shadow-card"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold leading-tight">{title}</h3>
            {lastMessage && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {lastMessage}
              </p>
            )}
          </div>
          <MessageCircle className="h-5 w-5 text-primary shrink-0" />
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{distance}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
