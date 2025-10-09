import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EventCard } from "@/components/EventCard";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  interested: number;
}

const featuredEvents: Event[] = [
  {
    id: 1,
    title: "Feira Orgânica do Bairro",
    date: "Sábado",
    time: "08:00",
    location: "Praça Central",
    distance: "500m",
    interested: 42,
  },
  {
    id: 2,
    title: "Corrida Comunitária",
    date: "Domingo",
    time: "06:30",
    location: "Parque Municipal",
    distance: "1.2km",
    interested: 28,
  },
  {
    id: 3,
    title: "Show de Talentos Locais",
    date: "Sexta",
    time: "19:00",
    location: "Centro Cultural",
    distance: "800m",
    interested: 67,
  },
];

export const EventCarousel = () => {
  return (
    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
      <CarouselContent className="-ml-4">
        {featuredEvents.map((event) => (
          <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <EventCard {...event} featured />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};
