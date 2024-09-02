import {
  eventAbi,
  useReadBettingPlatformEventCount,
  useReadBettingPlatformGetLatestEvents,
} from "@/wagmi.gen";
import { useReadContracts } from "wagmi";
import BetCard from "./BetCard";

const EVENTS_TO_SHOW = 12;

export function EventList() {
  const { data: eventCount, isLoading: isEventCountLoading } =
    useReadBettingPlatformEventCount({
      address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    });

  const startIndex = eventCount
    ? Math.max(1, Number(eventCount) - EVENTS_TO_SHOW + 1)
    : 1;
  const endIndex = eventCount ? Number(eventCount) : 0;

  const { data: eventAddresses } = useReadBettingPlatformGetLatestEvents({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    args: [BigInt(startIndex), BigInt(endIndex)],
  });

  const eventDetailsConfig =
    eventAddresses?.map((address) => ({
      address,
      abi: eventAbi,
      functionName: "getEventDetails",
    })) ?? [];

  const { data: allEventDetails, isLoading: isEventDetailsLoading } =
    useReadContracts({
      contracts: eventDetailsConfig,
    });
  console.log("allEventDetails", allEventDetails);

  if (isEventCountLoading || isEventDetailsLoading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {allEventDetails?.map((eventDetails, index) => (
        <BetCard
          key={eventDetails.result?.question}
          title={eventDetails.result?.question!}
          totalBets={eventDetails.result?.totalBets}
          options={eventDetails.result?.options}
          eventAddress={eventAddresses?.[index] as `0x${string}`}
        />
      ))}
    </div>
  );
}
