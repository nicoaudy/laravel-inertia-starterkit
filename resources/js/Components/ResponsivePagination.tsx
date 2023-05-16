import useFilterPagination from '@/hooks/useFilterPagination';
import Pagination from '@/Components/Pagination';

const ResponsivePagination = ({ source }) => {
  const [, setForm] = useFilterPagination();

  return (
    <>
      <div className="mt-2 px-2 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            className="btn-pagination"
            disabled={source.current_page <= 1}
            onClick={() =>
              setForm((values) => ({ ...values, page: source.current_page - 1 }))
            }
          >
            Previous
          </button>
          <button
            className="btn-pagination"
            disabled={source.current_page >= source.last_page}
            onClick={() =>
              setForm((values) => ({ ...values, page: source.current_page + 1 }))
            }
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm leading-5 text-gray-700">
              Showing <span className="font-medium">{source.from} </span>
              to <span className="font-medium">{source.to} </span>
              of <span className="font-medium">{source.total} </span>
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
