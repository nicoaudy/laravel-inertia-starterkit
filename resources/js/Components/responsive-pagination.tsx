import React from 'react';
import useFilterPagination from '@/hooks/useFilterPagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import PaginationLinks from '@/Components/pagination-links';

interface ResponsivePaginationProps {
  source: {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: { active: boolean; label: string; url: string | null }[];
  };
}

const ResponsivePagination: React.FC<ResponsivePaginationProps> = ({ source }) => {
  const [form, setForm] = useFilterPagination();

  return (
    <div className='md:flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8'>
      <div className='flex-1 whitespace-nowrap text-sm'>
        Showing <span className='font-medium'>{source.from} </span>
        to <span className='font-medium'>{source.to} </span>
        of <span className='font-medium'>{source.total} </span>
        results
      </div>
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
        <div className='flex items-center space-x-2'>
          <p className='whitespace-nowrap text-sm font-medium'>Per page</p>
          <Select value={form.perPage} onValueChange={(value) => setForm({ ...form, perPage: value })}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder='100' />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <PaginationLinks source={source} onPaginateChange={(value) => setForm({ ...form, page: value.toString() })} />
      </div>
    </div>
  );
};

export default ResponsivePagination;
