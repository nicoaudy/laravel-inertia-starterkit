import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  source: {
    to: any; // Replace with appropriate type
    current_page: number;
    last_page: number;
  };
  onPaginateChange: (page: number) => void;
  offset?: number;
}

const PaginationLinks: FC<PaginationProps> = ({ source, onPaginateChange, offset = 4 }) => {
  const pages: number[] | null = (() => {
    if (!source.to) {
      return null;
    }

    let from = source.current_page - offset;
    if (from < 1) {
      from = 1;
    }

    let to = from + offset * 2;
    if (to >= source.last_page) {
      to = source.last_page;
    }

    const pages: number[] = [];
    for (let page = from; page <= to; page++) {
      pages.push(page);
    }

    return pages;
  })();

  const paginate = (p: number) => {
    onPaginateChange(p);
  };

  return (
    <nav className='relative z-0 inline-flex'>
      {source.current_page > 1 && (
        <Button
          size='sm'
          variant='ghost'
          aria-label='Previous'
          onClick={(e) => {
            e.preventDefault();
            paginate(0);
          }}>
          <DoubleArrowLeftIcon />
        </Button>
      )}
      {source.current_page > 1 && (
        <Button
          size='sm'
          variant='ghost'
          aria-label='Previous'
          onClick={(e) => {
            e.preventDefault();
            paginate(source.current_page - 1);
          }}>
          <ChevronLeftIcon />
        </Button>
      )}
      {pages &&
        pages.map((page, index) => (
          <Button
            key={`pagination-link-${index}`}
            size='sm'
            variant={source.current_page === page ? 'secondary' : 'ghost'}
            onClick={(e) => {
              e.preventDefault();
              paginate(page);
            }}>
            {page}
          </Button>
        ))}
      {source.current_page < source.last_page && (
        <Button
          size='sm'
          variant='ghost'
          aria-label='Next'
          onClick={(e) => {
            e.preventDefault();
            paginate(source.current_page + 1);
          }}>
          <ChevronRightIcon />
        </Button>
      )}
      {source.current_page < source.last_page && (
        <Button
          variant='ghost'
          aria-label='Next'
          onClick={(e) => {
            e.preventDefault();
            paginate(source.last_page);
          }}>
          <DoubleArrowRightIcon />
        </Button>
      )}
    </nav>
  );
};

export default PaginationLinks;
