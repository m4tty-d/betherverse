import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type React from "react";

interface BetCardProps {
  title: string;
  options: string[];
  totalBets: number;
}

const BetCard: React.FC<BetCardProps> = ({ title, totalBets, options }) => {
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
              {totalBets.toString()} ETH bets
            </span>
          </div>
          <Button variant="secondary" className="text-black">
            Place Bet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetCard;
