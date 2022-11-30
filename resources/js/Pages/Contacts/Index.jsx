import { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { debounce, pickBy } from 'lodash';
import { usePrevious } from 'react-use';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Icon from '@/Components/Icon';
import TextInput from '@/Components/TextInput';
import TableWrapper from '@/Components/TableWrapper';
import TableHeader from '@/Components/TableHeader';
import TableHeaderRow from '@/Components/TableHeaderRow';
import TableDataRow from '@/Components/TableDataRow';
import ResponsivePagination from '@/Components/ResponsivePagination';

const Index = () => {
  const { contacts, filters } = usePage().props;
  const { data, meta } = contacts;

  const [form, setForm] = useState({
    search: filters.search || '',
    perPage: filters.perPage || '',
    page: filters.page || '',
  });

  const prevForm = usePrevious(form);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    // Reset if page to null when perPage was changed
    if (key === 'perPage') {
      setForm((values) => ({
        ...values,
        page: '',
      }));
    }

    setForm((values) => ({
      ...values,
      [key]: value,
    }));
  }

  useEffect(() => {
    if (prevForm) {
      const search = debounce(() => {
        let query = pickBy(form);
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
  }, [form]);

  return (
    <AuthenticatedLayout>
      <Head title="Contacts" />

      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold pt-2 pb-6">Contacts</h1>

        <Link
          className="btn-primary focus:outline-none"
          href={route('contacts.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Contact</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between my-6">
        <div className="flex md:justify-start items-center mb-2 md:mb-0">
          <label className="mr-2">Showing</label>
          <div className="relative">
            <select
              className="form-select form-select-sm"
              name="perPage"
              onChange={handleChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <label className="ml-2">Entries</label>
        </div>
        <TextInput
          className="w-full md:w-1/3"
          autoComplete="off"
          type="text"
          name="search"
          value={form.search}
          onChange={handleChange}
          placeholder="Search…"
        />
      </div>

      <TableWrapper>
        <TableHeader>
          <TableHeaderRow>
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">City</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-center" colSpan="2"></th>
          </TableHeaderRow>
        </TableHeader>
        <tbody className="text-gray-800 text-sm">
          {data.map(({ id, name, city, phone }, index) => {
            return (
              <TableDataRow key={index}>
                <td className="py-3 px-6 text-left">{meta.from + index}</td>
                <td className="py-3 px-6 text-left">
                  <Link
                    href={route('contacts.edit', id)}
                    className="hover:text-indigo-600 hover:underline"
                  >
                    {name}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left">{city}</td>
                <td className="py-3 px-6 text-left">{phone}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                      <Link
                        tabIndex="-1"
                        href={route('contacts.edit', id)}
                        className="flex items-center px-4 focus:outline-none"
                      >
                        <Icon
                          name="cheveron-right"
                          className="block w-6 h-6 text-gray-400 fill-current"
                        />
                      </Link>
                    </div>
                  </div>
                </td>
              </TableDataRow>
            );
          })}
          {data.length === 0 && (
            <TableDataRow>
              <td className="px-6 py-4 border-t" colSpan="5">
                No contacts found.
              </td>
            </TableDataRow>
          )}
        </tbody>
      </TableWrapper>

      {/* Pagination */}
      <ResponsivePagination
        source={meta}
        paginate={(p) =>
          setForm((values) => ({
            ...values,
            page: p,
          }))
        }
      />
    </AuthenticatedLayout>
  );
};

export default Index;
