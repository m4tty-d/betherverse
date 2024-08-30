import { useReadCounterNumber, useWriteCounterIncrement } from "@/wagmi.gen";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export function Counter() {
  const { data: count, refetch } = useReadCounterNumber({
    address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
  });
  const { writeContractAsync: increment, isPending: isIncrementing } =
    useWriteCounterIncrement();

  const handleIncrement = async () => {
    await increment({
      address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
    });
    await refetch();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Counter</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-4">Count: {count?.toString()}</p>
        <Button onClick={handleIncrement} disabled={isIncrementing}>
          {isIncrementing ? "Incrementing..." : "Increment"}
        </Button>
      </CardContent>
    </Card>
  );
}
