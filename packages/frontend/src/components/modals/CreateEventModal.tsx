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
import { CreateEventForm } from "../CreateEventForm";

export function CreateEventModal({
  className,
  onOpenChange,
}: React.HTMLAttributes<HTMLElement> & {
  onOpenChange?: (isOpen: boolean) => void;
}) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("primary", className)}>Create Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Create Event
          </DialogTitle>
          <DialogDescription>Create a new betting event</DialogDescription>
        </DialogHeader>
        <CreateEventForm />
      </DialogContent>
    </Dialog>
  );
}
