import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  useReadBettingPlatform,
  useReadBettingPlatformEventCount,
  useReadBettingPlatformEvents,
  useReadEventQuestion,
} from "@/wagmi.gen";
import { useEffect } from "react";

export function EventList() {
  const { data: eventCount, isLoading: isEventCountLoading } =
    useReadBettingPlatformEventCount({
      address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    });

  const { data: event, isLoading: isEventsLoading } =
    useReadBettingPlatformEvents({
      args: [BigInt(eventCount ?? 0)],
    });

  // const { data: question } = useReadEventQuestion({
  //   address: event,
  // });

  if (isEventCountLoading || isEventsLoading) {
    return <div>Loading events...</div>;
  }

  return (
    <>
      <div>{eventCount?.toString()}</div>
      <div>{event?.toString()}</div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Betting Events</h2>
        {/* {events && events.length > 0 ? (
          events.map((event, index) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Deadline:{" "}
                  {new Date(Number(event.deadline) * 1000).toLocaleString()}
                </p>
                <p>Options: {event.options.join(", ")}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No events found.</p>
        )} */}
      </div>
    </>
  );
}
