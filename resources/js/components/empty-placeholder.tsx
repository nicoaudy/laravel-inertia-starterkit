import { cn } from "@/lib/utils";
import { Ghost } from "@phosphor-icons/react";

export function EmptyPlaceholder({
  className,
  title,
  description,
}: {
  className?: string;
  title: string;
  description?: string;
}) {
  return (
    <div
      className={cn("flex h-[350px] shrink-0 items-center justify-center rounded-md border border-dashed", className)}>
      <div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>
        <Ghost size={32} />
        <h3 className='mt-4 text-lg font-semibold'>{title}</h3>
        <p className='mb-4 mt-2 text-sm text-muted-foreground'>{description}</p>
      </div>
    </div>
  );
}
