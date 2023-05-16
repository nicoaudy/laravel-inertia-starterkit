import { useState, useEffect, ChangeEvent } from 'react';
import { router } from '@inertiajs/react';
import { usePrevious } from 'react-use';
import { usePage } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';

interface Filters {
  search?: string;
  perPage?: string;
  page?: string;
}

type ChangeEventHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

const useFilterPagination = (): [Filters, React.Dispatch<React.SetStateAction<Filters>>, ChangeEventHandler] => {
  const { filters } = usePage().props;

  const [values, setValues] = useState<Filters>({
    search: filters.search || '',
    perPage: filters.perPage || '',
    page: filters.page || '',
  });

  const prevValues = usePrevious(values);

  const handleChange: ChangeEventHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    // Reset page to null when perPage was changed
    if (key === 'perPage') {
      setValues((values) => ({
        ...values,
        page: '',
      }));
    }

    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (prevValues) {
      const search = debounce(() => {
        let query = pickBy(values);
        router.get(route(route().current()), Object.keys(query).length ? query : {}, {
          replace: true,
          preserveState: true,
        });
      }, 150);
      search();
    }
  }, [values]);

  return [values, setValues, handleChange];
};

export default useFilterPagination;
