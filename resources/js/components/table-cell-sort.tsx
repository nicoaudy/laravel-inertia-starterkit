import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface TableCellSortProps {
  title: string;
  sortBy: string;
  sortDir: "asc" | "desc" | undefined;
  currentSortBy: string | undefined;
  onSort: (sortBy: string) => void;
}

export function TableCellSort({ title, sortBy, sortDir, currentSortBy, onSort }: TableCellSortProps) {
  return (
    <Button
      aria-label={
        sortDir === "desc"
          ? `Sorted descending. Click to sort ascending.`
          : sortDir === "asc"
          ? `Sorted ascending. Click to sort descending.`
          : `Not sorted. Click to sort ascending.`
      }
      variant='ghost'
      className='-ml-3 h-8 data-[state=open]:bg-accent'
      onClick={() => onSort(sortBy)}>
      {title}
      {sortBy === currentSortBy ? (
        sortDir === "desc" ? (
          <ArrowDownIcon className='ml-2 h-4 w-4' aria-hidden='true' />
        ) : (
          <ArrowUpIcon className='ml-2 h-4 w-4' aria-hidden='true' />
        )
      ) : (
        <CaretSortIcon className='ml-2 h-4 w-4' aria-hidden='true' />
      )}
    </Button>
  );
}
