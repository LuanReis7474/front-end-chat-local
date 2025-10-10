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
  {
    id: 4,
    title: "Aula de Yoga ao Ar Livre",
    date: "Quinta",
    time: "07:00",
    location: "Jardim Botânico",
    distance: "1.5km",
    interested: 35,
  },
  {
    id: 5,
    title: "Festival Gastronômico",
    date: "Sábado",
    time: "17:00",
    location: "Rua das Flores",
    distance: "600m",
    interested: 89,
  },
  {
    id: 6,
    title: "Cinema na Praça",
    date: "Sexta",
    time: "20:00",
    location: "Praça do Sol",
    distance: "900m",
    interested: 54,
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
