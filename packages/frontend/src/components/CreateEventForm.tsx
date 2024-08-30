import { useWriteBettingPlatformCreateEvent } from "@/wagmi.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z.string(),
  deadline: z.string().min(1, "Deadline is required"),
});

export function CreateEventForm() {
  const [options, setOptions] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: "",
      deadline: "",
    },
  });

  const { writeContractAsync: createEvent, isPending } =
    useWriteBettingPlatformCreateEvent();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const deadline = Math.floor(new Date(values.deadline).getTime() / 1000);
    try {
      await createEvent({
        address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
        args: [values.question, options, BigInt(deadline)],
      });
      form.reset();
      setOptions([]);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const addOption = () => {
    const newOption = form.getValues("options");
    if (newOption) {
      setOptions([...options, newOption]);
      form.setValue("options", "");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Enter the event question" {...field} />
              </FormControl>
              <FormDescription>
                This is the main question for the betting event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Options</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input
                    placeholder="Enter an option"
                    {...field}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addOption();
                      }
                    }}
                  />
                </FormControl>
                <Button type="button" onClick={addOption}>
                  Add Option
                </Button>
              </div>
              <FormDescription>
                Add options for the betting event. Press Enter or click "Add
                Option" to add multiple options.
              </FormDescription>
              <FormMessage />
              {options.length > 0 && (
                <div className="mt-2">
                  <strong>Current options:</strong>
                  <ul className="list-disc list-inside">
                    {options.map((option, index) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                Set the deadline for the betting event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </Form>
  );
}
