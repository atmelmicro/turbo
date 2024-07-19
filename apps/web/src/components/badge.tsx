import { Badge, Tooltip } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";
import type { Next } from "@/backend/auth";

export function StatusBadge({
  status,
  className,
}: {
  status?: Next;
  className?: string;
}) {
  if (status?.error)
    return (
      <Tooltip content={status.error}>
        <Badge className={twMerge("max-w-[10rem]", className)} color="red">
          <div className="overflow-hidden text-ellipsis">{status.error}</div>
        </Badge>
      </Tooltip>
    );
  if (status?.message)
    return (
      <Tooltip content={status.message}>
        <Badge className={twMerge("max-w-[10rem]", className)} color="green">
          <div className="overflow-hidden text-ellipsis">{status.message}</div>
        </Badge>
      </Tooltip>
    );
  return null;
}
