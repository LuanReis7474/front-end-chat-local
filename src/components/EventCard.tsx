import { Calendar, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  interested: number;
  featured?: boolean;
}

export const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  distance,
  interested,
  featured = false,
}: EventCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-[1.02] hover:shadow-card ${
        featured ? "bg-gradient-card border-primary/20" : ""
      }`}
      onClick={() => navigate(`/event/${id}`)}
    >
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg leading-tight flex-1">{title}</h3>
          {featured && (
            <Badge variant="default" className="shrink-0">
              Destaque
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{date} às {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location} • {distance}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t">
          <Users className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-secondary">
            {interested} {interested === 1 ? "pessoa interessada" : "pessoas interessadas"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
