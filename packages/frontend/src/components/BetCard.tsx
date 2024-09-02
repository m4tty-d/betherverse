import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type React from "react";
import { PlaceBetModal } from "./modals/PlaceBet";

interface BetCardProps {
  title: string;
  eventAddress: `0x${string}`;
  options: string[];
  totalBets: number;
}

const BetCard: React.FC<BetCardProps> = ({
  title,
  totalBets,
  options,
  eventAddress,
}) => {
  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold h-16">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {options.map((option) => (
            <div className="flex items-center justify-between" key={option}>
              <span className="text-sm text-muted-foreground">{option}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <div className="mr-auto">
            <span className="text-sm text-muted-foreground">
              {(Number(totalBets) / 1e18).toFixed(2)} ETH bets
            </span>
          </div>
          <PlaceBetModal eventAddress={eventAddress} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BetCard;
