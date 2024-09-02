import { EventList } from "@/components/EventList";
import { CreateEventModal } from "@/components/modals/CreateEventModal";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  console.log("env", import.meta.env);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest Betting Events</h2>
        <CreateEventModal />
      </div>
      <EventList />
    </div>
  );
}
