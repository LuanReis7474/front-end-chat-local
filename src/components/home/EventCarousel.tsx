/*import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EventCard } from "@/components/EventCard";
import { useEffect, useState } from "react";
//import { listRoomsEventsNearby } from "@/services/RoomService";
import { useParams } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  interested: number;
}


export const EventCarousel = () => {
  const { id } = useParams();
  const [featuredEvents, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (id) {
        try {
         // const msg = await listRoomsEventsNearby(Number(id));

        //  const apiData = msg?.data?.rooms || [];

          const events = apiData
            .map((room: any) => ({
              id: room.id,
              title: room.name,
              interested: room.capacity,
              distance: "500m",
              location: room.description || "Sem descrição"
            }))
            .sort((a: any, b: any) => b.interested - a.interested)
            .slice(0, 4);

          setEvents(events);

        } catch (error) {
          console.error("Erro ao buscar salas:", error);
        }
      }
    };

    fetchRooms();
  }, []);

  return (
    featuredEvents ? <Carousel className="w-full" opts={{ align: "start", loop: true }}>
      <CarouselContent className="-ml-4">
        {featuredEvents.map((event) => (
          <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <EventCard {...event} featured />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel> : <></>
  );
};*/
