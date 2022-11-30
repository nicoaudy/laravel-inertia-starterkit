import { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { debounce, pickBy } from 'lodash';
import { usePrevious } from 'react-use';
import Icon from '@/Components/Icon';
import ResponsivePagination from '@/Components/ResponsivePagination';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
        <div className="flex items-center mb-2 md:mb-0">
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

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Name</th>
              <th className="px-6 pt-5 pb-4">City</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, city, phone, deleted_at }) => {
              return (
                <tr key={id} className="hover:bg-gray-100 focus-within:bg-gray-100">
                  <td className="border-t">
                    <Link
                      href={route('contacts.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                    >
                      {name}
                      {deleted_at && (
                        <Icon
                          name="trash"
                          className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                        />
                      )}
                    </Link>
                  </td>
                  <td className="border-t">
                    <Link
                      tabIndex="-1"
                      href={route('contacts.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {city}
                    </Link>
                  </td>
                  <td className="border-t">
                    <Link
                      tabIndex="-1"
                      href={route('contacts.edit', id)}
                      className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    >
                      {phone}
                    </Link>
                  </td>
                  <td className="w-px border-t">
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
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
