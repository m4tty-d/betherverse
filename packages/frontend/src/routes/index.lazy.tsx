import { CreateEventForm } from "@/components/CreateEventForm";
import { EventList } from "@/components/EventList";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Betherverse</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
          <CreateEventForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Current Events</h2>
          <EventList />
        </div>
      </div>
    </div>
  );
}
