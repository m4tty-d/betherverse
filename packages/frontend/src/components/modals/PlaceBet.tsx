import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { useReadEventGetEventDetails } from "@/wagmi.gen";
import { PlaceBetForm } from "../PlaceBetForm";

export function PlaceBetModal({
  className,
  onOpenChange,
  eventAddress,
}: React.HTMLAttributes<HTMLElement> & {
  onOpenChange?: (isOpen: boolean) => void;
  eventAddress: `0x${string}`;
}) {
  const { data: eventDetails, isLoading } = useReadEventGetEventDetails({
    address: eventAddress,
  });

  console.log(eventDetails);

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("primary", className)}>Place Bet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Place Bet
          </DialogTitle>
          <DialogDescription>Place your bet on this event</DialogDescription>
          {isLoading ? (
            <div>Loading event details...</div>
          ) : eventDetails ? (
            <PlaceBetForm
              eventDetails={eventDetails}
              eventAddress={eventAddress}
            />
          ) : (
            <div>Failed to load event details</div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
