import { CurrencyEth } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Logo({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<div
			className={cn(
				"flex items-center text-base font-bold tracking-wider",
				className,
			)}
			{...props}
		>
			<CurrencyEth className="mr-2 font-bold" />
			betherverse
		</div>
	);
}
