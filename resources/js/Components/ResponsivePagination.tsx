import React from 'react';
import useFilterPagination from '@/hooks/useFilterPagination';
import Pagination from '@/Components/Pagination';

interface PaginationFilters {
  page?: number;
  search?: string;
  perPage?: string;
}

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
  const [_, setForm] = useFilterPagination();

  const handlePreviousPage = () => {
    // @ts-ignore
    setForm((prevForm: PaginationFilters) => ({
      ...prevForm,
      page: ((prevForm.page || 1) as number) - 1,
    }));
  };

  const handleNextPage = () => {
    // @ts-ignore
    setForm((prevForm: PaginationFilters) => ({
      ...prevForm,
      page: ((prevForm.page || 1) as number) + 1,
    }));
  };

  return (
    <>
      <div className='mt-2 px-2 py-3 flex items-center justify-between border-t border-gray-200'>
        <div className='flex-1 flex justify-between sm:hidden'>
          <button className='btn-pagination' disabled={source.current_page <= 1} onClick={handlePreviousPage}>
            Previous
          </button>
          <button
            className='btn-pagination'
            disabled={source.current_page >= source.last_page}
            onClick={handleNextPage}>
            Next
          </button>
        </div>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm leading-5 text-gray-700'>
              Showing <span className='font-medium'>{source.from} </span>
              to <span className='font-medium'>{source.to} </span>
              of <span className='font-medium'>{source.total} </span>
              results
            </p>
          </div>
          <div>
            <Pagination links={source.links} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsivePagination;
