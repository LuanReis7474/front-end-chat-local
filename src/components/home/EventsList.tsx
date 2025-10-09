import { EventCard } from "@/components/EventCard";

const upcomingEvents = [
  {
    id: 4,
    title: "Grupo de Leitura - Ficção Nacional",
    date: "Quinta",
    time: "18:30",
    location: "Biblioteca Pública",
    distance: "650m",
    interested: 15,
  },
  {
    id: 5,
    title: "Aula de Yoga no Parque",
    date: "Terça e Quinta",
    time: "07:00",
    location: "Parque das Flores",
    distance: "900m",
    interested: 23,
  },
  {
    id: 6,
    title: "Bazar de Trocas",
    date: "Sábado",
    time: "14:00",
    location: "Centro Comunitário",
    distance: "400m",
    interested: 31,
  },
  {
    id: 7,
    title: "Oficina de Jardinagem Urbana",
    date: "Domingo",
    time: "10:00",
    location: "Horta Comunitária",
    distance: "1.1km",
    interested: 19,
  },
];

export const EventsList = () => {
  return (
    <div className="space-y-3">
      {upcomingEvents.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
