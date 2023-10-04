import { useState, useEffect, ChangeEvent } from "react";
import { usePrevious } from "react-use";
import { usePage, router } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";

interface Filters {
  search?: string;
  perPage?: string;
  page?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc" | undefined;
}

type ChangeEventHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

const useFilterPagination = (): [Filters, React.Dispatch<React.SetStateAction<Filters>>, ChangeEventHandler] => {
  const props = usePage().props;
  const filters = props.filters as Filters;

  const [values, setValues] = useState<Filters>({
    search: filters.search || "",
    perPage: filters.perPage || "100",
    page: filters.page || "",
    sortBy: filters.sortBy || "",
    sortDir: filters.sortDir,
  });

  const prevValues = usePrevious(values);

  const handleChange: ChangeEventHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    // Reset page to null when perPage was changed
    if (key === "perPage") {
      setValues((values) => ({
        ...values,
        page: "",
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

        // @ts-ignore
        const url = route(route().current());
        router.get(url, Object.keys(query).length ? query : {}, {
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
