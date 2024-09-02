import { useWriteEventPlaceBet } from "@/wagmi.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

const formSchema = z.object({
  option: z.string().min(1, "Option is required"),
  amount: z.string().min(1, "Amount is required"),
});

type EventDetails = {
  creator: `0x${string}`;
  question: string;
  options: readonly string[];
  deadline: bigint;
  platformFee: bigint;
  totalBets: bigint;
  outcomePublished: boolean;
  winningOption: bigint;
};

export function PlaceBetForm({
  eventDetails,
  eventAddress,
}: {
  eventDetails: EventDetails;
  eventAddress: `0x${string}`;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      option: "",
      amount: "",
    },
  });

  const { writeContractAsync: placeBet } = useWriteEventPlaceBet();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const optionIndex = eventDetails.options.findIndex(
      (option) => option === values.option,
    );
    if (optionIndex === -1) {
      console.error("Invalid option selected");
      return;
    }
    placeBet({
      address: eventAddress,
      args: [BigInt(optionIndex)],
      value: parseEther(values.amount),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="option"
          render={({ field }) => (
            <FormItem className="space-y-3 mt-4">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {eventDetails.options.map((option) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={option}
                    >
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bet Amount (ETH)</FormLabel>
              <FormControl>
                <Input placeholder="0.1" {...field} />
              </FormControl>
              <FormDescription>
                Enter the amount of ETH you want to bet
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Place Bet</Button>
      </form>
    </Form>
  );
}
