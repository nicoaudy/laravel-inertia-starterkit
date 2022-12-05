import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePrevious } from 'react-use';
import { usePage } from '@inertiajs/inertia-react';
import { debounce, pickBy } from 'lodash';

const useFilterPagination = () => {
  const { filters } = usePage().props;

  const [values, setValues] = useState({
    search: filters.search || '',
    perPage: filters.perPage || '',
    page: filters.page || '',
  });

  const prevValues = usePrevious(values);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    // Reset if page to null when perPage was changed
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
  }

  useEffect(() => {
    if (prevValues) {
      const search = debounce(() => {
        let query = pickBy(values);
        Inertia.get(
          route(route().current()),
          Object.keys(query).length ? query : {},
          {
            replace: true,
            preserveState: true,
          }
        );
      }, 150);
      search();
    }
  }, [values]);

  return [values, setValues, handleChange];
};

export default useFilterPagination;
